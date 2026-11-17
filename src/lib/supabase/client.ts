import { createBrowserClient } from "@supabase/ssr";

// Browser-side Supabase client. Keys come from Vercel's environment
// variables, set automatically by the Supabase integration.
export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    (process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)!,
  );
}
