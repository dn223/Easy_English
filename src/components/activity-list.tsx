"use client";

import Link from "next/link";
import { ArrowRight, Check, Clock } from "lucide-react";
import { activitiesOf } from "@/content/catalog";
import { summarize, useAttempts } from "@/lib/scores";
import type { ModuleId } from "@/lib/types";
import { LevelBadge, Tag } from "./ui";

export function ActivityList({ module }: { module: ModuleId }) {
  const { best } = summarize(useAttempts());

  return (
    <ul className="grid gap-4 md:grid-cols-2">
      {activitiesOf(module).map((activity, index) => {
        const score = best[activity.id];
        const done = score !== undefined;
        return (
          <li key={activity.id} className="animate-rise" style={{ animationDelay: `${80 + index * 70}ms` }}>
            <Link
              href={activity.href}
              className="arctic lift group flex h-full flex-col rounded-3xl p-5 active:scale-[0.99] sm:p-6"
            >
              <div className="flex flex-wrap items-center gap-2">
                <LevelBadge level={activity.level} />
                <Tag>{activity.tag}</Tag>
                <span className="ml-auto inline-flex items-center gap-1.5 text-sm text-navy-400">
                  <Clock className="size-4" aria-hidden />
                  {activity.minutes} min
                </span>
              </div>
              <h2 className="mt-4 text-xl font-semibold text-navy-900">{activity.title}</h2>
              <p className="mt-1.5 text-[15px] leading-relaxed text-navy-500">{activity.summary}</p>
              <div className="mt-auto flex items-center justify-between pt-5">
                {done ? (
                  <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-ok">
                    <Check className="size-4" aria-hidden />
                    Mejor nota: <span className="tabular-nums">{score}</span>
                  </span>
                ) : (
                  <span className="text-sm text-navy-400">Sin intentos</span>
                )}
                <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-navy-800">
                  {done ? "Repetir" : "Empezar"}
                  <ArrowRight
                    className="size-4 transition-[translate] duration-200 ease-out-quart group-hover:translate-x-1"
                    aria-hidden
                  />
                </span>
              </div>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
