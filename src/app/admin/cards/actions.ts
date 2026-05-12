'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function saveCard(formData: FormData) {
  const supabase = await createClient();
  const id = formData.get('id') as string;
  const isEditing = !!id;

  // Extract all fields
  const name = formData.get('name') as string;
  const slug = formData.get('slug') as string;
  const bank_name = formData.get('bank_name') as string;
  const affiliate_url = formData.get('affiliate_url') as string;
  const card_image_url = formData.get('card_image_url') as string;
  const joining_fee = parseInt(formData.get('joining_fee') as string) || 0;
  const annual_fee = parseInt(formData.get('annual_fee') as string) || 0;
  const is_lifetime_free = formData.get('is_lifetime_free') === 'on';
  const min_income_monthly = parseInt(formData.get('min_income_monthly') as string) || null;
  const min_credit_score = parseInt(formData.get('min_credit_score') as string) || null;
  const is_featured = formData.get('is_featured') === 'on';

  // Arrays need special handling (comma separated strings from a single text input for simplicity)
  const categoriesRaw = formData.get('categories') as string;
  const categories = categoriesRaw ? categoriesRaw.split(',').map(c => c.trim()) : [];

  const prosRaw = formData.get('pros') as string;
  const pros = prosRaw ? prosRaw.split('\n').map(p => p.trim()).filter(Boolean) : [];

  const consRaw = formData.get('cons') as string;
  const cons = consRaw ? consRaw.split('\n').map(c => c.trim()).filter(Boolean) : [];

  const payload = {
    name,
    slug,
    bank_name,
    affiliate_url,
    card_image_url: card_image_url || null,
    joining_fee,
    annual_fee,
    is_lifetime_free,
    min_income_monthly,
    min_credit_score,
    is_featured,
    categories,
    pros,
    cons,
    // Add other fields as necessary from the form, keeping it simple for now
  };

  if (isEditing) {
    const { error } = await supabase
      .from('credit_cards')
      .update(payload)
      .eq('id', id);
    if (error) throw new Error(error.message);
  } else {
    const { error } = await supabase
      .from('credit_cards')
      .insert([payload]);
    if (error) throw new Error(error.message);
  }

  revalidatePath('/admin/cards');
  revalidatePath('/cards');
  revalidatePath('/');
  redirect('/admin/cards');
}
