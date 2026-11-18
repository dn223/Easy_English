import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DiscussionExercise } from "@/components/discussion-exercise";
import { LevelBadge, PageIntro, Tag } from "@/components/ui";
import { discussionTasks } from "@/content/writing";

export function generateStaticParams() {
  return discussionTasks.map((task) => ({ id: task.id }));
}

export async function generateMetadata({ params }: PageProps<"/writing/discussion/[id]">): Promise<Metadata> {
  const { id } = await params;
  return { title: discussionTasks.find((task) => task.id === id)?.title ?? "Academic Discussion" };
}

export default async function DiscussionPage({ params }: PageProps<"/writing/discussion/[id]">) {
  const { id } = await params;
  const task = discussionTasks.find((entry) => entry.id === id);
  if (!task) notFound();

  return (
    <>
      <PageIntro
        back={{ href: "/writing", label: "Writing" }}
        eyebrow={
          <>
            <LevelBadge level={task.level} />
            <Tag>Academic Discussion</Tag>
            <Tag>{task.minutes} min</Tag>
          </>
        }
        title={task.title}
      >
        Lee la pregunta del profesor y las respuestas de dos compañeros. Después escribe tu aportación al foro.
      </PageIntro>
      <DiscussionExercise task={task} />
    </>
  );
}
