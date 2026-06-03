import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

async function main() {
  const { data, error } = await supabase
    .from('credit_cards')
    .update({ joining_fee: 5999, annual_fee: 5999 })
    .eq('name', 'IDFC First Mayura Credit Card')
    .select();

  if (error) {
    console.error("Update failed:", error.message);
  } else {
    console.log("Update successful. New data:", data);
  }
}

main();
