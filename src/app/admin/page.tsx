import { createClient } from '@/lib/supabase/server';
import { CreditCard, MousePointerClick, TrendingUp } from 'lucide-react';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default async function AdminDashboardPage() {
  const supabase = await createClient();

  // Fetch quick stats
  const { count: cardsCount } = await supabase
    .from('credit_cards')
    .select('*', { count: 'exact', head: true });

  const { count: clicksCount } = await supabase
    .from('click_events')
    .select('*', { count: 'exact', head: true });

  // Get recent clicks
  const { data: recentClicks } = await supabase
    .from('click_events')
    .select('id, card_name, clicked_at')
    .order('clicked_at', { ascending: false })
    .limit(5);

  return (
    <div className="max-w-6xl">
      <h1 className="text-3xl font-bold text-white mb-8">Dashboard Overview</h1>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-zinc-400">Total Cards</h3>
            <div className="w-10 h-10 rounded-full bg-emerald-500/10 flex items-center justify-center">
              <CreditCard className="w-5 h-5 text-emerald-500" />
            </div>
          </div>
          <p className="text-3xl font-bold text-white">{cardsCount || 0}</p>
        </div>

        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-zinc-400">Total Affiliate Clicks</h3>
            <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center">
              <MousePointerClick className="w-5 h-5 text-blue-500" />
            </div>
          </div>
          <p className="text-3xl font-bold text-white">{clicksCount || 0}</p>
        </div>

        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 shadow-sm flex flex-col justify-center items-center text-center">
          <TrendingUp className="w-8 h-8 text-zinc-600 mb-3" />
          <p className="text-sm text-zinc-400">Detailed analytics coming soon in Phase 4.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Quick Actions */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden">
          <div className="px-6 py-5 border-b border-zinc-800">
            <h2 className="text-lg font-bold text-white">Quick Actions</h2>
          </div>
          <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Link href="/admin/cards/new" className="flex flex-col items-center justify-center p-6 bg-zinc-950 border border-zinc-800 rounded-lg hover:border-emerald-500/50 hover:bg-emerald-500/5 transition-all group">
              <CreditCard className="w-8 h-8 text-zinc-500 group-hover:text-emerald-400 mb-3 transition-colors" />
              <span className="text-sm font-medium text-zinc-300 group-hover:text-white transition-colors">Add New Card</span>
            </Link>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden">
          <div className="px-6 py-5 border-b border-zinc-800 flex justify-between items-center">
            <h2 className="text-lg font-bold text-white">Recent Clicks</h2>
            <Link href="/admin/analytics" className="text-xs font-medium text-emerald-400 hover:text-emerald-300">View All</Link>
          </div>
          <div className="divide-y divide-zinc-800">
            {recentClicks && recentClicks.length > 0 ? (
              recentClicks.map((click) => (
                <div key={click.id} className="px-6 py-4 flex justify-between items-center">
                  <div>
                    <p className="text-sm font-medium text-white">{click.card_name}</p>
                    <p className="text-xs text-zinc-500">User clicked Apply Now</p>
                  </div>
                  <div className="text-xs text-zinc-400 whitespace-nowrap">
                    {new Date(click.clicked_at).toLocaleDateString()}
                  </div>
                </div>
              ))
            ) : (
              <div className="px-6 py-8 text-center text-zinc-500 text-sm">
                No click activity yet.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
