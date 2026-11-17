"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
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
