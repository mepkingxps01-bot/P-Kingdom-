"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { MEQ_DURATION_MIN, MEQ_STATIONS, MEQ_TOTAL_MARKS } from "@/lib/meq";
import { ExamTimer } from "./ExamTimer";
import { resetMeq, stationProgress, updateMeq, useMeqState } from "./store";

const KINGDOM_STYLE = {
  "neuro-oph": { badge: "bg-emerald-900/50 text-emerald-300", label: "Neuro-oph" },
  uveitis: { badge: "bg-rose-900/50 text-rose-300", label: "Uveitis" },
} as const;

export default function MeqOverview() {
  const router = useRouter();
  const state = useMeqState();

  const rows = MEQ_STATIONS.map((st) => ({ st, p: stationProgress(state, st) }));
  const score = rows.reduce((s, r) => s + r.p.score, 0);
  const attempted = rows.reduce((s, r) => s + r.p.attemptedMarks, 0);
  const allDone = rows.every((r) => r.p.done === r.p.total);

  const start = () => {
    updateMeq((s) => ({ ...s, startedAt: s.startedAt ?? Date.now() }));
    router.push("/meq/1");
  };
  const reset = () => {
    if (window.confirm("ล้างคำตอบ คะแนน และเวลาทั้งหมด แล้วเริ่มใหม่?")) resetMeq();
  };

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <header className="border-b border-slate-800 px-6 py-4 flex items-center gap-3">
        <Link href="/" className="text-slate-400 hover:text-white transition-colors text-sm">← Library</Link>
        <span className="text-slate-700">|</span>
        <h1 className="text-base font-semibold flex-1">📋 MEQ Mock Exam</h1>
        <ExamTimer />
      </header>

      <section className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
        <p className="text-xs uppercase tracking-widest text-indigo-300 mb-2">Neuro-Ophthalmology + Uveitis</p>
        <h2 className="text-2xl font-semibold mb-1">ข้อสอบ MEQ {MEQ_STATIONS.length} ข้อ</h2>
        <p className="text-sm text-slate-400 mb-6">
          {MEQ_TOTAL_MARKS} คะแนน · เวลา {MEQ_DURATION_MIN / 60} ชั่วโมง
        </p>

        <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-5 mb-6 text-sm text-slate-300 space-y-2 leading-relaxed">
          <p className="font-medium text-slate-200">วิธีทำข้อสอบ</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>แต่ละข้อเป็นเคสที่ค่อย ๆ เปิดข้อมูลทีละส่วน ต้องตอบข้อย่อยก่อนหน้าให้เสร็จจึงจะเห็นข้อย่อยถัดไป</li>
            <li>พิมพ์คำตอบ แล้วกด <span className="text-indigo-300">ส่งคำตอบ</span> — คำตอบจะถูกล็อก และเฉลยพร้อมเกณฑ์ให้คะแนนจะแสดงท้ายข้อย่อยนั้น</li>
            <li>ให้คะแนนตัวเองตามเกณฑ์ทีละประเด็น (ให้คะแนนบางส่วนได้) ระบบจะรวมคะแนนให้</li>
            <li>เวลาแนะนำต่อข้อคิดตามสัดส่วนคะแนน (~0.6 นาทีต่อคะแนน)</li>
            <li>คำตอบและคะแนนบันทึกไว้ในเบราว์เซอร์นี้เท่านั้น</li>
          </ul>
        </div>

        <div className="flex flex-wrap gap-3 mb-8">
          <button
            onClick={start}
            className="rounded-xl bg-indigo-600 hover:bg-indigo-500 px-5 py-3 text-sm font-semibold shadow-lg shadow-indigo-950/50 transition-colors"
          >
            {state.startedAt ? "ทำข้อสอบต่อ →" : `เริ่มสอบจับเวลา ${MEQ_DURATION_MIN / 60} ชม. →`}
          </button>
          <button
            onClick={reset}
            className="rounded-xl border border-slate-700 hover:border-slate-500 px-5 py-3 text-sm text-slate-300 transition-colors"
          >
            เริ่มใหม่ทั้งหมด
          </button>
        </div>

        <div className="rounded-xl border border-slate-800 overflow-hidden">
          <div className="grid grid-cols-[2.5rem_1fr_auto] sm:grid-cols-[2.5rem_1fr_5rem_5rem_6rem] gap-x-3 px-4 py-2 text-xs text-slate-500 bg-slate-900 border-b border-slate-800">
            <span>ข้อ</span>
            <span>หัวข้อ</span>
            <span className="hidden sm:block text-right">คะแนน</span>
            <span className="hidden sm:block text-right">เวลา</span>
            <span className="text-right">ได้</span>
          </div>
          {rows.map(({ st, p }) => {
            const k = KINGDOM_STYLE[st.kingdom];
            return (
              <Link
                key={st.no}
                href={`/meq/${st.no}`}
                className="grid grid-cols-[2.5rem_1fr_auto] sm:grid-cols-[2.5rem_1fr_5rem_5rem_6rem] gap-x-3 items-center px-4 py-3 border-b border-slate-800/70 last:border-b-0 hover:bg-slate-900/70 transition-colors"
              >
                <span className="text-slate-500 text-sm">{st.no}</span>
                <span className="min-w-0">
                  <span className="block text-sm font-medium truncate">{st.title}</span>
                  <span className="flex items-center gap-2 mt-1">
                    <span className={`text-[10px] px-2 py-0.5 rounded-full ${k.badge}`}>{k.label}</span>
                    <span className="text-[11px] text-slate-500">
                      {p.done}/{p.total} ข้อย่อย
                      <span className="sm:hidden"> · {st.marks} คะแนน · {st.minutes} นาที</span>
                    </span>
                  </span>
                </span>
                <span className="hidden sm:block text-right text-sm text-slate-300">{st.marks}</span>
                <span className="hidden sm:block text-right text-sm text-slate-400">{st.minutes} นาที</span>
                <span className="text-right text-sm tabular-nums">
                  {p.done > 0 ? (
                    <span className="text-indigo-300">{p.score}/{st.marks}</span>
                  ) : (
                    <span className="text-slate-600">—</span>
                  )}
                </span>
              </Link>
            );
          })}
          <div className="grid grid-cols-[1fr_auto] px-4 py-3 bg-slate-900 text-sm">
            <span className="text-slate-400">
              รวม {allDone ? "" : `(ตอบแล้ว ${attempted}/${MEQ_TOTAL_MARKS} คะแนน)`}
            </span>
            <span className="font-semibold tabular-nums text-indigo-300">
              {score}/{MEQ_TOTAL_MARKS}
              {attempted > 0 && (
                <span className="text-slate-500 font-normal"> · {Math.round((score / MEQ_TOTAL_MARKS) * 100)}%</span>
              )}
            </span>
          </div>
        </div>
      </section>
    </main>
  );
}
