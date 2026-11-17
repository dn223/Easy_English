import Anthropic from "@anthropic-ai/sdk";
import { betaZodOutputFormat } from "@anthropic-ai/sdk/helpers/beta/zod";
import { z } from "zod";
import {
  TUTOR_MAX_CHARS,
  TUTOR_MAX_TURNS,
  TUTOR_NAME,
  tutorLevels,
  tutorScenarios,
  type TutorErrorCode,
  type TutorReply,
} from "@/content/tutor";

const RequestSchema = z.object({
  scenario: z.string(),
  level: z.enum(tutorLevels),
  messages: z
    .array(z.object({ role: z.enum(["user", "assistant"]), content: z.string().min(1).max(TUTOR_MAX_CHARS) }))
    .min(1)
    .max(TUTOR_MAX_TURNS * 2),
});

const ReplySchema = z.object({
  reply: z.string().describe("What the tutor says next, in English."),
  correction: z
    .object({
      corrected: z.string().describe("The learner's last message rewritten in correct, natural English."),
      note: z.string().describe("One short sentence in Spanish explaining the main fix."),
    })
    .nullable()
    .describe("Null when the learner's last message needs no correction."),
});

const LEVEL_GUIDE: Record<(typeof tutorLevels)[number], string> = {
  A2: "The learner is at CEFR A2. Use short, simple sentences, common words and the present, past simple and 'going to'. Avoid idioms.",
  B1: "The learner is at CEFR B1. Use everyday language at a natural pace, with some less common vocabulary they can guess from context.",
  B2: "The learner is at CEFR B2. Speak naturally, including idiomatic phrases, and ask questions that invite opinions and reasons.",
};

function systemPrompt(scenarioId: string, level: (typeof tutorLevels)[number]): string | null {
  const scenario = tutorScenarios.find((entry) => entry.id === scenarioId);
  if (!scenario) return null;
  return `You are ${TUTOR_NAME}, an English conversation tutor inside a study app for Spanish speakers. In this session you play ${scenario.role}. The learner practises by speaking aloud, and what they say reaches you as an automatic speech transcript, so it has little or no punctuation and may contain words the recogniser misheard.

You opened the conversation by saying: "${scenario.opener}"

${LEVEL_GUIDE[level]}

Your reply is read aloud by a speech synthesiser, so write it as plain spoken English: one to three sentences, no lists, no emoji, no stage directions. Stay in your role and keep the conversation moving, usually by ending with a question or a prompt the learner can answer. If the learner switches to Spanish or seems lost, help them in simple English and offer the phrase they were looking for.

After your reply, decide whether the learner's last message deserves a correction. Correct real problems with grammar, word choice or word order that a teacher would point out. Leave punctuation, capitalisation and likely transcription slips alone, since the learner did not type them, and return null when the message was fine. When you do correct, give the whole sentence as a fluent speaker would say it and one short sentence in Spanish naming the main fix.`;
}

// Freno básico contra abuso mientras no haya cuentas: memoria del proceso, por IP.
const WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS = 40;
const hits = new Map<string, number[]>();

function allowed(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((time) => now - time < WINDOW_MS);
  if (recent.length >= MAX_REQUESTS) {
    hits.set(ip, recent);
    return false;
  }
  hits.set(ip, [...recent, now]);
  return true;
}

function fail(error: TutorErrorCode, status: number) {
  return Response.json({ error }, { status });
}

export async function POST(request: Request) {
  const parsed = RequestSchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success || parsed.data.messages.at(-1)?.role !== "user") return fail("invalid", 400);

  const system = systemPrompt(parsed.data.scenario, parsed.data.level);
  if (!system) return fail("invalid", 400);

  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "local";
  if (!allowed(ip)) return fail("busy", 429);

  try {
    const client = new Anthropic();
    const message = await client.beta.messages.parse({
      model: process.env.TUTOR_MODEL ?? "claude-opus-5-5",
      // Respuestas de una a tres frases: el tope bajo limita el gasto de un endpoint aún sin login.
      max_tokens: 4000,
      system,
      messages: parsed.data.messages,
      output_config: { effort: "low", format: betaZodOutputFormat(ReplySchema) },
      // Si el modelo declina por política, el servidor reintenta con su modelo de respaldo.
      betas: ["server-side-fallback-2026-07-01"],
      fallbacks: "default",
    });

    if (message.stop_reason === "refusal" || !message.parsed_output) return fail("declined", 422);
    return Response.json(message.parsed_output satisfies TutorReply);
  } catch (error) {
    if (error instanceof Anthropic.AuthenticationError || error instanceof Anthropic.PermissionDeniedError) {
      return fail("setup", 503);
    }
    if (error instanceof Anthropic.RateLimitError) return fail("busy", 429);
    if (error instanceof Anthropic.APIError) {
      console.error("Tutor: error de la API de Claude", error.status, error.message);
      return fail("failed", 502);
    }
    // Sin credenciales el SDK falla antes de enviar nada, con un Error genérico.
    if (!process.env.ANTHROPIC_API_KEY && !process.env.ANTHROPIC_AUTH_TOKEN) {
      console.error("Tutor: no hay credenciales de la API de Claude. Define ANTHROPIC_API_KEY.");
      return fail("setup", 503);
    }
    console.error("Tutor: error inesperado", error);
    return fail("failed", 500);
  }
}
