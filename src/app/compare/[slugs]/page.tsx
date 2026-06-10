import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import {
  CheckCircle,
  XCircle,
  Trophy,
  CreditCard as CardIcon,
  ArrowLeft,
  ArrowRight,
} from 'lucide-react';
import { formatRupee } from '@/lib/utils';
import { CreditCard } from '@/types';
import { getEarnKaroOffer } from '@/data/earnkaro-offers';
import { getMonetizedSlugs } from '@/lib/monetization';
import ApplyButton from '@/components/ui/ApplyButton';

interface PageProps {
  params: Promise<{ slugs: string }>;
}

/** Parse "card-a-vs-card-b" into two slugs */
function parseSlugs(raw: string): [string, string] | null {
  const parts = raw.split('-vs-');
  if (parts.length !== 2) return null;
  return [parts[0], parts[1]];
}

// -- Generate all comparison combinations at build time for static SEO pages --
export async function generateStaticParams() {
  const slugs = getMonetizedSlugs();
  const pairs: { slugs: string }[] = [];

  for (let i = 0; i < slugs.length; i++) {
    for (let j = i + 1; j < slugs.length; j++) {
      pairs.push({ slugs: `${slugs[i]}-vs-${slugs[j]}` });
    }
  }
  return pairs;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slugs } = await params;
  const parsed = parseSlugs(slugs);
  if (!parsed) return { title: 'Compare Cards' };

  const supabase = await createClient();
  const { data: cards } = await supabase
    .from('credit_cards')
    .select('name, bank_name')
    .in('slug', parsed);

  if (!cards || cards.length < 2) return { title: 'Compare Cards' };

  const [a, b] = cards;
  const currentYear = new Date().getFullYear();
  return {
    title: `${a.name} vs ${b.name} — Which is Better? (${currentYear} Comparison)`,
    description: `Detailed comparison of ${a.name} (${a.bank_name}) vs ${b.name} (${b.bank_name}). Compare fees, cashback, rewards, lounge access & eligibility side-by-side. Find out which card is right for you.`,
    alternates: {
      canonical: `/compare/${slugs}`,
    },
  };
}

// -- Helper: determine winner for a numeric comparison --
function getWinner(
  valA: number | null | undefined,
  valB: number | null | undefined,
  lowerIsBetter: boolean
): 'a' | 'b' | 'tie' {
  if (valA == null && valB == null) return 'tie';
  if (valA == null) return 'b';
  if (valB == null) return 'a';
  if (valA === valB) return 'tie';
  if (lowerIsBetter) return valA < valB ? 'a' : 'b';
  return valA > valB ? 'a' : 'b';
}

