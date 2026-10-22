"use client";

import { createContext, useContext, useEffect, useState } from "react";
import type { Session, User } from "@supabase/supabase-js";
import { supabase, accountsEnabled } from "@/lib/supabase";

// Fallback id used in "open" mode (Supabase not configured): behaves like the
// pre-accounts shared code so XP still persists and nothing breaks.
const OPEN_MODE_UID = "A1";

type AuthState = {
  user: User | null;
  loading: boolean;
  configured: boolean;
  // The id to key XP on: the signed-in user's id when accounts are active,
  // otherwise the shared open-mode code.
  uid: string | null;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthState>({
  user: null,
  loading: true,
  configured: accountsEnabled,
  uid: accountsEnabled ? null : OPEN_MODE_UID,
  signOut: async () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(accountsEnabled);

  useEffect(() => {
    // Open mode: no auth system to query; render the app for everyone.
    if (!accountsEnabled) return;

    let mounted = true;

    supabase.auth.getSession().then(({ data }: { data: { session: Session | null } }) => {
      if (!mounted) return;
      setUser(data.session?.user ?? null);
      setLoading(false);
    });

    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => {
      mounted = false;
      sub.subscription.unsubscribe();
    };
  }, []);

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  const uid = accountsEnabled ? (user?.id ?? null) : OPEN_MODE_UID;

  return (
    <AuthContext.Provider value={{ user, loading, configured: accountsEnabled, uid, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
