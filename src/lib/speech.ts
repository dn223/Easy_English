/** Toda la app usa inglés estadounidense, el del TOEFL. */
export const LANG = "en-US";

export function ttsSupported(): boolean {
  return typeof window !== "undefined" && "speechSynthesis" in window;
}

function pickVoice(): SpeechSynthesisVoice | null {
  const accent = LANG;
  const voices = window.speechSynthesis.getVoices();
  const lang = (voice: SpeechSynthesisVoice) => voice.lang.replace("_", "-");
  return (
    voices.find((voice) => lang(voice) === accent && voice.localService) ??
    voices.find((voice) => lang(voice) === accent) ??
    voices.find((voice) => lang(voice).startsWith("en")) ??
    null
  );
}

export type SpokenLine = { text: string; voiceIndex?: number };

type SpeakOptions = {
  rate?: number;
  onEnd?: () => void;
};

const PITCHES = [1, 0.8, 1.2];

/** Divide un texto en trozos de frases completas de hasta `max` caracteres. */
function chunk(text: string, max: number): string[] {
  const sentences = text.match(/[^.!?]+[.!?]*/g)?.map((part) => part.trim()).filter(Boolean) ?? [text];
  const chunks: string[] = [];
  for (const sentence of sentences) {
    const last = chunks.at(-1);
    if (last && last.length + sentence.length + 1 <= max) chunks[chunks.length - 1] = `${last} ${sentence}`;
    else chunks.push(sentence);
  }
  return chunks;
}

/** Voz del navegador. Es el respaldo cuando no hay voces naturales o no hay conexión. */
function speakWithBrowser(lines: SpokenLine[], rate: number, onEnd?: () => void): () => void {
  if (!ttsSupported()) {
    onEnd?.();
    return () => {};
  }
  const synth = window.speechSynthesis;
  synth.cancel();

  // Frases cortas: Chrome corta las locuciones largas a los ~15 segundos.
  const queue = lines.flatMap((line) =>
    chunk(line.text, 1).map((text) => ({ text, voiceIndex: line.voiceIndex ?? 0 })),
  );

  let stopped = false;
  const voice = pickVoice();

  const sayNext = (index: number) => {
    if (stopped) return;
    if (index >= queue.length) {
      onEnd?.();
      return;
    }
    const utterance = new SpeechSynthesisUtterance(queue[index].text);
    utterance.lang = LANG;
    if (voice) utterance.voice = voice;
    utterance.rate = rate;
    utterance.pitch = PITCHES[queue[index].voiceIndex % PITCHES.length];
    utterance.onend = () => sayNext(index + 1);
    utterance.onerror = () => {
      if (!stopped) onEnd?.();
    };
    synth.speak(utterance);
  };
  sayNext(0);

  return () => {
    stopped = true;
    synth.cancel();
  };
}

// ── Voces naturales (servidor) ─────────────────────────────────────────────

let naturalStatus: Promise<boolean> | null = null;

/** Pregunta una vez al servidor si hay voces naturales configuradas. */
function naturalVoicesEnabled(): Promise<boolean> {
  naturalStatus ??= fetch("/api/tts/status")
    .then((response) => (response.ok ? response.json() : { enabled: false }))
    .then((data: { enabled?: boolean }) => data.enabled === true)
    .catch(() => false);
  return naturalStatus;
}

function audioUrl(text: string, voiceIndex: number, rate: number): string {
  const params = new URLSearchParams({ text, v: String(voiceIndex), r: rate.toFixed(2) });
  // Es un GET con la frase en la URL para que el navegador, la CDN y el modo sin conexión puedan guardarlo.
  return `/api/tts?${params}`;
}

function playUrl(url: string, register: (audio: HTMLAudioElement) => void): Promise<void> {
  return new Promise((resolve, reject) => {
    const audio = new Audio(url);
    register(audio);
    audio.onended = () => resolve();
    audio.onerror = () => reject(new Error("audio"));
    audio.play().catch(reject);
  });
}

