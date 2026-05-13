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
  const handleClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    
    // Track click
    try {
      await fetch('/api/track-click', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          card_id: cardId,
          card_name: cardName,
          card_slug: cardSlug,
          affiliate_url: affiliateUrl,
        }),
      });
    } catch {
      // Ignore tracking errors
    }
    
    // Redirect to affiliate URL in a new tab
    window.open(affiliateUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <button
      onClick={handleClick}
      className={cn("btn-base btn-apply px-8 py-3.5 text-base gap-3 shadow-lg", className)}
    >
      {children || `Apply Now on ${bankName}`}
      <ExternalLink className="w-5 h-5" />
    </button>
  );
}
