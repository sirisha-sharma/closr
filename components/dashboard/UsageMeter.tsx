'use client';

import Link from 'next/link';
import { Zap } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { type UsageStats } from '@/lib/types';
import { getPlanDisplayName } from '@/lib/utils';
import { cn } from '@/lib/utils';

interface UsageMeterProps {
  usage: UsageStats;
}

export function UsageMeter({ usage }: UsageMeterProps) {
  const isUnlimited = usage.limit === 'unlimited';
  const percentage = isUnlimited ? 0 : Math.min((usage.used / (usage.limit as number)) * 100, 100);
  const isNearLimit = !isUnlimited && percentage >= 90;
  const isAtLimit = !isUnlimited && usage.used >= (usage.limit as number);

  return (
    <div className="bg-[#18181B] border border-[#27272A] rounded-xl p-5">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Zap size={16} className="text-[#F97316]" />
          <span className="text-sm font-medium text-[#FAFAFA]">Usage</span>
        </div>
        <Badge variant="accent" size="sm">
          {getPlanDisplayName(usage.plan)}
        </Badge>
      </div>

      {isUnlimited ? (
        <div>
          <p className="text-2xl font-bold text-[#FAFAFA]">{usage.used}</p>
          <p className="text-xs text-[#71717A] mt-0.5">proposals generated · unlimited plan</p>
        </div>
      ) : (
        <>
          <div className="flex items-end justify-between mb-2">
            <div>
              <span className="text-2xl font-bold text-[#FAFAFA]">{usage.used}</span>
              <span className="text-sm text-[#71717A]"> / {usage.limit}</span>
            </div>
            <span className={cn(
              'text-xs font-medium',
              isAtLimit ? 'text-[#EF4444]' : isNearLimit ? 'text-[#EAB308]' : 'text-[#71717A]'
            )}>
              {Math.round(percentage)}% used
            </span>
          </div>

          {/* Progress bar */}
          <div className="h-2 bg-[#27272A] rounded-full overflow-hidden mb-3">
            <div
              className={cn(
                'h-full rounded-full transition-all duration-500',
                isAtLimit ? 'bg-[#EF4444]' : isNearLimit ? 'bg-[#EAB308]' : 'bg-[#F97316]'
              )}
              style={{ width: `${percentage}%` }}
            />
          </div>

          {isAtLimit && (
            <div className="flex flex-col gap-2">
              <p className="text-xs text-[#EF4444]">You&apos;ve reached your limit for this period.</p>
              <Button size="sm" fullWidth asChild>
                <Link href="/settings?tab=billing">Upgrade Plan</Link>
              </Button>
            </div>
          )}

          {isNearLimit && !isAtLimit && (
            <p className="text-xs text-[#EAB308]">
              Running low. {(usage.limit as number) - usage.used} generations remaining.
            </p>
          )}
        </>
      )}
    </div>
  );
}
