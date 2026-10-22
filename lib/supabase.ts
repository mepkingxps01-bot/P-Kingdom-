import { createClient } from "@supabase/supabase-js";

// Real values are injected at build time via NEXT_PUBLIC_ env vars (set in the
// hosting dashboard). The placeholders only keep `createClient` from throwing
// during a build/prerender where the vars are absent — static pages that never
// touch Supabase can still be generated. At runtime in the browser the real
// inlined values are used, so auth and XP persistence work as expected.
// Accounts (login gate + per-user XP) turn on ONLY when both are true:
//   1. the real Supabase keys are present, AND
//   2. NEXT_PUBLIC_ENABLE_ACCOUNTS === "true" is set explicitly.
// By default the app runs in "open" mode (no login gate, XP under a shared
// code — exactly like the pre-accounts version), so every book is visible and
// nothing is gated. Flip the flag only after Email auth is enabled and the RLS
// SQL has been run in Supabase.
const hasKeys = Boolean(
  process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);
export const accountsEnabled =
  hasKeys && process.env.NEXT_PUBLIC_ENABLE_ACCOUNTS === "true";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder.supabase.co";
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "placeholder-anon-key";

export const supabase = createClient(url, anonKey, {
  auth: { flowType: "implicit", detectSessionInUrl: true, persistSession: true },
});
