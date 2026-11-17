"use client";

import { useSyncExternalStore } from "react";

// Lecciones de gramática marcadas como estudiadas. Es modo estudio: no cuenta para las notas.
const KEY = "easy-english:studied:v1";
const EMPTY: string[] = [];

let cache: string[] | null = null;
const listeners = new Set<() => void>();

function read(): string[] {
  if (cache) return cache;
  try {
    const parsed: unknown = JSON.parse(localStorage.getItem(KEY) ?? "[]");
    cache = Array.isArray(parsed) && parsed.length > 0 ? parsed.filter((id) => typeof id === "string") : EMPTY;
  } catch {
    cache = EMPTY;
  }
  return cache;
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

export function useStudied(): string[] {
  return useSyncExternalStore(subscribe, read, () => EMPTY);
}

export function setStudied(id: string, studied: boolean) {
  const current = read();
  const next = studied ? [...new Set([...current, id])] : current.filter((entry) => entry !== id);
  cache = next.length > 0 ? next : EMPTY;
  try {
    localStorage.setItem(KEY, JSON.stringify(next));
  } catch {
    // Sin almacenamiento, la marca dura lo que dure la pestaña.
  }
  listeners.forEach((listener) => listener());
}
