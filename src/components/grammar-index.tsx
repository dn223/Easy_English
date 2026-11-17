"use client";

import Link from "next/link";
import { ArrowRight, CircleCheck, Clock, ExternalLink } from "lucide-react";
import { useState } from "react";
import { grammarCategories, grammarLessons, grammarSources } from "@/content/grammar";
import { useStudied } from "@/lib/studied";
import type { Level } from "@/lib/types";
import { LevelBadge } from "./ui";

const LEVELS: (Level | "todos")[] = ["todos", "A2", "B1", "B2"];

export function GrammarIndex() {
  const studied = useStudied();
  const [level, setLevel] = useState<Level | "todos">("todos");
  const done = grammarLessons.filter((lesson) => studied.includes(lesson.id)).length;
  const visible = grammarLessons.filter((lesson) => level === "todos" || lesson.level === level);

  return (
    <div className="space-y-10">
      <div className="arctic animate-rise flex flex-wrap items-center gap-x-8 gap-y-4 rounded-3xl p-5 sm:p-6" style={{ animationDelay: "60ms" }}>
        <div className="min-w-56 flex-1">
          <p className="text-[15px] font-semibold text-navy-800">
            <span className="tabular-nums">{done}</span> de {grammarLessons.length} lecciones estudiadas
          </p>
          <div className="mt-2 h-2 overflow-hidden rounded-full bg-ice-100">
            <div
              className="h-full origin-left rounded-full bg-ice-500 transition-transform duration-700 ease-out-quart"
              style={{ transform: `scaleX(${done / grammarLessons.length})` }}
            />
          </div>
        </div>
        <div role="radiogroup" aria-label="Filtrar por nivel" className="inline-flex rounded-full bg-ice-100 p-1">
          {LEVELS.map((option) => (
            <button
              key={option}
              type="button"
              role="radio"
              aria-checked={option === level}
              onClick={() => setLevel(option)}
              className={`press min-h-9 rounded-full px-4 text-sm font-semibold ${
                option === level ? "bg-navy-900 text-white" : "text-navy-600 hover:text-navy-900"
              }`}
            >
              {option === "todos" ? "Todos" : option}
            </button>
          ))}
        </div>
      </div>

      {grammarCategories.map((category) => {
        const lessons = visible.filter((lesson) => lesson.category === category.id);
        if (lessons.length === 0) return null;
        return (
          <section key={category.id} aria-labelledby={`cat-${category.id}`}>
            <h2 id={`cat-${category.id}`} className="text-2xl font-semibold text-navy-900">
              {category.name}
            </h2>
            <p className="mt-1 text-[15px] text-navy-500">{category.description}</p>
            <ul className="mt-4 grid gap-4 md:grid-cols-2">
              {lessons.map((lesson, index) => {
                const isStudied = studied.includes(lesson.id);
                return (
                  <li key={lesson.id} className="animate-rise" style={{ animationDelay: `${60 + index * 50}ms` }}>
                    <Link
                      href={`/gramatica/${lesson.id}`}
                      className="arctic lift group flex h-full flex-col rounded-3xl p-5 active:scale-[0.99] sm:p-6"
                    >
                      <div className="flex flex-wrap items-center gap-2">
                        <LevelBadge level={lesson.level} />
                        <span className="inline-flex items-center gap-1.5 text-sm text-navy-400">
                          <Clock className="size-4" aria-hidden />
                          {lesson.minutes} min
                        </span>
                        {isStudied && (
                          <span className="ml-auto inline-flex items-center gap-1.5 text-sm font-semibold text-ok">
                            <CircleCheck className="size-4" aria-hidden />
                            Estudiada
                          </span>
                        )}
                      </div>
                      <h3 className="mt-4 text-xl font-semibold text-navy-900" lang="en">
                        {lesson.title}
                      </h3>
                      <p className="mt-0.5 text-[15px] font-medium text-navy-600">{lesson.subtitle}</p>
                      <p className="mt-2 text-[15px] leading-relaxed text-navy-500">{lesson.summary}</p>
                      <span className="mt-auto inline-flex items-center gap-1.5 pt-4 text-sm font-semibold text-navy-800">
                        {isStudied ? "Repasar" : "Estudiar"}
                        <ArrowRight
                          className="size-4 transition-[translate] duration-200 ease-out-quart group-hover:translate-x-1"
                          aria-hidden
                        />
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </section>
        );
      })}

      <section aria-labelledby="fuentes" className="arctic rounded-3xl p-6 sm:p-8">
        <h2 id="fuentes" className="text-2xl font-semibold text-navy-900">
          Para profundizar
        </h2>
        <p className="mt-2 max-w-3xl text-[15px] leading-relaxed text-navy-500">
          Las lecciones son originales y siguen los criterios de las gramáticas de referencia más recomendadas por
          profesores. Si quieres ir más allá, estas son las obras de consulta.
        </p>
        <div className="mt-6 grid gap-8 lg:grid-cols-2">
          <div>
            <h3 className="text-sm font-semibold tracking-wide text-navy-400 uppercase">Libros de referencia</h3>
            <ul className="mt-3 space-y-3">
              {grammarSources.reference.map((source) => (
                <li key={source.title}>
                  <p className="text-[16px] font-semibold text-navy-900">
                    <span lang="en">{source.title}</span>
                    <span className="font-normal text-navy-500"> · {source.author}</span>
                  </p>
                  <p className="text-[15px] leading-relaxed text-navy-500">{source.note}</p>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold tracking-wide text-navy-400 uppercase">Gratis y abiertos</h3>
            <ul className="mt-3 space-y-3">
              {grammarSources.open.map((source) => (
                <li key={source.title}>
                  <a
                    href={source.url}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 text-[16px] font-semibold text-ice-600 underline decoration-ice-300 underline-offset-4 hover:decoration-ice-500"
                  >
                    <span lang="en">{source.title}</span>
                    <ExternalLink className="size-4 shrink-0" aria-hidden />
                  </a>
                  <p className="text-[15px] leading-relaxed text-navy-500">{source.note}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
