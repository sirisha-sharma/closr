'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard,
  Sparkles,
  FileText,
  Settings,
  LogOut,
  Menu,
  X,
  ChevronRight,
  CreditCard,
} from 'lucide-react';
import { Logo } from '@/components/shared/Logo';
import { cn } from '@/lib/utils';
import { createClient } from '@/lib/supabase/client';
import { toast } from 'sonner';

const navItems = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/generate', label: 'Generate', icon: Sparkles },
  { href: '/proposals', label: 'Proposals', icon: FileText },
  { href: '/settings', label: 'Settings', icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const supabase = createClient();

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileOpen(false);
  }, [pathname]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    toast.success('Signed out successfully');
    router.push('/');
    router.refresh();
  };

  const SidebarContent = () => (
    <div className="h-full flex flex-col bg-[#111113] border-r border-[#27272A]">
      {/* Logo */}
      <div className="p-5 border-b border-[#27272A]">
        <Logo href="/dashboard" />
      </div>

      {/* Nav */}
      <nav className="flex-1 p-3 flex flex-col gap-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href || (item.href !== '/dashboard' && pathname.startsWith(item.href));
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all group',
                isActive
                  ? 'bg-[#F97316]/10 text-[#F97316] border border-[#F97316]/20'
                  : 'text-[#71717A] hover:text-[#FAFAFA] hover:bg-[#18181B]'
              )}
            >
              <item.icon size={16} className={cn(isActive ? 'text-[#F97316]' : 'text-[#71717A] group-hover:text-[#FAFAFA]')} />
              {item.label}
              {isActive && (
                <ChevronRight size={14} className="ml-auto text-[#F97316]/60" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Bottom actions */}
      <div className="p-3 border-t border-[#27272A] flex flex-col gap-1">
        <Link
          href="/settings?tab=billing"
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-[#71717A] hover:text-[#FAFAFA] hover:bg-[#18181B] transition-all"
        >
          <CreditCard size={16} />
          Billing
        </Link>
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-[#71717A] hover:text-[#EF4444] hover:bg-[#EF4444]/10 transition-all w-full text-left"
        >
          <LogOut size={16} />
          Sign Out
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden lg:block w-60 fixed left-0 top-0 bottom-0 z-30">
        <SidebarContent />
      </aside>

      {/* Mobile header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-30 bg-[#111113] border-b border-[#27272A] h-14 flex items-center justify-between px-4">
        <Logo href="/dashboard" size="sm" />
        <button
          onClick={() => setIsMobileOpen(true)}
          className="text-[#71717A] hover:text-[#FAFAFA] p-2"
          aria-label="Open menu"
        >
          <Menu size={20} />
        </button>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {isMobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="lg:hidden fixed inset-0 bg-black/60 z-40"
              onClick={() => setIsMobileOpen(false)}
            />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="lg:hidden fixed left-0 top-0 bottom-0 w-72 z-50"
            >
              <div className="absolute top-4 right-4">
                <button
                  onClick={() => setIsMobileOpen(false)}
                  className="text-[#71717A] hover:text-[#FAFAFA] p-2"
                >
                  <X size={20} />
                </button>
              </div>
              <SidebarContent />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
