import type { Metadata } from "next";
import { ModuleIcon } from "@/components/module-icon";
import { TutorChat } from "@/components/tutor-chat";
import { PageIntro } from "@/components/ui";
import { TUTOR_NAME } from "@/content/tutor";

export const metadata: Metadata = { title: "Tutora de conversación" };

export default function TutorPage() {
  return (
    <>
      <div className="mx-auto max-w-3xl">
        <PageIntro
          back={{ href: "/#modulos", label: "Todas las habilidades" }}
          eyebrow={
            <span className="flex size-11 items-center justify-center rounded-2xl bg-navy-900 text-ice-300">
              <ModuleIcon module="tutor" className="size-5" />
            </span>
          }
          title="Tutora de conversación"
        >
          Habla en inglés con {TUTOR_NAME}. Te responde en voz alta, sigue la situación que elijas y te corrige con
          tacto después de cada frase.
        </PageIntro>
      </div>
      <TutorChat />
    </>
  );
}
