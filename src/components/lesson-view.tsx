"use client";

import Link from "next/link";
import { ArrowRight, Check, CircleCheck, RotateCcw, Square, Volume2, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import type { GrammarLesson } from "@/content/grammar";
import { speak, ttsSupported, type Accent } from "@/lib/speech";
import { setStudied, useStudied } from "@/lib/studied";
import { useClientValue } from "@/lib/use-client-value";
import { AccentToggle } from "./accent-toggle";
import { QuestionCard } from "./quiz";
import { RichText } from "./rich-text";
import { buttonClass } from "./ui";

type Speaker = { say: (text: string, key: string, accent?: Accent) => void; playing: string | null };

function useSpeaker(accent: Accent): Speaker {
  const [playing, setPlaying] = useState<string | null>(null);
  const stopRef = useRef<() => void>(() => {});
  useEffect(() => () => stopRef.current(), []);

  const say = (text: string, key: string, override?: Accent) => {
    stopRef.current();
    if (playing === key) {
      setPlaying(null);
      return;
    }
    setPlaying(key);
    stopRef.current = speak([{ text }], { accent: override ?? accent, rate: 0.95, onEnd: () => setPlaying(null) });
  };
  return { say, playing };
}

function SpeakButton({ speaker, text, id, accent, label }: { speaker: Speaker; text: string; id: string; accent?: Accent; label?: string }) {
  const active = speaker.playing === id;
  return (
    <button
      type="button"
      onClick={() => speaker.say(text, id, accent)}
      aria-label={active ? "Detener" : `Escuchar${label ? ` en ${label}` : ""}: ${text}`}
      className="press -my-1 flex size-10 shrink-0 items-center justify-center rounded-full text-navy-500 hover:bg-ice-100 hover:text-navy-900"
    >
      {active ? <Square className="size-3.5" aria-hidden /> : <Volume2 className="size-[18px]" aria-hidden />}
    </button>
  );
}

function SectionTitle({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <h2 id={id} className="scroll-mt-28 text-2xl font-semibold text-navy-900">
      {children}
    </h2>
  );
}

function Practice({ lesson }: { lesson: GrammarLesson }) {
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const answered = Object.keys(answers).length;
  const correct = lesson.practice.filter((question) => answers[question.id] === question.answer).length;

  return (
    <div className="space-y-4">
      <div lang="en" className="space-y-4">
        {lesson.practice.map((question, index) => (
          <QuestionCard
            key={question.id}
            name={`${lesson.id}-${question.id}`}
            question={question}
            index={index}
            chosen={answers[question.id]}
            // Modo estudio: cada pregunta se corrige al momento y no se guarda ninguna nota.
            checked={answers[question.id] !== undefined}
            onChoose={(option) => setAnswers((current) => ({ ...current, [question.id]: option }))}
          />
        ))}
      </div>
      {answered === lesson.practice.length && (
        <div className="arctic animate-rise flex flex-wrap items-center gap-4 rounded-3xl p-5" aria-live="polite">
          <p className="text-[16px] text-navy-800">
            Acertaste <span className="font-semibold tabular-nums">{correct}</span> de {lesson.practice.length}.{" "}
            {correct === lesson.practice.length ? "¡Lo tienes dominado!" : "Repasa las reglas y vuelve a intentarlo."}
          </p>
          <button type="button" onClick={() => setAnswers({})} className={buttonClass("soft", "ml-auto")}>
            <RotateCcw className="size-4" aria-hidden />
            Repetir práctica
          </button>
        </div>
      )}
    </div>
  );
}

export function StudiedButton({ id, compact = false }: { id: string; compact?: boolean }) {
  const studied = useStudied().includes(id);
  return (
    <button
      type="button"
      aria-pressed={studied}
      onClick={() => setStudied(id, !studied)}
      className={buttonClass(studied ? "soft" : "primary", compact ? "" : "h-12 px-6")}
    >
      {studied ? <CircleCheck className="size-5 text-ok" aria-hidden /> : <Check className="size-4" aria-hidden />}
      {studied ? "Estudiada" : "Marcar como estudiada"}
    </button>
  );
}

type LessonViewProps = {
  lesson: GrammarLesson;
  next?: { id: string; title: string };
};

export function LessonView({ lesson, next }: LessonViewProps) {
  const canSpeak = useClientValue(ttsSupported, true);
  const [accent, setAccent] = useState<Accent>("en-US");
  const speaker = useSpeaker(accent);

  const toc = [
    ...lesson.rules.map((rule, index) => ({ id: `regla-${index + 1}`, label: rule.title })),
    ...(lesson.variants ? [{ id: "variantes", label: "Británico y americano" }] : []),
    { id: "errores", label: "Errores comunes" },
    { id: "practica", label: "Práctica" },
  ];

  return (
    <div className="grid items-start gap-8 lg:grid-cols-[15rem_1fr]">
      <aside className="hidden lg:sticky lg:top-24 lg:block" aria-label="En esta lección">
        <p className="mb-2 text-xs font-semibold tracking-wide text-navy-400 uppercase">En esta lección</p>
        <nav>
          <ol className="space-y-0.5 border-l border-ice-200">
            {toc.map((entry) => (
              <li key={entry.id}>
                <a
                  href={`#${entry.id}`}
                  className="-ml-px block border-l-2 border-transparent py-1.5 pr-2 pl-3 text-sm leading-snug text-navy-500 transition-colors duration-150 hover:border-ice-500 hover:text-navy-900"
                >
                  {entry.label}
                </a>
              </li>
            ))}
          </ol>
        </nav>
        <div className="mt-6">
          <StudiedButton id={lesson.id} compact />
        </div>
      </aside>

      <div className="min-w-0 space-y-10">
        <section className="arctic animate-rise rounded-3xl p-6 sm:p-7" style={{ animationDelay: "60ms" }}>
          <p className="text-[17px] leading-relaxed text-navy-700">
            <RichText text={lesson.intro} />
          </p>
          {canSpeak && (
            <div className="mt-5 flex flex-wrap items-center gap-3 border-t border-ice-200 pt-4">
              <p className="text-sm font-semibold text-navy-500">Acento de los ejemplos</p>
              <AccentToggle value={accent} onChange={setAccent} />
            </div>
          )}
        </section>

        {lesson.rules.map((rule, index) => (
          <section key={rule.title} className="space-y-4">
            <SectionTitle id={`regla-${index + 1}`}>
              <span className="mr-2 text-ice-500 tabular-nums">{index + 1}.</span>
              {rule.title}
            </SectionTitle>
            <p className="max-w-3xl text-[17px] leading-relaxed text-navy-700">
              <RichText text={rule.text} />
            </p>
            {rule.form && (
              <p className="inline-flex max-w-full items-center gap-2 rounded-2xl bg-navy-900 px-4 py-2.5 text-[15px] font-semibold text-white">
                <span className="text-xs tracking-wide uppercase opacity-70">Forma</span>
                <span>{rule.form}</span>
              </p>
            )}
            <ul className="arctic divide-y divide-ice-200 rounded-3xl px-2 py-1">
              {rule.examples.map((example, exampleIndex) => {
                const key = `${index}-${exampleIndex}`;
                // Los ejemplos “UK: … · US: …” se leen cada uno con su acento.
                const parts = example.en.match(/^UK: (.+?) · US: (.+)$/);
                return (
                  <li key={key} className="flex items-start gap-2 px-3 py-3">
                    <div className="min-w-0 flex-1">
                      {parts ? (
                        <div className="space-y-1.5" lang="en">
                          {[
                            { label: "UK", text: parts[1], voice: "en-GB" as const },
                            { label: "US", text: parts[2], voice: "en-US" as const },
                          ].map((variant) => (
                            <p key={variant.label} className="flex items-start gap-2 text-[17px] font-semibold text-navy-900">
                              <span className="mt-0.5 inline-flex h-6 shrink-0 items-center rounded-full bg-ice-100 px-2 text-xs font-bold text-navy-700">
                                {variant.label}
                              </span>
                              <span className="flex-1">{variant.text}</span>
                              {canSpeak && (
                                <SpeakButton
                                  speaker={speaker}
                                  text={variant.text}
                                  id={`${key}-${variant.label}`}
                                  accent={variant.voice}
                                  label={variant.label === "UK" ? "británico" : "americano"}
                                />
                              )}
                            </p>
                          ))}
                        </div>
                      ) : (
                        <p className="text-[17px] font-semibold text-navy-900" lang="en">
                          {example.en}
                        </p>
                      )}
                      {example.es && <p className="mt-1 text-[15px] text-navy-500">{example.es}</p>}
                    </div>
                    {canSpeak && !parts && <SpeakButton speaker={speaker} text={example.en} id={key} />}
                  </li>
                );
              })}
            </ul>
            {rule.table && (
              <div className="arctic overflow-x-auto rounded-3xl">
                <table className="w-full min-w-[22rem] text-left text-[15px]">
                  <thead>
                    <tr className="border-b border-ice-200">
                      {rule.table.head.map((cell) => (
                        <th key={cell} scope="col" className="px-4 py-3 font-semibold text-navy-900">
                          {cell}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody lang="en">
                    {rule.table.rows.map((row, rowIndex) => (
                      <tr key={rowIndex} className="border-b border-ice-100 last:border-0">
                        {row.map((cell, cellIndex) => (
                          <td key={cellIndex} className="px-4 py-2.5 text-navy-700">
                            {cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </section>
        ))}

        {lesson.variants && (
          <section className="space-y-4">
            <SectionTitle id="variantes">Británico y americano</SectionTitle>
            <p className="max-w-3xl text-[17px] leading-relaxed text-navy-700">
              <RichText text={lesson.variants.text} />
            </p>
            <div className="arctic overflow-hidden rounded-3xl">
              <div className="grid grid-cols-2 border-b border-ice-200 text-sm font-semibold text-navy-500">
                <p className="px-4 py-3">Británico (UK)</p>
                <p className="border-l border-ice-200 px-4 py-3">Americano (US)</p>
              </div>
              {lesson.variants.pairs.map((pair, index) => (
                <div key={index} className="grid grid-cols-2 border-b border-ice-100 last:border-0" lang="en">
                  {[
                    { text: pair.uk, voice: "en-GB" as const, label: "británico" },
                    { text: pair.us, voice: "en-US" as const, label: "americano" },
                  ].map((side, sideIndex) => (
                    <div
                      key={side.voice}
                      className={`flex items-start gap-1 px-4 py-3 ${sideIndex === 1 ? "border-l border-ice-200" : ""}`}
                    >
                      <p className="flex-1 text-[16px] font-semibold text-navy-900">{side.text}</p>
                      {canSpeak && (
                        <SpeakButton
                          speaker={speaker}
                          text={side.text}
                          id={`v-${index}-${side.voice}`}
                          accent={side.voice}
                          label={side.label}
                        />
                      )}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </section>
        )}

        <section className="space-y-4">
          <SectionTitle id="errores">Errores comunes</SectionTitle>
          <ul className="grid gap-3 md:grid-cols-2">
            {lesson.mistakes.map((mistake) => (
              <li key={mistake.wrong} className="arctic rounded-3xl p-5">
                <p className="flex items-start gap-2 text-[16px] text-navy-500 line-through decoration-bad/60" lang="en">
                  <X className="mt-1 size-4 shrink-0 text-bad no-underline" aria-hidden />
                  <span className="sr-only">Incorrecto: </span>
                  {mistake.wrong}
                </p>
                <p className="mt-2 flex items-start gap-2 text-[16px] font-semibold text-navy-900" lang="en">
                  <Check className="mt-1 size-4 shrink-0 text-ok" aria-hidden />
                  <span className="sr-only">Correcto: </span>
                  {mistake.right}
                </p>
                <p className="mt-2 text-[15px] leading-relaxed text-navy-500">{mistake.why}</p>
              </li>
            ))}
          </ul>
        </section>

        <section className="space-y-4">
          <SectionTitle id="practica">Práctica</SectionTitle>
          <p className="text-[16px] text-navy-500">
            Comprueba lo que aprendiste. Cada respuesta se corrige al momento y no cuenta para tu nota.
          </p>
          <Practice lesson={lesson} />
        </section>

        <div className="flex flex-wrap items-center gap-3 border-t border-ice-200 pt-6">
          <StudiedButton id={lesson.id} />
          {next && (
            <Link href={`/gramatica/${next.id}`} className={buttonClass("ghost", "h-12")}>
              Siguiente: {next.title}
              <ArrowRight className="size-4" aria-hidden />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
