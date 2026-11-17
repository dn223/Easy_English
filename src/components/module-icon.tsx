import { BookOpen, Headphones, MessagesSquare, Mic, PenLine, Target, type LucideIcon } from "lucide-react";
import type { ModuleId } from "@/lib/types";

export type IconName = ModuleId | "test" | "tutor";

const ICONS: Record<IconName, LucideIcon> = {
  listening: Headphones,
  reading: BookOpen,
  writing: PenLine,
  speaking: Mic,
  test: Target,
  tutor: MessagesSquare,
};

export function ModuleIcon({ module, className }: { module: IconName; className?: string }) {
  const Icon = ICONS[module];
  return <Icon className={className} aria-hidden />;
}
