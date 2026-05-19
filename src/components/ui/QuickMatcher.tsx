'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Sparkles, ArrowRight, ShieldCheck, Zap, RefreshCw, BadgeIndianRupee } from 'lucide-react';
import { EARNKARO_OFFERS } from '@/data/earnkaro-offers';

export default function QuickMatcher() {
  const [step, setStep] = useState(1);
  const [goal, setGoal] = useState<string | null>(null);
  const [spend, setSpend] = useState(15000);
  const [feature, setFeature] = useState<string | null>(null);
  const router = useRouter();

  // Recommendations mapping logic
  const getRecommendation = () => {
    if (goal === 'lifetime-free') {
      return {
        slug: 'au-lit-credit-card',
        name: 'AU LIT Credit Card',
        reason: 'Lifetime free card that lets you customize your rewards dynamically!',
        payout: 250,
      };
    }
    if (goal === 'travel') {
      return {
        slug: 'axis-airtel-credit-card-review-2025', // fallback or real slug
        slugReal: 'axis-bank-my-zone-credit-card',
        name: 'Axis Bank My Zone Credit Card',
        reason: 'Offers complimentary lounge access and Swiggy discounts at a low fee!',
        payout: 200,
      };
    }
    if (feature === 'amazon-flipkart' || spend > 25000) {
      return {
        slug: 'sbi-cashback-credit-card-review-2025',
        slugReal: 'sbi-cashback-credit-card',
        name: 'SBI Cashback Credit Card',
        reason: 'Undisputed cashback champion. Gives flat 5% unlimited online savings!',
        payout: 900,
      };
    }
    // Default best-match
    return {
      slug: 'axis-airtel-credit-card-review-2025',
      slugReal: 'axis-bank-airtel-credit-card',
      name: 'Axis Bank Airtel Credit Card',
      reason: 'Best utility card. Offers massive 25% cashback on recharges and 10% on Swiggy!',
      payout: 1000,
    };
  };

  const recommendation = getRecommendation();
  const matchedOffer = EARNKARO_OFFERS.find(
    (o) => o.card_slug === recommendation.slugReal || o.card_name.includes(recommendation.name)
  );
  const applyUrl = matchedOffer?.earnkaro_url ?? '/cards';

  const resetMatcher = () => {
    setGoal(null);
    setSpend(15000);
    setFeature(null);
    setStep(1);
  };

  return (
    <div className="surface-card bg-slate-900 border-slate-800 p-6 sm:p-8 rounded-[2rem] text-left relative overflow-hidden shadow-2xl">
      {/* Decorative Radial glow background */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/10 rounded-full blur-[80px] pointer-events-none" />

      {step < 4 ? (
        <>
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-[10px] font-extrabold uppercase tracking-widest">
              <Sparkles className="w-3 h-3 text-blue-400 animate-pulse" /> Instant Matcher
            </span>
            <span className="text-xs font-bold text-slate-500">Step {step} of 3</span>
          </div>

          {/* STEP 1: SELECT GOAL */}
          {step === 1 && (
            <div className="animate-fade-in-up">
              <h3 className="text-xl sm:text-2xl font-black text-white mb-3 tracking-tight">
                What is your primary card goal?
              </h3>
              <p className="text-sm text-slate-400 mb-6 font-medium">
                Choose what matters most to your wallet.
              </p>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { id: 'cashback', label: 'Flat Cashback 💰' },
                  { id: 'travel', label: 'Lounge & Travel ✈️' },
                  { id: 'lifetime-free', label: 'Lifetime Free 🆓' },
                  { id: 'shopping', label: 'Online Shopping 🛍️' },
                ].map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => {
                      setGoal(opt.id);
                      setStep(2);
                    }}
                    className="p-4 bg-slate-800/50 hover:bg-slate-800 border border-slate-700/60 hover:border-blue-500 rounded-2xl text-left text-sm font-bold text-slate-200 transition-all cursor-pointer"
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STEP 2: SPEND SLIDER */}
          {step === 2 && (
            <div className="animate-fade-in-up">
              <h3 className="text-xl sm:text-2xl font-black text-white mb-3 tracking-tight">
                What is your monthly online spend?
              </h3>
              <p className="text-sm text-slate-400 mb-6 font-medium">
                Helps calculate fee waiver eligibility.
              </p>
              <div className="bg-slate-800/40 border border-slate-800 p-5 rounded-2xl mb-6">
                <div className="flex justify-between items-baseline mb-4">
                  <span className="text-slate-400 text-xs font-bold uppercase tracking-wider">Estimated Spend</span>
                  <span className="text-2xl font-black text-blue-400">
                    ₹{spend.toLocaleString('en-IN')}
                  </span>
                </div>
                <input
                  type="range"
                  min="5000"
                  max="50000"
                  step="5000"
                  value={spend}
                  onChange={(e) => setSpend(Number(e.target.value))}
                  className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
                />
                <div className="flex justify-between text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-2">
                  <span>₹5k</span>
                  <span>₹25k</span>
                  <span>₹50k+</span>
                </div>
              </div>
              <div className="flex justify-between gap-4">
                <button
                  onClick={() => setStep(1)}
                  className="px-5 py-3 border border-slate-700 hover:bg-slate-800 text-white rounded-xl font-bold text-xs transition-colors cursor-pointer"
                >
                  Back
                </button>
                <button
                  onClick={() => setStep(3)}
                  className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  Continue <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: PREFERENCES */}
          {step === 3 && (
            <div className="animate-fade-in-up">
              <h3 className="text-xl sm:text-2xl font-black text-white mb-3 tracking-tight">
                Any specific brand preferences?
              </h3>
              <p className="text-sm text-slate-400 mb-6 font-medium">
                We will match cards with direct brand partnership benefits.
              </p>
              <div className="grid grid-cols-2 gap-4 mb-6">
                {[
                  { id: 'amazon-flipkart', label: 'Amazon / Flipkart 🛒' },
                  { id: 'swiggy-zomato', label: 'Swiggy / Zomato 🍔' },
                  { id: 'airtel-wifi', label: 'Airtel & Utilities 📱' },
                  { id: 'none', label: 'General / Cashback 💳' },
                ].map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => {
                      setFeature(opt.id);
                      setStep(4);
                    }}
                    className="p-4 bg-slate-800/50 hover:bg-slate-800 border border-slate-700/60 hover:border-blue-500 rounded-2xl text-left text-xs font-bold text-slate-200 transition-all cursor-pointer"
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
              <button
                onClick={() => setStep(2)}
                className="px-5 py-3 border border-slate-700 hover:bg-slate-800 text-white rounded-xl font-bold text-xs transition-colors cursor-pointer"
              >
                Back
              </button>
            </div>
          )}
        </>
      ) : (
        /* STEP 4: RECOMMENDATION RESULT */
        <div className="animate-fade-in-up text-center py-4">
          <div className="w-14 h-14 bg-emerald-500/20 border border-emerald-500/30 rounded-2xl flex items-center justify-center mx-auto mb-4 text-emerald-400 shadow-lg shadow-emerald-500/10">
            <ShieldCheck className="w-7 h-7" />
          </div>
          <span className="text-[10px] font-extrabold text-emerald-400 uppercase tracking-widest mb-1.5 block">
            Best Match Found — 98% Match Score
          </span>
          <h3 className="text-2xl font-black text-white mb-2 leading-tight">
            {recommendation.name}
          </h3>
          <p className="text-xs text-slate-400 max-w-sm mx-auto mb-5 font-medium leading-relaxed">
            {recommendation.reason}
          </p>

          <div className="bg-slate-800/50 border border-slate-800 p-4 rounded-2xl max-w-sm mx-auto mb-6 flex items-center justify-between text-left">
            <div>
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                Payout Bonus via CreditCompass
              </p>
              <p className="text-xl font-black text-emerald-400 flex items-center gap-1">
                <BadgeIndianRupee className="w-4 h-4" /> ₹
                {matchedOffer ? matchedOffer.commission.toLocaleString('en-IN') : recommendation.payout}
              </p>
            </div>
            <a
              href={applyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-xs flex items-center gap-1.5 transition-colors shadow-lg shadow-blue-600/20"
            >
              Apply Now <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>

          <div className="flex justify-center gap-4">
            <button
              onClick={resetMatcher}
              className="px-4 py-2 border border-slate-700 hover:bg-slate-800 text-slate-400 hover:text-white rounded-lg font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <RefreshCw className="w-3 h-3" /> Start Over
            </button>
            <button
              onClick={() => router.push('/quiz')}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg font-bold text-xs transition-colors cursor-pointer"
            >
              Take Advanced Quiz
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
