import type { Metadata } from "next";
import { ModulePage } from "@/components/module-page";

export const metadata: Metadata = { title: "Reading" };

export default function ReadingPage() {
  return <ModulePage module="reading" />;
}
