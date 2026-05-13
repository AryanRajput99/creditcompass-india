import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import CardCard from '@/components/cards/CardCard';
import { ArrowRight } from 'lucide-react';
import { CreditCard } from '@/types';
import { CATEGORY_LABELS, CATEGORY_ICONS, CATEGORY_COLORS, cn } from '@/lib/utils';
import { getMonetizedSlugs } from '@/lib/monetization';

interface PageProps {
  params: Promise<{ slug: string }>;
}

// SEO metadata per category — these are your money keywords
const CATEGORY_SEO: Record<string, { title: string; description: string; heading: string; subheading: string }> = {
  cashback: {
    title: 'Best Cashback Credit Cards in India 2025',
    description: 'Compare the best cashback credit cards in India. Get flat cashback on groceries, fuel, dining, and online shopping. Apply online instantly.',
    heading: 'Best Cashback Credit Cards in India',
    subheading: 'Earn real money back on every spend. Flat cashback with no redemption hassles.',
  },
  travel: {
    title: 'Best Travel Credit Cards in India 2025 — Airport Lounge & Air Miles',
    description: 'Compare the best travel credit cards in India. Free airport lounge access, air miles, hotel benefits, and travel insurance. Apply online.',
    heading: 'Best Travel Credit Cards in India',
    subheading: 'Unlock airport lounges, earn air miles, and travel in style.',
  },
  fuel: {
    title: 'Best Fuel Credit Cards in India 2025 — Surcharge Waiver',
    description: 'Compare fuel credit cards with fuel surcharge waiver. Save on petrol and diesel at HPCL, BPCL, and Indian Oil stations across India.',
    heading: 'Best Fuel Credit Cards in India',
    subheading: 'Save on every refuel with surcharge waivers and fuel rewards.',
  },
  shopping: {
    title: 'Best Shopping Credit Cards in India 2025 — Amazon, Flipkart Offers',
    description: 'Compare credit cards with the best shopping rewards for Amazon, Flipkart, Myntra, and more. Discounts, cashback, and exclusive offers.',
    heading: 'Best Shopping Credit Cards in India',
    subheading: 'Exclusive discounts and rewards on Amazon, Flipkart, and all major platforms.',
  },
  'lifetime-free': {
    title: 'Best Lifetime Free Credit Cards in India 2025 — Zero Annual Fee',
    description: 'Compare the best lifetime free credit cards in India with zero joining fee and zero annual fee. Benefits without the cost.',
    heading: 'Best Lifetime Free Credit Cards',
    subheading: 'Full credit card benefits with ₹0 joining fee and ₹0 annual fee. Forever.',
  },
  premium: {
    title: 'Best Premium Credit Cards in India 2025 — Luxury Benefits',
    description: 'Compare India\'s top premium credit cards. Golf privileges, concierge service, international lounge access, and luxury lifestyle benefits.',
    heading: 'Best Premium Credit Cards in India',
    subheading: 'Elite privileges, concierge service, and luxury lifestyle benefits.',
  },
  business: {
    title: 'Best Business Credit Cards in India 2025',
    description: 'Compare business credit cards in India with expense tracking, high credit limits, and rewards on business spends. Apply for your company.',
    heading: 'Best Business Credit Cards in India',
    subheading: 'Manage expenses smarter with high limits and business-specific rewards.',
  },
  student: {
    title: 'Best Student Credit Cards in India 2025 — Easy Approval',
    description: 'Compare the best student credit cards in India. Low income requirements, easy approval, and cashback on everyday spending for students.',
    heading: 'Best Student Credit Cards in India',
    subheading: 'Build your credit score early. Easy approval with low income requirements.',
  },
  rewards: {
    title: 'Best Rewards Credit Cards in India 2025 — Earn & Redeem Points',
    description: 'Compare rewards credit cards in India. Earn points on every spend and redeem for flights, hotels, merchandise, and statement credit.',
    heading: 'Best Rewards Credit Cards in India',
    subheading: 'Earn points on every swipe. Redeem for flights, hotels, and cashback.',
  },
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const seo = CATEGORY_SEO[slug];

  if (!seo) {
    return {
      title: `${CATEGORY_LABELS[slug] || slug} Credit Cards | CreditCompass India`,
      description: `Compare the best ${CATEGORY_LABELS[slug] || slug} credit cards in India.`,
    };
  }

  return {
    title: seo.title,
    description: seo.description,
    openGraph: {
      title: seo.title,
      description: seo.description,
    },
  };
}

