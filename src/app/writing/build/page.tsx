import type { Metadata } from "next";
import { BuildSentence } from "@/components/build-sentence";
import { LevelBadge, PageIntro, Tag } from "@/components/ui";

export const metadata: Metadata = { title: "Build a Sentence" };

export default function BuildSentencePage() {
  return (
    <div className="mx-auto max-w-3xl">
      <PageIntro
        back={{ href: "/writing", label: "Writing" }}
        eyebrow={
          <>
            <LevelBadge level="A2–C1" />
            <Tag>Corrección automática</Tag>
          </>
        }
        title="Build a Sentence"
      >
        Alguien te hace una pregunta. Ordena las palabras para formar la respuesta correcta.
      </PageIntro>
      <BuildSentence />
    </div>
  );
}
