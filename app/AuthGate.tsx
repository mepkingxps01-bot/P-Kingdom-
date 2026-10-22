"use client";

import { useAuth } from "./AuthProvider";
import { LoginForm } from "./LoginForm";

export function AuthGate({ children }: { children: React.ReactNode }) {
  const { user, loading, configured } = useAuth();

  // Open mode (no Supabase keys configured): run the app without a login gate.
  if (!configured) return <>{children}</>;

  if (loading) {
    return (
      <main className="min-h-screen bg-slate-950 text-white flex items-center justify-center">
        <div className="h-6 w-6 animate-spin rounded-full border-2 border-slate-700 border-t-emerald-500" />
      </main>
    );
  }

  if (!user) return <LoginForm />;

  return <>{children}</>;
}
