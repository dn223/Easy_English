"use client";

import { Moon, Sun } from "lucide-react";
import { useLayoutEffect } from "react";
import { THEME_KEY } from "@/lib/theme";

function currentTheme(): "dark" | "light" {
  const chosen = document.documentElement.getAttribute("data-theme");
  if (chosen === "dark" || chosen === "light") return chosen;
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

export function ThemeToggle() {
  // En desarrollo React reinicia los atributos de <html> al remontar; esto vuelve a aplicar el tema guardado.
  useLayoutEffect(() => {
    try {
      const saved = localStorage.getItem(THEME_KEY);
      if (saved === "dark" || saved === "light") document.documentElement.setAttribute("data-theme", saved);
    } catch {
      // Sin almacenamiento se sigue el tema del sistema.
    }
  }, []);

  const toggle = () => {
    const next = currentTheme() === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    try {
      localStorage.setItem(THEME_KEY, next);
    } catch {
      // El cambio dura lo que dure la pestaña.
    }
  };

  // Los dos iconos se pintan siempre y el CSS muestra el correcto: así el servidor y el navegador coinciden.
  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Cambiar entre modo claro y oscuro"
      title="Modo claro / oscuro"
      className="press flex size-11 shrink-0 items-center justify-center rounded-full text-navy-600 hover:bg-ice-100 hover:text-navy-900"
    >
      <Moon className="size-5 dark:hidden" aria-hidden />
      <Sun className="hidden size-5 dark:block" aria-hidden />
    </button>
  );
}
