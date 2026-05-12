import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

// Utility to merge Tailwind classes safely
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Format currency in Indian Rupee format
export function formatRupee(amount: number): string {
  if (amount === 0) return 'Free';
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
}

// Format large numbers in Indian format (lakhs, crores)
export function formatIndianNumber(num: number): string {
  if (num >= 10000000) return `₹${(num / 10000000).toFixed(1)}Cr`;
  if (num >= 100000) return `₹${(num / 100000).toFixed(1)}L`;
  if (num >= 1000) return `₹${(num / 1000).toFixed(0)}K`;
  return `₹${num}`;
}

// Generate a session ID for click tracking
export function generateSessionId(): string {
  return `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
}

// Get or create a session ID from localStorage
export function getSessionId(): string {
  if (typeof window === 'undefined') return generateSessionId();
  
  let sessionId = localStorage.getItem('cc_session_id');
  if (!sessionId) {
    sessionId = generateSessionId();
    localStorage.setItem('cc_session_id', sessionId);
  }
  return sessionId;
}

// Truncate text with ellipsis
export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
}

// Category colors for badges (Premium Fintech)
export const CATEGORY_COLORS: Record<string, string> = {
  cashback: 'bg-emerald-50 text-emerald-700 border-emerald-100',
  travel: 'bg-indigo-50 text-indigo-700 border-indigo-100',
  fuel: 'bg-amber-50 text-amber-700 border-amber-100',
  shopping: 'bg-rose-50 text-rose-700 border-rose-100',
  business: 'bg-slate-50 text-slate-700 border-slate-100',
  student: 'bg-sky-50 text-sky-700 border-sky-100',
  'lifetime-free': 'bg-teal-50 text-teal-700 border-teal-100',
  premium: 'bg-violet-50 text-violet-700 border-violet-100',
  rewards: 'bg-pink-50 text-pink-700 border-pink-100',
};

export const CATEGORY_LABELS: Record<string, string> = {
  cashback: 'Cashback',
  travel: 'Travel',
  fuel: 'Fuel',
  shopping: 'Shopping',
  business: 'Business',
  student: 'Student',
  'lifetime-free': 'Lifetime Free',
  premium: 'Premium',
  rewards: 'Rewards',
};

export const CATEGORY_ICONS: Record<string, string> = {
  cashback: '💰',
  travel: '✈️',
  fuel: '⛽',
  shopping: '🛍️',
  business: '💼',
  student: '🎓',
  'lifetime-free': '🎁',
  premium: '👑',
  rewards: '⭐',
};
