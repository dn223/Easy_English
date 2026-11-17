type ScoreRingProps = {
  value: number | null;
  size?: number;
  stroke?: number;
  tone?: "light" | "deep";
  caption?: string;
};

export function ScoreRing({ value, size = 132, stroke = 11, tone = "light", caption }: ScoreRingProps) {
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * (1 - (value ?? 0) / 100);
  const deep = tone === "deep";

  return (
    <div
      className="relative shrink-0"
      style={{ width: size, height: size }}
      role="img"
      aria-label={value === null ? "Sin puntuación todavía" : `${value} de 100`}
    >
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="-rotate-90" aria-hidden>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          strokeWidth={stroke}
          className={deep ? "stroke-white/15" : "stroke-ice-100"}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className={`transition-[stroke-dashoffset] duration-1000 ease-out-quart ${deep ? "stroke-ice-300" : "stroke-ice-500"}`}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center" aria-hidden>
        <span
          className={`font-display font-semibold tabular-nums ${deep ? "text-white" : "text-navy-900"}`}
          style={{ fontSize: size * 0.3, lineHeight: 1 }}
        >
          {value ?? "–"}
        </span>
        {caption && (
          <span className={`mt-1 text-[11px] font-semibold tracking-wide uppercase ${deep ? "text-ice-200" : "text-navy-400"}`}>
            {caption}
          </span>
        )}
      </div>
    </div>
  );
}
