'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Sparkles, Brain, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center pt-16 overflow-hidden">
      {/* Gradient mesh background */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute top-0 left-1/4 w-[600px] h-[600px] rounded-full opacity-20 blob-animate"
          style={{
            background: 'radial-gradient(circle, rgba(249,115,22,0.4) 0%, transparent 70%)',
            filter: 'blur(80px)',
          }}
        />
        <div
          className="absolute bottom-0 right-1/4 w-[400px] h-[400px] rounded-full opacity-15 blob-animate-delay-1"
          style={{
            background: 'radial-gradient(circle, rgba(251,191,36,0.3) 0%, transparent 70%)',
            filter: 'blur(60px)',
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-20 sm:py-32">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#F97316]/10 border border-[#F97316]/20 text-[#F97316] text-xs font-medium mb-6"
          >
            <Sparkles size={12} />
            <span>Psychology-powered proposals that win</span>
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-serif text-4xl sm:text-6xl lg:text-7xl text-[#FAFAFA] leading-tight mb-6"
          >
            Proposals that win,{' '}
            <span className="gradient-text">
              powered by psychology
            </span>
          </motion.h1>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg sm:text-xl text-[#71717A] leading-relaxed max-w-2xl mb-10"
          >
            Paste your prospect&apos;s LinkedIn bio. We analyze their DISC behavioral profile and generate a personalized proposal + 3 cold emails in under 60 seconds.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-3 mb-12"
          >
            <Button size="lg" asChild>
              <Link href="/login" className="flex items-center gap-2">
                Generate Your First Proposal Free
                <ArrowRight size={18} />
              </Link>
            </Button>
            <Button variant="secondary" size="lg" asChild>
              <a href="#how-it-works">See how it works</a>
            </Button>
          </motion.div>

          {/* Social proof */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-wrap items-center justify-center gap-6 text-sm text-[#71717A]"
          >
            <div className="flex items-center gap-2">
              <Brain size={16} className="text-[#F97316]" />
              <span>DISC Psychology Analysis</span>
            </div>
            <div className="flex items-center gap-2">
              <Sparkles size={16} className="text-[#F97316]" />
              <span>GPT-4o Powered</span>
            </div>
            <div className="flex items-center gap-2">
              <TrendingUp size={16} className="text-[#F97316]" />
              <span>3x Higher Close Rate</span>
            </div>
          </motion.div>
        </div>

        {/* Hero preview card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="mt-20 max-w-3xl mx-auto"
        >
          <div className="glass-card rounded-2xl p-6 border border-white/[0.08]">
            <div className="flex items-center gap-2 mb-4">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-[#EF4444]" />
                <div className="w-3 h-3 rounded-full bg-[#EAB308]" />
                <div className="w-3 h-3 rounded-full bg-[#22C55E]" />
              </div>
              <span className="text-xs text-[#71717A] font-mono">closr.app/generate</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-[#18181B] rounded-xl p-4 border border-[#27272A]">
                <p className="text-xs text-[#71717A] mb-2 font-medium uppercase tracking-wider">Prospect Bio Input</p>
                <p className="text-sm text-[#A1A1AA] leading-relaxed">
                  &ldquo;I&apos;m a results-driven CMO focused on driving measurable ROI through data-backed marketing strategies. I believe in execution over planning...&rdquo;
                </p>
              </div>
              <div className="flex flex-col gap-2">
                <div className="bg-[#EF4444]/10 border border-[#EF4444]/20 rounded-xl p-3">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-2 h-2 rounded-full bg-[#EF4444]" />
                    <span className="text-xs font-semibold text-[#EF4444]">DISC Type: D — Dominant</span>
                  </div>
                  <p className="text-xs text-[#A1A1AA]">Results-focused, decisive decision maker who values direct communication and fast execution.</p>
                </div>
                <div className="bg-[#18181B] border border-[#27272A] rounded-xl p-3">
                  <p className="text-xs text-[#71717A] mb-1">Power words detected:</p>
                  <div className="flex flex-wrap gap-1">
                    {['ROI', 'results', 'execute', 'measurable', 'drive'].map((word) => (
                      <span key={word} className="px-2 py-0.5 bg-[#F97316]/10 text-[#F97316] text-xs rounded-md">
                        {word}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
