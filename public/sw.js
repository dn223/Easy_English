/*
 * Service worker de Easy English: deja la app usable sin conexión.
 * - Al instalarse guarda todas las páginas (la lista sale de /offline-pages) con sus scripts, estilos y fuentes.
 * - Páginas: primero la red (para tener lo último) y, sin conexión, la copia guardada.
 * - Archivos de /_next/static: primero la caché (llevan hash, nunca cambian).
 * - Audio de voces naturales: se guarda la primera vez que suena.
 * - El resto de /api (tutora) necesita conexión.
 */

const VERSION = new URL(self.location.href).searchParams.get("v") || "dev";
const PAGES = `ee-pages-${VERSION}`;
const ASSETS = "ee-assets";
const AUDIO = "ee-audio";

const pageKey = (url) => new URL(url, self.location.origin).pathname;

async function precache() {
  const pages = await caches.open(PAGES);
  const assets = await caches.open(ASSETS);
  const list = await fetch("/offline-pages", { cache: "no-store" }).then((response) => response.json());
  const found = new Set(["/manifest.webmanifest", "/icon.svg", "/icons/icon-192.png", "/icons/icon-512.png"]);

  for (const path of list.pages) {
    try {
      const response = await fetch(path, { cache: "no-store" });
      if (!response.ok) continue;
      await pages.put(path, response.clone());
      const html = await response.text();
      for (const match of html.matchAll(/(?:src|href)="(\/_next\/static\/[^"]+)"/g)) found.add(match[1]);
    } catch {
      // Una página que falle no impide guardar las demás.
    }
  }

  await Promise.all(
    [...found].map(async (url) => {
      try {
        let response = await assets.match(url);
        if (!response) {
          response = await fetch(url);
          if (!response.ok) return;
          await assets.put(url, response.clone());
        }
        // Las fuentes van dentro de los CSS.
        if (url.endsWith(".css")) {
          const css = await response.clone().text();
          for (const match of css.matchAll(/url\((\/_next\/static\/media\/[^)]+)\)/g)) {
            if (!(await assets.match(match[1]))) await assets.add(match[1]).catch(() => {});
          }
        }
      } catch {
        // Si un archivo falla se volverá a pedir cuando haga falta.
      }
    }),
  );
}

self.addEventListener("install", (event) => {
  self.skipWaiting();
  event.waitUntil(precache().catch(() => {}));
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      for (const name of await caches.keys()) {
        if (name.startsWith("ee-pages-") && name !== PAGES) await caches.delete(name);
      }
      await self.clients.claim();
    })(),
  );
});

async function cacheFirst(request, cacheName) {
  const cache = await caches.open(cacheName);
  const hit = await cache.match(request);
  if (hit) return hit;
  const response = await fetch(request);
  if (response.ok) await cache.put(request, response.clone());
  return response;
}

async function page(request) {
  const cache = await caches.open(PAGES);
  try {
    const response = await fetch(request);
    if (response.ok) await cache.put(pageKey(request.url), response.clone());
    return response;
  } catch {
    return (
      (await cache.match(pageKey(request.url))) ||
      (await caches.match(pageKey(request.url))) ||
      (await cache.match("/")) ||
      new Response("Sin conexión", { status: 503, headers: { "Content-Type": "text/plain; charset=utf-8" } })
    );
  }
}

self.addEventListener("fetch", (event) => {
  const { request } = event;
  if (request.method !== "GET") return;
  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

  if (url.pathname === "/api/tts") {
    event.respondWith(cacheFirst(request, AUDIO));
    return;
  }
  if (url.pathname.startsWith("/api/")) return;
  if (url.pathname.startsWith("/_next/static/")) {
    event.respondWith(cacheFirst(request, ASSETS));
    return;
  }
  if (request.mode === "navigate") {
    event.respondWith(page(request));
    return;
  }
  // Datos de navegación interna de Next: si fallan sin conexión, Next recarga la página y la sirve la caché.
  if (request.headers.get("RSC") === "1" || url.searchParams.has("_rsc")) return;

  event.respondWith(
    (async () => {
      const cache = await caches.open(ASSETS);
      const hit = await cache.match(request);
      const network = fetch(request)
        .then((response) => {
          if (response.ok) void cache.put(request, response.clone());
          return response;
        })
        .catch(() => hit || Response.error());
      return hit || network;
    })(),
  );
});
