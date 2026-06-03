'use client';

import { usePathname } from 'next/navigation';

export default function CanonicalLink() {
  const pathname = usePathname();
  // Always point to the production domain to prevent preview branches from being indexed as duplicate content
  const canonicalUrl = `https://creditcompass-india.vercel.app${pathname === '/' ? '' : pathname}`;
  
  return <link rel="canonical" href={canonicalUrl} />;
}
