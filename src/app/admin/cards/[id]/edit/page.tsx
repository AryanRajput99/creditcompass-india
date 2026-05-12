import { saveCard } from '../../actions';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { createClient } from '@/lib/supabase/server';
import { notFound } from 'next/navigation';

export default async function EditCardPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = await params;
  const id = resolvedParams.id;
  const supabase = await createClient();

  const { data: card } = await supabase
    .from('credit_cards')
    .select('*')
    .eq('id', id)
    .single();

  if (!card) {
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto">
      <Link href="/admin/cards" className="inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-white transition-colors mb-6">
        <ArrowLeft className="w-4 h-4" /> Back to Cards
      </Link>
      
      <h1 className="text-3xl font-bold text-white mb-8">Edit Credit Card</h1>

      <form action={saveCard} className="space-y-8 bg-zinc-900 border border-zinc-800 p-8 rounded-xl shadow-sm">
        <input type="hidden" name="id" value={card.id} />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-1">Card Name *</label>
            <input type="text" name="name" defaultValue={card.name} required className="w-full px-4 py-2 bg-zinc-950 border border-zinc-700 rounded-lg text-white focus:ring-emerald-500 focus:border-emerald-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-1">URL Slug *</label>
            <input type="text" name="slug" defaultValue={card.slug} required className="w-full px-4 py-2 bg-zinc-950 border border-zinc-700 rounded-lg text-white focus:ring-emerald-500 focus:border-emerald-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-1">Bank Name *</label>
            <input type="text" name="bank_name" defaultValue={card.bank_name} required className="w-full px-4 py-2 bg-zinc-950 border border-zinc-700 rounded-lg text-white focus:ring-emerald-500 focus:border-emerald-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-1">Card Image URL</label>
            <input type="url" name="card_image_url" defaultValue={card.card_image_url || ''} className="w-full px-4 py-2 bg-zinc-950 border border-zinc-700 rounded-lg text-white focus:ring-emerald-500 focus:border-emerald-500" />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-zinc-300 mb-1">Affiliate URL *</label>
            <input type="url" name="affiliate_url" defaultValue={card.affiliate_url} required className="w-full px-4 py-2 bg-zinc-950 border border-zinc-700 rounded-lg text-white focus:ring-emerald-500 focus:border-emerald-500" />
          </div>
        </div>

        <div className="border-t border-zinc-800 pt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <h2 className="text-xl font-bold text-white md:col-span-2 mb-2">Fees & Eligibility</h2>
          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-1">Joining Fee (₹)</label>
            <input type="number" name="joining_fee" defaultValue={card.joining_fee} className="w-full px-4 py-2 bg-zinc-950 border border-zinc-700 rounded-lg text-white focus:ring-emerald-500 focus:border-emerald-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-1">Annual Fee (₹)</label>
            <input type="number" name="annual_fee" defaultValue={card.annual_fee} className="w-full px-4 py-2 bg-zinc-950 border border-zinc-700 rounded-lg text-white focus:ring-emerald-500 focus:border-emerald-500" />
          </div>
          <div className="flex items-center">
            <input type="checkbox" name="is_lifetime_free" defaultChecked={card.is_lifetime_free} id="ltf" className="w-4 h-4 text-emerald-500 bg-zinc-950 border-zinc-700 rounded focus:ring-emerald-500" />
            <label htmlFor="ltf" className="ml-2 text-sm font-medium text-zinc-300">Is Lifetime Free?</label>
          </div>
          <div className="flex items-center">
            <input type="checkbox" name="is_featured" defaultChecked={card.is_featured} id="feat" className="w-4 h-4 text-emerald-500 bg-zinc-950 border-zinc-700 rounded focus:ring-emerald-500" />
            <label htmlFor="feat" className="ml-2 text-sm font-medium text-zinc-300">Feature on Homepage?</label>
          </div>
          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-1">Min. Monthly Income (₹)</label>
            <input type="number" name="min_income_monthly" defaultValue={card.min_income_monthly || ''} className="w-full px-4 py-2 bg-zinc-950 border border-zinc-700 rounded-lg text-white focus:ring-emerald-500 focus:border-emerald-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-1">Min. Credit Score</label>
            <input type="number" name="min_credit_score" defaultValue={card.min_credit_score || ''} className="w-full px-4 py-2 bg-zinc-950 border border-zinc-700 rounded-lg text-white focus:ring-emerald-500 focus:border-emerald-500" />
          </div>
        </div>

        <div className="border-t border-zinc-800 pt-8 grid grid-cols-1 gap-6">
          <h2 className="text-xl font-bold text-white mb-2">Features & Content</h2>
          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-1">Categories (comma separated)</label>
            <input type="text" name="categories" defaultValue={(card.categories || []).join(', ')} className="w-full px-4 py-2 bg-zinc-950 border border-zinc-700 rounded-lg text-white focus:ring-emerald-500 focus:border-emerald-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-1">Pros (one per line)</label>
            <textarea name="pros" rows={4} defaultValue={(card.pros || []).join('\n')} className="w-full px-4 py-2 bg-zinc-950 border border-zinc-700 rounded-lg text-white focus:ring-emerald-500 focus:border-emerald-500"></textarea>
          </div>
          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-1">Cons (one per line)</label>
            <textarea name="cons" rows={4} defaultValue={(card.cons || []).join('\n')} className="w-full px-4 py-2 bg-zinc-950 border border-zinc-700 rounded-lg text-white focus:ring-emerald-500 focus:border-emerald-500"></textarea>
          </div>
        </div>

        <div className="pt-4 flex justify-end gap-4">
          <Link href="/admin/cards" className="px-6 py-2.5 rounded-lg font-medium text-zinc-300 hover:text-white transition-colors">Cancel</Link>
          <button type="submit" className="px-6 py-2.5 bg-emerald-500 text-zinc-950 rounded-lg font-bold hover:bg-emerald-400 transition-colors">Update Card</button>
        </div>
      </form>
    </div>
  );
}
