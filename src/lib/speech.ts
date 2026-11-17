export type Accent = "en-US" | "en-GB";

export function ttsSupported(): boolean {
  return typeof window !== "undefined" && "speechSynthesis" in window;
}

function pickVoice(accent: Accent): SpeechSynthesisVoice | null {
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
  accent: Accent;
  rate?: number;
  onEnd?: () => void;
};

const PITCHES = [1, 0.8, 1.2];

/** Lee las líneas en orden con la voz del navegador. Devuelve una función para detenerlo. */
export function speak(lines: SpokenLine[], { accent, rate = 1, onEnd }: SpeakOptions): () => void {
  if (!ttsSupported()) {
    onEnd?.();
    return () => {};
  }
  const synth = window.speechSynthesis;
  synth.cancel();

  // Frases cortas: Chrome corta las locuciones largas a los ~15 segundos.
  const queue = lines.flatMap((line) =>
    (line.text.match(/[^.!?]+[.!?]*/g) ?? [line.text]).map((text) => ({
      text: text.trim(),
      voiceIndex: line.voiceIndex ?? 0,
    })),
  );

  let stopped = false;
  const voice = pickVoice(accent);

  const sayNext = (index: number) => {
    if (stopped) return;
    if (index >= queue.length) {
      onEnd?.();
      return;
    }
    const utterance = new SpeechSynthesisUtterance(queue[index].text);
    utterance.lang = accent;
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
  accent: Accent;
  onResult: (alternatives: string[]) => void;
  onError: (code: string) => void;
  onEnd: () => void;
};

/** Escucha una sola frase y entrega las transcripciones candidatas. Devuelve una función para cancelar. */
export function listenOnce({ accent, onResult, onError, onEnd }: ListenOptions): () => void {
  const Constructor = recognitionConstructor();
  if (!Constructor) {
    onError("unsupported");
    onEnd();
    return () => {};
  }
  const recognition = new Constructor();
  // Tras cancelar, el navegador aún dispara error/end: no deben pisar al siguiente intento.
  let cancelled = false;
  recognition.lang = accent;
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
