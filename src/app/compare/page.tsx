import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import {
  CheckCircle,
  XCircle,
  Plus,
  Trash2,
  ArrowLeft,
  ArrowRight,
  CreditCard as CardIcon,
  GitCompare,
} from 'lucide-react';
import { formatRupee } from '@/lib/utils';
import { CreditCard } from '@/types';

interface PageProps {
  searchParams: Promise<{ ids?: string }>;
}

export const metadata: Metadata = {
  title: 'Compare Credit Cards Side-by-Side | CreditCompass India',
  description:
    'Compare fees, rewards, cashback, and benefits of top credit cards in India to find the perfect card for your lifestyle.',
};

export default async function ComparePage({ searchParams }: PageProps) {
  const params = await searchParams;
  const idsParam = params.ids;

  if (!idsParam) {
    const POPULAR_PAIRINGS = [
      ['sbi-cashback-credit-card', 'hdfc-millennia'],
      ['axis-flipkart', 'sbi-cashback-credit-card'],
      ['sbi-simplyclick-credit-card', 'sbi-cashback-credit-card'],
      ['au-lit-credit-card', 'axis-myzone-rupay'],
      ['axis-myzone-rupay', 'axis-neo-rupay'],
      ['sbi-simplyclick-credit-card', 'hdfc-millennia'],
      ['idfc-first-mayura', 'sbi-cashback-credit-card'],
      ['axis-rewards-visa', 'hdfc-millennia'],
    ];

    const supabase = await createClient();
    const { data: dbCards } = await supabase
      .from('credit_cards')
      .select('id, name, slug, bank_name')
      .eq('is_active', true);

    const cardsList = (dbCards || []) as CreditCard[];

    const popularComparisons = POPULAR_PAIRINGS.map(([slugA, slugB]) => {
      const cardA = cardsList.find((c) => c.slug === slugA);
      const cardB = cardsList.find((c) => c.slug === slugB);
      if (!cardA || !cardB) return null;
      return { cardA, cardB };
    }).filter(Boolean) as { cardA: CreditCard; cardB: CreditCard }[];

    return (
      <>
        <Navbar />
        <main className="min-h-screen bg-[hsl(var(--color-bg-secondary))] pt-32 pb-20">
          <div className="max-w-5xl mx-auto px-4 text-center">
            <div className="w-20 h-20 bg-blue-50 rounded-3xl flex items-center justify-center mx-auto mb-6 border border-[hsl(var(--color-border))]">
              <GitCompare className="w-10 h-10 text-[hsl(var(--color-primary))]" />
            </div>
            <h1 className="text-3xl font-extrabold text-[hsl(var(--color-text))] mb-4 tracking-tighter">
              Select Cards to Compare
            </h1>
            <p className="text-[hsl(var(--color-text-secondary))] mb-8 max-w-lg mx-auto leading-relaxed">
              Browse our collection and select cards to see them side-by-side, or explore popular comparisons below.
            </p>
            <Link href="/cards" className="btn-base btn-apply px-8 py-3.5 text-base">
              Browse Credit Cards
            </Link>

            {popularComparisons.length > 0 && (
              <div className="mt-16 text-left">
                <h2 className="text-xl font-extrabold text-[hsl(var(--color-text))] tracking-tight mb-6 text-center sm:text-left">
                  🔥 Popular Credit Card Comparisons
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {popularComparisons.map(({ cardA, cardB }) => (
                    <Link
                      key={`${cardA.slug}-vs-${cardB.slug}`}
                      href={`/compare/${cardA.slug}-vs-${cardB.slug}`}
                      className="surface-card p-5 hover:border-[hsl(var(--color-primary))] hover:shadow-md transition-all flex items-center justify-between group"
                    >
                      <div className="flex-1 min-w-0 pr-4">
                        <p className="text-[10px] font-bold text-[hsl(var(--color-text-tertiary))] uppercase tracking-widest truncate">
                          {cardA.bank_name} vs {cardB.bank_name}
                        </p>
                        <h3 className="font-extrabold text-sm text-[hsl(var(--color-text))] group-hover:text-[hsl(var(--color-primary))] transition-colors mt-1 truncate">
                          {cardA.name} <span className="text-[hsl(var(--color-text-tertiary))] font-normal">vs</span> {cardB.name}
                        </h3>
                      </div>
                      <div className="w-8 h-8 bg-blue-50 group-hover:bg-[hsl(var(--color-primary))] rounded-full flex items-center justify-center flex-shrink-0 transition-colors">
                        <ArrowRight className="w-4 h-4 text-[hsl(var(--color-primary))] group-hover:text-white transition-colors" />
                      </div>
                    </Link>
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

  const ids = idsParam.split(',').filter(Boolean);

  if (ids.length > 3) {
    redirect(`/compare?ids=${ids.slice(0, 3).join(',')}`);
  }

  const supabase = await createClient();

  const { data: cardsData } = await supabase
    .from('credit_cards')
    .select('*')
    .in('id', ids);

  const cards = ((cardsData as CreditCard[]) || []).sort(
    (a, b) => ids.indexOf(a.id) - ids.indexOf(b.id)
  );

  if (cards.length === 0) {
    redirect('/compare');
  }

  const emptySlotsCount = Math.max(0, 3 - cards.length);
  const emptySlots = Array.from({ length: emptySlotsCount });

  // Helper: row cell styling
  const labelCell = 'col-span-1 text-[12px] font-bold text-[hsl(var(--color-text-secondary))] uppercase tracking-widest flex items-center py-1';
  const valueCell = 'col-span-1 text-sm font-semibold text-[hsl(var(--color-text))] leading-relaxed';

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[hsl(var(--color-bg-secondary))] pt-28 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Page Header */}
          <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <Link
                href="/cards"
                className="inline-flex items-center gap-2 text-sm font-semibold text-[hsl(var(--color-text-secondary))] hover:text-[hsl(var(--color-primary))] transition-colors mb-4"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to cards
              </Link>
              <h1 className="text-3xl font-extrabold text-[hsl(var(--color-text))] tracking-tighter">
                Compare Cards
              </h1>
              <p className="text-[hsl(var(--color-text-secondary))] mt-1 text-sm font-medium">
                Side-by-side comparison of fees, rewards, and benefits
              </p>
            </div>
            <Link href="/cards" className="btn-base btn-secondary px-6 py-2.5 text-sm font-bold border-2 self-start md:self-auto">
              <Plus className="w-4 h-4" /> Add Card
            </Link>
          </div>

          <div className="overflow-x-auto pb-8">
            <div className="min-w-[760px] w-full">

              {/* Card Header Row */}
              <div className="grid grid-cols-4 gap-4 sticky top-24 z-20 bg-[hsl(var(--color-bg-secondary))]/95 backdrop-blur py-4 border-b border-[hsl(var(--color-border))] mb-2">
                <div className="col-span-1 flex items-end pb-2">
                  <span className="text-[11px] font-extrabold text-[hsl(var(--color-text-tertiary))] uppercase tracking-widest">
                    Card Details
                  </span>
                </div>

                {cards.map((card) => (
                  <div
                    key={card.id}
                    className="col-span-1 surface-card p-4 relative group"
                  >
                    <Link
                      href={`/compare?ids=${ids.filter((id) => id !== card.id).join(',')}`}
                      className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-white opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity shadow-md"
                      title="Remove from compare"
                    >
                      <Trash2 className="w-3 h-3" />
                    </Link>

                    <div className="h-16 mb-3 flex items-center justify-center bg-[hsl(var(--color-bg-secondary))] rounded-xl border border-[hsl(var(--color-border))] p-2">
                        <CardIcon className="w-8 h-8 text-[hsl(var(--color-text-tertiary))]" />
                    </div>

                    <p className="text-[10px] text-[hsl(var(--color-text-tertiary))] font-bold tracking-widest uppercase truncate mb-1">
                      {card.bank_name}
                    </p>
                    <Link
                      href={`/cards/${card.slug}`}
                      className="font-extrabold text-sm text-[hsl(var(--color-text))] leading-tight hover:text-[hsl(var(--color-primary))] line-clamp-2 mb-3 mt-1 block"
                    >
                      {card.name}
                    </Link>

                    <form action="/api/track-click" method="POST" target="_blank">
                      <input type="hidden" name="card_id" value={card.id} />
                      <input type="hidden" name="card_name" value={card.name} />
                      <input type="hidden" name="card_slug" value={card.slug} />
                      <input type="hidden" name="affiliate_url" value={card.affiliate_url} />
                      <button type="submit" className="btn-apply text-xs py-2 w-full rounded-xl">
                        Apply Now
                      </button>
                    </form>
                  </div>
                ))}

                {emptySlots.map((_, i) => (
                  <div
                    key={`empty-${i}`}
                    className="col-span-1 bg-white border-2 border-dashed border-[hsl(var(--color-border))] p-4 rounded-2xl flex flex-col items-center justify-center text-center"
                  >
                    <div className="w-10 h-10 bg-[hsl(var(--color-bg-secondary))] rounded-xl flex items-center justify-center mb-3 border border-[hsl(var(--color-border))]">
                      <Plus className="w-5 h-5 text-[hsl(var(--color-text-tertiary))]" />
                    </div>
                    <p className="text-sm font-semibold text-[hsl(var(--color-text-secondary))] mb-3">
                      Add a card
                    </p>
                    <Link
                      href="/cards"
                      className="px-4 py-1.5 bg-[hsl(var(--color-bg-secondary))] border border-[hsl(var(--color-border))] rounded-lg text-xs font-bold text-[hsl(var(--color-text-secondary))] hover:border-[hsl(var(--color-primary))] hover:text-[hsl(var(--color-primary))] transition-colors"
                    >
                      Browse
                    </Link>
                  </div>
                ))}
              </div>

              {/* Comparison Rows */}
              <div className="surface-card overflow-hidden">

                {/* Fees Section */}
                <div className="p-6 border-b border-[hsl(var(--color-border))]">
                  <h3 className="text-[11px] font-extrabold text-[hsl(var(--color-primary))] uppercase tracking-widest mb-4">
                    Fees &amp; Charges
                  </h3>

                  <div className="grid grid-cols-4 gap-4 py-3 compare-row hover:bg-[hsl(var(--color-bg-secondary))] -mx-6 px-6 transition-colors rounded-lg">
                    <div className={labelCell}>Joining Fee</div>
                    {cards.map((card) => (
                      <div key={`jf-${card.id}`} className={valueCell}>
                        {card.joining_fee === 0 ? (
                          <span className="text-emerald-600 font-extrabold">Free</span>
                        ) : (
                          formatRupee(card.joining_fee)
                        )}
                      </div>
                    ))}
                    {emptySlots.map((_, i) => (
                      <div key={`ejf-${i}`} className="col-span-1" />
                    ))}
                  </div>

                  <div className="grid grid-cols-4 gap-4 py-3 compare-row hover:bg-[hsl(var(--color-bg-secondary))] -mx-6 px-6 transition-colors rounded-lg">
                    <div className={labelCell}>Annual Fee</div>
                    {cards.map((card) => (
                      <div key={`af-${card.id}`} className={valueCell}>
                        {card.is_lifetime_free ? (
                          <span className="text-emerald-600 font-extrabold">Lifetime Free</span>
                        ) : card.annual_fee === 0 ? (
                          <span className="text-emerald-600 font-extrabold">Free</span>
                        ) : (
                          formatRupee(card.annual_fee)
                        )}
                      </div>
                    ))}
                    {emptySlots.map((_, i) => (
                      <div key={`eaf-${i}`} className="col-span-1" />
                    ))}
                  </div>

                  <div className="grid grid-cols-4 gap-4 py-3 compare-row hover:bg-[hsl(var(--color-bg-secondary))] -mx-6 px-6 transition-colors rounded-lg">
                    <div className={labelCell}>Fee Waiver</div>
                    {cards.map((card) => (
                      <div key={`fw-${card.id}`} className={valueCell}>
                        {card.annual_fee_waiver || (
                          <span className="text-[hsl(var(--color-text-tertiary))]">—</span>
                        )}
                      </div>
                    ))}
                    {emptySlots.map((_, i) => (
                      <div key={`efw-${i}`} className="col-span-1" />
                    ))}
                  </div>
                </div>

                {/* Eligibility Section */}
                <div className="p-6 border-b border-[hsl(var(--color-border))]">
                  <h3 className="text-[11px] font-extrabold text-[hsl(var(--color-primary))] uppercase tracking-widest mb-4">
                    Eligibility
                  </h3>

                  <div className="grid grid-cols-4 gap-4 py-3 compare-row hover:bg-[hsl(var(--color-bg-secondary))] -mx-6 px-6 transition-colors rounded-lg">
                    <div className={labelCell}>Min. Income</div>
                    {cards.map((card) => (
                      <div key={`inc-${card.id}`} className={valueCell}>
                        {card.min_income_monthly ? (
                          `${formatRupee(card.min_income_monthly)}/mo`
                        ) : (
                          <span className="text-[hsl(var(--color-text-tertiary))]">
                            Not specified
                          </span>
                        )}
                      </div>
                    ))}
                    {emptySlots.map((_, i) => (
                      <div key={`einc-${i}`} className="col-span-1" />
                    ))}
                  </div>

                  <div className="grid grid-cols-4 gap-4 py-3 compare-row hover:bg-[hsl(var(--color-bg-secondary))] -mx-6 px-6 transition-colors rounded-lg">
                    <div className={labelCell}>Credit Score</div>
                    {cards.map((card) => (
                      <div key={`cs-${card.id}`} className={valueCell}>
                        {card.min_credit_score ? (
                          `${card.min_credit_score}+`
                        ) : (
                          <span className="text-[hsl(var(--color-text-tertiary))]">
                            Not specified
                          </span>
                        )}
                      </div>
                    ))}
                    {emptySlots.map((_, i) => (
                      <div key={`ecs-${i}`} className="col-span-1" />
                    ))}
                  </div>
                </div>

                {/* Core Benefits Section */}
                <div className="p-6 border-b border-[hsl(var(--color-border))]">
                  <h3 className="text-[11px] font-extrabold text-[hsl(var(--color-primary))] uppercase tracking-widest mb-4">
                    Core Benefits
                  </h3>

                  {[
                    {
                      label: 'Cashback Rate',
                      render: (card: CreditCard) =>
                        card.cashback_rate ? (
                          <span className="text-emerald-600 font-extrabold">
                            Up to {card.cashback_rate}%
                          </span>
                        ) : (
                          <span className="text-[hsl(var(--color-text-tertiary))]">—</span>
                        ),
                      key: 'cb',
                    },
                    {
                      label: 'Reward Rate',
                      render: (card: CreditCard) =>
                        card.reward_rate || (
                          <span className="text-[hsl(var(--color-text-tertiary))]">—</span>
                        ),
                      key: 'rr',
                    },
                    {
                      label: 'Lounge Access',
                      render: (card: CreditCard) =>
                        card.lounge_access || (
                          <span className="text-[hsl(var(--color-text-tertiary))]">No</span>
                        ),
                      key: 'la',
                    },
                    {
                      label: 'Fuel Surcharge',
                      render: (card: CreditCard) =>
                        card.fuel_surcharge || (
                          <span className="text-[hsl(var(--color-text-tertiary))]">No</span>
                        ),
                      key: 'fs',
                    },
                    {
                      label: 'Welcome Bonus',
                      render: (card: CreditCard) =>
                        card.welcome_bonus || (
                          <span className="text-[hsl(var(--color-text-tertiary))]">—</span>
                        ),
                      key: 'wb',
                    },
                  ].map((row) => (
                    <div
                      key={row.key}
                      className="grid grid-cols-4 gap-4 py-3 compare-row hover:bg-[hsl(var(--color-bg-secondary))] -mx-6 px-6 transition-colors rounded-lg"
                    >
                      <div className={labelCell}>{row.label}</div>
                      {cards.map((card) => (
                        <div key={`${row.key}-${card.id}`} className={valueCell}>
                          {row.render(card)}
                        </div>
                      ))}
                      {emptySlots.map((_, i) => (
                        <div key={`e${row.key}-${i}`} className="col-span-1" />
                      ))}
                    </div>
                  ))}
                </div>

                {/* Pros & Cons Section */}
                <div className="p-6">
                  <h3 className="text-[11px] font-extrabold text-[hsl(var(--color-primary))] uppercase tracking-widest mb-4">
                    Pros &amp; Cons
                  </h3>

                  <div className="grid grid-cols-4 gap-4 py-3 compare-row">
                    <div className="col-span-1 text-[12px] font-bold text-emerald-700 uppercase tracking-widest flex items-center">
                      What we love
                    </div>
                    {cards.map((card) => (
                      <div key={`pros-${card.id}`} className="col-span-1">
                        <ul className="space-y-2">
                          {card.pros.slice(0, 3).map((pro, i) => (
                            <li
                              key={i}
                              className="text-xs text-[hsl(var(--color-text-secondary))] flex items-start gap-1.5"
                            >
                              <CheckCircle className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0 mt-0.5" />
                              <span>{pro}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                    {emptySlots.map((_, i) => (
                      <div key={`epros-${i}`} className="col-span-1" />
                    ))}
                  </div>

                  <div className="grid grid-cols-4 gap-4 py-4 compare-row mt-2">
                    <div className="col-span-1 text-[12px] font-bold text-red-600 uppercase tracking-widest flex items-center">
                      Keep in mind
                    </div>
                    {cards.map((card) => (
                      <div key={`cons-${card.id}`} className="col-span-1">
                        <ul className="space-y-2">
                          {card.cons.slice(0, 3).map((con, i) => (
                            <li
                              key={i}
                              className="text-xs text-[hsl(var(--color-text-secondary))] flex items-start gap-1.5"
                            >
                              <XCircle className="w-3.5 h-3.5 text-red-500 flex-shrink-0 mt-0.5" />
                              <span>{con}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                    {emptySlots.map((_, i) => (
                      <div key={`econs-${i}`} className="col-span-1" />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
