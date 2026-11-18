import type { GrammarLesson } from "./types";

export const advancedWordLessons: GrammarLesson[] = [
  {
    id: "phrasal-verbs",
    title: "Phrasal verbs",
    subtitle: "Verbos frasales: separables, inseparables y de tres partes",
    level: "B2",
    category: "palabras",
    minutes: 10,
    summary: "Cómo funcionan gramaticalmente y dónde va el objeto.",
    intro:
      "Un phrasal verb es un verbo con una o dos partículas (*up, out, off, on…*) que juntos tienen un significado propio: *give up* es *rendirse*, no *dar arriba*. Además del significado, hay que saber dónde colocar el objeto.",
    rules: [
      {
        title: "Separables: el objeto puede ir en medio",
        text: "Con muchos phrasal verbs transitivos, el objeto puede ir antes o después de la partícula. Pero si el objeto es un pronombre (*it, them, her*), va obligatoriamente en medio.",
        examples: [
          { en: "Turn off the lights. / Turn the lights off.", es: "Apaga las luces." },
          { en: "Turn them off.", es: "Apágalas." },
          { en: "Can you pick me up at six?", es: "¿Me recoges a las seis?" },
        ],
      },
      {
        title: "Inseparables: el objeto siempre va detrás",
        text: "Algunos no se pueden separar nunca: *look after, get over, run into, come across, go through*.",
        examples: [
          { en: "She looks after her younger brother.", es: "Cuida de su hermano menor." },
          { en: "It took him months to get over the flu.", es: "Tardó meses en recuperarse de la gripe." },
          { en: "I ran into Carlos at the supermarket.", es: "Me encontré con Carlos en el súper." },
        ],
      },
      {
        title: "Intransitivos: sin objeto",
        text: "No llevan objeto: *wake up, give up, break down, show up, take off* (despegar).",
        examples: [
          { en: "The car broke down on the highway.", es: "El coche se averió en la autopista." },
          { en: "Only five people showed up.", es: "Solo vinieron cinco personas." },
        ],
      },
      {
        title: "De tres partes",
        text: "Verbo + dos partículas, siempre inseparables: *look forward to, come up with, put up with, run out of, get along with*.",
        examples: [
          { en: "We ran out of milk.", es: "Se nos acabó la leche." },
          { en: "I can't put up with this noise anymore.", es: "Ya no aguanto este ruido." },
          { en: "She came up with a brilliant idea.", es: "Se le ocurrió una idea brillante." },
        ],
        table: {
          head: ["Phrasal verb", "Significado", "Tipo"],
          rows: [
            ["figure out", "entender, resolver", "separable"],
            ["put off", "posponer", "separable"],
            ["look into", "investigar", "inseparable"],
            ["carry on", "continuar", "intransitivo"],
            ["catch up with", "ponerse al día con", "tres partes"],
          ],
        },
      },
    ],
    mistakes: [
      { wrong: "Turn off it.", right: "Turn it off.", why: "Con pronombre, el objeto va en medio." },
      { wrong: "She looks her brother after.", right: "She looks after her brother.", why: "Look after es inseparable." },
      { wrong: "I'm looking forward to meet you.", right: "I'm looking forward to meeting you.", why: "To es preposición: va -ing." },
    ],
    practice: [
      {
        id: "p1",
        prompt: "This form is confusing. Can you help me ___?",
        options: ["fill out it", "fill it out", "fill out"],
        answer: 1,
        explanation: "Separable con pronombre: fill it out.",
      },
      {
        id: "p2",
        prompt: "I came ___ an old photo while cleaning.",
        options: ["across", "up", "out"],
        answer: 0,
        explanation: "Come across = encontrar por casualidad.",
      },
      {
        id: "p3",
        prompt: "The meeting was ___ until next week.",
        options: ["put off", "put up", "put on"],
        answer: 0,
        explanation: "Put off = posponer.",
      },
      {
        id: "p4",
        prompt: "How do you get ___ your roommate?",
        options: ["along with", "on", "over with"],
        answer: 0,
        explanation: "Get along with = llevarse bien con.",
      },
      {
        id: "p5",
        prompt: "We need to ___ a solution before Friday.",
        options: ["come up with", "come up", "come with up"],
        answer: 0,
        explanation: "Come up with (tres partes, inseparable) = idear, proponer.",
      },
    ],
  },
  {
    id: "linking-words",
    title: "Linking words",
    subtitle: "Conectores: contraste, causa, consecuencia y adición",
    level: "B2",
    category: "palabras",
    minutes: 10,
    summary: "Imprescindibles para escribir textos claros, en el TOEFL y fuera de él.",
    intro:
      "Los conectores organizan las ideas. El problema no es el significado, sino la gramática: algunos van con una oración completa, otros con un sustantivo o *-ing*, y otros unen dos oraciones separadas por punto.",
    rules: [
      {
        title: "Contraste: although, despite, however",
        text: "*Although / even though* van con una oración (sujeto + verbo). *Despite / in spite of* van con un sustantivo o *-ing*. *However* une dos oraciones: va al principio de la segunda, seguido de coma.",
        examples: [
          { en: "Although it was raining, we went out.", es: "Aunque llovía, salimos." },
          { en: "Despite the rain, we went out.", es: "A pesar de la lluvia, salimos." },
          { en: "It was raining. However, we went out.", es: "Llovía. Sin embargo, salimos." },
        ],
        table: {
          head: ["Conector", "Va seguido de", "Ejemplo"],
          rows: [
            ["although / even though", "sujeto + verbo", "although it was late"],
            ["despite / in spite of", "sustantivo o -ing", "despite being late"],
            ["however / nevertheless", "nueva oración (con coma)", ". However, …"],
            ["whereas / while", "sujeto + verbo (contraste directo)", "whereas he prefers tea"],
          ],
        },
      },
      {
        title: "Causa: because, because of, since, due to",
        text: "*Because, since, as* + oración. *Because of, due to, owing to* + sustantivo.",
        examples: [
          { en: "The flight was canceled because the weather was bad.", es: "Cancelaron el vuelo porque hacía mal tiempo." },
          { en: "The flight was canceled due to bad weather.", es: "Cancelaron el vuelo debido al mal tiempo." },
        ],
      },
      {
        title: "Consecuencia: so, therefore, as a result",
        text: "*So* une dos partes de una misma oración. *Therefore, as a result, consequently* suelen empezar una nueva oración y son más formales.",
        examples: [
          { en: "I was tired, so I went to bed.", es: "Estaba cansado, así que me fui a dormir." },
          { en: "Prices rose sharply. As a result, demand fell.", es: "Los precios subieron mucho. Como resultado, la demanda bajó." },
        ],
      },
      {
        title: "Adición y ejemplo: moreover, in addition, for instance",
        text: "*Moreover, furthermore, in addition* añaden un argumento (registro formal). *For example, for instance* introducen un ejemplo; *such as* va delante de sustantivos.",
        examples: [
          { en: "The plan is expensive. Moreover, it would take years.", es: "El plan es caro. Además, llevaría años." },
          { en: "Some fruits, such as oranges, are rich in vitamin C.", es: "Algunas frutas, como las naranjas, son ricas en vitamina C." },
        ],
      },
    ],
    mistakes: [
      { wrong: "Despite it was late, we stayed.", right: "Although it was late, we stayed. / Despite the late hour, we stayed.", why: "Despite no va con oración completa." },
      { wrong: "I studied hard, however I failed.", right: "I studied hard. However, I failed.", why: "However empieza una nueva oración (o va tras punto y coma)." },
      { wrong: "Because of it was cold, …", right: "Because it was cold, …", why: "Because of va con sustantivo; because, con oración." },
    ],
    practice: [
      {
        id: "p1",
        prompt: "___ having little experience, she got the job.",
        options: ["Although", "Despite", "However"],
        answer: 1,
        explanation: "Seguido de -ing: despite.",
      },
      {
        id: "p2",
        prompt: "The road was closed ___ an accident.",
        options: ["because", "due to", "so"],
        answer: 1,
        explanation: "Seguido de sustantivo: due to.",
      },
      {
        id: "p3",
        prompt: "The experiment failed. ___, the team learned a lot.",
        options: ["Nevertheless", "Despite", "Because"],
        answer: 0,
        explanation: "Contraste que empieza una nueva oración: nevertheless.",
      },
      {
        id: "p4",
        prompt: "My sister loves sports, ___ I prefer reading.",
        options: ["whereas", "despite", "therefore"],
        answer: 0,
        explanation: "Contraste directo entre dos oraciones: whereas.",
      },
      {
        id: "p5",
        prompt: "Many animals, ___ bears and bats, hibernate.",
        options: ["for instance", "such as", "moreover"],
        answer: 1,
        explanation: "Delante de una lista de sustantivos: such as.",
      },
    ],
  },
];
