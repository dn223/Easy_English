import type { Metadata } from "next";
import { InterviewExercise } from "@/components/interview-exercise";
import { LevelBadge, PageIntro, Tag } from "@/components/ui";

export const metadata: Metadata = { title: "Take an Interview" };

export default function InterviewPage() {
  return (
    <div className="mx-auto max-w-3xl">
      <PageIntro
        back={{ href: "/speaking", label: "Speaking" }}
        eyebrow={
          <>
            <LevelBadge level="B1–C1" />
            <Tag>Con rúbrica</Tag>
          </>
        }
        title="Take an Interview"
      >
        Seis preguntas abiertas. Tienes 45 segundos para responder cada una; después te escuchas y te calificas con
        la rúbrica.
      </PageIntro>
      <InterviewExercise />
    </div>
  );
}
