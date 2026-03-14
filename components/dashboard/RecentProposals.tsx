'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, FileText } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { type Proposal } from '@/lib/types';
import { formatRelativeTime, getDISCColor, truncate } from '@/lib/utils';

interface RecentProposalsProps {
  proposals: Proposal[];
}

const statusVariantMap: Record<string, 'default' | 'info' | 'success' | 'error' | 'accent'> = {
  draft: 'default',
  sent: 'info',
  won: 'success',
  lost: 'error',
};

export function RecentProposals({ proposals }: RecentProposalsProps) {
  if (proposals.length === 0) {
    return (
      <div className="bg-[#18181B] border border-[#27272A] rounded-xl p-8 text-center">
        <div className="w-12 h-12 rounded-xl bg-[#27272A] flex items-center justify-center mx-auto mb-3">
          <FileText size={20} className="text-[#71717A]" />
        </div>
        <p className="text-sm font-medium text-[#A1A1AA] mb-1">No proposals yet</p>
        <p className="text-xs text-[#71717A] mb-4">Create your first psychology-powered proposal</p>
        <Button size="sm" asChild>
          <Link href="/generate">Generate Proposal</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      {proposals.map((proposal, index) => (
        <motion.div
          key={proposal.id}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: index * 0.05 }}
        >
          <Link
            href={`/proposals/${proposal.id}`}
            className="flex items-center gap-4 bg-[#18181B] border border-[#27272A] rounded-xl p-4 hover:border-[#3F3F46] hover:bg-[#1E1E22] transition-all group"
          >
            {/* DISC indicator */}
            <div
              className="w-10 h-10 rounded-lg flex items-center justify-center text-sm font-bold shrink-0"
              style={{
                background: proposal.disc_profile ? `${getDISCColor(proposal.disc_profile.disc_type)}20` : '#27272A',
                color: proposal.disc_profile ? getDISCColor(proposal.disc_profile.disc_type) : '#71717A',
              }}
            >
              {proposal.disc_profile?.disc_type || '?'}
            </div>

            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-[#FAFAFA] truncate">
                {proposal.prospect_name || 'Unnamed Prospect'}
              </p>
              <p className="text-xs text-[#71717A] truncate">
                {proposal.service_description
                  ? truncate(proposal.service_description, 60)
                  : 'No service description'}
              </p>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <Badge variant={statusVariantMap[proposal.status] || 'default'} size="sm">
                {proposal.status}
              </Badge>
              <span className="text-xs text-[#71717A] hidden sm:block">
                {formatRelativeTime(proposal.created_at)}
              </span>
              <ArrowRight size={14} className="text-[#71717A] group-hover:text-[#F97316] transition-colors" />
            </div>
          </Link>
        </motion.div>
      ))}

      {proposals.length >= 5 && (
        <div className="text-center pt-2">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/proposals">View all proposals</Link>
          </Button>
        </div>
      )}
    </div>
  );
}
