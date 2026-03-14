export const PADDLE_CONFIG = {
  plans: {
    starter: {
      priceId: process.env.PADDLE_STARTER_PRICE_ID!,
      name: 'Starter',
      price: 29,
    },
    pro: {
      priceId: process.env.PADDLE_PRO_PRICE_ID!,
      name: 'Pro',
      price: 79,
    },
    agency: {
      priceId: process.env.PADDLE_AGENCY_PRICE_ID!,
      name: 'Agency',
      price: 199,
    },
  },
};

export type PaddlePlan = keyof typeof PADDLE_CONFIG.plans;

export function getPlanFromPriceId(priceId: string): string | null {
  for (const [plan, config] of Object.entries(PADDLE_CONFIG.plans)) {
    if (config.priceId === priceId) return plan;
  }
  return null;
}
