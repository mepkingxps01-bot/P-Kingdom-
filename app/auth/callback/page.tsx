"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function AuthCallback() {
  const router = useRouter();

  useEffect(() => {
    // Give Supabase 1 second to auto-detect the hash and store the session
    const timer = setTimeout(async () => {
      const { data } = await supabase.auth.getSession();
      if (data.session) {
        router.push("/topic/cornea");
      } else {
        router.push("/auth");
      }
    }, 1000);

    return () => clearTimeout(timer);
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
