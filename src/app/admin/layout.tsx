import { ReactNode } from 'react';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { LayoutDashboard, CreditCard, LogOut, Tags, TrendingUp } from 'lucide-react';
import { revalidatePath } from 'next/cache';

export default async function AdminLayout({ children }: { children: ReactNode }) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/admin/login');
  }

  const signOut = async () => {
    'use server';
    const supabase = await createClient();
    await supabase.auth.signOut();
    revalidatePath('/', 'layout');
    redirect('/admin/login');
  };

  return (
    <div className="min-h-screen bg-zinc-950 flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-zinc-900 border-r border-zinc-800 flex flex-col flex-shrink-0">
        <div className="h-16 flex items-center px-6 border-b border-zinc-800">
          <span className="text-xl font-bold text-white tracking-tight">Admin<span className="text-emerald-500">Panel</span></span>
        </div>
        
        <div className="flex-1 overflow-y-auto py-6 flex flex-col gap-1 px-4">
          <Link href="/admin" className="flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors">
            <LayoutDashboard className="w-5 h-5" />
            Dashboard
          </Link>
          <Link href="/admin/cards" className="flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors">
            <CreditCard className="w-5 h-5" />
            Manage Cards
          </Link>
          <Link href="/admin/categories" className="flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors">
            <Tags className="w-5 h-5" />
            Manage Categories
          </Link>
          <Link href="/admin/analytics" className="flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors">
            <TrendingUp className="w-5 h-5" />
            Click Analytics
          </Link>
        </div>

        <div className="p-4 border-t border-zinc-800">
          <div className="mb-4 px-2">
            <p className="text-xs text-zinc-500 font-medium uppercase tracking-wider mb-1">Logged in as</p>
            <p className="text-sm text-zinc-300 truncate">{user.email}</p>
          </div>
          <form action={signOut}>
            <button type="submit" className="flex w-full items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium text-zinc-400 hover:text-red-400 hover:bg-red-500/10 transition-colors">
              <LogOut className="w-5 h-5" />
              Sign Out
            </button>
          </form>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <div className="flex-1 overflow-y-auto p-6 md:p-10">
          {children}
        </div>
      </main>
    </div>
  );
}
