"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function AuthPage() {
  const [email, setEmail] = useState("mepkingxps.01@gmail.com");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const sendLink = async () => {
    setLoading(true);
    await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: `${window.location.origin}/auth/callback` },
    });
    setSent(true);
    setLoading(false);
  };

  if (sent) return (
    <main className="min-h-screen bg-slate-950 text-white flex items-center justify-center px-6">
      <div className="text-center max-w-sm">
        <p className="text-4xl mb-4">📬</p>
        <p className="text-lg font-semibold mb-2">Check your email</p>
        <p className="text-sm text-slate-400">We sent a magic link to <span className="text-cyan-400">{email}</span>.<br/>Click it to enter your kingdom.</p>
      </div>
    </main>
  );

  return (
    <main className="min-h-screen bg-slate-950 text-white flex items-center justify-center px-6">
      <div className="w-full max-w-sm text-center">
        <p className="text-5xl mb-4">🏰</p>
        <h1 className="text-2xl font-bold mb-2">P-Kingdom</h1>
        <p className="text-sm text-slate-400 mb-8">Enter your email to sync your kingdom across all devices</p>

        <div className="space-y-3">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-cyan-600"
            placeholder="your@email.com"
          />
          <button
            onClick={sendLink}
            disabled={loading || !email}
            className="w-full bg-cyan-600 hover:bg-cyan-500 disabled:opacity-40 transition-colors text-white font-semibold py-3 rounded-xl text-sm"
          >
            {loading ? "Sending..." : "Send magic link"}
          </button>
        </div>
      </div>
    </main>
  );
}
