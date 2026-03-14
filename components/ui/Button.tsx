'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger' | 'outline';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  children?: React.ReactNode;
  fullWidth?: boolean;
  asChild?: boolean;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary: 'bg-[#F97316] text-white hover:bg-[#EA6A0A] glow-button',
  secondary: 'bg-[#18181B] text-[#FAFAFA] border border-[#27272A] hover:bg-[#1E1E22] hover:border-[#3F3F46]',
  ghost: 'text-[#A1A1AA] hover:text-[#FAFAFA] hover:bg-[#18181B]',
  danger: 'bg-[#EF4444]/10 text-[#EF4444] border border-[#EF4444]/30 hover:bg-[#EF4444]/20',
  outline: 'border border-[#F97316]/50 text-[#F97316] hover:bg-[#F97316]/10',
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'h-8 px-3 text-xs gap-1.5',
  md: 'h-10 px-4 text-sm gap-2',
  lg: 'h-12 px-6 text-base gap-2.5',
};

export function Button({
  variant = 'primary',
  size = 'md',
  loading = false,
  icon,
  iconPosition = 'left',
  children,
  fullWidth = false,
  className,
  disabled,
  asChild = false,
  ...props
}: ButtonProps) {
  const isDisabled = disabled || loading;

  const baseClass = cn(
    'relative inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F97316] focus-visible:ring-offset-2 focus-visible:ring-offset-[#09090B] disabled:opacity-50 disabled:cursor-not-allowed select-none',
    variantStyles[variant],
    sizeStyles[size],
    fullWidth && 'w-full',
    className
  );

  const content = loading ? (
    <>
      <Loader2 className="animate-spin shrink-0" size={size === 'sm' ? 12 : size === 'lg' ? 18 : 14} />
      {children && <span>{children}</span>}
    </>
  ) : (
    <>
      {icon && iconPosition === 'left' && <span className="shrink-0">{icon}</span>}
      {children && <span>{children}</span>}
      {icon && iconPosition === 'right' && <span className="shrink-0">{icon}</span>}
    </>
  );

  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children as React.ReactElement<React.HTMLAttributes<HTMLElement>>, {
      className: cn(baseClass, (children as React.ReactElement<React.HTMLAttributes<HTMLElement>>).props.className),
    });
  }

  return (
    <motion.button
      whileTap={{ scale: isDisabled ? 1 : 0.98 }}
      whileHover={{ scale: isDisabled ? 1 : 1.01 }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      className={baseClass}
      disabled={isDisabled}
      {...(props as object)}
    >
      {content}
    </motion.button>
  );
}
