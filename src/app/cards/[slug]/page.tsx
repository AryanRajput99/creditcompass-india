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
  ExternalLink,
  ArrowLeft,
  Star,
  CreditCard as CardIcon,
  Zap,
  ShieldCheck,
} from 'lucide-react';
import { formatRupee, CATEGORY_ICONS, CATEGORY_LABELS, CATEGORY_COLORS, cn } from '@/lib/utils';
import { CreditCard } from '@/types';

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

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FinancialProduct',
    name: typedCard.name,
    brand: { '@type': 'Brand', name: typedCard.bank_name },
    description: typedCard.seo_description,
    offers: { '@type': 'Offer', price: typedCard.annual_fee, priceCurrency: 'INR' },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
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
                <form action="/api/track-click" method="POST" target="_blank">
                  <input type="hidden" name="card_id" value={typedCard.id} />
                  <input type="hidden" name="card_name" value={typedCard.name} />
                  <input type="hidden" name="card_slug" value={typedCard.slug} />
                  <input type="hidden" name="affiliate_url" value={typedCard.affiliate_url} />
                  <button
                    id="apply-now-hero-button"
                    type="submit"
                    className="btn-base btn-apply px-8 py-3.5 text-base gap-3 shadow-lg"
                  >
                    Apply Now on {typedCard.bank_name}
                    <ExternalLink className="w-5 h-5" />
                  </button>
                </form>
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

          {/* Bottom CTA */}
          <div className="surface-card p-8 text-center bg-gradient-to-br from-blue-600 to-indigo-700 border-none">
            <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <ShieldCheck className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-2xl font-extrabold text-white mb-2 tracking-tight">
              Ready to Apply?
            </h2>
            <p className="text-white/70 mb-6 text-sm font-medium">
              Takes less than 5 minutes. No hidden fees in the application.
            </p>
            <form action="/api/track-click" method="POST" target="_blank">
              <input type="hidden" name="card_id" value={typedCard.id} />
              <input type="hidden" name="card_name" value={typedCard.name} />
              <input type="hidden" name="card_slug" value={typedCard.slug} />
              <input type="hidden" name="affiliate_url" value={typedCard.affiliate_url} />
              <button
                id="apply-now-bottom-button"
                type="submit"
                className="inline-flex items-center gap-2 px-8 py-3.5 bg-white text-[hsl(var(--color-primary))] rounded-xl font-extrabold text-base hover:bg-blue-50 transition-colors shadow-lg"
              >
                Apply Now on {typedCard.bank_name}
                <ExternalLink className="w-5 h-5" />
              </button>
            </form>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
