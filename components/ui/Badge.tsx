import { cn } from '@/lib/utils';

type BadgeVariant = 'default' | 'success' | 'error' | 'warning' | 'info' | 'accent';

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  size?: 'sm' | 'md';
}

const variantStyles: Record<BadgeVariant, string> = {
  default: 'bg-[#27272A] text-[#A1A1AA]',
  success: 'bg-[#22C55E]/10 text-[#22C55E] border border-[#22C55E]/20',
  error: 'bg-[#EF4444]/10 text-[#EF4444] border border-[#EF4444]/20',
  warning: 'bg-[#EAB308]/10 text-[#EAB308] border border-[#EAB308]/20',
  info: 'bg-[#3B82F6]/10 text-[#3B82F6] border border-[#3B82F6]/20',
  accent: 'bg-[#F97316]/10 text-[#F97316] border border-[#F97316]/20',
};

const sizeStyles = {
  sm: 'px-1.5 py-0.5 text-xs',
  md: 'px-2.5 py-1 text-xs',
};

export function Badge({ variant = 'default', size = 'md', className, children, ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-md font-medium',
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
