"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { getStation, MEQ_STATIONS, type MeqImage, type MeqPart } from "@/lib/meq";
import { ExamTimer } from "../ExamTimer";
import { partScore, stationProgress, updateMeq, useMeqState, type MeqState } from "../store";

function Figures({ images }: { images: MeqImage[] }) {
  return (
    <div className={`grid gap-3 mt-4 ${images.length > 1 ? "sm:grid-cols-2" : ""}`}>
      {images.map((img) => (
        <figure key={img.src}>
          <a href={img.src} target="_blank" rel="noreferrer" title="เปิดภาพขนาดเต็ม">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={img.src}
              alt={img.caption}
              loading="lazy"
              className="w-full max-h-96 object-contain rounded-lg border border-slate-700 bg-black"
            />
          </a>
          <figcaption className="text-xs text-slate-500 mt-1.5">{img.caption}</figcaption>
        </figure>
      ))}
    </div>
  );
}

function PartCard({ part, label, state }: { part: MeqPart; label: string; state: MeqState }) {
  const submitted = !!state.submitted[part.id];
  const answer = state.answers[part.id] ?? "";
  const got = partScore(state, part);

  const setAnswer = (v: string) => updateMeq((s) => ({ ...s, answers: { ...s.answers, [part.id]: v } }));
  const submit = () => {
    if (!answer.trim() && !window.confirm("ยังไม่ได้พิมพ์คำตอบ — ส่งและดูเฉลยเลยไหม?")) return;
    updateMeq((s) => ({ ...s, submitted: { ...s.submitted, [part.id]: true } }));
  };
  const award = (i: number, v: number) =>
    updateMeq((s) => ({ ...s, scores: { ...s.scores, [`${part.id}:${i}`]: v } }));

  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900 p-5">
      {part.reveal && (
        <div className="mb-4 rounded-lg border-l-2 border-indigo-500 bg-indigo-950/30 px-4 py-3 text-sm text-slate-200 leading-relaxed">
          <span className="block text-[11px] uppercase tracking-wider text-indigo-300 mb-1">ข้อมูลเพิ่มเติม</span>
          {part.reveal}
        </div>
      )}
      {part.images && <Figures images={part.images} />}

      <p className={`text-sm font-medium leading-relaxed ${part.images ? "mt-4" : ""}`}>
        <span className="text-indigo-300 mr-2">{label}</span>
        {part.prompt}
        <span className="text-slate-500 font-normal"> ({part.marks} คะแนน)</span>
      </p>

      <textarea
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        readOnly={submitted}
        rows={5}
        placeholder="พิมพ์คำตอบ…"
        className={`mt-3 w-full rounded-lg border px-3 py-2.5 text-sm leading-relaxed bg-slate-950 resize-y focus:outline-none focus:border-indigo-500 ${
          submitted ? "border-slate-800 text-slate-400" : "border-slate-700 text-slate-100"
        }`}
      />

      {!submitted ? (
        <button
          onClick={submit}
          className="mt-3 rounded-lg bg-indigo-600 hover:bg-indigo-500 px-4 py-2 text-sm font-semibold transition-colors"
        >
          ส่งคำตอบและดูเฉลย
        </button>
      ) : (
        <div className="mt-4 rounded-lg border border-emerald-900/50 bg-emerald-950/20 p-4">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs uppercase tracking-wider text-emerald-300">เฉลย · เกณฑ์ให้คะแนน</span>
            <span className="text-sm tabular-nums text-emerald-200">
              ได้ {got}/{part.marks}
            </span>
          </div>
          <ol className="space-y-2.5">
            {part.key.map((k, i) => {
              const v = Math.min(state.scores[`${part.id}:${i}`] ?? 0, k.marks);
              return (
                <li key={i} className="flex gap-3 items-start">
                  <div className="flex shrink-0 gap-1 pt-0.5" role="group" aria-label={`คะแนนประเด็นที่ ${i + 1}`}>
                    {Array.from({ length: k.marks + 1 }, (_, n) => (
                      <button
                        key={n}
                        onClick={() => award(i, n)}
                        aria-pressed={v === n}
                        className={`w-7 h-7 rounded-md text-xs tabular-nums border transition-colors ${
                          v === n
                            ? n === 0
                              ? "border-slate-500 bg-slate-700 text-white"
                              : "border-emerald-500 bg-emerald-700 text-white"
                            : "border-slate-700 text-slate-500 hover:border-slate-500"
                        }`}
                      >
                        {n}
                      </button>
                    ))}
                  </div>
                  <span className="text-sm text-slate-200 leading-relaxed">
                    {k.point}
                    <span className="text-slate-500"> [{k.marks}]</span>
                  </span>
                </li>
              );
            })}
          </ol>
          {part.pearl && <p className="mt-3 text-xs text-amber-200/90 leading-relaxed">💡 {part.pearl}</p>}
        </div>
      )}
    </div>
  );
}

