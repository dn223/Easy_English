"use client";

import { ArrowRight, Mic, Square, Volume2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { INTERVIEW_ACTIVITY_ID, INTERVIEW_SECONDS, interviewQuestions } from "@/content/speaking";
import { saveAttempt } from "@/lib/scores";
import { speak, ttsSupported, type Accent } from "@/lib/speech";
import type { InterviewQuestion } from "@/lib/types";
import { useClientValue } from "@/lib/use-client-value";
import { AccentToggle } from "./accent-toggle";
import { ResultPanel } from "./result-panel";
import { buttonClass } from "./ui";

type Phase = "ready" | "recording" | "answered";

const RUBRIC = [
  { score: 100, label: "Respondí completo y con fluidez", hint: "Ideas claras, pocas pausas, vocabulario variado." },
  { score: 75, label: "Respondí bien, con algunos errores", hint: "Se entiende todo, con dudas o errores puntuales." },
  { score: 50, label: "Respondí, con muchas pausas", hint: "Idea básica, frases cortas o respuesta incompleta." },
  { score: 25, label: "Apenas pude responder", hint: "Palabras sueltas o me quedé en blanco." },
];

type InterviewExerciseProps = {
  questions?: InterviewQuestion[];
  accent?: Accent;
  /** Si se pasa, la nota (0–100) se entrega aquí en vez de guardarse como práctica. */
  onFinish?: (score: number) => void;
};

export function InterviewExercise({
  questions = interviewQuestions,
  accent: fixedAccent,
  onFinish,
}: InterviewExerciseProps) {
  const canSpeak = useClientValue(ttsSupported, true);
  const [chosenAccent, setAccent] = useState<Accent>("en-US");
  const accent = fixedAccent ?? chosenAccent;
  const [index, setIndex] = useState(0);
  const [phase, setPhase] = useState<Phase>("ready");
  const [secondsLeft, setSecondsLeft] = useState(INTERVIEW_SECONDS);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [micBlocked, setMicBlocked] = useState(false);
  const [rating, setRating] = useState<number | null>(null);
  const [ratings, setRatings] = useState<number[]>([]);

  const stopSpeechRef = useRef<() => void>(() => {});
  const recorderRef = useRef<MediaRecorder | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const urlRef = useRef<string | null>(null);

  const releaseMic = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = null;
    streamRef.current?.getTracks().forEach((track) => track.stop());
    streamRef.current = null;
  };

  useEffect(
    () => () => {
      stopSpeechRef.current();
      if (recorderRef.current?.state === "recording") recorderRef.current.stop();
      releaseMic();
      if (urlRef.current) URL.revokeObjectURL(urlRef.current);
    },
    [],
  );

  const finished = index >= questions.length;
  const question = questions[Math.min(index, questions.length - 1)];

  const replaceAudio = (url: string | null) => {
    if (urlRef.current) URL.revokeObjectURL(urlRef.current);
    urlRef.current = url;
    setAudioUrl(url);
  };

  const stopAnswer = () => {
    if (recorderRef.current?.state === "recording") recorderRef.current.stop();
    releaseMic();
    setPhase("answered");
  };

  const startAnswer = async () => {
    stopSpeechRef.current();
    replaceAudio(null);
    setRating(null);

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const chunks: Blob[] = [];
      const recorder = new MediaRecorder(stream);
      recorder.ondataavailable = (event) => chunks.push(event.data);
      recorder.onstop = () => replaceAudio(URL.createObjectURL(new Blob(chunks, { type: recorder.mimeType })));
      recorder.start();
      streamRef.current = stream;
      recorderRef.current = recorder;
      setMicBlocked(false);
    } catch {
      // Sin micrófono se puede responder en voz alta igual; solo se pierde la reproducción.
      recorderRef.current = null;
      setMicBlocked(true);
    }

    const deadline = Date.now() + INTERVIEW_SECONDS * 1000;
    setSecondsLeft(INTERVIEW_SECONDS);
    setPhase("recording");
    timerRef.current = setInterval(() => {
      const left = Math.max(0, Math.ceil((deadline - Date.now()) / 1000));
      setSecondsLeft(left);
      if (left === 0) stopAnswer();
    }, 250);
  };

  const next = () => {
    const all = [...ratings, rating ?? 0];
    if (all.length === questions.length) {
      const score = all.reduce((a, b) => a + b, 0) / all.length;
      if (onFinish) onFinish(score);
      else saveAttempt({ module: "speaking", activityId: INTERVIEW_ACTIVITY_ID, title: "Take an Interview", score });
    }
    setRatings(all);
    setRating(null);
    replaceAudio(null);
    setPhase("ready");
    setSecondsLeft(INTERVIEW_SECONDS);
    setIndex((current) => current + 1);
  };

  const retry = () => {
    setRatings([]);
    setIndex(0);
  };

  if (finished) {
    if (onFinish) return null;
    const average = Math.round(ratings.reduce((a, b) => a + b, 0) / ratings.length);
    return (
      <ResultPanel
        score={average}
        detail="Nota orientativa: es la media de cómo calificaste tus cuatro respuestas con la rúbrica. Ya está en tu progreso."
        onRetry={retry}
        back={{ href: "/speaking", label: "Más de Speaking" }}
      />
    );
  }

  return (
    <section className="arctic animate-rise rounded-[28px] p-5 sm:p-8" style={{ animationDelay: "80ms" }}>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm font-semibold text-navy-500 tabular-nums">
          Pregunta {index + 1} de {questions.length}
        </p>
        {canSpeak && !fixedAccent && (
          <AccentToggle
            value={accent}
            onChange={(value) => {
              stopSpeechRef.current();
              setAccent(value);
            }}
          />
        )}
      </div>

      <p className="mt-6 font-display text-2xl leading-snug font-semibold text-navy-900" lang="en">
        {question.text}
      </p>
      <p className="mt-2 text-[15px] text-navy-500">{question.tip}</p>

      <div className="mt-6 flex flex-wrap items-center gap-3">
        {canSpeak && phase !== "recording" && (
          <button
            type="button"
            onClick={() => {
              stopSpeechRef.current = speak([{ text: question.text }], { accent });
            }}
            className={buttonClass("soft", "h-12 px-6")}
          >
            <Volume2 className="size-5" aria-hidden />
            Escuchar la pregunta
          </button>
        )}
        {phase === "recording" ? (
          <button type="button" onClick={stopAnswer} className={buttonClass("primary", "h-12 px-6")}>
            <span className="relative flex size-5 items-center justify-center">
              <span className="animate-pulse-ring absolute inset-0 rounded-full bg-ice-300" aria-hidden />
              <Square className="relative size-4" aria-hidden />
            </span>
            Terminar respuesta
          </button>
        ) : (
          <button type="button" onClick={startAnswer} className={buttonClass("primary", "h-12 px-6")}>
            <Mic className="size-5" aria-hidden />
            {phase === "answered" ? "Responder de nuevo" : "Responder ahora"}
          </button>
        )}
        {phase === "recording" && (
          <p className="text-[15px] font-semibold text-navy-800 tabular-nums" role="timer">
            0:{String(secondsLeft).padStart(2, "0")}
          </p>
        )}
      </div>

      {phase === "recording" && (
        <div className="mt-4 h-2 overflow-hidden rounded-full bg-ice-100" aria-hidden>
          <div
            className="h-full origin-left rounded-full bg-ice-500 transition-transform duration-300 ease-linear"
            style={{ transform: `scaleX(${secondsLeft / INTERVIEW_SECONDS})` }}
          />
        </div>
      )}

      <div aria-live="polite">
        {micBlocked && phase !== "ready" && (
          <p className="mt-4 rounded-2xl bg-ice-50 px-4 py-3 text-[15px] leading-relaxed text-navy-700">
            No hay acceso al micrófono, así que no se grabará. Responde en voz alta igualmente y califícate al terminar.
          </p>
        )}
      </div>

      {phase === "answered" && (
        <div className="animate-rise mt-6 space-y-5">
          {audioUrl && (
            <div>
              <p className="mb-2 text-sm font-semibold text-navy-500">Escúchate antes de calificarte</p>
              <audio controls src={audioUrl} className="w-full" />
            </div>
          )}
          <fieldset>
            <legend className="text-[17px] font-semibold text-navy-900">¿Cómo fue tu respuesta?</legend>
            <div className="mt-3 space-y-2">
              {RUBRIC.map((level) => {
                const active = rating === level.score;
                return (
                  <label
                    key={level.score}
                    className={`press flex min-h-14 cursor-pointer items-center gap-3 rounded-2xl px-4 py-2.5 has-focus-visible:outline-2 has-focus-visible:outline-offset-2 has-focus-visible:outline-ice-500 ${
                      active
                        ? "bg-ice-100 shadow-[0_0_0_2px_var(--color-ice-500)]"
                        : "bg-white shadow-[0_0_0_1px_var(--edge)] hover:bg-ice-50"
                    }`}
                  >
                    <input
                      type="radio"
                      name="interview-rating"
                      className="sr-only"
                      checked={active}
                      onChange={() => setRating(level.score)}
                    />
                    <span
                      className={`flex size-5 shrink-0 items-center justify-center rounded-full ${active ? "bg-navy-900" : "bg-ice-100 shadow-[inset_0_0_0_1.5px_var(--color-ice-400)]"}`}
                      aria-hidden
                    >
                      {active && <span className="size-2 rounded-full bg-white" />}
                    </span>
                    <span>
                      <span className="block text-[15px] font-semibold text-navy-900">{level.label}</span>
                      <span className="block text-sm text-navy-500">{level.hint}</span>
                    </span>
                  </label>
                );
              })}
            </div>
          </fieldset>
          <button type="button" onClick={next} disabled={rating === null} className={buttonClass("primary", "h-12 px-6")}>
            {index + 1 >= questions.length ? "Ver mi nota" : "Siguiente pregunta"}
            <ArrowRight className="size-4" aria-hidden />
          </button>
        </div>
      )}
    </section>
  );
}
