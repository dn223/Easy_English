import { createRateLimiter } from "@/lib/rate-limit";

/**
 * Voces naturales con Google Cloud Text-to-Speech. Se activa definiendo GOOGLE_TTS_API_KEY.
 * Sin clave responde 503 y el navegador usa su propia voz.
 */

const MAX_CHARS = 700;
const DEFAULT_VOICES = ["en-US-Neural2-F", "en-US-Neural2-D", "en-US-Neural2-H"];
const allowed = createRateLimiter(240, 10 * 60 * 1000);

function voices(): string[] {
  const configured = process.env.TTS_VOICES?.split(",").map((voice) => voice.trim()).filter(Boolean);
  return configured?.length ? configured : DEFAULT_VOICES;
}

export async function GET(request: Request) {
  const key = process.env.GOOGLE_TTS_API_KEY;
  if (!key) return new Response("TTS no configurado", { status: 503 });

  const params = new URL(request.url).searchParams;
  const text = params.get("text")?.trim() ?? "";
  const voiceIndex = Number(params.get("v") ?? 0);
  const rate = Math.min(1.2, Math.max(0.7, Number(params.get("r") ?? 1) || 1));
  if (!text || text.length > MAX_CHARS || !Number.isInteger(voiceIndex) || voiceIndex < 0) {
    return new Response("Petición no válida", { status: 400 });
  }
  if (!allowed(request)) return new Response("Demasiadas peticiones", { status: 429 });

  const list = voices();
  const response = await fetch(`https://texttospeech.googleapis.com/v1/text:synthesize?key=${encodeURIComponent(key)}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      input: { text },
      voice: { languageCode: "en-US", name: list[voiceIndex % list.length] },
      audioConfig: { audioEncoding: "MP3", speakingRate: rate },
    }),
  }).catch(() => null);

  if (!response?.ok) {
    console.error("TTS: Google respondió", response?.status, await response?.text().catch(() => ""));
    return new Response("No se pudo generar el audio", { status: 502 });
  }
  const data = (await response.json()) as { audioContent?: string };
  if (!data.audioContent) return new Response("Respuesta vacía", { status: 502 });

  return new Response(Buffer.from(data.audioContent, "base64"), {
    headers: {
      "Content-Type": "audio/mpeg",
      // El mismo texto siempre suena igual: se guarda en el navegador y en la CDN para no pagarlo dos veces.
      "Cache-Control": "public, max-age=31536000, s-maxage=31536000, immutable",
    },
  });
}
