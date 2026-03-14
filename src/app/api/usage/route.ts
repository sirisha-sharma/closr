import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { PLAN_LIMITS } from '@/lib/types';
import { isMonthlyResetDue } from '@/lib/utils';

export async function GET() {
  try {
    const supabase = await createClient();
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { data: profile, error } = await supabase
      .from('profiles')
      .select('plan, generations_used, generations_reset_at')
      .eq('id', user.id)
      .single();

    if (error || !profile) {
      return NextResponse.json({ error: 'Profile not found' }, { status: 404 });
    }

    const limits = PLAN_LIMITS[profile.plan as keyof typeof PLAN_LIMITS];
    let used = profile.generations_used;

    // Handle monthly reset
    if (limits.monthly_reset && isMonthlyResetDue(profile.generations_reset_at)) {
      await supabase
        .from('profiles')
        .update({
          generations_used: 0,
          generations_reset_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        })
        .eq('id', user.id);
      used = 0;
    }

    return NextResponse.json({
      used,
      limit: limits.generations,
      plan: profile.plan,
      reset_at: profile.generations_reset_at,
    });
  } catch (error) {
    console.error('Usage GET error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
