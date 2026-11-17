import Link from "next/link";
import { RotateCcw } from "lucide-react";
import type { ReactNode } from "react";
import { ScoreRing } from "./score-ring";
import { buttonClass } from "./ui";

function verdict(score: number): string {
  if (score >= 90) return "Excelente trabajo";
  if (score >= 70) return "Muy bien";
  if (score >= 50) return "Vas por buen camino";
  return "Toca repasar y volver a intentarlo";
}

type ResultPanelProps = {
  score: number;
  detail: ReactNode;
  onRetry: () => void;
  back: { href: string; label: string };
};

export function ResultPanel({ score, detail, onRetry, back }: ResultPanelProps) {
  return (
    <section
      className="arctic-deep animate-rise flex flex-col items-start gap-6 rounded-[28px] p-6 sm:flex-row sm:items-center sm:p-8"
      aria-live="polite"
    >
      <ScoreRing value={score} tone="deep" caption="Nota" />
      <div className="flex-1">
        <h2 className="text-2xl font-semibold">{verdict(score)}</h2>
        <p className="mt-2 text-[15px] leading-relaxed text-ice-200">{detail}</p>
        <div className="mt-5 flex flex-wrap gap-3">
          <button type="button" onClick={onRetry} className={buttonClass("onDeep")}>
            <RotateCcw className="size-4" aria-hidden />
            Reintentar
          </button>
          <Link
            href={back.href}
            className="press inline-flex min-h-11 items-center rounded-full bg-white/10 px-5 text-[15px] font-semibold text-white hover:bg-white/18"
          >
            {back.label}
          </Link>
        </div>
      </div>
    </section>
  );
}
