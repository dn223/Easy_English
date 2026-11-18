import type { Level, Question } from "@/lib/types";

export type Example = { en: string; es?: string };

export type GrammarRule = {
  title: string;
  /** Explicación en español. `*texto*` se resalta. */
  text: string;
  /** Estructura de la regla, por ejemplo "sujeto + have/has + participio". */
  form?: string;
  examples: Example[];
  table?: { head: string[]; rows: string[][] };
};

export type GrammarCategory = "tiempos" | "estructuras" | "palabras";

export type GrammarLesson = {
  id: string;
  /** Nombre del tema en inglés, como aparece en los libros. */
  title: string;
  subtitle: string;
  level: Level;
  category: GrammarCategory;
  minutes: number;
  summary: string;
  intro: string;
  rules: GrammarRule[];
  mistakes: { wrong: string; right: string; why: string }[];
  practice: Question[];
};