/**
 * Lee las líneas en orden. Usa voces naturales del servidor si están configuradas y hay conexión;
 * si no, o si algo falla a mitad, sigue con la voz del navegador. Devuelve una función para detenerlo.
 */
export function speak(lines: SpokenLine[], { rate = 1, onEnd }: SpeakOptions = {}): () => void {
  let stopped = false;
  let current: HTMLAudioElement | null = null;
  let stopBrowser: () => void = () => {};
  if (ttsSupported()) window.speechSynthesis.cancel();

  void (async () => {
    const natural = navigator.onLine && (await naturalVoicesEnabled());
    if (stopped) return;
    if (!natural) {
      stopBrowser = speakWithBrowser(lines, rate, onEnd);
      return;
    }

    const parts = lines.flatMap((line, lineIndex) =>
      chunk(line.text, 600).map((text) => ({ text, voiceIndex: line.voiceIndex ?? 0, lineIndex })),
    );
    // Pide el siguiente trozo mientras suena el actual, para que no haya pausas.
    const preload = (index: number) => {
      const part = parts[index];
      if (part) void fetch(audioUrl(part.text, part.voiceIndex, rate)).catch(() => {});
    };

    for (let index = 0; index < parts.length; index++) {
      if (stopped) return;
      preload(index + 1);
      try {
        await playUrl(audioUrl(parts[index].text, parts[index].voiceIndex, rate), (audio) => {
          current = audio;
        });
      } catch {
        if (stopped) return;
        const rest = lines.slice(parts[index].lineIndex);
        stopBrowser = speakWithBrowser(rest, rate, onEnd);
        return;
      }
    }
    if (!stopped) onEnd?.();
  })();

  return () => {
    stopped = true;
    current?.pause();
    stopBrowser();
  };
}

type RecognitionResultList = ArrayLike<ArrayLike<{ transcript: string }>>;

type Recognition = {
  lang: string;
  interimResults: boolean;
  maxAlternatives: number;
  onresult: ((event: { results: RecognitionResultList }) => void) | null;
  onerror: ((event: { error: string }) => void) | null;
  onend: (() => void) | null;
  start: () => void;
  abort: () => void;
};

type RecognitionConstructor = new () => Recognition;

function recognitionConstructor(): RecognitionConstructor | null {
  if (typeof window === "undefined") return null;
  const scope = window as unknown as {
    SpeechRecognition?: RecognitionConstructor;
    webkitSpeechRecognition?: RecognitionConstructor;
  };
  return scope.SpeechRecognition ?? scope.webkitSpeechRecognition ?? null;
}

export function recognitionSupported(): boolean {
  return recognitionConstructor() !== null;
}

type ListenOptions = {
  onResult: (alternatives: string[]) => void;
  onError: (code: string) => void;
  onEnd: () => void;
};

/** Escucha una sola frase y entrega las transcripciones candidatas. Devuelve una función para cancelar. */
export function listenOnce({ onResult, onError, onEnd }: ListenOptions): () => void {
  const Constructor = recognitionConstructor();
  if (!Constructor) {
    onError("unsupported");
    onEnd();
    return () => {};
  }
  const recognition = new Constructor();
  // Tras cancelar, el navegador aún dispara error/end: no deben pisar al siguiente intento.
  let cancelled = false;
  recognition.lang = LANG;
  recognition.interimResults = false;
  recognition.maxAlternatives = 3;
  recognition.onresult = (event) => {
    const first = event.results[0];
    if (cancelled || !first) return;
    onResult(Array.from({ length: first.length }, (_, index) => first[index].transcript));
  };
  recognition.onerror = (event) => {
    if (!cancelled) onError(event.error);
  };
  recognition.onend = () => {
    if (!cancelled) onEnd();
  };
  try {
    recognition.start();
  } catch {
    onError("start-failed");
    onEnd();
  }
  return () => {
    cancelled = true;
    recognition.abort();
  };
}
