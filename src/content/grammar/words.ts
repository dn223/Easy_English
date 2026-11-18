import type { GrammarLesson } from "./types";

export const wordLessons: GrammarLesson[] = [
  {
    id: "articles",
    title: "Articles: a, an, the",
    subtitle: "Artículos y cuándo no poner ninguno",
    level: "A2",
    category: "palabras",
    minutes: 9,
    summary: "El artículo cero es la gran diferencia con el español.",
    intro:
      "El inglés usa artículos de forma parecida al español, con una gran excepción: cuando hablamos de algo en general, en inglés normalmente no va artículo (*Dogs are loyal*), donde el español sí lo pone (*Los perros son leales*).",
    rules: [
      {
        title: "A / an: algo no concreto o mencionado por primera vez",
        text: "Con sustantivos contables en singular. *An* va delante de sonido vocálico, no de letra vocal: *an hour*, pero *a university*. También con profesiones, donde el español no lo pone.",
        examples: [
          { en: "I saw a dog in the park.", es: "Vi un perro en el parque." },
          { en: "It takes an hour.", es: "Se tarda una hora." },
          { en: "She's a teacher.", es: "Es profesora." },
        ],
      },
      {
        title: "The: algo concreto que los dos conocemos",
        text: "Para algo ya mencionado, único o que se sobreentiende por el contexto.",
        examples: [
          { en: "The dog I saw was huge.", es: "El perro que vi era enorme." },
          { en: "Can you close the window?", es: "¿Puedes cerrar la ventana?" },
          { en: "The sun is very strong today.", es: "El sol pega fuerte hoy." },
        ],
      },
      {
        title: "Sin artículo: hablar en general",
        text: "Con plurales e incontables cuando hablamos en general. Tampoco va con comidas, idiomas, deportes ni la mayoría de países y ciudades.",
        examples: [
          { en: "Cats sleep a lot.", es: "Los gatos duermen mucho." },
          { en: "Life is short.", es: "La vida es corta." },
          { en: "I play tennis on Mondays.", es: "Juego al tenis los lunes." },
          { en: "We had lunch in Italy.", es: "Comimos en Italia." },
        ],
      },
    ],
    mistakes: [
      { wrong: "The life is beautiful.", right: "Life is beautiful.", why: "Hablando en general, sin artículo." },
      { wrong: "She is doctor.", right: "She is a doctor.", why: "Las profesiones llevan a/an." },
      { wrong: "I play the football.", right: "I play football.", why: "Los deportes van sin artículo." },
      { wrong: "a hour", right: "an hour", why: "La h de hour no suena: empieza por sonido vocálico." },
    ],
    practice: [
      {
        id: "p1",
        prompt: "___ honesty is important.",
        options: ["The", "An", "— (sin artículo)"],
        answer: 2,
        explanation: "Sustantivo abstracto en sentido general: sin artículo.",
      },
      {
        id: "p2",
        prompt: "He's ___ engineer.",
        options: ["a", "an", "the"],
        answer: 1,
        explanation: "Profesión y sonido vocálico inicial: an.",
      },
      {
        id: "p3",
        prompt: "Could you pass me ___ salt, please?",
        options: ["a", "the", "— (sin artículo)"],
        answer: 1,
        explanation: "Sal concreta, la que está en la mesa: the.",
      },
      {
        id: "p4",
        prompt: "It's ___ unusual idea, but it's ___ useful one.",
        options: ["an / a", "a / an", "an / an"],
        answer: 0,
        explanation: "Unusual empieza por sonido vocálico (an); useful empieza por sonido /j/ (a).",
      },
    ],
  },
  {
    id: "prepositions-time-place",
    title: "In, on, at",
    subtitle: "Preposiciones de tiempo y lugar",
    level: "A2",
    category: "palabras",
    minutes: 8,
    summary: "De lo más general a lo más concreto.",
    intro:
      "En español casi todo es *en*. En inglés se reparte entre *in, on* y *at* según lo amplio o concreto que sea el momento o el lugar.",
    rules: [
      {
        title: "Tiempo",
        text: "*In* para periodos largos (meses, años, estaciones, partes del día), *on* para días y fechas, *at* para horas y momentos concretos.",
        examples: [
          { en: "I was born in 1998.", es: "Nací en 1998." },
          { en: "See you on Monday.", es: "Nos vemos el lunes." },
          { en: "The class starts at nine.", es: "La clase empieza a las nueve." },
        ],
        table: {
          head: ["in", "on", "at"],
          rows: [
            ["in May, in 2024", "on Monday", "at 6 o'clock"],
            ["in summer", "on 3 March", "at night"],
            ["in the morning", "on my birthday", "at Christmas"],
          ],
        },
      },
      {
        title: "Lugar",
        text: "*In* para espacios cerrados o zonas (dentro de), *on* para superficies y líneas, *at* para un punto o un sitio donde se hace algo.",
        examples: [
          { en: "The keys are in my bag.", es: "Las llaves están en mi bolso." },
          { en: "The picture is on the wall.", es: "El cuadro está en la pared." },
          { en: "I'll meet you at the bus stop.", es: "Te veo en la parada del autobús." },
        ],
      },
      {
        title: "Sin preposición",
        text: "No se usa preposición antes de *next, last, this, every, today, tomorrow* ni *yesterday*.",
        examples: [
          { en: "I'll see you next week.", es: "Te veo la semana que viene." },
          { en: "We go swimming every Sunday.", es: "Vamos a nadar todos los domingos." },
        ],
      },
    ],
    mistakes: [
      { wrong: "in Monday", right: "on Monday", why: "Los días van con on." },
      { wrong: "on the next week", right: "next week", why: "Con next no va preposición." },
      { wrong: "at the night (= de noche)", right: "at night", why: "La expresión es at night, sin artículo." },
    ],
    practice: [
      {
        id: "p1",
        prompt: "My birthday is ___ July.",
        options: ["on", "in", "at"],
        answer: 1,
        explanation: "Meses: in.",
      },
      {
        id: "p2",
        prompt: "The meeting is ___ 3:30.",
        options: ["at", "on", "in"],
        answer: 0,
        explanation: "Hora concreta: at.",
      },
      {
        id: "p3",
        prompt: "There's a fly ___ the ceiling.",
        options: ["in", "at", "on"],
        answer: 2,
        explanation: "Superficie: on.",
      },
      {
        id: "p4",
        prompt: "What did you do ___ the weekend?",
        options: ["on", "in", "to"],
        answer: 0,
        explanation: "En inglés americano se dice on the weekend.",
      },
    ],
  },
  {
    id: "countable-quantifiers",
    title: "Countable, uncountable and quantifiers",
    subtitle: "Contables, incontables, much, many, some, any",
    level: "A2",
    category: "palabras",
    minutes: 8,
    summary: "Qué se puede contar en inglés y qué palabras de cantidad acompaña.",
    intro:
      "Algunos sustantivos que en español se cuentan son incontables en inglés: *information, advice, furniture, news, luggage*. No tienen plural ni llevan *a*.",
    rules: [
      {
        title: "Contables e incontables",
        text: "Los contables tienen singular y plural (*a chair, two chairs*). Los incontables van siempre en singular y sin *a*. Para contarlos se usa una unidad: *a piece of advice, a cup of coffee*.",
        examples: [
          { en: "Can I give you some advice?", es: "¿Te puedo dar un consejo?" },
          { en: "The news is good.", es: "Las noticias son buenas." },
          { en: "Two pieces of furniture were broken.", es: "Se rompieron dos muebles." },
        ],
      },
      {
        title: "Much, many, a lot of",
        text: "*Many* con contables, *much* con incontables, sobre todo en negativas y preguntas. *A lot of* sirve para los dos y es lo más natural en afirmativas.",
        examples: [
          { en: "How many people came?", es: "¿Cuánta gente vino?" },
          { en: "I don't have much time.", es: "No tengo mucho tiempo." },
          { en: "She has a lot of friends.", es: "Tiene muchos amigos." },
        ],
      },
      {
        title: "Some y any",
        text: "*Some* en afirmativas y en ofrecimientos o peticiones. *Any* en negativas y preguntas generales.",
        examples: [
          { en: "There's some milk in the fridge.", es: "Hay leche en la nevera." },
          { en: "Would you like some tea?", es: "¿Quieres té?" },
          { en: "We don't have any bread.", es: "No tenemos pan." },
        ],
      },
      {
        title: "A few y a little",
        text: "*A few* con contables y *a little* con incontables: significan *algunos, un poco*. Sin *a* (*few, little*) significan *pocos, casi nada*, con un tono negativo.",
        examples: [
          { en: "I have a few questions.", es: "Tengo algunas preguntas." },
          { en: "There's a little sugar left.", es: "Queda un poco de azúcar." },
          { en: "Few people knew the answer.", es: "Poca gente sabía la respuesta." },
        ],
      },
    ],
    mistakes: [
      { wrong: "I need an information.", right: "I need some information.", why: "Information es incontable: sin a ni plural." },
      { wrong: "She gave me many advices.", right: "She gave me a lot of advice.", why: "Advice es incontable." },
      { wrong: "How much people?", right: "How many people?", why: "People es contable (plural): many." },
    ],
    practice: [
      {
        id: "p1",
        prompt: "How ___ luggage do you have?",
        options: ["many", "much", "a few"],
        answer: 1,
        explanation: "Luggage es incontable: much.",
      },
      {
        id: "p2",
        prompt: "There aren't ___ eggs left.",
        options: ["some", "any", "much"],
        answer: 1,
        explanation: "Negativa con contable plural: any.",
      },
      {
        id: "p3",
        prompt: "Could I have ___ water, please?",
        options: ["some", "any", "a"],
        answer: 0,
        explanation: "Petición: some, aunque sea una pregunta.",
      },
      {
        id: "p4",
        prompt: "Which is correct?",
        options: ["The furnitures are new.", "The furniture is new.", "A furniture is new."],
        answer: 1,
        explanation: "Furniture es incontable: verbo en singular y sin plural.",
      },
    ],
  },
  {
    id: "comparatives",
    title: "Comparatives and superlatives",
    subtitle: "Comparativos y superlativos",
    level: "A2",
    category: "palabras",
    minutes: 7,
    summary: "-er / more, -est / most y los irregulares.",
    intro:
      "Para comparar, los adjetivos cortos añaden terminaciones y los largos usan *more* y *most*. La palabra de comparación es *than* (*que*).",
    rules: [
      {
        title: "Adjetivos cortos: -er y -est",
        text: "Una sílaba (y las de dos que acaban en *-y*): *-er than* y *the -est*. La *-y* pasa a *-i-*, y si acaba en vocal + consonante se dobla la consonante (*big → bigger*).",
        examples: [
          { en: "My brother is taller than me.", es: "Mi hermano es más alto que yo." },
          { en: "It's the biggest city in the country.", es: "Es la ciudad más grande del país." },
          { en: "Today is busier than yesterday.", es: "Hoy hay más trabajo que ayer." },
        ],
      },
      {
        title: "Adjetivos largos: more y most",
        text: "Dos sílabas o más (salvo las de *-y*): *more … than* y *the most …*.",
        examples: [
          { en: "This exam was more difficult than the last one.", es: "Este examen fue más difícil que el anterior." },
          { en: "It's the most beautiful beach I've ever seen.", es: "Es la playa más bonita que he visto." },
        ],
      },
      {
        title: "Irregulares y comparaciones de igualdad",
        text: "*good → better → the best, bad → worse → the worst, far → further → the furthest*. Para igualdad: *as … as*; en negativa, *not as … as*.",
        examples: [
          { en: "Her English is better than mine.", es: "Su inglés es mejor que el mío." },
          { en: "This film isn't as good as the book.", es: "La película no es tan buena como el libro." },
        ],
      },
    ],
    mistakes: [
      { wrong: "more big", right: "bigger", why: "Adjetivo corto: -er." },
      { wrong: "She is taller that me.", right: "She is taller than me.", why: "La comparación es than, no that." },
      { wrong: "the more expensive of all", right: "the most expensive of all", why: "Superlativo de adjetivo largo: the most." },
      { wrong: "more better", right: "better", why: "Better ya es comparativo." },
    ],
    practice: [
      {
        id: "p1",
        prompt: "This road is ___ than the highway.",
        options: ["more dangerous", "dangerouser", "most dangerous"],
        answer: 0,
        explanation: "Adjetivo largo: more + adjetivo + than.",
      },
      {
        id: "p2",
        prompt: "It was the ___ day of my life.",
        options: ["happier", "happiest", "most happy"],
        answer: 1,
        explanation: "Dos sílabas acabado en -y: the happiest.",
      },
      {
        id: "p3",
        prompt: "My cold is ___ today.",
        options: ["badder", "worse", "more bad"],
        answer: 1,
        explanation: "Bad es irregular: worse.",
      },
      {
        id: "p4",
        prompt: "Paris isn't ___ big ___ London.",
        options: ["as / as", "so / that", "more / than"],
        answer: 0,
        explanation: "Comparación de igualdad en negativa: not as … as.",
      },
    ],
  },
];
