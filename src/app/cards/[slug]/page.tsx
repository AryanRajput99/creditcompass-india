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
  ArrowLeft,
  Star,
  CreditCard as CardIcon,
  Zap,
  ShieldCheck,
} from 'lucide-react';
import { formatRupee, CATEGORY_ICONS, CATEGORY_LABELS, CATEGORY_COLORS, cn } from '@/lib/utils';
import { CreditCard } from '@/types';
import { getEarnKaroOffer } from '@/data/earnkaro-offers';
import { getMonetizedSlugs } from '@/lib/monetization';
import ApplyButton from '@/components/ui/ApplyButton';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const supabase = await createClient();
  const { data: card } = await supabase
    .from('credit_cards')
    .select('name, bank_name, seo_title, seo_description')
    .eq('slug', resolvedParams.slug)
    .single();

  if (!card) return { title: 'Card Not Found' };

  return {
    title: card.seo_title || `${card.name} Review & Benefits 2025`,
    description:
      card.seo_description ||
      `Complete review of ${card.name} by ${card.bank_name}. Check eligibility, fees, rewards, and apply online.`,
  };
}

export default async function CardDetailPage({ params }: PageProps) {
  const resolvedParams = await params;
  const supabase = await createClient();

  const { data: card, error } = await supabase
    .from('credit_cards')
    .select('*')
    .eq('slug', resolvedParams.slug)
    .single();

  if (error || !card) {
    notFound();
  }

  const typedCard = card as CreditCard;
  const ekOffer = getEarnKaroOffer(typedCard.slug);
  // Use real EarnKaro link if available, otherwise fall back to card's affiliate_url
  const applyUrl = ekOffer?.earnkaro_url ?? typedCard.affiliate_url;

  // Fetch up to 3 related cards (same first category, excluding current card)
  const firstCategory = typedCard.categories[0] || 'cashback';
  const { data: relatedCards } = await supabase
    .from('credit_cards')
    .select('id, name, bank_name, slug, card_image_url, joining_fee, annual_fee, is_lifetime_free, categories')
    .contains('categories', [firstCategory])
    .neq('slug', typedCard.slug)
    .limit(3);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FinancialProduct',
    name: typedCard.name,
    brand: { '@type': 'Brand', name: typedCard.bank_name },
    description: typedCard.seo_description,
    offers: { '@type': 'Offer', price: typedCard.annual_fee, priceCurrency: 'INR' },
  };

  const faqs = [
    {
      q: `What is the annual fee of ${typedCard.name}?`,
      a: `${typedCard.name} has an annual fee of ${
        typedCard.is_lifetime_free
          ? '₹0 (Lifetime Free)'
          : typedCard.annual_fee === 0
          ? '₹0 (Free)'
          : `₹${typedCard.annual_fee.toLocaleString('en-IN')}`
      }.${typedCard.annual_fee_waiver ? ` The fee can be waived off on: ${typedCard.annual_fee_waiver}.` : ''}`,
    },
    {
      q: `What is the minimum monthly income required for ${typedCard.name}?`,
      a: typedCard.min_income_monthly
        ? `To apply for ${typedCard.name}, a minimum monthly income of ₹${typedCard.min_income_monthly.toLocaleString(
            'en-IN'
          )} is recommended.`
        : `The minimum monthly income is not strictly specified by the bank, but a stable income source is required for approval.`,
    },
    ...(typedCard.lounge_access
      ? [
          {
            q: `Does ${typedCard.name} offer airport lounge access?`,
            a: `Yes! ${typedCard.name} offers lounge access: ${typedCard.lounge_access}.`,
          },
        ]
      : []),
    {
      q: `How can I earn cashback or rewards on ${typedCard.name}?`,
      a: `${typedCard.name} offers rewards based on spending: ${
        typedCard.cashback_rate ? `Cashback up to ${typedCard.cashback_rate}%. ` : ''
      }${typedCard.reward_rate ? `Reward rate: ${typedCard.reward_rate}.` : ''}`,
    },
  ];

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.a,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <Navbar />

      <main className="min-h-screen bg-[hsl(var(--color-bg-secondary))] pt-24 pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

          {/* Breadcrumb */}
          <Link
            href="/cards"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[hsl(var(--color-text-secondary))] hover:text-[hsl(var(--color-primary))] transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to all cards
          </Link>

          {/* Hero Card */}
          <div className="surface-card p-6 sm:p-10 mb-8 relative overflow-hidden">
            {/* Subtle decorative gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50/60 via-transparent to-transparent pointer-events-none" />

            <div className="flex flex-col md:flex-row gap-8 items-start relative z-10">
              {/* Card Image */}
              <div className="w-36 h-24 md:w-52 md:h-36 rounded-2xl bg-[hsl(var(--color-bg-secondary))] border border-[hsl(var(--color-border))] flex items-center justify-center flex-shrink-0 p-3 shadow-sm relative">
                {typedCard.card_image_url ? (
                  <Image
                    src={typedCard.card_image_url}
                    alt={typedCard.name}
                    width={200}
                    height={130}
                    className="object-contain w-full h-full"
                  />
                ) : (
                  <CardIcon className="w-12 h-12 text-[hsl(var(--color-text-tertiary))]" />
                )}
                {typedCard.is_featured && (
                  <div className="absolute -top-3 -right-3 flex items-center gap-1 px-2.5 py-1 rounded-full border shadow-sm bg-white border-[hsl(var(--color-border))]">
                    <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                    <span className="text-[10px] font-extrabold text-[hsl(var(--color-text))] uppercase tracking-widest">
                      Featured
                    </span>
                  </div>
                )}
              </div>

              {/* Card Info */}
              <div className="flex-1 min-w-0">
                <p className="text-[11px] font-extrabold text-[hsl(var(--color-text-tertiary))] uppercase tracking-widest mb-2">
                  {typedCard.bank_name}
                </p>
                <h1 className="text-3xl sm:text-4xl font-extrabold text-[hsl(var(--color-text))] mb-4 leading-tight tracking-tighter">
                  {typedCard.name}
                </h1>

                <div className="flex flex-wrap gap-2 mb-8">
                  {typedCard.categories.map((cat) => (
                    <span
                      key={cat}
                      className={cn(
                        'badge',
                        CATEGORY_COLORS[cat] || 'bg-slate-50 text-slate-600 border border-slate-200'
                      )}
                    >
                      {CATEGORY_ICONS[cat] && (
                        <span className="mr-1">{CATEGORY_ICONS[cat]}</span>
                      )}
                      {CATEGORY_LABELS[cat] || cat}
                    </span>
                  ))}
                </div>

                {/* CTA Button */}
                <ApplyButton 
                  cardId={typedCard.id}
                  cardName={typedCard.name}
                  cardSlug={typedCard.slug}
                  affiliateUrl={applyUrl}
                  bankName={typedCard.bank_name}
                />

                {/* EarnKaro commission callout */}
                {ekOffer && (
                  <div className="mt-3 inline-flex items-center gap-2 px-4 py-2 bg-emerald-50 border border-emerald-200 rounded-xl">
                    <span className="w-5 h-5 bg-emerald-600 rounded-full flex items-center justify-center flex-shrink-0">
                      <ShieldCheck className="w-3 h-3 text-white" />
                    </span>
                    <p className="text-xs text-emerald-800 font-semibold">
                      Apply via our link &amp; earn{' '}
                      <span className="font-extrabold text-emerald-700">₹{ekOffer.commission.toLocaleString('en-IN')} cashback</span>{' '}in your EarnKaro wallet.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {[
              {
                label: 'Joining Fee',
                value:
                  typedCard.joining_fee === 0 ? (
                    <span className="text-emerald-600 font-extrabold">Free</span>
                  ) : (
                    formatRupee(typedCard.joining_fee)
                  ),
                icon: '🎫',
              },
              {
                label: 'Annual Fee',
                value: typedCard.is_lifetime_free ? (
                  <span className="text-emerald-600 font-extrabold">Lifetime Free</span>
                ) : typedCard.annual_fee === 0 ? (
                  <span className="text-emerald-600 font-extrabold">Free</span>
                ) : (
                  formatRupee(typedCard.annual_fee)
                ),
                icon: '📅',
              },
              {
                label: 'Min. Income',
                value: typedCard.min_income_monthly
                  ? `${formatRupee(typedCard.min_income_monthly)}/mo`
                  : 'Not specified',
                icon: '💰',
              },
              {
                label: 'Credit Score',
                value: typedCard.min_credit_score
                  ? `${typedCard.min_credit_score}+`
                  : 'Not specified',
                icon: '📊',
              },
            ].map((stat, i) => (
              <div key={i} className="surface-card p-5 text-center">
                <div className="text-2xl mb-2">{stat.icon}</div>
                <p className="text-[11px] font-bold text-[hsl(var(--color-text-secondary))] uppercase tracking-widest mb-1">
                  {stat.label}
                </p>
                <p className="text-lg font-extrabold text-[hsl(var(--color-text))]">
                  {stat.value}
                </p>
              </div>
            ))}
          </div>

          {/* Pros & Cons */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {/* Pros */}
            <div className="surface-card p-6 sm:p-8">
              <h2 className="text-base font-extrabold text-emerald-700 mb-5 flex items-center gap-2 uppercase tracking-widest">
                <CheckCircle className="w-5 h-5" /> What we love
              </h2>
              <ul className="space-y-4">
                {typedCard.pros.map((pro, i) => (
                  <li key={i} className="flex items-start gap-3 text-[14px] text-[hsl(var(--color-text-secondary))]">
                    <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-emerald-500 flex-shrink-0" />
                    <span className="leading-relaxed">{pro}</span>
                  </li>
                ))}
                {typedCard.pros.length === 0 && (
                  <li className="text-sm text-[hsl(var(--color-text-tertiary))]">
                    No specific pros listed.
                  </li>
                )}
              </ul>
            </div>

            {/* Cons */}
            <div className="surface-card p-6 sm:p-8">
              <h2 className="text-base font-extrabold text-red-600 mb-5 flex items-center gap-2 uppercase tracking-widest">
                <XCircle className="w-5 h-5" /> Keep in mind
              </h2>
              <ul className="space-y-4">
                {typedCard.cons.map((con, i) => (
                  <li key={i} className="flex items-start gap-3 text-[14px] text-[hsl(var(--color-text-secondary))]">
                    <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-red-500 flex-shrink-0" />
                    <span className="leading-relaxed">{con}</span>
                  </li>
                ))}
                {typedCard.cons.length === 0 && (
                  <li className="text-sm text-[hsl(var(--color-text-tertiary))]">
                    No specific cons listed.
                  </li>
                )}
              </ul>
            </div>
          </div>

          {/* Details Table */}
          <div className="surface-card overflow-hidden mb-8">
            <div className="p-6 border-b border-[hsl(var(--color-border))] flex items-center gap-3">
              <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center">
                <Zap className="w-4 h-4 text-[hsl(var(--color-primary))]" />
              </div>
              <h2 className="text-lg font-extrabold text-[hsl(var(--color-text))] tracking-tight">
                Benefits &amp; Features
              </h2>
            </div>
            <div className="divide-y divide-[hsl(var(--color-border))]">
              {typedCard.cashback_rate && (
                <div className="p-5 grid sm:grid-cols-4 gap-3 items-start hover:bg-[hsl(var(--color-bg-secondary))] transition-colors">
                  <div className="sm:col-span-1 text-[12px] font-bold text-[hsl(var(--color-text-secondary))] uppercase tracking-widest">
                    Cashback
                  </div>
                  <div className="sm:col-span-3 text-emerald-600 font-extrabold">
                    Up to {typedCard.cashback_rate}%
                  </div>
                </div>
              )}
              {typedCard.reward_rate && (
                <div className="p-5 grid sm:grid-cols-4 gap-3 items-start hover:bg-[hsl(var(--color-bg-secondary))] transition-colors">
                  <div className="sm:col-span-1 text-[12px] font-bold text-[hsl(var(--color-text-secondary))] uppercase tracking-widest">
                    Rewards
                  </div>
                  <div className="sm:col-span-3 text-[hsl(var(--color-text))] leading-relaxed text-sm font-medium">
                    {typedCard.reward_rate}
                  </div>
                </div>
              )}
              {typedCard.lounge_access && (
                <div className="p-5 grid sm:grid-cols-4 gap-3 items-start hover:bg-[hsl(var(--color-bg-secondary))] transition-colors">
                  <div className="sm:col-span-1 text-[12px] font-bold text-[hsl(var(--color-text-secondary))] uppercase tracking-widest">
                    Lounge Access
                  </div>
                  <div className="sm:col-span-3 text-[hsl(var(--color-text))] leading-relaxed text-sm font-medium">
                    {typedCard.lounge_access}
                  </div>
                </div>
              )}
              {typedCard.fuel_surcharge && (
                <div className="p-5 grid sm:grid-cols-4 gap-3 items-start hover:bg-[hsl(var(--color-bg-secondary))] transition-colors">
                  <div className="sm:col-span-1 text-[12px] font-bold text-[hsl(var(--color-text-secondary))] uppercase tracking-widest">
                    Fuel Surcharge
                  </div>
                  <div className="sm:col-span-3 text-[hsl(var(--color-text))] leading-relaxed text-sm font-medium">
                    {typedCard.fuel_surcharge}
                  </div>
                </div>
              )}
              {typedCard.welcome_bonus && (
                <div className="p-5 grid sm:grid-cols-4 gap-3 items-start hover:bg-[hsl(var(--color-bg-secondary))] transition-colors">
                  <div className="sm:col-span-1 text-[12px] font-bold text-[hsl(var(--color-text-secondary))] uppercase tracking-widest">
                    Welcome Bonus
                  </div>
                  <div className="sm:col-span-3 text-[hsl(var(--color-text))] leading-relaxed text-sm font-medium">
                    {typedCard.welcome_bonus}
                  </div>
                </div>
              )}
              {typedCard.annual_fee_waiver && (
                <div className="p-5 grid sm:grid-cols-4 gap-3 items-start hover:bg-[hsl(var(--color-bg-secondary))] transition-colors">
                  <div className="sm:col-span-1 text-[12px] font-bold text-[hsl(var(--color-text-secondary))] uppercase tracking-widest">
                    Fee Waiver
                  </div>
                  <div className="sm:col-span-3 text-[hsl(var(--color-text))] leading-relaxed text-sm font-medium">
                    {typedCard.annual_fee_waiver}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Dynamic FAQ Section */}
          <div className="surface-card p-6 sm:p-8 mb-8">
            <h2 className="text-xl font-extrabold text-[hsl(var(--color-text))] mb-6 tracking-tight flex items-center gap-2">
              ❓ Frequently Asked Questions
            </h2>
            <div className="space-y-6 divide-y divide-[hsl(var(--color-border))]">
              {faqs.map((faq, idx) => (
                <div key={idx} className={idx > 0 ? "pt-6" : ""}>
                  <h3 className="font-bold text-[hsl(var(--color-text))] mb-2 text-base leading-snug">
                    {faq.q}
                  </h3>
                  <p className="text-sm text-[hsl(var(--color-text-secondary))] leading-relaxed font-medium">
                    {faq.a}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom CTA */}
          <div className="surface-card p-8 text-center bg-gradient-to-br from-blue-600 to-indigo-700 border-none mb-8">
            <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <ShieldCheck className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-2xl font-extrabold text-white mb-2 tracking-tight">
              Ready to Apply?
            </h2>
            <p className="text-white/70 mb-6 text-sm font-medium">
              Takes less than 5 minutes. No hidden fees in the application.
            </p>
            <ApplyButton 
              cardId={typedCard.id}
              cardName={typedCard.name}
              cardSlug={typedCard.slug}
              affiliateUrl={applyUrl}
              bankName={typedCard.bank_name}
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-white text-[hsl(var(--color-primary))] rounded-xl font-extrabold text-base hover:bg-blue-50 transition-colors shadow-lg"
            />
          </div>

          {/* Related Cards Section */}
          {relatedCards && relatedCards.length > 0 && (
            <div className="surface-card p-6 sm:p-8">
              <h2 className="text-xl font-extrabold text-[hsl(var(--color-text))] mb-6 tracking-tight">
                Recommended For You
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {((relatedCards as CreditCard[]) || []).map((rel) => (
                  <div key={rel.id} className="group border border-[hsl(var(--color-border))] rounded-2xl p-4 flex flex-col hover:border-[hsl(var(--color-primary))] hover:shadow-md transition-all bg-white">
                    <div className="h-20 mb-3 flex items-center justify-center p-2 bg-slate-50 rounded-xl relative">
                      {rel.card_image_url ? (
                        <Image
                          src={rel.card_image_url}
                          alt={rel.name}
                          width={100}
                          height={60}
                          className="object-contain max-h-full"
                        />
                      ) : (
                        <CardIcon className="w-8 h-8 text-[hsl(var(--color-text-tertiary))]" />
                      )}
                    </div>
                    <p className="text-[10px] text-[hsl(var(--color-text-tertiary))] font-extrabold uppercase tracking-widest mb-1 truncate">
                      {rel.bank_name}
                    </p>
                    <Link
                      href={`/cards/${rel.slug}`}
                      className="font-bold text-sm text-[hsl(var(--color-text))] hover:text-[hsl(var(--color-primary))] transition-colors line-clamp-2 leading-tight flex-1"
                    >
                      {rel.name}
                    </Link>
                    <div className="pt-3 mt-3 border-t border-[hsl(var(--color-border))] flex items-center justify-between text-xs">
                      <div>
                        <p className="text-[10px] font-bold text-[hsl(var(--color-text-tertiary))] uppercase tracking-widest">Annual Fee</p>
                        <p className="font-extrabold text-[hsl(var(--color-text))]">
                          {rel.is_lifetime_free ? (
                            <span className="text-emerald-600">Free</span>
                          ) : rel.annual_fee === 0 ? (
                            <span className="text-emerald-600">Free</span>
                          ) : (
                            `₹${rel.annual_fee.toLocaleString('en-IN')}`
                          )}
                        </p>
                      </div>
                      <Link
                        href={`/cards/${rel.slug}`}
                        className="px-3 py-1.5 bg-blue-50 hover:bg-blue-100 text-[hsl(var(--color-primary))] rounded-lg font-bold transition-colors"
                      >
                        Details
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Comparisons Section */}
          {relatedCards && relatedCards.length > 0 && (
            <div className="surface-card p-6 sm:p-8 mt-8">
              <h2 className="text-xl font-extrabold text-[hsl(var(--color-text))] mb-6 tracking-tight">
                Compare {typedCard.name} with Alternatives
              </h2>
              <div className="space-y-4">
                {((relatedCards as CreditCard[]) || []).map((rel) => {
                  const monetizedSlugs = getMonetizedSlugs();
                  const indexA = monetizedSlugs.indexOf(typedCard.slug);
                  const indexB = monetizedSlugs.indexOf(rel.slug);
                  const compSlug = indexA !== -1 && indexB !== -1
                    ? (indexA < indexB ? `${typedCard.slug}-vs-${rel.slug}` : `${rel.slug}-vs-${typedCard.slug}`)
                    : (typedCard.slug < rel.slug ? `${typedCard.slug}-vs-${rel.slug}` : `${rel.slug}-vs-${typedCard.slug}`);

                  return (
                    <Link
                      key={rel.id}
                      href={`/compare/${compSlug}`}
                      className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border border-[hsl(var(--color-border))] rounded-2xl hover:border-[hsl(var(--color-primary))] hover:shadow-md transition-all bg-white group gap-4"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-8 bg-slate-50 border border-[hsl(var(--color-border))] rounded-lg flex items-center justify-center p-1 flex-shrink-0">
                          {rel.card_image_url ? (
                            <Image
                              src={rel.card_image_url}
                              alt={rel.name}
                              width={40}
                              height={25}
                              className="object-contain"
                            />
                          ) : (
                            <CardIcon className="w-5 h-5 text-[hsl(var(--color-text-tertiary))]" />
                          )}
                        </div>
                        <div>
                          <p className="text-[10px] font-bold text-[hsl(var(--color-text-tertiary))] uppercase tracking-widest">
                            Side-by-Side Comparison
                          </p>
                          <h3 className="font-extrabold text-sm text-[hsl(var(--color-text))] group-hover:text-[hsl(var(--color-primary))] transition-colors mt-0.5">
                            {typedCard.name} <span className="text-[hsl(var(--color-text-tertiary))] font-normal">vs</span> {rel.name}
                          </h3>
                        </div>
                      </div>
                      <span className="inline-flex items-center gap-1 text-xs font-bold text-[hsl(var(--color-primary))] group-hover:translate-x-1 transition-transform self-end sm:self-auto">
                        View Comparison →
                      </span>
                    </Link>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </>
  );
}
