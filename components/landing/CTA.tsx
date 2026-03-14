'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export function CTA() {
  return (
    <section className="py-20 sm:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative rounded-3xl overflow-hidden"
        >
          {/* Background */}
          <div className="absolute inset-0 bg-[#18181B]" />
          <div
            className="absolute inset-0 opacity-30"
            style={{
              background: 'radial-gradient(ellipse at 50% 0%, rgba(249,115,22,0.3) 0%, transparent 70%)',
            }}
          />
          <div className="absolute inset-0 border border-[#F97316]/20 rounded-3xl" />

          <div className="relative p-12 sm:p-16 text-center">
            <h2 className="font-serif text-3xl sm:text-5xl text-[#FAFAFA] mb-4">
              Your next big client is one{' '}
              <span className="gradient-text">psychology-powered</span>{' '}
              proposal away
            </h2>
            <p className="text-lg text-[#71717A] mb-8 max-w-xl mx-auto">
              Start with 3 free proposals. No credit card required. See the difference psychology makes in your outreach.
            </p>
            <Button size="lg" asChild>
              <Link href="/login" className="flex items-center gap-2">
                Generate Your First Proposal
                <ArrowRight size={18} />
              </Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
