import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Easy English",
    short_name: "Easy English",
    description: "Estudia inglés por habilidades: listening, reading, writing, speaking y simulacro tipo TOEFL.",
    lang: "es",
    start_url: "/",
    display: "standalone",
    background_color: "#f6fafd",
    theme_color: "#0a1f3c",
    icons: [
      { src: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icons/icon-512.png", sizes: "512x512", type: "image/png" },
      { src: "/icons/maskable-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
    shortcuts: [
      { name: "Simulacro tipo TOEFL", url: "/simulacro" },
      { name: "Tutora de conversación", url: "/tutor" },
      { name: "Mi progreso", url: "/progreso" },
    ],
  };
}
