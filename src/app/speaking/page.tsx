import type { Metadata } from "next";
import { ModulePage } from "@/components/module-page";

export const metadata: Metadata = { title: "Speaking" };

export default function SpeakingPage() {
  return <ModulePage module="speaking" />;
}
