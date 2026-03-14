'use client';

import { forwardRef } from 'react';
import { cn } from '@/lib/utils';

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  hint?: string;
  charCount?: boolean;
  maxChars?: number;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, hint, charCount, maxChars, className, id, value, ...props }, ref) => {
    const inputId = id || label?.toLowerCase().replace(/\s+/g, '-');
    const currentLength = typeof value === 'string' ? value.length : 0;

    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <div className="flex items-center justify-between">
            <label htmlFor={inputId} className="text-sm font-medium text-[#A1A1AA]">
              {label}
            </label>
            {charCount && (
              <span className={cn(
                'text-xs',
                maxChars && currentLength > maxChars * 0.9
                  ? 'text-[#EAB308]'
                  : 'text-[#71717A]'
              )}>
                {currentLength}{maxChars && `/${maxChars}`}
              </span>
            )}
          </div>
        )}
        <textarea
          ref={ref}
          id={inputId}
          value={value}
          className={cn(
            'w-full rounded-lg bg-[#18181B] border text-[#FAFAFA] text-sm placeholder:text-[#71717A] transition-all duration-200 resize-none p-3',
            'focus:outline-none focus:ring-2 focus:ring-[#F97316]/50 focus:border-[#F97316]/50',
            error
              ? 'border-[#EF4444]/50 focus:ring-[#EF4444]/50 focus:border-[#EF4444]/50'
              : 'border-[#27272A] hover:border-[#3F3F46]',
            className
          )}
          {...props}
        />
        {error && <p className="text-xs text-[#EF4444]">{error}</p>}
        {hint && !error && <p className="text-xs text-[#71717A]">{hint}</p>}
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';
