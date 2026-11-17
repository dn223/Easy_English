"use client";

import { Check, Minus } from "lucide-react";
import { useState } from "react";
import { saveAttempt } from "@/lib/scores";
import { countWords } from "@/lib/text";
import type { EmailTask } from "@/lib/types";
import { ResultPanel } from "./result-panel";
import { buttonClass } from "./ui";

const GREETING = /^\s*(dear|hello|hi|good (morning|afternoon|evening))\b/i;
const CLOSING = /\b(regards|sincerely|best wishes|yours faithfully|yours truly|thank you|thanks|cheers|all the best)\b[\s\S]{0,60}$/i;

const SELF_CHECKS = [
  { id: "tone", label: "El tono es adecuado para la persona a la que escribo." },
  { id: "review", label: "Lo releí y corregí errores de gramática y ortografía." },
];

type Stage = "writing" | "review" | "done";

export function EmailExercise({ task }: { task: EmailTask }) {
  const [text, setText] = useState("");
  const [stage, setStage] = useState<Stage>("writing");
  const [ticks, setTicks] = useState<Record<string, boolean>>({});

  const total = countWords(text);
  const hasGreeting = GREETING.test(text);
  const hasClosing = CLOSING.test(text.trim());

  // 40 puntos automáticos (saludo, despedida, extensión) y 60 de autoevaluación con la pauta.
  const lengthPoints = Math.round(Math.min(1, total / task.minWords) * 20);
  const pointsCovered = task.points.filter((_, index) => ticks[`point-${index}`]).length;
  const selfPoints = pointsCovered * 12 + SELF_CHECKS.filter((check) => ticks[check.id]).length * 12;
  const score = (hasGreeting ? 10 : 0) + (hasClosing ? 10 : 0) + lengthPoints + selfPoints;

  const finish = () => {
    saveAttempt({ module: "writing", activityId: `writing-${task.id}`, title: task.title, score });
    setStage("done");
  };

  const retry = () => {
    setText("");
    setTicks({});
    setStage("writing");
  };

  const autoChecks = [
    { ok: hasGreeting, label: "Empieza con un saludo (Dear…, Hello…)." },
    { ok: hasClosing, label: "Termina con una despedida (Best regards, Thank you…)." },
    { ok: total >= task.minWords, label: `Tiene al menos ${task.minWords} palabras (llevas ${total}).` },
  ];

  return (
    <div className="grid items-start gap-6 lg:grid-cols-[0.85fr_1.15fr]">
      <section
        className="arctic animate-rise rounded-3xl p-6 sm:p-7 lg:sticky lg:top-24"
        style={{ animationDelay: "80ms" }}
      >
        <h2 className="text-sm font-semibold tracking-wide text-navy-400 uppercase">Situación</h2>
        <p className="mt-2 text-[17px] leading-relaxed text-navy-800" lang="en">
          {task.scenario}
        </p>
        <h2 className="mt-6 text-sm font-semibold tracking-wide text-navy-400 uppercase">En tu correo</h2>
        <ul className="mt-2 space-y-2 text-[16px] text-navy-800" lang="en">
          {task.points.map((point) => (
            <li key={point} className="flex gap-2.5">
              <span className="mt-2.5 size-1.5 shrink-0 rounded-full bg-ice-500" aria-hidden />
              {point}
            </li>
          ))}
        </ul>
        <p className="mt-6 rounded-2xl bg-ice-50 px-4 py-3 text-sm leading-relaxed text-navy-600">
          Meta: {task.minWords} palabras o más en unos {task.minutes} minutos.
        </p>
      </section>

      <div className="animate-rise space-y-4" style={{ animationDelay: "160ms" }}>
        <section className="arctic rounded-3xl p-5 sm:p-6">
          <div className="flex items-center justify-between gap-3">
            <label htmlFor="email-body" className="text-[15px] font-semibold text-navy-900">
              Para: <span lang="en">{task.recipient}</span>
            </label>
            <span
              className={`text-sm font-semibold tabular-nums ${total >= task.minWords ? "text-ok" : "text-navy-400"}`}
            >
              {total} {total === 1 ? "palabra" : "palabras"}
            </span>
          </div>
          <textarea
            id="email-body"
            lang="en"
            value={text}
            onChange={(event) => setText(event.target.value)}
            readOnly={stage !== "writing"}
            spellCheck={false}
            rows={12}
            placeholder="Dear…"
            className="mt-3 w-full resize-y rounded-2xl bg-white p-4 text-[16px] leading-relaxed text-navy-900 shadow-[inset_0_0_0_1.5px_var(--color-ice-200)] placeholder:text-navy-400 focus:shadow-[inset_0_0_0_2px_var(--color-ice-500)] focus:outline-none read-only:bg-ice-50"
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
            <h2 className="text-xl font-semibold text-navy-900">Revisa tu correo</h2>
            <p className="mt-1.5 text-[15px] leading-relaxed text-navy-500">
              Lo de arriba se comprueba solo. Lo de abajo lo marcas tú, comparando con la respuesta modelo.
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
              {[
                ...task.points.map((point, index) => ({ id: `point-${index}`, label: point, english: true })),
                ...SELF_CHECKS.map((check) => ({ ...check, english: false })),
              ].map((check) => (
                <label key={check.id} className="flex min-h-11 cursor-pointer items-center gap-3 text-[15px] text-navy-800">
                  <input
                    type="checkbox"
                    checked={ticks[check.id] ?? false}
                    onChange={(event) => setTicks((current) => ({ ...current, [check.id]: event.target.checked }))}
                    className="size-5 shrink-0 accent-navy-900"
                  />
                  {check.english ? (
                    <span>
                      Cubrí este punto: <span lang="en">{check.label}</span>
                    </span>
                  ) : (
                    check.label
                  )}
                </label>
              ))}
            </fieldset>

            <details className="mt-4 rounded-2xl bg-ice-50 px-4 py-3">
              <summary className="min-h-8 cursor-pointer text-[15px] font-semibold text-navy-900">
                Ver respuesta modelo
              </summary>
              <p className="mt-2 text-[15px] leading-relaxed whitespace-pre-line text-navy-700" lang="en">
                {task.model}
              </p>
            </details>

            <div className="mt-5 flex flex-wrap gap-3">
              <button type="button" onClick={finish} className={buttonClass("primary", "h-12 px-6")}>
                Guardar mi nota
              </button>
              <button type="button" onClick={() => setStage("writing")} className={buttonClass("ghost", "h-12")}>
                Seguir escribiendo
              </button>
            </div>
          </section>
        )}

        {stage === "done" && (
          <ResultPanel
            score={score}
            detail="Nota orientativa: 40 puntos se comprueban solos y 60 salen de tu autoevaluación. Ya está en tu progreso."
            onRetry={retry}
            back={{ href: "/writing", label: "Más de Writing" }}
          />
        )}
      </div>
    </div>
  );
}