export default function MeqStationPage() {
  const params = useParams();
  const raw = Array.isArray(params.no) ? params.no[0] : params.no;
  const station = getStation(Number(raw));
  const state = useMeqState();

  if (!station) {
    return (
      <main className="min-h-screen bg-slate-950 text-white">
        <section className="max-w-2xl mx-auto px-6 py-20 text-center">
          <p className="text-sm text-slate-400 mb-4">ไม่พบข้อสอบข้อนี้</p>
          <Link href="/meq" className="text-indigo-300 text-sm">← กลับหน้ารวม MEQ</Link>
        </section>
      </main>
    );
  }

  // Parts unlock in order: a part is visible once every earlier part is submitted.
  const firstOpen = station.parts.findIndex((p) => !state.submitted[p.id]);
  const visible = firstOpen === -1 ? station.parts.length : firstOpen + 1;
  const prog = stationProgress(state, station);
  const finished = prog.done === prog.total;
  const next = MEQ_STATIONS.find((s) => s.no === station.no + 1);
  const prev = MEQ_STATIONS.find((s) => s.no === station.no - 1);
  const accent = station.kingdom === "uveitis" ? "text-rose-300" : "text-emerald-300";

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <header className="border-b border-slate-800 px-4 sm:px-6 py-4 flex items-center gap-3">
        <Link href="/meq" className="text-slate-400 hover:text-white transition-colors text-sm shrink-0">← MEQ</Link>
        <span className="text-slate-700">|</span>
        <h1 className="text-sm font-semibold flex-1 min-w-0 truncate">
          ข้อ {station.no}/{MEQ_STATIONS.length} · {station.title}
        </h1>
        <ExamTimer />
      </header>

      <section className="max-w-3xl mx-auto px-4 sm:px-6 py-8 space-y-5">
        <div>
          <p className={`text-xs uppercase tracking-widest ${accent} mb-1`}>
            {station.kingdom === "uveitis" ? "Uveitis" : "Neuro-Ophthalmology"}
          </p>
          <h2 className="text-xl font-semibold">
            {station.no}. {station.title}
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            {station.marks} คะแนน · เวลาแนะนำ {station.minutes} นาที · {station.parts.length} ข้อย่อย
          </p>
        </div>

        <div className="rounded-xl border border-slate-700 bg-slate-900/60 p-5">
          <span className="block text-[11px] uppercase tracking-wider text-slate-400 mb-1.5">โจทย์</span>
          <p className="text-sm leading-relaxed text-slate-100">{station.stem}</p>
          {station.images && <Figures images={station.images} />}
        </div>

        {station.parts.slice(0, visible).map((p, i) => (
          <PartCard key={p.id} part={p} label={`${station.no}.${i + 1}`} state={state} />
        ))}

        {!finished && visible < station.parts.length && (
          <p className="text-xs text-slate-500 text-center">
            ตอบข้อย่อยปัจจุบันเพื่อเปิดข้อถัดไป ({station.parts.length - visible} ข้อย่อยที่เหลือ)
          </p>
        )}

        {finished && (
          <div className="rounded-xl border border-indigo-800/60 bg-indigo-950/30 p-5 text-center">
            <p className="text-sm text-slate-300">คะแนนข้อนี้</p>
            <p className="text-3xl font-bold text-indigo-300 tabular-nums mt-1">
              {prog.score}/{station.marks}
            </p>
          </div>
        )}

        <nav className="flex justify-between gap-3 pt-2">
          {prev ? (
            <Link href={`/meq/${prev.no}`} className="shrink-0 whitespace-nowrap rounded-lg border border-slate-700 hover:border-slate-500 px-4 py-2 text-sm text-slate-300">
              ← ข้อ {prev.no}
            </Link>
          ) : (
            <span />
          )}
          {next ? (
            <Link href={`/meq/${next.no}`} className="rounded-lg bg-slate-800 hover:bg-slate-700 px-4 py-2 text-sm">
              ข้อ {next.no}: {next.title} →
            </Link>
          ) : (
            <Link href="/meq" className="rounded-lg bg-indigo-600 hover:bg-indigo-500 px-4 py-2 text-sm font-semibold">
              ดูคะแนนรวม →
            </Link>
          )}
        </nav>
      </section>
    </main>
  );
}
