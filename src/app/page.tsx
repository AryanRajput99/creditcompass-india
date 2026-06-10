import { Metadata } from 'next';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import CardCard from '@/components/cards/CardCard';
import FloatingIcons from '@/components/ui/FloatingIcons';
import { ArrowRight, Star, Zap, Percent, BadgePercent, BadgeIndianRupee, TrendingUp, Shield } from 'lucide-react';
import { CreditCard } from '@/types';
import { EARNKARO_OFFERS } from '@/data/earnkaro-offers';
import { getMonetizedSlugs } from '@/lib/monetization';
import QuickMatcher from '@/components/ui/QuickMatcher';
import HomeSEOContent from '@/components/home/HomeSEOContent';

export const metadata: Metadata = {
  title: 'CreditCompass India — Find the Best Credit Card',
  description: 'Compare 50+ top credit cards in India. Find the perfect card with our unbiased reviews and insights.',
};

export default async function Home() {
  const supabase = await createClient();

  const { data: featuredCards } = await supabase
    .from('credit_cards')
    .select('*')
    .eq('is_featured', true)
    .in('slug', getMonetizedSlugs())
    .order('sort_order', { ascending: true })
    .limit(3);

  return (
    <div className="bg-[hsl(var(--color-bg))] min-h-screen">
      <Navbar />
      
      {/* 1. HERO SECTION - Inspired by thecreditcompass.in */}
      <section className="relative pt-28 pb-16 md:pt-40 md:pb-28 overflow-hidden">
        <FloatingIcons />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
            {/* Left Info Column */}
            <div className="lg:col-span-7 text-left">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[hsl(var(--color-bg-secondary))] text-[hsl(var(--color-text-secondary))] border border-[hsl(var(--color-border))] text-[10px] font-bold tracking-widest uppercase mb-8">
                <Shield className="w-3 h-3" />
                India&apos;s Unbiased Card Guide
              </span>
              <h1 className="text-4xl sm:text-5xl md:text-[3.5rem] font-extrabold text-[hsl(var(--color-text))] leading-[1.1] mb-6 tracking-tighter">
                Your bank isn&apos;t telling <br /> you everything. <br />
                <span className="relative inline-block mt-2">
                  <span className="relative z-10 text-[hsl(165,60%,35%)]">We show you the truth.</span>
                  <span className="absolute bottom-1 left-0 w-full h-3 bg-[hsl(165,60%,85%)] rounded-full -z-0" />
                </span>
              </h1>
              <p className="text-base sm:text-lg text-[hsl(var(--color-text-secondary))] max-w-xl mb-8 leading-relaxed font-medium">
                Honest credit card comparisons, hidden charge alerts, and reward calculators — all sourced from RBI and official bank pages. Nothing to sell you.
              </p>
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <Link href="/cards" className="btn-base btn-apply w-full sm:w-auto text-center">
                  Browse All Cards <ArrowRight className="w-4 h-4 ml-1.5" />
                </Link>
                <Link href="/compare" className="btn-base btn-secondary w-full sm:w-auto text-center border">
                  Compare Cards
                </Link>
              </div>
            </div>

            {/* Right Widget Column */}
            <div className="lg:col-span-5 w-full">
              <QuickMatcher />
            </div>
          </div>

          {/* Supported Issuers / Partners Cards */}
          <div className="pt-16 border-t border-[hsl(var(--color-border))] text-center">
            <p className="text-[10px] font-bold text-[hsl(var(--color-text-secondary))] uppercase tracking-widest mb-6">Supported Cards & Issuers</p>
            <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-6">
              {['HDFC Bank', 'SBI Card', 'ICICI Bank', 'Axis Bank', 'IDFC First', 'AU Small Finance'].map((bank) => (
                <span key={bank} className="px-5 py-2.5 bg-[hsl(var(--color-bg-secondary))] border border-[hsl(var(--color-border))] rounded-xl text-xs font-extrabold text-[hsl(var(--color-text-secondary))] hover:border-[hsl(var(--color-primary))] hover:text-[hsl(var(--color-primary))] transition-all shadow-sm">
                  {bank}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 1.5 UPI TEASER SECTION */}
      <section className="bg-[hsl(var(--color-text))] py-24 overflow-hidden relative">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_50%,hsl(165,60%,40%,0.15)_0%,transparent_50%)]" />
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div>
              <span className="inline-block px-4 py-1.5 rounded-full bg-[hsl(165,60%,40%,0.2)] text-[hsl(165,60%,60%)] text-[10px] font-bold tracking-widest uppercase mb-6 border border-[hsl(165,60%,40%,0.3)]">
                Trending in India
              </span>
              <h2 className="text-4xl md:text-6xl font-black text-white leading-tight mb-8 tracking-tighter">
                Earn Rewards on <br /> <span className="text-[hsl(165,60%,55%)]">Every UPI Scan.</span>
              </h2>
              <p className="text-[hsl(215,15%,60%)] text-lg md:text-xl font-medium mb-10 max-w-xl">
                Link your RuPay Credit Card to UPI and stop missing out on rewards for your daily chai, groceries, and fuel.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/rupay-upi-cards" className="px-8 py-4 bg-white text-[hsl(var(--color-text))] rounded-2xl font-bold text-sm hover:scale-105 transition-transform text-center">
                  See Best UPI Cards
                </Link>
                <Link href="/rupay-upi-cards#calculator" className="px-8 py-4 bg-[hsl(215,30%,25%)] text-white border border-[hsl(215,20%,35%)] rounded-2xl font-bold text-sm hover:bg-[hsl(215,30%,30%)] transition-colors text-center">
                  Calculate Savings
                </Link>
              </div>
            </div>
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-[hsl(165,60%,40%)] to-[hsl(210,60%,40%)] rounded-[2rem] blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
              <div className="relative bg-[hsl(215,30%,22%)] border border-[hsl(215,20%,32%)] p-10 rounded-[2rem] shadow-2xl">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-12 rounded-2xl bg-[hsl(165,60%,40%)] flex items-center justify-center text-white shadow-lg">
                    <Zap className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-[hsl(215,15%,55%)] text-[10px] font-bold uppercase tracking-widest">Savings Potential</p>
                    <p className="text-white text-lg font-bold">Average UPI User</p>
                  </div>
                </div>
                <div className="space-y-6">
                  <div className="flex justify-between items-end">
                    <p className="text-[hsl(215,15%,55%)] text-sm font-medium">Monthly UPI Spend</p>
                    <p className="text-white text-xl font-bold">₹15,000</p>
                  </div>
                  <div className="h-2 bg-[hsl(215,20%,30%)] rounded-full overflow-hidden">
                    <div className="h-full w-2/3 bg-[hsl(165,60%,40%)] rounded-full" />
                  </div>
                  <div className="pt-6 border-t border-[hsl(215,20%,32%)] flex justify-between items-center">
                    <p className="text-[hsl(215,15%,55%)] text-sm font-medium">Annual Cashback</p>
                    <p className="text-[hsl(165,60%,55%)] text-4xl font-black tracking-tighter">₹3,600+</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. CATEGORIES SECTION */}
      <section className="relative bg-[hsl(var(--color-bg-secondary))] border-y border-[hsl(var(--color-border))] py-24 md:py-40 overflow-hidden">
        <FloatingIcons />
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="text-center mb-24">
            <h2 className="text-3xl md:text-6xl font-extrabold text-[hsl(var(--color-text))] mb-6 tracking-tighter">Explore by Category</h2>
            <p className="text-[hsl(var(--color-text-secondary))] text-xl max-w-xl mx-auto font-medium">Choose the card that fits your spending habits.</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
            <Link href="/category/cashback" className="surface-card p-10 flex flex-col items-center text-center group">
              <div className="w-16 h-16 bg-emerald-50 rounded-2xl flex items-center justify-center mb-8 text-emerald-600">
                <BadgePercent className="w-8 h-8" />
              </div>
              <h3 className="font-bold text-2xl text-[hsl(var(--color-text))] mb-3">Cashback</h3>
              <p className="text-sm text-[hsl(var(--color-text-secondary))] font-medium">Get flat returns on every spend.</p>
            </Link>

            <Link href="/category/travel" className="surface-card p-10 flex flex-col items-center text-center group">
              <div className="w-16 h-16 bg-indigo-50 rounded-2xl flex items-center justify-center mb-8 text-indigo-600">
                <Star className="w-8 h-8" />
              </div>
              <h3 className="font-bold text-2xl text-[hsl(var(--color-text))] mb-3">Travel</h3>
              <p className="text-sm text-[hsl(var(--color-text-secondary))] font-medium">Unlock airport lounge access.</p>
            </Link>

            <Link href="/category/lifetime-free" className="surface-card p-10 flex flex-col items-center text-center group">
              <div className="w-16 h-16 bg-teal-50 rounded-2xl flex items-center justify-center mb-8 text-teal-600">
                <Zap className="w-8 h-8" />
              </div>
              <h3 className="font-bold text-2xl text-[hsl(var(--color-text))] mb-3">Zero Fee</h3>
              <p className="text-sm text-[hsl(var(--color-text-secondary))] font-medium">No joining or annual fees.</p>
            </Link>

            <Link href="/category/shopping" className="surface-card p-10 flex flex-col items-center text-center group">
              <div className="w-16 h-16 bg-rose-50 rounded-2xl flex items-center justify-center mb-8 text-rose-600">
                <Percent className="w-8 h-8" />
              </div>
              <h3 className="font-bold text-2xl text-[hsl(var(--color-text))] mb-3">Shopping</h3>
              <p className="text-sm text-[hsl(var(--color-text-secondary))] font-medium">Exclusive online discounts.</p>
            </Link>
          </div>
        </div>
      </section>

      {/* 3. TOP PICKS SECTION */}
      <section className="relative bg-[hsl(var(--color-bg))] py-24 md:py-40 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
            <div className="max-w-3xl">
              <h2 className="text-3xl md:text-6xl font-extrabold text-[hsl(var(--color-text))] mb-6 tracking-tighter">Top Picks for You</h2>
              <p className="text-[hsl(var(--color-text-secondary))] text-xl leading-relaxed font-medium">Handpicked cards for maximum rewards and travel benefits.</p>
            </div>
            <Link href="/cards" className="btn-base btn-secondary group border">
              View All Cards
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {featuredCards && featuredCards.length > 0 ? (
              (featuredCards as CreditCard[]).map((card) => (
                <CardCard key={card.id} card={card} />
              ))
            ) : (
              <div className="col-span-full py-24 text-center text-[hsl(var(--color-text-tertiary))] bg-[hsl(var(--color-bg-secondary))] rounded-3xl border border-dashed border-[hsl(var(--color-border))]">
                No featured cards found.
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 4. HOT EARNING OFFERS SECTION */}
      <section className="bg-[hsl(var(--color-text))] py-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[hsl(165,60%,40%,0.2)] border border-[hsl(165,60%,40%,0.3)] text-[hsl(165,60%,60%)] text-[10px] font-bold uppercase tracking-widest mb-4">
                <TrendingUp className="w-3 h-3" /> Live EarnKaro Offers
              </div>
              <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight mb-2">Hot Earning Offers 🔥</h2>
              <p className="text-[hsl(215,15%,55%)] font-medium">Apply &amp; earn real cashback — up to ₹2,800 per approval.</p>
            </div>
            <Link href="/best-earning-offers" className="flex-shrink-0 px-6 py-3 bg-[hsl(165,60%,40%)] hover:bg-[hsl(165,60%,45%)] text-white rounded-xl font-bold text-sm transition-colors">
              See All {EARNKARO_OFFERS.length} Offers →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {EARNKARO_OFFERS.slice(0, 3).map((offer, idx) => (
              <div
                key={offer.card_slug}
                className="group bg-white/5 border border-white/10 hover:border-[hsl(165,60%,40%,0.5)] hover:bg-white/10 rounded-2xl p-6 transition-all"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] font-extrabold text-[hsl(215,15%,55%)] uppercase tracking-widest">#{idx + 1} Pick</span>
                  <BadgeIndianRupee className="w-5 h-5 text-[hsl(165,60%,55%)]" />
                </div>
                <Link href={`/cards/${offer.card_slug}`} className="block group/title">
                  <p className="font-bold text-white text-lg mb-1 leading-tight group-hover/title:text-[hsl(165,60%,55%)] transition-colors">{offer.card_name}</p>
                </Link>
                <p className="text-sm text-[hsl(215,15%,55%)] font-medium mb-4">{offer.bank_name}</p>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[10px] font-bold text-[hsl(215,15%,45%)] uppercase tracking-widest mb-0.5">You Earn</p>
                    <p className="text-2xl font-black text-[hsl(165,60%,55%)]">₹{offer.commission.toLocaleString('en-IN')}</p>
                  </div>
                  <a 
                    href={offer.earnkaro_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-[hsl(165,60%,40%)] hover:bg-[hsl(165,60%,45%)] rounded-xl text-white text-sm font-bold transition-colors shadow-lg shadow-[hsl(165,60%,40%,0.2)]"
                  >
                    Apply Now
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <HomeSEOContent />

      <Footer />
    </div>
  );
}
