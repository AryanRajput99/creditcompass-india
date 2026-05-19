'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Menu, X, CreditCard, ChevronDown, Phone, Smartphone, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import NavbarSearch from './NavbarSearch';

const NAV_LINKS = [
  {
    label: 'Credit Cards',
    href: '/cards',
    children: [
      { label: 'Browse All Cards', href: '/cards' },
      { label: 'Compare Cards', href: '/compare' },
      { label: 'RuPay UPI Cards', href: '/rupay-upi-cards' },
      { label: 'Cashback Cards', href: '/category/cashback' },
      { label: 'Travel & Lounge', href: '/category/travel' },
      { label: 'Lifetime Free', href: '/category/lifetime-free' },
      { label: 'Find My Card 🧭', href: '/quiz' },
    ],
  },
  { label: 'Loans', href: '/coming-soon' },
  { label: 'Credit Score', href: '/coming-soon' },
  { label: 'Blog', href: '/blog' },
  { label: 'Best Offers 🔥', href: '/best-earning-offers' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-[hsl(var(--color-border))] transition-all">
      {/* Subtle Utility Bar */}
      <div className="bg-[hsl(var(--color-bg-secondary))] border-b border-[hsl(var(--color-border))/50 py-1.5 hidden md:block">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-end gap-6">
          <Link href="/coming-soon" className="text-[11px] font-bold text-[hsl(var(--color-text-tertiary))] hover:text-[hsl(var(--color-primary))] flex items-center gap-1.5 transition-colors">
            <Phone className="w-3 h-3" />
            Talk to an Expert
          </Link>
          <Link href="/coming-soon" className="text-[11px] font-bold text-[hsl(var(--color-text-tertiary))] hover:text-[hsl(var(--color-primary))] flex items-center gap-1.5 transition-colors">
            <Smartphone className="w-3 h-3" />
            Download App
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-[hsl(var(--color-primary))] flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
              <CreditCard className="w-5 h-5 text-white" />
            </div>
            <span className="font-extrabold text-2xl tracking-tighter text-[hsl(var(--color-text))]">
              CreditCompass
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-10">
            {NAV_LINKS.map((link) => (
              <div
                key={link.label}
                className="relative group h-20 flex items-center"
                onMouseEnter={() => link.children && setOpenDropdown(link.label)}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <Link
                  href={link.href}
                  className="flex items-center gap-1.5 text-[14px] font-bold text-[hsl(var(--color-text-secondary))] hover:text-[hsl(var(--color-text))] transition-colors"
                >
                  {link.label}
                  {link.children && (
                    <ChevronDown
                      className={cn(
                        'w-3.5 h-3.5 transition-transform group-hover:text-[hsl(var(--color-primary))]',
                        openDropdown === link.label && 'rotate-180'
                      )}
                    />
                  )}
                </Link>

                {/* Dropdown Menu */}
                {link.children && openDropdown === link.label && (
                  <div className="absolute top-[70px] left-1/2 -translate-x-1/2 w-72 bg-white rounded-2xl border border-[hsl(var(--color-border))] shadow-2xl py-3 animate-fade-in-up overflow-hidden">
                    <div className="grid grid-cols-1">
                      {link.children.map((child) => (
                         <Link
                          key={child.href}
                          href={child.href}
                          className="px-5 py-4 text-[13px] font-bold text-[hsl(var(--color-text-secondary))] hover:bg-[hsl(var(--color-bg-secondary))] hover:text-[hsl(var(--color-primary))] transition-all flex items-center justify-between group/item"
                        >
                          {child.label}
                          <ArrowRight className="w-3.5 h-3.5 opacity-0 -translate-x-2 group-hover/item:opacity-100 group-hover/item:translate-x-0 transition-all" />
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Right side Actions */}
          <div className="hidden lg:flex items-center gap-5">
            <NavbarSearch />
            <Link href="/admin/login" className="text-[14px] font-bold text-[hsl(var(--color-text-secondary))] hover:text-[hsl(var(--color-primary))] transition-colors ml-2">
              Sign In
            </Link>
            <Link href="/cards" className="btn-base btn-apply px-6 py-2.5 text-xs shadow-md">
              Get Started
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2.5 rounded-xl text-[hsl(var(--color-text-secondary))] hover:bg-[hsl(var(--color-bg-secondary))] transition-colors border border-transparent hover:border-[hsl(var(--color-border))]"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden bg-white border-t border-[hsl(var(--color-border))] shadow-2xl h-screen overflow-y-auto">
          <div className="px-6 py-6 space-y-4">
            <div className="px-4 pb-2">
              <NavbarSearch className="w-full" />
            </div>
            {NAV_LINKS.map((link) => (
              <div key={link.label} className="space-y-2">
                <Link
                  href={link.href}
                  onClick={() => !link.children && setIsOpen(false)}
                  className="block px-4 py-3.5 rounded-2xl text-lg font-bold text-[hsl(var(--color-text))] hover:bg-[hsl(var(--color-bg-secondary))] transition-colors"
                >
                  {link.label}
                </Link>
                {link.children && (
                  <div className="pl-8 space-y-1">
                    {link.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        onClick={() => setIsOpen(false)}
                        className="block px-4 py-3 rounded-xl text-[14px] font-semibold text-[hsl(var(--color-text-secondary))] hover:bg-[hsl(var(--color-bg-secondary))] transition-colors"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <div className="pt-8 mt-8 border-t border-[hsl(var(--color-border))] flex flex-col gap-4">
              <Link
                href="/admin/login"
                onClick={() => setIsOpen(false)}
                className="btn-base btn-secondary w-full py-4 text-sm font-bold"
              >
                Sign In
              </Link>
              <Link
                href="/cards"
                onClick={() => setIsOpen(false)}
                className="btn-base btn-apply w-full py-4 text-sm font-bold shadow-lg"
              >
                Get Started Now
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
