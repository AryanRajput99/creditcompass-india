import { EARNKARO_OFFERS } from '@/data/earnkaro-offers';
import { CreditCard } from '@/types';

/**
 * Filters a list of cards to only include those that have an active EarnKaro affiliate link.
 * This ensures the website only displays revenue-generating cards.
 */
export function filterMonetizedCards(cards: any[] | null): CreditCard[] {
  if (!cards) return [];
  
  const monetizedSlugs = new Set(EARNKARO_OFFERS.map(offer => offer.card_slug));
  
  return (cards as CreditCard[]).filter(card => monetizedSlugs.has(card.slug));
}

/**
 * Returns the list of slugs that have EarnKaro offers.
 * Useful for Supabase .in() queries.
 */
export function getMonetizedSlugs(): string[] {
  return EARNKARO_OFFERS.map(offer => offer.card_slug);
}
