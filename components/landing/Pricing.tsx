'use client';

import { motion } from 'framer-motion';
import { Check, Zap } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { PRICING } from '@/lib/constants';

const plans = [
  {
    ...PRICING.starter,
    key: 'starter',
    description: 'Perfect for freelancers getting started with psychology-based outreach.',
    highlight: false,
  },
  {
    ...PRICING.pro,
    key: 'pro',
    description: 'For established freelancers who close deals consistently.',
    highlight: true,
  },
  {
    ...PRICING.agency,
    key: 'agency',
    description: 'For agencies and teams running multiple client campaigns.',
    highlight: false,
  },
];

export function Pricing() {
  return (
    <section id="pricing" className="py-20 sm:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <p className="text-sm font-medium text-[#F97316] mb-3 uppercase tracking-wider">Pricing</p>
          <h2 className="font-serif text-3xl sm:text-5xl text-[#FAFAFA] mb-4">
            Start free. Scale as you close.
          </h2>
          <p className="text-[#71717A] text-lg max-w-xl mx-auto">
            3 free proposals to start. No credit card required.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.key}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`relative rounded-2xl p-6 flex flex-col gap-5 ${
                plan.highlight
                  ? 'bg-[#18181B] border-2 border-[#F97316]/50 shadow-[0_0_40px_rgba(249,115,22,0.1)]'
                  : 'bg-[#111113] border border-[#27272A]'
              }`}
            >
              {plan.highlight && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="flex items-center gap-1 px-3 py-1 bg-[#F97316] text-white text-xs font-semibold rounded-full">
                    <Zap size={10} />
                    Most Popular
                  </span>
                </div>
              )}

              <div>
                <h3 className="text-lg font-semibold text-[#FAFAFA] mb-1">{plan.name}</h3>
                <p className="text-sm text-[#71717A]">{plan.description}</p>
              </div>

              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-bold text-[#FAFAFA]">${plan.price}</span>
                <span className="text-[#71717A]">/month</span>
              </div>

              <Button
                variant={plan.highlight ? 'primary' : 'secondary'}
                fullWidth
                asChild
              >
                <Link href="/login">Get Started</Link>
              </Button>

              <ul className="flex flex-col gap-2.5">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2.5 text-sm text-[#A1A1AA]">
                    <Check size={14} className="text-[#22C55E] shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-sm text-[#71717A] mt-8"
        >
          All plans include 14-day money-back guarantee. Cancel anytime.
        </motion.p>
      </div>
    </section>
  );
}
