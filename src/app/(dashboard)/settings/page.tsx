'use client';

import { useState, useEffect, Suspense } from 'react';
import { motion } from 'framer-motion';
import { User, CreditCard, Bell, Shield, Check, ExternalLink } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import { toast } from 'sonner';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { createClient } from '@/lib/supabase/client';
import { PRICING } from '@/lib/constants';
import { getPlanDisplayName } from '@/lib/utils';
import { type Profile } from '@/lib/types';

const tabs = [
  { id: 'profile', label: 'Profile', icon: User },
  { id: 'billing', label: 'Billing', icon: CreditCard },
  { id: 'security', label: 'Security', icon: Shield },
];

function SettingsContent() {
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState(searchParams.get('tab') || 'profile');
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [fullName, setFullName] = useState('');
  const [saving, setSaving] = useState(false);
  const [checkoutLoading, setCheckoutLoading] = useState<string | null>(null);
  const [portalLoading, setPortalLoading] = useState(false);

  useEffect(() => {
    fetchProfile();
  }, []);

  useEffect(() => {
    const tab = searchParams.get('tab');
    if (tab) setActiveTab(tab);

    if (searchParams.get('success') === 'true') {
      toast.success('Subscription updated successfully!');
    }
    if (searchParams.get('cancelled') === 'true') {
      toast.info('Checkout cancelled');
    }
  }, [searchParams]);

  const fetchProfile = async () => {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { data } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single();

    if (data) {
      setProfile(data as Profile);
      setFullName(data.full_name || '');
    }
    setLoading(false);
  };

  const handleSaveProfile = async () => {
    if (!profile) return;
    setSaving(true);
    const supabase = createClient();

    const { error } = await supabase
      .from('profiles')
      .update({
        full_name: fullName,
        updated_at: new Date().toISOString(),
      })
      .eq('id', profile.id);

    if (error) {
      toast.error('Failed to save profile');
    } else {
      toast.success('Profile updated successfully');
      setProfile((p) => p ? { ...p, full_name: fullName } : p);
    }
    setSaving(false);
  };

  const handleCheckout = async (plan: string) => {
    setCheckoutLoading(plan);
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ plan }),
      });
      const data = await res.json();
      if (res.ok && data.url) {
        window.location.href = data.url;
      } else {
        toast.error(data.error || 'Failed to start checkout');
      }
    } catch {
      toast.error('Checkout failed');
    } finally {
      setCheckoutLoading(null);
    }
  };

  const handleBillingPortal = async () => {
    setPortalLoading(true);
    try {
      const res = await fetch('/api/billing', { method: 'POST' });
      const data = await res.json();
      if (res.ok && data.url) {
        window.location.href = data.url;
      } else {
        toast.error(data.error || 'Failed to open billing portal');
      }
    } catch {
      toast.error('Failed to open billing portal');
    } finally {
      setPortalLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-[#FAFAFA]">Settings</h1>
        <p className="text-sm text-[#71717A] mt-1">Manage your account and subscription</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Tab nav */}
        <div className="lg:w-48 shrink-0">
          <nav className="flex flex-row lg:flex-col gap-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all text-left ${
                  activeTab === tab.id
                    ? 'bg-[#F97316]/10 text-[#F97316] border border-[#F97316]/20'
                    : 'text-[#71717A] hover:text-[#FAFAFA] hover:bg-[#18181B]'
                }`}
              >
                <tab.icon size={14} />
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Tab content */}
        <div className="flex-1 min-w-0">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
          >
            {/* Profile tab */}
            {activeTab === 'profile' && (
              <Card padding="lg">
                <h2 className="text-base font-semibold text-[#FAFAFA] mb-6">Profile Information</h2>
                {loading ? (
                  <div className="flex flex-col gap-4">
                    <div className="h-10 bg-[#27272A] rounded-lg shimmer" />
                    <div className="h-10 bg-[#27272A] rounded-lg shimmer" />
                  </div>
                ) : (
                  <div className="flex flex-col gap-4">
                    <Input
                      label="Full Name"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="Your full name"
                    />
                    <Input
                      label="Email Address"
                      value={profile?.email || ''}
                      disabled
                      hint="Email cannot be changed (used for magic link login)"
                    />
                    <div className="flex items-center justify-between pt-2">
                      <div>
                        <p className="text-sm text-[#A1A1AA]">Plan</p>
                        <Badge variant="accent" className="mt-1">
                          {getPlanDisplayName(profile?.plan || 'free')}
                        </Badge>
                      </div>
                      <Button
                        onClick={handleSaveProfile}
                        loading={saving}
                        size="sm"
                      >
                        Save Changes
                      </Button>
                    </div>
                  </div>
                )}
              </Card>
            )}

            {/* Billing tab */}
            {activeTab === 'billing' && (
              <div className="flex flex-col gap-6">
                {/* Current plan */}
                <Card padding="lg">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h2 className="text-base font-semibold text-[#FAFAFA]">Current Plan</h2>
                      <p className="text-sm text-[#71717A] mt-0.5">
                        You&apos;re on the <span className="text-[#F97316]">{getPlanDisplayName(profile?.plan || 'free')}</span> plan
                      </p>
                    </div>
                    {profile?.plan !== 'free' && (
                      <Button
                        variant="secondary"
                        size="sm"
                        loading={portalLoading}
                        onClick={handleBillingPortal}
                        icon={<ExternalLink size={13} />}
                      >
                        Manage
                      </Button>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
                    <div>
                      <p className="text-[#71717A] text-xs mb-1">Generations Used</p>
                      <p className="text-[#FAFAFA] font-medium">{profile?.generations_used || 0}</p>
                    </div>
                    <div>
                      <p className="text-[#71717A] text-xs mb-1">Limit</p>
                      <p className="text-[#FAFAFA] font-medium">
                        {profile?.plan === 'pro' || profile?.plan === 'agency' ? 'Unlimited' : profile?.plan === 'starter' ? '10/month' : '3 total'}
                      </p>
                    </div>
                    <div>
                      <p className="text-[#71717A] text-xs mb-1">Billing</p>
                      <p className="text-[#FAFAFA] font-medium">
                        {profile?.plan === 'free' ? 'Free' : 'Monthly'}
                      </p>
                    </div>
                  </div>
                </Card>

                {/* Upgrade options */}
                {profile?.plan !== 'agency' && (
                  <div>
                    <h2 className="text-base font-semibold text-[#FAFAFA] mb-4">Upgrade Plan</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      {Object.entries(PRICING).map(([key, plan]) => {
                        const isCurrent = profile?.plan === key;
                        return (
                          <div
                            key={key}
                            className={`rounded-xl p-4 border flex flex-col gap-3 ${
                              isCurrent
                                ? 'border-[#F97316]/40 bg-[#F97316]/5'
                                : 'border-[#27272A] bg-[#18181B]'
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <span className="text-sm font-semibold text-[#FAFAFA]">{plan.name}</span>
                              {isCurrent && (
                                <Badge variant="accent" size="sm">Current</Badge>
                              )}
                            </div>
                            <div className="flex items-baseline gap-1">
                              <span className="text-2xl font-bold text-[#FAFAFA]">${plan.price}</span>
                              <span className="text-xs text-[#71717A]">/mo</span>
                            </div>
                            <ul className="flex flex-col gap-1.5">
                              {plan.features.slice(0, 3).map((f) => (
                                <li key={f} className="flex items-center gap-2 text-xs text-[#A1A1AA]">
                                  <Check size={10} className="text-[#22C55E] shrink-0" />
                                  {f}
                                </li>
                              ))}
                            </ul>
                            {!isCurrent && (
                              <Button
                                size="sm"
                                fullWidth
                                variant={key === 'pro' ? 'primary' : 'secondary'}
                                loading={checkoutLoading === key}
                                onClick={() => handleCheckout(key)}
                              >
                                Upgrade to {plan.name}
                              </Button>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Security tab */}
            {activeTab === 'security' && (
              <Card padding="lg">
                <h2 className="text-base font-semibold text-[#FAFAFA] mb-6">Security</h2>
                <div className="flex flex-col gap-4">
                  <div className="flex items-start gap-3 bg-[#111113] border border-[#27272A] rounded-xl p-4">
                    <Shield size={16} className="text-[#22C55E] shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-[#FAFAFA]">Magic Link Authentication</p>
                      <p className="text-xs text-[#71717A] mt-0.5">
                        Your account uses passwordless authentication. You sign in via a secure magic link sent to your email. No password to remember or compromise.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 bg-[#111113] border border-[#27272A] rounded-xl p-4">
                    <Shield size={16} className="text-[#3B82F6] shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-[#FAFAFA]">Data Privacy</p>
                      <p className="text-xs text-[#71717A] mt-0.5">
                        All prospect data is encrypted at rest and in transit. We never use your data to train AI models. You can delete your account and all associated data at any time.
                      </p>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-[#27272A]">
                    <p className="text-sm font-medium text-[#FAFAFA] mb-2">Danger Zone</p>
                    <Button variant="danger" size="sm">
                      Delete Account
                    </Button>
                  </div>
                </div>
              </Card>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default function SettingsPage() {
  return (
    <Suspense fallback={<div className="text-[#71717A]">Loading...</div>}>
      <SettingsContent />
    </Suspense>
  );
}
