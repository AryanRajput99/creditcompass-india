import { Suspense } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import CardsListingClient from '@/components/cards/CardsListingClient';
import { createClient } from '@/lib/supabase/server';
import { CreditCard, Category } from '@/types';
import type { Metadata } from 'next';
import { getMonetizedSlugs } from '@/lib/monetization';

interface PageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export const metadata: Metadata = {
  title: 'Compare All Credit Cards in India 2025',
  description:
    'Browse and compare 100+ credit cards from all major Indian banks. Filter by cashback, travel, fuel, fees, and more. Find the best card for your needs.',
};

export default async function CardsPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const supabase = await createClient();

  // Get all categories for filter sidebar
  const { data: categories } = await supabase
    .from('categories')
    .select('*')
    .order('sort_order', { ascending: true });

  // Build query based on filters
  let query = supabase
    .from('credit_cards')
    .select('*')
    .eq('is_active', true)
    .in('slug', getMonetizedSlugs());

  // Filter by category
  if (params.category && params.category !== 'all') {
    const cat = Array.isArray(params.category) ? params.category[0] : params.category;
    query = query.contains('categories', [cat]);
  }

  // Filter by bank
  if (params.bank) {
    const bank = Array.isArray(params.bank) ? params.bank[0] : params.bank;
    query = query.ilike('bank_name', `%${bank}%`);
  }

  // Filter by lifetime free
  if (params.lifetime_free === 'true') {
    query = query.eq('is_lifetime_free', true);
  }

  // Search
  if (params.q) {
    const q = Array.isArray(params.q) ? params.q[0] : params.q;
    query = query.or(`name.ilike.%${q}%,bank_name.ilike.%${q}%,best_for.ilike.%${q}%`);
  }

  // Sorting
  const sortBy = (Array.isArray(params.sort) ? params.sort[0] : params.sort) || 'featured';
  switch (sortBy) {
    case 'annual_fee_asc':
      query = query.order('annual_fee', { ascending: true });
      break;
    case 'annual_fee_desc':
      query = query.order('annual_fee', { ascending: false });
      break;
    case 'cashback_desc':
      query = query.order('cashback_rate', { ascending: false });
      break;
    case 'newest':
      query = query.order('created_at', { ascending: false });
      break;
    default:
      query = query.order('is_featured', { ascending: false }).order('sort_order', { ascending: true });
  }

  const { data: cards, count } = await query;

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[hsl(var(--color-bg-secondary))] pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-extrabold text-[hsl(var(--color-text))] tracking-tighter mb-2">
              Compare Credit Cards in India
            </h1>
            <p className="text-[hsl(var(--color-text-secondary))] text-sm font-medium">
              {count || (cards?.length ?? 0)} cards available • Updated May 2025
            </p>
          </div>

          <CardsListingClient
            initialCards={(cards as CreditCard[]) || []}
            categories={(categories as Category[]) || []}
            currentFilters={{
              category: (params.category as string) || 'all',
              bank: (params.bank as string) || '',
              q: (params.q as string) || '',
              sort: sortBy,
              lifetime_free: params.lifetime_free === 'true',
            }}
          />
        </div>
      </main>
      <Footer />
    </>
  );
}
