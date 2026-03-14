import Link from 'next/link';
import { Logo } from './Logo';

export function Footer() {
  return (
    <footer className="border-t border-[#27272A] bg-[#09090B]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <Logo />
            <p className="mt-3 text-sm text-[#71717A] max-w-sm leading-relaxed">
              Psychology-powered proposals that win. Analyze your prospect&apos;s DISC profile and generate personalized proposals in minutes.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-[#FAFAFA] mb-3">Product</h3>
            <ul className="flex flex-col gap-2">
              {[
                { href: '#how-it-works', label: 'How it Works' },
                { href: '#pricing', label: 'Pricing' },
                { href: '/login', label: 'Get Started' },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-[#71717A] hover:text-[#A1A1AA] transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-[#FAFAFA] mb-3">Legal</h3>
            <ul className="flex flex-col gap-2">
              {[
                { href: '/privacy', label: 'Privacy Policy' },
                { href: '/terms', label: 'Terms of Service' },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-[#71717A] hover:text-[#A1A1AA] transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-[#27272A] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[#71717A]">
            © {new Date().getFullYear()} Closr. All rights reserved.
          </p>
          <p className="text-xs text-[#71717A]">
            Built for B2B freelancers who close deals.
          </p>
        </div>
      </div>
    </footer>
  );
}
