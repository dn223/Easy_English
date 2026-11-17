import type { GrammarCategory, GrammarLesson } from "./types";
import { structureLessons } from "./structures";
import { tenseLessons } from "./tenses";
import { variantLessons } from "./variants";
import { wordLessons } from "./words";

export type { Example, GrammarCategory, GrammarLesson, GrammarRule } from "./types";

export const grammarLessons: GrammarLesson[] = [...tenseLessons, ...structureLessons, ...wordLessons, ...variantLessons];

export const grammarCategories: { id: GrammarCategory; name: string; description: string }[] = [
  { id: "tiempos", name: "Tiempos verbales", description: "Presente, pasado, perfecto y futuro: cuándo usar cada uno." },
  { id: "estructuras", name: "Estructuras", description: "Condicionales, modales, pasiva, estilo indirecto y más." },
  { id: "palabras", name: "Palabras clave", description: "Artículos, preposiciones, cantidades y comparaciones." },
  { id: "variantes", name: "Británico y americano", description: "Qué cambia entre las dos variedades y cómo no mezclarlas." },
];

export function findLesson(id: string): GrammarLesson | undefined {
  return grammarLessons.find((lesson) => lesson.id === id);
}

/** Obras de referencia para profundizar. Las de pago sirven de guía; las abiertas se pueden leer gratis. */
export const grammarSources = {
  reference: [
    { title: "Practical English Usage", author: "Michael Swan", note: "La referencia de dudas más recomendada en foros de profesores. Enfoque británico." },
    { title: "English Grammar in Use", author: "Raymond Murphy", note: "Explicación y ejercicios por unidades. Británico; tiene edición americana (Grammar in Use, con William R. Smalzer)." },
    { title: "Understanding and Using English Grammar", author: "Betty Azar", note: "Curso completo con enfoque estadounidense." },
    { title: "The Cambridge Grammar of the English Language", author: "Rodney Huddleston y Geoffrey K. Pullum", note: "La gramática académica más completa. Cubre británico, americano y australiano." },
    { title: "British or American English?", author: "John Algeo", note: "Estudio específico de las diferencias entre las dos variedades." },
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
    {
      title: "The King's English (H. W. y F. G. Fowler)",
      note: "Clásico de uso británico, de dominio público en Project Gutenberg. Útil para profundizar, aunque con uso antiguo.",
      url: "https://www.gutenberg.org/ebooks/75439",
    },
  ],
};
