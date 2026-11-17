"use client";

import Link from "next/link";
import { Snowflake } from "lucide-react";
import { summarize, useAttempts } from "@/lib/scores";

export function SiteHeader() {
  const { global } = summarize(useAttempts());

  return (
    <header className="sticky top-0 z-40 px-4 pt-3 sm:px-6">
      <div className="arctic mx-auto flex h-14 max-w-6xl items-center justify-between rounded-full pr-2 pl-2.5">
        <Link href="/" className="press flex min-h-11 items-center gap-2.5 rounded-full pr-3">
          <span className="flex size-9 items-center justify-center rounded-full bg-navy-900 text-ice-300">
            <Snowflake className="size-5" aria-hidden />
          </span>
          <span className="font-display text-[17px] font-semibold tracking-tight text-navy-900">Easy English</span>
        </Link>
        <nav className="flex items-center gap-1" aria-label="Principal">
          <Link
            href="/#modulos"
            className="press hidden min-h-11 items-center rounded-full px-4 text-sm font-semibold text-navy-600 hover:bg-ice-100 hover:text-navy-900 sm:inline-flex"
          >
            Estudiar
          </Link>
          <Link
            href="/progreso"
            className="press inline-flex min-h-11 items-center gap-2 rounded-full px-4 text-sm font-semibold text-navy-600 hover:bg-ice-100 hover:text-navy-900"
          >
            Mi progreso
            <span className="inline-flex h-6 min-w-9 items-center justify-center rounded-full bg-ice-100 px-2 text-xs font-bold text-navy-800 tabular-nums">
              {global ?? "–"}
            </span>
          </Link>
        </nav>
      </div>
    </header>
  );
}
