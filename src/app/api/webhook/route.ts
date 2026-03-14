import { NextRequest, NextResponse } from 'next/server';
import { getPaddle } from '@/lib/paddle/client';
import { getPlanFromPriceId } from '@/lib/paddle/config';
import { createClient as createServerClient } from '@supabase/supabase-js';
import type { TransactionNotification } from '@paddle/paddle-node-sdk';

function getAdminClient() {
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
}

export async function POST(request: NextRequest) {
  const body = await request.text();
  const signature = request.headers.get('paddle-signature');

  if (!signature) {
    return NextResponse.json({ error: 'Missing signature' }, { status: 400 });
  }

  const paddle = getPaddle();

  let event;
  try {
    event = await paddle.webhooks.unmarshal(
      body,
      process.env.PADDLE_WEBHOOK_SECRET!,
      signature
    );
  } catch (err) {
    console.error('Webhook signature verification failed:', err);
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
  }

  const supabase = getAdminClient();

  try {
    switch (event.eventType) {
      case 'transaction.completed': {
        const tx = event.data as TransactionNotification;
        const customData = tx.customData as { userId?: string; plan?: string } | null;
        const userId = customData?.userId;
        const plan = customData?.plan;

        if (userId && plan) {
          await supabase
            .from('profiles')
            .update({
              plan,
              paddle_customer_id: tx.customerId,
              paddle_subscription_id: tx.subscriptionId,
              updated_at: new Date().toISOString(),
            })
            .eq('id', userId);
        }
        break;
      }

      case 'subscription.updated': {
        const sub = event.data as {
          id: string;
          customerId: string;
          customData: { userId?: string } | null;
          items: Array<{ price?: { id?: string } }>;
        };
        const userId = (sub.customData as { userId?: string } | null)?.userId;

        if (userId) {
          const priceId = sub.items?.[0]?.price?.id;
          const plan = priceId ? getPlanFromPriceId(priceId) : null;

          if (plan) {
            await supabase
              .from('profiles')
              .update({
                plan,
                paddle_subscription_id: sub.id,
                updated_at: new Date().toISOString(),
              })
              .eq('id', userId);
          }
        }
        break;
      }

      case 'subscription.canceled': {
        const sub = event.data as {
          customData: { userId?: string } | null;
        };
        const userId = (sub.customData as { userId?: string } | null)?.userId;

        if (userId) {
          await supabase
            .from('profiles')
            .update({
              plan: 'free',
              paddle_subscription_id: null,
              updated_at: new Date().toISOString(),
            })
            .eq('id', userId);
        }
        break;
      }

      case 'transaction.payment_failed': {
        const sub = event.data as {
          customData: { userId?: string } | null;
        };
        const userId = (sub.customData as { userId?: string } | null)?.userId;

        if (userId) {
          await supabase
            .from('profiles')
            .update({
              plan: 'free',
              updated_at: new Date().toISOString(),
            })
            .eq('id', userId);
        }
        break;
      }

      default:
        console.log(`Unhandled event type: ${event.eventType}`);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Webhook processing error:', error);
    return NextResponse.json({ error: 'Webhook processing failed' }, { status: 500 });
  }
}
