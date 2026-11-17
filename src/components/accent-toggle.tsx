"use client";

import type { Accent } from "@/lib/speech";

const ACCENTS: { value: Accent; label: string }[] = [
  { value: "en-US", label: "Estadounidense" },
  { value: "en-GB", label: "Británico" },
];

type AccentToggleProps = {
  value: Accent;
  onChange: (accent: Accent) => void;
  tone?: "light" | "deep";
};

export function AccentToggle({ value, onChange, tone = "light" }: AccentToggleProps) {
  const deep = tone === "deep";
  return (
    <div
      role="radiogroup"
      aria-label="Acento"
      className={`inline-flex rounded-full p-1 ${deep ? "bg-white/10" : "bg-ice-100"}`}
    >
      {ACCENTS.map((accent) => {
        const active = accent.value === value;
        return (
          <button
            key={accent.value}
            type="button"
            role="radio"
            aria-checked={active}
            onClick={() => onChange(accent.value)}
            className={`press min-h-9 rounded-full px-3.5 text-sm font-semibold ${
              active
                ? deep
                  ? "bg-white text-navy-900"
                  : "bg-navy-900 text-white"
                : deep
                  ? "text-ice-100 hover:bg-white/10"
                  : "text-navy-600 hover:text-navy-900"
            }`}
          >
            {accent.label}
          </button>
        );
      })}
    </div>
  );
}
