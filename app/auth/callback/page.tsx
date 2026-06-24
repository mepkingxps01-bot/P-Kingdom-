"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function AuthCallback() {
  const router = useRouter();

  useEffect(() => {
    const hash = window.location.hash;

    if (hash) {
      const params = new URLSearchParams(hash.substring(1));
      const accessToken = params.get("access_token");
      const refreshToken = params.get("refresh_token");

      if (accessToken && refreshToken) {
        supabase.auth.setSession({ access_token: accessToken, refresh_token: refreshToken })
          .then(({ data }) => {
            if (data.session) router.push("/topic/cornea");
            else router.push("/auth");
          });
        return;
      }
    }

    // No hash — check if session already exists
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) router.push("/topic/cornea");
      else router.push("/auth");
    });
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
