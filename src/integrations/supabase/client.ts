
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://dhpqwxoxhkthssapkgsg.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRocHF3eG94aGt0aHNzYXBrZ3NnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDE5OTI1MjMsImV4cCI6MjA1NzU2ODUyM30.vJuGaEEE8Rn7HjCeM78oSZ95_LzyclrqqUPCKKrfUWI";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    storageKey: 'narrative-atelier-auth',
  },
});

export const getErrorMessage = (error: any): string => {
  if (typeof error === 'string') return error;
  return error?.message || error?.error_description || error?.error || 'An unknown error occurred';
};
