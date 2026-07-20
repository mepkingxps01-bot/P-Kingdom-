"use client";

import { useMemo } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { getTopic, getBookDetail } from "@/lib/topics";
import { getMcqPool, type MCQ } from "@/lib/content";
import MCQQuiz from "../../../../MCQQuiz";

export default function MCQPage() {
  const params = useParams();
  const id = Array.isArray(params.id) ? params.id[0] : params.id ?? "cornea";
  const bookId = Array.isArray(params.bookId) ? params.bookId[0] : params.bookId ?? "";
  const partId = Array.isArray(params.partId) ? params.partId[0] : params.partId ?? "";

  const topic = getTopic(id);
  const book = getBookDetail(bookId);
  const pool = useMemo<MCQ[]>(() => getMcqPool(id, bookId, partId), [id, bookId, partId]);
  const partHref = `/topic/${topic.id}/books/${book.id}/${partId}`;

  if (pool.length === 0) {
    return (
      <main className="min-h-screen bg-slate-950 text-white">
        <header className="border-b border-slate-800 px-6 py-4 flex items-center gap-3">
          <Link href={partHref} className="text-slate-400 hover:text-white transition-colors text-sm">← Recall Questions</Link>
        </header>
        <section className="max-w-2xl mx-auto px-6 py-20 text-center">
          <p className="text-4xl mb-4">🚧</p>
          <p className="text-sm text-slate-400">MCQs for this part are coming soon.</p>
        </section>
      </main>
    );
  }

  return (
    <MCQQuiz
      pool={pool}
      count={10}
      topic={topic}
      backHref={partHref}
      backLabel="Recall Questions"
      homeHref={`/topic/${topic.id}`}
    />
  );
}
