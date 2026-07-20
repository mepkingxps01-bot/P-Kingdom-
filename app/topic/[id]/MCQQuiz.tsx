"use client";

import { useState, useEffect } from "react";
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

  const [selected, setSelected] = useState<Record<number, number>>({});
  const [submitted, setSubmitted] = useState(false);
  const [saveError, setSaveError] = useState("");

  const handleSelect = (qId: number, optIdx: number) => {
    if (submitted) return;
    setSelected((prev) => ({ ...prev, [qId]: optIdx }));
  };

  const regenerate = () => {
    setSelected({});
    setSubmitted(false);
    setSaveError("");
    setRound((r) => r + 1);
  };

  const handleSubmit = async () => {
    setSubmitted(true);
    const correct = questions.filter((q) => selected[q.id] === q.correct).length;
    const earned = questions.reduce((acc, q) => acc + (selected[q.id] === q.correct ? 3 : 1), 0)
      + (correct === questions.length ? 20 : correct >= Math.ceil(questions.length * 0.8) ? 10 : 0);
    const uid = getCode();
    const { data, error: selectError } = await supabase.from("pkingdom_xp").select(xpColumn).eq("uid", uid).single();
    if (selectError && selectError.code !== "PGRST116") {
      setSaveError(`Select error: ${selectError.message}`);
      return;
    }
    const prev = (data as unknown as Record<string, number> | null)?.[xpColumn] ?? 0;
    const { error: upsertError } = await supabase
      .from("pkingdom_xp")
      .upsert({ uid, [xpColumn]: prev + earned, updated_at: new Date().toISOString() });
    if (upsertError) setSaveError(`Save error: ${upsertError.message}`);
  };

  const correctCount = questions.filter((q) => selected[q.id] === q.correct).length;
  const perfectBonus = correctCount === questions.length ? 20 : correctCount >= Math.ceil(questions.length * 0.8) ? 10 : 0;
  const xp = questions.reduce((acc, q) => acc + (selected[q.id] === q.correct ? 3 : 1), 0) + perfectBonus;
  const answered = Object.keys(selected).length;

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
      <header className="border-b border-slate-800 px-6 py-4 flex items-center gap-3">
        <Link href={backHref} className="text-slate-400 hover:text-white transition-colors text-sm">
          ← {backLabel}
        </Link>
        <span className="text-slate-700">|</span>
        <div className="flex items-center gap-2">
          <span className="text-lg">🏰</span>
          <h1 className="text-base font-semibold">{title}</h1>
        </div>
        {!submitted && (
          <span className="ml-auto text-xs text-slate-500">{answered}/{questions.length} answered</span>
        )}
      </header>

      <section className="max-w-2xl mx-auto px-6 py-8">
        {!submitted && (
          <div className="text-xs text-slate-500 mb-8 border border-slate-800 rounded-lg px-4 py-3 bg-slate-900/50">
            ⚡ Board-level clinical vignettes · {questions.length} questions drawn from a pool of {pool.length} · fresh set every session
            <span className={`ml-2 ${topic.accentBright}`}>+3 XP per correct · +20 XP bonus for a perfect score</span>
          </div>
        )}

        <div className="space-y-6">
          {questions.map((q, idx) => (
            <div key={q.id} className={`bg-slate-900 border rounded-xl p-5 transition-colors ${submitted && selected[q.id] === q.correct ? "border-green-800/50" : submitted && selected[q.id] !== undefined && selected[q.id] !== q.correct ? "border-red-900/50" : "border-slate-800"}`}>
              <p className="text-sm font-medium leading-relaxed mb-4">
                <span className="text-slate-500 mr-2">{idx + 1}.</span>
                {q.question}
              </p>
              <div className="space-y-2">
                {q.options.map((opt, i) => {
                  const isSelected = selected[q.id] === i;
                  const isCorrect = i === q.correct;
                  let style = `border-slate-700 text-slate-300 ${topic.optionHover} cursor-pointer`;
                  if (submitted) {
                    if (isCorrect) style = "border-green-600 bg-green-950/40 text-green-200 font-medium cursor-default";
                    else if (isSelected) style = "border-red-600 bg-red-950/40 text-red-300 cursor-default";
                    else style = "border-slate-800 text-slate-600 cursor-default";
                  } else if (isSelected) {
                    style = topic.optionSelected;
                  }
                  return (
                    <button key={i} onClick={() => handleSelect(q.id, i)} className={`w-full text-left text-sm px-4 py-3 rounded-lg border transition-all ${style}`}>
                      <span className="text-slate-500 mr-2 font-mono">{String.fromCharCode(65 + i)}.</span>
                      {opt}
                    </button>
                  );
                })}
              </div>
              {submitted && (
                <div className="mt-4 pt-3 border-t border-slate-700">
                  <p className="text-xs text-slate-400 leading-relaxed">
                    <span className={`${topic.accentBright} font-medium`}>Explanation: </span>{q.explanation}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

        {!submitted ? (
          <button onClick={handleSubmit} disabled={answered < questions.length} className={`mt-8 w-full ${topic.buttonBg} disabled:opacity-30 disabled:cursor-not-allowed active:scale-95 transition-all text-white font-bold py-4 rounded-xl text-sm`}>
            {answered < questions.length ? `Answer all questions (${answered}/${questions.length})` : "Submit Answers"}
          </button>
        ) : (
          <div className={`mt-8 bg-slate-900 border ${topic.resultBorder} rounded-2xl p-8 text-center`}>
            <p className="text-4xl mb-3">🏰</p>
            <p className={`text-2xl font-bold ${topic.accentText} mb-1`}>+{xp} XP earned!</p>
            <p className="text-sm text-slate-400 mb-1">
              {correctCount}/{questions.length} correct
              {correctCount === questions.length && " — Perfect score! 🎉"}
              {correctCount >= Math.ceil(questions.length * 0.8) && correctCount < questions.length && " — Great job!"}
              {correctCount < Math.ceil(questions.length * 0.8) && " — Keep studying!"}
            </p>
            <p className="text-xs text-slate-600 mb-6">Your {topic.name} Kingdom has grown.</p>
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
        )}
      </section>
    </main>
  );
}
