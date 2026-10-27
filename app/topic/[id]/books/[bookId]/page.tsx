"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { useRouter, useParams } from "next/navigation";
import { getTopic, getBookDetail } from "@/lib/topics";
import { getBookRecall, getBookMcqPool } from "@/lib/content";

export default function BookPage() {
  const router = useRouter();
  const params = useParams();
  const id = Array.isArray(params.id) ? params.id[0] : params.id ?? "cornea";
  const bookId = Array.isArray(params.bookId) ? params.bookId[0] : params.bookId ?? "";

  const topic = getTopic(id);
  const book = getBookDetail(bookId);
  const recallQuestions = useMemo(() => getBookRecall(id, bookId), [id, bookId]);
  const mcqCount = useMemo(() => getBookMcqPool(id, bookId).length, [id, bookId]);

  const [revealed, setRevealed] = useState<Set<number>>(new Set());

  const toggleReveal = (qid: number) => {
    setRevealed((prev) => {
      const next = new Set(prev);
      next.has(qid) ? next.delete(qid) : next.add(qid);
      return next;
    });
  };

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <header className="border-b border-slate-800 px-6 py-4 flex items-center gap-3">
        <Link href={`/topic/${topic.id}/books`} className="text-slate-400 hover:text-white transition-colors text-sm">
          ← Books
        </Link>
        <span className="text-slate-700">|</span>
        <div>
          <h1 className="text-base font-semibold leading-tight">{book.title}</h1>
          <p className="text-xs text-slate-500">{book.author} · {book.edition}</p>
        </div>
      </header>

      <section className="max-w-2xl mx-auto px-6 py-8">
        {recallQuestions.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-4xl mb-4">🚧</p>
            <p className="text-sm text-slate-400">Recall questions for this book are coming soon.</p>
          </div>
        ) : (
          <>
            <div className="flex items-center gap-2 mb-1">
              <span className={`text-xs font-medium ${topic.accentBright} uppercase tracking-widest`}>Recall Questions</span>
              <span className="text-xs text-slate-600">({recallQuestions.length} questions)</span>
            </div>
            <p className="text-xs text-slate-500 mb-8">Read each question, recall in your head, then click 🔍 to reveal.</p>

            <div className="space-y-4">
              {recallQuestions.map((q) => (
                <div key={q.id} className="bg-slate-900 border border-slate-800 rounded-xl p-5">
                  <div className="flex items-start justify-between gap-3">
                    <p className="text-sm font-medium leading-relaxed flex-1">
                      <span className="text-slate-500 mr-2">{q.id}.</span>
                      {q.question}
                    </p>
                    <button
                      onClick={() => toggleReveal(q.id)}
                      className="text-xl flex-shrink-0 hover:scale-110 transition-transform"
                      title={revealed.has(q.id) ? "Hide answer" : "Reveal answer"}
                    >
                      {revealed.has(q.id) ? "🔓" : "🔍"}
                    </button>
                  </div>
                  {revealed.has(q.id) && (
                    <div className="mt-3 pt-3 border-t border-slate-700">
                      {q.image && (
                        /* eslint-disable-next-line @next/next/no-img-element */
                        <img
                          src={q.image}
                          alt={q.imageAlt ?? ""}
                          loading="lazy"
                          className="mb-3 w-full max-w-sm rounded-lg border border-slate-700"
                        />
                      )}
                      <p className={`text-sm ${topic.answerText} leading-relaxed`}>{q.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {mcqCount > 0 && (
              <div className="mt-10 border-t border-slate-800 pt-8 text-center">
                <p className="text-sm text-slate-400 mb-2">Done recalling? Test yourself with board-level MCQs.</p>
                <p className="text-xs text-slate-600 mb-6">A fresh set of questions from this book's pool of {mcqCount}. Correct answers earn XP and grow your kingdom.</p>
                <button
                  onClick={() => router.push(`/topic/${topic.id}/books/${book.id}/mcq`)}
                  className={`inline-flex items-center gap-3 bg-gradient-to-r ${topic.mcqGradient} active:scale-95 transition-all text-white font-bold px-10 py-4 rounded-2xl text-base shadow-lg`}
                >
                  <span className="text-xl">🏰</span>
                  Build Kingdom
                </button>
              </div>
            )}
          </>
        )}
      </section>
    </main>
  );
}
