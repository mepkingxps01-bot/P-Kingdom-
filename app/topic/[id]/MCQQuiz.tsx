"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { getCode } from "@/lib/uid";
import type { TopicConfig } from "@/lib/topics";
import type { MCQ } from "@/lib/content";

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

type Props = {
  pool: MCQ[];
  count: number;
  topic: TopicConfig;
  backHref: string;
  backLabel: string;
  homeHref: string;
  title?: string;
};

export default function MCQQuiz({ pool, count, topic, backHref, backLabel, homeHref, title = "Build Kingdom — Board Exam MCQ" }: Props) {
  const xpColumn = topic.xpColumn;

  // Shuffle only on the client after mount so SSR and client match (React #418).
  // `round` bumps to reshuffle in place for "New Questions".
  const [round, setRound] = useState(0);
  const [questions, setQuestions] = useState<MCQ[]>([]);
  useEffect(() => {
    setQuestions(shuffle(pool).slice(0, count));
  }, [pool, count, round]);

  // Answers for the CURRENT round (reset on "New Questions"). Locked once set,
  // so feedback appears immediately when a question is answered.
  const [answers, setAnswers] = useState<Record<number, number>>({});
  // Cumulative XP earned this session — only ever increases (survives reshuffles).
  const [xp, setXp] = useState(0);
  const [saveError, setSaveError] = useState("");

  // Read the current stored XP once, so saves write an absolute (idempotent) value.
  const baselineRef = useRef<number | null>(null);
  const [baselineLoaded, setBaselineLoaded] = useState(false);
  useEffect(() => {
    let cancelled = false;
    (async () => {
      const uid = getCode();
      const { data } = await supabase.from("pkingdom_xp").select(xpColumn).eq("uid", uid).single();
      if (cancelled) return;
      baselineRef.current = (data as unknown as Record<string, number> | null)?.[xpColumn] ?? 0;
      setBaselineLoaded(true);
    })();
    return () => {
      cancelled = true;
    };
  }, [xpColumn]);

  // Debounced auto-save: persist baseline + earned so progress is never lost even
  // on a huge set the user never "finishes". Batches rapid answering into few writes.
  // Re-runs when the baseline finishes loading so an early answer still saves.
  useEffect(() => {
    if (xp === 0 || !baselineLoaded) return;
    const t = setTimeout(async () => {
      if (baselineRef.current === null) return;
      const uid = getCode();
      const { error } = await supabase
        .from("pkingdom_xp")
        .upsert({ uid, [xpColumn]: baselineRef.current + xp, updated_at: new Date().toISOString() });
      setSaveError(error ? `Save error: ${error.message}` : "");
    }, 1200);
    return () => clearTimeout(t);
  }, [xp, xpColumn, baselineLoaded]);

  const handleSelect = (qId: number, optIdx: number, correctIdx: number) => {
    if (answers[qId] !== undefined) return; // already answered — locked
    setAnswers((prev) => ({ ...prev, [qId]: optIdx }));
    setXp((x) => x + (optIdx === correctIdx ? 3 : 1));
  };

  const regenerate = () => {
    setAnswers({});
    setSaveError("");
    setRound((r) => r + 1);
    if (typeof window !== "undefined") window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const answered = Object.keys(answers).length;
  const correctCount = questions.filter((q) => answers[q.id] === q.correct).length;
  const allDone = questions.length > 0 && answered === questions.length;

  if (questions.length === 0) {
    return (
      <main className="min-h-screen bg-slate-950 text-white">
        <section className="max-w-2xl mx-auto px-6 py-20 text-center">
          <p className="text-sm text-slate-500">Loading questions…</p>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <header className="sticky top-0 z-10 bg-slate-950/90 backdrop-blur border-b border-slate-800 px-6 py-4 flex items-center gap-3">
        <Link href={backHref} className="text-slate-400 hover:text-white transition-colors text-sm">
          ← {backLabel}
        </Link>
        <span className="text-slate-700">|</span>
        <div className="flex items-center gap-2 min-w-0">
          <span className="text-lg">🏰</span>
          <h1 className="text-base font-semibold truncate">{title}</h1>
        </div>
        <span className="ml-auto flex items-center gap-2 text-xs whitespace-nowrap">
          <span className="text-slate-500">{answered}/{questions.length}</span>
          <span className="text-green-400">{correctCount} ✓</span>
          {answered > correctCount && <span className="text-red-400">{answered - correctCount} ✗</span>}
          <span className={`${topic.badge} px-2 py-0.5 rounded-full font-semibold`}>+{xp} XP</span>
        </span>
      </header>

      <section className="max-w-2xl mx-auto px-6 py-8">
        <div className="text-xs text-slate-500 mb-8 border border-slate-800 rounded-lg px-4 py-3 bg-slate-900/50">
          ⚡ Tap an answer to lock it in and see instantly if you&apos;re right · {questions.length} questions drawn from a pool of {pool.length}
          <span className={`ml-2 ${topic.accentBright}`}>+3 XP correct · +1 XP for an attempt · saved automatically</span>
        </div>

        <div className="space-y-6">
          {questions.map((q, idx) => {
            const chosen = answers[q.id];
            const revealed = chosen !== undefined;
            const gotItRight = chosen === q.correct;
            return (
              <div
                key={q.id}
                className={`bg-slate-900 border rounded-xl p-5 transition-colors ${
                  revealed && gotItRight ? "border-green-800/50" : revealed ? "border-red-900/50" : "border-slate-800"
                }`}
              >
                <p className="text-sm font-medium leading-relaxed mb-4">
                  <span className="text-slate-500 mr-2">{idx + 1}.</span>
                  {q.question}
                </p>
                <div className="space-y-2">
                  {q.options.map((opt, i) => {
                    const isSelected = chosen === i;
                    const isCorrect = i === q.correct;
                    let style = `border-slate-700 text-slate-300 ${topic.optionHover} cursor-pointer`;
                    if (revealed) {
                      if (isCorrect) style = "border-green-600 bg-green-950/40 text-green-200 font-medium cursor-default";
                      else if (isSelected) style = "border-red-600 bg-red-950/40 text-red-300 cursor-default";
                      else style = "border-slate-800 text-slate-600 cursor-default";
                    }
                    return (
                      <button
                        key={i}
                        onClick={() => handleSelect(q.id, i, q.correct)}
                        disabled={revealed}
                        className={`w-full text-left text-sm px-4 py-3 rounded-lg border transition-all ${style}`}
                      >
                        <span className="text-slate-500 mr-2 font-mono">{String.fromCharCode(65 + i)}.</span>
                        {opt}
                        {revealed && isCorrect && <span className="ml-2 text-green-400">✓</span>}
                        {revealed && isSelected && !isCorrect && <span className="ml-2 text-red-400">✗</span>}
                      </button>
                    );
                  })}
                </div>
                {revealed && (
                  <div className="mt-4 pt-3 border-t border-slate-700">
                    <p className={`text-xs font-semibold mb-1 ${gotItRight ? "text-green-400" : "text-red-400"}`}>
                      {gotItRight ? "Correct · +3 XP" : "Incorrect · +1 XP"}
                    </p>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      <span className={`${topic.accentBright} font-medium`}>Explanation: </span>
                      {q.explanation}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className={`mt-8 bg-slate-900 border ${topic.resultBorder} rounded-2xl p-6 text-center`}>
          <p className={`text-2xl font-bold ${topic.accentText} mb-1`}>+{xp} XP earned</p>
          <p className="text-sm text-slate-400 mb-1">
            {correctCount}/{answered || 0} correct
            {answered > 0 && ` (${Math.round((correctCount / answered) * 100)}%)`}
            {allDone && correctCount === questions.length && " — Perfect! 🎉"}
          </p>
          <p className="text-xs text-slate-600 mb-5">
            {allDone ? `Your ${topic.name} Kingdom has grown.` : "Answer as many as you like — XP saves automatically."}
          </p>
          {saveError && <p className="text-xs text-red-400 mb-3">{saveError}</p>}
          <div className="flex gap-3 justify-center">
            <Link href={homeHref} className={`${topic.buttonBg} transition-colors text-white text-sm font-semibold px-6 py-3 rounded-xl`}>
              View Kingdom
            </Link>
            <button onClick={regenerate} className="border border-slate-700 hover:border-slate-500 transition-colors text-slate-300 text-sm px-6 py-3 rounded-xl">
              New Questions
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
