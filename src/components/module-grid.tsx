"use client";

import Link from "next/link";
import { ArrowUpRight, Lock, Target } from "lucide-react";
import { modules } from "@/content/catalog";
import { summarize, useAttempts } from "@/lib/scores";
import { ModuleIcon } from "./module-icon";

export function ModuleGrid() {
  const summary = summarize(useAttempts());

  return (
    <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-6">
      {modules.map((module, index) => {
        const { score, done, total } = summary.modules[module.id];
        return (
          <li
            key={module.id}
            className="animate-rise lg:col-span-2"
            style={{ animationDelay: `${120 + index * 70}ms` }}
          >
            <Link
              href={module.href}
              className="arctic lift group flex h-full min-h-48 flex-col sm:min-h-56 rounded-[28px] p-6 active:scale-[0.99]"
            >
              <div className="flex items-start justify-between">
                <span className="flex size-12 items-center justify-center rounded-2xl bg-ice-100 text-navy-800 transition-colors duration-200 group-hover:bg-navy-900 group-hover:text-ice-300">
                  <ModuleIcon module={module.id} className="size-6" />
                </span>
                <span className="flex size-10 items-center justify-center rounded-full text-navy-400 transition-[translate,color] duration-200 ease-out-quart group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-navy-900">
                  <ArrowUpRight className="size-5" aria-hidden />
                </span>
              </div>
              <h3 className="mt-5 text-2xl font-semibold text-navy-900">{module.name}</h3>
              <p className="mt-1 text-[15px] text-navy-500">{module.tagline}</p>
              <div className="mt-auto flex items-end justify-between pt-6">
                <p className="text-sm text-navy-500">
                  <span className="font-semibold text-navy-800 tabular-nums">
                    {done}/{total}
                  </span>{" "}
                  actividades
                </p>
                <p className="font-display text-3xl leading-none font-semibold text-navy-900 tabular-nums">
                  {score ?? "–"}
                  <span className="ml-1 font-sans text-xs font-semibold text-navy-400">/100</span>
                </p>
              </div>
            </Link>
          </li>
        );
      })}

      <li
        className="animate-rise sm:col-span-2 lg:col-span-4"
        style={{ animationDelay: `${120 + modules.length * 70}ms` }}
      >
        <div className="flex h-full min-h-48 flex-col sm:min-h-56 rounded-[28px] border border-dashed border-ice-400/70 bg-ice-50/70 p-6">
          <div className="flex items-start justify-between">
            <span className="flex size-12 items-center justify-center rounded-2xl bg-white text-navy-600 shadow-[0_0_0_1px_rgb(10_31_60/0.06)]">
              <Target className="size-6" aria-hidden />
            </span>
            <span className="inline-flex h-7 items-center gap-1.5 rounded-full bg-white px-3 text-xs font-semibold text-navy-600 shadow-[0_0_0_1px_rgb(10_31_60/0.06)]">
              <Lock className="size-3.5" aria-hidden />
              Próximamente
            </span>
          </div>
          <h3 className="mt-5 text-2xl font-semibold text-navy-800">Simulacro tipo TOEFL</h3>
          <p className="mt-1 max-w-xl text-[15px] leading-relaxed text-navy-500">
            Un examen completo con las cuatro habilidades, tiempo real y nota final. Mientras llega, cada actividad que
            completes aquí ya entrena los mismos tipos de tarea.
          </p>
        </div>
      </li>
    </ul>
  );
}
