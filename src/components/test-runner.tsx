"use client";

import Link from "next/link";
import { Clock, RotateCcw } from "lucide-react";
import { useState } from "react";
import { modules } from "@/content/catalog";
import {
  academicAdvanced,
  academicStandard,
  ADVANCED_THRESHOLD,
  ADVANCED_WEIGHT,
  chooseResponse,
  completeWordsText,
  conversation,
  dailyLife,
  EMAIL_SECONDS,
  LISTENING_SECONDS,
  READING_SECONDS,
  talkAdvanced,
  talkStandard,
  testEmail,
  testInterview,
  testRepeat,
  testSentences,
} from "@/content/test";
import { saveAttempt, TEST_ACTIVITY_ID, toBand } from "@/lib/scores";
import type { Accent } from "@/lib/speech";
import type { Bands, ModuleId } from "@/lib/types";
import { formatClock, useCountdown } from "@/lib/use-countdown";
import { AccentToggle } from "./accent-toggle";
import { BuildSentence } from "./build-sentence";
import { EmailExercise } from "./email-exercise";
import { InterviewExercise } from "./interview-exercise";
import { ModuleIcon } from "./module-icon";
import { RepeatExercise } from "./repeat-exercise";
import { AudioAside, ChoiceStep, ChooseResponseStep, CompleteWordsStep, ReadingAside } from "./test-steps";
import { buttonClass } from "./ui";

const STEPS: { id: string; section: ModuleId; task: string }[] = [
  { id: "r-words", section: "reading", task: "Complete the Words" },
  { id: "r-daily", section: "reading", task: "Read in Daily Life" },
  { id: "r-academic", section: "reading", task: "Read an Academic Passage" },
  { id: "l-respond", section: "listening", task: "Listen and Choose a Response" },
  { id: "l-conversation", section: "listening", task: "Listen to a Conversation" },
  { id: "l-talk", section: "listening", task: "Listen to an Academic Talk" },
  { id: "w-build", section: "writing", task: "Build a Sentence" },
  { id: "w-email", section: "writing", task: "Write an Email" },
  { id: "s-repeat", section: "speaking", task: "Listen and Repeat" },
  { id: "s-interview", section: "speaking", task: "Take an Interview" },
];

const SECTION_ORDER: ModuleId[] = ["reading", "listening", "writing", "speaking"];
const GAP_COUNT = (completeWordsText.match(/\[\w+\]/g) ?? []).length;

type Points = Record<string, number>;
type Result = { bands: Bands; percent: Record<ModuleId, number>; advanced: { reading: boolean; listening: boolean } };

function ratio(points: Points, ids: string[], max: number): number {
  return ids.reduce((sum, id) => sum + (points[id] ?? 0), 0) / max;
}

function grade(points: Points): Result {
  const readingAdvanced = ratio(points, ["r-words", "r-daily"], GAP_COUNT + dailyLife.questions.length) >= ADVANCED_THRESHOLD;
  const listeningAdvanced =
    ratio(points, ["l-respond", "l-conversation"], chooseResponse.length + conversation.questions.length) >=
    ADVANCED_THRESHOLD;

  // El máximo es siempre el de la ruta avanzada: quien va por la estándar no puede llegar al 100 %.
  const readingMax = GAP_COUNT + dailyLife.questions.length + academicAdvanced.questions.length * ADVANCED_WEIGHT;
  const listeningMax = chooseResponse.length + conversation.questions.length + talkAdvanced.questions.length * ADVANCED_WEIGHT;
  const get = (id: string) => points[id] ?? 0;

  const percent: Record<ModuleId, number> = {
    reading:
      ((get("r-words") + get("r-daily") + get("r-academic") * (readingAdvanced ? ADVANCED_WEIGHT : 1)) / readingMax) * 100,
    listening:
      ((get("l-respond") + get("l-conversation") + get("l-talk") * (listeningAdvanced ? ADVANCED_WEIGHT : 1)) /
        listeningMax) *
      100,
    writing: (get("w-build") + get("w-email")) / 2,
    speaking: (get("s-repeat") + get("s-interview")) / 2,
  };

  const sectionBands = Object.fromEntries(SECTION_ORDER.map((id) => [id, toBand(percent[id])])) as Record<ModuleId, number>;
  const average = SECTION_ORDER.reduce((sum, id) => sum + sectionBands[id], 0) / SECTION_ORDER.length;
  return {
    bands: { ...sectionBands, overall: Math.round(average * 2) / 2 },
    percent,
    advanced: { reading: readingAdvanced, listening: listeningAdvanced },
  };
}

