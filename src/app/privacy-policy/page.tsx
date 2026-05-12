import { Metadata } from 'next';
import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

export const metadata: Metadata = {
  title: 'Privacy Policy | CreditCompass India',
  description:
    'CreditCompass India privacy policy. Learn how we collect, use, and protect your personal information.',
};

const sections = [
  {
    title: '1. Information We Collect',
    content: [
      {
        subtitle: '1.1 Information You Provide',
        text: 'We do not require account creation or personal registration to use CreditCompass India. If you contact us via email, we collect the information you voluntarily provide (name, email address, message content).',
      },
      {
        subtitle: '1.2 Automatically Collected Information',
        text: 'When you visit our website, we automatically collect certain technical information including: IP address (anonymized by removing the last octet), browser type and version, operating system, referring URL, pages visited and time spent, and date/time of visits.',
      },
      {
        subtitle: '1.3 Click Tracking',
        text: 'When you click on an affiliate "Apply Now" link, we log the card name, your anonymized IP address, browser type, and the affiliate URL clicked. This data is used solely for affiliate commission verification and site analytics.',
      },
    ],
  },
  {
    title: '2. How We Use Your Information',
    content: [
      {
        subtitle: 'Analytics & Improvement',
        text: 'We use Google Analytics to understand which pages and cards are most useful to visitors. This helps us improve card recommendations and content quality.',
      },
      {
        subtitle: 'Affiliate Tracking',
        text: 'Click data is used to verify affiliate commissions earned from bank partners. This data is never sold to third parties.',
      },
      {
        subtitle: 'Legal Compliance',
        text: 'We may retain data as required by applicable Indian laws and regulations, including the Information Technology Act, 2000.',
      },
    ],
  },
  {
    title: '3. Cookies',
    content: [
      {
        subtitle: 'What We Use',
        text: 'We use essential cookies required for the website to function (session management, security). We also use Google Analytics cookies (_ga, _gid) to analyze traffic patterns. These are anonymized and do not identify you personally.',
      },
      {
        subtitle: 'Your Control',
        text: 'You can disable cookies in your browser settings. Note that disabling cookies may affect website functionality. Most browsers allow you to control cookies through their settings preferences.',
      },
    ],
  },
  {
    title: '4. Third-Party Services',
    content: [
      {
        subtitle: 'Google Analytics',
        text: 'We use Google Analytics 4 (GA4) to analyze website traffic. Google may collect and process data per their Privacy Policy at policies.google.com/privacy.',
      },
      {
        subtitle: 'Supabase',
        text: 'Our database and backend infrastructure is hosted on Supabase, which complies with GDPR and modern data protection standards.',
      },
      {
        subtitle: 'Bank & Affiliate Links',
        text: 'When you click "Apply Now" and visit a bank\'s website, that bank\'s privacy policy applies to information you provide during the application process. We have no access to your application data.',
      },
    ],
  },
  {
    title: '5. Data Security',
    content: [
      {
        subtitle: 'Our Measures',
        text: 'We implement appropriate technical and organizational security measures including: HTTPS encryption on all pages, anonymized IP storage, restricted database access with Row Level Security (RLS), and no storage of sensitive financial information.',
      },
    ],
  },
  {
    title: '6. Children\'s Privacy',
    content: [
      {
        subtitle: 'Age Restriction',
        text: 'CreditCompass India is intended for users aged 18 and above. We do not knowingly collect information from minors. Credit card applications require applicants to be at least 18 years of age.',
      },
    ],
  },
  {
    title: '7. Your Rights',
    content: [
      {
        subtitle: 'Data Access & Deletion',
        text: 'You may request access to, correction of, or deletion of any personal information we hold about you by contacting us at hello@creditcompass.in. We will respond within 30 days.',
      },
    ],
  },
  {
    title: '8. Changes to This Policy',
    content: [
      {
        subtitle: 'Updates',
        text: 'We may update this Privacy Policy periodically. Significant changes will be noted with an updated "Last Updated" date at the top of this page. Continued use of the site after changes constitutes acceptance of the revised policy.',
      },
    ],
  },
];

export default function PrivacyPolicyPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[hsl(var(--color-bg-secondary))] pt-24 pb-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

          {/* Header */}
          <div className="surface-card p-8 mb-8">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-2xl">🔒</span>
              <span className="inline-block px-3 py-1 bg-blue-50 text-[hsl(var(--color-primary))] border border-blue-100 rounded-full text-xs font-bold uppercase tracking-widest">
                Legal
              </span>
            </div>
            <h1 className="text-3xl font-extrabold text-[hsl(var(--color-text))] tracking-tighter mb-3">
              Privacy Policy
            </h1>
            <p className="text-[hsl(var(--color-text-secondary))] text-sm font-medium">
              Last updated: May 2025 · Applies to creditcompass.in
            </p>
            <p className="text-[hsl(var(--color-text-secondary))] text-sm mt-3 leading-relaxed">
              Your privacy matters. This policy explains what data we collect, why we collect it, and how we protect it.
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
              Contact Our Privacy Team
            </h2>
            <p className="text-sm text-[hsl(var(--color-text-secondary))] leading-relaxed mb-4">
              For privacy-related queries, data requests, or concerns:
            </p>
            <a
              href="mailto:privacy@creditcompass.in"
              className="inline-flex items-center gap-2 btn-base btn-apply px-6 py-2.5 text-sm"
            >
              📧 privacy@creditcompass.in
            </a>
          </div>

          {/* Navigation */}
          <div className="mt-8 flex flex-wrap gap-4">
            <Link href="/affiliate-disclosure" className="text-sm font-bold text-[hsl(var(--color-primary))] hover:underline">
              Affiliate Disclosure →
            </Link>
            <Link href="/disclaimer" className="text-sm font-bold text-[hsl(var(--color-primary))] hover:underline">
              Disclaimer →
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
