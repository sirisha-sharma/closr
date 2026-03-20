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
          <div className="absolute inset-0 bg-[#0B0B0F]" />
          <div
            className="absolute inset-0 opacity-25"
            style={{
              background: 'radial-gradient(ellipse at 50% 0%, rgba(249,115,22,0.4) 0%, transparent 65%)',
            }}
          />
          <div className="absolute inset-0 border border-[#F97316]/20 rounded-3xl" />

          <div className="relative p-12 sm:p-16 text-center">
            <h2 className="font-serif text-3xl sm:text-5xl text-[#FAFAFA] mb-4 tracking-[-0.02em] leading-[1.1]">
              Your next deal is waiting.{' '}
              <span className="gradient-text">Go get it.</span>
            </h2>
            <p className="text-lg text-[#71717A] mb-8 max-w-[50ch] mx-auto leading-[1.6]">
              Start with 3 free proposals. No credit card required. See the difference a tailored proposal makes.
            </p>
            <Button size="lg" asChild>
              <Link href="/login" className="flex items-center gap-2">
                Write your first proposal free
                <ArrowRight size={18} />
              </Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
