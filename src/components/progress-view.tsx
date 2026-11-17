"use client";

import Link from "next/link";
import { Trash2 } from "lucide-react";
import { useState } from "react";
import { modules } from "@/content/catalog";
import { clearAttempts, summarize, useAttempts } from "@/lib/scores";
import { ModuleIcon } from "./module-icon";
import { ScoreRing } from "./score-ring";
import { buttonClass } from "./ui";

const dateFormat = new Intl.DateTimeFormat("es", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" });

export function ProgressView() {
  const attempts = useAttempts();
  const summary = summarize(attempts);
  const [confirming, setConfirming] = useState(false);
  const recent = [...attempts].reverse().slice(0, 12);

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

      {recent.length > 0 && (
        <section className="arctic animate-rise rounded-3xl p-5 sm:p-7" style={{ animationDelay: "380ms" }}>
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
                <p className="font-display text-xl font-semibold text-navy-900 tabular-nums">{attempt.score}</p>
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