export function TestRunner() {
  const [accent, setAccent] = useState<Accent>("en-US");
  const [step, setStep] = useState<number | null>(null);
  const [points, setPoints] = useState<Points>({});
  const [emailTimeUp, setEmailTimeUp] = useState(false);
  const [result, setResult] = useState<Result | null>(null);
  const countdown = useCountdown();

  // Los temporizadores dependen del bloque al que se entra, no del paso: Reading y Listening
  // tienen tiempo de sección y el correo tiene el suyo.
  const enter = (next: number) => {
    setStep(next);
    window.scrollTo({ top: 0 });
    if (next === 0) countdown.start(READING_SECONDS, () => enter(3));
    else if (next === 3) countdown.start(LISTENING_SECONDS, () => enter(6));
    else if (next === 7) countdown.start(EMAIL_SECONDS, () => setEmailTimeUp(true));
    else if (next === 6 || next === 8) countdown.stop();
  };

  const score = (id: string) => (value: number) => setPoints((current) => ({ ...current, [id]: value }));

  const finish = (lastScore: number) => {
    countdown.stop();
    const final = grade({ ...points, "s-interview": lastScore });
    const overallPercent = SECTION_ORDER.reduce((sum, id) => sum + final.percent[id], 0) / SECTION_ORDER.length;
    saveAttempt({
      module: "test",
      activityId: TEST_ACTIVITY_ID,
      title: "Simulacro tipo TOEFL",
      score: overallPercent,
      bands: final.bands,
    });
    setResult(final);
    setStep(null);
    window.scrollTo({ top: 0 });
  };

  const restart = () => {
    setPoints({});
    setEmailTimeUp(false);
    setResult(null);
    setStep(null);
  };

  if (result) return <TestResults result={result} onRetry={restart} />;

  if (step === null) {
    return (
      <section className="arctic animate-rise mx-auto max-w-3xl rounded-[28px] p-6 sm:p-8" style={{ animationDelay: "80ms" }}>
        <h2 className="text-2xl font-semibold text-navy-900">Antes de empezar</h2>
        <ul className="mt-4 space-y-3 text-[16px] leading-relaxed text-navy-700">
          {[
            "Son cuatro secciones seguidas: Reading, Listening, Writing y Speaking. Reserva unos 35 minutos.",
            "Reading tiene 12 minutos y Listening 10. Si se acaba el tiempo, pasas a la siguiente sección con lo que lleves.",
            "Reading y Listening se adaptan: según cómo vayas en la primera parte, la segunda será estándar o avanzada, y la avanzada puntúa más.",
            "Necesitas altavoz o auriculares y, para Speaking, micrófono.",
            "No puedes volver a una parte anterior.",
          ].map((rule) => (
            <li key={rule} className="flex gap-3">
              <span className="mt-2.5 size-1.5 shrink-0 rounded-full bg-ice-500" aria-hidden />
              {rule}
            </li>
          ))}
        </ul>
        <div className="mt-6">
          <p className="mb-2 text-sm font-semibold text-navy-500">Acento del audio</p>
          <AccentToggle value={accent} onChange={setAccent} />
        </div>
        <button type="button" onClick={() => enter(0)} className={buttonClass("primary", "mt-7 h-12 px-6")}>
          Empezar el simulacro
        </button>
      </section>
    );
  }

  const current = STEPS[step];
  const next = () => enter(step + 1);
  const { advanced } = grade(points);
  const academic = advanced.reading ? academicAdvanced : academicStandard;
  const talk = advanced.listening ? talkAdvanced : talkStandard;
  const urgent = countdown.left !== null && countdown.left <= 60;

  return (
    <div>
      <div className="arctic sticky top-[4.5rem] z-30 mb-6 flex flex-wrap items-center gap-x-4 gap-y-2 rounded-3xl px-4 py-3 sm:px-5">
        <ol className="flex items-center gap-1.5" aria-label="Secciones">
          {SECTION_ORDER.map((section) => {
            const active = section === current.section;
            const done = SECTION_ORDER.indexOf(section) < SECTION_ORDER.indexOf(current.section);
            return (
              <li
                key={section}
                aria-current={active ? "step" : undefined}
                className={`flex h-9 items-center gap-1.5 rounded-full px-2.5 text-sm font-semibold ${
                  active ? "bg-navy-900 text-white" : done ? "bg-ice-100 text-navy-700" : "text-navy-400"
                }`}
              >
                <ModuleIcon module={section} className="size-4" />
                <span className={active ? "" : "hidden sm:inline"}>{modules.find((m) => m.id === section)?.name}</span>
              </li>
            );
          })}
        </ol>
        <p className="text-sm text-navy-500 tabular-nums">
          Parte {step + 1} de {STEPS.length}
        </p>
        {countdown.left !== null && (
          <p
            role="timer"
            className={`ml-auto inline-flex h-9 items-center gap-1.5 rounded-full px-3 text-sm font-bold tabular-nums ${
              urgent ? "bg-bad-soft text-bad" : "bg-ice-100 text-navy-800"
            }`}
          >
            <Clock className="size-4" aria-hidden />
            {formatClock(countdown.left)}
          </p>
        )}
      </div>

      <h2 className="mb-5 text-2xl font-semibold text-navy-900" lang="en">
        {current.task}
        {(current.id === "r-academic" || current.id === "l-talk") && (
          <span className="ml-3 inline-flex h-6 items-center rounded-full bg-ice-100 px-2.5 align-middle font-sans text-xs font-semibold text-navy-700" lang="es">
            {(current.id === "r-academic" ? advanced.reading : advanced.listening) ? "Ruta avanzada" : "Ruta estándar"}
          </span>
        )}
      </h2>

      {/* La key hace que cada parte empiece con su estado limpio. */}
      <div key={current.id} className="animate-rise">
        {current.id === "r-words" && <CompleteWordsStep text={completeWordsText} onScore={score("r-words")} onNext={next} />}
        {current.id === "r-daily" && (
          <ChoiceStep
            name="daily"
            aside={<ReadingAside heading={dailyLife.heading} title={dailyLife.title} paragraphs={dailyLife.paragraphs} />}
            questions={dailyLife.questions}
            onScore={score("r-daily")}
            onNext={next}
          />
        )}
        {current.id === "r-academic" && (
          <ChoiceStep
            name="academic"
            aside={<ReadingAside title={academic.title} paragraphs={academic.paragraphs} />}
            questions={academic.questions}
            onScore={score("r-academic")}
            onNext={next}
          />
        )}
        {current.id === "l-respond" && (
          <ChooseResponseStep items={chooseResponse} accent={accent} onScore={score("l-respond")} onNext={next} />
        )}
        {current.id === "l-conversation" && (
          <ChoiceStep
            name="conversation"
            aside={<AudioAside title={conversation.title} lines={conversation.lines} accent={accent} />}
            questions={conversation.questions}
            onScore={score("l-conversation")}
            onNext={next}
          />
        )}
        {current.id === "l-talk" && (
          <ChoiceStep
            name="talk"
            aside={<AudioAside title={talk.title} lines={talk.lines} accent={accent} />}
            questions={talk.questions}
            onScore={score("l-talk")}
            onNext={next}
          />
        )}
        {current.id === "w-build" && (
          <div className="mx-auto max-w-3xl">
            <BuildSentence
              items={testSentences}
              onFinish={(value) => {
                score("w-build")(value);
                next();
              }}
            />
          </div>
        )}
        {current.id === "w-email" && (
          <EmailExercise
            task={testEmail}
            timeUp={emailTimeUp}
            onFinish={(value) => {
              score("w-email")(value);
              next();
            }}
          />
        )}
        {current.id === "s-repeat" && (
          <div className="mx-auto max-w-3xl">
            <RepeatExercise
              items={testRepeat}
              accent={accent}
              onFinish={(value) => {
                score("s-repeat")(value);
                next();
              }}
            />
          </div>
        )}
        {current.id === "s-interview" && (
          <div className="mx-auto max-w-3xl">
            <InterviewExercise questions={testInterview} accent={accent} onFinish={finish} />
          </div>
        )}
      </div>
    </div>
  );
}

