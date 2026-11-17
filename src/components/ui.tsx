import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import type { ReactNode } from "react";

type ButtonVariant = "primary" | "soft" | "ghost" | "onDeep";

const BUTTON_VARIANTS: Record<ButtonVariant, string> = {
  primary:
    "bg-navy-900 text-white shadow-[0_1px_0_rgb(255_255_255/0.18)_inset,0_10px_20px_-10px_rgb(10_31_60/0.6)] hover:bg-navy-800",
  soft: "bg-ice-100 text-navy-900 shadow-[0_0_0_1px_var(--edge-accent)] hover:bg-ice-200",
  ghost: "text-navy-700 hover:bg-ice-100",
  onDeep: "bg-white text-navy-900 hover:bg-ice-100",
};

export function buttonClass(variant: ButtonVariant = "primary", extra = ""): string {
  return `press inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-5 text-[15px] font-semibold disabled:cursor-not-allowed disabled:opacity-45 ${BUTTON_VARIANTS[variant]} ${extra}`;
}

export function LevelBadge({ level }: { level: string }) {
  return (
    <span className="inline-flex h-6 items-center rounded-full bg-navy-900 px-2.5 text-xs font-semibold tracking-wide text-white">
      {level}
    </span>
  );
}

export function Tag({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex h-6 items-center rounded-full bg-ice-100 px-2.5 text-xs font-semibold text-navy-700">
      {children}
    </span>
  );
}

export function BackLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link
      href={href}
      className="press -ml-3 inline-flex min-h-11 items-center gap-1.5 rounded-full px-3 text-sm font-semibold text-navy-600 hover:bg-ice-100 hover:text-navy-900"
    >
      <ArrowLeft className="size-4" aria-hidden />
      {children}
    </Link>
  );
}

type PageIntroProps = {
  back: { href: string; label: string };
  eyebrow?: ReactNode;
  title: string;
  children?: ReactNode;
};

export function PageIntro({ back, eyebrow, title, children }: PageIntroProps) {
  return (
    <header className="animate-rise pt-4 pb-8 sm:pt-6">
      <BackLink href={back.href}>{back.label}</BackLink>
      {eyebrow && <div className="mt-5 flex flex-wrap items-center gap-2">{eyebrow}</div>}
      <h1 className="mt-3 text-3xl font-semibold text-navy-900 sm:text-4xl">{title}</h1>
      {children && <p className="mt-3 max-w-2xl text-[17px] leading-relaxed text-navy-500">{children}</p>}
    </header>
  );
}
