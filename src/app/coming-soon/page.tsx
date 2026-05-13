import { Metadata } from 'next';
import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { ArrowLeft, Clock, Wrench } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Coming Soon — CreditCompass India',
  description: 'We are working hard to bring this feature to you.',
};

export default function ComingSoonPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-[80vh] flex flex-col items-center justify-center bg-[hsl(var(--color-bg))] px-4">
        <div className="w-20 h-20 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mb-8 shadow-inner border border-blue-100">
          <Wrench className="w-10 h-10" />
        </div>
        
        <h1 className="text-4xl md:text-5xl font-black text-[hsl(var(--color-text))] tracking-tight mb-4 text-center">
          Building Something <span className="text-[hsl(var(--color-primary))]">Awesome</span>
        </h1>
        
        <p className="text-lg text-[hsl(var(--color-text-secondary))] max-w-lg text-center mb-10 leading-relaxed font-medium">
          We are currently working on this feature to bring you the best financial tools. Check back soon!
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            href="/cards"
            className="btn-base btn-apply px-8 py-3.5 text-base shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5"
          >
            Browse Credit Cards
          </Link>
          <Link
            href="/"
            className="btn-base bg-white border border-[hsl(var(--color-border))] text-[hsl(var(--color-text))] px-8 py-3.5 text-base hover:border-[hsl(var(--color-primary))] hover:text-[hsl(var(--color-primary))] transition-colors group"
          >
            <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
