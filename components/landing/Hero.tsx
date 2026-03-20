'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, MessageSquare, TrendingUp, Clock } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center pt-16 overflow-hidden">
      {/* Organic gradient mesh — multiple overlapping blobs for non-AI feel */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute top-[-80px] left-[15%] w-[700px] h-[500px] rounded-full opacity-[0.18] blob-animate"
          style={{
            background: 'radial-gradient(ellipse, rgba(249,115,22,0.5) 0%, rgba(251,146,60,0.2) 40%, transparent 70%)',
            filter: 'blur(90px)',
            transform: 'rotate(-15deg)',
          }}
        />
        <div
          className="absolute top-[20%] right-[5%] w-[350px] h-[450px] rounded-full opacity-[0.12] blob-animate-delay-1"
          style={{
            background: 'radial-gradient(circle, rgba(251,191,36,0.4) 0%, transparent 65%)',
            filter: 'blur(70px)',
          }}
        />
        <div
          className="absolute bottom-[10%] left-[35%] w-[300px] h-[300px] rounded-full opacity-[0.10]"
          style={{
            background: 'radial-gradient(circle, rgba(249,115,22,0.3) 0%, transparent 60%)',
            filter: 'blur(60px)',
          }}
        />
        <div
          className="absolute top-[50%] left-[-5%] w-[250px] h-[350px] rounded-full opacity-[0.08] blob-animate-delay-1"
          style={{
            background: 'radial-gradient(circle, rgba(234,88,12,0.5) 0%, transparent 70%)',
            filter: 'blur(80px)',
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-20 sm:py-32">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          {/* Badge — no sparkle, outcome-focused */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#F97316]/10 border border-[#F97316]/20 text-[#F97316] text-xs font-medium mb-8"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#F97316] animate-pulse" />
            <span>Write proposals that sound like you actually read their LinkedIn</span>
          </motion.div>

          {/* Heading — outcome first, no psychology */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-serif text-4xl sm:text-6xl lg:text-7xl text-[#FAFAFA] leading-[1.1] mb-4 tracking-[-0.02em]"
          >
            Close more deals.{' '}
            <br className="hidden sm:block" />
            <span className="relative inline-block">
              <span className="gradient-text">In 60 seconds.</span>
              {/* Squiggly underline — breaks AI-generated look */}
              <svg
                className="absolute -bottom-2 left-0 w-full"
                height="8"
                viewBox="0 0 300 8"
                preserveAspectRatio="none"
                fill="none"
              >
                <path
                  d="M0 5 Q15 1 30 5 Q45 9 60 5 Q75 1 90 5 Q105 9 120 5 Q135 1 150 5 Q165 9 180 5 Q195 1 210 5 Q225 9 240 5 Q255 1 270 5 Q285 9 300 5"
                  stroke="#F97316"
                  strokeWidth="2"
                  strokeOpacity="0.5"
                />
              </svg>
            </span>
          </motion.h1>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg sm:text-xl text-[#71717A] leading-[1.6] max-w-[55ch] mb-10"
          >
            Paste your prospect&apos;s bio. Closr figures out how they think and writes a proposal they can&apos;t ignore — plus 3 cold email variants ready to send.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-3 mb-14"
          >
            <Button size="lg" asChild>
              <Link href="/login" className="flex items-center gap-2">
                Start free — no card needed
                <ArrowRight size={18} />
              </Link>
            </Button>
            <Button variant="secondary" size="lg" asChild>
              <a href="#how-it-works">See how it works</a>
            </Button>
          </motion.div>

          {/* Social proof — no AI badge, outcome-focused */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-wrap items-center justify-center gap-6 text-sm text-[#71717A]"
          >
            <div className="flex items-center gap-2">
              <Clock size={15} className="text-[#F97316]" />
              <span>Proposal ready in under 60 seconds</span>
            </div>
            <div className="w-px h-4 bg-[#27272A] hidden sm:block" />
            <div className="flex items-center gap-2">
              <MessageSquare size={15} className="text-[#F97316]" />
              <span>3 email variants per prospect</span>
            </div>
            <div className="w-px h-4 bg-[#27272A] hidden sm:block" />
            <div className="flex items-center gap-2">
              <TrendingUp size={15} className="text-[#F97316]" />
              <span>3x higher reply rate</span>
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
              <div className="bg-[#0A0A0D] rounded-xl p-4 border border-[#27272A]">
                <p className="text-xs text-[#71717A] mb-2 font-medium uppercase tracking-wider">Prospect Text</p>
                <p className="text-sm text-[#A1A1AA] leading-[1.6]">
                  &ldquo;I&apos;m a results-driven CMO focused on driving measurable ROI through data-backed marketing strategies. I believe in execution over planning...&rdquo;
                </p>
              </div>
              <div className="flex flex-col gap-2">
                <div className="bg-[#EF4444]/10 border border-[#EF4444]/20 rounded-xl p-3">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-2 h-2 rounded-full bg-[#EF4444]" />
                    <span className="text-xs font-semibold text-[#EF4444]">Direct & Results-Driven</span>
                  </div>
                  <p className="text-xs text-[#A1A1AA]">Fast decision-maker. Lead with outcomes, cut the fluff, make the ask early.</p>
                </div>
                <div className="bg-[#0B0B0F] border border-[#27272A] rounded-xl p-3">
                  <p className="text-xs text-[#71717A] mb-1">Words that resonate:</p>
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
