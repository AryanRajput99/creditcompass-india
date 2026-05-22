import { createClient } from '@/lib/supabase/server';
import Link from 'next/link';
import { Plus, Edit, Trash2, ExternalLink } from 'lucide-react';
import { formatRupee } from '@/lib/utils';
import { revalidatePath } from 'next/cache';

export const dynamic = 'force-dynamic';

export default async function AdminCardsPage() {
  const supabase = await createClient();

  const { data: cards } = await supabase
    .from('credit_cards')
    .select('id, name, bank_name, joining_fee, annual_fee, affiliate_url, is_featured')
    .order('created_at', { ascending: false });

  // Delete Action
  const deleteCard = async (formData: FormData) => {
    'use server';
    const id = formData.get('id') as string;
    const supabase = await createClient();
    await supabase.from('credit_cards').delete().eq('id', id);
    revalidatePath('/admin/cards');
    revalidatePath('/cards'); // Revalidate public pages
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Manage Cards</h1>
          <p className="text-zinc-400">View, edit, or remove credit cards from your inventory.</p>
        </div>
        <Link href="/admin/cards/new" className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-emerald-500 text-zinc-950 rounded-lg font-bold hover:bg-emerald-400 transition-colors">
          <Plus className="w-4 h-4" /> Add New Card
        </Link>
      </div>

      <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-zinc-950 border-b border-zinc-800 text-zinc-400 uppercase tracking-wider text-xs">
              <tr>
                <th scope="col" className="px-6 py-4 font-medium">Card Name</th>
                <th scope="col" className="px-6 py-4 font-medium">Bank</th>
                <th scope="col" className="px-6 py-4 font-medium">Joining Fee</th>
                <th scope="col" className="px-6 py-4 font-medium">Annual Fee</th>
                <th scope="col" className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800">
              {cards && cards.length > 0 ? (
                cards.map((card) => (
                  <tr key={card.id} className="hover:bg-zinc-800/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-white">{card.name}</span>
                        {card.is_featured && (
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/10 text-emerald-400 uppercase border border-emerald-500/20">
                            Featured
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-zinc-300">{card.bank_name}</td>
                    <td className="px-6 py-4 text-zinc-300">
                      {card.joining_fee === 0 ? <span className="text-emerald-400">Free</span> : formatRupee(card.joining_fee)}
                    </td>
                    <td className="px-6 py-4 text-zinc-300">
                      {card.annual_fee === 0 ? <span className="text-emerald-400">Free</span> : formatRupee(card.annual_fee)}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-3">
                        {card.affiliate_url && (
                          <a href={card.affiliate_url} target="_blank" rel="noopener noreferrer" className="text-zinc-500 hover:text-blue-400 transition-colors" title="Test Affiliate Link">
                            <ExternalLink className="w-4 h-4" />
                          </a>
                        )}
                        <Link href={`/admin/cards/${card.id}/edit`} className="text-zinc-500 hover:text-emerald-400 transition-colors" title="Edit Card">
                          <Edit className="w-4 h-4" />
                        </Link>
                        <form action={deleteCard}>
                          <input type="hidden" name="id" value={card.id} />
                          <button type="submit" className="text-zinc-500 hover:text-red-400 transition-colors" title="Delete Card" onClick={(e) => {
                            if(!confirm('Are you sure you want to delete this card?')) e.preventDefault();
                          }}>
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </form>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-zinc-500">
                    No credit cards found. Click &ldquo;Add New Card&rdquo; to get started.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