export default async function ComparisonPage({ params }: PageProps) {
  const { slugs } = await params;
  const parsed = parseSlugs(slugs);
  if (!parsed) notFound();

  const [slugA, slugB] = parsed;
  const supabase = await createClient();

  const { data: cardsData } = await supabase
    .from('credit_cards')
    .select('*')
    .in('slug', [slugA, slugB]);

  if (!cardsData || cardsData.length < 2) notFound();

  const cardA = (cardsData as CreditCard[]).find((c) => c.slug === slugA)!;
  const cardB = (cardsData as CreditCard[]).find((c) => c.slug === slugB)!;

  if (!cardA || !cardB) notFound();

  const ekA = getEarnKaroOffer(cardA.slug);
  const ekB = getEarnKaroOffer(cardB.slug);
  const applyUrlA = ekA?.earnkaro_url ?? cardA.affiliate_url;
  const applyUrlB = ekB?.earnkaro_url ?? cardB.affiliate_url;

  // Scoring
  const feeWinner = getWinner(cardA.annual_fee, cardB.annual_fee, true);
  const cashbackWinner = getWinner(cardA.cashback_rate, cardB.cashback_rate, false);
  const incomeWinner = getWinner(cardA.min_income_monthly, cardB.min_income_monthly, true);
  const creditScoreWinner = getWinner(cardA.min_credit_score, cardB.min_credit_score, true);

  let scoreA = 0;
  let scoreB = 0;
  [feeWinner, cashbackWinner, incomeWinner, creditScoreWinner].forEach((w) => {
    if (w === 'a') scoreA++;
    if (w === 'b') scoreB++;
  });

  const overallWinner = scoreA > scoreB ? 'a' : scoreB > scoreA ? 'b' : 'tie';

  // Fetch more comparison suggestions
  const { data: otherCards } = await supabase
    .from('credit_cards')
    .select('slug, name')
    .in('slug', getMonetizedSlugs())
    .not('slug', 'in', `(${slugA},${slugB})`)
    .limit(6);

  // JSON-LD Schema
  const currentYear = new Date().getFullYear();
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: `${cardA.name} vs ${cardB.name} — Detailed Comparison ${currentYear}`,
    description: `Side-by-side comparison of ${cardA.name} and ${cardB.name} credit cards.`,
    author: { '@type': 'Organization', name: 'CreditCompass India' },
    datePublished: new Date().toISOString().split('T')[0],
  };

  // Breadcrumb Schema
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://creditcompass-india.vercel.app';
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: baseUrl,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Compare',
        item: `${baseUrl}/compare`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: `${cardA.name} vs ${cardB.name}`,
        item: `${baseUrl}/compare/${slugs}`,
      },
    ],
  };

  // FAQ Schema
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: `Which is better: ${cardA.name} or ${cardB.name}?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: overallWinner === 'a'
            ? `${cardA.name} wins overall with better fees and rewards compared to ${cardB.name}.`
            : overallWinner === 'b'
            ? `${cardB.name} wins overall with better fees and rewards compared to ${cardA.name}.`
            : `Both cards are equally competitive. Your choice depends on your spending habits.`,
        },
      },
      {
        '@type': 'Question',
        name: `What is the annual fee of ${cardA.name} vs ${cardB.name}?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `${cardA.name} has an annual fee of ₹${cardA.annual_fee?.toLocaleString('en-IN') ?? '0'}${cardA.is_lifetime_free ? ' (Lifetime Free)' : ''}, while ${cardB.name} has an annual fee of ₹${cardB.annual_fee?.toLocaleString('en-IN') ?? '0'}${cardB.is_lifetime_free ? ' (Lifetime Free)' : ''}.`,
        },
      },
    ],
  };

  const winnerBadge = (winner: 'a' | 'b' | 'tie', side: 'a' | 'b') => {
    if (winner === 'tie' || winner !== side) return null;
    return (
      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-[10px] font-bold ml-2">
        <Trophy className="w-3 h-3" /> Winner
      </span>
    );
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <Navbar />

      <main className="min-h-screen bg-[hsl(var(--color-bg-secondary))] pt-24 pb-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

          {/* Visual Breadcrumbs */}
          <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-[hsl(var(--color-text-secondary))] mb-8 bg-white/40 backdrop-blur px-4 py-2.5 rounded-xl border border-[hsl(var(--color-border))] inline-flex shadow-sm">
            <Link href="/" className="hover:text-[hsl(var(--color-primary))] transition-colors">
              Home
            </Link>
            <span className="text-[hsl(var(--color-text-tertiary))]">/</span>
            <Link href="/compare" className="hover:text-[hsl(var(--color-primary))] transition-colors">
              Compare
            </Link>
            <span className="text-[hsl(var(--color-text-tertiary))]">/</span>
            <span className="text-[hsl(var(--color-text))] font-bold truncate max-w-[200px] sm:max-w-none">
              {cardA.name} vs {cardB.name}
            </span>
          </div>

          {/* Title */}
          <div className="text-center mb-12">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-[hsl(var(--color-text))] tracking-tight mb-4 leading-tight">
              {cardA.name} <span className="text-[hsl(var(--color-primary))]">vs</span> {cardB.name}
            </h1>
            <p className="text-[hsl(var(--color-text-secondary))] text-lg font-medium max-w-2xl mx-auto">
              Detailed side-by-side comparison to help you pick the right card for your needs.
            </p>
          </div>

          {/* Winner Banner */}
          {overallWinner !== 'tie' && (
            <div className="surface-card p-6 mb-8 bg-gradient-to-r from-emerald-50 to-teal-50 border-emerald-200 text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Trophy className="w-6 h-6 text-emerald-600" />
                <span className="text-lg font-extrabold text-emerald-800">Our Recommendation</span>
              </div>
              <p className="text-emerald-700 font-semibold">
                <strong>{overallWinner === 'a' ? cardA.name : cardB.name}</strong> wins {scoreA > scoreB ? scoreA : scoreB} out of 4 comparison categories.
              </p>
            </div>
          )}

          {/* Card Headers */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {[
              { card: cardA, applyUrl: applyUrlA, ek: ekA, isWinner: overallWinner === 'a' },
              { card: cardB, applyUrl: applyUrlB, ek: ekB, isWinner: overallWinner === 'b' },
            ].map(({ card, applyUrl, ek, isWinner }) => (
              <div
                key={card.id}
                className={`surface-card p-6 relative ${isWinner ? 'ring-2 ring-emerald-400' : ''}`}
              >
                {isWinner && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-emerald-600 text-white text-[10px] font-bold uppercase tracking-widest rounded-full">
                    ⭐ Recommended
                  </div>
                )}

                <div className="flex items-center gap-4 mb-4">
                  <div className="w-16 h-12 bg-[hsl(var(--color-bg-secondary))] rounded-xl border border-[hsl(var(--color-border))] flex items-center justify-center p-2">
                      <CardIcon className="w-6 h-6 text-[hsl(var(--color-text-tertiary))]" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-[hsl(var(--color-text-tertiary))] uppercase tracking-widest">{card.bank_name}</p>
                    <Link href={`/cards/${card.slug}`} className="font-bold text-[hsl(var(--color-text))] hover:text-[hsl(var(--color-primary))] transition-colors">
                      {card.name}
                    </Link>
                  </div>
                </div>

                <ApplyButton
                  cardId={card.id}
                  cardName={card.name}
                  cardSlug={card.slug}
                  affiliateUrl={applyUrl}
                  bankName={card.bank_name}
                />


              </div>
            ))}
          </div>

          {/* Comparison Table */}
          <div className="surface-card overflow-hidden mb-8">
            <div className="p-6 border-b border-[hsl(var(--color-border))]">
              <h2 className="text-lg font-extrabold text-[hsl(var(--color-text))] tracking-tight">
                Side-by-Side Comparison
              </h2>
            </div>

            <div className="divide-y divide-[hsl(var(--color-border))]">
              {/* Comparison Rows */}
              {[
                {
                  label: 'Annual Fee',
                  valA: cardA.is_lifetime_free ? 'Lifetime Free' : cardA.annual_fee === 0 ? 'Free' : formatRupee(cardA.annual_fee),
                  valB: cardB.is_lifetime_free ? 'Lifetime Free' : cardB.annual_fee === 0 ? 'Free' : formatRupee(cardB.annual_fee),
                  winner: feeWinner,
                },
                {
                  label: 'Joining Fee',
                  valA: cardA.joining_fee === 0 ? 'Free' : formatRupee(cardA.joining_fee),
                  valB: cardB.joining_fee === 0 ? 'Free' : formatRupee(cardB.joining_fee),
                  winner: getWinner(cardA.joining_fee, cardB.joining_fee, true),
                },
                {
                  label: 'Fee Waiver',
                  valA: cardA.annual_fee_waiver || '—',
                  valB: cardB.annual_fee_waiver || '—',
                  winner: 'tie' as const,
                },
                {
                  label: 'Cashback Rate',
                  valA: cardA.cashback_rate ? `Up to ${cardA.cashback_rate}%` : '—',
                  valB: cardB.cashback_rate ? `Up to ${cardB.cashback_rate}%` : '—',
                  winner: cashbackWinner,
                },
                {
                  label: 'Reward Rate',
                  valA: cardA.reward_rate || '—',
                  valB: cardB.reward_rate || '—',
                  winner: 'tie' as const,
                },
                {
                  label: 'Lounge Access',
                  valA: cardA.lounge_access || 'No',
                  valB: cardB.lounge_access || 'No',
                  winner: 'tie' as const,
                },
                {
                  label: 'Welcome Bonus',
                  valA: cardA.welcome_bonus || '—',
                  valB: cardB.welcome_bonus || '—',
                  winner: 'tie' as const,
                },
                {
                  label: 'Min. Income',
                  valA: cardA.min_income_monthly ? `${formatRupee(cardA.min_income_monthly)}/mo` : 'Not specified',
                  valB: cardB.min_income_monthly ? `${formatRupee(cardB.min_income_monthly)}/mo` : 'Not specified',
                  winner: incomeWinner,
                },
                {
                  label: 'Credit Score',
                  valA: cardA.min_credit_score ? `${cardA.min_credit_score}+` : 'Not specified',
                  valB: cardB.min_credit_score ? `${cardB.min_credit_score}+` : 'Not specified',
                  winner: creditScoreWinner,
                },
                {
                  label: 'Best For',
                  valA: cardA.best_for || '—',
                  valB: cardB.best_for || '—',
                  winner: 'tie' as const,
                },
              ].map((row, i) => (
                <div key={i} className="grid grid-cols-3 gap-4 p-5 hover:bg-[hsl(var(--color-bg-secondary))] transition-colors">
                  <div className="text-[12px] font-bold text-[hsl(var(--color-text-secondary))] uppercase tracking-widest flex items-center">
                    {row.label}
                  </div>
                  <div className="text-sm font-semibold text-[hsl(var(--color-text))]">
                    {typeof row.valA === 'string' && (row.valA === 'Free' || row.valA === 'Lifetime Free') ? (
                      <span className="text-emerald-600 font-extrabold">{row.valA}</span>
                    ) : row.valA}
                    {winnerBadge(row.winner, 'a')}
                  </div>
                  <div className="text-sm font-semibold text-[hsl(var(--color-text))]">
                    {typeof row.valB === 'string' && (row.valB === 'Free' || row.valB === 'Lifetime Free') ? (
                      <span className="text-emerald-600 font-extrabold">{row.valB}</span>
                    ) : row.valB}
                    {winnerBadge(row.winner, 'b')}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Pros & Cons */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {[cardA, cardB].map((card) => (
              <div key={card.id} className="surface-card p-6">
                <h3 className="font-extrabold text-[hsl(var(--color-text))] mb-4">{card.name}</h3>
                <div className="space-y-4">
                  <div>
                    <p className="text-[11px] font-bold text-emerald-700 uppercase tracking-widest mb-2 flex items-center gap-1">
                      <CheckCircle className="w-3.5 h-3.5" /> What we love
                    </p>
                    <ul className="space-y-2">
                      {card.pros.map((pro, i) => (
                        <li key={i} className="text-sm text-[hsl(var(--color-text-secondary))] flex items-start gap-2">
                          <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-emerald-500 flex-shrink-0" />
                          {pro}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="text-[11px] font-bold text-red-600 uppercase tracking-widest mb-2 flex items-center gap-1">
                      <XCircle className="w-3.5 h-3.5" /> Keep in mind
                    </p>
                    <ul className="space-y-2">
                      {card.cons.map((con, i) => (
                        <li key={i} className="text-sm text-[hsl(var(--color-text-secondary))] flex items-start gap-2">
                          <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-red-500 flex-shrink-0" />
                          {con}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* FAQ Section */}
          <div className="surface-card p-6 sm:p-8 mb-8">
            <h2 className="text-lg font-extrabold text-[hsl(var(--color-text))] mb-6">
              Frequently Asked Questions
            </h2>
            <div className="space-y-6">
              <div>
                <h3 className="font-bold text-[hsl(var(--color-text))] mb-2">
                  Which is better: {cardA.name} or {cardB.name}?
                </h3>
                <p className="text-sm text-[hsl(var(--color-text-secondary))] leading-relaxed">
                  {overallWinner === 'a'
                    ? `Based on our analysis, ${cardA.name} is the better choice with advantages in ${scoreA} out of 4 comparison categories including fees and rewards. However, ${cardB.name} may be better if your spending aligns with its specific benefits like ${cardB.best_for?.toLowerCase() || 'its niche category'}.`
                    : overallWinner === 'b'
                    ? `Based on our analysis, ${cardB.name} is the better choice with advantages in ${scoreB} out of 4 comparison categories including fees and rewards. However, ${cardA.name} may be better if your spending aligns with its specific benefits like ${cardA.best_for?.toLowerCase() || 'its niche category'}.`
                    : `Both cards are equally competitive across fees, cashback, and eligibility. Choose ${cardA.name} if you prefer ${cardA.best_for?.toLowerCase() || 'its benefits'}, or ${cardB.name} if you prefer ${cardB.best_for?.toLowerCase() || 'its benefits'}.`}
                </p>
              </div>
              <div>
                <h3 className="font-bold text-[hsl(var(--color-text))] mb-2">
                  What is the annual fee difference?
                </h3>
                <p className="text-sm text-[hsl(var(--color-text-secondary))] leading-relaxed">
                  {cardA.name} has an annual fee of {cardA.is_lifetime_free ? 'zero (Lifetime Free)' : `₹${cardA.annual_fee?.toLocaleString('en-IN') ?? '0'}`}
                  {cardA.annual_fee_waiver ? ` (${cardA.annual_fee_waiver})` : ''},
                  while {cardB.name} costs {cardB.is_lifetime_free ? 'zero (Lifetime Free)' : `₹${cardB.annual_fee?.toLocaleString('en-IN') ?? '0'}`}
                  {cardB.annual_fee_waiver ? ` (${cardB.annual_fee_waiver})` : ''} per year.
                </p>
              </div>
              <div>
                <h3 className="font-bold text-[hsl(var(--color-text))] mb-2">
                  Can I apply for both cards?
                </h3>
                <p className="text-sm text-[hsl(var(--color-text-secondary))] leading-relaxed">
                  Yes! There&apos;s no restriction on holding multiple credit cards from different banks. Many savvy users hold both types to maximize rewards across different spending categories.
                </p>
              </div>
            </div>
          </div>

          {/* More Comparisons */}
          {otherCards && otherCards.length > 0 && (
            <div className="surface-card p-6 sm:p-8">
              <h2 className="text-lg font-extrabold text-[hsl(var(--color-text))] mb-6">
                More Comparisons
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {otherCards.map((other) => (
                  <div key={other.slug} className="flex gap-3">
                    <Link
                      href={`/compare/${cardA.slug}-vs-${other.slug}`}
                      className="flex-1 text-sm font-semibold text-[hsl(var(--color-primary))] hover:underline flex items-center gap-1"
                    >
                      {cardA.name} vs {other.name} <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                ))}
                {otherCards.map((other) => (
                  <div key={`b-${other.slug}`} className="flex gap-3">
                    <Link
                      href={`/compare/${cardB.slug}-vs-${other.slug}`}
                      className="flex-1 text-sm font-semibold text-[hsl(var(--color-primary))] hover:underline flex items-center gap-1"
                    >
                      {cardB.name} vs {other.name} <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </>
  );
}
