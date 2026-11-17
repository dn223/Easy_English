"use client";

import { Check, X } from "lucide-react";
import { useState, type ReactNode } from "react";
import { saveAttempt } from "@/lib/scores";
import type { ModuleId, Question } from "@/lib/types";
import { ResultPanel } from "./result-panel";
import { buttonClass } from "./ui";

type QuizProps = {
  module: ModuleId;
  activityId: string;
  title: string;
  questions: Question[];
  back: { href: string; label: string };
  /** Contenido que solo se muestra después de corregir (por ejemplo, la transcripción). */
  afterCheck?: ReactNode;
};

type QuestionCardProps = {
  name: string;
  question: Question;
  index: number;
  chosen: number | undefined;
  onChoose: (option: number) => void;
  /** Con true se bloquea y muestra la corrección y la explicación. */
  checked?: boolean;
};

export function QuestionCard({ name, question, index, chosen, onChoose, checked = false }: QuestionCardProps) {
  return (
    <fieldset className="arctic rounded-3xl p-5 sm:p-6" disabled={checked}>
      <legend className="float-left mb-4 w-full text-[17px] leading-snug font-semibold text-navy-900">
        <span className="mr-2 text-navy-400 tabular-nums">{index + 1}.</span>
        {question.prompt}
      </legend>
      <div className="clear-both space-y-2">
        {question.options.map((option, optionIndex) => {
          const selected = chosen === optionIndex;
          const isAnswer = question.answer === optionIndex;
          const state = !checked
            ? selected
              ? "bg-ice-100 shadow-[0_0_0_2px_var(--color-ice-500)] text-navy-900"
              : "bg-white shadow-[0_0_0_1px_rgb(10_31_60/0.09)] text-navy-700 hover:bg-ice-50"
            : isAnswer
              ? "bg-ok-soft shadow-[0_0_0_2px_var(--color-ok)] text-navy-900"
              : selected
                ? "bg-bad-soft shadow-[0_0_0_2px_var(--color-bad)] text-navy-900"
                : "bg-white shadow-[0_0_0_1px_rgb(10_31_60/0.06)] text-navy-400";
          return (
            <label
              key={option}
              className={`press flex min-h-12 items-center gap-3 rounded-2xl px-4 py-2.5 text-[15px] has-focus-visible:outline-2 has-focus-visible:outline-offset-2 has-focus-visible:outline-ice-500 ${checked ? "" : "cursor-pointer"} ${state}`}
            >
              <input
                type="radio"
                name={name}
                className="sr-only"
                checked={selected}
                onChange={() => onChoose(optionIndex)}
              />
              <span
                className={`flex size-6 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                  checked && isAnswer
                    ? "bg-ok text-white"
                    : checked && selected
                      ? "bg-bad text-white"
                      : selected
                        ? "bg-navy-900 text-white"
                        : "bg-ice-100 text-navy-600"
                }`}
                aria-hidden
              >
                {checked && isAnswer ? (
                  <Check className="size-3.5" />
                ) : checked && selected ? (
                  <X className="size-3.5" />
                ) : (
                  String.fromCharCode(65 + optionIndex)
                )}
              </span>
              <span>{option}</span>
              {checked && isAnswer && <span className="sr-only"> (respuesta correcta)</span>}
              {checked && selected && !isAnswer && <span className="sr-only"> (tu respuesta, incorrecta)</span>}
            </label>
          );
        })}
      </div>
      {checked && (
        <p className="animate-rise mt-4 rounded-2xl bg-ice-50 px-4 py-3 text-[15px] leading-relaxed text-navy-700">
          <span className="font-semibold text-navy-900">
            {chosen === question.answer ? "Correcto. " : "Explicación. "}
          </span>
          {question.explanation}
        </p>
      )}
    </fieldset>
  );
}

export function Quiz({ module, activityId, title, questions, back, afterCheck }: QuizProps) {
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [checked, setChecked] = useState(false);

  const pending = questions.filter((question) => answers[question.id] === undefined).length;
  const correct = questions.filter((question) => answers[question.id] === question.answer).length;
  const score = Math.round((correct / questions.length) * 100);

  const check = () => {
    setChecked(true);
    saveAttempt({ module, activityId, title, score });
  };

  const retry = () => {
    setAnswers({});
    setChecked(false);
  };

  return (
    <div className="space-y-4">
      {questions.map((question, index) => (
        <QuestionCard
          key={question.id}
          name={`${activityId}-${question.id}`}
          question={question}
          index={index}
          chosen={answers[question.id]}
          checked={checked}
          onChoose={(option) => setAnswers((current) => ({ ...current, [question.id]: option }))}
        />
      ))}

      {checked ? (
        <>
          <ResultPanel
            score={score}
            detail={`Acertaste ${correct} de ${questions.length} preguntas. La nota ya está en tu progreso.`}
            onRetry={retry}
            back={back}
          />
          {afterCheck}
        </>
      ) : (
        <div className="flex flex-wrap items-center gap-4 pt-2">
          <button type="button" onClick={check} disabled={pending > 0} className={buttonClass("primary", "h-12 px-6")}>
            Comprobar respuestas
          </button>
          {pending > 0 && (
            <p className="text-sm text-navy-500">
              {pending === 1 ? "Falta 1 pregunta" : `Faltan ${pending} preguntas`} por responder.
            </p>
          )}
        </div>
      )}
    </div>
  );
}
