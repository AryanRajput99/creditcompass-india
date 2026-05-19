import { Metadata } from 'next';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import CardCard from '@/components/cards/CardCard';
import { ArrowRight, Star, Zap, Percent, BadgePercent, BadgeIndianRupee, TrendingUp } from 'lucide-react';
import { CreditCard, Category } from '@/types';
import { EARNKARO_OFFERS } from '@/data/earnkaro-offers';
import { getMonetizedSlugs } from '@/lib/monetization';
import QuickMatcher from '@/components/ui/QuickMatcher';

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
    <div className="bg-white min-h-screen">
      <Navbar />
      
      {/* 1. HERO SECTION */}
      <section className="bg-white pt-28 pb-16 md:pt-40 md:pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
            {/* Left Info Column */}
            <div className="lg:col-span-7 text-left">
              <span className="inline-block px-4 py-1.5 rounded-full bg-blue-600 text-white text-[10px] font-bold tracking-widest uppercase mb-8">
                The New Standard
              </span>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-slate-900 leading-[1.1] mb-6 tracking-tighter">
                Find the perfect <br /> <span className="text-blue-600">Credit Card</span>.
              </h1>
              <p className="text-base sm:text-lg text-slate-600 max-w-xl mb-8 leading-relaxed font-medium">
                Stop guessing. Compare fees, cashback, and rewards across 50+ top Indian cards to maximize your benefits today.
              </p>
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <Link href="/cards" className="btn-base btn-apply px-8 py-3.5 text-sm font-bold text-center">
                  Browse All Cards <ArrowRight className="w-4 h-4 ml-1.5" />
                </Link>
                <Link href="/compare" className="btn-base btn-secondary px-8 py-3.5 text-sm font-bold border-2 text-center">
                  Compare Cards
                </Link>
              </div>
            </div>

            {/* Right Widget Column */}
            <div className="lg:col-span-5 w-full">
              <QuickMatcher />
            </div>
          </div>

          {/* Trust Logos */}
          <div className="pt-16 border-t border-gray-100 text-center">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-8">Official Partners</p>
            <div className="flex flex-wrap justify-center items-center gap-6 md:gap-12 opacity-35 grayscale font-black text-lg">
              <span>HDFC BANK</span>
              <span>SBI CARD</span>
              <span>ICICI BANK</span>
              <span>AXIS BANK</span>
            </div>
          </div>
        </div>
      </section>
      {/* 1.5 UPI TEASER SECTION */}
      <section className="bg-slate-900 py-24 overflow-hidden relative">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_50%,hsl(var(--color-primary)/0.2)_0%,transparent_50%)]" />
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div>
              <span className="inline-block px-4 py-1.5 rounded-full bg-blue-500/20 text-blue-400 text-[10px] font-bold tracking-widest uppercase mb-6 border border-blue-500/30">
                Trending in India
              </span>
              <h2 className="text-4xl md:text-6xl font-black text-white leading-tight mb-8 tracking-tighter">
                Earn Rewards on <br /> <span className="text-blue-500">Every UPI Scan.</span>
              </h2>
              <p className="text-slate-400 text-lg md:text-xl font-medium mb-10 max-w-xl">
                Link your RuPay Credit Card to UPI and stop missing out on rewards for your daily chai, groceries, and fuel.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/rupay-upi-cards" className="px-8 py-4 bg-white text-slate-900 rounded-2xl font-bold text-sm hover:scale-105 transition-transform text-center">
                  See Best UPI Cards
                </Link>
                <Link href="/rupay-upi-cards#calculator" className="px-8 py-4 bg-slate-800 text-white border border-slate-700 rounded-2xl font-bold text-sm hover:bg-slate-700 transition-colors text-center">
                  Calculate Savings
                </Link>
              </div>
            </div>
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-[2rem] blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
              <div className="relative bg-slate-800 border border-slate-700 p-10 rounded-[2rem] shadow-2xl">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-12 rounded-2xl bg-blue-600 flex items-center justify-center text-white shadow-lg">
                    <Zap className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">Savings Potential</p>
                    <p className="text-white text-lg font-bold">Average UPI User</p>
                  </div>
                </div>
                <div className="space-y-6">
                  <div className="flex justify-between items-end">
                    <p className="text-slate-400 text-sm font-medium">Monthly UPI Spend</p>
                    <p className="text-white text-xl font-bold">₹15,000</p>
                  </div>
                  <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                    <div className="h-full w-2/3 bg-blue-500 rounded-full" />
                  </div>
                  <div className="pt-6 border-t border-slate-700 flex justify-between items-center">
                    <p className="text-slate-400 text-sm font-medium">Annual Cashback</p>
                    <p className="text-blue-400 text-4xl font-black tracking-tighter">₹3,600+</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. CATEGORIES SECTION */}
      <section className="bg-slate-50 border-y border-gray-100 py-24 md:py-40">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-24">
            <h2 className="text-3xl md:text-6xl font-extrabold text-slate-900 mb-6 tracking-tighter">Explore by Category</h2>
            <p className="text-slate-600 text-xl max-w-xl mx-auto font-medium">Choose the card that fits your spending habits.</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
            <Link href="/category/cashback" className="surface-card p-10 flex flex-col items-center text-center group bg-white shadow-sm hover:shadow-2xl transition-all">
              <div className="w-16 h-16 bg-emerald-50 rounded-2xl flex items-center justify-center mb-8 text-emerald-600">
                <BadgePercent className="w-8 h-8" />
              </div>
              <h3 className="font-bold text-2xl text-slate-900 mb-3">Cashback</h3>
              <p className="text-sm text-slate-500 font-medium">Get flat returns on every spend.</p>
            </Link>

            <Link href="/category/travel" className="surface-card p-10 flex flex-col items-center text-center group bg-white shadow-sm hover:shadow-2xl transition-all">
              <div className="w-16 h-16 bg-indigo-50 rounded-2xl flex items-center justify-center mb-8 text-indigo-600">
                <Star className="w-8 h-8" />
              </div>
              <h3 className="font-bold text-2xl text-slate-900 mb-3">Travel</h3>
              <p className="text-sm text-slate-500 font-medium">Unlock airport lounge access.</p>
            </Link>

            <Link href="/category/lifetime-free" className="surface-card p-10 flex flex-col items-center text-center group bg-white shadow-sm hover:shadow-2xl transition-all">
              <div className="w-16 h-16 bg-teal-50 rounded-2xl flex items-center justify-center mb-8 text-teal-600">
                <Zap className="w-8 h-8" />
              </div>
              <h3 className="font-bold text-2xl text-slate-900 mb-3">Zero Fee</h3>
              <p className="text-sm text-slate-500 font-medium">No joining or annual fees.</p>
            </Link>

            <Link href="/category/shopping" className="surface-card p-10 flex flex-col items-center text-center group bg-white shadow-sm hover:shadow-2xl transition-all">
              <div className="w-16 h-16 bg-rose-50 rounded-2xl flex items-center justify-center mb-8 text-rose-600">
                <Percent className="w-8 h-8" />
              </div>
              <h3 className="font-bold text-2xl text-slate-900 mb-3">Shopping</h3>
              <p className="text-sm text-slate-500 font-medium">Exclusive online discounts.</p>
            </Link>
          </div>
        </div>
      </section>

      {/* 3. TOP PICKS SECTION */}
      <section className="bg-white py-24 md:py-40">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
            <div className="max-w-3xl">
              <h2 className="text-3xl md:text-6xl font-extrabold text-slate-900 mb-6 tracking-tighter">Top Picks for You</h2>
              <p className="text-slate-600 text-xl leading-relaxed font-medium">Handpicked cards for maximum rewards and travel benefits.</p>
            </div>
            <Link href="/cards" className="btn-base btn-secondary px-10 py-4 text-base font-bold group border-2">
              View All Cards
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {featuredCards && featuredCards.length > 0 ? (
              (featuredCards as CreditCard[]).map((card) => (
                <CardCard key={card.id} card={card} />
              ))
            ) : (
              <div className="col-span-full py-24 text-center text-gray-400 bg-slate-50 rounded-3xl border border-dashed border-gray-200">
                No featured cards found.
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 4. HOT EARNING OFFERS SECTION */}
      <section className="bg-gradient-to-br from-slate-900 to-emerald-950 py-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 text-[10px] font-bold uppercase tracking-widest mb-4">
                <TrendingUp className="w-3 h-3" /> Live EarnKaro Offers
              </div>
              <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight mb-2">Hot Earning Offers 🔥</h2>
              <p className="text-slate-400 font-medium">Apply &amp; earn real cashback — up to ₹2,800 per approval.</p>
            </div>
            <Link href="/best-earning-offers" className="flex-shrink-0 px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold text-sm transition-colors">
              See All {EARNKARO_OFFERS.length} Offers →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {EARNKARO_OFFERS.slice(0, 3).map((offer, idx) => (
              <div
                key={offer.card_slug}
                className="group bg-white/5 border border-white/10 hover:border-emerald-500/50 hover:bg-white/10 rounded-2xl p-6 transition-all"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest">#{idx + 1} Pick</span>
                  <BadgeIndianRupee className="w-5 h-5 text-emerald-400" />
                </div>
                <Link href={`/cards/${offer.card_slug}`} className="block group/title">
                  <p className="font-bold text-white text-lg mb-1 leading-tight group-hover/title:text-blue-400 transition-colors">{offer.card_name}</p>
                </Link>
                <p className="text-sm text-slate-400 font-medium mb-4">{offer.bank_name}</p>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-0.5">You Earn</p>
                    <p className="text-2xl font-black text-emerald-400">₹{offer.commission.toLocaleString('en-IN')}</p>
                  </div>
                  <a 
                    href={offer.earnkaro_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 rounded-xl text-white text-sm font-bold transition-colors shadow-lg shadow-emerald-600/20"
                  >
                    Apply Now
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
