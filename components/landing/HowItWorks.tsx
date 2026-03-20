'use client';

import { motion } from 'framer-motion';
import { ClipboardList, Search, FileText, Mail } from 'lucide-react';

const steps = [
  {
    icon: ClipboardList,
    step: '01',
    title: 'Paste their profile',
    description: 'Drop in any text about your prospect — LinkedIn bio, email they sent you, website about page, or even a job posting.',
    color: '#F97316',
  },
  {
    icon: Search,
    step: '02',
    title: 'Closr reads between the lines',
    description: 'Our engine analyzes how they communicate, what drives their decisions, and what language gets their attention.',
    color: '#3B82F6',
  },
  {
    icon: FileText,
    step: '03',
    title: 'Get a proposal that converts',
    description: 'A complete, client-ready proposal built around how your prospect actually thinks — not a generic template.',
    color: '#22C55E',
  },
  {
    icon: Mail,
    step: '04',
    title: '3 email variants, ready to send',
    description: 'Three different angles on the same outreach, each adapted to your prospect\'s communication style.',
    color: '#EAB308',
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 sm:py-32 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <p className="text-sm font-medium text-[#F97316] mb-3 uppercase tracking-wider">How it works</p>
          <h2 className="font-serif text-3xl sm:text-5xl text-[#FAFAFA] mb-4 tracking-[-0.02em]">
            From bio to proposal in 4 steps
          </h2>
          <p className="text-[#71717A] text-lg max-w-[55ch] mx-auto leading-[1.6]">
            Stop copy-pasting the same pitch to every prospect. Your proposal should sound like you actually know them.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative"
            >
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-8 left-full w-full h-px bg-linear-to-r from-[#27272A] to-transparent z-10 -translate-x-6" />
              )}

              <div className="bg-[#0A0A0D] border border-[#27272A] rounded-2xl p-6 hover:border-[#3F3F46] transition-all group h-full">
                <div className="flex items-start justify-between mb-4">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center"
                    style={{ background: `${step.color}15`, border: `1px solid ${step.color}30` }}
                  >
                    <step.icon size={22} style={{ color: step.color }} />
                  </div>
                  <span className="font-mono text-4xl font-bold text-[#27272A] group-hover:text-[#3F3F46] transition-colors">
                    {step.step}
                  </span>
                </div>
                <h3 className="text-base font-semibold text-[#FAFAFA] mb-2">{step.title}</h3>
                <p className="text-sm text-[#71717A] leading-[1.6]">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
