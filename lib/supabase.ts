import { createClient } from "@supabase/supabase-js";

// Real values are injected at build time via NEXT_PUBLIC_ env vars (set in the
// hosting dashboard). The placeholders only keep `createClient` from throwing
// during a build/prerender where the vars are absent — static pages that never
// touch Supabase can still be generated. At runtime in the browser the real
// inlined values are used, so auth and XP persistence work as expected.
// True only when BOTH real Supabase env vars are present at build time. When
// false (e.g. a deploy without the keys set yet), the app runs in "open" mode:
// no login gate, XP saved under a shared code — exactly like the pre-accounts
// version — so the live site never breaks. Accounts activate automatically once
// the real NEXT_PUBLIC_SUPABASE_* vars are configured.
export const isSupabaseConfigured = Boolean(
  process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

const url = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder.supabase.co";
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "placeholder-anon-key";

export const supabase = createClient(url, anonKey, {
  auth: { flowType: "implicit", detectSessionInUrl: true, persistSession: true },
});
