export function GET() {
  return Response.json({ enabled: Boolean(process.env.GOOGLE_TTS_API_KEY) }, { headers: { "Cache-Control": "no-store" } });
}
