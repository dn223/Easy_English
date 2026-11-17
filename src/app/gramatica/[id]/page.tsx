import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LessonView } from "@/components/lesson-view";
import { LevelBadge, PageIntro, Tag } from "@/components/ui";
import { findLesson, grammarCategories, grammarLessons } from "@/content/grammar";

export function generateStaticParams() {
  return grammarLessons.map((lesson) => ({ id: lesson.id }));
}

export async function generateMetadata({ params }: PageProps<"/gramatica/[id]">): Promise<Metadata> {
  const { id } = await params;
  return { title: findLesson(id)?.subtitle ?? "Gramática" };
}

export default async function LessonPage({ params }: PageProps<"/gramatica/[id]">) {
  const { id } = await params;
  const lesson = findLesson(id);
  if (!lesson) notFound();

  const index = grammarLessons.indexOf(lesson);
  const next = grammarLessons[index + 1];
  const category = grammarCategories.find((entry) => entry.id === lesson.category);

  return (
    <>
      <PageIntro
        back={{ href: "/gramatica", label: "Gramática" }}
        eyebrow={
          <>
            <LevelBadge level={lesson.level} />
            {category && <Tag>{category.name}</Tag>}
            <Tag>{lesson.minutes} min</Tag>
          </>
        }
        title={lesson.title}
      >
        {lesson.subtitle}
      </PageIntro>
      <LessonView lesson={lesson} next={next && { id: next.id, title: next.subtitle }} />
    </>
  );
}
