import type { Metadata } from "next";
import { TestRunner } from "@/components/test-runner";
import { ModuleIcon } from "@/components/module-icon";
import { PageIntro } from "@/components/ui";

export const metadata: Metadata = { title: "Simulacro tipo TOEFL" };

export default function TestPage() {
  return (
    <>
      <PageIntro
        back={{ href: "/#modulos", label: "Todas las habilidades" }}
        eyebrow={
          <span className="flex size-11 items-center justify-center rounded-2xl bg-navy-900 text-ice-300">
            <ModuleIcon module="test" className="size-5" />
          </span>
        }
        title="Simulacro tipo TOEFL"
      >
        Un examen completo con las cuatro habilidades, tiempo real y una banda estimada de 1 a 6. Sigue los tipos de
        tarea del TOEFL iBT de 2026 con contenido propio.
      </PageIntro>
      <TestRunner />
    </>
  );
}
