"use client";

import Link from "next/link";
import { modules } from "@/content/catalog";
import { summarize, useAttempts } from "@/lib/scores";
import { ModuleIcon } from "./module-icon";
import { ScoreRing } from "./score-ring";

export function HomeScore() {
  const summary = summarize(useAttempts());

  return (
    <aside className="arctic-deep rounded-[28px] p-6 sm:p-7" aria-label="Tu puntuación">
      <div className="flex items-center gap-5">
        <ScoreRing value={summary.global} tone="deep" caption="Global" />
        <div>
          <p className="font-display text-xl font-semibold">
            {summary.global === null ? "Tu puntuación empieza aquí" : "Tu puntuación global"}
          </p>
          <p className="mt-1.5 text-sm leading-relaxed text-ice-200">
            {summary.global === null
              ? "Completa una actividad y verás tu nota por habilidad."
              : `${summary.done} de ${summary.total} actividades completadas.`}
          </p>
        </div>
      </div>

      <ul className="mt-6 space-y-3.5">
        {modules.map((module) => {
          const { score } = summary.modules[module.id];
          return (
            <li key={module.id} className="flex items-center gap-3">
              <ModuleIcon module={module.id} className="size-4 shrink-0 text-ice-300" />
              <span className="w-20 text-sm font-semibold">{module.name}</span>
              <span className="h-1.5 flex-1 overflow-hidden rounded-full bg-white/12">
                <span
                  className="block h-full origin-left rounded-full bg-ice-300 transition-transform duration-1000 ease-out-quart"
                  style={{ transform: `scaleX(${(score ?? 0) / 100})` }}
                />
              </span>
              <span className="w-8 text-right text-sm font-semibold tabular-nums">{score ?? "–"}</span>
            </li>
          );
        })}
      </ul>

      <Link
        href="/progreso"
        className="press mt-6 inline-flex min-h-11 items-center rounded-full bg-white/10 px-4 text-sm font-semibold text-white hover:bg-white/18"
      >
        Ver mi progreso
      </Link>
    </aside>
  );
}
