import { cn } from '@/lib/utils';

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  width?: string | number;
  height?: string | number;
}

export function Skeleton({ className, width, height, style, ...props }: SkeletonProps) {
  return (
    <div
      className={cn('shimmer rounded-lg', className)}
      style={{ width, height, ...style }}
      {...props}
    />
  );
}

export function SkeletonText({ lines = 3, className }: { lines?: number; className?: string }) {
  return (
    <div className={cn('flex flex-col gap-2', className)}>
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton
          key={i}
          height={14}
          style={{ width: i === lines - 1 ? '60%' : '100%' }}
        />
      ))}
    </div>
  );
}

export function SkeletonCard({ className }: { className?: string }) {
  return (
    <div className={cn('bg-[#18181B] border border-[#27272A] rounded-xl p-4 flex flex-col gap-3', className)}>
      <div className="flex items-center gap-3">
        <Skeleton width={40} height={40} className="rounded-full" />
        <div className="flex-1 flex flex-col gap-2">
          <Skeleton height={14} width="50%" />
          <Skeleton height={12} width="30%" />
        </div>
      </div>
      <SkeletonText lines={3} />
    </div>
  );
}
