'use client';

import { useState } from 'react';
import Link from 'next/link';
import { EARNKARO_OFFERS } from '@/data/earnkaro-offers';
import { cn } from '@/lib/utils';
import { ChevronRight, CheckCircle, BadgeIndianRupee, ExternalLink, RotateCcw } from 'lucide-react';

// ─── Quiz Data ───────────────────────────────────────────────
const STEPS = [
  {
    id: 'goal',
    question: 'What do you mainly want from a credit card?',
    hindiQuestion: 'Credit card se aapko kya chahiye?',
    options: [
      { value: 'cashback', label: 'Cashback on shopping', emoji: '🛒', hindiLabel: 'Shopping pe cashback' },
      { value: 'upi', label: 'UPI & daily payments', emoji: '📲', hindiLabel: 'UPI payments pe rewards' },
      { value: 'travel', label: 'Travel & lounge access', emoji: '✈️', hindiLabel: 'Travel aur lounge' },
      { value: 'first', label: 'My first ever card', emoji: '🎯', hindiLabel: 'Pehla credit card chahiye' },
    ],
  },
  {
    id: 'income',
    question: 'What is your monthly income?',
    hindiQuestion: 'Aapki monthly income kitni hai?',
    options: [
      { value: 'low', label: 'Student / No income', emoji: '🎓', hindiLabel: 'Student / Income nahi hai' },
      { value: 'mid', label: '₹15,000 – ₹50,000', emoji: '💼', hindiLabel: '₹15,000 – ₹50,000' },
      { value: 'high', label: '₹50,000 – ₹1,00,000', emoji: '📈', hindiLabel: '₹50,000 – ₹1,00,000' },
      { value: 'premium', label: 'Above ₹1,00,000', emoji: '💎', hindiLabel: '₹1,00,000 se zyada' },
    ],
  },
  {
    id: 'fee',
    question: 'Are you okay with an annual fee?',
    hindiQuestion: 'Annual fee dene mein koi problem hai?',
    options: [
      { value: 'free', label: 'No — Lifetime free only', emoji: '🆓', hindiLabel: 'Nahi — Lifetime free chahiye' },
      { value: 'low', label: 'Up to ₹999/year is fine', emoji: '✅', hindiLabel: 'Haan — ₹999 tak theek hai' },
      { value: 'any', label: 'Willing to pay for premium', emoji: '💳', hindiLabel: 'Premium card ke liye pay karoon ga' },
    ],
  },
  {
    id: 'usage',
    question: 'Where do you spend the most?',
    hindiQuestion: 'Aap sabse zyada kahan kharcha karte ho?',
    options: [
      { value: 'online', label: 'Online (Amazon, Flipkart)', emoji: '🖥️', hindiLabel: 'Online shopping (Amazon, Flipkart)' },
      { value: 'fuel', label: 'Petrol / fuel', emoji: '⛽', hindiLabel: 'Petrol / Fuel' },
      { value: 'dining', label: 'Food delivery & dining', emoji: '🍔', hindiLabel: 'Food delivery aur restaurants' },
      { value: 'mixed', label: 'Everything equally', emoji: '🔄', hindiLabel: 'Sab jagah equally' },
    ],
  },
];

