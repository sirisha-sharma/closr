import { cn } from '@/lib/utils';
import Link from 'next/link';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  href?: string;
  className?: string;
}

const sizeStyles = {
  sm: { icon: 'w-6 h-6 text-xs', text: 'text-base' },
  md: { icon: 'w-8 h-8 text-sm', text: 'text-lg' },
  lg: { icon: 'w-10 h-10 text-base', text: 'text-2xl' },
};

function LogoContent({ size = 'md', className }: { size?: 'sm' | 'md' | 'lg'; className?: string }) {
  const styles = sizeStyles[size];
  return (
    <div className={cn('flex items-center gap-2', className)}>
      <div className={cn(
        'rounded-lg bg-[#F97316] flex items-center justify-center font-bold text-white shrink-0',
        styles.icon
      )}>
        C
      </div>
      <span className={cn('font-semibold text-[#FAFAFA]', styles.text)}>
        Clos<span className="text-[#F97316]">r</span>
      </span>
    </div>
  );
}

export function Logo({ size = 'md', href = '/', className }: LogoProps) {
  if (href) {
    return (
      <Link href={href} className="inline-flex">
        <LogoContent size={size} className={className} />
      </Link>
    );
  }
  return <LogoContent size={size} className={className} />;
}
