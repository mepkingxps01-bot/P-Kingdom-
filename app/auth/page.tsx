"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function AuthPage() {
  const router = useRouter();
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const handle = async () => {
    setError("");
    setLoading(true);
    if (mode === "signup") {
      const { error } = await supabase.auth.signUp({ email, password });
      if (error) { setError(error.message); setLoading(false); return; }
      setDone(true);
    } else {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) { setError(error.message); setLoading(false); return; }
      router.push("/");
    }
    setLoading(false);
  };

  if (done) return (
    <main className="min-h-screen bg-slate-950 text-white flex items-center justify-center px-6">
      <div className="text-center max-w-sm">
        <p className="text-3xl mb-4">📬</p>
        <p className="text-lg font-semibold mb-2">Check your email</p>
        <p className="text-sm text-slate-400">We sent a confirmation link to <span className="text-cyan-400">{email}</span>. Click it to activate your account.</p>
      </div>
    </main>
  );

  return (
    <main className="min-h-screen bg-slate-950 text-white flex items-center justify-center px-6">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <p className="text-3xl mb-2">🏰</p>
          <h1 className="text-xl font-bold">P-Kingdom</h1>
          <p className="text-sm text-slate-400 mt-1">Your kingdom syncs across all devices</p>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
          <div className="flex rounded-lg overflow-hidden border border-slate-700 text-sm">
            <button onClick={() => setMode("login")} className={`flex-1 py-2 transition-colors ${mode === "login" ? "bg-cyan-700 text-white" : "text-slate-400 hover:text-white"}`}>Log in</button>
            <button onClick={() => setMode("signup")} className={`flex-1 py-2 transition-colors ${mode === "signup" ? "bg-cyan-700 text-white" : "text-slate-400 hover:text-white"}`}>Sign up</button>
          </div>

          <div>
            <label className="text-xs text-slate-400 mb-1 block">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2.5 text-sm text-white focus:outline-none focus:border-cyan-600"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="text-xs text-slate-400 mb-1 block">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handle()}
              className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2.5 text-sm text-white focus:outline-none focus:border-cyan-600"
              placeholder="••••••••"
            />
          </div>

          {error && <p className="text-xs text-red-400">{error}</p>}

          <button
            onClick={handle}
            disabled={loading || !email || !password}
            className="w-full bg-cyan-600 hover:bg-cyan-500 disabled:opacity-40 disabled:cursor-not-allowed transition-colors text-white font-semibold py-3 rounded-xl text-sm"
          >
            {loading ? "..." : mode === "login" ? "Log in" : "Create account"}
          </button>
        </div>
      </div>
    </main>
  );
}
