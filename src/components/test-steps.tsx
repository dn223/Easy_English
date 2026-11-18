"use client";

import { ArrowRight, Square, Volume2 } from "lucide-react";
import { useEffect, useRef, useState, type ReactNode } from "react";
import type { ResponseItem } from "@/content/test";
import { speak, ttsSupported, type SpokenLine } from "@/lib/speech";
import type { ListeningLine, Question } from "@/lib/types";
import { useClientValue } from "@/lib/use-client-value";
import { QuestionCard } from "./quiz";
import { buttonClass } from "./ui";

type StepProps = {
  /** Puntos conseguidos hasta ahora en este paso; se informa en cada cambio por si se acaba el tiempo. */
  onScore: (points: number) => void;
  onNext: () => void;
};

function NextButton({ onNext, pending = 0 }: { onNext: () => void; pending?: number }) {
  return (
    <div className="flex flex-wrap items-center gap-4 pt-2">
      <button type="button" onClick={onNext} className={buttonClass("primary", "h-12 px-6")}>
        Siguiente
        <ArrowRight className="size-4" aria-hidden />
      </button>
      {pending > 0 && (
        <p className="text-sm text-navy-500">
          {pending === 1 ? "Te queda 1 sin responder" : `Te quedan ${pending} sin responder`}; contará como fallo.
        </p>
      )}
    </div>
  );
}

// ── Complete the Words ─────────────────────────────────────────────────────

type Token = { text: string } | { shown: string; missing: string; index: number };

function parseGaps(text: string): Token[] {
  const tokens: Token[] = [];
  let index = 0;
  for (const part of text.split(/(\w+\[\w+\])/)) {
    const gap = part.match(/^(\w+)\[(\w+)\]$/);
    if (gap) tokens.push({ shown: gap[1], missing: gap[2], index: index++ });
    else if (part) tokens.push({ text: part });
  }
  return tokens;
}

export function CompleteWordsStep({ text, onScore, onNext }: StepProps & { text: string }) {
  const tokens = parseGaps(text);
  const gaps = tokens.filter((token) => "missing" in token);
  const [values, setValues] = useState<Record<number, string>>({});

  const update = (index: number, value: string) => {
    const next = { ...values, [index]: value };
    setValues(next);
    onScore(gaps.filter((gap) => (next[gap.index] ?? "").trim().toLowerCase() === gap.missing).length);
  };

  return (
    <div className="mx-auto max-w-3xl space-y-4">
      <section className="arctic rounded-3xl p-6 sm:p-8">
        <p className="text-[15px] text-navy-500">
          Completa las palabras incompletas. Cada hueco indica cuántas letras faltan.
        </p>
        <p className="mt-5 text-[18px] leading-[2.3] text-navy-900" lang="en">
          {tokens.map((token, position) =>
            "text" in token ? (
              <span key={position}>{token.text}</span>
            ) : (
              <span key={position} className="whitespace-nowrap">
                {token.shown}
                <input
                  type="text"
                  value={values[token.index] ?? ""}
                  onChange={(event) => update(token.index, event.target.value)}
                  maxLength={token.missing.length}
                  autoCapitalize="none"
                  autoComplete="off"
                  autoCorrect="off"
                  spellCheck={false}
                  aria-label={`Hueco ${token.index + 1}: palabra que empieza por ${token.shown}, faltan ${token.missing.length} letras`}
                  className="mx-0.5 h-9 rounded-lg bg-ice-50 px-1 text-center font-semibold tracking-wide text-navy-900 shadow-[inset_0_0_0_1.5px_var(--color-ice-300)] focus:shadow-[inset_0_0_0_2px_var(--color-ice-500)] focus:outline-none"
                  style={{ width: `calc(${token.missing.length}ch + 1.1rem)` }}
                />
              </span>
            ),
          )}
        </p>
      </section>
      <NextButton onNext={onNext} pending={gaps.filter((gap) => !(values[gap.index] ?? "").trim()).length} />
    </div>
  );
}

// ── Preguntas de opción múltiple con un texto o un audio al lado ───────────

type ChoiceStepProps = StepProps & {
  name: string;
  aside: ReactNode;
  questions: Question[];
};

export function ChoiceStep({ name, aside, questions, onScore, onNext }: ChoiceStepProps) {
  const [answers, setAnswers] = useState<Record<string, number>>({});

  const choose = (id: string, option: number) => {
    const next = { ...answers, [id]: option };
    setAnswers(next);
    onScore(questions.filter((question) => next[question.id] === question.answer).length);
  };

  return (
    <div className="grid items-start gap-6 lg:grid-cols-2">
      <div className="lg:sticky lg:top-36">{aside}</div>
      <div className="space-y-4" lang="en">
        {questions.map((question, index) => (
          <QuestionCard
            key={question.id}
            name={`${name}-${question.id}`}
            question={question}
            index={index}
            chosen={answers[question.id]}
            onChoose={(option) => choose(question.id, option)}
          />
        ))}
        <div lang="es">
          <NextButton onNext={onNext} pending={questions.filter((q) => answers[q.id] === undefined).length} />
        </div>
      </div>
    </div>
  );
}

