import type { Metadata, Viewport } from "next";
import "@fontsource-variable/sora";
import "@fontsource-variable/plus-jakarta-sans";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";

export const metadata: Metadata = {
  title: {
    default: "Easy English · Estudia inglés por habilidades",
    template: "%s · Easy English",
  },
  description:
    "Practica listening, reading, writing y speaking en inglés con ejercicios corregidos y sigue tu puntuación global y por habilidad.",
  applicationName: "Easy English",
  appleWebApp: { capable: true, title: "Easy English", statusBarStyle: "default" },
};

export const viewport: Viewport = {
  themeColor: "#f6fafd",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es" className="h-full">
      <body className="flex min-h-full flex-col">
        <SiteHeader />
        <main className="mx-auto w-full max-w-6xl flex-1 px-4 pb-20 sm:px-6">{children}</main>
        <footer className="mx-auto w-full max-w-6xl px-4 pb-8 text-sm text-navy-400 sm:px-6">
          Easy English · Contenido original. Tu progreso se guarda solo en este navegador.
        </footer>
      </body>
    </html>
  );
}
