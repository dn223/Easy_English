"use client";

import { ArrowUp, Mic, RotateCcw, Square, Volume2, VolumeX } from "lucide-react";
import { useEffect, useRef, useState, type FormEvent } from "react";
import {
  TUTOR_MAX_CHARS,
  TUTOR_MAX_TURNS,
  TUTOR_NAME,
  tutorLevels,
  tutorScenarios,
  type TutorErrorCode,
  type TutorLevel,
  type TutorReply,
  type TutorScenario,
} from "@/content/tutor";
import { listenOnce, recognitionSupported, speak, ttsSupported, type Accent } from "@/lib/speech";
import { useClientValue } from "@/lib/use-client-value";
import { AccentToggle } from "./accent-toggle";
import { buttonClass } from "./ui";

type Turn = {
  id: number;
  role: "tutor" | "user";
  text: string;
  correction?: TutorReply["correction"];
};

type Problem = TutorErrorCode | "network";

const PROBLEMS: Record<Problem, string> = {
  setup:
    "La tutora todavía no está activada: falta configurar la clave de la API de Claude (ANTHROPIC_API_KEY) en el servidor.",
  busy: "Hay demasiadas peticiones ahora mismo. Espera un momento y vuelve a intentarlo.",
  declined: "La tutora no pudo responder a ese mensaje. Prueba a decirlo de otra forma.",
  invalid: "Ese mensaje no se pudo enviar. Prueba con uno más corto.",
  failed: "No se pudo obtener respuesta de la tutora. Vuelve a intentarlo.",
  network: "No hay conexión con el servidor. Revisa tu internet y vuelve a intentarlo.",
};

const MIC_ERRORS: Record<string, string> = {
  "no-speech": "No te escuché. Inténtalo otra vez o escribe tu mensaje.",
  "not-allowed": "El navegador no tiene permiso para usar el micrófono. Puedes escribir tu mensaje.",
  "service-not-allowed": "El navegador no tiene permiso para usar el micrófono. Puedes escribir tu mensaje.",
  "audio-capture": "No encuentro un micrófono. Puedes escribir tu mensaje.",
};

