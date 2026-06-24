"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { useRouter } from "next/navigation";

const KingdomScene = dynamic(() => import("./KingdomScene"), { ssr: false });

export default function TopicPage() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <header className="border-b border-slate-800 px-6 py-4 flex items-center gap-3">
        <Link href="/" className="text-slate-400 hover:text-white transition-colors text-sm">
          ← Library
        </Link>
        <span className="text-slate-700">|</span>
        <h1 className="text-lg font-semibold">Cornea</h1>
        <span className="ml-auto text-xs bg-cyan-900/50 text-cyan-300 px-2.5 py-1 rounded-full">
          Lv. 1
        </span>
      </header>

      <section className="max-w-3xl mx-auto px-6 py-8">
        <div className="rounded-2xl overflow-hidden border border-cyan-900/30 mb-6">
          <KingdomScene />
        </div>

        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs text-slate-500">0 / 150 XP to next level</p>
            <div className="w-48 h-1.5 rounded-full bg-slate-800 mt-1.5 overflow-hidden">
              <div className="h-full rounded-full bg-cyan-500/60" style={{ width: "0%" }} />
            </div>
          </div>
          <button
            onClick={() => router.push("/topic/cornea/books")}
            className="bg-cyan-600 hover:bg-cyan-500 active:scale-95 transition-all text-white font-semibold px-6 py-3 rounded-xl text-sm shadow-lg shadow-cyan-950/50"
          >
            🏰 Build Kingdom
          </button>
        </div>
      </section>
    </main>
  );
}
