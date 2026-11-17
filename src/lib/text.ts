export function words(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[’‘]/g, "'")
    .replace(/[^a-z0-9'\s]/g, " ")
    .split(/\s+/)
    .filter(Boolean);
}

export function countWords(text: string): number {
  return text.trim() ? text.trim().split(/\s+/).length : 0;
}

/** Marca qué palabras del objetivo aparecen, en orden, en lo que se dijo (subsecuencia común más larga). */
export function matchWords(target: string, spoken: string): { word: string; hit: boolean }[] {
  const display = target.split(/\s+/).filter(Boolean);
  const a = display.map((word) => words(word).join(""));
  const b = words(spoken);

  const table = Array.from({ length: a.length + 1 }, () => new Array<number>(b.length + 1).fill(0));
  for (let i = a.length - 1; i >= 0; i--) {
    for (let j = b.length - 1; j >= 0; j--) {
      table[i][j] = a[i] === b[j] ? table[i + 1][j + 1] + 1 : Math.max(table[i + 1][j], table[i][j + 1]);
    }
  }

  const hits = new Array<boolean>(a.length).fill(false);
  let i = 0;
  let j = 0;
  while (i < a.length && j < b.length) {
    if (a[i] === b[j]) {
      hits[i] = true;
      i++;
      j++;
    } else if (table[i + 1][j] >= table[i][j + 1]) {
      i++;
    } else {
      j++;
    }
  }
  return display.map((word, index) => ({ word, hit: hits[index] }));
}

/** 0–100: palabras acertadas sobre la frase más larga, para que añadir palabras de más también reste. */
export function similarity(target: string, spoken: string): number {
  const matched = matchWords(target, spoken).filter((entry) => entry.hit).length;
  const longest = Math.max(words(target).length, words(spoken).length);
  return longest === 0 ? 0 : Math.round((matched / longest) * 100);
}

/** Orden estable y distinto del original, igual en servidor y navegador. */
export function shuffled<T>(items: T[], seed: string): T[] {
  let state = 0;
  for (const char of seed) state = (state * 31 + char.charCodeAt(0)) >>> 0;
  const next = () => {
    state = (state * 1664525 + 1013904223) >>> 0;
    return state / 2 ** 32;
  };
  const result = items.map((_, index) => index);
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(next() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  if (result.length > 1 && result.every((value, index) => value === index)) {
    result.push(result.shift()!);
  }
  return result.map((index) => items[index]);
}
