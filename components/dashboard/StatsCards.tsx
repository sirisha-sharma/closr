'use client';

import { motion } from 'framer-motion';
import { FileText, TrendingUp, CheckCircle2, Mail } from 'lucide-react';

interface StatsData {
  totalProposals: number;
  wonProposals: number;
  sentProposals: number;
  winRate: number;
}

interface StatsCardsProps {
  stats: StatsData;
}

export function StatsCards({ stats }: StatsCardsProps) {
  const cards = [
    {
      label: 'Total Proposals',
      value: stats.totalProposals,
      icon: FileText,
      color: '#F97316',
      bg: 'rgba(249, 115, 22, 0.1)',
      suffix: '',
    },
    {
      label: 'Proposals Sent',
      value: stats.sentProposals,
      icon: Mail,
      color: '#3B82F6',
      bg: 'rgba(59, 130, 246, 0.1)',
      suffix: '',
    },
    {
      label: 'Deals Won',
      value: stats.wonProposals,
      icon: CheckCircle2,
      color: '#22C55E',
      bg: 'rgba(34, 197, 94, 0.1)',
      suffix: '',
    },
    {
      label: 'Win Rate',
      value: stats.winRate,
      icon: TrendingUp,
      color: '#EAB308',
      bg: 'rgba(234, 179, 8, 0.1)',
      suffix: '%',
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card, index) => (
        <motion.div
          key={card.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: index * 0.05 }}
          className="bg-[#18181B] border border-[#27272A] rounded-xl p-4 hover:border-[#3F3F46] transition-all"
        >
          <div className="flex items-start justify-between mb-3">
            <div
              className="w-9 h-9 rounded-lg flex items-center justify-center"
              style={{ background: card.bg }}
            >
              <card.icon size={18} style={{ color: card.color }} />
            </div>
          </div>
          <div>
            <p className="text-2xl font-bold text-[#FAFAFA]">
              {card.value}{card.suffix}
            </p>
            <p className="text-xs text-[#71717A] mt-0.5">{card.label}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
