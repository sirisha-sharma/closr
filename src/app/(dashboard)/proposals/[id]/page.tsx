'use client';

import { useState, useEffect, use } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Pencil, Trash2, ExternalLink } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Skeleton, SkeletonText } from '@/components/ui/Skeleton';
import { Modal } from '@/components/ui/Modal';
import { ProposalOutput } from '@/components/generate/ProposalOutput';
import { EmailVariants } from '@/components/generate/EmailVariants';
import { PsychologyProfile } from '@/components/generate/PsychologyProfile';
import { PDFExport } from '@/components/generate/PDFExport';
import { type Proposal, type ProposalStatus } from '@/lib/types';
import { formatDate, getDISCColor } from '@/lib/utils';

const statusOptions: ProposalStatus[] = ['draft', 'sent', 'won', 'lost'];

const statusVariantMap: Record<ProposalStatus, 'default' | 'info' | 'success' | 'error'> = {
  draft: 'default',
  sent: 'info',
  won: 'success',
  lost: 'error',
};

export default function ProposalDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();
  const [proposal, setProposal] = useState<Proposal | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'proposal' | 'emails' | 'psychology'>('proposal');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [statusUpdating, setStatusUpdating] = useState(false);

  useEffect(() => {
    fetchProposal();
  }, [id]);

  const fetchProposal = async () => {
    try {
      const res = await fetch(`/api/proposals/${id}`);
      const data = await res.json();
      if (res.ok) {
        setProposal(data.proposal);
      } else {
        toast.error('Proposal not found');
        router.push('/proposals');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (status: ProposalStatus) => {
    if (!proposal) return;
    setStatusUpdating(true);
    try {
      const res = await fetch(`/api/proposals/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });
      const data = await res.json();
      if (res.ok) {
        setProposal(data.proposal);
        toast.success(`Status updated to ${status}`);
      } else {
        toast.error('Failed to update status');
      }
    } finally {
      setStatusUpdating(false);
    }
  };

  const handleDelete = async () => {
    setDeleting(true);
    try {
      const res = await fetch(`/api/proposals/${id}`, { method: 'DELETE' });
      if (res.ok) {
        toast.success('Proposal deleted');
        router.push('/proposals');
      } else {
        toast.error('Failed to delete proposal');
      }
    } finally {
      setDeleting(false);
      setShowDeleteModal(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col gap-6">
        <div className="flex items-center gap-3 mb-2">
          <Skeleton width={80} height={32} className="rounded-lg" />
          <Skeleton width={200} height={24} />
        </div>
        <div className="bg-[#18181B] border border-[#27272A] rounded-xl p-6">
          <SkeletonText lines={5} />
        </div>
      </div>
    );
  }

  if (!proposal) return null;

  const tabs = [
    { id: 'proposal', label: 'Proposal', enabled: !!proposal.proposal_content },
    { id: 'emails', label: 'Cold Emails', enabled: !!proposal.email_variants },
    { id: 'psychology', label: 'Psychology Profile', enabled: !!proposal.disc_profile },
  ] as const;

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
        <div>
          <Link
            href="/proposals"
            className="inline-flex items-center gap-1.5 text-xs text-[#71717A] hover:text-[#A1A1AA] transition-colors mb-3"
          >
            <ArrowLeft size={12} />
            Back to Proposals
          </Link>
          <div className="flex items-center gap-3 flex-wrap">
            <h1 className="text-xl font-bold text-[#FAFAFA]">
              {proposal.prospect_name || 'Unnamed Prospect'}
            </h1>
            {proposal.disc_profile && (
              <span
                className="px-2 py-0.5 rounded-md text-xs font-semibold"
                style={{
                  background: `${getDISCColor(proposal.disc_profile.disc_type)}20`,
                  color: getDISCColor(proposal.disc_profile.disc_type),
                }}
              >
                {proposal.disc_profile.disc_type} — {proposal.disc_profile.disc_label}
              </span>
            )}
            <Badge variant={statusVariantMap[proposal.status as ProposalStatus]}>
              {proposal.status}
            </Badge>
          </div>
          <p className="text-xs text-[#71717A] mt-1">Created {formatDate(proposal.created_at)}</p>
        </div>

        <div className="flex gap-2 flex-wrap">
          <PDFExport proposal={proposal} />
          <Button
            variant="danger"
            size="sm"
            icon={<Trash2 size={13} />}
            onClick={() => setShowDeleteModal(true)}
          >
            Delete
          </Button>
        </div>
      </div>

      {/* Status controls */}
      <div className="flex items-center gap-2 flex-wrap">
        <span className="text-xs text-[#71717A]">Status:</span>
        {statusOptions.map((s) => (
          <button
            key={s}
            onClick={() => handleStatusChange(s)}
            disabled={statusUpdating || proposal.status === s}
            className={`px-3 py-1 rounded-lg text-xs font-medium transition-all disabled:opacity-50 ${
              proposal.status === s
                ? 'bg-[#F97316]/10 text-[#F97316] border border-[#F97316]/30'
                : 'text-[#71717A] border border-[#27272A] hover:border-[#3F3F46]'
            }`}
          >
            {s}
          </button>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex border-b border-[#27272A]">
        {tabs.filter((t) => t.enabled).map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2.5 text-sm font-medium transition-colors relative ${
              activeTab === tab.id
                ? 'text-[#FAFAFA] tab-active'
                : 'text-[#71717A] hover:text-[#A1A1AA]'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
      >
        {activeTab === 'proposal' && proposal.proposal_content && (
          <ProposalOutput proposal={proposal.proposal_content} />
        )}
        {activeTab === 'emails' && proposal.email_variants && (
          <EmailVariants variants={proposal.email_variants} />
        )}
        {activeTab === 'psychology' && proposal.disc_profile && (
          <PsychologyProfile profile={proposal.disc_profile} />
        )}
      </motion.div>

      {/* Delete confirmation modal */}
      <Modal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        title="Delete Proposal"
        description="Are you sure you want to delete this proposal? This action cannot be undone."
        size="sm"
      >
        <div className="flex gap-3 justify-end mt-4">
          <Button variant="ghost" size="sm" onClick={() => setShowDeleteModal(false)}>
            Cancel
          </Button>
          <Button
            variant="danger"
            size="sm"
            loading={deleting}
            onClick={handleDelete}
            icon={<Trash2 size={14} />}
          >
            Delete Proposal
          </Button>
        </div>
      </Modal>
    </div>
  );
}
