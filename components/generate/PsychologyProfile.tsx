'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, AlertCircle, MessageSquare, Target, Copy, Check } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { type DISCProfile } from '@/lib/types';
import { getDISCColor, getDISCBg } from '@/lib/utils';
import { DISC_DISPLAY } from '@/lib/constants';

interface PsychologyProfileProps {
  profile: DISCProfile;
}

export function PsychologyProfile({ profile }: PsychologyProfileProps) {
  const color = getDISCColor(profile.disc_type);
  const bg = getDISCBg(profile.disc_type);
  const [copiedWord, setCopiedWord] = useState<string | null>(null);

  const discDisplay = DISC_DISPLAY[profile.disc_type] ?? {
    label: profile.disc_label,
    description: profile.summary,
  };

  const matchStrength = Math.round(profile.confidence * 100);

  const copyWord = (word: string) => {
    navigator.clipboard.writeText(word);
    setCopiedWord(word);
    setTimeout(() => setCopiedWord(null), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, type: 'spring' }}
    >
      <Card padding="lg">
        <div className="flex items-center gap-3 mb-6">
          <h2 className="text-lg font-semibold text-[#FAFAFA]">Prospect Profile</h2>
          <div className="ml-auto flex items-center gap-1.5">
            <span className="text-xs text-[#71717A]">Match strength:</span>
            <span className="text-xs font-semibold" style={{ color }}>
              {matchStrength}/100
            </span>
          </div>
        </div>

        {/* Communication style hero */}
        <div
          className="rounded-xl p-5 mb-5 flex items-start gap-4"
          style={{ background: bg, border: `1px solid ${color}30` }}
        >
          <div
            className="w-14 h-14 rounded-xl flex items-center justify-center text-2xl font-bold text-white shrink-0"
            style={{ background: color }}
          >
            {profile.disc_type}
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-base font-bold" style={{ color }}>{discDisplay.label}</span>
            </div>
            <p className="text-sm text-[#A1A1AA] leading-[1.6]">{profile.summary}</p>
          </div>
        </div>

        {/* Core driver + decision style */}
        {(profile.hidden_motivation || profile.negotiator_style) && (
          <div className="mb-5 flex flex-wrap gap-2">
            {profile.hidden_motivation && (
              <div className="text-xs text-[#A1A1AA] bg-[#18181B] border border-[#27272A] rounded-lg px-3 py-2">
                <span className="text-[#71717A]">Core driver: </span>{profile.hidden_motivation}
              </div>
            )}
            {profile.negotiator_style && (
              <div className="text-xs text-[#A1A1AA] bg-[#18181B] border border-[#27272A] rounded-lg px-3 py-2">
                <span className="text-[#71717A]">Decision style: </span>{profile.negotiator_style}
              </div>
            )}
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
          {/* Communication style */}
          <div className="bg-[#0A0A0D] rounded-xl p-4 border border-[#27272A]">
            <div className="flex items-center gap-2 mb-3">
              <MessageSquare size={14} className="text-[#F97316]" />
              <span className="text-xs font-semibold text-[#A1A1AA] uppercase tracking-wider">How they communicate</span>
            </div>
            <div className="flex flex-col gap-2">
              <div>
                <p className="text-xs text-[#71717A] mb-1">What drives decisions</p>
                <p className="text-xs text-[#FAFAFA]">{profile.communication_style.decision_driver}</p>
              </div>
              <div>
                <p className="text-xs text-[#71717A] mb-1">Best tone for emails</p>
                <p className="text-xs text-[#FAFAFA]">{profile.communication_style.email_tone}</p>
              </div>
            </div>
          </div>

          {/* Opening strategy */}
          <div className="bg-[#0A0A0D] rounded-xl p-4 border border-[#27272A]">
            <div className="flex items-center gap-2 mb-3">
              <Target size={14} className="text-[#F97316]" />
              <span className="text-xs font-semibold text-[#A1A1AA] uppercase tracking-wider">Opening strategy</span>
            </div>
            <p className="text-xs text-[#FAFAFA] leading-[1.6]">{profile.opening_strategy}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
          {/* Prefers */}
          <div>
            <div className="flex items-center gap-1.5 mb-2">
              <CheckCircle2 size={13} className="text-[#22C55E]" />
              <span className="text-xs font-semibold text-[#A1A1AA] uppercase tracking-wider">They respond well to</span>
            </div>
            <ul className="flex flex-col gap-1.5">
              {profile.communication_style.prefers.map((pref) => (
                <li key={pref} className="text-xs text-[#A1A1AA] flex items-start gap-1.5">
                  <span className="text-[#22C55E] mt-0.5">•</span> {pref}
                </li>
              ))}
            </ul>
          </div>

          {/* What keeps them up at night */}
          <div>
            <div className="flex items-center gap-1.5 mb-2">
              <AlertCircle size={13} className="text-[#EAB308]" />
              <span className="text-xs font-semibold text-[#A1A1AA] uppercase tracking-wider">What keeps them up at night</span>
            </div>
            <ul className="flex flex-col gap-1.5">
              {profile.pain_triggers.map((pt) => (
                <li key={pt} className="text-xs text-[#A1A1AA] flex items-start gap-1.5">
                  <span className="text-[#EAB308] mt-0.5">•</span> {pt}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Influence drivers */}
        {profile.cialdini_levers && profile.cialdini_levers.length > 0 && (
          <div className="mb-5">
            <p className="text-xs font-semibold text-[#A1A1AA] uppercase tracking-wider mb-2">Influence drivers</p>
            <div className="flex flex-wrap gap-1.5">
              {profile.cialdini_levers.map((lever) => (
                <span
                  key={lever}
                  className="px-2.5 py-1 rounded-lg text-xs font-medium bg-[#27272A] text-[#A1A1AA] border border-[#3F3F46]"
                >
                  {lever}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Words that resonate — clickable to copy */}
        <div className="mb-4">
          <p className="text-xs font-semibold text-[#A1A1AA] uppercase tracking-wider mb-2">Words that resonate <span className="text-[#3F3F46] font-normal normal-case">(click to copy)</span></p>
          <div className="flex flex-wrap gap-1.5">
            {profile.power_words.map((word) => (
              <button
                key={word}
                onClick={() => copyWord(word)}
                className="px-2.5 py-1 rounded-lg text-xs font-medium flex items-center gap-1 transition-all hover:scale-105 active:scale-95"
                style={{ background: `${color}15`, color }}
              >
                {word}
                {copiedWord === word ? <Check size={10} /> : <Copy size={10} className="opacity-50" />}
              </button>
            ))}
          </div>
        </div>

        {/* Words to skip */}
        <div>
          <p className="text-xs font-semibold text-[#A1A1AA] uppercase tracking-wider mb-2">Words to skip</p>
          <div className="flex flex-wrap gap-1.5">
            {profile.avoid_words.map((word) => (
              <span
                key={word}
                className="px-2.5 py-1 rounded-lg text-xs font-medium bg-[#EF4444]/10 text-[#EF4444]"
              >
                {word}
              </span>
            ))}
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
