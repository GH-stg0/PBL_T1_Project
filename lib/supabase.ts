import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase URL or Anon Key. Check .env.local');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Ensure there is at least an anonymous session for public reads.
export async function ensureAnonSession() {
  if (typeof window === 'undefined') return;

  const { data, error } = await supabase.auth.getSession();
  if (error) throw error;

  if (!data.session) {
    const { error: anonError } = await supabase.auth.signInAnonymously();
    if (anonError) throw anonError;
  }
}
