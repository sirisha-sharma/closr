'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { FileText, Plus, Search, Filter } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Skeleton } from '@/components/ui/Skeleton';
import { type Proposal, type ProposalStatus } from '@/lib/types';
import { formatRelativeTime, getDISCColor, truncate } from '@/lib/utils';

const statusOptions: { value: string; label: string }[] = [
  { value: '', label: 'All' },
  { value: 'draft', label: 'Draft' },
  { value: 'sent', label: 'Sent' },
  { value: 'won', label: 'Won' },
  { value: 'lost', label: 'Lost' },
];

const statusVariantMap: Record<ProposalStatus, 'default' | 'info' | 'success' | 'error' | 'accent'> = {
  draft: 'default',
  sent: 'info',
  won: 'success',
  lost: 'error',
};

export default function ProposalsPage() {
  const [proposals, setProposals] = useState<Proposal[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchProposals();
  }, [statusFilter, page]);

  const fetchProposals = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({ page: String(page), limit: '20' });
      if (statusFilter) params.set('status', statusFilter);

      const res = await fetch(`/api/proposals?${params}`);
      const data = await res.json();

      if (res.ok) {
        setProposals(data.proposals);
        setTotal(data.total);
      }
    } finally {
      setLoading(false);
    }
  };

  const filtered = proposals.filter((p) => {
    if (!search) return true;
    const q = search.toLowerCase();
    return (
      p.prospect_name?.toLowerCase().includes(q) ||
      p.service_description?.toLowerCase().includes(q) ||
      p.disc_profile?.disc_label?.toLowerCase().includes(q)
    );
  });

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#FAFAFA] flex items-center gap-2">
            <FileText size={22} className="text-[#F97316]" />
            Proposals
          </h1>
          <p className="text-sm text-[#71717A] mt-1">
            {total} proposal{total !== 1 ? 's' : ''} total
          </p>
        </div>
        <Button icon={<Plus size={16} />} asChild>
          <Link href="/generate">New Proposal</Link>
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex-1">
          <Input
            placeholder="Search by prospect name, service..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            icon={<Search size={14} />}
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter size={14} className="text-[#71717A] shrink-0" />
          <div className="flex gap-1">
            {statusOptions.map((opt) => (
              <button
                key={opt.value}
                onClick={() => { setStatusFilter(opt.value); setPage(1); }}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  statusFilter === opt.value
                    ? 'bg-[#F97316]/10 text-[#F97316] border border-[#F97316]/20'
                    : 'text-[#71717A] border border-[#27272A] hover:border-[#3F3F46]'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      {loading ? (
        <div className="flex flex-col gap-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="bg-[#18181B] border border-[#27272A] rounded-xl p-4 flex items-center gap-4">
              <Skeleton width={40} height={40} className="rounded-lg shrink-0" />
              <div className="flex-1 flex flex-col gap-2">
                <Skeleton height={14} width="40%" />
                <Skeleton height={12} width="60%" />
              </div>
              <Skeleton width={60} height={24} className="rounded-full" />
            </div>
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div className="bg-[#18181B] border border-[#27272A] rounded-xl p-12 text-center">
          <div className="w-12 h-12 rounded-xl bg-[#27272A] flex items-center justify-center mx-auto mb-3">
            <FileText size={20} className="text-[#71717A]" />
          </div>
          <p className="text-sm font-medium text-[#A1A1AA] mb-1">
            {search || statusFilter ? 'No proposals match your filters' : 'No proposals yet'}
          </p>
          <p className="text-xs text-[#71717A] mb-4">
            {search || statusFilter ? 'Try adjusting your search or filter' : 'Generate your first psychology-powered proposal'}
          </p>
          {!search && !statusFilter && (
            <Button size="sm" asChild>
              <Link href="/generate">Generate Proposal</Link>
            </Button>
          )}
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          {filtered.map((proposal, index) => (
            <motion.div
              key={proposal.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.04 }}
            >
              <Link
                href={`/proposals/${proposal.id}`}
                className="flex items-center gap-4 bg-[#18181B] border border-[#27272A] rounded-xl p-4 hover:border-[#3F3F46] hover:bg-[#1E1E22] transition-all group"
              >
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
                  <div className="flex items-center gap-2 mb-0.5">
                    <p className="text-sm font-medium text-[#FAFAFA] truncate">
                      {proposal.prospect_name || 'Unnamed Prospect'}
                    </p>
                    {proposal.disc_profile && (
                      <span className="text-xs text-[#71717A] hidden sm:block">
                        · {proposal.disc_profile.disc_label}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-[#71717A] truncate">
                    {proposal.service_description
                      ? truncate(proposal.service_description, 80)
                      : 'No service description'}
                  </p>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <Badge variant={statusVariantMap[proposal.status as ProposalStatus] || 'default'} size="sm">
                    {proposal.status}
                  </Badge>
                  <span className="text-xs text-[#71717A] hidden md:block">
                    {formatRelativeTime(proposal.created_at)}
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}

          {/* Pagination */}
          {total > 20 && (
            <div className="flex items-center justify-center gap-2 pt-4">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="px-3 py-1.5 text-xs text-[#71717A] border border-[#27272A] rounded-lg disabled:opacity-50 hover:border-[#3F3F46] transition-colors"
              >
                Previous
              </button>
              <span className="text-xs text-[#71717A]">
                Page {page} of {Math.ceil(total / 20)}
              </span>
              <button
                onClick={() => setPage((p) => p + 1)}
                disabled={page >= Math.ceil(total / 20)}
                className="px-3 py-1.5 text-xs text-[#71717A] border border-[#27272A] rounded-lg disabled:opacity-50 hover:border-[#3F3F46] transition-colors"
              >
                Next
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
