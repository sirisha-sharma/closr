'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Brain, HelpCircle } from 'lucide-react';
import { Textarea } from '@/components/ui/Textarea';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';

interface ProspectInputProps {
  onAnalyze: (bio: string, name: string) => void;
  loading: boolean;
}

const EXAMPLE_BIO = `I'm a results-driven CMO with 12+ years of experience scaling B2B SaaS companies from $1M to $50M ARR. I focus relentlessly on data-backed growth strategies and believe in execution over endless planning. I've led teams that delivered 3x pipeline growth in 18 months. Currently obsessed with building scalable demand generation engines that actually drive revenue, not just vanity metrics. I make fast decisions and expect the same from my team and partners.`;

export function ProspectInput({ onAnalyze, loading }: ProspectInputProps) {
  const [bio, setBio] = useState('');
  const [name, setName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (bio.trim().length < 50) return;
    onAnalyze(bio.trim(), name.trim());
  };

  const loadExample = () => {
    setBio(EXAMPLE_BIO);
    setName('Alex Johnson');
  };

  const wordCount = bio.trim() ? bio.trim().split(/\s+/).length : 0;

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
              <Brain size={18} className="text-[#F97316]" />
              Prospect Bio Analysis
            </h2>
            <p className="text-sm text-[#71717A] mt-1">
              Paste your prospect&apos;s LinkedIn About section or any professional bio
            </p>
          </div>
          <button
            onClick={loadExample}
            className="text-xs text-[#F97316] hover:text-[#FB923C] flex items-center gap-1 transition-colors"
          >
            <HelpCircle size={12} />
            Load Example
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <Input
            label="Prospect Name (optional)"
            placeholder="e.g., Sarah Johnson"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <div className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-[#A1A1AA]">
                LinkedIn Bio / About Text
              </label>
              <span className={`text-xs ${wordCount > 30 ? 'text-[#22C55E]' : 'text-[#71717A]'}`}>
                {wordCount} words {wordCount >= 30 ? '✓' : '(min. 30)'}
              </span>
            </div>
            <Textarea
              placeholder="Paste the prospect's LinkedIn About section, personal bio, or any professional description text here..."
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              rows={8}
              error={bio.length > 0 && bio.trim().split(/\s+/).length < 30 ? 'Please provide at least 30 words for accurate DISC analysis' : undefined}
            />
          </div>

          {/* Tips */}
          <div className="bg-[#F97316]/5 border border-[#F97316]/15 rounded-lg p-3">
            <p className="text-xs text-[#F97316] font-medium mb-1">Tips for best results:</p>
            <ul className="text-xs text-[#A1A1AA] flex flex-col gap-1">
              <li>• Use 100–500 words for most accurate DISC profiling</li>
              <li>• LinkedIn &ldquo;About&rdquo; sections and bios work best</li>
              <li>• Include any personal mission or values statements</li>
            </ul>
          </div>

          <Button
            type="submit"
            size="lg"
            fullWidth
            loading={loading}
            disabled={bio.trim().split(/\s+/).length < 30}
            icon={<Brain size={18} />}
          >
            {loading ? 'Analyzing prospect psychology...' : 'Analyze Prospect'}
          </Button>
        </form>
      </Card>
    </motion.div>
  );
}
