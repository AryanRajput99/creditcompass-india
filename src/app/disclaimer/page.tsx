import { Metadata } from 'next';
import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

export const metadata: Metadata = {
  title: 'Disclaimer | CreditCompass India',
  description:
    'Important disclaimer about the financial information provided on CreditCompass India. We are a comparison platform, not a financial advisor.',
};

export default function DisclaimerPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[hsl(var(--color-bg-secondary))] pt-24 pb-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

          {/* Header */}
          <div className="surface-card p-8 mb-8 border-l-4 border-amber-400">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-2xl">⚠️</span>
              <span className="inline-block px-3 py-1 bg-amber-50 text-amber-700 border border-amber-200 rounded-full text-xs font-bold uppercase tracking-widest">
                Important Notice
              </span>
            </div>
            <h1 className="text-3xl font-extrabold text-[hsl(var(--color-text))] tracking-tighter mb-3">
              Disclaimer
            </h1>
            <p className="text-[hsl(var(--color-text-secondary))] text-sm font-medium">
              Last updated: June 2026
            </p>
          </div>

          <div className="space-y-4">

            <div className="surface-card p-7">
              <h2 className="text-lg font-extrabold text-[hsl(var(--color-text))] tracking-tight mb-4">
                Not a Financial Advisor
              </h2>
              <p className="text-sm text-[hsl(var(--color-text-secondary))] leading-relaxed">
                CreditCompass India is an independent credit card comparison platform. We are <strong className="text-[hsl(var(--color-text))]">not a bank, NBFC, financial institution, or licensed financial advisor</strong> registered with the Reserve Bank of India (RBI) or SEBI.
              </p>
              <p className="text-sm text-[hsl(var(--color-text-secondary))] leading-relaxed mt-4">
                The information on this website is provided for general informational and educational purposes only and does not constitute financial, investment, or legal advice. You should consult a qualified financial advisor before making any financial decisions.
              </p>
            </div>

            <div className="surface-card p-7">
              <h2 className="text-lg font-extrabold text-[hsl(var(--color-text))] tracking-tight mb-4">
                Accuracy of Information
              </h2>
              <p className="text-sm text-[hsl(var(--color-text-secondary))] leading-relaxed">
                We strive to keep credit card information accurate and up to date. However, card features, interest rates, annual fees, reward structures, and eligibility criteria are <strong className="text-[hsl(var(--color-text))]">subject to change by banks without notice</strong>.
              </p>
              <p className="text-sm text-[hsl(var(--color-text-secondary))] leading-relaxed mt-4">
                Always verify current terms directly on the official bank website or by contacting the bank before applying for any credit card. CreditCompass India accepts no responsibility for decisions made based on outdated information.
              </p>
            </div>

            <div className="surface-card p-7">
              <h2 className="text-lg font-extrabold text-[hsl(var(--color-text))] tracking-tight mb-4">
                Credit Card Application Outcomes
              </h2>
              <p className="text-sm text-[hsl(var(--color-text-secondary))] leading-relaxed">
                Displaying a credit card on our platform does not guarantee approval. Credit card approvals are subject to each bank&apos;s internal credit assessment policies, your CIBIL score, income verification, and other eligibility criteria determined solely by the issuing bank.
              </p>
              <p className="text-sm text-[hsl(var(--color-text-secondary))] leading-relaxed mt-4">
                CreditCompass India has no influence over approval decisions. We accept no liability for rejected applications or any consequences arising from applying for a credit card through our platform.
              </p>
            </div>

            <div className="surface-card p-7">
              <h2 className="text-lg font-extrabold text-[hsl(var(--color-text))] tracking-tight mb-4">
                Affiliate Links & Commercial Relationships
              </h2>
              <p className="text-sm text-[hsl(var(--color-text-secondary))] leading-relaxed">
                Some links on CreditCompass India are affiliate links. We may earn a commission when you apply for a credit card through our links. This does not affect our editorial independence or the terms you receive from the bank. See our{' '}
                <Link href="/affiliate-disclosure" className="text-[hsl(var(--color-primary))] font-semibold hover:underline">
                  Affiliate Disclosure
                </Link>{' '}
                for full details.
              </p>
            </div>

            <div className="surface-card p-7">
              <h2 className="text-lg font-extrabold text-[hsl(var(--color-text))] tracking-tight mb-4">
                Third-Party Websites
              </h2>
              <p className="text-sm text-[hsl(var(--color-text-secondary))] leading-relaxed">
                Our website contains links to bank websites and affiliate networks. Once you leave CreditCompass India, we have no control over the content, privacy practices, or reliability of third-party sites. Visiting third-party links is at your own risk.
              </p>
            </div>

            <div className="surface-card p-7">
              <h2 className="text-lg font-extrabold text-[hsl(var(--color-text))] tracking-tight mb-4">
                Limitation of Liability
              </h2>
              <p className="text-sm text-[hsl(var(--color-text-secondary))] leading-relaxed">
                To the fullest extent permitted by applicable law, CreditCompass India and its operators shall not be liable for any direct, indirect, incidental, special, or consequential damages arising from your use of this website or reliance on information provided herein.
              </p>
            </div>

          </div>

          {/* Navigation */}
          <div className="mt-8 flex flex-wrap gap-4">
            <Link href="/affiliate-disclosure" className="text-sm font-bold text-[hsl(var(--color-primary))] hover:underline">
              Affiliate Disclosure →
            </Link>
            <Link href="/privacy-policy" className="text-sm font-bold text-[hsl(var(--color-primary))] hover:underline">
              Privacy Policy →
            </Link>
            <Link href="/" className="text-sm font-bold text-[hsl(var(--color-text-secondary))] hover:text-[hsl(var(--color-primary))] transition-colors">
              ← Back to Home
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
