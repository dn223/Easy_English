"use client";

import Link from "next/link";
import { Trash2 } from "lucide-react";
import { useState } from "react";
import { modules } from "@/content/catalog";
import { grammarLessons } from "@/content/grammar";
import { clearAttempts, summarize, testAttempts, useAttempts } from "@/lib/scores";
import { useStudied } from "@/lib/studied";
import { ModuleIcon } from "./module-icon";
import { ScoreRing } from "./score-ring";
import { buttonClass } from "./ui";

const dateFormat = new Intl.DateTimeFormat("es", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" });

export function ProgressView() {
  const attempts = useAttempts();
  const summary = summarize(attempts);
  const [confirming, setConfirming] = useState(false);
  const recent = [...attempts].reverse().slice(0, 12);
  const tests = testAttempts(attempts);
  const studied = useStudied().filter((id) => grammarLessons.some((lesson) => lesson.id === id)).length;
  const lastTest = tests.at(-1);
  const bestBand = tests.length ? Math.max(...tests.map((attempt) => attempt.bands!.overall)) : null;

  return (
    <div className="space-y-6">
      <section
        className="arctic-deep animate-rise flex flex-col gap-6 rounded-[28px] p-6 sm:flex-row sm:items-center sm:p-8"
        style={{ animationDelay: "80ms" }}
      >
        <ScoreRing value={summary.global} size={156} stroke={13} tone="deep" caption="Global" />
        <div>
          <h2 className="text-2xl font-semibold">
            {summary.global === null ? "Todavía no tienes notas" : "Puntuación global"}
          </h2>
          <p className="mt-2 max-w-xl text-[15px] leading-relaxed text-ice-200">
            {summary.global === null
              ? "Completa tu primera actividad y aquí verás tu nota global y la de cada habilidad."
              : `Es la media de tus habilidades con nota. Llevas ${summary.done} de ${summary.total} actividades completadas.`}
          </p>
          {summary.global === null && (
            <Link href="/#modulos" className={buttonClass("onDeep", "mt-5")}>
              Elegir una actividad
            </Link>
          )}
        </div>
      </section>

      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {modules.map((module, index) => {
          const { score, done, total } = summary.modules[module.id];
          return (
            <li key={module.id} className="animate-rise" style={{ animationDelay: `${140 + index * 60}ms` }}>
              <Link href={module.href} className="arctic lift flex h-full flex-col rounded-3xl p-5 active:scale-[0.99]">
                <div className="flex items-center gap-2.5 text-navy-800">
                  <ModuleIcon module={module.id} className="size-5" />
                  <h3 className="text-[17px] font-semibold">{module.name}</h3>
                </div>
                <p className="mt-4 font-display text-4xl leading-none font-semibold text-navy-900 tabular-nums">
                  {score ?? "–"}
                  <span className="ml-1 font-sans text-sm font-semibold text-navy-400">/100</span>
                </p>
                <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-ice-100">
                  <div
                    className="h-full origin-left rounded-full bg-ice-500 transition-transform duration-1000 ease-out-quart"
                    style={{ transform: `scaleX(${done / total})` }}
                  />
                </div>
                <p className="mt-2 text-sm text-navy-500 tabular-nums">
                  {done} de {total} actividades
                </p>
              </Link>
            </li>
          );
        })}
      </ul>

      <section
        className="arctic animate-rise flex flex-wrap items-center justify-between gap-4 rounded-3xl p-5 sm:p-7"
        style={{ animationDelay: "320ms" }}
      >
        <div>
          <h2 className="text-xl font-semibold text-navy-900">Gramática</h2>
          <p className="text-sm text-navy-500">
            <span className="font-semibold text-navy-800 tabular-nums">{studied}</span> de {grammarLessons.length} lecciones
            estudiadas. El modo estudio no suma a tu nota.
          </p>
        </div>
        <Link href="/gramatica" className={buttonClass("soft")}>
          {studied > 0 ? "Seguir estudiando" : "Empezar a estudiar"}
        </Link>
      </section>

      <section className="arctic animate-rise rounded-3xl p-5 sm:p-7" style={{ animationDelay: "340ms" }}>
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="flex size-11 items-center justify-center rounded-2xl bg-navy-900 text-ice-300">
              <ModuleIcon module="test" className="size-5" />
            </span>
            <div>
              <h2 className="text-xl font-semibold text-navy-900">Simulacro tipo TOEFL</h2>
              <p className="text-sm text-navy-500">
                {lastTest && bestBand !== null
                  ? `Mejor banda ${bestBand.toFixed(1)} de 6 en ${tests.length} ${tests.length === 1 ? "simulacro" : "simulacros"}.`
                  : "Todavía no has hecho ninguno."}
              </p>
            </div>
          </div>
          <Link href="/simulacro" className={buttonClass("soft")}>
            {lastTest ? "Hacer otro" : "Hacer el simulacro"}
          </Link>
        </div>
        {lastTest?.bands && (
          <dl className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-5">
            {[
              { label: "Global", value: lastTest.bands.overall },
              ...modules.map((module) => ({ label: module.name, value: lastTest.bands![module.id] })),
            ].map((entry) => (
              <div key={entry.label} className="rounded-2xl bg-ice-50 px-4 py-3">
                <dt className="text-sm text-navy-500">{entry.label}</dt>
                <dd className="font-display text-2xl font-semibold text-navy-900 tabular-nums">{entry.value.toFixed(1)}</dd>
              </div>
            ))}
          </dl>
        )}
        {lastTest && <p className="mt-3 text-sm text-navy-400">Bandas del último simulacro, de 1 a 6. Son una estimación.</p>}
      </section>

      {recent.length > 0 && (
        <section className="arctic animate-rise rounded-3xl p-5 sm:p-7" style={{ animationDelay: "400ms" }}>
          <h2 className="text-xl font-semibold text-navy-900">Últimos intentos</h2>
          <ul className="mt-3 divide-y divide-ice-100">
            {recent.map((attempt) => (
              <li key={attempt.id} className="flex items-center gap-3 py-3">
                <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-ice-100 text-navy-700">
                  <ModuleIcon module={attempt.module} className="size-4" />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[15px] font-semibold text-navy-900">{attempt.title}</p>
                  <p className="text-sm text-navy-400">{dateFormat.format(new Date(attempt.at))}</p>
                </div>
                <p className="font-display text-xl font-semibold text-navy-900 tabular-nums">
                  {attempt.bands ? `${attempt.bands.overall.toFixed(1)} / 6` : attempt.score}
                </p>
              </li>
            ))}
          </ul>

          <div className="mt-4 flex flex-wrap items-center gap-3 border-t border-ice-100 pt-4">
            {confirming ? (
              <>
                <p className="text-[15px] text-navy-700">¿Borrar todas tus notas? No se puede deshacer.</p>
                <button
                  type="button"
                  onClick={() => {
                    clearAttempts();
                    setConfirming(false);
                  }}
                  className="press inline-flex min-h-11 items-center rounded-full bg-bad px-5 text-[15px] font-semibold text-white"
                >
                  Sí, borrar
                </button>
                <button type="button" onClick={() => setConfirming(false)} className={buttonClass("ghost")}>
                  Cancelar
                </button>
              </>
            ) : (
              <button type="button" onClick={() => setConfirming(true)} className={buttonClass("ghost")}>
                <Trash2 className="size-4" aria-hidden />
                Borrar mi progreso
              </button>
            )}
          </div>
        </section>
      )}
    </div>
  );
}
