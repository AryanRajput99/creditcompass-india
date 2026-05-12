import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { CreditCard, ShieldAlert } from 'lucide-react';
import Link from 'next/link';
import { revalidatePath } from 'next/cache';

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ message: string }>;
}) {
  const params = await searchParams;
  const message = params.message;
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    return redirect('/admin');
  }

  const signIn = async (formData: FormData) => {
    'use server';

    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const supabase = await createClient();

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return redirect('/admin/login?message=Could not authenticate user');
    }

    revalidatePath('/', 'layout');
    return redirect('/admin');
  };

  return (
    <div className="min-h-screen bg-zinc-950 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <Link href="/" className="flex justify-center items-center gap-2 mb-6">
          <div className="w-10 h-10 rounded bg-zinc-900 border border-zinc-800 flex items-center justify-center">
            <CreditCard className="w-5 h-5 text-zinc-100" />
          </div>
          <span className="font-bold text-2xl tracking-tight text-white">CreditCompass</span>
        </Link>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
          Admin Dashboard
        </h2>
        <p className="mt-2 text-center text-sm text-zinc-400">
          Sign in to manage inventory and view revenue analytics.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-zinc-900 py-8 px-4 shadow sm:rounded-lg sm:px-10 border border-zinc-800">
          
          {message && (
            <div className="mb-6 p-4 rounded-md bg-red-500/10 border border-red-500/20 flex items-start gap-3">
              <ShieldAlert className="w-5 h-5 text-red-400 flex-shrink-0" />
              <p className="text-sm text-red-400 font-medium">{message}</p>
            </div>
          )}

          <form className="space-y-6" action={signIn}>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-zinc-300"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="appearance-none block w-full px-3 py-2 border border-zinc-700 bg-zinc-950 rounded-md shadow-sm placeholder-zinc-500 text-white focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm transition-colors"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-zinc-300"
              >
                Password
              </label>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="appearance-none block w-full px-3 py-2 border border-zinc-700 bg-zinc-950 rounded-md shadow-sm placeholder-zinc-500 text-white focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm transition-colors"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-zinc-950 bg-emerald-500 hover:bg-emerald-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-colors"
              >
                Sign in
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
