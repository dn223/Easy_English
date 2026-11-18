"use client";

import { WifiOff } from "lucide-react";
import { useEffect, useSyncExternalStore } from "react";

function subscribe(listener: () => void) {
  window.addEventListener("online", listener);
  window.addEventListener("offline", listener);
  return () => {
    window.removeEventListener("online", listener);
    window.removeEventListener("offline", listener);
  };
}

/** Registra el service worker (solo en producción) y avisa cuando no hay conexión. */
export function OfflineSupport({ version }: { version: string }) {
  const offline = useSyncExternalStore(subscribe, () => !navigator.onLine, () => false);

  useEffect(() => {
    if (process.env.NODE_ENV !== "production" || !("serviceWorker" in navigator)) return;
    navigator.serviceWorker.register(`/sw.js?v=${encodeURIComponent(version)}`).catch(() => {
      // Sin service worker la app funciona igual, solo que no sin conexión.
    });
  }, [version]);

  if (!offline) return null;
  return (
    <div role="status" className="fixed inset-x-0 bottom-4 z-50 flex justify-center px-4">
      <p className="arctic flex max-w-xl items-center gap-2.5 rounded-full px-4 py-2.5 text-sm font-medium text-navy-800">
        <WifiOff className="size-4 shrink-0 text-ice-500" aria-hidden />
        Sin conexión. Puedes seguir estudiando; la tutora y las voces naturales vuelven con internet.
      </p>
    </div>
  );
}
