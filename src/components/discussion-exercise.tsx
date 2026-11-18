"use client";

import { Check, Minus } from "lucide-react";
import { useState } from "react";
import { saveAttempt } from "@/lib/scores";
import { countWords } from "@/lib/text";
import type { DiscussionTask } from "@/lib/types";
import { ResultPanel } from "./result-panel";
import { buttonClass } from "./ui";

const OPINION = /\b(i think|i believe|in my (opinion|view)|from my (perspective|point of view)|i (strongly )?(agree|disagree)|i would argue|i feel that|personally)\b/i;
const SUPPORT = /\b(because|since|for example|for instance|such as|in my experience|this means|as a result|therefore)\b/i;

const SELF_CHECKS = [
  { id: "new-idea", label: "Aporto una idea o un matiz propio, no solo repito lo que dijeron mis compañeros." },
  { id: "developed", label: "Explico mi idea con una razón y un ejemplo concretos." },
  { id: "review", label: "Lo releí y corregí gramática, vocabulario y puntuación." },
];

type Stage = "writing" | "review" | "done";

type DiscussionExerciseProps = {
  task: DiscussionTask;
  /** Si se pasa, la nota (0–100) se entrega aquí en vez de guardarse como práctica. */
  onFinish?: (score: number) => void;
  /** Con true se acabó el tiempo: ya no se puede escribir y se pasa a la revisión. */
  timeUp?: boolean;
};

function Post({ name, text, role }: { name: string; text: string; role?: string }) {
  return (
    <div className="flex gap-3">
      <span
        className="flex size-10 shrink-0 items-center justify-center rounded-full bg-ice-100 text-sm font-bold text-navy-800"
        aria-hidden
      >
        {name.replace(/^(Dr\.|Professor)\s+/, "").charAt(0)}
      </span>
      <div className="min-w-0">
        <p className="text-sm font-semibold text-navy-900">
          {name}
          {role && <span className="font-normal text-navy-400"> · {role}</span>}
        </p>
        <p className="mt-1 text-[16px] leading-relaxed text-navy-800" lang="en">
          {text}
        </p>
      </div>
    </div>
  );
}

