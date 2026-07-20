"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { getTopic } from "@/lib/topics";
import { getTopicMcqPool, type MCQ } from "@/lib/content";
import MCQQuiz from "../MCQQuiz";

export default function ExamPage() {
  const params = useParams();
  const id = Array.isArray(params.id) ? params.id[0] : params.id ?? "cornea";
  const topic = getTopic(id);
  const pool = useMemo<MCQ[]>(() => getTopicMcqPool(id), [id]);
  const [count, setCount] = useState<number | null>(null);

  const homeHref = `/topic/${topic.id}`;

  // Offer standard lengths that fit the pool, plus "All".
  const lengths = [10, 25, 50, 100].filter((n) => n < pool.length);
  const options = [...lengths, pool.length];

  if (pool.length === 0) {
    return (
      <main className="min-h-screen bg-slate-950 text-white">
        <header className="border-b border-slate-800 px-6 py-4 flex items-center gap-3">
          <Link href={homeHref} className="text-slate-400 hover:text-white transition-colors text-sm">← {topic.name}</Link>
        </header>
        <section className="max-w-2xl mx-auto px-6 py-20 text-center">
          <p className="text-4xl mb-4">🚧</p>
          <p className="text-sm text-slate-400">No exam questions available yet for this kingdom.</p>
        </section>
      </main>
    );
  }

  if (count === null) {
    return (
      <main className="min-h-screen bg-slate-950 text-white">
        <header className="border-b border-slate-800 px-6 py-4 flex items-center gap-3">
          <Link href={homeHref} className="text-slate-400 hover:text-white transition-colors text-sm">← {topic.name}</Link>
          <span className="text-slate-700">|</span>
          <div className="flex items-center gap-2">
            <span className="text-lg">📝</span>
            <h1 className="text-base font-semibold">{topic.name} Exam</h1>
          </div>
        </header>

        <section className="max-w-lg mx-auto px-6 py-12">
          <p className="text-sm text-slate-300 mb-1">Mixed exam across your whole {topic.name} kingdom.</p>
          <p className="text-xs text-slate-500 mb-8">
            Questions are drawn randomly from all playable parts — a pool of {pool.length}. Pick a length to begin.
          </p>

          <div className="grid grid-cols-2 gap-3">
            {options.map((n, i) => (
              <button
                key={n}
                onClick={() => setCount(n)}
                className={`rounded-xl border border-slate-800 bg-slate-900 hover:bg-slate-800/60 hover:border-slate-600 transition-all p-5 text-center`}
              >
                <span className={`block text-2xl font-bold ${topic.accentText}`}>{n}</span>
                <span className="block text-xs text-slate-500 mt-1">
                  {n === pool.length && i === options.length - 1 ? "All questions" : "questions"}
                </span>
              </button>
            ))}
          </div>

          <p className="text-xs text-slate-600 mt-6 text-center">
            +3 XP per correct · +20 XP bonus for a perfect score
          </p>
        </section>
      </main>
    );
  }

  return (
    <MCQQuiz
      pool={pool}
      count={count}
      topic={topic}
      backHref={homeHref}
      backLabel={topic.name}
      homeHref={homeHref}
      title={`${topic.name} Exam`}
    />
  );
}
