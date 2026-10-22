import { createClient } from "@supabase/supabase-js";

// Real values are injected at build time via NEXT_PUBLIC_ env vars (set in the
// hosting dashboard). The placeholders only keep `createClient` from throwing
// during a build/prerender where the vars are absent — static pages that never
// touch Supabase can still be generated. At runtime in the browser the real
// inlined values are used, so auth and XP persistence work as expected.
const url = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder.supabase.co";
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "placeholder-anon-key";

export const supabase = createClient(url, anonKey, {
  auth: { flowType: "implicit", detectSessionInUrl: true, persistSession: true },
});
