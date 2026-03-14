import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { getPaddle } from '@/lib/paddle/client';

export async function POST() {
  try {
    const supabase = await createClient();
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { data: profile } = await supabase
      .from('profiles')
      .select('paddle_customer_id')
      .eq('id', user.id)
      .single();

    if (!profile?.paddle_customer_id) {
      return NextResponse.json({ error: 'No billing account found' }, { status: 404 });
    }

    const paddle = getPaddle();

    const portalSession = await paddle.customerPortalSessions.create(
      profile.paddle_customer_id,
      []
    );

    const portalUrl = portalSession.urls.general.overview;

    return NextResponse.json({ url: portalUrl });
  } catch (error) {
    console.error('Billing portal error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
