import type { Metadata } from 'next';
import Script from 'next/script';
import './globals.css';
import AffiliateDisclosureBanner from '@/components/ui/AffiliateDisclosureBanner';
import CanonicalLink from '@/components/seo/CanonicalLink';

export const metadata: Metadata = {
  metadataBase: new URL('https://creditcompass-india.vercel.app'),
  title: {
    default: 'CreditCompass India — Compare Best Credit Cards 2026',
    template: '%s | CreditCompass India',
  },
  description:
    'Compare 100+ credit cards in India. Find the best cashback, travel, fuel, and lifestyle credit cards. Filter by fees, rewards & benefits. Apply online instantly.',
  keywords: [
    'credit card comparison india',
    'best credit cards india 2026',
    'cashback credit cards india',
    'travel credit cards india',
    'lifetime free credit cards',
    'credit card apply online india',
  ],
  authors: [{ name: 'CreditCompass India' }],
  creator: 'CreditCompass India',
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    siteName: 'CreditCompass India',
    title: 'CreditCompass India — Compare Best Credit Cards 2026',
    description:
      'Compare 100+ credit cards in India. Find the best cashback, travel, fuel and lifestyle credit cards. Apply online instantly.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CreditCompass India — Compare Best Credit Cards 2026',
    description: 'Compare 100+ credit cards in India and find the perfect card for you.',
  },
  verification: {
    google: 'QMlNitCg392KMXtqaIDrf_uz2-tUV9nRpKQuOLxc4Gw',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <CanonicalLink />
        {/* Google Analytics */}
        {process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}');
              `}
            </Script>
          </>
        )}
      </head>
      <body>
        {children}
        <AffiliateDisclosureBanner />
      </body>
    </html>
  );
}
