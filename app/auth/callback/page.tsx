"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function AuthCallback() {
  const router = useRouter();

  useEffect(() => {
    const { data: listener } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_IN" && session) {
        router.push("/topic/cornea");
      }
    });

    // Fallback: check after short delay for session already in storage
    const timer = setTimeout(async () => {
      const { data } = await supabase.auth.getSession();
      if (data.session) {
        router.push("/topic/cornea");
      } else {
        // No session found — go back to auth
        router.push("/auth");
      }
    }, 3000);

    return () => {
      listener.subscription.unsubscribe();
      clearTimeout(timer);
    };
  }, [router]);

  return (
    <main className="min-h-screen bg-slate-950 text-white flex items-center justify-center">
      <div className="text-center">
        <p className="text-3xl mb-4">🏰</p>
        <p className="text-slate-400 animate-pulse">Signing you in...</p>
      </div>
    </main>
  );
}
