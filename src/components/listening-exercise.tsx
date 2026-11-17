"use client";

import { Pause, Play } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { speak, ttsSupported, type Accent } from "@/lib/speech";
import type { ListeningTrack } from "@/lib/types";
import { useClientValue } from "@/lib/use-client-value";
import { AccentToggle } from "./accent-toggle";
import { Quiz } from "./quiz";

function Transcript({ track }: { track: ListeningTrack }) {
  const dialogue = new Set(track.lines.map((line) => line.speaker)).size > 1;
  return (
    <section className="arctic animate-rise rounded-3xl p-6 sm:p-8" lang="en">
      <h2 className="text-xl font-semibold text-navy-900" lang="es">
        Transcripción
      </h2>
      <div className="mt-4 space-y-3 text-[16px] leading-relaxed text-navy-800">
        {track.lines.map((line, index) => (
          <p key={index}>
            {dialogue && <span className="font-semibold text-navy-900">{line.speaker}: </span>}
            {line.text}
          </p>
        ))}
      </div>
    </section>
  );
}

export function ListeningExercise({ track }: { track: ListeningTrack }) {
  const supported = useClientValue(ttsSupported, true);
  const [accent, setAccent] = useState<Accent>("en-US");
  const [slow, setSlow] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [plays, setPlays] = useState(0);
  const [readInstead, setReadInstead] = useState(false);
  const stopRef = useRef<() => void>(() => {});

  // También se dispara cuando Next oculta la página al navegar: el audio no debe seguir sonando.
  useEffect(() => () => stopRef.current(), []);

  const stop = () => {
    stopRef.current();
    setPlaying(false);
  };

  const play = () => {
    const speakers = [...new Set(track.lines.map((line) => line.speaker))];
    setPlaying(true);
    setPlays((count) => count + 1);
    stopRef.current = speak(
      track.lines.map((line) => ({ text: line.text, voiceIndex: speakers.indexOf(line.speaker) })),
      { accent, rate: slow ? 0.8 : 1, onEnd: () => setPlaying(false) },
    );
  };

  const changeAccent = (next: Accent) => {
    stop();
    setAccent(next);
  };

  return (
    <div className="grid items-start gap-6 lg:grid-cols-[0.8fr_1.2fr]">
      <section
        className="arctic-deep animate-rise rounded-[28px] p-6 sm:p-8 lg:sticky lg:top-24"
        style={{ animationDelay: "80ms" }}
        aria-label="Reproductor"
      >
        {supported ? (
          <>
            <div className="flex items-center gap-5">
              <div className="relative">
                {playing && <span className="animate-pulse-ring absolute inset-2 rounded-full bg-ice-300" aria-hidden />}
                <button
                  type="button"
                  onClick={playing ? stop : play}
                  className="press relative flex size-20 items-center justify-center rounded-full bg-white text-navy-900 hover:bg-ice-100"
                  aria-label={playing ? "Detener audio" : "Reproducir audio"}
                >
                  {playing ? <Pause className="size-8" aria-hidden /> : <Play className="ml-1 size-8" aria-hidden />}
                </button>
              </div>
              <div>
                <p className="font-display text-xl font-semibold">{playing ? "Escuchando…" : "Escucha el audio"}</p>
                <p className="mt-1 text-sm text-ice-200 tabular-nums">
                  {plays === 0 ? "Aún no lo has escuchado." : `Reproducciones: ${plays}`}
                </p>
              </div>
            </div>

            <div className="mt-7 space-y-4">
              <div>
                <p className="mb-2 text-xs font-semibold tracking-wide text-ice-200 uppercase">Acento</p>
                <AccentToggle value={accent} onChange={changeAccent} tone="deep" />
              </div>
              <label className="flex min-h-11 cursor-pointer items-center gap-3 text-[15px] font-medium">
                <input
                  type="checkbox"
                  checked={slow}
                  onChange={(event) => {
                    stop();
                    setSlow(event.target.checked);
                  }}
                  className="size-5 accent-ice-300"
                />
                Velocidad lenta
              </label>
            </div>
            <p className="mt-5 text-sm leading-relaxed text-ice-200">
              El audio usa la voz de tu dispositivo. Si no tienes instalada una voz del acento elegido, sonará la voz en
              inglés disponible.
            </p>
            {!readInstead && (
              <button
                type="button"
                onClick={() => {
                  stop();
                  setReadInstead(true);
                }}
                className="press mt-4 inline-flex min-h-11 items-center rounded-full bg-white/10 px-4 text-sm font-semibold text-white hover:bg-white/18"
              >
                No oigo nada: leer la transcripción
              </button>
            )}
          </>
        ) : (
          <p className="text-[15px] leading-relaxed text-ice-100">
            Este navegador no puede reproducir voz. Lee la transcripción de abajo como texto y responde las preguntas.
          </p>
        )}
      </section>

      <div className="animate-rise space-y-4" style={{ animationDelay: "160ms" }}>
        {(!supported || readInstead) && <Transcript track={track} />}
        <Quiz
          module="listening"
          activityId={`listening-${track.id}`}
          title={track.title}
          questions={track.questions}
          back={{ href: "/listening", label: "Más audios" }}
          afterCheck={supported && !readInstead ? <Transcript track={track} /> : undefined}
        />
      </div>
    </div>
  );
}
