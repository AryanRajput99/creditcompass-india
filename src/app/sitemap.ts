import { MetadataRoute } from 'next';
import { createClient } from '@/lib/supabase/server';
import { getMonetizedSlugs } from '@/lib/monetization';
import { BLOG_ARTICLES } from '@/data/blog-articles';

// Generates /sitemap.xml — submitted to Google Search Console
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://creditcompass-india.vercel.app';
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

  // Individual card pages
  const cardUrls: MetadataRoute.Sitemap = (cards || []).map((card) => ({
    url: `${baseUrl}/cards/${card.slug}`,
    lastModified: card.updated_at ? new Date(card.updated_at) : new Date(),
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  // Category pages
  const categoryUrls: MetadataRoute.Sitemap = (categories || []).map((cat) => ({
    url: `${baseUrl}/category/${cat.name}`,
    lastModified: cat.updated_at ? new Date(cat.updated_at) : new Date(),
    changeFrequency: 'weekly',
    priority: 0.9,
  }));

  // Blog article pages
  const blogUrls: MetadataRoute.Sitemap = BLOG_ARTICLES.map((article) => ({
    url: `${baseUrl}/blog/${article.slug}`,
    lastModified: new Date(article.publishedAt),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  // Programmatic SEO: Card vs Card comparison pages
  const monetizedSlugs = getMonetizedSlugs();
  const comparisonUrls: MetadataRoute.Sitemap = [];
  for (let i = 0; i < monetizedSlugs.length; i++) {
    for (let j = i + 1; j < monetizedSlugs.length; j++) {
      comparisonUrls.push({
        url: `${baseUrl}/compare/${monetizedSlugs[i]}-vs-${monetizedSlugs[j]}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.6,
      });
    }
  }

  // Static pages
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
      url: `${baseUrl}/best-earning-offers`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.85,
    },
    {
      url: `${baseUrl}/rupay-upi-cards`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/quiz`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.75,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
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
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
  ];

  return [...staticUrls, ...categoryUrls, ...cardUrls, ...blogUrls, ...comparisonUrls];
}
