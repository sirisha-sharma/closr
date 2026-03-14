import { Paddle, Environment } from '@paddle/paddle-node-sdk';

let _paddle: Paddle | null = null;

export function getPaddle(): Paddle {
  if (!_paddle) {
    _paddle = new Paddle(process.env.PADDLE_API_KEY || 'placeholder', {
      environment:
        process.env.NODE_ENV === 'production'
          ? Environment.production
          : Environment.sandbox,
    });
  }
  return _paddle;
}
