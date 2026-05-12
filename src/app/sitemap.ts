import { MetadataRoute } from 'next';
import { createClient } from '@/lib/supabase/server';

// Generates /sitemap.xml — submitted to Google Search Console
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://creditcompass.in';
  const supabase = await createClient();

  // Fetch all active card slugs
  const { data: cards } = await supabase
    .from('credit_cards')
    .select('slug, updated_at')
    .eq('is_active', true)
    .order('sort_order', { ascending: true });

  // Fetch all categories
  const { data: categories } = await supabase
    .from('categories')
    .select('name, updated_at');

  const cardUrls: MetadataRoute.Sitemap = (cards || []).map((card) => ({
    url: `${baseUrl}/cards/${card.slug}`,
    lastModified: card.updated_at ? new Date(card.updated_at) : new Date(),
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  const categoryUrls: MetadataRoute.Sitemap = (categories || []).map((cat) => ({
    url: `${baseUrl}/category/${cat.name}`,
    lastModified: cat.updated_at ? new Date(cat.updated_at) : new Date(),
    changeFrequency: 'weekly',
    priority: 0.9,
  }));

  const staticUrls: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/cards`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.95,
    },
    {
      url: `${baseUrl}/compare`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/affiliate-disclosure`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/privacy-policy`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/disclaimer`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.3,
    },
  ];

  return [...staticUrls, ...categoryUrls, ...cardUrls];
}
