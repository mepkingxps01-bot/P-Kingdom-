"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState, useCallback } from "react";
import { supabase } from "@/lib/supabase";
import { getCode } from "@/lib/uid";

const KingdomScene = dynamic(() => import("./KingdomScene"), { ssr: false });

const LEVELS = [
  { level: 1, min: 0, max: 150 },
  { level: 2, min: 150, max: 350 },
  { level: 3, min: 350, max: 600 },
  { level: 4, min: 600, max: 900 },
  { level: 5, min: 900, max: 1200 },
];

function getLevelInfo(xp: number) {
  const current = [...LEVELS].reverse().find((l) => xp >= l.min) ?? LEVELS[0];
  return { level: current.level, progress: xp - current.min, needed: current.max - current.min };
}

export default function TopicPage() {
  const router = useRouter();
  const pathname = usePathname();
  const [xp, setXp] = useState(0);
  const [code, setCode] = useState("");
  const [restoreInput, setRestoreInput] = useState("");
  const [showRestore, setShowRestore] = useState(false);
  const [copied, setCopied] = useState(false);
  const [restoreMsg, setRestoreMsg] = useState("");

  const loadXp = useCallback(async (c: string) => {
    const { data } = await supabase.from("pkingdom_xp").select("cornea_xp").eq("uid", c).single();
    if (data) setXp(data.cornea_xp);
  }, []);

  useEffect(() => {
    const c = getCode();
    setCode(c);
    loadXp(c);
  }, [pathname, loadXp]);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleRestore = async () => {
    const input = restoreInput.trim().toUpperCase();
    if (input.length < 5) return;
    const { data } = await supabase.from("pkingdom_xp").select("cornea_xp").eq("uid", input).single();
    if (data) {
      localStorage.setItem("pkingdom_code", input);
      setCode(input);
      setXp(data.cornea_xp);
      setShowRestore(false);
      setRestoreInput("");
      setRestoreMsg("");
    } else {
      setRestoreMsg("Code not found. Check and try again.");
    }
  };

  const { level, progress, needed } = getLevelInfo(xp);
  const pct = Math.min(100, Math.round((progress / needed) * 100));

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <header className="border-b border-slate-800 px-6 py-4 flex items-center gap-3">
        <Link href="/" className="text-slate-400 hover:text-white transition-colors text-sm">← Library</Link>
        <span className="text-slate-700">|</span>
        <h1 className="text-lg font-semibold">Cornea</h1>
        <span className="ml-auto text-xs bg-cyan-900/50 text-cyan-300 px-2.5 py-1 rounded-full">Lv. {level}</span>
      </header>

      <section className="max-w-3xl mx-auto px-6 py-8">
        <div className="rounded-2xl overflow-hidden border border-cyan-900/30 mb-6">
          <KingdomScene />
        </div>

        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="text-xs text-slate-500">{xp} XP · {progress} / {needed} XP to Lv. {level + 1}</p>
            <div className="w-48 h-1.5 rounded-full bg-slate-800 mt-1.5 overflow-hidden">
              <div className="h-full rounded-full bg-cyan-500/60 transition-all duration-700" style={{ width: `${pct}%` }} />
            </div>
          </div>
          <button
            onClick={() => router.push("/topic/cornea/books")}
            className="bg-cyan-600 hover:bg-cyan-500 active:scale-95 transition-all text-white font-semibold px-6 py-3 rounded-xl text-sm shadow-lg shadow-cyan-950/50"
          >
            🏰 Build Kingdom
          </button>
        </div>

        <div className="border border-slate-800 rounded-xl px-4 py-3 bg-slate-900/50">
          <p className="text-xs text-slate-500 mb-2">🔑 Your Kingdom Code — type this on any device to restore your progress</p>
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold tracking-widest text-cyan-300 bg-slate-800 px-4 py-2 rounded-lg">{code}</span>
            <button onClick={handleCopy} className="text-xs text-slate-300 hover:text-white bg-slate-700 hover:bg-slate-600 transition-colors px-3 py-2 rounded-lg">
              {copied ? "Copied!" : "Copy"}
            </button>
            <button onClick={() => { setShowRestore(!showRestore); setRestoreMsg(""); }} className="text-xs text-slate-400 hover:text-white transition-colors px-2 py-2">
              Restore
            </button>
          </div>
          {showRestore && (
            <div className="mt-3 space-y-2">
              <div className="flex gap-2">
                <input
                  value={restoreInput}
                  onChange={(e) => setRestoreInput(e.target.value.toUpperCase())}
                  maxLength={5}
                  placeholder="Enter code (e.g. K7392)"
                  className="flex-1 text-sm font-mono tracking-widest bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-cyan-600 uppercase"
                />
                <button onClick={handleRestore} className="text-sm bg-cyan-700 hover:bg-cyan-600 text-white px-4 py-2 rounded-lg transition-colors">
                  Apply
                </button>
              </div>
              {restoreMsg && <p className="text-xs text-red-400">{restoreMsg}</p>}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
