import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import UPICalculator from '@/components/tools/UPICalculator';
import { createClient } from '@/lib/supabase/server';
import { CreditCard } from '@/types';
import CardCard from '@/components/cards/CardCard';
import Link from 'next/link';
import { Metadata } from 'next';
import { getMonetizedSlugs } from '@/lib/monetization';

export const metadata: Metadata = {
  title: 'Best RuPay Credit Cards for UPI in India (2025) — Compare & Save',
  description: 'Earn rewards on every UPI scan! Compare the best RuPay credit cards from HDFC, ICICI, Axis, and SBI. Calculate your yearly UPI savings and apply online.',
  keywords: ['best rupay credit card for upi', 'upi on credit card india', 'tata neu hdfc credit card', 'icici coral rupay', 'axis indian oil rupay'],
};

export default async function RupayUPIPage() {
  const supabase = await createClient();
  
  // Fetch RuPay cards (filtering by name/best_for since we don't have a flag yet)
  const { data: rupayCards } = await supabase
    .from('credit_cards')
    .select('*')
    .or('name.ilike.%rupay%,best_for.ilike.%upi%')
    .eq('is_active', true)
    .in('slug', getMonetizedSlugs())
    .order('is_featured', { ascending: false });

  const topUPICards = (rupayCards as CreditCard[])?.slice(0, 5) || [];

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[hsl(var(--color-bg))] pt-20">
        {/* Hero Section */}
        <section className="relative py-20 overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,hsl(var(--color-primary)/0.05)_0%,transparent_70%)]" />
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[hsl(var(--color-primary)/0.1)] text-[hsl(var(--color-primary))] text-xs font-bold uppercase tracking-widest mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[hsl(var(--color-primary))] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[hsl(var(--color-primary))]"></span>
              </span>
              Hot Topic: UPI on Credit Card
            </div>
            
            <h1 className="text-5xl md:text-7xl font-black text-[hsl(var(--color-text))] tracking-tight mb-6 max-w-4xl mx-auto leading-[0.9]">
              Turn Every <span className="text-[hsl(var(--color-primary))]">UPI Scan</span> Into Rewards.
            </h1>
            
            <p className="text-lg md:text-xl text-[hsl(var(--color-text-secondary))] max-w-2xl mx-auto font-medium mb-10">
              No more "empty" payments. Link your RuPay credit card to UPI and earn cashback on chai, groceries, and shopping.
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <a href="#calculator" className="px-8 py-4 bg-[hsl(var(--color-text))] text-[hsl(var(--color-bg))] rounded-2xl font-bold text-sm hover:scale-[1.05] transition-transform">
                Calculate Savings
              </a>
              <a href="#best-cards" className="px-8 py-4 bg-[hsl(var(--color-bg-secondary))] text-[hsl(var(--color-text))] border border-[hsl(var(--color-border))] rounded-2xl font-bold text-sm hover:bg-[hsl(var(--color-border))] transition-colors">
                View Best Cards
              </a>
            </div>
          </div>
        </section>

        {/* Calculator Section */}
        <section id="calculator" className="py-20 bg-[hsl(var(--color-bg-secondary))/0.5]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-extrabold text-[hsl(var(--color-text))] tracking-tight mb-4">How much can you save?</h2>
              <p className="text-[hsl(var(--color-text-secondary))] font-medium max-w-xl mx-auto">
                Most Indians spend ₹10,000 - ₹30,000 monthly on UPI. See how much you're leaving on the table.
              </p>
            </div>
            
            <div className="max-w-4xl mx-auto">
              <UPICalculator topUPICards={topUPICards} />
            </div>
          </div>
        </section>

        {/* Best Cards Grid */}
        <section id="best-cards" className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
              <div>
                <h2 className="text-3xl font-extrabold text-[hsl(var(--color-text))] tracking-tight mb-2">Top RuPay UPI Cards 2025</h2>
                <p className="text-[hsl(var(--color-text-secondary))] font-medium">Handpicked cards for maximum UPI rewards.</p>
              </div>
              <Link href="/cards?category=rewards" className="text-[hsl(var(--color-primary))] font-bold text-sm hover:underline">
                View all reward cards &rarr;
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {(rupayCards as CreditCard[])?.map((card) => (
                <CardCard key={card.id} card={card} />
              ))}
            </div>
          </div>
        </section>

        {/* FAQ / Guide Section */}
        <section className="py-20 border-t border-[hsl(var(--color-border))]">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-extrabold text-[hsl(var(--color-text))] tracking-tight mb-10 text-center">Everything you need to know</h2>
            
            <div className="space-y-10">
              <div className="group">
                <h3 className="text-xl font-bold text-[hsl(var(--color-text))] mb-3 flex items-center gap-3">
                  <span className="w-8 h-8 rounded-full bg-[hsl(var(--color-primary)/0.1)] text-[hsl(var(--color-primary))] flex items-center justify-center text-sm font-black">1</span>
                  Can I link any credit card to UPI?
                </h3>
                <p className="text-[hsl(var(--color-text-secondary))] leading-relaxed font-medium pl-11">
                  No. Currently, only **RuPay** network credit cards can be linked to UPI apps like GPay, PhonePe, and Paytm. Visa and Mastercard cards cannot be used for merchant UPI scans yet.
                </p>
              </div>

              <div className="group">
                <h3 className="text-xl font-bold text-[hsl(var(--color-text))] mb-3 flex items-center gap-3">
                  <span className="w-8 h-8 rounded-full bg-[hsl(var(--color-primary)/0.1)] text-[hsl(var(--color-primary))] flex items-center justify-center text-sm font-black">2</span>
                  Are there any charges for UPI CC scans?
                </h3>
                <p className="text-[hsl(var(--color-text-secondary))] leading-relaxed font-medium pl-11">
                  For users (you), there are **zero charges**. You pay the same amount as a normal UPI scan. The merchant might pay a fee, but that doesn't affect your balance.
                </p>
              </div>

              <div className="group">
                <h3 className="text-xl font-bold text-[hsl(var(--color-text))] mb-3 flex items-center gap-3">
                  <span className="w-8 h-8 rounded-full bg-[hsl(var(--color-primary)/0.1)] text-[hsl(var(--color-primary))] flex items-center justify-center text-sm font-black">3</span>
                  Which is the best card for UPI?
                </h3>
                <p className="text-[hsl(var(--color-text-secondary))] leading-relaxed font-medium pl-11">
                  The **Tata Neu Infinity HDFC** and **SBI Aurum** are top-tier, but for most people, the **HDFC Tata Neu Plus** or **ICICI Coral RuPay** are best as they are often offered Lifetime Free.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
