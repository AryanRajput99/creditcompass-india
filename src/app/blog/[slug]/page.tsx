import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { BLOG_ARTICLES } from '@/data/blog-articles';
import { EARNKARO_OFFERS, getEarnKaroOffer } from '@/data/earnkaro-offers';
import { Clock, ArrowLeft, ExternalLink, BadgeIndianRupee } from 'lucide-react';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return BLOG_ARTICLES.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = BLOG_ARTICLES.find((a) => a.slug === slug);
  if (!article) return {};
  return {
    title: article.metaTitle,
    description: article.metaDescription,
    openGraph: {
      title: article.metaTitle,
      description: article.metaDescription,
      type: 'article',
      publishedTime: article.publishedAt,
    },
  };
}

export default async function BlogArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const article = BLOG_ARTICLES.find((a) => a.slug === slug);
  if (!article) notFound();

  // Dynamically import article content
  let ArticleContent: React.FC;
  try {
    const mod = await import(`@/data/blog-content/${slug}`);
    ArticleContent = mod.default;
  } catch {
    ArticleContent = DefaultContent;
  }

  const featuredOffers = article.featuredCardSlugs
    .map((s) => getEarnKaroOffer(s))
    .filter(Boolean) as typeof EARNKARO_OFFERS;

  const relatedArticles = BLOG_ARTICLES.filter(
    (a) => a.slug !== slug && a.language === article.language
  ).slice(0, 3);

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[hsl(var(--color-bg))] pt-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Back */}
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm font-bold text-[hsl(var(--color-text-secondary))] hover:text-[hsl(var(--color-primary))] transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Blog
          </Link>

          {/* Article Header */}
          <header className="mb-10">
            <div className="text-5xl mb-6">{article.heroEmoji}</div>
            <h1 className="text-3xl md:text-5xl font-black text-[hsl(var(--color-text))] tracking-tight leading-tight mb-4">
              {article.title}
            </h1>
            <div className="flex items-center gap-4 text-[12px] font-bold text-[hsl(var(--color-text-secondary))] uppercase tracking-widest">
              <div className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" /> {article.readTimeMinutes} min read
              </div>
              <span>·</span>
              <span>{new Date(article.publishedAt).toLocaleDateString('en-IN', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
              <span>·</span>
              <span className="text-[hsl(var(--color-primary))]">{article.language === 'hi' ? 'हिंदी' : 'English'}</span>
            </div>
          </header>

          {/* Article Body */}
          <div className="prose-article">
            <ArticleContent />
          </div>

          {/* Affiliate CTA Cards */}
          {featuredOffers.length > 0 && (
            <section className="mt-12 border-t border-[hsl(var(--color-border))] pt-10">
              <h2 className="text-xl font-extrabold text-[hsl(var(--color-text))] mb-6 flex items-center gap-2">
                <BadgeIndianRupee className="w-5 h-5 text-emerald-600" />
                {article.language === 'hi' ? 'Is Article Mein Bataye Gaye Cards — Apply Karo' : 'Cards Mentioned in This Article'}
              </h2>
              <div className="space-y-4">
                {featuredOffers.map((offer) => (
                  <div
                    key={offer.card_slug}
                    className="flex items-center justify-between gap-4 p-5 bg-[hsl(var(--color-bg-secondary))] border border-[hsl(var(--color-border))] rounded-2xl hover:border-emerald-400 transition-all"
                  >
                    <div>
                      <p className="font-bold text-[hsl(var(--color-text))]">{offer.card_name}</p>
                      <p className="text-sm text-[hsl(var(--color-text-secondary))] font-medium">{offer.bank_name}</p>
                      <p className="text-xs text-emerald-700 font-extrabold mt-1">
                        Earn ₹{offer.commission.toLocaleString('en-IN')} via EarnKaro on approval
                      </p>
                    </div>
                    <a
                      href={offer.earnkaro_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-shrink-0 inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold text-sm transition-all"
                    >
                      Apply <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                ))}
              </div>
              <p className="text-xs text-[hsl(var(--color-text-tertiary))] mt-4 font-medium">
                Affiliate Disclosure: We earn a commission when you apply via our links, at no extra cost to you.{' '}
                <Link href="/affiliate-disclosure" className="underline hover:text-[hsl(var(--color-primary))]">Learn more →</Link>
              </p>
            </section>
          )}

          {/* Related Articles */}
          {relatedArticles.length > 0 && (
            <section className="mt-12 border-t border-[hsl(var(--color-border))] pt-10">
              <h2 className="text-xl font-extrabold text-[hsl(var(--color-text))] mb-6">
                {article.language === 'hi' ? 'Aur Padho' : 'More Guides'}
              </h2>
              <div className="space-y-4">
                {relatedArticles.map((rel) => (
                  <Link
                    key={rel.slug}
                    href={`/blog/${rel.slug}`}
                    className="flex items-center gap-4 p-4 rounded-xl border border-[hsl(var(--color-border))] hover:border-[hsl(var(--color-primary))] transition-all group"
                  >
                    <span className="text-2xl">{rel.heroEmoji}</span>
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-[hsl(var(--color-text))] group-hover:text-[hsl(var(--color-primary))] transition-colors text-sm line-clamp-2">
                        {rel.title}
                      </p>
                      <p className="text-xs text-[hsl(var(--color-text-secondary))] font-medium mt-0.5">{rel.readTimeMinutes} min read</p>
                    </div>
                    <ArrowLeft className="w-4 h-4 rotate-180 text-[hsl(var(--color-text-tertiary))] group-hover:text-[hsl(var(--color-primary))] transition-colors flex-shrink-0" />
                  </Link>
                ))}
              </div>
            </section>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}

function DefaultContent() {
  return (
    <p className="text-[hsl(var(--color-text-secondary))] text-lg leading-relaxed">
      Content coming soon. Check back shortly!
    </p>
  );
}
