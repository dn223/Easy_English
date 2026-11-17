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

export type RepeatItem = { id: string; text: string };

export type InterviewQuestion = { id: string; text: string; tip: string };

export type Attempt = {
  id: string;
  module: ModuleId;
  activityId: string;
  title: string;
  score: number;
  at: string;
};
