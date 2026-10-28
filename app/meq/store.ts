"use client";

import { useSyncExternalStore } from "react";
import type { MeqPart, MeqStation } from "@/lib/meq";

// MEQ progress lives in this browser only (localStorage): typed answers, which
// parts were submitted, self-awarded marks, and the exam start time.
// useSyncExternalStore gives the server an empty snapshot and the client the
// stored one, so there is no hydration mismatch and no setState-in-effect.

export type MeqState = {
  answers: Record<string, string>; // partId → typed answer
  submitted: Record<string, boolean>; // partId → answer locked & key revealed
  scores: Record<string, number>; // `${partId}:${keyIdx}` → marks awarded
  startedAt: number | null; // epoch ms when the timed exam started
};

const KEY = "pk-meq-v1";
const EMPTY: MeqState = { answers: {}, submitted: {}, scores: {}, startedAt: null };

let raw: string | null = null;
let cache: MeqState = EMPTY;
const listeners = new Set<() => void>();

function read(): MeqState {
  try {
    const r = localStorage.getItem(KEY);
    if (r !== raw) {
      raw = r;
      cache = r ? { ...EMPTY, ...(JSON.parse(r) as Partial<MeqState>) } : EMPTY;
    }
  } catch {
    // Storage blocked (private mode etc.) — keep the in-memory copy.
  }
  return cache;
}

function subscribe(cb: () => void) {
  listeners.add(cb);
  const onStorage = (e: StorageEvent) => e.key === KEY && cb();
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(cb);
    window.removeEventListener("storage", onStorage);
  };
}

export function useMeqState(): MeqState {
  return useSyncExternalStore(subscribe, read, () => EMPTY);
}

export function updateMeq(fn: (s: MeqState) => MeqState) {
  cache = fn(read());
  try {
    raw = JSON.stringify(cache);
    localStorage.setItem(KEY, raw);
  } catch {
    // ignore — state still lives in memory for this tab
  }
  listeners.forEach((l) => l());
}

export function resetMeq() {
  updateMeq(() => EMPTY);
}

// Ticks once per second while mounted (server snapshot: 0).
function subscribeClock(cb: () => void) {
  const t = setInterval(cb, 1000);
  return () => clearInterval(t);
}
export function useNow(): number {
  return useSyncExternalStore(
    subscribeClock,
    () => Math.floor(Date.now() / 1000) * 1000,
    () => 0
  );
}

// ── scoring helpers ─────────────────────────────────────────────────────────

export function partScore(s: MeqState, part: MeqPart): number {
  return part.key.reduce((sum, k, i) => sum + Math.min(s.scores[`${part.id}:${i}`] ?? 0, k.marks), 0);
}

export function stationProgress(s: MeqState, st: MeqStation) {
  const done = st.parts.filter((p) => s.submitted[p.id]);
  return {
    done: done.length,
    total: st.parts.length,
    score: done.reduce((sum, p) => sum + partScore(s, p), 0),
    attemptedMarks: done.reduce((sum, p) => sum + p.marks, 0),
  };
}
