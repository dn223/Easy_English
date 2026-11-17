import type { Metadata } from "next";
import { ProgressView } from "@/components/progress-view";
import { PageIntro } from "@/components/ui";

export const metadata: Metadata = { title: "Mi progreso" };

export default function ProgressPage() {
  return (
    <>
      <PageIntro back={{ href: "/", label: "Inicio" }} title="Mi progreso">
        Tu nota global y la de cada habilidad. La nota de una habilidad es la media de tu mejor intento en cada
        actividad.
      </PageIntro>
      <ProgressView />
    </>
  );
}
