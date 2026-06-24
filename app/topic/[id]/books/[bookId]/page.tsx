"use client";

import Link from "next/link";

const parts = [
  {
    id: "part1",
    title: "Part 1: Basic Science",
    subtitle: "Cornea · Sclera · Ocular Adnexa · Anatomy · Physiology · Pathophysiologic Responses",
    questions: 25,
    mcq: 30,
    status: "available",
  },
  {
    id: "part2",
    title: "Part 2: Corneal Diseases",
    subtitle: "Infections · Dystrophies · Ectasias · Degenerations",
    questions: 0,
    mcq: 0,
    status: "coming",
  },
  {
    id: "part3",
    title: "Part 3: Surgery",
    subtitle: "Keratoplasty · Refractive Surgery · Ocular Surface Reconstruction",
    questions: 0,
    mcq: 0,
    status: "coming",
  },
];

export default function BookPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <header className="border-b border-slate-800 px-6 py-4 flex items-center gap-3">
        <Link href="/topic/cornea/books" className="text-slate-400 hover:text-white transition-colors text-sm">
          ← Books
        </Link>
        <span className="text-slate-700">|</span>
        <div>
          <h1 className="text-base font-semibold leading-tight">Cornea: Fundamentals, Diagnosis and Management</h1>
          <p className="text-xs text-slate-500">Mannis & Holland · 5th Edition</p>
        </div>
      </header>

      <section className="max-w-2xl mx-auto px-6 py-8">
        <p className="text-xs text-slate-500 mb-6">Select a part to start your recall session.</p>

        <div className="space-y-3">
          {parts.map((part) => (
            part.status === "available" ? (
              <Link key={part.id} href={`/topic/cornea/books/cornea-mannis/${part.id}`}>
                <div className="group bg-slate-900 border border-slate-800 hover:border-cyan-700/50 hover:bg-slate-800/60 transition-all rounded-xl p-5 cursor-pointer">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-sm font-semibold text-white group-hover:text-cyan-300 transition-colors">{part.title}</p>
                      <p className="text-xs text-slate-500 mt-1 leading-relaxed">{part.subtitle}</p>
                      <div className="flex gap-3 mt-3">
                        <span className="text-xs text-cyan-400 bg-cyan-950/50 px-2 py-0.5 rounded-full">{part.questions} recall questions</span>
                        <span className="text-xs text-blue-400 bg-blue-950/50 px-2 py-0.5 rounded-full">{part.mcq} MCQ pool</span>
                      </div>
                    </div>
                    <span className="text-slate-600 group-hover:text-cyan-400 transition-colors text-lg mt-1">→</span>
                  </div>
                </div>
              </Link>
            ) : (
              <div key={part.id} className="bg-slate-900/40 border border-slate-800/50 rounded-xl p-5 opacity-40">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-sm font-semibold text-slate-400">{part.title}</p>
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">{part.subtitle}</p>
                  </div>
                  <span className="text-xs text-slate-600 bg-slate-800 px-2 py-0.5 rounded-full mt-1">Coming soon</span>
                </div>
              </div>
            )
          ))}
        </div>
      </section>
    </main>
  );
}
