import type { Metadata } from "next";
import { ModulePage } from "@/components/module-page";

export const metadata: Metadata = { title: "Writing" };

export default function WritingPage() {
  return <ModulePage module="writing" />;
}
