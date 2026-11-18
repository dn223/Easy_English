import { activities } from "@/content/catalog";
import { grammarLessons } from "@/content/grammar";

/** Lista de páginas que el service worker guarda para usar la app sin conexión. */
export function GET() {
  const pages = [
    "/",
    "/gramatica",
    "/reading",
    "/listening",
    "/writing",
    "/speaking",
    "/simulacro",
    "/tutor",
    "/progreso",
    ...grammarLessons.map((lesson) => `/gramatica/${lesson.id}`),
    ...activities.map((activity) => activity.href),
  ];
  return Response.json({ pages: [...new Set(pages)] });
}
