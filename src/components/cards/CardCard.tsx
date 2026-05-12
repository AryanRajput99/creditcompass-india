'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Star, CheckCircle, ExternalLink, CreditCard as CardIcon,
  ArrowRight, Plus, GitCompare
} from 'lucide-react';
import { CreditCard } from '@/types';
import { cn, formatRupee, CATEGORY_COLORS, CATEGORY_LABELS } from '@/lib/utils';

interface CardCardProps {
  card: CreditCard;
  onCompare?: (card: CreditCard) => void;
  isInCompare?: boolean;
  onApplyClick?: (card: CreditCard) => void;
}

export default function CardCard({ card, onCompare, isInCompare, onApplyClick }: CardCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  const handleApplyClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (onApplyClick) {
      onApplyClick(card);
    }
    // Track click & redirect
    try {
      await fetch('/api/track-click', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          card_id: card.id,
          card_name: card.name,
          card_slug: card.slug,
          affiliate_url: card.affiliate_url,
        }),
      });
    } catch {
      // Non-blocking
    }
    window.open(card.affiliate_url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div
      className={cn(
        'surface-card p-6 flex flex-col gap-6 relative group',
        card.is_featured && 'border-[hsl(var(--color-primary))] shadow-sm'
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Featured Badge */}
      {card.is_featured && (
        <div className="absolute top-0 right-6 px-3 py-1 bg-[hsl(var(--color-primary))] text-white rounded-b-lg shadow-sm flex items-center gap-1.5 z-10">
          <Star className="w-3 h-3 fill-white" />
          <span className="text-[10px] font-extrabold uppercase tracking-widest">Recommended</span>
        </div>
      )}

      {/* Card Header */}
      <div className="flex flex-col gap-4">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <p className="text-[10px] font-bold text-[hsl(var(--color-text-tertiary))] uppercase tracking-[0.1em] mb-1">
              {card.bank_name}
            </p>
            <Link
              href={`/cards/${card.slug}`}
              className="font-bold text-xl text-[hsl(var(--color-text))] leading-tight hover:text-[hsl(var(--color-primary))] transition-colors block"
            >
              {card.name}
            </Link>
          </div>
          
          <div className="w-20 h-12 rounded-lg bg-white border border-[hsl(var(--color-border))] flex items-center justify-center flex-shrink-0 overflow-hidden p-1 shadow-sm">
            {card.card_image_url ? (
              <Image
                src={card.card_image_url}
                alt={card.name}
                width={80}
                height={48}
                className="object-contain w-full h-full"
              />
            ) : (
              <CardIcon className="w-5 h-5 text-[hsl(var(--color-text-tertiary))]" />
            )}
          </div>
        </div>

        {/* Category Badges */}
        <div className="flex flex-wrap gap-2">
          {card.categories.slice(0, 2).map((cat) => (
            <span key={cat} className={cn('badge', CATEGORY_COLORS[cat] || 'bg-slate-50 text-slate-600 border border-slate-100')}>
              {CATEGORY_LABELS[cat] || cat}
            </span>
          ))}
        </div>
      </div>

      {/* Key Metrics - High Contrast Grid */}
      <div className="grid grid-cols-2 gap-px bg-[hsl(var(--color-border))] border border-[hsl(var(--color-border))] rounded-xl overflow-hidden shadow-sm">
        <div className="bg-white p-4 flex flex-col gap-1">
          <span className="text-[11px] font-bold text-[hsl(var(--color-text-secondary))] uppercase tracking-wider">Joining Fee</span>
          <span className="text-base font-extrabold text-[hsl(var(--color-text))]">
            {card.joining_fee === 0 ? 'Free' : formatRupee(card.joining_fee)}
          </span>
        </div>
        <div className="bg-white p-4 flex flex-col gap-1">
          <span className="text-[11px] font-bold text-[hsl(var(--color-text-secondary))] uppercase tracking-wider">Annual Fee</span>
          <span className="text-base font-extrabold text-[hsl(var(--color-text))]">
            {card.is_lifetime_free ? (
              <span className="text-emerald-600">Zero Fee</span>
            ) : card.annual_fee === 0 ? (
              'Free'
            ) : (
              formatRupee(card.annual_fee)
            )}
          </span>
        </div>
      </div>

      {/* Pros & Rewards */}
      <div className="flex-1 flex flex-col gap-4">
        {card.reward_rate && (
          <div className="bg-[hsl(var(--color-bg-secondary))] p-3 rounded-lg border border-[hsl(var(--color-border))] border-dashed">
            <p className="text-[13px] text-[hsl(var(--color-text))] font-semibold leading-relaxed">
              {card.reward_rate}
            </p>
          </div>
        )}
        
        {card.pros.length > 0 && (
          <ul className="space-y-2.5">
            {card.pros.slice(0, 2).map((pro, i) => (
              <li key={i} className="flex items-start gap-2 text-[13px] text-[hsl(var(--color-text-secondary))] leading-snug">
                <div className="w-4 h-4 rounded-full bg-emerald-50 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <CheckCircle className="w-3 h-3 text-emerald-600" />
                </div>
                <span>{pro}</span>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Actions */}
      <div className="flex flex-col gap-3 mt-2">
        <div className="flex gap-2">
          <button
            onClick={handleApplyClick}
            className="btn-apply flex-1 py-3"
          >
            Apply Now
            <ArrowRight className="w-4 h-4" />
          </button>
          
          {onCompare && (
            <button
              onClick={() => onCompare(card)}
              className={cn(
                'w-12 h-12 rounded-xl border flex items-center justify-center transition-all',
                isInCompare
                  ? 'bg-[hsl(var(--color-primary))] border-[hsl(var(--color-primary))] text-white'
                  : 'bg-white border-[hsl(var(--color-border))] text-[hsl(var(--color-text-secondary))] hover:border-[hsl(var(--color-primary))] hover:text-[hsl(var(--color-primary))]'
              )}
            >
              {isInCompare ? <GitCompare className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
            </button>
          )}
        </div>
        
        <Link
          href={`/cards/${card.slug}`}
          className="text-center text-[12px] font-bold text-[hsl(var(--color-text-tertiary))] hover:text-[hsl(var(--color-primary))] transition-colors uppercase tracking-widest"
        >
          View Full Specifications
        </Link>
      </div>
    </div>
  );
}
