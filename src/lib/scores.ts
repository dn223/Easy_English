"use client";

import { useSyncExternalStore } from "react";
import { activities } from "@/content/catalog";
import type { Attempt, ModuleId } from "./types";

// Sin login todavía: los intentos viven en el navegador. Todo pasa por estas
// funciones para poder cambiar a una API con base de datos sin tocar las pantallas.
const KEY = "easy-english:attempts:v1";
const EMPTY: Attempt[] = [];

let cache: Attempt[] | null = null;
const listeners = new Set<() => void>();

function read(): Attempt[] {
  if (cache) return cache;
  try {
    const parsed: unknown = JSON.parse(localStorage.getItem(KEY) ?? "[]");
    cache = Array.isArray(parsed) && parsed.length > 0 ? (parsed as Attempt[]) : EMPTY;
  } catch {
    cache = EMPTY;
  }
  return cache;
}

function write(next: Attempt[]) {
  cache = next.length > 0 ? next : EMPTY;
  try {
    localStorage.setItem(KEY, JSON.stringify(next));
  } catch {
    // Almacenamiento bloqueado o lleno: el progreso dura lo que dure la pestaña.
  }
  listeners.forEach((listener) => listener());
}

function subscribe(listener: () => void) {
  const onStorage = (event: StorageEvent) => {
    if (event.key !== KEY) return;
    cache = null;
    listener();
  };
  listeners.add(listener);
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", onStorage);
  };
}

export function useAttempts(): Attempt[] {
  return useSyncExternalStore(subscribe, read, () => EMPTY);
}

export function saveAttempt(attempt: Omit<Attempt, "id" | "at">) {
  const entry: Attempt = {
    ...attempt,
    score: Math.round(Math.min(100, Math.max(0, attempt.score))),
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    at: new Date().toISOString(),
  };
  write([...read(), entry]);
}

export function clearAttempts() {
  write([]);
}

export const TEST_ACTIVITY_ID = "test-simulacro";

/** Convierte un porcentaje en banda 1–6 (pasos de 0.5). Es una estimación propia, no la tabla oficial. */
export function toBand(percent: number): number {
  return 1 + Math.round(Math.min(100, Math.max(0, percent)) / 10) / 2;
}

export function testAttempts(attempts: Attempt[]): Attempt[] {
  return attempts.filter((attempt) => attempt.module === "test" && attempt.bands);
}

export type ModuleSummary = {
  score: number | null;
  done: number;
  total: number;
};

export type Summary = {
  global: number | null;
  done: number;
  total: number;
  modules: Record<ModuleId, ModuleSummary>;
  best: Record<string, number>;
};

const MODULE_IDS: ModuleId[] = ["listening", "reading", "writing", "speaking"];

/** Nota de un módulo = media de la mejor nota de cada actividad hecha. La global = media de los módulos con notas. */
export function summarize(attempts: Attempt[]): Summary {
  const best: Record<string, number> = {};
  for (const attempt of attempts) {
    best[attempt.activityId] = Math.max(best[attempt.activityId] ?? 0, attempt.score);
  }

  const modules = {} as Record<ModuleId, ModuleSummary>;
  for (const id of MODULE_IDS) {
    const own = activities.filter((activity) => activity.module === id);
    const scores = own.flatMap((activity) => (activity.id in best ? [best[activity.id]] : []));
    modules[id] = {
      score: scores.length ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length) : null,
      done: scores.length,
      total: own.length,
    };
  }

  const scored = MODULE_IDS.flatMap((id) => (modules[id].score === null ? [] : [modules[id].score]));
  return {
    global: scored.length ? Math.round(scored.reduce((a, b) => a + b, 0) / scored.length) : null,
    done: MODULE_IDS.reduce((sum, id) => sum + modules[id].done, 0),
    total: activities.length,
    modules,
    best,
  };
}
