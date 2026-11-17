import { BookOpen, Headphones, Mic, PenLine, type LucideIcon } from "lucide-react";
import type { ModuleId } from "@/lib/types";

const ICONS: Record<ModuleId, LucideIcon> = {
  listening: Headphones,
  reading: BookOpen,
  writing: PenLine,
  speaking: Mic,
};

export function ModuleIcon({ module, className }: { module: ModuleId; className?: string }) {
  const Icon = ICONS[module];
  return <Icon className={className} aria-hidden />;
}
