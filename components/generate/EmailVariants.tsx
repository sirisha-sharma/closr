'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Copy, Check, Mail, MessageSquare } from 'lucide-react';
import { type EmailVariants as EmailVariantsType } from '@/lib/types';
import { copyToClipboard } from '@/lib/utils';
import { toast } from 'sonner';

interface EmailVariantsProps {
  variants: EmailVariantsType;
}

function CopyButton({ text }: { text: string }) {
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
      {copied ? 'Copied!' : 'Copy'}
    </button>
  );
}

function EmailCard({ email, index }: { email: EmailVariantsType['emails'][0]; index: number }) {
  const emailText = `Subject: ${email.subject_line}\nPreview: ${email.preview_text}\n\n${email.body}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="bg-[#18181B] border border-[#27272A] rounded-xl overflow-hidden"
    >
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-3 border-b border-[#27272A] bg-[#111113]">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-md bg-[#F97316]/15 flex items-center justify-center text-xs font-bold text-[#F97316]">
            {index + 1}
          </div>
          <span className="text-sm font-medium text-[#FAFAFA]">{email.variant_name}</span>
        </div>
        <CopyButton text={emailText} />
      </div>

      <div className="p-5 flex flex-col gap-4">
        <p className="text-xs text-[#71717A] italic">{email.strategy}</p>

        {/* Subject line */}
        <div>
          <p className="text-xs font-medium text-[#71717A] uppercase tracking-wider mb-1.5">Subject Line</p>
          <div className="flex items-center justify-between bg-[#111113] rounded-lg px-3 py-2 border border-[#27272A]">
            <span className="text-sm font-medium text-[#FAFAFA]">{email.subject_line}</span>
            <CopyButton text={email.subject_line} />
          </div>
        </div>

        {/* Preview text */}
        <div>
          <p className="text-xs font-medium text-[#71717A] uppercase tracking-wider mb-1.5">Preview Text</p>
          <p className="text-xs text-[#A1A1AA] bg-[#111113] rounded-lg px-3 py-2 border border-[#27272A]">
            {email.preview_text}
          </p>
        </div>

        {/* Body */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <p className="text-xs font-medium text-[#71717A] uppercase tracking-wider">Email Body</p>
            <CopyButton text={email.body} />
          </div>
          <div className="bg-[#111113] rounded-xl p-4 border border-[#27272A]">
            <pre className="text-sm text-[#A1A1AA] leading-relaxed whitespace-pre-wrap font-sans">{email.body}</pre>
          </div>
        </div>

        {/* Psychology note */}
        <div className="flex items-start gap-2 bg-[#F97316]/5 border border-[#F97316]/15 rounded-lg p-3">
          <MessageSquare size={12} className="text-[#F97316] shrink-0 mt-0.5" />
          <p className="text-xs text-[#A1A1AA]">
            <span className="text-[#F97316] font-medium">Psychology: </span>
            {email.psychology_note}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export function EmailVariants({ variants }: EmailVariantsProps) {
  const followUpText = `Subject: ${variants.follow_up.subject_line}\n\n${variants.follow_up.body}`;

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center gap-2">
        <Mail size={16} className="text-[#F97316]" />
        <h3 className="text-sm font-semibold text-[#A1A1AA] uppercase tracking-wider">Cold Email Variants</h3>
      </div>

      {variants.emails.map((email, index) => (
        <EmailCard key={index} email={email} index={index} />
      ))}

      {/* Follow-up email */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.4 }}
        className="bg-[#111113] border border-[#3F3F46] rounded-xl overflow-hidden"
      >
        <div className="flex items-center justify-between px-5 py-3 border-b border-[#27272A]">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-[#A1A1AA]">Follow-up Email</span>
            <span className="text-xs text-[#71717A]">· Send 3–5 days after</span>
          </div>
          <CopyButton text={followUpText} />
        </div>

        <div className="p-5 flex flex-col gap-4">
          <div>
            <p className="text-xs font-medium text-[#71717A] uppercase tracking-wider mb-1.5">Subject</p>
            <p className="text-sm font-medium text-[#FAFAFA] bg-[#18181B] rounded-lg px-3 py-2 border border-[#27272A]">
              {variants.follow_up.subject_line}
            </p>
          </div>
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <p className="text-xs font-medium text-[#71717A] uppercase tracking-wider">Body</p>
              <CopyButton text={variants.follow_up.body} />
            </div>
            <pre className="text-sm text-[#A1A1AA] leading-relaxed whitespace-pre-wrap font-sans bg-[#18181B] rounded-xl p-4 border border-[#27272A]">
              {variants.follow_up.body}
            </pre>
          </div>
          <div className="flex items-start gap-2 bg-[#F97316]/5 border border-[#F97316]/15 rounded-lg p-3">
            <MessageSquare size={12} className="text-[#F97316] shrink-0 mt-0.5" />
            <p className="text-xs text-[#A1A1AA]">
              <span className="text-[#F97316] font-medium">Psychology: </span>
              {variants.follow_up.psychology_note}
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
