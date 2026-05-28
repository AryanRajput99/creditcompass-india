'use client';

import React from 'react';
import { ExternalLink } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ApplyButtonProps {
  cardId: string;
  cardName: string;
  cardSlug: string;
  affiliateUrl: string;
  bankName: string;
  className?: string;
  children?: React.ReactNode;
}

export default function ApplyButton({
  cardId,
  cardName,
  cardSlug,
  affiliateUrl,
  bankName,
  className,
  children
}: ApplyButtonProps) {
  const handleClick = () => {
    // Non-blocking click tracking via sendBeacon
    try {
      navigator.sendBeacon('/api/track-click', JSON.stringify({
        card_id: cardId,
        card_name: cardName,
        card_slug: cardSlug,
        affiliate_url: affiliateUrl,
      }));
    } catch {
      // Ignore tracking errors
    }
    // Don't preventDefault — let the <a> tag handle navigation naturally
  };

  return (
    <a
      href={affiliateUrl}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
      className={cn("btn-base btn-apply px-8 py-3.5 text-base gap-3 shadow-lg text-center", className)}
    >
      {children || `Apply Now on ${bankName}`}
      <ExternalLink className="w-5 h-5" />
    </a>
  );
}
