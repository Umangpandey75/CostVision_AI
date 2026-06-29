import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const isValidKey = supabaseAnonKey && supabaseAnonKey.startsWith('eyJ');

let supabase;

if (!supabaseUrl || !isValidKey) {
  console.warn('Supabase credentials missing or invalid. Audits will not be persisted.');

  supabase = {
    from: () => ({
      upsert: async () => ({ error: null }),
      insert: async () => ({ data: null, error: null }),
      select: () => ({
        eq: () => ({
          single: async () => ({ data: null, error: { code: 'PGRST116' } })
        })
      }),
      update: () => ({ eq: () => {} })
    }),
    rpc: () => 0
  };
} else {
  supabase = createClient(supabaseUrl, supabaseAnonKey);
}

export { supabase };