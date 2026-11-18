"use client";

import { ArrowRight, Eye, Mic, Square, Volume2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { REPEAT_ACTIVITY_ID, repeatItems } from "@/content/speaking";
import { saveAttempt } from "@/lib/scores";
import { listenOnce, recognitionSupported, speak, ttsSupported } from "@/lib/speech";
import { matchWords, similarity } from "@/lib/text";
import type { RepeatItem } from "@/lib/types";
import { useClientValue } from "@/lib/use-client-value";
import { ResultPanel } from "./result-panel";
import { buttonClass } from "./ui";

type Phase = "idle" | "playing" | "listening";
type Outcome = { score: number; heard: string | null };

const SELF_RATINGS = [
  { score: 100, label: "La dije igual" },
  { score: 60, label: "Con algún error" },
  { score: 20, label: "No pude" },
];

const ERRORS: Record<string, string> = {
  "no-speech": "No te escuché. Acércate al micrófono e inténtalo otra vez.",
  "audio-capture": "No encuentro un micrófono en este dispositivo.",
  "not-allowed": "El navegador no tiene permiso para usar el micrófono.",
  "service-not-allowed": "El navegador no tiene permiso para usar el micrófono.",
  network: "El reconocimiento de voz necesita conexión y ahora no responde.",
};

type RepeatExerciseProps = {
  items?: RepeatItem[];
  /** Si se pasa, la nota (0–100) se entrega aquí en vez de guardarse como práctica. */
  onFinish?: (score: number) => void;
};

export function RepeatExercise({ items = repeatItems, onFinish }: RepeatExerciseProps) {
  const canRecognize = useClientValue(recognitionSupported, true);
  const canSpeak = useClientValue(ttsSupported, true);
  const [index, setIndex] = useState(0);
  const [phase, setPhase] = useState<Phase>("idle");
  const [outcome, setOutcome] = useState<Outcome | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [manual, setManual] = useState(false);
  const [scores, setScores] = useState<number[]>([]);
  const stopRef = useRef<() => void>(() => {});

  useEffect(() => () => stopRef.current(), []);

  const finished = index >= items.length;
  const item = items[Math.min(index, items.length - 1)];
  const selfRated = manual || !canRecognize;
  const showText = revealed || outcome !== null || !canSpeak;

  const halt = () => {
    stopRef.current();
    stopRef.current = () => {};
    setPhase("idle");
  };

  const playSentence = () => {
    halt();
    setPhase("playing");
    stopRef.current = speak([{ text: item.text }], { onEnd: () => setPhase("idle") });
  };

  const record = () => {
    halt();
    setError(null);
    setPhase("listening");
    stopRef.current = listenOnce({
      onResult: (alternatives) => {
        const best = alternatives
          .map((heard) => ({ heard, score: similarity(item.text, heard) }))
          .sort((a, b) => b.score - a.score)[0];
        setOutcome((current) => (current && current.score >= best.score ? current : best));
      },
      onError: (code) => {
        setError(ERRORS[code] ?? "No se pudo usar el reconocimiento de voz.");
        if (code !== "no-speech") setManual(true);
      },
      onEnd: () => setPhase("idle"),
    });
  };

  const next = () => {
    halt();
    const all = [...scores, outcome?.score ?? 0];
    if (all.length === items.length) {
      const score = all.reduce((a, b) => a + b, 0) / all.length;
      if (onFinish) onFinish(score);
      else saveAttempt({ module: "speaking", activityId: REPEAT_ACTIVITY_ID, title: "Listen and Repeat", score });
    }
    setScores(all);
    setOutcome(null);
    setRevealed(false);
    setError(null);
    setIndex((current) => current + 1);
  };

  const retry = () => {
    setScores([]);
    setIndex(0);
  };

  if (finished) {
    if (onFinish) return null;
    const average = Math.round(scores.reduce((a, b) => a + b, 0) / scores.length);
    return (
      <ResultPanel
        score={average}
        detail={`Repetiste ${items.length} frases. La nota es la media de tu mejor intento en cada una y ya está en tu progreso.`}
        onRetry={retry}
        back={{ href: "/speaking", label: "Más de Speaking" }}
      />
    );
  }

  return (
    <section className="arctic animate-rise rounded-[28px] p-5 sm:p-8" style={{ animationDelay: "80ms" }}>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm font-semibold text-navy-500 tabular-nums">
          Frase {index + 1} de {items.length}
        </p>
      </div>

      <div className="mt-6 rounded-3xl bg-ice-50 p-5 shadow-[inset_0_0_0_1.5px_var(--color-ice-200)] sm:p-6">
        {showText ? (
          <p className="font-display text-2xl leading-snug font-semibold text-navy-900" lang="en">
            {outcome?.heard != null
              ? matchWords(item.text, outcome.heard).map((entry, position) => (
                  <span key={position} className={entry.hit ? "text-ok" : "text-bad underline decoration-2 underline-offset-4"}>
                    {entry.word}{" "}
                  </span>
                ))
              : item.text}
          </p>
        ) : (
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="text-[17px] text-navy-500">Escucha la frase y repítela sin leerla.</p>
            <button type="button" onClick={() => setRevealed(true)} className={buttonClass("ghost")}>
              <Eye className="size-4" aria-hidden />
              Ver frase
            </button>
          </div>
        )}
      </div>

      <div className="mt-5 flex flex-wrap gap-3">
        {canSpeak && (
          <button type="button" onClick={phase === "playing" ? halt : playSentence} className={buttonClass("soft", "h-12 px-6")}>
            <Volume2 className="size-5" aria-hidden />
            {phase === "playing" ? "Detener" : "Escuchar"}
          </button>
        )}
        {!selfRated && (
          <button
            type="button"
            onClick={phase === "listening" ? halt : record}
            className={buttonClass("primary", "h-12 px-6")}
          >
            <span className="relative flex size-5 items-center justify-center">
              {phase === "listening" && (
                <span className="animate-pulse-ring absolute inset-0 rounded-full bg-ice-300" aria-hidden />
              )}
              {phase === "listening" ? (
                <Square className="relative size-4" aria-hidden />
              ) : (
                <Mic className="relative size-5" aria-hidden />
              )}
            </span>
            {phase === "listening" ? "Te escucho… toca para cancelar" : outcome ? "Intentar otra vez" : "Repetir ahora"}
          </button>
        )}
      </div>

      <div aria-live="polite" className="mt-5 space-y-3">
        {error && <p className="rounded-2xl bg-bad-soft px-4 py-3 text-[15px] text-navy-900">{error}</p>}

        {selfRated && (
          <div className="rounded-2xl bg-ice-50 px-4 py-4">
            <p className="text-[15px] leading-relaxed text-navy-700">
              {canRecognize
                ? "Sin reconocimiento de voz, califícate tú: di la frase en voz alta y elige cómo te salió."
                : "Este navegador no reconoce la voz (funciona en Chrome, Edge y Safari). Di la frase en voz alta y califícate tú."}
            </p>
            <div className="mt-3 flex flex-wrap gap-2" role="radiogroup" aria-label="¿Cómo te salió?">
              {SELF_RATINGS.map((rating) => {
                const active = outcome?.score === rating.score;
                return (
                  <button
                    key={rating.score}
                    type="button"
                    role="radio"
                    aria-checked={active}
                    onClick={() => setOutcome({ score: rating.score, heard: null })}
                    className={buttonClass(active ? "primary" : "soft")}
                  >
                    {rating.label}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {outcome?.heard != null && (
          <div className="rounded-2xl bg-ice-50 px-4 py-3.5 text-[15px] leading-relaxed text-navy-700">
            <p>
              <span className="font-display text-2xl font-semibold text-navy-900 tabular-nums">{outcome.score}</span>
              <span className="ml-1 text-sm font-semibold text-navy-400">/100</span>
            </p>
            <p className="mt-1">
              Entendí: <span lang="en" className="font-semibold text-navy-900">“{outcome.heard}”</span>
            </p>
          </div>
        )}
      </div>

      <div className="mt-6">
        <button type="button" onClick={next} disabled={outcome === null} className={buttonClass("primary", "h-12 px-6")}>
          {index + 1 >= items.length ? "Ver mi nota" : "Siguiente frase"}
          <ArrowRight className="size-4" aria-hidden />
        </button>
      </div>
    </section>
  );
}
