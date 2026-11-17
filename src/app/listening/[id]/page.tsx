import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ListeningExercise } from "@/components/listening-exercise";
import { LevelBadge, PageIntro, Tag } from "@/components/ui";
import { listeningTracks } from "@/content/listening";

export function generateStaticParams() {
  return listeningTracks.map((track) => ({ id: track.id }));
}

export async function generateMetadata({ params }: PageProps<"/listening/[id]">): Promise<Metadata> {
  const { id } = await params;
  return { title: listeningTracks.find((track) => track.id === id)?.title ?? "Listening" };
}

export default async function ListeningExercisePage({ params }: PageProps<"/listening/[id]">) {
  const { id } = await params;
  const track = listeningTracks.find((entry) => entry.id === id);
  if (!track) notFound();

  return (
    <>
      <PageIntro
        back={{ href: "/listening", label: "Listening" }}
        eyebrow={
          <>
            <LevelBadge level={track.level} />
            <Tag>{track.kind}</Tag>
            <Tag>{track.minutes} min</Tag>
          </>
        }
        title={track.title}
      >
        Escucha sin leer y responde. La transcripción aparece cuando compruebas tus respuestas.
      </PageIntro>
      <ListeningExercise track={track} />
    </>
  );
}
