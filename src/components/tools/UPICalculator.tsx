'use client';

import React, { useState } from 'react';
import { CreditCard } from '@/types';
import Link from 'next/link';
import Image from 'next/image';

interface UPICalculatorProps {
  topUPICards: CreditCard[];
}

export default function UPICalculator({ topUPICards }: UPICalculatorProps) {
  const [spend, setSpend] = useState<number>(10000);
  const [selectedCardId, setSelectedCardId] = useState<string>(topUPICards[0]?.id || '');
  const selectedCard = topUPICards.find((c) => c.id === selectedCardId);

  // Estimate reward rate for UPI (usually 1-2% for top cards)
  let rewardRate = 1;
  if (selectedCard) {
    rewardRate = parseFloat(String(selectedCard.cashback_rate || 'NaN'));
    if (isNaN(rewardRate)) {
      const match = String(selectedCard.reward_rate || '').match(/(\d+(\.\d+)?)/);
      rewardRate = match ? parseFloat(match[1]) : 1;
    }
    if (isNaN(rewardRate) || rewardRate <= 0) rewardRate = 1;
    if (rewardRate > 5) rewardRate = 1.5; // Cap unrealistic text parses
  }

  const monthlySavings = (spend * rewardRate) / 100;
  const yearlySavings = monthlySavings * 12;

  return (
    <div className="bg-[hsl(var(--color-bg))] rounded-3xl border border-[hsl(var(--color-border))] p-8 shadow-2xl overflow-hidden relative group">
      {/* Background Glow */}
      <div className="absolute -top-24 -right-24 w-64 h-64 bg-[hsl(var(--color-primary))] opacity-5 blur-[80px] rounded-full group-hover:opacity-10 transition-opacity" />
      
      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-12 h-12 rounded-2xl bg-[hsl(var(--color-primary))] flex items-center justify-center text-white shadow-lg shadow-[hsl(var(--color-primary)/0.3)]">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20"/><path d="m17 5-5-3-5 3"/><path d="m17 19-5 3-5-3"/><path d="M2 12h20"/><path d="m5 7 3 5-3 5"/><path d="m19 7-3 5 3 5"/></svg>
          </div>
          <div>
            <h3 className="text-xl font-bold text-[hsl(var(--color-text))]">UPI Rewards Calculator</h3>
            <p className="text-[hsl(var(--color-text-secondary))] text-xs font-medium uppercase tracking-widest">Calculate your annual savings</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Controls */}
          <div className="space-y-8">
            <div>
              <label className="flex justify-between text-sm font-bold text-[hsl(var(--color-text))] mb-4 uppercase tracking-tight">
                Monthly UPI Spends
                <span className="text-[hsl(var(--color-primary))] text-lg">₹{spend.toLocaleString('en-IN')}</span>
              </label>
              <input
                type="range"
                min="1000"
                max="100000"
                step="1000"
                value={spend}
                onChange={(e) => setSpend(parseInt(e.target.value))}
                className="w-full h-2 bg-[hsl(var(--color-border))] rounded-lg appearance-none cursor-pointer accent-[hsl(var(--color-primary))]"
              />
              <div className="flex justify-between text-[10px] font-bold text-[hsl(var(--color-text-secondary))] mt-2 uppercase">
                <span>₹1K</span>
                <span>₹50K</span>
                <span>₹100K</span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-[hsl(var(--color-text))] mb-4 uppercase tracking-tight">Select RuPay Card</label>
              <div className="grid grid-cols-1 gap-3">
                {topUPICards.map((card) => (
                  <button
                    key={card.id}
                    onClick={() => setSelectedCardId(card.id)}
                    className={`flex items-center gap-4 p-4 rounded-2xl border-2 transition-all text-left ${
                      selectedCardId === card.id
                        ? 'border-[hsl(var(--color-primary))] bg-[hsl(var(--color-primary)/0.03)] shadow-md'
                        : 'border-[hsl(var(--color-border))] hover:border-[hsl(var(--color-text-secondary)/0.3)] bg-transparent'
                    }`}
                  >
                    <div className="w-12 h-8 bg-[hsl(var(--color-bg-secondary))] rounded-md overflow-hidden flex-shrink-0 flex items-center justify-center">
                      {card.card_image_url ? (
                        <Image src={card.card_image_url} alt={card.name} width={48} height={32} className="w-full h-full object-contain" />
                      ) : (
                        <span className="text-[8px] font-bold opacity-30">IMAGE</span>
                      )}
                    </div>
                    <div>
                      <p className={`text-xs font-bold ${selectedCardId === card.id ? 'text-[hsl(var(--color-primary))]' : 'text-[hsl(var(--color-text))]'}`}>
                        {card.name}
                      </p>
                      <p className="text-[10px] font-medium text-[hsl(var(--color-text-secondary))]">{card.bank_name}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="bg-[hsl(var(--color-bg-secondary))] rounded-3xl p-8 flex flex-col justify-between border border-[hsl(var(--color-border))]">
            <div>
              <p className="text-[10px] font-extrabold text-[hsl(var(--color-text-secondary))] uppercase tracking-[0.2em] mb-6">Estimated Earnings</p>
              
              <div className="space-y-6">
                <div>
                  <p className="text-sm font-medium text-[hsl(var(--color-text-secondary))] mb-1">Monthly Rewards</p>
                  <p className="text-3xl font-black text-[hsl(var(--color-text))] tracking-tighter">
                    ₹{monthlySavings.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
                  </p>
                </div>
                
                <div className="pt-6 border-t border-[hsl(var(--color-border))]">
                  <p className="text-sm font-medium text-[hsl(var(--color-text-secondary))] mb-1">Yearly Savings</p>
                  <p className="text-5xl font-black text-[hsl(var(--color-primary))] tracking-tighter">
                    ₹{yearlySavings.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 space-y-4">
              <p className="text-[10px] leading-relaxed text-[hsl(var(--color-text-secondary))] font-medium">
                *Estimated based on {rewardRate}% reward rate on UPI spends. Actual rewards may vary based on merchant category.
              </p>
              
              <Link
                href={`/cards/${selectedCard?.slug}`}
                className="block w-full py-4 bg-[hsl(var(--color-text))] text-[hsl(var(--color-bg))] text-center rounded-2xl font-bold text-sm hover:scale-[1.02] transition-transform active:scale-[0.98] shadow-xl shadow-[hsl(var(--color-text)/0.1)]"
              >
                Apply for {selectedCard?.name}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
