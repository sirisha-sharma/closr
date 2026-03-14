'use client';

import { useState } from 'react';
import { Download } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { toast } from 'sonner';
import { type Proposal } from '@/lib/types';

interface PDFExportProps {
  proposal: Proposal;
}

export function PDFExport({ proposal }: PDFExportProps) {
  const [loading, setLoading] = useState(false);

  const handleExport = async () => {
    if (!proposal.proposal_content) {
      toast.error('No proposal content to export');
      return;
    }

    setLoading(true);
    try {
      // Dynamically import to avoid SSR issues
      const { pdf } = await import('@react-pdf/renderer');
      const { ProposalDocument } = await import('./ProposalDocument');
      const React = await import('react');

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const blob = await (pdf as any)(
        React.createElement(ProposalDocument, { proposal })
      ).toBlob();

      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `proposal-${proposal.prospect_name || 'prospect'}-${new Date().toISOString().split('T')[0]}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      toast.success('PDF exported successfully');
    } catch (error) {
      console.error('PDF export error:', error);
      toast.error('Failed to export PDF');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      variant="secondary"
      size="sm"
      onClick={handleExport}
      loading={loading}
      icon={<Download size={14} />}
    >
      Export PDF
    </Button>
  );
}
