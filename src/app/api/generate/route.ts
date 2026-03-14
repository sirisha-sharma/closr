import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { openai } from '@/lib/openai/client';
import { PROPOSAL_GENERATION_PROMPT, EMAIL_GENERATION_PROMPT } from '@/lib/openai/prompts';
import { type ProposalContent, type EmailVariants, PLAN_LIMITS } from '@/lib/types';
import { isMonthlyResetDue } from '@/lib/utils';

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { discProfile, serviceDescription, prospectName, prospectBio } = await request.json();

    if (!discProfile || !serviceDescription) {
      return NextResponse.json(
        { error: 'Missing required fields: discProfile and serviceDescription' },
        { status: 400 }
      );
    }

    // Check and update usage limits
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('plan, generations_used, generations_reset_at')
      .eq('id', user.id)
      .single();

    if (profileError || !profile) {
      return NextResponse.json({ error: 'Profile not found' }, { status: 404 });
    }

    const limits = PLAN_LIMITS[profile.plan as keyof typeof PLAN_LIMITS];

    // Monthly reset logic
    if (limits.monthly_reset && isMonthlyResetDue(profile.generations_reset_at)) {
      await supabase
        .from('profiles')
        .update({
          generations_used: 0,
          generations_reset_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        })
        .eq('id', user.id);
      profile.generations_used = 0;
    }

    // Check limit
    if (limits.generations !== 'unlimited' && profile.generations_used >= limits.generations) {
      return NextResponse.json(
        {
          error: 'Generation limit reached',
          code: 'LIMIT_REACHED',
          plan: profile.plan,
        },
        { status: 429 }
      );
    }

    // Generate proposal and emails in parallel
    const userContext = `
PROSPECT DISC PROFILE:
${JSON.stringify(discProfile, null, 2)}

FREELANCER SERVICE:
${serviceDescription}

PROSPECT NAME: ${prospectName || 'the prospect'}
`;

    const [proposalCompletion, emailCompletion] = await Promise.all([
      openai.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: PROPOSAL_GENERATION_PROMPT },
          { role: 'user', content: `Generate a personalized proposal based on:\n${userContext}` },
        ],
        temperature: 0.7,
        response_format: { type: 'json_object' },
      }),
      openai.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: EMAIL_GENERATION_PROMPT },
          { role: 'user', content: `Generate 3 cold email variants based on:\n${userContext}` },
        ],
        temperature: 0.7,
        response_format: { type: 'json_object' },
      }),
    ]);

    const proposalRaw = proposalCompletion.choices[0]?.message?.content;
    const emailRaw = emailCompletion.choices[0]?.message?.content;

    if (!proposalRaw || !emailRaw) {
      return NextResponse.json({ error: 'No response from AI' }, { status: 500 });
    }

    let proposalContent: ProposalContent;
    let emailVariants: EmailVariants;

    try {
      proposalContent = JSON.parse(proposalRaw);
      emailVariants = JSON.parse(emailRaw);
    } catch {
      return NextResponse.json({ error: 'Invalid AI response format' }, { status: 500 });
    }

    // Save proposal to database
    const { data: savedProposal, error: saveError } = await supabase
      .from('proposals')
      .insert({
        user_id: user.id,
        prospect_name: prospectName || null,
        prospect_bio: prospectBio || '',
        disc_profile: discProfile,
        service_description: serviceDescription,
        proposal_content: proposalContent,
        email_variants: emailVariants,
        status: 'draft',
      })
      .select()
      .single();

    if (saveError) {
      console.error('Save proposal error:', saveError);
      return NextResponse.json({ error: 'Failed to save proposal' }, { status: 500 });
    }

    // Increment usage count
    await supabase
      .from('profiles')
      .update({
        generations_used: profile.generations_used + 1,
        updated_at: new Date().toISOString(),
      })
      .eq('id', user.id);

    return NextResponse.json({
      proposal: savedProposal,
      proposalContent,
      emailVariants,
    });
  } catch (error) {
    console.error('Generate API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
