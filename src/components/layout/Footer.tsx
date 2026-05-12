import Link from 'next/link';
import { CreditCard, Shield, ExternalLink, Mail } from 'lucide-react';

const FOOTER_LINKS = {
  'Credit Cards': [
    { label: 'Best Cashback Cards', href: '/category/cashback' },
    { label: 'Best Travel Cards', href: '/category/travel' },
    { label: 'Best Fuel Cards', href: '/category/fuel' },
    { label: 'Lifetime Free Cards', href: '/category/lifetime-free' },
    { label: 'Premium Cards', href: '/category/premium' },
    { label: 'Student Cards', href: '/category/student' },
  ],
  'Top Banks': [
    { label: 'HDFC Credit Cards', href: '/cards?bank=HDFC+Bank' },
    { label: 'SBI Credit Cards', href: '/cards?bank=SBI+Card' },
    { label: 'ICICI Credit Cards', href: '/cards?bank=ICICI+Bank' },
    { label: 'Axis Bank Cards', href: '/cards?bank=Axis+Bank' },
    { label: 'Kotak Cards', href: '/cards?bank=Kotak+Mahindra' },
  ],
  'Resources': [
    { label: 'Compare Cards', href: '/compare' },
    { label: 'Blog & Guides', href: '/blog' },
    { label: 'Credit Score Guide', href: '/blog/credit-score-guide' },
    { label: 'Affiliate Disclosure', href: '/affiliate-disclosure' },
    { label: 'Disclaimer', href: '/disclaimer' },
  ],
  'Legal': [
    { label: 'Privacy Policy', href: '/privacy-policy' },
    { label: 'Terms of Service', href: '/terms' },
    { label: 'Affiliate Disclosure', href: '/affiliate-disclosure' },
    { label: 'Disclaimer', href: '/disclaimer' },
    { label: 'Contact Us', href: '/contact' },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-[hsl(var(--color-bg-secondary))] border-t border-[hsl(var(--color-border))]">
      {/* Affiliate Disclosure Banner */}
      <div className="bg-amber-50 border-b border-amber-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-start gap-3">
            <Shield className="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0" />
            <p className="text-[12px] text-amber-900 leading-relaxed">
              <strong className="font-bold">Affiliate Disclosure:</strong> CreditCompass India may earn a commission when you apply for a credit card through our links. This helps us keep the site free for users. We only recommend products we believe provide value. Commission does not affect our editorial ratings.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Top section */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-12 mb-16">
          {/* Brand column */}
          <div className="col-span-2 lg:col-span-2">
            <Link href="/" className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-[hsl(var(--color-primary))] flex items-center justify-center shadow-sm">
                <CreditCard className="w-5 h-5 text-white" />
              </div>
              <span className="font-extrabold text-2xl tracking-tight text-[hsl(var(--color-text))]">
                CreditCompass
              </span>
            </Link>
            <p className="text-sm text-[hsl(var(--color-text-secondary))] leading-relaxed mb-6 max-w-sm">
              India&apos;s most sophisticated credit card comparison platform. Built for clarity, speed, and unbiased financial decisions.
            </p>
            <div className="flex items-center gap-4">
              <a 
                href="mailto:hello@creditcompass.in" 
                className="btn-base btn-secondary px-4 py-2 text-xs"
              >
                <Mail className="w-3.5 h-3.5" />
                Contact Support
              </a>
            </div>
          </div>

          {/* Nav columns */}
          {Object.entries(FOOTER_LINKS).map(([section, links]) => (
            <div key={section}>
              <h3 className="text-[11px] font-bold text-[hsl(var(--color-text))] uppercase tracking-[0.1em] mb-6">
                {section}
              </h3>
              <ul className="space-y-4">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-[13px] text-[hsl(var(--color-text-secondary))] hover:text-[hsl(var(--color-primary))] transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom disclaimer */}
        <div className="border-t border-[hsl(var(--color-border))] pt-12">
          <div className="bg-white rounded-xl border border-[hsl(var(--color-border))] p-6 mb-8 shadow-sm">
            <p className="text-[12px] text-[hsl(var(--color-text-secondary))] leading-relaxed">
              <span className="font-bold text-[hsl(var(--color-text))]">Legal Disclaimer:</span> The information provided on CreditCompass India is for educational and informational purposes only. We are not a bank, financial institution, or licensed financial advisor. Credit card features, fees, interest rates, and eligibility criteria are subject to frequent changes. Always verify terms directly on the official bank website before applying.
            </p>
          </div>
          
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <p className="text-[12px] text-[hsl(var(--color-text-tertiary))] font-medium">
              © {new Date().getFullYear()} CreditCompass India. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <Link href="/privacy-policy" className="text-[12px] text-[hsl(var(--color-text-tertiary))] hover:text-[hsl(var(--color-primary))] transition-colors font-medium">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-[12px] text-[hsl(var(--color-text-tertiary))] hover:text-[hsl(var(--color-primary))] transition-colors font-medium">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