export default async function CategoryPage({ params }: PageProps) {
  const { slug } = await params;
  const supabase = await createClient();

  // Validate category exists
  const { data: category } = await supabase
    .from('categories')
    .select('*')
    .eq('name', slug)
    .single();

  // Fetch cards in this category
  const { data: cards } = await supabase
    .from('credit_cards')
    .select('*')
    .eq('is_active', true)
    .in('slug', getMonetizedSlugs())
    .contains('categories', [slug])
    .order('is_featured', { ascending: false })
    .order('sort_order', { ascending: true });

  // If no category AND no cards found, 404
  if (!category && (!cards || cards.length === 0)) {
    notFound();
  }

  const typedCards = (cards || []) as CreditCard[];
  const seo = CATEGORY_SEO[slug];
  const label = CATEGORY_LABELS[slug] || category?.label || slug;
  const icon = CATEGORY_ICONS[slug] || category?.icon || '💳';
  const colorClass = CATEGORY_COLORS[slug] || 'bg-slate-50 text-slate-700 border-slate-200';

  // Breadcrumb JSON-LD
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: process.env.NEXT_PUBLIC_SITE_URL || 'https://creditcompass.in' },
      { '@type': 'ListItem', position: 2, name: 'Credit Cards', item: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://creditcompass.in'}/cards` },
      { '@type': 'ListItem', position: 3, name: `${label} Cards` },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <Navbar />

      <main className="min-h-screen bg-[hsl(var(--color-bg-secondary))]">

        {/* Hero Banner */}
        <section className="bg-white border-b border-[hsl(var(--color-border))] pt-28 pb-14">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-xs font-semibold text-[hsl(var(--color-text-tertiary))] mb-8" aria-label="Breadcrumb">
              <Link href="/" className="hover:text-[hsl(var(--color-primary))] transition-colors">Home</Link>
              <span>/</span>
              <Link href="/cards" className="hover:text-[hsl(var(--color-primary))] transition-colors">Credit Cards</Link>
              <span>/</span>
              <span className="text-[hsl(var(--color-text))]">{label}</span>
            </nav>

            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
              <div>
                {/* Category badge */}
                <span className={cn('badge border mb-6 text-sm px-4 py-2', colorClass)}>
                  <span className="text-lg mr-2">{icon}</span>
                  {label} Cards
                </span>

                <h1 className="text-4xl md:text-6xl font-extrabold text-[hsl(var(--color-text))] tracking-tighter mb-4 leading-tight">
                  {seo?.heading || `Best ${label} Credit Cards`}
                </h1>
                <p className="text-xl text-[hsl(var(--color-text-secondary))] max-w-2xl font-medium leading-relaxed">
                  {seo?.subheading || `Compare the best ${label.toLowerCase()} credit cards in India.`}
                </p>
              </div>

              {/* Stats */}
              <div className="flex-shrink-0 surface-card p-6 text-center min-w-[140px]">
                <p className="text-4xl font-black text-[hsl(var(--color-primary))] mb-1">
                  {typedCards.length}
                </p>
                <p className="text-xs font-bold text-[hsl(var(--color-text-secondary))] uppercase tracking-widest">
                  Cards Found
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Cards Grid */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

            {/* Filter quick links to related categories */}
            <div className="flex flex-wrap gap-2 mb-10">
              {Object.entries(CATEGORY_LABELS).map(([key, catLabel]) => (
                <Link
                  key={key}
                  href={`/category/${key}`}
                  className={cn(
                    'inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold border transition-all',
                    key === slug
                      ? cn(colorClass, 'border-current shadow-sm')
                      : 'bg-white text-[hsl(var(--color-text-secondary))] border-[hsl(var(--color-border))] hover:border-[hsl(var(--color-primary))] hover:text-[hsl(var(--color-primary))]'
                  )}
                >
                  <span>{CATEGORY_ICONS[key]}</span>
                  {catLabel}
                </Link>
              ))}
            </div>

            {typedCards.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {typedCards.map((card) => (
                  <CardCard key={card.id} card={card} />
                ))}
              </div>
            ) : (
              <div className="text-center py-24 bg-white rounded-3xl border border-dashed border-[hsl(var(--color-border))]">
                <div className="text-5xl mb-4">{icon}</div>
                <h2 className="text-xl font-extrabold text-[hsl(var(--color-text))] mb-2">
                  No {label} Cards Yet
                </h2>
                <p className="text-[hsl(var(--color-text-secondary))] mb-6 text-sm">
                  We&apos;re adding more cards soon. Browse all available cards in the meantime.
                </p>
                <Link href="/cards" className="btn-base btn-apply px-6 py-2.5">
                  Browse All Cards <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            )}
          </div>
        </section>

        {/* SEO Content Section */}
        {seo && (
          <section className="bg-white border-t border-[hsl(var(--color-border))] py-16">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-2xl font-extrabold text-[hsl(var(--color-text))] tracking-tight mb-6">
                How to Choose the Best {label} Credit Card
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                {[
                  {
                    title: 'Compare Annual Fees',
                    desc: 'A card with a higher annual fee can still be better value if the benefits outweigh the cost. Calculate your break-even point before applying.',
                  },
                  {
                    title: 'Check Eligibility First',
                    desc: 'Each card has minimum income and credit score requirements. Applying for a card you don\'t qualify for can hurt your CIBIL score.',
                  },
                  {
                    title: 'Read the Reward Structure',
                    desc: 'Some cards offer higher cashback on specific categories. Match the card\'s strength to your highest spending category.',
                  },
                  {
                    title: 'Look for Welcome Bonuses',
                    desc: 'Many cards offer large welcome bonuses worth thousands of rupees. These can offset fees or provide immediate value.',
                  },
                ].map((tip, i) => (
                  <div key={i} className="surface-card p-6">
                    <h3 className="font-extrabold text-[hsl(var(--color-text))] mb-2">{tip.title}</h3>
                    <p className="text-sm text-[hsl(var(--color-text-secondary))] leading-relaxed">{tip.desc}</p>
                  </div>
                ))}
              </div>

              <div className="mt-10 text-center">
                <Link href="/cards" className="btn-base btn-secondary px-8 py-3 border-2 font-bold">
                  Compare All Credit Cards <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </section>
        )}

      </main>
      <Footer />
    </>
  );
}
