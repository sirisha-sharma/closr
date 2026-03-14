'use client';

import { motion } from 'framer-motion';
import { Copy, Check } from 'lucide-react';
import { useState } from 'react';
import { type ProposalContent } from '@/lib/types';
import { copyToClipboard } from '@/lib/utils';
import { toast } from 'sonner';

interface ProposalOutputProps {
  proposal: ProposalContent;
}

function CopyButton({ text, label = 'Copy' }: { text: string; label?: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await copyToClipboard(text);
    setCopied(true);
    toast.success('Copied to clipboard');
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={handleCopy}
      className="flex items-center gap-1.5 text-xs text-[#71717A] hover:text-[#F97316] transition-colors px-2 py-1 rounded-lg hover:bg-[#F97316]/10"
    >
      {copied ? <Check size={12} className="text-[#22C55E]" /> : <Copy size={12} />}
      {copied ? 'Copied!' : label}
    </button>
  );
}

function getFullProposalText(proposal: ProposalContent): string {
  return `${proposal.headline}

${proposal.hook}

${proposal.problem_section.title}
${proposal.problem_section.content}

${proposal.solution_section.title}
${proposal.solution_section.content}

${proposal.scope_section.title}
${proposal.scope_section.items.map((item) => `• ${item}`).join('\n')}

Timeline: ${proposal.timeline}

Investment
${proposal.investment.note}
${proposal.investment.range}

${proposal.cta}

${proposal.ps_line}`;
}

export function ProposalOutput({ proposal }: ProposalOutputProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col gap-5"
    >
      {/* Header with copy all */}
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-[#A1A1AA] uppercase tracking-wider">Proposal</h3>
        <CopyButton text={getFullProposalText(proposal)} label="Copy Full Proposal" />
      </div>

      {/* Headline */}
      <div className="bg-[#18181B] border border-[#27272A] rounded-xl p-5">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-medium text-[#71717A] uppercase tracking-wider">Headline</span>
          <CopyButton text={proposal.headline} />
        </div>
        <h2 className="font-serif text-xl text-[#FAFAFA] leading-snug">{proposal.headline}</h2>
      </div>

      {/* Hook */}
      <div className="bg-[#18181B] border border-[#27272A] rounded-xl p-5">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-medium text-[#71717A] uppercase tracking-wider">Opening Hook</span>
          <CopyButton text={proposal.hook} />
        </div>
        <p className="text-sm text-[#A1A1AA] leading-relaxed">{proposal.hook}</p>
      </div>

      {/* Problem */}
      <div className="bg-[#18181B] border border-[#27272A] rounded-xl p-5">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-medium text-[#71717A] uppercase tracking-wider">{proposal.problem_section.title}</span>
          <CopyButton text={`${proposal.problem_section.title}\n${proposal.problem_section.content}`} />
        </div>
        <div className="text-sm text-[#A1A1AA] leading-relaxed whitespace-pre-wrap">{proposal.problem_section.content}</div>
      </div>

      {/* Solution */}
      <div className="bg-[#18181B] border border-[#F97316]/20 rounded-xl p-5">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-medium text-[#F97316] uppercase tracking-wider">{proposal.solution_section.title}</span>
          <CopyButton text={`${proposal.solution_section.title}\n${proposal.solution_section.content}`} />
        </div>
        <div className="text-sm text-[#A1A1AA] leading-relaxed whitespace-pre-wrap">{proposal.solution_section.content}</div>
      </div>

      {/* Scope */}
      <div className="bg-[#18181B] border border-[#27272A] rounded-xl p-5">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-medium text-[#71717A] uppercase tracking-wider">{proposal.scope_section.title}</span>
          <CopyButton text={`${proposal.scope_section.title}\n${proposal.scope_section.items.map(i => `• ${i}`).join('\n')}`} />
        </div>
        <ul className="flex flex-col gap-2">
          {proposal.scope_section.items.map((item, i) => (
            <li key={i} className="flex items-start gap-2.5 text-sm text-[#A1A1AA]">
              <span className="text-[#F97316] shrink-0 mt-0.5">→</span>
              {item}
            </li>
          ))}
        </ul>
      </div>

      {/* Timeline + Investment row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="bg-[#18181B] border border-[#27272A] rounded-xl p-4">
          <span className="text-xs font-medium text-[#71717A] uppercase tracking-wider block mb-2">Timeline</span>
          <p className="text-sm text-[#FAFAFA]">{proposal.timeline}</p>
        </div>
        <div className="bg-[#18181B] border border-[#27272A] rounded-xl p-4">
          <span className="text-xs font-medium text-[#71717A] uppercase tracking-wider block mb-2">Investment</span>
          <p className="text-xs text-[#A1A1AA] mb-1">{proposal.investment.note}</p>
          <p className="text-sm font-semibold text-[#FAFAFA]">{proposal.investment.range}</p>
        </div>
      </div>

      {/* CTA */}
      <div className="bg-[#F97316]/5 border border-[#F97316]/20 rounded-xl p-5">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-medium text-[#F97316] uppercase tracking-wider">Call to Action</span>
          <CopyButton text={proposal.cta} />
        </div>
        <p className="text-sm font-medium text-[#FAFAFA]">{proposal.cta}</p>
      </div>

      {/* PS */}
      <div className="bg-[#18181B] border border-[#27272A] rounded-xl p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-medium text-[#71717A] uppercase tracking-wider">P.S. Line</span>
          <CopyButton text={proposal.ps_line} />
        </div>
        <p className="text-sm text-[#A1A1AA] italic">{proposal.ps_line}</p>
      </div>
    </motion.div>
  );
}