export function ReadingAside({ heading, title, paragraphs }: { heading?: string; title: string; paragraphs: string[] }) {
  return (
    <article lang="en" className="arctic rounded-3xl p-6 sm:p-8 lg:max-h-[calc(100dvh-11rem)] lg:overflow-y-auto">
      {heading && <p className="text-sm font-semibold tracking-wide text-navy-400 uppercase">{heading}</p>}
      <h3 className="mt-1 text-xl font-semibold text-navy-900">{title}</h3>
      <div className="mt-4 space-y-4 text-[17px] leading-[1.7] text-navy-800">
        {paragraphs.map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </div>
    </article>
  );
}

// ── Audio ──────────────────────────────────────────────────────────────────

function usePlayer(lines: SpokenLine[]) {
  const [playing, setPlaying] = useState(false);
  const stopRef = useRef<() => void>(() => {});
  useEffect(() => () => stopRef.current(), []);

  const toggle = () => {
    if (playing) {
      stopRef.current();
      setPlaying(false);
      return;
    }
    setPlaying(true);
    stopRef.current = speak(lines, { onEnd: () => setPlaying(false) });
  };
  return { playing, toggle };
}

function toSpoken(lines: ListeningLine[]): SpokenLine[] {
  const speakers = [...new Set(lines.map((line) => line.speaker))];
  return lines.map((line) => ({ text: line.text, voiceIndex: speakers.indexOf(line.speaker) }));
}

export function AudioAside({ title, lines }: { title: string; lines: ListeningLine[] }) {
  const supported = useClientValue(ttsSupported, true);
  const { playing, toggle } = usePlayer(toSpoken(lines));
  const [reading, setReading] = useState(false);
  const showText = reading || !supported;
  const dialogue = new Set(lines.map((line) => line.speaker)).size > 1;

  return (
    <section className="arctic-deep rounded-[28px] p-6 sm:p-7" aria-label="Audio">
      <p className="font-display text-lg font-semibold" lang="en">
        {title}
      </p>
      {supported && (
        <div className="mt-4 flex flex-wrap items-center gap-3">
          <button type="button" onClick={toggle} className={buttonClass("onDeep", "h-12 px-6")}>
            {playing ? <Square className="size-4" aria-hidden /> : <Volume2 className="size-5" aria-hidden />}
            {playing ? "Detener" : "Escuchar"}
          </button>
          {!reading && (
            <button
              type="button"
              onClick={() => setReading(true)}
              className="press inline-flex min-h-11 items-center rounded-full bg-white/10 px-4 text-sm font-semibold text-white hover:bg-white/18"
            >
              No oigo nada: leerlo
            </button>
          )}
        </div>
      )}
      {showText ? (
        <div className="mt-5 space-y-2.5 text-[15px] leading-relaxed text-ice-100" lang="en">
          {lines.map((line, index) => (
            <p key={index}>
              {dialogue && <span className="font-semibold text-white">{line.speaker}: </span>}
              {line.text}
            </p>
          ))}
        </div>
      ) : (
        <p className="mt-4 text-sm leading-relaxed text-ice-200">
          En el examen real el audio suena una sola vez. Aquí puedes repetirlo, pero intenta responder con una escucha.
        </p>
      )}
    </section>
  );
}

function ResponsePrompt({ item, number }: { item: ResponseItem; number: number }) {
  const supported = useClientValue(ttsSupported, true);
  const { playing, toggle } = usePlayer([{ text: item.said }]);
  return supported ? (
    <button type="button" onClick={toggle} className={buttonClass("soft")}>
      {playing ? <Square className="size-4" aria-hidden /> : <Volume2 className="size-5" aria-hidden />}
      {playing ? "Detener" : `Escuchar frase ${number}`}
    </button>
  ) : (
    <p className="text-[17px] font-semibold text-navy-900" lang="en">
      “{item.said}”
    </p>
  );
}

export function ChooseResponseStep({
  items,
  onScore,
  onNext,
}: StepProps & { items: ResponseItem[] }) {
  const [answers, setAnswers] = useState<Record<string, number>>({});

  const choose = (id: string, option: number) => {
    const next = { ...answers, [id]: option };
    setAnswers(next);
    onScore(items.filter((item) => next[item.id] === item.answer).length);
  };

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <p className="text-[15px] text-navy-500">Escucha cada frase y elige la respuesta más natural.</p>
      {items.map((item, index) => (
        <div key={item.id} className="space-y-3">
          <ResponsePrompt item={item} number={index + 1} />
          <div lang="en">
            <QuestionCard
              name={`respond-${item.id}`}
              question={{ id: item.id, prompt: "Choose the best response.", options: item.options, answer: item.answer, explanation: "" }}
              index={index}
              chosen={answers[item.id]}
              onChoose={(option) => choose(item.id, option)}
            />
          </div>
        </div>
      ))}
      <NextButton onNext={onNext} pending={items.filter((item) => answers[item.id] === undefined).length} />
    </div>
  );
}
