'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Filter, Search, X, GitCompare, SlidersHorizontal } from 'lucide-react';
import { CreditCard, Category } from '@/types';
import CardCard from '@/components/cards/CardCard';
import { CATEGORY_LABELS, CATEGORY_ICONS } from '@/lib/utils';
import Link from 'next/link';

interface CardsListingClientProps {
  initialCards: CreditCard[];
  categories: Category[];
  currentFilters: {
    category: string;
    bank: string;
    q: string;
    sort: string;
    lifetime_free: boolean;
  };
}

export default function CardsListingClient({
  initialCards,
  categories,
  currentFilters,
}: CardsListingClientProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [cards] = useState<CreditCard[]>(initialCards);
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);
  const [compareList, setCompareList] = useState<CreditCard[]>([]);

  const updateFilters = (key: string, value: string | boolean | null) => {
    const params = new URLSearchParams(searchParams.toString());

    if (value === null || value === '' || value === false || value === 'all') {
      params.delete(key);
    } else {
      params.set(key, String(value));
    }

    router.push(`/cards?${params.toString()}`);
  };

  const handleCompareToggle = (card: CreditCard) => {
    setCompareList((prev) => {
      const isAlreadyAdded = prev.some((c) => c.id === card.id);
      if (isAlreadyAdded) {
        return prev.filter((c) => c.id !== card.id);
      }
      if (prev.length >= 3) {
        alert('You can only compare up to 3 cards at a time.');
        return prev;
      }
      return [...prev, card];
    });
  };

  const clearCompare = () => setCompareList([]);

  const handleStartCompare = () => {
    if (compareList.length < 2) {
      alert('Please select at least 2 cards to compare.');
      return;
    }
    const ids = compareList.map((c) => c.id).join(',');
    router.push(`/compare?ids=${ids}`);
  };

  const hasActiveFilters =
    currentFilters.category !== 'all' || currentFilters.q || currentFilters.lifetime_free;

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      {/* Mobile Filter Toggle */}
      <div className="lg:hidden flex items-center justify-between mb-2">
        <button
          onClick={() => setIsMobileFiltersOpen(!isMobileFiltersOpen)}
          id="mobile-filter-toggle"
          className="flex items-center gap-2 px-4 py-2.5 bg-white rounded-xl text-sm font-bold border border-[hsl(var(--color-border))] text-[hsl(var(--color-text))] shadow-sm hover:border-[hsl(var(--color-primary))] transition-colors"
        >
          <SlidersHorizontal className="w-4 h-4" />
          Filters
          {hasActiveFilters && (
            <span className="w-2 h-2 rounded-full bg-[hsl(var(--color-primary))] inline-block" />
          )}
        </button>
        <div className="text-sm font-semibold text-[hsl(var(--color-text-secondary))]">
          {cards.length} cards
        </div>
      </div>

      {/* Filters Sidebar */}
      <aside
        className={`
          ${isMobileFiltersOpen ? 'block' : 'hidden'} 
          lg:block w-full lg:w-64 flex-shrink-0
        `}
      >
        <div className="surface-card p-6 space-y-7 sticky top-28">
          <div className="flex items-center justify-between">
            <h2 className="text-[13px] font-extrabold text-[hsl(var(--color-text))] uppercase tracking-widest">
              Filters
            </h2>
            {hasActiveFilters && (
              <button
                onClick={() => router.push('/cards')}
                className="text-[11px] font-bold text-[hsl(var(--color-primary))] hover:underline"
              >
                Clear all
              </button>
            )}
          </div>

          {/* Search */}
          <div>
            <h3 className="text-[11px] font-bold text-[hsl(var(--color-text-secondary))] uppercase tracking-widest mb-3">
              Search
            </h3>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[hsl(var(--color-text-tertiary))]" />
              <input
                id="card-search-input"
                type="text"
                placeholder="Card name or bank..."
                defaultValue={currentFilters.q}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    updateFilters('q', e.currentTarget.value);
                  }
                }}
                className="w-full pl-9 pr-4 py-2.5 bg-[hsl(var(--color-bg-secondary))] rounded-xl border border-[hsl(var(--color-border))] text-sm text-[hsl(var(--color-text))] placeholder:text-[hsl(var(--color-text-tertiary))] focus:border-[hsl(var(--color-primary))] focus:ring-2 focus:ring-[hsl(var(--color-primary))/10%] outline-none transition-all"
              />
            </div>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-[11px] font-bold text-[hsl(var(--color-text-secondary))] uppercase tracking-widest mb-3">
              Categories
            </h3>
            <div className="space-y-1">
              <button
                id="filter-all-categories"
                onClick={() => updateFilters('category', 'all')}
                className={`block w-full text-left px-3 py-2.5 rounded-xl text-[13px] font-semibold transition-all ${
                  currentFilters.category === 'all'
                    ? 'bg-[hsl(var(--color-primary))] text-white shadow-sm'
                    : 'text-[hsl(var(--color-text-secondary))] hover:bg-[hsl(var(--color-bg-secondary))] hover:text-[hsl(var(--color-text))]'
                }`}
              >
                All Categories
              </button>
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  id={`filter-cat-${cat.name}`}
                  onClick={() => updateFilters('category', cat.name)}
                  className={`block w-full text-left px-3 py-2.5 rounded-xl text-[13px] font-semibold transition-all ${
                    currentFilters.category === cat.name
                      ? 'bg-[hsl(var(--color-primary))] text-white shadow-sm'
                      : 'text-[hsl(var(--color-text-secondary))] hover:bg-[hsl(var(--color-bg-secondary))] hover:text-[hsl(var(--color-text))]'
                  }`}
                >
                  <span className="mr-2">{cat.icon || CATEGORY_ICONS[cat.name] || '💳'}</span>
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Quick Filters */}
          <div>
            <h3 className="text-[11px] font-bold text-[hsl(var(--color-text-secondary))] uppercase tracking-widest mb-3">
              Quick Filters
            </h3>
            <label className="flex items-center gap-3 cursor-pointer group p-3 rounded-xl hover:bg-[hsl(var(--color-bg-secondary))] transition-colors">
              <div
                className={`relative flex items-center justify-center w-5 h-5 border-2 rounded-md transition-all ${
                  currentFilters.lifetime_free
                    ? 'bg-[hsl(var(--color-primary))] border-[hsl(var(--color-primary))]'
                    : 'border-[hsl(var(--color-border))] bg-white group-hover:border-[hsl(var(--color-primary))]'
                }`}
              >
                <input
                  type="checkbox"
                  id="filter-lifetime-free"
                  className="opacity-0 absolute inset-0 cursor-pointer"
                  checked={currentFilters.lifetime_free}
                  onChange={(e) => updateFilters('lifetime_free', e.target.checked)}
                />
                {currentFilters.lifetime_free && (
                  <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </div>
              <span className="text-[13px] font-semibold text-[hsl(var(--color-text-secondary))] group-hover:text-[hsl(var(--color-text))] transition-colors">
                Lifetime Free Only
              </span>
            </label>
          </div>

          {/* Sort */}
          <div>
            <h3 className="text-[11px] font-bold text-[hsl(var(--color-text-secondary))] uppercase tracking-widest mb-3">
              Sort By
            </h3>
            <div className="relative">
              <select
                id="sort-select"
                value={currentFilters.sort}
                onChange={(e) => updateFilters('sort', e.target.value)}
                className="w-full px-3 py-2.5 bg-[hsl(var(--color-bg-secondary))] rounded-xl border border-[hsl(var(--color-border))] text-[13px] font-semibold text-[hsl(var(--color-text))] focus:border-[hsl(var(--color-primary))] outline-none appearance-none cursor-pointer transition-all"
              >
                <option value="featured">Featured &amp; Popular</option>
                <option value="cashback_desc">Highest Cashback</option>
                <option value="annual_fee_asc">Annual Fee: Low to High</option>
                <option value="annual_fee_desc">Annual Fee: High to Low</option>
                <option value="newest">Newest Added</option>
              </select>
              <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2">
                <svg className="w-4 h-4 text-[hsl(var(--color-text-tertiary))]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 min-w-0">
        {/* Active Filters Display */}
        <div className="flex items-center gap-2 mb-6 flex-wrap">
          <span className="text-[13px] font-semibold text-[hsl(var(--color-text-secondary))]">
            Showing <strong className="text-[hsl(var(--color-text))]">{cards.length}</strong> cards
          </span>
          {currentFilters.category !== 'all' && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-[hsl(var(--color-primary))/30%] bg-blue-50 text-xs font-bold text-[hsl(var(--color-primary))]">
              {categories.find((c) => c.name === currentFilters.category)?.label ||
                currentFilters.category}
              <button
                onClick={() => updateFilters('category', 'all')}
                className="hover:opacity-70 transition-opacity"
                aria-label="Remove category filter"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          )}
          {currentFilters.q && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-[hsl(var(--color-border))] bg-[hsl(var(--color-bg-secondary))] text-xs font-bold text-[hsl(var(--color-text-secondary))]">
              &ldquo;{currentFilters.q}&rdquo;
              <button
                onClick={() => updateFilters('q', null)}
                className="hover:opacity-70 transition-opacity"
                aria-label="Remove search filter"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          )}
          {currentFilters.lifetime_free && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-emerald-200 bg-emerald-50 text-xs font-bold text-emerald-700">
              Lifetime Free
              <button
                onClick={() => updateFilters('lifetime_free', false)}
                className="hover:opacity-70 transition-opacity"
                aria-label="Remove lifetime free filter"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          )}
        </div>

        {/* Cards Grid */}
        {cards.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {cards.map((card) => (
              <CardCard
                key={card.id}
                card={card}
                onCompare={handleCompareToggle}
                isInCompare={compareList.some((c) => c.id === card.id)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-24 bg-[hsl(var(--color-bg-secondary))] rounded-3xl border border-dashed border-[hsl(var(--color-border))]">
            <div className="w-16 h-16 rounded-full bg-white border border-[hsl(var(--color-border))] flex items-center justify-center mx-auto mb-5 shadow-sm">
              <Search className="w-7 h-7 text-[hsl(var(--color-text-tertiary))]" />
            </div>
            <h3 className="text-lg font-extrabold text-[hsl(var(--color-text))] mb-2">
              No cards found
            </h3>
            <p className="text-sm text-[hsl(var(--color-text-secondary))] max-w-sm mx-auto mb-6">
              We couldn&apos;t find any credit cards matching your filters. Try adjusting your
              search criteria.
            </p>
            <button
              onClick={() => router.push('/cards')}
              className="btn-base btn-apply px-6 py-2.5"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>

      {/* Floating Compare Action Bar */}
      {compareList.length > 0 && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 animate-fade-in-up">
          <div className="bg-[hsl(var(--color-text))] px-6 py-4 rounded-2xl shadow-2xl flex flex-col sm:flex-row items-center gap-4 sm:gap-6 min-w-[320px]">
            <div className="flex-1 flex items-center justify-between sm:justify-start w-full sm:w-auto gap-4">
              <div>
                <p className="text-[10px] font-extrabold text-white/50 uppercase tracking-widest mb-0.5">
                  Compare Cards
                </p>
                <p className="text-sm font-bold text-white">
                  {compareList.length} of 3 selected
                </p>
              </div>
              <button
                onClick={clearCompare}
                className="sm:hidden text-xs font-bold text-white/50 hover:text-white transition-colors"
              >
                Clear
              </button>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button
                onClick={clearCompare}
                className="hidden sm:block text-sm font-bold text-white/50 hover:text-white transition-colors"
              >
                Clear
              </button>
              <button
                onClick={handleStartCompare}
                disabled={compareList.length < 2}
                id="compare-now-button"
                className={`flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl text-sm font-extrabold transition-all ${
                  compareList.length < 2
                    ? 'bg-white/20 text-white/40 cursor-not-allowed'
                    : 'bg-white text-[hsl(var(--color-primary))] hover:bg-blue-50 shadow-lg'
                }`}
              >
                <GitCompare className="w-4 h-4" />
                Compare Now
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
