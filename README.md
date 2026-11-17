# Easy English

Web para estudiar inglés por habilidades: **Listening, Reading, Writing y Speaking**, con ejercicios corregidos al momento, puntuación global e individual, un **simulacro tipo TOEFL** y una **tutora de conversación** con IA. Se puede instalar como app desde el navegador.

## Qué incluye hoy

- **Home** con bienvenida, banderas de EE. UU. y Reino Unido en 3D de fondo, puntuación global y cuadrícula de módulos.
- **Gramática (modo estudio)**: 15 lecciones de A2 a B2 con reglas explicadas en español, ejemplos con audio en acento británico o estadounidense, diferencias entre las dos variedades, errores típicos y práctica corregida al momento que no cuenta para la nota.
- **Reading**: 3 lecturas (A2, B1, B2) con preguntas explicadas.
- **Listening**: 3 audios (conversación, anuncio, charla) leídos con la voz del navegador en acento estadounidense o británico.
- **Writing**: ordenar oraciones (corrección automática) y 2 correos con pauta de revisión y respuesta modelo.
- **Speaking**: repetir frases con reconocimiento de voz y una entrevista de 4 preguntas con grabación y rúbrica.
- **Simulacro tipo TOEFL**: las cuatro secciones seguidas con los tipos de tarea del TOEFL iBT de 2026, tiempo por sección, Reading y Listening adaptativos en dos etapas y una banda estimada de 1 a 6.
- **Tutora de conversación**: hablas en inglés con una IA que sigue una situación (cafetería, entrevista, aeropuerto…), responde en voz alta y corrige cada frase.
- **Mi progreso**: nota global, nota por habilidad, lecciones de gramática estudiadas, bandas del último simulacro e historial de intentos.
- **Modo oscuro**: sigue el tema del sistema y se puede cambiar con el botón de la cabecera.

Todavía no hay login: las notas se guardan en el navegador (`localStorage`) a través de `src/lib/scores.ts`, que es el único punto a cambiar cuando haya cuentas y base de datos.

## Desarrollo

```bash
npm install
npm run dev
```

Abre http://localhost:3000. El reconocimiento de voz funciona en Chrome, Edge y Safari; en otros navegadores Speaking pasa a autoevaluación y a la tutora se le escribe.

### Activar la tutora

La tutora usa la API de Claude desde el servidor (`src/app/api/tutor/route.ts`). Copia `.env.example` a `.env.local` y pon tu clave:

```bash
cp .env.example .env.local
```

Sin clave, el resto de la app funciona igual y la tutora avisa de que falta configurarla. El modelo se puede cambiar con `TUTOR_MODEL`.

El endpoint todavía no pide login: solo tiene un límite básico por IP y de longitud. Antes de publicar la app con la clave puesta conviene añadir cuentas o un límite más estricto, porque cada mensaje consume de tu saldo de la API.

### Sobre el simulacro

Sigue el formato del TOEFL iBT vigente desde enero de 2026 según guías de preparación; conviene contrastarlo con la información oficial de ETS. La banda es una estimación propia, no una nota oficial, y TOEFL es una marca de ETS: todo el contenido del simulacro es original.

## Estructura

- `src/content/`: todo el contenido de estudio (lecturas, audios, oraciones, correos, preguntas, simulacro y situaciones de la tutora). Para añadir actividades basta editar estos archivos.
- `src/components/`: ejercicios y piezas de interfaz.
- `src/lib/`: puntuaciones, voz (síntesis y reconocimiento) y utilidades de texto.
- `src/app/globals.css`: sistema de diseño "arctic glass" (paleta polar, superficies y animaciones).

## Stack

Next.js (App Router) + React + TypeScript, Tailwind CSS, Motion y el SDK de Anthropic para la tutora.
