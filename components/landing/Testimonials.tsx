'use client';

import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import { TESTIMONIALS } from '@/lib/constants';

export function Testimonials() {
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
          <p className="text-sm font-medium text-[#F97316] mb-3 uppercase tracking-wider">Testimonials</p>
          <h2 className="font-serif text-3xl sm:text-5xl text-[#FAFAFA] mb-4">
            Freelancers who close more deals
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-[#18181B] border border-[#27272A] rounded-2xl p-6 flex flex-col gap-4"
            >
              <div className="flex gap-1">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star key={i} size={14} className="fill-[#F97316] text-[#F97316]" />
                ))}
              </div>

              <p className="text-sm text-[#A1A1AA] leading-relaxed flex-1">
                &ldquo;{testimonial.content}&rdquo;
              </p>

              <div className="flex items-center gap-3 pt-2 border-t border-[#27272A]">
                <div className="w-9 h-9 rounded-full bg-[#F97316]/20 flex items-center justify-center text-xs font-bold text-[#F97316]">
                  {testimonial.avatar}
                </div>
                <div>
                  <p className="text-sm font-medium text-[#FAFAFA]">{testimonial.name}</p>
                  <p className="text-xs text-[#71717A]">{testimonial.role} · {testimonial.company}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