export function TutorChat() {
  const canListen = useClientValue(recognitionSupported, true);
  const canSpeak = useClientValue(ttsSupported, true);

  const [scenario, setScenario] = useState<TutorScenario | null>(null);
  const [picked, setPicked] = useState(tutorScenarios[0].id);
  const [level, setLevel] = useState<TutorLevel>("B1");
  const [accent, setAccent] = useState<Accent>("en-US");
  const [voiceOn, setVoiceOn] = useState(true);

  const [turns, setTurns] = useState<Turn[]>([]);
  const [draft, setDraft] = useState("");
  const [sending, setSending] = useState(false);
  const [listening, setListening] = useState(false);
  const [problem, setProblem] = useState<Problem | null>(null);
  const [micError, setMicError] = useState<string | null>(null);

  const stopSpeechRef = useRef<() => void>(() => {});
  const stopListenRef = useRef<() => void>(() => {});
  const nextId = useRef(1);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(
    () => () => {
      stopSpeechRef.current();
      stopListenRef.current();
    },
    [],
  );

  useEffect(() => {
    endRef.current?.scrollIntoView({ block: "nearest", behavior: "smooth" });
  }, [turns.length, sending]);

  const say = (text: string) => {
    if (!voiceOn || !canSpeak) return;
    stopSpeechRef.current = speak([{ text }], { accent });
  };

  const start = () => {
    const chosen = tutorScenarios.find((entry) => entry.id === picked) ?? tutorScenarios[0];
    setScenario(chosen);
    setTurns([{ id: nextId.current++, role: "tutor", text: chosen.opener }]);
    setProblem(null);
    setMicError(null);
    say(chosen.opener);
  };

  const leave = () => {
    stopSpeechRef.current();
    stopListenRef.current();
    setListening(false);
    setScenario(null);
    setTurns([]);
    setDraft("");
    setProblem(null);
  };

  /** Envía la conversación tal como está; el último turno tiene que ser del alumno. */
  const request = async (history: Turn[]) => {
    if (!scenario) return;
    setSending(true);
    setProblem(null);
    try {
      const response = await fetch("/api/tutor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          scenario: scenario.id,
          level,
          // La frase inicial de la tutora ya va en las instrucciones del servidor.
          messages: history.slice(1).map((turn) => ({
            role: turn.role === "tutor" ? "assistant" : "user",
            content: turn.text,
          })),
        }),
      });
      const data: unknown = await response.json().catch(() => null);
      if (!response.ok || !data || typeof data !== "object" || !("reply" in data)) {
        const code = data && typeof data === "object" && "error" in data ? (data.error as TutorErrorCode) : "failed";
        setProblem(code in PROBLEMS ? code : "failed");
        return;
      }
      const reply = data as TutorReply;
      const lastUser = history.at(-1)!.id;
      setTurns((current) => [
        ...current.map((turn) => (turn.id === lastUser ? { ...turn, correction: reply.correction } : turn)),
        { id: nextId.current++, role: "tutor", text: reply.reply },
      ]);
      say(reply.reply);
    } catch {
      setProblem("network");
    } finally {
      setSending(false);
    }
  };

  const send = (raw: string) => {
    const text = raw.trim().slice(0, TUTOR_MAX_CHARS);
    if (!text || sending) return;
    stopSpeechRef.current();
    const history: Turn[] = [...turns, { id: nextId.current++, role: "user", text }];
    setTurns(history);
    setDraft("");
    void request(history);
  };

  const toggleMic = () => {
    if (listening) {
      stopListenRef.current();
      setListening(false);
      return;
    }
    stopSpeechRef.current();
    setMicError(null);
    setListening(true);
    stopListenRef.current = listenOnce({
      accent,
      onResult: (alternatives) => send(alternatives[0] ?? ""),
      onError: (code) => setMicError(MIC_ERRORS[code] ?? "No se pudo usar el micrófono. Puedes escribir tu mensaje."),
      onEnd: () => setListening(false),
    });
  };

  const submit = (event: FormEvent) => {
    event.preventDefault();
    send(draft);
  };

  if (!scenario) {
    return (
      <section className="arctic animate-rise mx-auto max-w-3xl rounded-[28px] p-6 sm:p-8" style={{ animationDelay: "80ms" }}>
        <fieldset>
          <legend className="text-xl font-semibold text-navy-900">Elige una situación</legend>
          <div className="mt-4 grid gap-2.5 sm:grid-cols-2">
            {tutorScenarios.map((entry) => {
              const active = entry.id === picked;
              return (
                <label
                  key={entry.id}
                  className={`press flex cursor-pointer flex-col rounded-2xl px-4 py-3.5 has-focus-visible:outline-2 has-focus-visible:outline-offset-2 has-focus-visible:outline-ice-500 ${
                    active
                      ? "bg-ice-100 shadow-[0_0_0_2px_var(--color-ice-500)]"
                      : "bg-white shadow-[0_0_0_1px_rgb(10_31_60/0.09)] hover:bg-ice-50"
                  }`}
                >
                  <input
                    type="radio"
                    name="scenario"
                    className="sr-only"
                    checked={active}
                    onChange={() => setPicked(entry.id)}
                  />
                  <span className="text-[16px] font-semibold text-navy-900">{entry.title}</span>
                  <span className="mt-0.5 text-sm leading-snug text-navy-500">{entry.summary}</span>
                </label>
              );
            })}
          </div>
        </fieldset>

        <div className="mt-6 flex flex-wrap gap-x-8 gap-y-5">
          <div>
            <p className="mb-2 text-sm font-semibold text-navy-500">Tu nivel</p>
            <div role="radiogroup" aria-label="Tu nivel" className="inline-flex rounded-full bg-ice-100 p-1">
              {tutorLevels.map((option) => (
                <button
                  key={option}
                  type="button"
                  role="radio"
                  aria-checked={option === level}
                  onClick={() => setLevel(option)}
                  className={`press min-h-9 rounded-full px-4 text-sm font-semibold ${
                    option === level ? "bg-navy-900 text-white" : "text-navy-600 hover:text-navy-900"
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
          <div>
            <p className="mb-2 text-sm font-semibold text-navy-500">Acento de {TUTOR_NAME}</p>
            <AccentToggle value={accent} onChange={setAccent} />
          </div>
        </div>

        <button type="button" onClick={start} className={buttonClass("primary", "mt-7 h-12 px-6")}>
          Empezar a conversar
        </button>
        {!canListen && (
          <p className="mt-4 text-sm leading-relaxed text-navy-500">
            Este navegador no reconoce la voz, así que escribirás tus mensajes. Para hablar, usa Chrome, Edge o Safari.
          </p>
        )}
      </section>
    );
  }

  const userTurns = turns.filter((turn) => turn.role === "user").length;
  const limitReached = userTurns >= TUTOR_MAX_TURNS;
  const awaitingRetry = problem !== null && turns.at(-1)?.role === "user";

  return (
    <div className="mx-auto max-w-3xl">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <p className="text-[15px] font-semibold text-navy-800">
          {scenario.title} <span className="font-normal text-navy-400">· nivel {level}</span>
        </p>
        <div className="flex items-center gap-1">
          {canSpeak && (
            <button
              type="button"
              aria-pressed={voiceOn}
              onClick={() => {
                if (voiceOn) stopSpeechRef.current();
                setVoiceOn(!voiceOn);
              }}
              className={buttonClass("ghost", "px-4 text-sm")}
            >
              {voiceOn ? <Volume2 className="size-4" aria-hidden /> : <VolumeX className="size-4" aria-hidden />}
              {voiceOn ? "Voz activada" : "Voz apagada"}
            </button>
          )}
          <button type="button" onClick={leave} className={buttonClass("ghost", "px-4 text-sm")}>
            Terminar
          </button>
        </div>
      </div>

      <section className="arctic rounded-[28px] p-4 sm:p-6" aria-label="Conversación">
        <ol className="space-y-4" aria-live="polite">
          {turns.map((turn) =>
            turn.role === "tutor" ? (
              <li key={turn.id} className="animate-rise flex max-w-[88%] flex-col items-start">
                <span className="mb-1 ml-1 text-xs font-semibold text-navy-400">{TUTOR_NAME}</span>
                <div className="rounded-3xl rounded-tl-lg bg-ice-100 px-4 py-3 text-[17px] leading-relaxed text-navy-900" lang="en">
                  {turn.text}
                </div>
                {canSpeak && (
                  <button
                    type="button"
                    onClick={() => {
                      stopSpeechRef.current = speak([{ text: turn.text }], { accent });
                    }}
                    className="press mt-1 inline-flex min-h-10 items-center gap-1.5 rounded-full px-3 text-sm font-semibold text-navy-500 hover:bg-ice-100 hover:text-navy-900"
                  >
                    <Volume2 className="size-4" aria-hidden />
                    Repetir
                  </button>
                )}
              </li>
            ) : (
              <li key={turn.id} className="animate-rise ml-auto flex max-w-[88%] flex-col items-end">
                <span className="mr-1 mb-1 text-xs font-semibold text-navy-400">Tú</span>
                <div className="rounded-3xl rounded-tr-lg bg-navy-900 px-4 py-3 text-[17px] leading-relaxed text-white" lang="en">
                  {turn.text}
                </div>
                {turn.correction && (
                  <div className="mt-2 rounded-2xl bg-ok-soft px-4 py-3 text-[15px] leading-relaxed text-navy-800">
                    <p>
                      <span className="font-semibold text-ok">Mejor así: </span>
                      <span lang="en" className="font-semibold text-navy-900">
                        {turn.correction.corrected}
                      </span>
                    </p>
                    <p className="mt-1 text-navy-600">{turn.correction.note}</p>
                  </div>
                )}
              </li>
            ),
          )}
          {sending && (
            <li className="flex items-center gap-1.5 px-2 py-2" aria-label={`${TUTOR_NAME} está respondiendo`}>
              {[0, 1, 2].map((dot) => (
                <span
                  key={dot}
                  className="size-2 animate-pulse rounded-full bg-ice-500"
                  style={{ animationDelay: `${dot * 160}ms` }}
                  aria-hidden
                />
              ))}
            </li>
          )}
        </ol>
        <div ref={endRef} className="scroll-mb-28" />

        {problem && (
          <div className="mt-4 rounded-2xl bg-bad-soft px-4 py-3 text-[15px] leading-relaxed text-navy-900" role="alert">
            <p>{PROBLEMS[problem]}</p>
            {awaitingRetry && problem !== "setup" && (
              <button type="button" onClick={() => void request(turns)} className={buttonClass("soft", "mt-3")}>
                <RotateCcw className="size-4" aria-hidden />
                Reintentar
              </button>
            )}
          </div>
        )}
      </section>

      {limitReached ? (
        <p className="mt-4 rounded-2xl bg-ice-100 px-4 py-3 text-[15px] text-navy-700">
          Esta conversación llegó a su límite de {TUTOR_MAX_TURNS} mensajes. Termínala y empieza otra cuando quieras.
        </p>
      ) : (
        <form onSubmit={submit} className="arctic sticky bottom-4 mt-4 flex items-center gap-2 rounded-full p-2">
          {canListen && (
            <button
              type="button"
              onClick={toggleMic}
              disabled={sending}
              aria-label={listening ? "Dejar de escuchar" : "Hablar"}
              className={`press relative flex size-12 shrink-0 items-center justify-center rounded-full disabled:opacity-45 ${
                listening ? "bg-ice-500 text-white" : "bg-navy-900 text-white hover:bg-navy-800"
              }`}
            >
              {listening && <span className="animate-pulse-ring absolute inset-2 rounded-full bg-ice-300" aria-hidden />}
              {listening ? <Square className="relative size-4" aria-hidden /> : <Mic className="relative size-5" aria-hidden />}
            </button>
          )}
          <input
            type="text"
            lang="en"
            value={draft}
            onChange={(event) => setDraft(event.target.value)}
            maxLength={TUTOR_MAX_CHARS}
            placeholder={listening ? "Te escucho…" : canListen ? "Habla o escribe en inglés" : "Escribe en inglés"}
            aria-label="Tu mensaje en inglés"
            className="h-12 min-w-0 flex-1 rounded-full bg-transparent px-3 text-[16px] text-navy-900 placeholder:text-navy-400 focus:outline-none"
          />
          <button
            type="submit"
            disabled={sending || !draft.trim()}
            aria-label="Enviar"
            className="press flex size-12 shrink-0 items-center justify-center rounded-full bg-ice-100 text-navy-900 hover:bg-ice-200 disabled:opacity-45"
          >
            <ArrowUp className="size-5" aria-hidden />
          </button>
        </form>
      )}
      <div aria-live="polite">{micError && <p className="mt-3 text-sm text-navy-600">{micError}</p>}</div>
    </div>
  );
}
