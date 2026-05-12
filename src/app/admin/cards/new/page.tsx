import { saveCard } from '../actions';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function NewCardPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <Link href="/admin/cards" className="inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-white transition-colors mb-6">
        <ArrowLeft className="w-4 h-4" /> Back to Cards
      </Link>
      
      <h1 className="text-3xl font-bold text-white mb-8">Add New Credit Card</h1>

      <form action={saveCard} className="space-y-8 bg-zinc-900 border border-zinc-800 p-8 rounded-xl shadow-sm">
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-1">Card Name *</label>
            <input type="text" name="name" required className="w-full px-4 py-2 bg-zinc-950 border border-zinc-700 rounded-lg text-white focus:ring-emerald-500 focus:border-emerald-500" placeholder="e.g. HDFC Regalia" />
          </div>
          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-1">URL Slug *</label>
            <input type="text" name="slug" required className="w-full px-4 py-2 bg-zinc-950 border border-zinc-700 rounded-lg text-white focus:ring-emerald-500 focus:border-emerald-500" placeholder="e.g. hdfc-regalia" />
          </div>
          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-1">Bank Name *</label>
            <input type="text" name="bank_name" required className="w-full px-4 py-2 bg-zinc-950 border border-zinc-700 rounded-lg text-white focus:ring-emerald-500 focus:border-emerald-500" placeholder="e.g. HDFC Bank" />
          </div>
          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-1">Card Image URL</label>
            <input type="url" name="card_image_url" className="w-full px-4 py-2 bg-zinc-950 border border-zinc-700 rounded-lg text-white focus:ring-emerald-500 focus:border-emerald-500" placeholder="https://..." />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-zinc-300 mb-1">Affiliate URL (The "Apply Now" link) *</label>
            <input type="url" name="affiliate_url" required className="w-full px-4 py-2 bg-zinc-950 border border-zinc-700 rounded-lg text-white focus:ring-emerald-500 focus:border-emerald-500" placeholder="https://tracking.affiliate.com/..." />
          </div>
        </div>

        <div className="border-t border-zinc-800 pt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <h2 className="text-xl font-bold text-white md:col-span-2 mb-2">Fees & Eligibility</h2>
          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-1">Joining Fee (₹)</label>
            <input type="number" name="joining_fee" defaultValue="0" className="w-full px-4 py-2 bg-zinc-950 border border-zinc-700 rounded-lg text-white focus:ring-emerald-500 focus:border-emerald-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-1">Annual Fee (₹)</label>
            <input type="number" name="annual_fee" defaultValue="0" className="w-full px-4 py-2 bg-zinc-950 border border-zinc-700 rounded-lg text-white focus:ring-emerald-500 focus:border-emerald-500" />
          </div>
          <div className="flex items-center">
            <input type="checkbox" name="is_lifetime_free" id="ltf" className="w-4 h-4 text-emerald-500 bg-zinc-950 border-zinc-700 rounded focus:ring-emerald-500" />
            <label htmlFor="ltf" className="ml-2 text-sm font-medium text-zinc-300">Is Lifetime Free?</label>
          </div>
          <div className="flex items-center">
            <input type="checkbox" name="is_featured" id="feat" className="w-4 h-4 text-emerald-500 bg-zinc-950 border-zinc-700 rounded focus:ring-emerald-500" />
            <label htmlFor="feat" className="ml-2 text-sm font-medium text-zinc-300">Feature on Homepage?</label>
          </div>
          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-1">Min. Monthly Income (₹)</label>
            <input type="number" name="min_income_monthly" className="w-full px-4 py-2 bg-zinc-950 border border-zinc-700 rounded-lg text-white focus:ring-emerald-500 focus:border-emerald-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-1">Min. Credit Score</label>
            <input type="number" name="min_credit_score" defaultValue="750" className="w-full px-4 py-2 bg-zinc-950 border border-zinc-700 rounded-lg text-white focus:ring-emerald-500 focus:border-emerald-500" />
          </div>
        </div>

        <div className="border-t border-zinc-800 pt-8 grid grid-cols-1 gap-6">
          <h2 className="text-xl font-bold text-white mb-2">Features & Content</h2>
          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-1">Categories (comma separated)</label>
            <input type="text" name="categories" defaultValue="cashback, shopping" className="w-full px-4 py-2 bg-zinc-950 border border-zinc-700 rounded-lg text-white focus:ring-emerald-500 focus:border-emerald-500" placeholder="cashback, travel, premium" />
          </div>
          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-1">Pros (one per line)</label>
            <textarea name="pros" rows={4} className="w-full px-4 py-2 bg-zinc-950 border border-zinc-700 rounded-lg text-white focus:ring-emerald-500 focus:border-emerald-500" placeholder="5% cashback on Amazon..."></textarea>
          </div>
          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-1">Cons (one per line)</label>
            <textarea name="cons" rows={4} className="w-full px-4 py-2 bg-zinc-950 border border-zinc-700 rounded-lg text-white focus:ring-emerald-500 focus:border-emerald-500" placeholder="High annual fee..."></textarea>
          </div>
        </div>

        <div className="pt-4 flex justify-end gap-4">
          <Link href="/admin/cards" className="px-6 py-2.5 rounded-lg font-medium text-zinc-300 hover:text-white transition-colors">Cancel</Link>
          <button type="submit" className="px-6 py-2.5 bg-emerald-500 text-zinc-950 rounded-lg font-bold hover:bg-emerald-400 transition-colors">Save Card</button>
        </div>
      </form>
    </div>
  );
}
