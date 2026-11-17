# Easy English

Web para estudiar inglés por habilidades: **Listening, Reading, Writing y Speaking**, con ejercicios corregidos al momento y puntuación global e individual. El simulacro tipo TOEFL está previsto como quinto módulo.

## Qué incluye hoy

- **Home** con bienvenida, puntuación global y cuadrícula de módulos.
- **Reading**: 3 lecturas (A2, B1, B2) con preguntas explicadas.
- **Listening**: 3 audios (conversación, anuncio, charla) leídos con la voz del navegador en acento estadounidense o británico.
- **Writing**: ordenar oraciones (corrección automática) y 2 correos con pauta de revisión y respuesta modelo.
- **Speaking**: repetir frases con reconocimiento de voz y una entrevista de 4 preguntas con grabación y rúbrica.
- **Mi progreso**: nota global, nota por habilidad e historial de intentos.

Todavía no hay login: las notas se guardan en el navegador (`localStorage`) a través de `src/lib/scores.ts`, que es el único punto a cambiar cuando haya cuentas y base de datos.

## Desarrollo

```bash
npm install
npm run dev
```

Abre http://localhost:3000. El reconocimiento de voz de Speaking funciona en Chrome, Edge y Safari; en otros navegadores el ejercicio pasa a autoevaluación.

## Estructura

- `src/content/`: todo el contenido de estudio (lecturas, audios, oraciones, correos, preguntas). Para añadir actividades basta editar estos archivos.
- `src/components/`: ejercicios y piezas de interfaz.
- `src/lib/`: puntuaciones, voz (síntesis y reconocimiento) y utilidades de texto.
- `src/app/globals.css`: sistema de diseño "arctic glass" (paleta polar, superficies y animaciones).

## Stack

Next.js (App Router) + React + TypeScript, Tailwind CSS y Motion.