// ─── Card Recommendation Engine ──────────────────────────────
function getRecommendations(answers: Record<string, string>): typeof EARNKARO_OFFERS {
  const allOffers = [...EARNKARO_OFFERS];

  const prioritySlugs: string[] = [];

  const { goal, income, fee, usage } = answers;

  // First card / student
  if (goal === 'first' || income === 'low') {
    prioritySlugs.push('idfc-first-wow', 'idfc-first-swyp', 'au-lit-credit-card');
  }

  // UPI / daily
  if (goal === 'upi') {
    prioritySlugs.push('axis-airtel-rupay', 'axis-indian-oil-rupay', 'au-lit-credit-card', 'idfc-first-swyp');
  }

  // Cashback + online
  if (goal === 'cashback' || usage === 'online') {
    prioritySlugs.push('sbi-cashback-credit-card', 'sbi-simplyclick-credit-card', 'idfc-first-swyp');
  }

  // Travel
  if (goal === 'travel') {
    prioritySlugs.push('scapia-credit-card', 'idfc-first-mayura', 'hdfc-irctc-credit-card');
  }

  // Fuel
  if (usage === 'fuel') {
    prioritySlugs.push('axis-indian-oil-rupay', 'sbi-bpcl-credit-card');
  }

  // Dining
  if (usage === 'dining') {
    prioritySlugs.push('axis-airtel-rupay', 'kotak-league-platinum');
  }

  // Free only
  if (fee === 'free') {
    prioritySlugs.push('idfc-first-swyp', 'au-lit-credit-card', 'axis-airtel-rupay', 'scapia-credit-card', 'idfc-first-wow');
  }

  // Premium
  if (fee === 'any' && income === 'premium') {
    prioritySlugs.push('idfc-first-mayura');
  }

  // Deduplicate while preserving order
  const seen = new Set<string>();
  const ordered = prioritySlugs.filter((s) => {
    if (seen.has(s)) return false;
    seen.add(s);
    return true;
  });

  // Map slugs to offers
  const results = ordered
    .map((slug) => allOffers.find((o) => o.card_slug === slug && o.is_active))
    .filter(Boolean) as typeof EARNKARO_OFFERS;

  // Pad with highest-commission cards if < 3
  if (results.length < 3) {
    for (const offer of allOffers) {
      if (!seen.has(offer.card_slug)) {
        results.push(offer);
        if (results.length >= 3) break;
      }
    }
  }

  return results.slice(0, 3);
}

