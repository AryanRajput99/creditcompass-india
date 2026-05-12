import { Metadata } from 'next';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import CardCard from '@/components/cards/CardCard';
import { ArrowRight, Star, Zap, Percent, BadgePercent } from 'lucide-react';
import { CreditCard, Category } from '@/types';

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
    .order('sort_order', { ascending: true })
    .limit(3);

  return (
    <div className="bg-white min-h-screen">
      <Navbar />
      
      {/* 1. HERO SECTION */}
      <section className="bg-white pt-24 pb-16 md:pt-48 md:pb-32">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <span className="inline-block px-4 py-1.5 rounded-full bg-blue-600 text-white text-[10px] font-bold tracking-widest uppercase mb-10">
            The New Standard
          </span>
          <h1 className="text-4xl md:text-7xl font-extrabold text-slate-900 leading-tight mb-8 tracking-tighter">
            Find the perfect <br className="hidden md:block" /> <span className="text-blue-600">Credit Card</span>.
          </h1>
          <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto mb-12 leading-relaxed">
            Stop guessing. Compare fees, cashback, and rewards across 50+ top Indian cards to maximize your benefits today.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-24">
            <Link href="/cards" className="btn-base btn-apply px-10 py-4 text-base">
              Browse All Cards <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
            <Link href="/compare" className="btn-base btn-secondary px-10 py-4 text-base border-2">
              Compare Cards
            </Link>
          </div>

          {/* Trust Logos */}
          <div className="pt-20 border-t border-gray-100">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-10">Official Partners</p>
            <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-30 grayscale font-black text-xl">
              <span>HDFC BANK</span>
              <span>SBI CARD</span>
              <span>ICICI BANK</span>
              <span>AXIS BANK</span>
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

      <Footer />
    </div>
  );
}
