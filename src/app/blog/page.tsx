import { Metadata } from 'next';
import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { BLOG_ARTICLES } from '@/data/blog-articles';
import { BookOpen, Clock, ChevronRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Credit Card Guides & Reviews — CreditCompass India Blog',
  description: 'Expert credit card guides, honest reviews, and tips in English and Hindi. Learn how to choose, apply and maximise your credit card rewards in India.',
};

const CATEGORY_LABELS: Record<string, string> = {
  guide: 'Guide',
  review: 'Review',
  comparison: 'Comparison',
  hindi: 'हिंदी',
  news: 'News',
};

const CATEGORY_COLORS: Record<string, string> = {
  guide: 'bg-blue-50 text-blue-700 border border-blue-100',
  review: 'bg-purple-50 text-purple-700 border border-purple-100',
  comparison: 'bg-amber-50 text-amber-700 border border-amber-100',
  hindi: 'bg-orange-50 text-orange-700 border border-orange-100',
  news: 'bg-emerald-50 text-emerald-700 border border-emerald-100',
};

export default function BlogPage() {
  const hindiArticles = BLOG_ARTICLES.filter((a) => a.language === 'hi');
  const englishArticles = BLOG_ARTICLES.filter((a) => a.language === 'en');

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[hsl(var(--color-bg))] pt-20">
        {/* Hero */}
        <section className="py-16 border-b border-[hsl(var(--color-border))]">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-[11px] font-bold uppercase tracking-widest mb-6">
              <BookOpen className="w-3.5 h-3.5" /> Expert Guides · हिंदी में भी
            </div>
            <h1 className="text-4xl md:text-6xl font-black text-[hsl(var(--color-text))] tracking-tight mb-4">
              Credit Card <span className="text-[hsl(var(--color-primary))]">Guides</span>
            </h1>
            <p className="text-lg text-[hsl(var(--color-text-secondary))] max-w-2xl mx-auto font-medium">
              Honest reviews, how-to guides, and tips in English & Hindi. No jargon, no bias.
            </p>
          </div>
        </section>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
          {/* Hindi Section */}
          <section>
            <div className="flex items-center gap-3 mb-8">
              <div className="w-8 h-8 rounded-lg bg-orange-100 flex items-center justify-center text-lg">🇮🇳</div>
              <h2 className="text-2xl font-extrabold text-[hsl(var(--color-text))]">हिंदी गाइड्स</h2>
              <span className="text-sm font-medium text-[hsl(var(--color-text-secondary))] ml-auto">{hindiArticles.length} articles</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {hindiArticles.map((article) => (
                <ArticleCard key={article.slug} article={article} />
              ))}
            </div>
          </section>

          {/* English Section */}
          <section>
            <div className="flex items-center gap-3 mb-8">
              <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center text-lg">📖</div>
              <h2 className="text-2xl font-extrabold text-[hsl(var(--color-text))]">English Guides & Reviews</h2>
              <span className="text-sm font-medium text-[hsl(var(--color-text-secondary))] ml-auto">{englishArticles.length} articles</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {englishArticles.map((article) => (
                <ArticleCard key={article.slug} article={article} />
              ))}
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}

function ArticleCard({ article }: { article: (typeof BLOG_ARTICLES)[0] }) {
  return (
    <Link
      href={`/blog/${article.slug}`}
      className="group bg-[hsl(var(--color-bg))] border border-[hsl(var(--color-border))] rounded-2xl p-6 hover:border-[hsl(var(--color-primary))] hover:shadow-lg transition-all block"
    >
      <div className="flex items-start justify-between gap-4 mb-4">
        <span className="text-3xl">{article.heroEmoji}</span>
        <span className={`text-[10px] font-extrabold uppercase tracking-widest px-2.5 py-1 rounded-full ${CATEGORY_COLORS[article.category]}`}>
          {CATEGORY_LABELS[article.category]}
        </span>
      </div>
      <h3 className="font-bold text-[hsl(var(--color-text))] text-lg leading-snug mb-3 group-hover:text-[hsl(var(--color-primary))] transition-colors line-clamp-2">
        {article.title}
      </h3>
      <p className="text-sm text-[hsl(var(--color-text-secondary))] font-medium leading-relaxed mb-4 line-clamp-2">
        {article.excerpt}
      </p>
      <div className="flex items-center justify-between text-[11px] text-[hsl(var(--color-text-tertiary))] font-bold uppercase tracking-wider">
        <div className="flex items-center gap-1.5">
          <Clock className="w-3 h-3" />
          {article.readTimeMinutes} min read
        </div>
        <div className="flex items-center gap-1 group-hover:text-[hsl(var(--color-primary))] transition-colors">
          Read <ChevronRight className="w-3.5 h-3.5" />
        </div>
      </div>
    </Link>
  );
}
