'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Brain, CheckCircle2 } from 'lucide-react';
import { toast } from 'sonner';
import { ProspectInput } from '@/components/generate/ProspectInput';
import { ServiceInput } from '@/components/generate/ServiceInput';
import { PsychologyProfile } from '@/components/generate/PsychologyProfile';
import { ProposalOutput } from '@/components/generate/ProposalOutput';
import { EmailVariants } from '@/components/generate/EmailVariants';
import { GenerationSkeleton } from '@/components/generate/GenerationSkeleton';
import { PDFExport } from '@/components/generate/PDFExport';
import { type DISCProfile, type ProposalContent, type EmailVariants as EmailVariantsType, type Proposal } from '@/lib/types';
import Link from 'next/link';

type Step = 'input' | 'analyzing' | 'service' | 'generating' | 'output';

interface GeneratedData {
  proposal: Proposal;
  proposalContent: ProposalContent;
  emailVariants: EmailVariantsType;
}

const stepLabels = [
  { id: 'input', label: 'Prospect Bio', icon: Brain },
  { id: 'service', label: 'Your Service', icon: Sparkles },
  { id: 'output', label: 'Generated', icon: CheckCircle2 },
];

export default function GeneratePage() {
  const [step, setStep] = useState<Step>('input');
  const [discProfile, setDiscProfile] = useState<DISCProfile | null>(null);
  const [prospectBio, setProspectBio] = useState('');
  const [prospectName, setProspectName] = useState('');
  const [generatedData, setGeneratedData] = useState<GeneratedData | null>(null);
  const [activeTab, setActiveTab] = useState<'proposal' | 'emails'>('proposal');

  const handleAnalyze = async (bio: string, name: string) => {
    setProspectBio(bio);
    setProspectName(name);
    setStep('analyzing');

    try {
      const res = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prospectBio: bio }),
      });

      const data = await res.json();

      if (!res.ok) {
        if (res.status === 429) {
          toast.error('Generation limit reached. Please upgrade your plan.');
        } else {
          toast.error(data.error || 'Analysis failed');
        }
        setStep('input');
        return;
      }

      setDiscProfile(data.discProfile);
      setStep('service');
    } catch {
      toast.error('Failed to analyze prospect. Please try again.');
      setStep('input');
    }
  };

  const handleGenerate = async (serviceDescription: string) => {
    setStep('generating');

    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          discProfile,
          serviceDescription,
          prospectName,
          prospectBio,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        if (res.status === 429) {
          toast.error('Generation limit reached. Please upgrade your plan.');
        } else {
          toast.error(data.error || 'Generation failed');
        }
        setStep('service');
        return;
      }

      setGeneratedData(data);
      setStep('output');
      toast.success('Proposal and emails generated successfully!');
    } catch {
      toast.error('Failed to generate proposal. Please try again.');
      setStep('service');
    }
  };

  const handleReset = () => {
    setStep('input');
    setDiscProfile(null);
    setProspectBio('');
    setProspectName('');
    setGeneratedData(null);
    setActiveTab('proposal');
  };

  const currentStepIndex = step === 'analyzing' || step === 'input' ? 0
    : step === 'service' || step === 'generating' ? 1
    : 2;

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-[#FAFAFA] flex items-center gap-2">
          <Sparkles className="text-[#F97316]" size={22} />
          Generate Proposal
        </h1>
        <p className="text-sm text-[#71717A] mt-1">
          Analyze your prospect&apos;s psychology and generate a personalized proposal in minutes.
        </p>
      </div>

      {/* Progress steps */}
      <div className="flex items-center gap-2">
        {stepLabels.map((s, index) => (
          <div key={s.id} className="flex items-center gap-2">
            <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
              index === currentStepIndex
                ? 'bg-[#F97316]/10 text-[#F97316] border border-[#F97316]/20'
                : index < currentStepIndex
                ? 'bg-[#22C55E]/10 text-[#22C55E] border border-[#22C55E]/20'
                : 'bg-[#18181B] text-[#71717A] border border-[#27272A]'
            }`}>
              <s.icon size={12} />
              {s.label}
            </div>
            {index < stepLabels.length - 1 && (
              <div className={`h-px w-6 ${index < currentStepIndex ? 'bg-[#22C55E]' : 'bg-[#27272A]'}`} />
            )}
          </div>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {/* Step 1: Prospect input */}
        {step === 'input' && (
          <motion.div
            key="input"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
          >
            <ProspectInput onAnalyze={handleAnalyze} loading={false} />
          </motion.div>
        )}

        {/* Analyzing skeleton */}
        {step === 'analyzing' && (
          <motion.div
            key="analyzing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <GenerationSkeleton phase="analyze" />
          </motion.div>
        )}

        {/* Step 2: Show DISC profile + service input */}
        {step === 'service' && discProfile && (
          <motion.div
            key="service"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="flex flex-col gap-6"
          >
            <PsychologyProfile profile={discProfile} />
            <ServiceInput onGenerate={handleGenerate} onReset={handleReset} loading={false} />
          </motion.div>
        )}

        {/* Generating skeleton */}
        {step === 'generating' && (
          <motion.div
            key="generating"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <GenerationSkeleton phase="generate" />
          </motion.div>
        )}

        {/* Output */}
        {step === 'output' && generatedData && (
          <motion.div
            key="output"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col gap-6"
          >
            {/* Output header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-[#22C55E]/5 border border-[#22C55E]/20 rounded-xl px-4 py-3">
              <div className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-[#22C55E]" />
                <span className="text-sm font-medium text-[#FAFAFA]">Proposal generated successfully</span>
                {prospectName && (
                  <span className="text-sm text-[#71717A]">for {prospectName}</span>
                )}
              </div>
              <div className="flex gap-2">
                <PDFExport proposal={generatedData.proposal} />
                <button
                  onClick={handleReset}
                  className="text-xs text-[#71717A] hover:text-[#F97316] transition-colors px-3 py-1.5 rounded-lg border border-[#27272A] hover:border-[#F97316]/30"
                >
                  New Proposal
                </button>
                <Link
                  href="/proposals"
                  className="text-xs text-[#71717A] hover:text-[#A1A1AA] transition-colors px-3 py-1.5 rounded-lg border border-[#27272A]"
                >
                  View Saved
                </Link>
              </div>
            </div>

            {/* DISC profile compact */}
            {discProfile && (
              <div
                className="flex items-center gap-3 px-4 py-3 rounded-xl border text-sm"
                style={{
                  background: `${discProfile.disc_type === 'D' ? '#EF4444' : discProfile.disc_type === 'I' ? '#EAB308' : discProfile.disc_type === 'S' ? '#22C55E' : '#3B82F6'}10`,
                  borderColor: `${discProfile.disc_type === 'D' ? '#EF4444' : discProfile.disc_type === 'I' ? '#EAB308' : discProfile.disc_type === 'S' ? '#22C55E' : '#3B82F6'}30`,
                }}
              >
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold text-white shrink-0"
                  style={{ background: discProfile.disc_type === 'D' ? '#EF4444' : discProfile.disc_type === 'I' ? '#EAB308' : discProfile.disc_type === 'S' ? '#22C55E' : '#3B82F6' }}
                >
                  {discProfile.disc_type}
                </div>
                <span className="text-[#A1A1AA]">
                  <span className="text-[#FAFAFA] font-medium">{discProfile.disc_label}</span> psychology applied to all outputs
                </span>
              </div>
            )}

            {/* Tabs */}
            <div className="flex border-b border-[#27272A]">
              {(['proposal', 'emails'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2.5 text-sm font-medium transition-colors relative ${
                    activeTab === tab
                      ? 'text-[#FAFAFA] tab-active'
                      : 'text-[#71717A] hover:text-[#A1A1AA]'
                  }`}
                >
                  {tab === 'proposal' ? 'Proposal' : 'Cold Emails'}
                </button>
              ))}
            </div>

            {/* Tab content */}
            <AnimatePresence mode="wait">
              {activeTab === 'proposal' && (
                <motion.div
                  key="proposal"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                >
                  <ProposalOutput proposal={generatedData.proposalContent} />
                </motion.div>
              )}
              {activeTab === 'emails' && (
                <motion.div
                  key="emails"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                >
                  <EmailVariants variants={generatedData.emailVariants} />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
