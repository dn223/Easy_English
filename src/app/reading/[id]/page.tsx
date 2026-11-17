import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Quiz } from "@/components/quiz";
import { LevelBadge, PageIntro, Tag } from "@/components/ui";
import { readingPassages } from "@/content/reading";

export function generateStaticParams() {
  return readingPassages.map((passage) => ({ id: passage.id }));
}

export async function generateMetadata({ params }: PageProps<"/reading/[id]">): Promise<Metadata> {
  const { id } = await params;
  return { title: readingPassages.find((passage) => passage.id === id)?.title ?? "Reading" };
}

export default async function ReadingExercisePage({ params }: PageProps<"/reading/[id]">) {
  const { id } = await params;
  const passage = readingPassages.find((entry) => entry.id === id);
  if (!passage) notFound();

  return (
    <>
      <PageIntro
        back={{ href: "/reading", label: "Reading" }}
        eyebrow={
          <>
            <LevelBadge level={passage.level} />
            <Tag>{passage.minutes} min</Tag>
          </>
        }
        title={passage.title}
      >
        Lee el texto con calma y responde. Puedes volver a él las veces que quieras.
      </PageIntro>

      <div className="grid items-start gap-6 lg:grid-cols-2">
        <article
          lang="en"
          className="arctic animate-rise rounded-3xl p-6 sm:p-8 lg:sticky lg:top-24 lg:max-h-[calc(100dvh-7.5rem)] lg:overflow-y-auto"
          style={{ animationDelay: "80ms" }}
        >
          <div className="space-y-4 text-[17px] leading-[1.75] text-navy-800">
            {passage.paragraphs.map((paragraph, index) => (
              <p key={index}>
                <span className="mr-2 text-sm font-semibold text-navy-400 tabular-nums select-none">{index + 1}</span>
                {paragraph}
              </p>
            ))}
          </div>
        </article>

        <div className="animate-rise" style={{ animationDelay: "160ms" }}>
          <Quiz
            module="reading"
            activityId={`reading-${passage.id}`}
            title={passage.title}
            questions={passage.questions}
            back={{ href: "/reading", label: "Más lecturas" }}
          />
        </div>
      </div>
    </>
  );
}
