"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/** Cuenta atrás en segundos. `start` y `stop` se llaman desde manejadores de eventos, no al renderizar. */
export function useCountdown() {
  const [left, setLeft] = useState<number | null>(null);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  const clear = () => {
    if (timer.current) clearInterval(timer.current);
    timer.current = null;
  };

  const stop = useCallback(() => {
    clear();
    setLeft(null);
  }, []);

  const start = useCallback((seconds: number, onExpire: () => void) => {
    clear();
    const deadline = Date.now() + seconds * 1000;
    setLeft(seconds);
    timer.current = setInterval(() => {
      const remaining = Math.max(0, Math.ceil((deadline - Date.now()) / 1000));
      setLeft(remaining);
      if (remaining === 0) {
        clear();
        onExpire();
      }
    }, 250);
  }, []);

  useEffect(() => clear, []);

  return { left, start, stop };
}

export function formatClock(seconds: number): string {
  return `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, "0")}`;
}
