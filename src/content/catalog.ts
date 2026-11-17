import type { Level, ModuleId } from "@/lib/types";
import { listeningTracks } from "./listening";
import { readingPassages } from "./reading";
import { INTERVIEW_ACTIVITY_ID, REPEAT_ACTIVITY_ID } from "./speaking";
import { BUILD_ACTIVITY_ID, emailTasks } from "./writing";

export type Activity = {
  id: string;
  module: ModuleId;
  title: string;
  summary: string;
  tag: string;
  level: Level | "A2–B2";
  minutes: number;
  href: string;
};

export type ModuleInfo = {
  id: ModuleId;
  name: string;
  tagline: string;
  intro: string;
  href: string;
};

export const modules: ModuleInfo[] = [
  {
    id: "listening",
    name: "Listening",
    tagline: "Escucha y comprende",
    intro: "Conversaciones, anuncios y charlas con acento estadounidense o británico. Escucha, responde y revisa la transcripción al final.",
    href: "/listening",
  },
  {
    id: "reading",
    name: "Reading",
    tagline: "Lee con atención",
    intro: "Textos por nivel con preguntas de idea principal, detalle, vocabulario e inferencia. Cada respuesta viene explicada.",
    href: "/reading",
  },
  {
    id: "writing",
    name: "Writing",
    tagline: "Escribe con claridad",
    intro: "Ordena oraciones para fijar la estructura y redacta correos con una pauta de evaluación y una respuesta modelo.",
    href: "/writing",
  },
  {
    id: "speaking",
    name: "Speaking",
    tagline: "Habla en voz alta",
    intro: "Repite frases con corrección automática y responde una entrevista grabando tu voz.",
    href: "/speaking",
  },
];

export const activities: Activity[] = [
  ...listeningTracks.map((track) => ({
    id: `listening-${track.id}`,
    module: "listening" as const,
    title: track.title,
    summary: track.summary,
    tag: track.kind,
    level: track.level,
    minutes: track.minutes,
    href: `/listening/${track.id}`,
  })),
  ...readingPassages.map((passage) => ({
    id: `reading-${passage.id}`,
    module: "reading" as const,
    title: passage.title,
    summary: passage.summary,
    tag: "Lectura",
    level: passage.level,
    minutes: passage.minutes,
    href: `/reading/${passage.id}`,
  })),
  {
    id: BUILD_ACTIVITY_ID,
    module: "writing",
    title: "Build a Sentence",
    summary: "Ordena las palabras para responder a cada pregunta.",
    tag: "Corrección automática",
    level: "A2–B2",
    minutes: 6,
    href: "/writing/build",
  },
  ...emailTasks.map((task) => ({
    id: `writing-${task.id}`,
    module: "writing" as const,
    title: task.title,
    summary: task.summary,
    tag: "Write an Email",
    level: task.level,
    minutes: task.minutes,
    href: `/writing/email/${task.id}`,
  })),
  {
    id: REPEAT_ACTIVITY_ID,
    module: "speaking",
    title: "Listen and Repeat",
    summary: "Escucha cada frase y repítela tal cual.",
    tag: "Corrección automática",
    level: "A2–B2",
    minutes: 5,
    href: "/speaking/repeat",
  },
  {
    id: INTERVIEW_ACTIVITY_ID,
    module: "speaking",
    title: "Take an Interview",
    summary: "Cuatro preguntas abiertas, 45 segundos cada una.",
    tag: "Con rúbrica",
    level: "B1",
    minutes: 6,
    href: "/speaking/interview",
  },
];

export function activitiesOf(module: ModuleId): Activity[] {
  return activities.filter((activity) => activity.module === module);
}

export function moduleInfo(id: ModuleId): ModuleInfo {
  return modules.find((entry) => entry.id === id)!;
}
