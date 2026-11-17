import Link from "next/link";
import { ArrowDown } from "lucide-react";
import { HomeScore } from "@/components/home-score";
import { ModuleGrid } from "@/components/module-grid";
import { buttonClass } from "@/components/ui";

export default function HomePage() {
  return (
    <>
      <section className="relative grid items-center gap-10 pt-10 pb-16 sm:pt-16 lg:grid-cols-[1.15fr_0.85fr] lg:gap-14 lg:pb-24">
        <div className="pointer-events-none absolute inset-x-0 -top-24 -z-10 h-[34rem] overflow-hidden" aria-hidden>
          <div className="animate-drift absolute top-10 left-[-8%] size-[26rem] rounded-full bg-[radial-gradient(closest-side,rgb(143_211_244/0.55),transparent)]" />
          <div
            className="animate-drift absolute top-28 right-[-6%] size-[22rem] rounded-full bg-[radial-gradient(closest-side,rgb(192_227_246/0.8),transparent)]"
            style={{ animationDelay: "-9s", animationDuration: "28s" }}
          />
        </div>

        <div>
          <p className="animate-rise inline-flex h-8 items-center rounded-full bg-white px-3.5 text-sm font-semibold text-navy-700 shadow-[0_0_0_1px_rgb(10_31_60/0.07)]">
            Listening · Reading · Writing · Speaking
          </p>
          <h1
            className="animate-rise mt-5 text-[2.6rem] leading-[1.05] font-semibold text-navy-900 sm:text-6xl"
            style={{ animationDelay: "70ms" }}
          >
            Tu inglés, cada día un poco más <span className="text-ice-500">claro</span>.
          </h1>
          <p
            className="animate-rise mt-5 max-w-xl text-lg leading-relaxed text-navy-500"
            style={{ animationDelay: "140ms" }}
          >
            Practica las cuatro habilidades con ejercicios que se corrigen al momento, en inglés británico o
            estadounidense, y mira cómo sube tu puntuación.
          </p>
          <div className="animate-rise mt-8 flex flex-wrap gap-3" style={{ animationDelay: "210ms" }}>
            <Link href="#modulos" className={buttonClass("primary", "h-12 px-6")}>
              Empezar a estudiar
              <ArrowDown className="size-4" aria-hidden />
            </Link>
            <Link href="/progreso" className={buttonClass("soft", "h-12 px-6")}>
              Ver mi progreso
            </Link>
          </div>
        </div>

        <div className="animate-rise" style={{ animationDelay: "200ms" }}>
          <HomeScore />
        </div>
      </section>

      <section id="modulos" className="scroll-mt-24">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-2">
          <h2 className="text-3xl font-semibold text-navy-900">Elige qué estudiar</h2>
          <p className="text-[15px] text-navy-500">Cada habilidad guarda su propia nota.</p>
        </div>
        <ModuleGrid />
      </section>
    </>
  );
}
