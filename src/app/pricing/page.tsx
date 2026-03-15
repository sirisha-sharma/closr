import { Navbar } from '@/components/shared/Navbar';
import { Footer } from '@/components/shared/Footer';
import { Check, Zap } from 'lucide-react';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Pricing — Closr',
  description: 'Simple, transparent pricing for psychology-powered proposals. Start free, scale as you close.',
};

const plans = [
  {
    name: 'Starter',
    price: 29,
    description: 'Perfect for freelancers getting started with psychology-based outreach.',
    highlight: false,
    features: [
      '10 proposals per month',
      'Basic DISC profiling',
      'Cold email generation',
      'PDF export',
      'Email support',
    ],
  },
  {
    name: 'Pro',
    price: 79,
    description: 'For established freelancers who close deals consistently.',
    highlight: true,
    features: [
      'Unlimited proposals',
      'Deep psychology analysis',
      '3 email variants per proposal',
      'Follow-up email generator',
      'PDF export',
      'Priority AI processing',
      'Priority support',
    ],
  },
  {
    name: 'Agency',
    price: 199,
    description: 'For agencies and teams running multiple client campaigns.',
    highlight: false,
    features: [
      'Everything in Pro',
      '5 team seats',
      'White-label PDFs',
      'API access',
      'Team analytics dashboard',
      'Dedicated account manager',
      'Custom onboarding',
    ],
  },
];

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-[#09090B]">
      <Navbar />
      <main className="pt-32 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">

          {/* Header */}
          <div className="text-center mb-16">
            <p className="text-sm font-medium text-[#F97316] mb-3 uppercase tracking-wider">Pricing</p>
            <h1 className="font-serif text-4xl sm:text-6xl text-[#FAFAFA] mb-5 leading-tight">
              Start free. Scale as you close.
            </h1>
            <p className="text-[#71717A] text-lg max-w-xl mx-auto">
              3 free proposals to get started. No credit card required. Upgrade when you&apos;re ready.
            </p>
          </div>

          {/* Plans */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start max-w-5xl mx-auto">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`relative rounded-2xl p-7 flex flex-col gap-6 ${
                  plan.highlight
                    ? 'bg-[#18181B] border-2 border-[#F97316]/50 shadow-[0_0_60px_rgba(249,115,22,0.12)]'
                    : 'bg-[#111113] border border-[#27272A]'
                }`}
              >
                {plan.highlight && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                    <span className="flex items-center gap-1.5 px-3 py-1 bg-[#F97316] text-white text-xs font-semibold rounded-full">
                      <Zap size={10} />
                      Most Popular
                    </span>
                  </div>
                )}

                <div>
                  <h2 className="text-xl font-semibold text-[#FAFAFA] mb-2">{plan.name}</h2>
                  <p className="text-sm text-[#71717A] leading-relaxed">{plan.description}</p>
                </div>

                <div className="flex items-baseline gap-1">
                  <span className="text-5xl font-bold text-[#FAFAFA]">${plan.price}</span>
                  <span className="text-[#71717A] text-sm">/month</span>
                </div>

                <Link
                  href="/login"
                  className={`w-full py-2.5 px-4 rounded-lg text-sm font-semibold text-center transition-all duration-200 ${
                    plan.highlight
                      ? 'bg-[#F97316] hover:bg-[#EA6A00] text-white shadow-[0_0_20px_rgba(249,115,22,0.3)]'
                      : 'bg-[#18181B] hover:bg-[#27272A] text-[#FAFAFA] border border-[#27272A] hover:border-[#3F3F46]'
                  }`}
                >
                  Get Started
                </Link>

                <ul className="flex flex-col gap-3">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2.5 text-sm text-[#A1A1AA]">
                      <Check size={14} className="text-[#22C55E] shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Trust line */}
          <p className="text-center text-sm text-[#71717A] mt-10">
            All paid plans include a <span className="text-[#A1A1AA]">14-day money-back guarantee</span>. Cancel anytime. No questions asked.
          </p>

          {/* FAQ strip */}
          <div className="mt-20 max-w-2xl mx-auto">
            <h2 className="text-2xl font-semibold text-[#FAFAFA] text-center mb-8">Common questions</h2>
            <div className="flex flex-col gap-6">
              {[
                {
                  q: 'What counts as a proposal?',
                  a: 'Each time you generate a full proposal (with DISC analysis and personalized content) counts as one proposal. Editing and re-exporting an existing proposal does not count.',
                },
                {
                  q: 'Can I upgrade or downgrade my plan?',
                  a: 'Yes. You can change your plan at any time from your account settings. Changes take effect at the next billing cycle.',
                },
                {
                  q: 'What payment methods do you accept?',
                  a: 'We accept all major credit and debit cards (Visa, Mastercard, Amex) as well as PayPal, processed securely via Paddle.',
                },
                {
                  q: 'Is my data secure?',
                  a: 'Yes. Prospect data you input is used solely to generate your proposals and is stored securely in Supabase. We do not sell your data. See our Privacy Policy for details.',
                },
              ].map((item) => (
                <div key={item.q} className="border-b border-[#27272A] pb-6">
                  <p className="text-[#FAFAFA] font-medium mb-2">{item.q}</p>
                  <p className="text-[#71717A] text-sm leading-relaxed">{item.a}</p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </main>
      <Footer />
    </div>
  );
}
