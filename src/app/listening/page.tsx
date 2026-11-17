import type { Metadata } from "next";
import { ModulePage } from "@/components/module-page";

export const metadata: Metadata = { title: "Listening" };

export default function ListeningPage() {
  return <ModulePage module="listening" />;
}
