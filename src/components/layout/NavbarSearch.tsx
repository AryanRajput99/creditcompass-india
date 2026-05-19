'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Search, X, CreditCard, Sparkles, HelpCircle } from 'lucide-react';
import { EARNKARO_OFFERS } from '@/data/earnkaro-offers';

interface NavbarSearchProps {
  className?: string;
}

export default function NavbarSearch({ className }: NavbarSearchProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const router = useRouter();
  const modalRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Filter cards based on query
  const filteredCards = EARNKARO_OFFERS.filter(
    (offer) =>
      offer.card_name.toLowerCase().includes(query.toLowerCase()) ||
      offer.bank_name.toLowerCase().includes(query.toLowerCase())
  ).slice(0, 5);

  // Quick action options
  const quickLinks = [
    { label: 'Compare Cards Side-by-Side', href: '/compare', icon: '⚖️' },
    { label: 'Find Best RuPay UPI Cards', href: '/rupay-upi-cards', icon: '📲' },
    { label: 'Find Your Perfect Card (Quiz)', href: '/quiz', icon: '🧭' },
    { label: 'Highest Cashback Cards list', href: '/category/cashback', icon: '💰' },
  ];

  // Hot-key for search (Command+K or Ctrl+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Reset index when search query changes
  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  // Focus input when modal opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      setQuery('');
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Handle clicking outside modal to close
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleSelect = (href: string) => {
    setIsOpen(false);
    router.push(href);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    const totalResults = filteredCards.length + (query === '' ? quickLinks.length : 0);

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % totalResults);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + totalResults) % totalResults);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (query === '') {
        const selected = quickLinks[selectedIndex];
        if (selected) handleSelect(selected.href);
      } else {
        const selected = filteredCards[selectedIndex];
        if (selected) handleSelect(`/cards/${selected.card_slug}`);
      }
    }
  };

  return (
    <div className={className}>
      {/* Search trigger button */}
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center justify-between w-48 xl:w-60 px-3 py-2 bg-[hsl(var(--color-bg-secondary))] border border-[hsl(var(--color-border))] rounded-xl text-xs font-semibold text-[hsl(var(--color-text-secondary))] hover:border-[hsl(var(--color-primary))] transition-all group cursor-pointer"
      >
        <span className="flex items-center gap-2">
          <Search className="w-3.5 h-3.5 text-[hsl(var(--color-text-tertiary))] group-hover:text-[hsl(var(--color-primary))] transition-colors" />
          Search cards...
        </span>
        <kbd className="hidden sm:inline-flex items-center px-1.5 py-0.5 border border-[hsl(var(--color-border))] rounded-md bg-white text-[9px] font-bold text-[hsl(var(--color-text-tertiary))] uppercase">
          ⌘K
        </kbd>
      </button>

      {/* Backdrop Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-start justify-center pt-24 px-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in-up">
          <div
            ref={modalRef}
            className="w-full max-w-xl bg-white border border-[hsl(var(--color-border))] rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[480px]"
          >
            {/* Search Input Bar */}
            <div className="flex items-center gap-3 px-5 py-4 border-b border-[hsl(var(--color-border))]">
              <Search className="w-5 h-5 text-[hsl(var(--color-primary))]" />
              <input
                ref={inputRef}
                type="text"
                placeholder="Type to search cards or banks (e.g. SBI, Axis, Free)..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                className="flex-1 bg-transparent text-[15px] font-medium text-[hsl(var(--color-text))] placeholder:text-[hsl(var(--color-text-tertiary))] outline-none border-none"
              />
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 hover:bg-[hsl(var(--color-bg-secondary))] rounded-lg transition-colors"
              >
                <X className="w-4 h-4 text-[hsl(var(--color-text-secondary))]" />
              </button>
            </div>

            {/* Results Content */}
            <div className="flex-1 overflow-y-auto p-3">
              {query === '' ? (
                // Quick links for empty search
                <div>
                  <p className="text-[10px] font-bold text-[hsl(var(--color-text-tertiary))] uppercase tracking-widest px-3 py-2">
                    Quick Navigation
                  </p>
                  <div className="space-y-1">
                    {quickLinks.map((link, idx) => (
                      <button
                        key={link.href}
                        onClick={() => handleSelect(link.href)}
                        className={`w-full flex items-center gap-3 px-3 py-3 rounded-2xl text-left text-sm font-semibold transition-all ${
                          selectedIndex === idx
                            ? 'bg-[hsl(var(--color-bg-secondary))] text-[hsl(var(--color-primary))]'
                            : 'text-[hsl(var(--color-text-secondary))] hover:bg-slate-50'
                        }`}
                      >
                        <span className="text-lg">{link.icon}</span>
                        {link.label}
                      </button>
                    ))}
                  </div>
                </div>
              ) : filteredCards.length > 0 ? (
                // Search Results
                <div>
                  <p className="text-[10px] font-bold text-[hsl(var(--color-text-tertiary))] uppercase tracking-widest px-3 py-2">
                    Found {filteredCards.length} matching cards
                  </p>
                  <div className="space-y-1">
                    {filteredCards.map((offer, idx) => (
                      <button
                        key={offer.card_slug}
                        onClick={() => handleSelect(`/cards/${offer.card_slug}`)}
                        className={`w-full flex items-center justify-between px-3 py-3 rounded-2xl text-left transition-all ${
                          selectedIndex === idx
                            ? 'bg-[hsl(var(--color-bg-secondary))]'
                            : 'hover:bg-slate-50'
                        }`}
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <div className={`w-8 h-8 rounded-lg flex items-center justify-center border transition-colors ${
                            selectedIndex === idx
                              ? 'bg-blue-50 border-blue-200 text-[hsl(var(--color-primary))]'
                              : 'bg-slate-50 border-[hsl(var(--color-border))] text-[hsl(var(--color-text-tertiary))]'
                          }`}>
                            <CreditCard className="w-4 h-4" />
                          </div>
                          <div className="min-w-0">
                            <p className="text-sm font-bold text-[hsl(var(--color-text))] truncate">
                              {offer.card_name}
                            </p>
                            <p className="text-xs text-[hsl(var(--color-text-secondary))] font-medium">
                              {offer.bank_name}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 flex-shrink-0">
                          <span className="text-[10px] font-extrabold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                            ₹{offer.commission.toLocaleString('en-IN')} Cashback
                          </span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                // No Results
                <div className="py-12 text-center">
                  <HelpCircle className="w-10 h-10 text-[hsl(var(--color-text-tertiary))] mx-auto mb-3" />
                  <p className="text-sm font-bold text-[hsl(var(--color-text))] mb-1">
                    No results for &ldquo;{query}&rdquo;
                  </p>
                  <p className="text-xs text-[hsl(var(--color-text-secondary))] font-medium">
                    Try searching for &apos;SBI&apos;, &apos;Axis&apos;, or &apos;Cashback&apos;.
                  </p>
                </div>
              )}
            </div>

            {/* Command Menu Footer */}
            <div className="px-5 py-2.5 bg-slate-50 border-t border-[hsl(var(--color-border))] flex items-center justify-between text-[10px] text-[hsl(var(--color-text-tertiary))] font-bold uppercase tracking-wider">
              <span className="flex items-center gap-1.5">
                <span>↑↓</span> Navigate
              </span>
              <span className="flex items-center gap-1.5">
                <span>Enter</span> Select
              </span>
              <span className="flex items-center gap-1.5">
                <span>Esc</span> Close
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
