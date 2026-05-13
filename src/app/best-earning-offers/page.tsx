import { Metadata } from 'next';
import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { createClient } from '@/lib/supabase/server';
import { CreditCard } from '@/types';
import { EARNKARO_OFFERS } from '@/data/earnkaro-offers';
import { BadgeIndianRupee, ExternalLink, TrendingUp, Zap, ShieldCheck } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Best Credit Card Offers in India (May 2025) — Highest Cashback & Commission',
  description:
    'Apply for India\'s highest-paying credit card offers. Get up to ₹2,800 cashback per approved application via EarnKaro. Updated daily with live commission rates.',
  keywords: [
    'best credit card offers india 2025',
    'earnkaro credit card cashback',
    'highest paying credit card affiliate',
    'credit card cashback on apply',
  ],
};

export default async function BestEarningOffersPage() {
  const supabase = await createClient();

  // Fetch all cards that have EarnKaro offers
  const slugsWithOffers = EARNKARO_OFFERS.map((o) => o.card_slug);
  const { data: allCards } = await supabase
    .from('credit_cards')
    .select('*')
    .in('slug', slugsWithOffers)
    .eq('is_active', true);

  // Merge DB cards with EarnKaro offer data, sort by commission desc
  const cardsWithOffers = EARNKARO_OFFERS.map((offer) => {
    const dbCard = (allCards as CreditCard[])?.find((c) => c.slug === offer.card_slug);
    return { offer, card: dbCard };
  }).filter((item) => item.card !== undefined);

  const totalPotential = EARNKARO_OFFERS.reduce((sum, o) => sum + o.commission, 0);

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[hsl(var(--color-bg))] pt-20">
        
        {/* Hero */}
        <section className="relative py-20 bg-gradient-to-br from-slate-900 via-emerald-950 to-slate-900 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(16,185,129,0.15)_0%,transparent_60%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(16,185,129,0.08)_0%,transparent_50%)]" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center max-w-3xl mx-auto">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 text-[11px] font-bold uppercase tracking-widest mb-8">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
                </span>
                Live EarnKaro Offers • Updated May 2025
              </div>

              <h1 className="text-5xl md:text-7xl font-black text-white tracking-tight leading-[0.9] mb-6">
                India's Highest<br />
                <span className="text-emerald-400">Paying Offers.</span>
              </h1>
              <p className="text-slate-300 text-lg md:text-xl font-medium mb-10 max-w-2xl mx-auto">
                Apply for these credit cards via our EarnKaro links and earn real cashback — up to <span className="text-emerald-400 font-bold">₹2,800 per approval</span>.
              </p>

              {/* Stats Bar */}
              <div className="grid grid-cols-3 gap-6 max-w-lg mx-auto">
                {[
                  { label: 'Live Offers', value: `${cardsWithOffers.length}+` },
                  { label: 'Max Payout', value: '₹2,800' },
                  { label: 'Total Available', value: `₹${(totalPotential / 1000).toFixed(0)}K+` },
                ].map((stat) => (
                  <div key={stat.label} className="bg-white/5 border border-white/10 rounded-2xl p-4 text-center">
                    <p className="text-2xl font-black text-white">{stat.value}</p>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-16 border-b border-[hsl(var(--color-border))] bg-[hsl(var(--color-bg-secondary))]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-center text-lg font-extrabold text-[hsl(var(--color-text))] mb-10 uppercase tracking-widest">How it works</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { step: '01', icon: <ExternalLink className="w-5 h-5" />, title: 'Click Apply Now', desc: 'Our link tracks your session via EarnKaro automatically.' },
                { step: '02', icon: <ShieldCheck className="w-5 h-5" />, title: 'Get Card Approved', desc: 'Complete the bank\'s application and get your card approved.' },
                { step: '03', icon: <BadgeIndianRupee className="w-5 h-5" />, title: 'Earn Cashback', desc: 'EarnKaro credits your commission — usually within 30–60 days.' },
              ].map((item) => (
                <div key={item.step} className="flex gap-4 items-start">
                  <div className="w-10 h-10 rounded-2xl bg-emerald-600 flex items-center justify-center text-white flex-shrink-0 shadow-lg shadow-emerald-600/20">
                    {item.icon}
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-[hsl(var(--color-text-secondary))] uppercase tracking-widest mb-1">Step {item.step}</p>
                    <p className="font-bold text-[hsl(var(--color-text))] mb-1">{item.title}</p>
                    <p className="text-sm text-[hsl(var(--color-text-secondary))] font-medium leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Offers Table */}
        <section className="py-20">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-10">
              <h2 className="text-2xl font-extrabold text-[hsl(var(--color-text))] tracking-tight flex items-center gap-3">
                <TrendingUp className="w-6 h-6 text-emerald-600" />
                All Live Offers
              </h2>
              <p className="text-sm font-medium text-[hsl(var(--color-text-secondary))]">Sorted by commission ↓</p>
            </div>

            <div className="space-y-4">
              {cardsWithOffers.map(({ offer, card }, idx) => (
                <div
                  key={offer.card_slug}
                  className={`group bg-[hsl(var(--color-bg))] border rounded-2xl p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center gap-4 hover:border-emerald-500/40 hover:shadow-lg hover:shadow-emerald-500/5 transition-all ${
                    idx === 0 ? 'border-emerald-500/40 shadow-lg shadow-emerald-500/5 ring-1 ring-emerald-500/20' : 'border-[hsl(var(--color-border))]'
                  }`}
                >
                  {/* Rank */}
                  <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-[hsl(var(--color-bg-secondary))] border border-[hsl(var(--color-border))] flex items-center justify-center">
                    <span className={`text-sm font-black ${idx === 0 ? 'text-emerald-600' : 'text-[hsl(var(--color-text-secondary))]'}`}>
                      #{idx + 1}
                    </span>
                  </div>

                  {/* Card info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <Link href={`/cards/${offer.card_slug}`} className="hover:text-[hsl(var(--color-primary))] transition-colors">
                        <p className="font-bold text-[hsl(var(--color-text))]">{offer.card_name}</p>
                      </Link>
                      {idx === 0 && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-amber-100 text-amber-700 text-[9px] font-extrabold uppercase tracking-widest rounded-full">
                          <Zap className="w-2.5 h-2.5" /> Top Pick
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-[hsl(var(--color-text-secondary))] font-medium mt-0.5">{offer.bank_name}</p>
                  </div>

                  {/* Commission */}
                  <div className="flex-shrink-0 text-center sm:text-right">
                    <p className="text-[10px] font-bold text-[hsl(var(--color-text-secondary))] uppercase tracking-widest mb-1">You earn</p>
                    <p className="text-2xl font-black text-emerald-600">₹{offer.commission.toLocaleString('en-IN')}</p>
                  </div>

                  {/* CTA */}
                  <div className="flex-shrink-0">
                    <a
                      href={offer.earnkaro_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold text-sm transition-all hover:scale-[1.03] shadow-md shadow-emerald-600/20"
                    >
                      Apply Now
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              ))}
            </div>

            {/* Disclaimer */}
            <div className="mt-12 p-5 bg-[hsl(var(--color-bg-secondary))] border border-[hsl(var(--color-border))] rounded-2xl">
              <p className="text-xs text-[hsl(var(--color-text-secondary))] font-medium leading-relaxed">
                <span className="font-bold text-[hsl(var(--color-text))]">Affiliate Disclosure:</span>{' '}
                CreditCompass India earns a commission from EarnKaro when you apply and get approved via our links. Commissions shown are approximate and may vary based on offer terms. This does not affect our card ratings or recommendations.{' '}
                <Link href="/affiliate-disclosure" className="text-[hsl(var(--color-primary))] hover:underline font-bold">
                  Full Disclosure →
                </Link>
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
