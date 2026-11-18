/** Freno básico por IP en memoria del proceso. No sustituye a las cuentas, pero evita abusos simples. */
export function createRateLimiter(maxRequests: number, windowMs: number) {
  const hits = new Map<string, number[]>();
  return function allowed(request: Request): boolean {
    const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "local";
    const now = Date.now();
    const recent = (hits.get(ip) ?? []).filter((time) => now - time < windowMs);
    const ok = recent.length < maxRequests;
    hits.set(ip, ok ? [...recent, now] : recent);
    return ok;
  };
}
