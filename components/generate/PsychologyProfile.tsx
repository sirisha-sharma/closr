'use client';

import { motion } from 'framer-motion';
import { Brain, CheckCircle2, AlertCircle, MessageSquare, Zap } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { type DISCProfile } from '@/lib/types';
import { getDISCColor, getDISCBg } from '@/lib/utils';

interface PsychologyProfileProps {
  profile: DISCProfile;
}

export function PsychologyProfile({ profile }: PsychologyProfileProps) {
  const color = getDISCColor(profile.disc_type);
  const bg = getDISCBg(profile.disc_type);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, type: 'spring' }}
    >
      <Card padding="lg">
        <div className="flex items-center gap-3 mb-6">
          <Brain size={18} className="text-[#F97316]" />
          <h2 className="text-lg font-semibold text-[#FAFAFA]">DISC Psychology Profile</h2>
          <div className="ml-auto flex items-center gap-1.5">
            <span className="text-xs text-[#71717A]">Confidence:</span>
            <span className="text-xs font-medium" style={{ color }}>
              {Math.round(profile.confidence * 100)}%
            </span>
          </div>
        </div>

        {/* Main DISC type */}
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
              <span className="text-lg font-bold" style={{ color }}>{profile.disc_label}</span>
              <span className="text-sm text-[#71717A]">/ {profile.disc_type}-Type</span>
            </div>
            <p className="text-sm text-[#A1A1AA] leading-relaxed">{profile.summary}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
          {/* Communication style */}
          <div className="bg-[#18181B] rounded-xl p-4 border border-[#27272A]">
            <div className="flex items-center gap-2 mb-3">
              <MessageSquare size={14} className="text-[#F97316]" />
              <span className="text-xs font-semibold text-[#A1A1AA] uppercase tracking-wider">Communication Style</span>
            </div>
            <div className="flex flex-col gap-2">
              <div>
                <p className="text-xs text-[#71717A] mb-1">Decision Driver</p>
                <p className="text-xs text-[#FAFAFA]">{profile.communication_style.decision_driver}</p>
              </div>
              <div>
                <p className="text-xs text-[#71717A] mb-1">Email Tone</p>
                <p className="text-xs text-[#FAFAFA]">{profile.communication_style.email_tone}</p>
              </div>
            </div>
          </div>

          {/* Opening strategy */}
          <div className="bg-[#18181B] rounded-xl p-4 border border-[#27272A]">
            <div className="flex items-center gap-2 mb-3">
              <Zap size={14} className="text-[#F97316]" />
              <span className="text-xs font-semibold text-[#A1A1AA] uppercase tracking-wider">Opening Strategy</span>
            </div>
            <p className="text-xs text-[#FAFAFA] leading-relaxed">{profile.opening_strategy}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
          {/* Prefers */}
          <div>
            <div className="flex items-center gap-1.5 mb-2">
              <CheckCircle2 size={13} className="text-[#22C55E]" />
              <span className="text-xs font-semibold text-[#A1A1AA] uppercase tracking-wider">Prefers</span>
            </div>
            <ul className="flex flex-col gap-1.5">
              {profile.communication_style.prefers.map((pref) => (
                <li key={pref} className="text-xs text-[#A1A1AA] flex items-start gap-1.5">
                  <span className="text-[#22C55E] mt-0.5">•</span> {pref}
                </li>
              ))}
            </ul>
          </div>

          {/* Avoids */}
          <div>
            <div className="flex items-center gap-1.5 mb-2">
              <AlertCircle size={13} className="text-[#EF4444]" />
              <span className="text-xs font-semibold text-[#A1A1AA] uppercase tracking-wider">Avoids</span>
            </div>
            <ul className="flex flex-col gap-1.5">
              {profile.communication_style.avoids.map((avoid) => (
                <li key={avoid} className="text-xs text-[#A1A1AA] flex items-start gap-1.5">
                  <span className="text-[#EF4444] mt-0.5">•</span> {avoid}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Power words */}
        <div className="mb-4">
          <p className="text-xs font-semibold text-[#A1A1AA] uppercase tracking-wider mb-2">Power Words</p>
          <div className="flex flex-wrap gap-1.5">
            {profile.power_words.map((word) => (
              <span
                key={word}
                className="px-2.5 py-1 rounded-lg text-xs font-medium"
                style={{ background: `${color}15`, color }}
              >
                {word}
              </span>
            ))}
          </div>
        </div>

        {/* Avoid words */}
        <div>
          <p className="text-xs font-semibold text-[#A1A1AA] uppercase tracking-wider mb-2">Words to Avoid</p>
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
