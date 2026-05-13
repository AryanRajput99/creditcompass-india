'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function AffiliateDisclosureBanner() {
  const [dismissed, setDismissed] = useState(true); // start hidden to avoid hydration flash

  useEffect(() => {
    const wasDismissed = sessionStorage.getItem('affiliate-banner-dismissed');
    if (!wasDismissed) {
      setDismissed(false);
    }
  }, []);

  function dismiss() {
    sessionStorage.setItem('affiliate-banner-dismissed', 'true');
    setDismissed(true);
  }

  if (dismissed) return null;

  return (
    <div
      role="banner"
      aria-label="Affiliate Disclosure"
      className="fixed bottom-0 left-0 right-0 z-50 bg-slate-900/95 backdrop-blur-md border-t border-slate-700 shadow-2xl"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between gap-4">
        <div className="flex items-start gap-3 flex-1 min-w-0">
          {/* Icon */}
          <div className="flex-shrink-0 w-7 h-7 rounded-lg bg-amber-500/20 flex items-center justify-center mt-0.5">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-amber-400">
              <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>
            </svg>
          </div>

          {/* Text */}
          <p className="text-[12px] text-slate-300 leading-relaxed font-medium">
            <span className="font-bold text-amber-400">Affiliate Disclosure:</span>{' '}
            CreditCompass India earns a commission when you apply via our links. This comes at{' '}
            <strong className="text-white">no extra cost</strong> to you and does not influence our card ratings.{' '}
            <Link href="/affiliate-disclosure" className="underline text-slate-400 hover:text-white transition-colors">
              Learn more
            </Link>
          </p>
        </div>

        {/* Dismiss */}
        <button
          onClick={dismiss}
          aria-label="Dismiss disclosure banner"
          className="flex-shrink-0 p-2 rounded-lg text-slate-500 hover:text-white hover:bg-slate-700 transition-all"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>
      </div>
    </div>
  );
}
