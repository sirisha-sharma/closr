'use client';

import { forwardRef } from 'react';
import { cn } from '@/lib/utils';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
  icon?: React.ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, hint, icon, className, id, ...props }, ref) => {
    const inputId = id || label?.toLowerCase().replace(/\s+/g, '-');

    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label
            htmlFor={inputId}
            className="text-sm font-medium text-[#A1A1AA]"
          >
            {label}
          </label>
        )}
        <div className="relative">
          {icon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[#71717A]">
              {icon}
            </div>
          )}
          <input
            ref={ref}
            id={inputId}
            className={cn(
              'w-full h-10 rounded-lg bg-[#18181B] border text-[#FAFAFA] text-sm placeholder:text-[#71717A] transition-all duration-200',
              'focus:outline-none focus:ring-2 focus:ring-[#F97316]/50 focus:border-[#F97316]/50',
              icon ? 'pl-10 pr-3' : 'px-3',
              error
                ? 'border-[#EF4444]/50 focus:ring-[#EF4444]/50 focus:border-[#EF4444]/50'
                : 'border-[#27272A] hover:border-[#3F3F46]',
              className
            )}
            {...props}
          />
        </div>
        {error && (
          <p className="text-xs text-[#EF4444]">{error}</p>
        )}
        {hint && !error && (
          <p className="text-xs text-[#71717A]">{hint}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