// ─── Component ───────────────────────────────────────────────
export default function CardQuiz() {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [recommendations, setRecommendations] = useState<typeof EARNKARO_OFFERS | null>(null);
  const [isHindi, setIsHindi] = useState(false);

  const step = STEPS[currentStep];
  const progress = ((currentStep + 1) / STEPS.length) * 100;

  function handleAnswer(value: string) {
    const newAnswers = { ...answers, [step.id]: value };
    setAnswers(newAnswers);

    if (currentStep < STEPS.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setRecommendations(getRecommendations(newAnswers));
    }
  }

  function reset() {
    setCurrentStep(0);
    setAnswers({});
    setRecommendations(null);
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-10 sm:py-16">
      <div className="w-full max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="text-5xl mb-4">🧭</div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-[hsl(var(--color-text))] tracking-tight mb-2">
            {isHindi ? 'Apna Perfect Credit Card Dhundho' : 'Find Your Perfect Credit Card'}
          </h1>
          <p className="text-[hsl(var(--color-text-secondary))] font-medium">
            {isHindi ? '4 sawaalon mein — 30 seconds mein result' : '4 quick questions · Results in 30 seconds'}
          </p>
          <button
            onClick={() => setIsHindi(!isHindi)}
            className="mt-3 text-xs font-bold text-[hsl(var(--color-primary))] hover:underline cursor-pointer"
          >
            {isHindi ? 'Switch to English' : 'हिंदी में देखें'}
          </button>
        </div>

        {!recommendations ? (
          <div className="surface-card p-6 sm:p-8 shadow-xl">
            {/* Progress bar */}
            <div className="mb-8">
              <div className="flex justify-between text-[11px] font-bold text-[hsl(var(--color-text-secondary))] uppercase tracking-widest mb-2">
                <span>{isHindi ? `सवाल ${currentStep + 1} / ${STEPS.length}` : `Step ${currentStep + 1} of ${STEPS.length}`}</span>
                <span>{Math.round(progress)}%</span>
              </div>
              <div className="h-1.5 bg-[hsl(var(--color-bg-secondary))] border border-[hsl(var(--color-border))] rounded-full overflow-hidden">
                <div
                  className="h-full bg-[hsl(var(--color-primary))] rounded-full transition-all duration-500"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            {/* Question */}
            <h2 className="text-xl md:text-2xl font-extrabold text-[hsl(var(--color-text))] mb-8 leading-snug">
              {isHindi ? step.hindiQuestion : step.question}
            </h2>

            {/* Options */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {step.options.map((option) => (
                <button
                  key={option.value}
                  onClick={() => handleAnswer(option.value)}
                  className="group flex items-center gap-4 p-4 bg-white hover:bg-[hsl(var(--color-bg-secondary))] border border-[hsl(var(--color-border))] hover:border-[hsl(var(--color-primary))] rounded-2xl transition-all text-left cursor-pointer"
                >
                  <span className="text-2xl flex-shrink-0">{option.emoji}</span>
                  <span className="font-bold text-[hsl(var(--color-text))] group-hover:text-[hsl(var(--color-primary))] transition-colors">
                    {isHindi ? option.hindiLabel : option.label}
                  </span>
                  <ChevronRight className="w-4 h-4 text-[hsl(var(--color-text-tertiary))] ml-auto flex-shrink-0 group-hover:text-[hsl(var(--color-primary))] transition-colors" />
                </button>
              ))}
            </div>
          </div>
        ) : (
          // Results
          <div>
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-emerald-500/10 border border-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-emerald-600" />
              </div>
              <h2 className="text-2xl font-extrabold text-[hsl(var(--color-text))] mb-2">
                {isHindi ? 'Aapke Liye Best Cards 🎉' : 'Your Best Matches 🎉'}
              </h2>
              <p className="text-[hsl(var(--color-text-secondary))] font-medium">
                {isHindi ? 'Ye cards aapki profile ke hisaab se perfectly match karte hain' : 'These cards are perfectly matched to your profile'}
              </p>
            </div>

            <div className="space-y-4 mb-8">
              {recommendations.map((offer, idx) => (
                <div
                  key={offer.card_slug}
                  className={cn(
                    'surface-card p-6 shadow-sm border transition-all',
                    idx === 0 ? 'border-emerald-500/50 ring-1 ring-emerald-500/20 bg-emerald-50/10' : ''
                  )}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[10px] font-extrabold text-[hsl(var(--color-text-secondary))] uppercase tracking-widest">#{idx + 1} Match</span>
                        {idx === 0 && (
                          <span className="text-[9px] font-extrabold bg-emerald-500/10 text-emerald-700 border border-emerald-500/25 px-2 py-0.5 rounded-full uppercase tracking-widest">
                            Best Pick
                          </span>
                        )}
                      </div>
                      <p className="font-extrabold text-[hsl(var(--color-text))] text-lg leading-tight">{offer.card_name}</p>
                      <p className="text-sm text-[hsl(var(--color-text-secondary))] font-medium">{offer.bank_name}</p>
                      <div className="flex items-center gap-1.5 mt-2">
                        <BadgeIndianRupee className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="text-sm font-extrabold text-emerald-600">
                          {isHindi ? `Apply karo — ₹${offer.commission.toLocaleString('en-IN')} earn karo` : `Earn ₹${offer.commission.toLocaleString('en-IN')} on approval`}
                        </span>
                      </div>
                    </div>
                    <a
                      href={offer.earnkaro_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-shrink-0 flex items-center justify-center gap-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold text-sm transition-all shadow-lg shadow-emerald-600/20"
                    >
                      {isHindi ? 'Apply' : 'Apply Now'} <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={reset}
                className="btn-base btn-secondary border px-6 py-3 rounded-xl flex items-center justify-center gap-2"
              >
                <RotateCcw className="w-4 h-4" />
                {isHindi ? 'Phir Try Karo' : 'Retake Quiz'}
              </button>
              <Link
                href="/best-earning-offers"
                className="btn-base btn-primary px-6 py-3 rounded-xl flex items-center justify-center gap-2"
              >
                {isHindi ? 'Sabhi Offers Dekho' : 'See All Offers'} <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
