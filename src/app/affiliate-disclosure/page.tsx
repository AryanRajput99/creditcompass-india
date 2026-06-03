import { Metadata } from 'next';
import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

export const metadata: Metadata = {
  title: 'Affiliate Disclosure | CreditCompass India',
  description:
    'CreditCompass India earns commissions from affiliate links. Learn how we make money and how it affects our editorial integrity.',
};

export default function AffiliateDisclosurePage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[hsl(var(--color-bg-secondary))] pt-24 pb-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

          {/* Header */}
          <div className="surface-card p-8 mb-8 border-l-4 border-[hsl(var(--color-primary))]">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-2xl">📢</span>
              <span className="inline-block px-3 py-1 bg-amber-50 text-amber-700 border border-amber-200 rounded-full text-xs font-bold uppercase tracking-widest">
                Required Disclosure
              </span>
            </div>
            <h1 className="text-3xl font-extrabold text-[hsl(var(--color-text))] tracking-tighter mb-3">
              Affiliate Disclosure
            </h1>
            <p className="text-[hsl(var(--color-text-secondary))] text-sm font-medium">
              Last updated: June 2026
            </p>
          </div>

          {/* Content */}
          <div className="surface-card p-8 prose prose-sm max-w-none space-y-8">

            <section>
              <h2 className="text-xl font-extrabold text-[hsl(var(--color-text))] mb-4 tracking-tight">
                How We Make Money
              </h2>
              <p className="text-[hsl(var(--color-text-secondary))] leading-relaxed">
                CreditCompass India (<strong className="text-[hsl(var(--color-text))]">creditcompass.in</strong>) participates in affiliate marketing programs. When you click on an &ldquo;Apply Now&rdquo; button or affiliate link on our site and successfully apply for a credit card, we may earn a commission from the bank or financial institution.
              </p>
              <p className="text-[hsl(var(--color-text-secondary))] leading-relaxed mt-4">
                This commission is paid by the bank — <strong className="text-[hsl(var(--color-text))]">not by you</strong>. Your credit card terms, interest rates, annual fees, and any offers you receive are entirely determined by the issuing bank and are not affected by our affiliate relationship.
              </p>
            </section>

            <div className="border-t border-[hsl(var(--color-border))]" />

            <section>
              <h2 className="text-xl font-extrabold text-[hsl(var(--color-text))] mb-4 tracking-tight">
                Our Editorial Independence
              </h2>
              <p className="text-[hsl(var(--color-text-secondary))] leading-relaxed">
                We maintain strict editorial independence. Our card rankings, reviews, and comparisons are based on objective criteria including:
              </p>
              <ul className="mt-4 space-y-3">
                {[
                  'Annual fees, joining fees, and waiver conditions',
                  'Cashback rates and reward point structures',
                  'Travel benefits, lounge access, and lifestyle perks',
                  'Minimum income and credit score requirements',
                  'User eligibility and approval likelihood',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="w-5 h-5 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 block" />
                    </span>
                    <span className="text-[hsl(var(--color-text-secondary))] text-sm leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
              <p className="text-[hsl(var(--color-text-secondary))] leading-relaxed mt-4">
                Affiliate commission rates do <strong className="text-[hsl(var(--color-text))]">not</strong> influence card ratings, rankings, or editorial content. A card with a high commission that provides poor value to users will not receive a high ranking on our platform.
              </p>
            </section>

            <div className="border-t border-[hsl(var(--color-border))]" />

            <section>
              <h2 className="text-xl font-extrabold text-[hsl(var(--color-text))] mb-4 tracking-tight">
                ASCI & RBI Compliance
              </h2>
              <p className="text-[hsl(var(--color-text-secondary))] leading-relaxed">
                This disclosure is made in accordance with the Advertising Standards Council of India (ASCI) guidelines on influencer and affiliate advertising. We are committed to transparency and honest disclosure of all commercial relationships.
              </p>
              <p className="text-[hsl(var(--color-text-secondary))] leading-relaxed mt-4">
                CreditCompass India is a comparison and information platform. We are not a bank, NBFC, or licensed financial advisor. All financial decisions should be made independently or with qualified professional advice.
              </p>
            </section>

            <div className="border-t border-[hsl(var(--color-border))]" />

            <section>
              <h2 className="text-xl font-extrabold text-[hsl(var(--color-text))] mb-4 tracking-tight">
                Contact Us
              </h2>
              <p className="text-[hsl(var(--color-text-secondary))] leading-relaxed">
                If you have questions about our affiliate relationships or editorial policies, please contact us at{' '}
                <a
                  href="mailto:hello@creditcompass.in"
                  className="text-[hsl(var(--color-primary))] font-semibold hover:underline"
                >
                  hello@creditcompass.in
                </a>
              </p>
            </section>
          </div>

          {/* Navigation */}
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/privacy-policy"
              className="text-sm font-bold text-[hsl(var(--color-primary))] hover:underline"
            >
              Privacy Policy →
            </Link>
            <Link
              href="/disclaimer"
              className="text-sm font-bold text-[hsl(var(--color-primary))] hover:underline"
            >
              Disclaimer →
            </Link>
            <Link
              href="/"
              className="text-sm font-bold text-[hsl(var(--color-text-secondary))] hover:text-[hsl(var(--color-primary))] transition-colors"
            >
              ← Back to Home
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
