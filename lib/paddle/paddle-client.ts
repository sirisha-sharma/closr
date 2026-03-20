import type { Paddle } from '@paddle/paddle-js';

let _paddle: Paddle | null = null;

export async function getPaddleClient(): Promise<Paddle> {
  if (_paddle) return _paddle;

  const { initializePaddle } = await import('@paddle/paddle-js');
  const env = (process.env.NEXT_PUBLIC_PADDLE_ENV || 'sandbox') as 'sandbox' | 'production';
  const token = process.env.NEXT_PUBLIC_PADDLE_CLIENT_TOKEN!;

  const instance = await initializePaddle({ environment: env, token });
  if (!instance) throw new Error('Paddle failed to initialize');
  _paddle = instance;
  return _paddle;
}
