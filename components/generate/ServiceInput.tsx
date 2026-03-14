'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, RotateCcw } from 'lucide-react';
import { Textarea } from '@/components/ui/Textarea';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';

interface ServiceInputProps {
  onGenerate: (serviceDescription: string) => void;
  onReset: () => void;
  loading: boolean;
}

const EXAMPLE_SERVICES = [
  'Full-stack web development: React/Next.js frontends, Node.js backends, and database architecture. I specialize in SaaS dashboards and high-performance B2B applications.',
  'Brand strategy and visual identity: logo design, brand guidelines, and marketing collateral for B2B companies raising their first round or rebranding.',
  'Content marketing and SEO: blog strategy, long-form content, and technical SEO audits for B2B SaaS companies targeting enterprise buyers.',
];

export function ServiceInput({ onGenerate, onReset, loading }: ServiceInputProps) {
  const [service, setService] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (service.trim().length < 20) return;
    onGenerate(service.trim());
  };

  const loadExample = () => {
    setService(EXAMPLE_SERVICES[Math.floor(Math.random() * EXAMPLE_SERVICES.length)]);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <Card padding="lg">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-lg font-semibold text-[#FAFAFA] flex items-center gap-2">
              <Sparkles size={18} className="text-[#F97316]" />
              Your Service
            </h2>
            <p className="text-sm text-[#71717A] mt-1">
              Describe what you offer so we can tailor the proposal to match
            </p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={loadExample}
              className="text-xs text-[#F97316] hover:text-[#FB923C] transition-colors"
            >
              Load Example
            </button>
            <button
              onClick={onReset}
              className="text-xs text-[#71717A] hover:text-[#A1A1AA] flex items-center gap-1 transition-colors"
            >
              <RotateCcw size={11} />
              Reset
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <Textarea
            label="Service Description"
            placeholder="Describe what you do, who you help, and what makes your work unique. The more specific, the more personalized the proposal..."
            value={service}
            onChange={(e) => setService(e.target.value)}
            rows={6}
            charCount
            hint="Include your specialty, target clients, and key outcomes you deliver"
          />

          <Button
            type="submit"
            size="lg"
            fullWidth
            loading={loading}
            disabled={service.trim().length < 20}
            icon={<Sparkles size={18} />}
          >
            {loading ? 'Generating...' : 'Generate Proposal & Emails'}
          </Button>
        </form>
      </Card>
    </motion.div>
  );
}
