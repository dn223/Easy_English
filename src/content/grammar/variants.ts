import type { GrammarLesson } from "./types";

export const variantLessons: GrammarLesson[] = [
  {
    id: "british-american-grammar",
    title: "British vs American grammar",
    subtitle: "Diferencias gramaticales entre el inglés británico y el estadounidense",
    level: "B1",
    category: "variantes",
    minutes: 10,
    summary: "Pocas diferencias, pero se notan. Aprende a reconocerlas.",
    intro:
      "El británico y el estadounidense comparten casi toda la gramática; las diferencias son pocas y nunca impiden entenderse. Lo recomendable es elegir una variedad para escribir, ser coherente y aprender a reconocer la otra.",
    rules: [
      {
        title: "Present perfect frente a past simple",
        text: "Con *just, already* y *yet*, el británico prefiere el present perfect; el americano usa mucho el past simple.",
        examples: [
          { en: "UK: I've already had lunch. · US: I already had lunch.", es: "Ya he comido." },
          { en: "UK: Have you seen it yet? · US: Did you see it yet?", es: "¿Ya lo has visto?" },
        ],
      },
      {
        title: "Have got y have",
        text: "Para posesión, el británico usa mucho *have got*; el americano prefiere *have* con *do* en preguntas y negativas.",
        examples: [
          { en: "UK: Have you got a pen? · US: Do you have a pen?", es: "¿Tienes un bolígrafo?" },
          { en: "UK: I haven't got time. · US: I don't have time.", es: "No tengo tiempo." },
        ],
      },
      {
        title: "Got y gotten",
        text: "En americano, el participio de *get* es *gotten* cuando significa obtener o volverse; *have got* para poseer es igual en los dos. En británico, el participio es *got*.",
        examples: [
          { en: "UK: It's got colder. · US: It's gotten colder.", es: "Ha hecho más frío." },
          { en: "UK: She's got a new job. · US: She's gotten a new job.", es: "Ha conseguido un trabajo nuevo." },
        ],
      },
      {
        title: "Sustantivos colectivos",
        text: "Con palabras como *team, government, family, staff* o *band*, el británico puede usar el verbo en plural si piensa en las personas. El americano usa casi siempre singular.",
        examples: [
          { en: "UK: The team are playing well. · US: The team is playing well.", es: "El equipo está jugando bien." },
          { en: "UK: The government have decided… · US: The government has decided…", es: "El gobierno ha decidido…" },
        ],
      },
      {
        title: "Subjuntivo tras suggest, insist, recommend",
        text: "El americano usa el verbo en forma base (*subjuntivo*). El británico también, pero es frecuente *should*.",
        examples: [
          { en: "US: I suggest that he take the train.", es: "Sugiero que tome el tren." },
          { en: "UK: I suggest that he should take the train.", es: "Sugiero que tome el tren." },
        ],
      },
    ],
    variants: {
      text: "Además de la gramática, hay diferencias de ortografía y vocabulario muy frecuentes.",
      pairs: [
        { uk: "colour, centre, organise", us: "color, center, organize" },
        { uk: "flat, lift, holiday", us: "apartment, elevator, vacation" },
        { uk: "Shall we start?", us: "Should we start?" },
        { uk: "at the weekend", us: "on the weekend" },
      ],
    },
    mistakes: [
      {
        wrong: "Mezclar en un mismo texto colour y color.",
        right: "Elige una variedad y mantenla.",
        why: "Las dos ortografías son correctas, pero mezclarlas en un texto se considera un error.",
      },
      {
        wrong: "Pensar que “I already ate” es incorrecto.",
        right: "Es correcto en inglés americano.",
        why: "Los exámenes internacionales aceptan las dos variedades si eres coherente.",
      },
    ],
    practice: [
      {
        id: "p1",
        prompt: "Which sentence is typically American?",
        options: ["Have you got a car?", "Do you have a car?", "Have you a car?"],
        answer: 1,
        explanation: "El americano prefiere do you have; el británico usa mucho have you got.",
      },
      {
        id: "p2",
        prompt: "Which sentence is typically British?",
        options: ["My family are coming for dinner.", "My family is coming for dinner.", "Both are only American."],
        answer: 0,
        explanation: "El británico admite verbo en plural con colectivos cuando piensa en las personas.",
      },
      {
        id: "p3",
        prompt: "In American English: “Things have ___ better.”",
        options: ["got", "gotten", "getted"],
        answer: 1,
        explanation: "Participio americano de get (volverse): gotten.",
      },
      {
        id: "p4",
        prompt: "The best advice for writing an exam is…",
        options: [
          "Mix both varieties to show you know them.",
          "Use one variety consistently.",
          "Always use British English.",
        ],
        answer: 1,
        explanation: "Lo importante es la coherencia: una sola variedad en todo el texto.",
      },
    ],
  },
];
