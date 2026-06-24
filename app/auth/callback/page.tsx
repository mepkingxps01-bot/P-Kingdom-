"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function AuthCallback() {
  const router = useRouter();

  useEffect(() => {
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) router.push("/topic/cornea");
    });

    supabase.auth.getSession().then(({ data }) => {
      if (data.session) router.push("/topic/cornea");
    });

    return () => listener.subscription.unsubscribe();
  }, [router]);

  return (
    <main className="min-h-screen bg-slate-950 text-white flex items-center justify-center">
      <p className="text-slate-400 animate-pulse">Signing you in...</p>
    </main>
  );
}
