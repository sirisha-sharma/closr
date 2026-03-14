'use client';

import { useState, Suspense } from 'react';
import { motion } from 'framer-motion';
import { Mail, ArrowLeft, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Logo } from '@/components/shared/Logo';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { createClient } from '@/lib/supabase/client';
import { toast } from 'sonner';

function LoginForm() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get('redirectTo') || '/dashboard';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setLoading(true);
    const supabase = createClient();

    const { error } = await supabase.auth.signInWithOtp({
      email: email.trim(),
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback?redirectTo=${encodeURIComponent(redirectTo)}`,
      },
    });

    if (error) {
      toast.error(error.message || 'Failed to send magic link');
    } else {
      setSent(true);
    }
    setLoading(false);
  };

  if (sent) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center"
      >
        <div className="w-16 h-16 rounded-full bg-[#22C55E]/10 border border-[#22C55E]/20 flex items-center justify-center mx-auto mb-4">
          <CheckCircle2 size={28} className="text-[#22C55E]" />
        </div>
        <h2 className="text-xl font-semibold text-[#FAFAFA] mb-2">Check your email</h2>
        <p className="text-sm text-[#71717A] mb-6">
          We sent a magic link to <span className="text-[#FAFAFA]">{email}</span>.<br />
          Click the link to sign in — no password needed.
        </p>
        <button
          onClick={() => setSent(false)}
          className="text-sm text-[#F97316] hover:text-[#FB923C] transition-colors"
        >
          Use a different email
        </button>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="text-center mb-8">
        <h1 className="text-2xl font-semibold text-[#FAFAFA] mb-2">Sign in to Closr</h1>
        <p className="text-sm text-[#71717A]">
          No password needed. We&apos;ll send a magic link to your email.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <Input
          label="Email address"
          type="email"
          placeholder="you@company.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          icon={<Mail size={14} />}
          required
          autoFocus
        />

        <Button
          type="submit"
          fullWidth
          loading={loading}
          size="lg"
          icon={<Mail size={18} />}
        >
          {loading ? 'Sending magic link...' : 'Continue with Email'}
        </Button>
      </form>

      <p className="text-center text-xs text-[#71717A] mt-6">
        By continuing, you agree to our{' '}
        <Link href="/terms" className="text-[#A1A1AA] hover:text-[#FAFAFA] transition-colors">
          Terms of Service
        </Link>{' '}
        and{' '}
        <Link href="/privacy" className="text-[#A1A1AA] hover:text-[#FAFAFA] transition-colors">
          Privacy Policy
        </Link>
        .
      </p>
    </motion.div>
  );
}

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-[#09090B] flex flex-col">
      {/* Background blobs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full opacity-20 blob-animate"
          style={{
            background: 'radial-gradient(circle, rgba(249,115,22,0.4) 0%, transparent 70%)',
            filter: 'blur(80px)',
          }}
        />
      </div>

      {/* Header */}
      <div className="relative z-10 p-6">
        <Link href="/" className="inline-flex items-center gap-2 text-sm text-[#71717A] hover:text-[#A1A1AA] transition-colors">
          <ArrowLeft size={14} />
          Back to home
        </Link>
      </div>

      {/* Login card */}
      <div className="flex-1 flex items-center justify-center px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="w-full max-w-sm"
        >
          <div className="flex justify-center mb-8">
            <Logo size="lg" href="/" />
          </div>

          <div className="bg-[#18181B] border border-[#27272A] rounded-2xl p-8">
            <Suspense fallback={<div className="text-center text-[#71717A]">Loading...</div>}>
              <LoginForm />
            </Suspense>
          </div>

          <p className="text-center text-xs text-[#71717A] mt-6">
            New here? Signing in creates your free account automatically.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