function BandNumber({ value, tone }: { value: number; tone: "deep" | "light" }) {
  return (
    <p className={`font-display leading-none font-semibold tabular-nums ${tone === "deep" ? "text-7xl text-white" : "text-4xl text-navy-900"}`}>
      {value.toFixed(1)}
      <span className={`ml-1.5 font-sans font-semibold ${tone === "deep" ? "text-xl text-ice-200" : "text-sm text-navy-400"}`}>
        / 6
      </span>
    </p>
  );
}

function TestResults({ result, onRetry }: { result: Result; onRetry: () => void }) {
  return (
    <div className="space-y-6">
      <section className="arctic-deep animate-rise rounded-[28px] p-6 sm:p-9" aria-live="polite">
        <p className="text-sm font-semibold tracking-wide text-ice-200 uppercase">Banda global estimada</p>
        <div className="mt-3">
          <BandNumber value={result.bands.overall} tone="deep" />
        </div>
        <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-ice-200">
          Es una estimación para orientarte, no una nota oficial: usa la escala de 1 a 6 del TOEFL iBT, pero la
          conversión es propia, y en Writing y Speaking parte de la nota sale de tu autoevaluación.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <button type="button" onClick={onRetry} className={buttonClass("onDeep")}>
            <RotateCcw className="size-4" aria-hidden />
            Repetir simulacro
          </button>
          <Link
            href="/progreso"
            className="press inline-flex min-h-11 items-center rounded-full bg-white/10 px-5 text-[15px] font-semibold text-white hover:bg-white/18"
          >
            Ver mi progreso
          </Link>
        </div>
      </section>

      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {SECTION_ORDER.map((section, index) => {
          const adaptive = section === "reading" || section === "listening";
          return (
            <li
              key={section}
              className="arctic animate-rise rounded-3xl p-5"
              style={{ animationDelay: `${100 + index * 60}ms` }}
            >
              <div className="flex items-center gap-2.5 text-navy-800">
                <ModuleIcon module={section} className="size-5" />
                <h3 className="text-[17px] font-semibold">{modules.find((m) => m.id === section)?.name}</h3>
              </div>
              <div className="mt-4">
                <BandNumber value={result.bands[section]} tone="light" />
              </div>
              <p className="mt-3 text-sm text-navy-500 tabular-nums">
                {Math.round(result.percent[section])} % de los puntos
                {adaptive && ` · ruta ${result.advanced[section] ? "avanzada" : "estándar"}`}
              </p>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