export function DiscussionExercise({ task, onFinish, timeUp = false }: DiscussionExerciseProps) {
  const [text, setText] = useState("");
  const [ownStage, setStage] = useState<Stage>("writing");
  const stage: Stage = timeUp && ownStage === "writing" ? "review" : ownStage;
  const [ticks, setTicks] = useState<Record<string, boolean>>({});

  const total = countWords(text);
  const hasOpinion = OPINION.test(text);
  const hasSupport = SUPPORT.test(text);
  const mentionsClassmate = task.posts.some((post) => new RegExp(`\\b${post.name}\\b`, "i").test(text));

  // 50 puntos automáticos y 50 de autoevaluación con la pauta.
  const lengthPoints = Math.round(Math.min(1, total / task.minWords) * 20);
  const autoPoints = lengthPoints + (hasOpinion ? 10 : 0) + (hasSupport ? 10 : 0) + (mentionsClassmate ? 10 : 0);
  const selfPoints = Math.round((SELF_CHECKS.filter((check) => ticks[check.id]).length / SELF_CHECKS.length) * 50);
  const score = autoPoints + selfPoints;

  const finish = () => {
    if (onFinish) {
      onFinish(score);
      return;
    }
    saveAttempt({ module: "writing", activityId: `writing-discussion-${task.id}`, title: task.title, score });
    setStage("done");
  };

  const retry = () => {
    setText("");
    setTicks({});
    setStage("writing");
  };

  const autoChecks = [
    { ok: total >= task.minWords, label: `Tiene al menos ${task.minWords} palabras (llevas ${total}).` },
    { ok: hasOpinion, label: "Expresa tu postura (I think…, I agree/disagree…, In my view…)." },
    { ok: hasSupport, label: "Apoya la postura con razones o ejemplos (because, for example…)." },
    { ok: mentionsClassmate, label: `Responde a un compañero por su nombre (${task.posts.map((post) => post.name).join(" o ")}).` },
  ];

  return (
    <div className="grid items-start gap-6 lg:grid-cols-[1fr_1fr]">
      <section
        className="arctic animate-rise space-y-5 rounded-3xl p-6 sm:p-7 lg:sticky lg:top-24"
        style={{ animationDelay: "80ms" }}
        aria-label="Discusión del curso"
      >
        <p className="text-sm font-semibold tracking-wide text-navy-400 uppercase">Foro del curso · {task.course}</p>
        <Post name={task.professor.name} text={task.professor.text} role="profesor" />
        <div className="space-y-5 border-t border-ice-200 pt-5">
          {task.posts.map((post) => (
            <Post key={post.name} name={post.name} text={post.text} />
          ))}
        </div>
        <p className="rounded-2xl bg-ice-50 px-4 py-3 text-sm leading-relaxed text-navy-600">
          Escribe una respuesta que contribuya a la discusión: da tu opinión y apóyala. Meta: {task.minWords} palabras
          o más en unos {task.minutes} minutos.
        </p>
      </section>

      <div className="animate-rise space-y-4" style={{ animationDelay: "160ms" }}>
        <section className="arctic rounded-3xl p-5 sm:p-6">
          <div className="flex items-center justify-between gap-3">
            <label htmlFor="discussion-body" className="text-[15px] font-semibold text-navy-900">
              Tu respuesta
            </label>
            <span className={`text-sm font-semibold tabular-nums ${total >= task.minWords ? "text-ok" : "text-navy-400"}`}>
              {total} {total === 1 ? "palabra" : "palabras"}
            </span>
          </div>
          <textarea
            id="discussion-body"
            lang="en"
            value={text}
            onChange={(event) => setText(event.target.value)}
            readOnly={stage !== "writing"}
            spellCheck={false}
            rows={13}
            placeholder="I agree with … because …"
            className="mt-3 w-full resize-y rounded-2xl bg-white p-4 text-[16px] leading-relaxed text-navy-900 shadow-[inset_0_0_0_1.5px_var(--color-ice-200)] placeholder:text-navy-400 read-only:bg-ice-50 focus:shadow-[inset_0_0_0_2px_var(--color-ice-500)] focus:outline-none"
          />
          {stage === "writing" && (
            <div className="mt-4 flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={() => setStage("review")}
                disabled={total < 20}
                className={buttonClass("primary", "h-12 px-6")}
              >
                Terminé, evaluar
              </button>
              {total < 20 && <p className="text-sm text-navy-500">Escribe al menos 20 palabras para evaluar.</p>}
            </div>
          )}
        </section>

        {stage === "review" && (
          <section className="arctic animate-rise rounded-3xl p-5 sm:p-6">
            <h2 className="text-xl font-semibold text-navy-900">Revisa tu respuesta</h2>
            <p className="mt-1.5 text-[15px] leading-relaxed text-navy-500">
              {timeUp && "Se acabó el tiempo. "}Lo de arriba se comprueba solo. Lo de abajo lo marcas tú, comparando con la
              respuesta modelo.
            </p>
            <ul className="mt-4 space-y-2">
              {autoChecks.map((check) => (
                <li key={check.label} className="flex items-start gap-3 text-[15px] text-navy-800">
                  <span
                    className={`mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full ${check.ok ? "bg-ok text-white" : "bg-ice-200 text-navy-600"}`}
                  >
                    {check.ok ? <Check className="size-3" aria-hidden /> : <Minus className="size-3" aria-hidden />}
                  </span>
                  <span>
                    <span className="sr-only">{check.ok ? "Cumplido: " : "Pendiente: "}</span>
                    {check.label}
                  </span>
                </li>
              ))}
            </ul>
            <fieldset className="mt-5 space-y-1 border-t border-ice-200 pt-4">
              <legend className="sr-only">Autoevaluación</legend>
              {SELF_CHECKS.map((check) => (
                <label key={check.id} className="flex min-h-11 cursor-pointer items-center gap-3 text-[15px] text-navy-800">
                  <input
                    type="checkbox"
                    checked={ticks[check.id] ?? false}
                    onChange={(event) => setTicks((current) => ({ ...current, [check.id]: event.target.checked }))}
                    className="size-5 shrink-0 accent-navy-900"
                  />
                  {check.label}
                </label>
              ))}
            </fieldset>
            <details className="mt-4 rounded-2xl bg-ice-50 px-4 py-3">
              <summary className="min-h-8 cursor-pointer text-[15px] font-semibold text-navy-900">Ver respuesta modelo</summary>
              <p className="mt-2 text-[15px] leading-relaxed text-navy-700" lang="en">
                {task.model}
              </p>
            </details>
            <div className="mt-5 flex flex-wrap gap-3">
              <button type="button" onClick={finish} className={buttonClass("primary", "h-12 px-6")}>
                {onFinish ? "Continuar" : "Guardar mi nota"}
              </button>
              {!timeUp && (
                <button type="button" onClick={() => setStage("writing")} className={buttonClass("ghost", "h-12")}>
                  Seguir escribiendo
                </button>
              )}
            </div>
          </section>
        )}

        {stage === "done" && (
          <ResultPanel
            score={score}
            detail="Nota orientativa: la mitad se comprueba sola y la otra mitad sale de tu autoevaluación. Ya está en tu progreso."
            onRetry={retry}
            back={{ href: "/writing", label: "Más de Writing" }}
          />
        )}
      </div>
    </div>
  );
}
