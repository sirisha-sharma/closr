export const dynamic = 'force-dynamic';

import { redirect } from 'next/navigation';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { createClient } from '@/lib/supabase/server';
import { StatsCards } from '@/components/dashboard/StatsCards';
import { RecentProposals } from '@/components/dashboard/RecentProposals';
import { UsageMeter } from '@/components/dashboard/UsageMeter';
import { Button } from '@/components/ui/Button';
import { type Proposal, PLAN_LIMITS } from '@/lib/types';
import { isMonthlyResetDue } from '@/lib/utils';

export const metadata = {
  title: 'Dashboard — Closr',
};

export default async function DashboardPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect('/login');

  // Fetch profile and proposals in parallel
  const [profileResult, proposalsResult] = await Promise.all([
    supabase.from('profiles').select('*').eq('id', user.id).single(),
    supabase
      .from('proposals')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
      .limit(5),
  ]);

  const profile = profileResult.data;
  const proposals = (proposalsResult.data as Proposal[]) || [];

  if (!profile) redirect('/login');

  // Calculate stats
  const allProposalsResult = await supabase
    .from('proposals')
    .select('status')
    .eq('user_id', user.id);

  const allProposals = allProposalsResult.data || [];

  if (allProposals.length === 0) {
    redirect('/generate');
  }

  const wonCount = allProposals.filter((p) => p.status === 'won').length;
  const totalClosed = wonCount + (allProposals.filter((p) => p.status === 'lost').length);
  const winRate = totalClosed > 0 ? Math.round((wonCount / totalClosed) * 100) : 0;

  // Usage
  const limits = PLAN_LIMITS[profile.plan as keyof typeof PLAN_LIMITS];
  let generationsUsed = profile.generations_used;
  if (limits.monthly_reset && isMonthlyResetDue(profile.generations_reset_at)) {
    generationsUsed = 0;
  }

  const usage = {
    used: generationsUsed,
    limit: limits.generations,
    plan: profile.plan,
    reset_at: profile.generations_reset_at,
  };

  const firstName = profile.full_name?.split(' ')[0] || user.email?.split('@')[0] || 'there';

  return (
    <div className="flex flex-col gap-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#FAFAFA]">
            Good {new Date().getHours() < 12 ? 'morning' : new Date().getHours() < 17 ? 'afternoon' : 'evening'},{' '}
            {firstName}.
          </h1>
          <p className="text-sm text-[#71717A] mt-1">
            Here&apos;s an overview of your proposals and activity.
          </p>
        </div>
        <Button asChild>
          <Link href="/generate">New Proposal</Link>
        </Button>
      </div>

      {/* Stats */}
      <StatsCards
        stats={{
          totalProposals: allProposals.length,
          wonProposals: wonCount,
          sentProposals: allProposals.filter((p) => p.status === 'sent').length,
          winRate,
        }}
      />

      {/* Main content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent proposals */}
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-semibold text-[#FAFAFA]">Recent Proposals</h2>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/proposals" className="flex items-center gap-1">
                View all <ArrowRight size={12} />
              </Link>
            </Button>
          </div>
          <RecentProposals proposals={proposals} />
        </div>

        {/* Sidebar widgets */}
        <div className="flex flex-col gap-4">
          <UsageMeter usage={usage} />

          {/* Quick actions */}
          <div className="bg-[#18181B] border border-[#27272A] rounded-xl p-4">
            <h3 className="text-sm font-semibold text-[#FAFAFA] mb-3">Quick Actions</h3>
            <div className="flex flex-col gap-2">
              <Button variant="secondary" size="sm" fullWidth asChild>
                <Link href="/generate">Generate Proposal</Link>
              </Button>
              <Button variant="ghost" size="sm" fullWidth asChild>
                <Link href="/proposals">View All Proposals</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
