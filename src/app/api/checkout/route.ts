import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { getPaddle } from '@/lib/paddle/client';
import { PADDLE_CONFIG, type PaddlePlan } from '@/lib/paddle/config';

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

    const { plan } = await request.json();

    if (!plan || !PADDLE_CONFIG.plans[plan as PaddlePlan]) {
      return NextResponse.json({ error: 'Invalid plan' }, { status: 400 });
    }

    const { data: profile } = await supabase
      .from('profiles')
      .select('paddle_customer_id')
      .eq('id', user.id)
      .single();

    const paddle = getPaddle();
    const priceId = PADDLE_CONFIG.plans[plan as PaddlePlan].priceId;
    const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

    const transaction = await paddle.transactions.create({
      items: [{ priceId, quantity: 1 }],
      customerId: profile?.paddle_customer_id ?? undefined,
      customData: { userId: user.id, plan },
      checkout: {
        url: `${appUrl}/settings?tab=billing&success=true`,
      },
    });

    if (!transaction.checkout?.url) {
      return NextResponse.json({ error: 'Failed to create checkout' }, { status: 500 });
    }

    return NextResponse.json({ url: transaction.checkout.url, priceId });
  } catch (error) {
    console.error('Checkout error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
