import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { EmailExercise } from "@/components/email-exercise";
import { LevelBadge, PageIntro, Tag } from "@/components/ui";
import { emailTasks } from "@/content/writing";

export function generateStaticParams() {
  return emailTasks.map((task) => ({ id: task.id }));
}

export async function generateMetadata({ params }: PageProps<"/writing/email/[id]">): Promise<Metadata> {
  const { id } = await params;
  return { title: emailTasks.find((task) => task.id === id)?.title ?? "Write an Email" };
}

export default async function EmailExercisePage({ params }: PageProps<"/writing/email/[id]">) {
  const { id } = await params;
  const task = emailTasks.find((entry) => entry.id === id);
  if (!task) notFound();

  return (
    <>
      <PageIntro
        back={{ href: "/writing", label: "Writing" }}
        eyebrow={
          <>
            <LevelBadge level={task.level} />
            <Tag>Write an Email</Tag>
            <Tag>{task.minutes} min</Tag>
          </>
        }
        title={task.title}
      >
        Escribe el correo en inglés cubriendo los tres puntos. Al terminar lo revisas con una pauta.
      </PageIntro>
      <EmailExercise task={task} />
    </>
  );
}
