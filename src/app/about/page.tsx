import { Metadata } from 'next';
import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

export const metadata: Metadata = {
  title: 'About Us | CreditCompass India',
  description:
    'Learn about CreditCompass India, our mission to simplify credit cards, our editorial policy, and our team.',
};

const sections = [
  {
    title: '1. Our Mission',
    content: [
      {
        subtitle: 'Simplifying Credit Cards',
        text: 'At CreditCompass India, our mission is to decode the complex world of credit cards. We aim to provide transparent, easy-to-understand, and unbiased information to help Indians find the best credit card for their unique lifestyle and spending habits.',
      },
    ],
  },
  {
    title: '2. Editorial Policy & Transparency',
    content: [
      {
        subtitle: 'Unbiased Reviews',
        text: 'Our reviews and recommendations are independent and objective. We analyze fees, rewards, lounge access, and real-world value to provide accurate assessments of each card.',
      },
      {
        subtitle: 'How We Make Money (Affiliate Disclosure)',
        text: 'CreditCompass India is a free service. To keep the site running, we may earn a commission when you click on certain "Apply Now" links and are successfully approved for a credit card. This does not affect our recommendations or the order in which cards appear.',
      },
    ],
  },
  {
    title: '3. Why Trust Us?',
    content: [
      {
        subtitle: 'Data-Driven Comparisons',
        text: 'We use up-to-date data from official bank sources to power our comparison engine. We continuously update our database to reflect the latest changes in fees, rewards structures, and benefits.',
      },
      {
        subtitle: 'Focus on E-E-A-T',
        text: 'We are committed to providing content that demonstrates Experience, Expertise, Authoritativeness, and Trustworthiness (E-E-A-T) to ensure you get the best financial guidance possible.',
      },
    ],
  },
];

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[hsl(var(--color-bg-secondary))] pt-24 pb-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

          {/* Header */}
          <div className="surface-card p-8 mb-8">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-2xl">👋</span>
              <span className="inline-block px-3 py-1 bg-blue-50 text-[hsl(var(--color-primary))] border border-blue-100 rounded-full text-xs font-bold uppercase tracking-widest">
                Company
              </span>
            </div>
            <h1 className="text-3xl font-extrabold text-[hsl(var(--color-text))] tracking-tighter mb-3">
              About Us
            </h1>
            <p className="text-[hsl(var(--color-text-secondary))] text-sm font-medium">
              Your trusted guide to credit cards in India.
            </p>
            <p className="text-[hsl(var(--color-text-secondary))] text-sm mt-3 leading-relaxed">
              We help you navigate the complex world of credit cards to find the perfect match for your wallet.
            </p>
          </div>

          {/* Sections */}
          <div className="space-y-4">
            {sections.map((section, i) => (
              <div key={i} className="surface-card p-7">
                <h2 className="text-lg font-extrabold text-[hsl(var(--color-text))] tracking-tight mb-5">
                  {section.title}
                </h2>
                <div className="space-y-5">
                  {section.content.map((item, j) => (
                    <div key={j}>
                      <h3 className="text-[13px] font-bold text-[hsl(var(--color-primary))] uppercase tracking-widest mb-2">
                        {item.subtitle}
                      </h3>
                      <p className="text-sm text-[hsl(var(--color-text-secondary))] leading-relaxed">
                        {item.text}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Contact */}
          <div className="surface-card p-7 mt-4 bg-gradient-to-br from-blue-50 to-indigo-50 border-[hsl(var(--color-primary))/20%]">
            <h2 className="text-lg font-extrabold text-[hsl(var(--color-text))] tracking-tight mb-3">
              Get in Touch
            </h2>
            <p className="text-sm text-[hsl(var(--color-text-secondary))] leading-relaxed mb-4">
              Have questions, suggestions, or partnership inquiries? We'd love to hear from you.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 btn-base btn-apply px-6 py-2.5 text-sm"
            >
              Contact Us →
            </Link>
          </div>

          {/* Navigation */}
          <div className="mt-8 flex flex-wrap gap-4">
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
