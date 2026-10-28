"use client";

import { MEQ_DURATION_MIN } from "@/lib/meq";
import { useMeqState, useNow } from "./store";

function fmt(ms: number) {
  const t = Math.max(0, Math.floor(ms / 1000));
  const h = Math.floor(t / 3600);
  const m = Math.floor((t % 3600) / 60);
  const s = t % 60;
  return `${h}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

// Countdown pill for the timed exam. Renders nothing until the exam is started
// (and on the server, where the clock snapshot is 0).
export function ExamTimer() {
  const { startedAt } = useMeqState();
  const now = useNow();
  if (!startedAt || !now) return null;

  const left = startedAt + MEQ_DURATION_MIN * 60_000 - now;
  const over = left <= 0;
  const low = !over && left < 10 * 60_000;

  return (
    <span
      className={`font-mono text-sm px-3 py-1 rounded-full border tabular-nums ${
        over
          ? "border-red-700 bg-red-950/60 text-red-300"
          : low
            ? "border-amber-700 bg-amber-950/40 text-amber-300"
            : "border-slate-700 bg-slate-900 text-slate-200"
      }`}
      title="เวลาที่เหลือ"
    >
      ⏱ {over ? `หมดเวลา +${fmt(-left)}` : fmt(left)}
    </span>
  );
}
