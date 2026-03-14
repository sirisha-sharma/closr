import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { openai } from '@/lib/openai/client';
import { DISC_ANALYSIS_PROMPT } from '@/lib/openai/prompts';
import { type DISCProfile, PLAN_LIMITS } from '@/lib/types';
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

    const { prospectBio } = await request.json();

    if (!prospectBio || typeof prospectBio !== 'string' || prospectBio.trim().length < 30) {
      return NextResponse.json(
        { error: 'Prospect bio must be at least 30 characters' },
        { status: 400 }
      );
    }

    // Check usage limits
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('plan, generations_used, generations_reset_at')
      .eq('id', user.id)
      .single();

    if (profileError || !profile) {
      return NextResponse.json({ error: 'Profile not found' }, { status: 404 });
    }

    const limits = PLAN_LIMITS[profile.plan as keyof typeof PLAN_LIMITS];

    // Check if monthly reset is needed
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

    // Check if at limit
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

    // Call OpenAI
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: DISC_ANALYSIS_PROMPT },
        { role: 'user', content: `Analyze this professional bio and return the DISC profile JSON:\n\n${prospectBio.trim()}` },
      ],
      temperature: 0.3,
      response_format: { type: 'json_object' },
    });

    const rawContent = completion.choices[0]?.message?.content;
    if (!rawContent) {
      return NextResponse.json({ error: 'No response from AI' }, { status: 500 });
    }

    let discProfile: DISCProfile;
    try {
      discProfile = JSON.parse(rawContent);
    } catch {
      return NextResponse.json({ error: 'Invalid AI response format' }, { status: 500 });
    }

    // Validate required fields
    if (!discProfile.disc_type || !discProfile.disc_label || !discProfile.summary) {
      return NextResponse.json({ error: 'Incomplete DISC profile from AI' }, { status: 500 });
    }

    return NextResponse.json({ discProfile });
  } catch (error) {
    console.error('Analyze API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
