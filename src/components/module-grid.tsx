"use client";

import Link from "next/link";
import { ArrowUpRight, BookMarked } from "lucide-react";
import { grammarLessons } from "@/content/grammar";
import { useStudied } from "@/lib/studied";
import type { ReactNode } from "react";
import { modules } from "@/content/catalog";
import { summarize, testAttempts, useAttempts } from "@/lib/scores";
import { ModuleIcon, type IconName } from "./module-icon";

type Tile = {
  icon: IconName;
  href: string;
  name: string;
  tagline: string;
  footLeft: ReactNode;
  footRight: ReactNode;
};

function Figure({ value, unit }: { value: string; unit: string }) {
  return (
    <p className="font-display text-3xl leading-none font-semibold text-navy-900 tabular-nums">
      {value}
      <span className="ml-1 font-sans text-xs font-semibold text-navy-400">{unit}</span>
    </p>
  );
}

export function ModuleGrid() {
  const attempts = useAttempts();
  const summary = summarize(attempts);
  const tests = testAttempts(attempts);
  const studied = useStudied().filter((id) => grammarLessons.some((lesson) => lesson.id === id)).length;
  const bestBand = tests.length ? Math.max(...tests.map((attempt) => attempt.bands!.overall)) : null;

  const tiles: Tile[] = [
    ...modules.map((module) => {
      const { score, done, total } = summary.modules[module.id];
      return {
        icon: module.id,
        href: module.href,
        name: module.name,
        tagline: module.tagline,
        footLeft: (
          <>
            <span className="font-semibold text-navy-800 tabular-nums">
              {done}/{total}
            </span>{" "}
            actividades
          </>
        ),
        footRight: <Figure value={score === null ? "–" : String(score)} unit="/100" />,
      };
    }),
    {
      icon: "test",
      href: "/simulacro",
      name: "Simulacro tipo TOEFL",
      tagline: "Examen completo con tiempo",
      footLeft:
        tests.length === 0 ? (
          "Sin intentos"
        ) : (
          <>
            <span className="font-semibold text-navy-800 tabular-nums">{tests.length}</span>{" "}
            {tests.length === 1 ? "simulacro" : "simulacros"}
          </>
        ),
      footRight: <Figure value={bestBand === null ? "–" : bestBand.toFixed(1)} unit="/6" />,
    },
    {
      icon: "tutor",
      href: "/tutor",
      name: "Tutora de conversación",
      tagline: "Habla con una IA que te corrige",
      footLeft: "Conversación libre o por escenas",
      footRight: null,
    },
  ];

  return (
    <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <li className="animate-rise sm:col-span-2 lg:col-span-3" style={{ animationDelay: "80ms" }}>
        <Link
          href="/gramatica"
          className="arctic-deep lift group flex flex-col gap-5 rounded-[28px] p-6 active:scale-[0.995] sm:flex-row sm:items-center sm:p-7"
        >
          <span className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-white/10 text-ice-300">
            <BookMarked className="size-7" aria-hidden />
          </span>
          <div className="flex-1">
            <p className="text-xs font-semibold tracking-wide text-ice-300 uppercase">Modo estudio · sin notas</p>
            <h3 className="mt-1 text-2xl font-semibold">Gramática y reglas</h3>
            <p className="mt-1 max-w-2xl text-[15px] leading-relaxed text-ice-200">
              Aprende las reglas a tu ritmo: explicaciones claras, ejemplos con audio, británico frente a americano y
              errores típicos.
            </p>
          </div>
          <div className="flex items-center gap-4 sm:flex-col sm:items-end">
            <p className="font-display text-3xl leading-none font-semibold tabular-nums">
              {studied}
              <span className="ml-1 font-sans text-xs font-semibold text-ice-200">/ {grammarLessons.length} lecciones</span>
            </p>
            <span className="inline-flex min-h-11 items-center gap-1.5 rounded-full bg-white px-5 text-[15px] font-semibold text-navy-900 transition-colors duration-200 group-hover:bg-ice-100">
              {studied > 0 ? "Seguir estudiando" : "Empezar"}
              <ArrowUpRight className="size-4" aria-hidden />
            </span>
          </div>
        </Link>
      </li>
      {tiles.map((tile, index) => (
        <li key={tile.href} className="animate-rise" style={{ animationDelay: `${120 + index * 70}ms` }}>
          <Link
            href={tile.href}
            className="arctic lift group flex h-full min-h-48 flex-col rounded-[28px] p-6 active:scale-[0.99] sm:min-h-56"
          >
            <div className="flex items-start justify-between">
              <span className="flex size-12 items-center justify-center rounded-2xl bg-ice-100 text-navy-800 transition-colors duration-200 group-hover:bg-navy-900 group-hover:text-ice-300">
                <ModuleIcon module={tile.icon} className="size-6" />
              </span>
              <span className="flex size-10 items-center justify-center rounded-full text-navy-400 transition-[translate,color] duration-200 ease-out-quart group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-navy-900">
                <ArrowUpRight className="size-5" aria-hidden />
              </span>
            </div>
            <h3 className="mt-5 text-2xl font-semibold text-navy-900">{tile.name}</h3>
            <p className="mt-1 text-[15px] text-navy-500">{tile.tagline}</p>
            <div className="mt-auto flex items-end justify-between gap-3 pt-6">
              <p className="text-sm text-navy-500">{tile.footLeft}</p>
              {tile.footRight}
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}
