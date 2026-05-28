import { Metadata } from 'next';
import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

export const metadata: Metadata = {
  title: 'Terms of Service | CreditCompass India',
  description:
    'CreditCompass India terms of service. Review the rules, guidelines, and disclaimers for using our credit card comparison platform.',
};

const sections = [
  {
    title: '1. Acceptance of Terms',
    content: [
      {
        subtitle: '1.1 Agreement',
        text: 'By accessing or using CreditCompass India (referred to as "the website", "we", "us", or "our"), you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this site.',
      },
      {
        subtitle: '1.2 Eligibility',
        text: 'The website and its services are intended solely for individuals who are at least 18 years of age and residents of India. By using this website, you represent and warrant that you meet these requirements.',
      },
    ],
  },
  {
    title: '2. Intellectual Property',
    content: [
      {
        subtitle: 'Proprietary Rights',
        text: 'All content, logos, designs, text, graphics, and software on CreditCompass India are the property of CreditCompass India or its licensing partners and are protected by Indian and international copyright, trademark, and intellectual property laws.',
      },
      {
        subtitle: 'Limited License',
        text: 'You are granted a limited, non-exclusive, non-transferable license to access and view the content on this website for personal, non-commercial use only. You must not copy, modify, distribute, or use our proprietary content for commercial purposes without explicit written consent.',
      },
    ],
  },
  {
    title: '3. Scope of Service & Disclaimers',
    content: [
      {
        subtitle: '3.1 Information Only',
        text: 'CreditCompass India is an independent comparison portal. The information, rates, fees, eligibility criteria, and reviews provided on this website are for educational and informational purposes only. They do not constitute financial, legal, or professional advice.',
      },
      {
        subtitle: '3.2 No Financial Advisory or Lending',
        text: 'We are not a bank, financial institution, or licensed financial advisor. We do not issue credit cards, offer loans, or make credit decisions. Any transactions or applications are processed directly by our third-party banking partners.',
      },
      {
        subtitle: '3.3 Accuracy of Data',
        text: 'While we strive to keep all information up-to-date and accurate, bank terms and credit card features change frequently. We do not warrant the accuracy, completeness, or reliability of any information displayed on the website. Always verify final terms on the official bank site.',
      },
    ],
  },
  {
    title: '4. Third-Party Links & Affiliate Disclosure',
    content: [
      {
        subtitle: '4.1 Affiliate Commission',
        text: 'CreditCompass India contains affiliate links to third-party bank portals via networks like EarnKaro. If you click on a card application link and get approved, we may receive a commission from the partner. This helps us maintain the website at no cost to you.',
      },
      {
        subtitle: '4.2 Third-Party Responsibility',
        text: 'We have no control over the content, privacy policies, approval processes, or terms of third-party websites. Applying for any credit card or financial product is done solely at your own risk, and you will be governed by the bank\'s terms and conditions.',
      },
    ],
  },
  {
    title: '5. Limitation of Liability',
    content: [
      {
        subtitle: 'No Warranties',
        text: 'CreditCompass India is provided on an "as is" and "as available" basis without warranties of any kind, express or implied, including but not limited to warranties of merchantability or fitness for a particular purpose.',
      },
      {
        subtitle: 'Excluded Damages',
        text: 'In no event shall CreditCompass India, its creators, or partners be liable for any direct, indirect, incidental, special, or consequential damages arising out of the use or inability to use the website, even if notified of the possibility of such damages.',
      },
    ],
  },
  {
    title: '6. Governing Law & Jurisdiction',
    content: [
      {
        subtitle: 'Indian Jurisdiction',
        text: 'These Terms of Service shall be governed by and construed in accordance with the laws of India. Any legal action or proceeding arising out of or relating to these terms shall be subject to the exclusive jurisdiction of the courts in Delhi, India.',
      },
    ],
  },
];

export default function TermsPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[hsl(var(--color-bg-secondary))] pt-24 pb-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

          {/* Header */}
          <div className="surface-card p-8 mb-8">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-2xl">📋</span>
              <span className="inline-block px-3 py-1 bg-indigo-50 text-[hsl(var(--color-primary))] border border-indigo-100 rounded-full text-xs font-bold uppercase tracking-widest">
                Legal
              </span>
            </div>
            <h1 className="text-3xl font-extrabold text-[hsl(var(--color-text))] tracking-tighter mb-3">
              Terms of Service
            </h1>
            <p className="text-[hsl(var(--color-text-secondary))] text-sm font-medium">
              Last updated: May 2025 · Applies to creditcompass.in
            </p>
            <p className="text-[hsl(var(--color-text-secondary))] text-sm mt-3 leading-relaxed">
              Please read these terms carefully before using our comparison services. By using CreditCompass India, you agree to these conditions.
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
              Questions About Our Terms?
            </h2>
            <p className="text-sm text-[hsl(var(--color-text-secondary))] leading-relaxed mb-4">
              If you have any questions or clarifications regarding these terms, contact us at:
            </p>
            <a
              href="mailto:hello@creditcompass.in"
              className="inline-flex items-center gap-2 btn-base btn-apply px-6 py-2.5 text-sm"
            >
              📧 hello@creditcompass.in
            </a>
          </div>

          {/* Navigation */}
          <div className="mt-8 flex flex-wrap gap-4">
            <Link href="/privacy-policy" className="text-sm font-bold text-[hsl(var(--color-primary))] hover:underline">
              Privacy Policy →
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
