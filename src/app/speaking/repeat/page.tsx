import type { Metadata } from "next";
import { RepeatExercise } from "@/components/repeat-exercise";
import { LevelBadge, PageIntro, Tag } from "@/components/ui";

export const metadata: Metadata = { title: "Listen and Repeat" };

export default function RepeatPage() {
  return (
    <div className="mx-auto max-w-3xl">
      <PageIntro
        back={{ href: "/speaking", label: "Speaking" }}
        eyebrow={
          <>
            <LevelBadge level="A2–C1" />
            <Tag>Corrección automática</Tag>
          </>
        }
        title="Listen and Repeat"
      >
        Escucha cada frase y repítela tal cual. El navegador transcribe lo que dices y lo compara palabra por palabra.
      </PageIntro>
      <RepeatExercise />
    </div>
  );
}
