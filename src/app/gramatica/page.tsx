import type { Metadata } from "next";
import { BookMarked } from "lucide-react";
import { GrammarIndex } from "@/components/grammar-index";
import { PageIntro } from "@/components/ui";

export const metadata: Metadata = { title: "Gramática" };

export default function GrammarPage() {
  return (
    <>
      <PageIntro
        back={{ href: "/", label: "Inicio" }}
        eyebrow={
          <span className="flex size-11 items-center justify-center rounded-2xl bg-navy-900 text-ice-300">
            <BookMarked className="size-5" aria-hidden />
          </span>
        }
        title="Gramática y reglas"
      >
        Modo estudio: lecciones para aprender las reglas a tu ritmo, con ejemplos que puedes escuchar, diferencias
        entre el inglés británico y el estadounidense, y los errores más típicos al hablar español. Aquí no hay notas.
      </PageIntro>
      <GrammarIndex />
    </>
  );
}
