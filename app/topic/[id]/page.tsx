"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState, useCallback } from "react";
import { supabase } from "@/lib/supabase";
import { getCode } from "@/lib/uid";
// Kingdom code is fixed — all devices share the same XP automatically

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

  const loadXp = useCallback(async (c: string) => {
    const { data } = await supabase.from("pkingdom_xp").select("cornea_xp").eq("uid", c).single();
    if (data) setXp(data.cornea_xp);
  }, []);

  useEffect(() => {
    loadXp(getCode());
  }, [pathname, loadXp]);

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

        <p className="text-xs text-slate-700 text-center mt-4">Kingdom Code: <span className="text-slate-500 font-mono">A1</span></p>

      </section>
    </main>
  );
}
