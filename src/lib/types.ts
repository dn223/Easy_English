export type ModuleId = "listening" | "reading" | "writing" | "speaking";

export type Level = "A2" | "B1" | "B2" | "C1";

export type Question = {
  id: string;
  prompt: string;
  options: string[];
  answer: number;
  explanation: string;
};

export type ReadingPassage = {
  id: string;
  title: string;
  level: Level;
  minutes: number;
  summary: string;
  paragraphs: string[];
  questions: Question[];
};

export type ListeningLine = { speaker: string; text: string };

export type ListeningTrack = {
  id: string;
  title: string;
  level: Level;
  minutes: number;
  summary: string;
  kind: "Conversación" | "Anuncio" | "Charla académica";
  lines: ListeningLine[];
  questions: Question[];
};

export type SentenceItem = {
  id: string;
  context: string;
  words: string[];
  note?: string;
};

export type EmailTask = {
  id: string;
  title: string;
  level: Level;
  minutes: number;
  summary: string;
  scenario: string;
  recipient: string;
  points: string[];
  minWords: number;
  model: string;
};

export type DiscussionPost = { name: string; text: string };

/** Tarea "Write for an Academic Discussion": pregunta del profesor, dos respuestas de compañeros y la tuya. */
export type DiscussionTask = {
  id: string;
  title: string;
  level: Level;
  minutes: number;
  summary: string;
  course: string;
  professor: DiscussionPost;
  posts: DiscussionPost[];
  minWords: number;
  model: string;
};

export type RepeatItem = { id: string; text: string };

export type InterviewQuestion = { id: string; text: string; tip: string };

/** Banda estimada de 1 a 6 en pasos de 0.5, como la escala del TOEFL iBT desde 2026. */
export type Bands = Record<ModuleId, number> & { overall: number };

export type Attempt = {
  id: string;
  module: ModuleId | "test";
  activityId: string;
  title: string;
  score: number;
  at: string;
  /** Solo en simulacros. */
  bands?: Bands;
};
