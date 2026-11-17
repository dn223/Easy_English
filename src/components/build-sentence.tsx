"use client";

import { ArrowRight, Check, X } from "lucide-react";
import { LayoutGroup, motion, useReducedMotion } from "motion/react";
import { useState } from "react";
import { BUILD_ACTIVITY_ID, sentenceItems } from "@/content/writing";
import { saveAttempt } from "@/lib/scores";
import { shuffled } from "@/lib/text";
import { ResultPanel } from "./result-panel";
import { buttonClass } from "./ui";

type Chip = { key: string; word: string };

function chipsFor(index: number): Chip[] {
  const item = sentenceItems[index];
  return shuffled(
    item.words.map((word, position) => ({ key: `${item.id}-${position}`, word })),
    item.id,
  );
}

export function BuildSentence() {
  const reduceMotion = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [placed, setPlaced] = useState<Chip[]>([]);
  const [checked, setChecked] = useState(false);
  const [results, setResults] = useState<boolean[]>([]);

  const finished = results.length === sentenceItems.length && !checked;
  const item = sentenceItems[Math.min(index, sentenceItems.length - 1)];
  const bank = chipsFor(Math.min(index, sentenceItems.length - 1)).filter(
    (chip) => !placed.some((entry) => entry.key === chip.key),
  );
  const target = item.words.join(" ");
  const isCorrect = placed.map((chip) => chip.word).join(" ") === target;
  const spring = reduceMotion ? { duration: 0 } : { type: "spring" as const, duration: 0.42, bounce: 0.16 };

  const check = () => {
    setChecked(true);
    setResults((current) => [...current, isCorrect]);
  };

  const next = () => {
    setChecked(false);
    setPlaced([]);
    if (index + 1 >= sentenceItems.length) {
      const correct = results.filter(Boolean).length;
      saveAttempt({
        module: "writing",
        activityId: BUILD_ACTIVITY_ID,
        title: "Build a Sentence",
        score: (correct / sentenceItems.length) * 100,
      });
    }
    setIndex((current) => current + 1);
  };

  const retry = () => {
    setIndex(0);
    setPlaced([]);
    setChecked(false);
    setResults([]);
  };

  if (finished) {
    const correct = results.filter(Boolean).length;
    return (
      <ResultPanel
        score={Math.round((correct / sentenceItems.length) * 100)}
        detail={`Ordenaste bien ${correct} de ${sentenceItems.length} oraciones. La nota ya está en tu progreso.`}
        onRetry={retry}
        back={{ href: "/writing", label: "Más de Writing" }}
      />
    );
  }

  const chipClass =
    "press inline-flex min-h-11 items-center rounded-xl px-3.5 text-[16px] font-semibold disabled:cursor-default";

  return (
    <section className="arctic animate-rise rounded-[28px] p-5 sm:p-8" style={{ animationDelay: "80ms" }}>
      <div className="flex items-center gap-4">
        <div
          className="h-2 flex-1 overflow-hidden rounded-full bg-ice-100"
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={sentenceItems.length}
          aria-valuenow={index}
          aria-label="Avance"
        >
          <div
            className="h-full origin-left rounded-full bg-ice-500 transition-transform duration-500 ease-out-quart"
            style={{ transform: `scaleX(${index / sentenceItems.length})` }}
          />
        </div>
        <p className="text-sm font-semibold text-navy-500 tabular-nums">
          {index + 1} / {sentenceItems.length}
        </p>
      </div>

      <p className="mt-7 text-sm font-semibold text-navy-400">Te preguntan:</p>
      <p className="mt-1 font-display text-2xl font-semibold text-navy-900" lang="en">
        {item.context}
      </p>

      <LayoutGroup id={item.id}>
        <p className="mt-7 text-sm font-semibold text-navy-400" id="answer-label">
          Tu respuesta
        </p>
        <div
          lang="en"
          aria-labelledby="answer-label"
          className={`mt-2 flex min-h-[4.25rem] flex-wrap items-center gap-2 rounded-2xl p-3 transition-[background-color,box-shadow] duration-200 ${
            !checked
              ? "bg-ice-50 shadow-[inset_0_0_0_1.5px_var(--color-ice-200)]"
              : isCorrect
                ? "bg-ok-soft shadow-[inset_0_0_0_2px_var(--color-ok)]"
                : "bg-bad-soft shadow-[inset_0_0_0_2px_var(--color-bad)]"
          }`}
        >
          {placed.length === 0 && <span className="px-2 text-[15px] text-navy-400" lang="es">Toca las palabras en orden.</span>}
          {placed.map((chip) => (
            <motion.button
              key={chip.key}
              layoutId={chip.key}
              transition={spring}
              type="button"
              disabled={checked}
              onClick={() => setPlaced((current) => current.filter((entry) => entry.key !== chip.key))}
              className={`${chipClass} bg-navy-900 text-white`}
              aria-label={`Quitar “${chip.word}”`}
            >
              {chip.word}
            </motion.button>
          ))}
        </div>

        <div className="mt-4 flex min-h-[3.5rem] flex-wrap gap-2" lang="en" aria-label="Palabras disponibles" role="group">
          {bank.map((chip) => (
            <motion.button
              key={chip.key}
              layoutId={chip.key}
              transition={spring}
              type="button"
              disabled={checked}
              onClick={() => setPlaced((current) => [...current, chip])}
              className={`${chipClass} bg-white text-navy-900 shadow-[0_0_0_1px_rgb(10_31_60/0.1),0_2px_4px_-1px_rgb(10_31_60/0.08)] hover:bg-ice-50`}
            >
              {chip.word}
            </motion.button>
          ))}
        </div>
      </LayoutGroup>

      <div aria-live="polite">
        {checked && (
          <div className="animate-rise mt-5 rounded-2xl bg-ice-50 px-4 py-3.5 text-[15px] leading-relaxed text-navy-700">
            <p className="flex items-center gap-2 font-semibold text-navy-900">
              {isCorrect ? (
                <Check className="size-4 text-ok" aria-hidden />
              ) : (
                <X className="size-4 text-bad" aria-hidden />
              )}
              {isCorrect ? "Correcto" : "Casi. El orden correcto es:"}
            </p>
            {!isCorrect && (
              <p className="mt-1 font-semibold text-navy-900" lang="en">
                {target}.
              </p>
            )}
            {item.note && <p className="mt-1.5">{item.note}</p>}
          </div>
        )}
      </div>

      <div className="mt-6 flex flex-wrap gap-3">
        {checked ? (
          <button type="button" onClick={next} className={buttonClass("primary", "h-12 px-6")}>
            {index + 1 >= sentenceItems.length ? "Ver mi nota" : "Siguiente"}
            <ArrowRight className="size-4" aria-hidden />
          </button>
        ) : (
          <>
            <button
              type="button"
              onClick={check}
              disabled={bank.length > 0}
              className={buttonClass("primary", "h-12 px-6")}
            >
              Comprobar
            </button>
            <button
              type="button"
              onClick={() => setPlaced([])}
              disabled={placed.length === 0}
              className={buttonClass("ghost", "h-12")}
            >
              Vaciar
            </button>
          </>
        )}
      </div>
    </section>
  );
}
