import type { GrammarCategory, GrammarLesson } from "./types";
import { structureLessons } from "./structures";
import { advancedStructureLessons } from "./structures-advanced";
import { advancedTenseLessons } from "./tenses-advanced";
import { advancedWordLessons } from "./words-advanced";
import { tenseLessons } from "./tenses";
import { wordLessons } from "./words";

export type { Example, GrammarCategory, GrammarLesson, GrammarRule } from "./types";

const LEVEL_ORDER = ["A2", "B1", "B2", "C1"];
const CATEGORY_ORDER: GrammarCategory[] = ["tiempos", "estructuras", "palabras"];

/** Ordenadas por categoría y, dentro de cada una, de menor a mayor nivel. */
export const grammarLessons: GrammarLesson[] = [
  ...tenseLessons,
  ...advancedTenseLessons,
  ...structureLessons,
  ...advancedStructureLessons,
  ...wordLessons,
  ...advancedWordLessons,
].sort(
  (a, b) =>
    CATEGORY_ORDER.indexOf(a.category) - CATEGORY_ORDER.indexOf(b.category) ||
    LEVEL_ORDER.indexOf(a.level) - LEVEL_ORDER.indexOf(b.level),
);

export const grammarCategories: { id: GrammarCategory; name: string; description: string }[] = [
  { id: "tiempos", name: "Tiempos verbales", description: "Presente, pasado, perfecto y futuro: cuándo usar cada uno." },
  { id: "estructuras", name: "Estructuras", description: "Condicionales, modales, pasiva, estilo indirecto y más." },
  { id: "palabras", name: "Palabras clave", description: "Artículos, preposiciones, cantidades y comparaciones." },
];

export function findLesson(id: string): GrammarLesson | undefined {
  return grammarLessons.find((lesson) => lesson.id === id);
}

/** Obras de referencia para profundizar. Las de pago sirven de guía; las abiertas se pueden leer gratis. */
export const grammarSources = {
  reference: [
    { title: "Practical English Usage", author: "Michael Swan", note: "La referencia de dudas más recomendada en foros de profesores. Enfoque británico." },
    { title: "English Grammar in Use", author: "Raymond Murphy", note: "Explicación y ejercicios por unidades. Tiene edición en inglés americano: Grammar in Use, con William R. Smalzer." },
    { title: "Understanding and Using English Grammar", author: "Betty Azar", note: "Curso completo con enfoque estadounidense." },
    { title: "The Cambridge Grammar of the English Language", author: "Rodney Huddleston y Geoffrey K. Pullum", note: "La gramática académica más completa. Cubre británico, americano y australiano." },
  ],
  open: [
    {
      title: "Advanced Academic Grammar for ESL Students",
      note: "Libro abierto (CC BY) de BCcampus, nivel avanzado.",
      url: "https://opentextbc.ca/oerdiscipline/chapter/english-as-a-second-language/",
    },
    {
      title: "Explorations 1: Grammar for the Experienced Beginner",
      note: "Libro abierto (CC BY-NC-SA) de Open Oregon, nivel inicial.",
      url: "https://openoregon.pressbooks.pub/explorations1/",
    },
  ],
};
