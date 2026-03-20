'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import { Skeleton } from '@/components/ui/Skeleton';

const ANALYZE_STEPS = [
  'Reading your prospect...',
  'Building their communication profile...',
];

const GENERATE_STEPS = [
  'Writing your proposal...',
  'Crafting 3 email variants...',
  'Finishing up...',
];

interface GenerationSkeletonProps {
  phase?: 'analyze' | 'generate';
}

export function GenerationSkeleton({ phase = 'analyze' }: GenerationSkeletonProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const steps = phase === 'analyze' ? ANALYZE_STEPS : GENERATE_STEPS;

  useEffect(() => {
    setCurrentStep(0);
  }, [phase]);

  useEffect(() => {
    if (currentStep >= steps.length - 1) return;
    const interval = setInterval(() => {
      setCurrentStep((s) => Math.min(s + 1, steps.length - 1));
    }, 2000);
    return () => clearInterval(interval);
  }, [currentStep, steps.length]);

  return (
    <div className="flex flex-col gap-6">
      <div className="bg-[#0A0A0D] border border-[#27272A] rounded-xl p-5 flex items-center gap-3">
        <div className="w-10 h-10 rounded-lg bg-[#F97316]/10 flex items-center justify-center shrink-0">
          <Loader2 size={20} className="text-[#F97316] animate-spin" />
        </div>
        <div className="flex-1">
          <AnimatePresence mode="wait">
            <motion.p
              key={currentStep}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              className="text-sm font-medium text-[#FAFAFA]"
            >
              {steps[currentStep]}
            </motion.p>
          </AnimatePresence>
          <div className="flex items-center gap-2 mt-2">
            {steps.map((_, i) => (
              <div
                key={i}
                className={`h-1 flex-1 rounded-full transition-all duration-500 ${
                  i <= currentStep ? 'bg-[#F97316]' : 'bg-[#27272A]'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            className="bg-[#0A0A0D] border border-[#27272A] rounded-xl p-5"
          >
            <Skeleton height={12} width="30%" className="mb-3" />
            <div className="flex flex-col gap-2">
              <Skeleton height={14} />
              <Skeleton height={14} width="90%" />
              <Skeleton height={14} width="75%" />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
