'use client';

import { motion } from 'framer-motion';

const discTypes = [
  {
    type: 'D',
    label: 'Dominant',
    color: '#EF4444',
    bg: 'rgba(239, 68, 68, 0.1)',
    border: 'rgba(239, 68, 68, 0.2)',
    traits: ['Results-focused', 'Direct communicator', 'Fast decision maker'],
    power_words: ['ROI', 'results', 'drive', 'execute', 'win'],
    approach: 'Lead with impact metrics and fast execution timeline.',
  },
  {
    type: 'I',
    label: 'Influential',
    color: '#EAB308',
    bg: 'rgba(234, 179, 8, 0.1)',
    border: 'rgba(234, 179, 8, 0.2)',
    traits: ['People-oriented', 'Enthusiastic storyteller', 'Collaborative'],
    power_words: ['vision', 'team', 'inspire', 'growth', 'together'],
    approach: 'Lead with a compelling story and shared vision.',
  },
  {
    type: 'S',
    label: 'Steady',
    color: '#22C55E',
    bg: 'rgba(34, 197, 94, 0.1)',
    border: 'rgba(34, 197, 94, 0.2)',
    traits: ['Stability-focused', 'Team player', 'Methodical'],
    power_words: ['reliable', 'support', 'consistent', 'process', 'trust'],
    approach: 'Lead with proof of consistency and long-term partnership.',
  },
  {
    type: 'C',
    label: 'Conscientious',
    color: '#3B82F6',
    bg: 'rgba(59, 130, 246, 0.1)',
    border: 'rgba(59, 130, 246, 0.2)',
    traits: ['Data-driven', 'Quality-focused', 'Systematic thinker'],
    power_words: ['accuracy', 'data', 'process', 'quality', 'precision'],
    approach: 'Lead with detailed methodology and measurable outcomes.',
  },
];

export function DemoSection() {
  return (
    <section className="py-20 sm:py-32 bg-[#111113] border-y border-[#27272A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <p className="text-sm font-medium text-[#F97316] mb-3 uppercase tracking-wider">DISC Psychology</p>
          <h2 className="font-serif text-3xl sm:text-5xl text-[#FAFAFA] mb-4">
            One prospect, four different people
          </h2>
          <p className="text-[#71717A] text-lg max-w-xl mx-auto">
            Each DISC type responds to fundamentally different language. Closr speaks their language.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {discTypes.map((disc, index) => (
            <motion.div
              key={disc.type}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="rounded-2xl p-5 border transition-all hover:scale-[1.02]"
              style={{
                background: disc.bg,
                borderColor: disc.border,
              }}
            >
              <div className="flex items-center justify-between mb-4">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center text-xl font-bold text-white"
                  style={{ background: disc.color }}
                >
                  {disc.type}
                </div>
                <span className="text-sm font-medium" style={{ color: disc.color }}>
                  {disc.label}
                </span>
              </div>

              <div className="flex flex-col gap-3">
                <div>
                  <p className="text-xs text-[#71717A] mb-1.5 uppercase tracking-wider">Traits</p>
                  <div className="flex flex-col gap-1">
                    {disc.traits.map((trait) => (
                      <span key={trait} className="text-xs text-[#A1A1AA]">• {trait}</span>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="text-xs text-[#71717A] mb-1.5 uppercase tracking-wider">Power Words</p>
                  <div className="flex flex-wrap gap-1">
                    {disc.power_words.map((word) => (
                      <span
                        key={word}
                        className="px-1.5 py-0.5 rounded text-xs font-medium"
                        style={{ background: `${disc.color}20`, color: disc.color }}
                      >
                        {word}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="text-xs text-[#71717A] mb-1 uppercase tracking-wider">Approach</p>
                  <p className="text-xs text-[#A1A1AA] leading-relaxed">{disc.approach}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
