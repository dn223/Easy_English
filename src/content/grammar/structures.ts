import type { GrammarLesson } from "./types";

export const structureLessons: GrammarLesson[] = [
  {
    id: "conditionals",
    title: "Conditionals",
    subtitle: "Oraciones condicionales: zero, first, second y third",
    level: "B1",
    category: "estructuras",
    minutes: 10,
    summary: "Situaciones reales, posibles, imaginarias y pasadas.",
    intro:
      "Las condicionales tienen dos partes: la condición (*if…*) y el resultado. El tiempo verbal de cada parte indica si la situación es real, probable, imaginaria o ya imposible.",
    rules: [
      {
        title: "Zero conditional: verdades generales",
        text: "Para cosas que siempre pasan cuando se cumple la condición. Presente en las dos partes; *if* equivale a *when*.",
        form: "if + presente, presente",
        examples: [
          { en: "If you heat ice, it melts.", es: "Si calientas el hielo, se derrite." },
          { en: "If I drink coffee late, I can't sleep.", es: "Si tomo café tarde, no puedo dormir." },
        ],
      },
      {
        title: "First conditional: situaciones posibles en el futuro",
        text: "Para algo que puede pasar de verdad. Ojo: después de *if* va presente, nunca *will*.",
        form: "if + presente, will + verbo",
        examples: [
          { en: "If it rains tomorrow, we'll stay at home.", es: "Si llueve mañana, nos quedaremos en casa." },
          { en: "If you study, you'll pass.", es: "Si estudias, aprobarás." },
        ],
      },
      {
        title: "Second conditional: situaciones imaginarias",
        text: "Para algo irreal o poco probable en el presente o el futuro. Se usa pasado tras *if*, aunque no hable del pasado.",
        form: "if + pasado, would + verbo",
        examples: [
          { en: "If I had more time, I would learn Japanese.", es: "Si tuviera más tiempo, aprendería japonés." },
          { en: "If I were you, I'd apologize.", es: "Yo que tú, pediría perdón." },
        ],
      },
      {
        title: "Third conditional: el pasado que no ocurrió",
        text: "Para imaginar un pasado distinto y su resultado. Suele expresar arrepentimiento o crítica.",
        form: "if + had + participio, would have + participio",
        examples: [
          { en: "If we had left earlier, we wouldn't have missed the train.", es: "Si hubiéramos salido antes, no habríamos perdido el tren." },
          { en: "She would have come if you had invited her.", es: "Habría venido si la hubieras invitado." },
        ],
      },
    ],
    mistakes: [
      { wrong: "If it will rain, we'll stay home.", right: "If it rains, we'll stay home.", why: "Tras if no se usa will en el first conditional." },
      { wrong: "If I would have money, I would buy it.", right: "If I had money, I would buy it.", why: "Would va en el resultado, no en la parte con if." },
      { wrong: "If I had known, I would told you.", right: "If I had known, I would have told you.", why: "Third conditional: would have + participio." },
    ],
    practice: [
      {
        id: "p1",
        prompt: "If you ___ the button, the door opens.",
        options: ["press", "will press", "pressed"],
        answer: 0,
        explanation: "Verdad general: zero conditional, presente en las dos partes.",
      },
      {
        id: "p2",
        prompt: "If I ___ rich, I'd travel the world.",
        options: ["am", "were", "will be"],
        answer: 1,
        explanation: "Situación imaginaria: second conditional. Con I, were es la forma estándar en estilo cuidado.",
      },
      {
        id: "p3",
        prompt: "If she ___ harder, she would have passed.",
        options: ["studied", "had studied", "would study"],
        answer: 1,
        explanation: "Pasado que no ocurrió: third conditional (had + participio).",
      },
      {
        id: "p4",
        prompt: "We'll miss the bus if we ___ now.",
        options: ["don't leave", "won't leave", "didn't leave"],
        answer: 0,
        explanation: "First conditional: la parte con if va en presente.",
      },
    ],
  },
  {
    id: "modals-obligation",
    title: "Must, have to, should",
    subtitle: "Obligación, prohibición y consejo",
    level: "B1",
    category: "estructuras",
    minutes: 8,
    summary: "La diferencia clave entre mustn't y don't have to.",
    intro:
      "Estos verbos expresan obligación o consejo, pero con matices. El error más común en español es confundir *mustn't* (prohibido) con *don't have to* (no hace falta).",
    rules: [
      {
        title: "Must y have to: obligación",
        text: "*Must* suele expresar una obligación que siente quien habla o una norma escrita. *Have to* expresa una obligación externa (reglas, trabajo, circunstancias). En pasado solo existe *had to*.",
        examples: [
          { en: "I must call my mom tonight.", es: "Tengo que llamar a mi madre esta noche." },
          { en: "I have to wear a uniform at work.", es: "Tengo que llevar uniforme en el trabajo." },
          { en: "We had to wait for an hour.", es: "Tuvimos que esperar una hora." },
        ],
      },
      {
        title: "Mustn't frente a don't have to",
        text: "*Mustn't* significa que está prohibido. *Don't have to* significa que no es necesario, pero puedes hacerlo si quieres.",
        examples: [
          { en: "You mustn't smoke here.", es: "Aquí no se puede fumar." },
          { en: "You don't have to come if you're busy.", es: "No hace falta que vengas si estás ocupado." },
        ],
      },
      {
        title: "Should y had better: consejo",
        text: "*Should* da un consejo o una recomendación. *Had better* es más fuerte y avisa de una consecuencia si no se hace. Los dos van con el verbo sin *to*.",
        examples: [
          { en: "You should drink more water.", es: "Deberías beber más agua." },
          { en: "You'd better leave now or you'll miss the flight.", es: "Más vale que salgas ya o perderás el vuelo." },
        ],
      },
    ],
    mistakes: [
      { wrong: "You must to be careful.", right: "You must be careful.", why: "Must va sin to." },
      { wrong: "You mustn't pay, it's free.", right: "You don't have to pay, it's free.", why: "No es una prohibición: simplemente no hace falta." },
      { wrong: "Yesterday I must work late.", right: "Yesterday I had to work late.", why: "Must no tiene pasado: se usa had to." },
    ],
    practice: [
      {
        id: "p1",
        prompt: "It's a secret. You ___ tell anyone.",
        options: ["don't have to", "mustn't", "shouldn't to"],
        answer: 1,
        explanation: "Es una prohibición: mustn't.",
      },
      {
        id: "p2",
        prompt: "Tomorrow is a holiday, so I ___ get up early.",
        options: ["mustn't", "don't have to", "have to"],
        answer: 1,
        explanation: "No es necesario madrugar: don't have to.",
      },
      {
        id: "p3",
        prompt: "You look tired. You ___ go to bed.",
        options: ["should", "should to", "must to"],
        answer: 0,
        explanation: "Consejo: should + verbo sin to.",
      },
      {
        id: "p4",
        prompt: "Last week we ___ work on Saturday.",
        options: ["must", "had to", "have to"],
        answer: 1,
        explanation: "Obligación en el pasado: had to.",
      },
    ],
  },
  {
    id: "passive",
    title: "The passive voice",
    subtitle: "La voz pasiva",
    level: "B1",
    category: "estructuras",
    minutes: 8,
    summary: "Cuando importa la acción o quien la recibe, no quién la hace.",
    intro:
      "La pasiva pone el foco en lo que recibe la acción. En inglés es mucho más frecuente que en español, donde solemos usar *se* (*se habla inglés*) o la tercera persona plural (*me robaron*).",
    rules: [
      {
        title: "Forma",
        text: "Se forma con el verbo *be* en el tiempo que corresponda y el participio pasado. Lo que cambia de tiempo es *be*.",
        form: "be (en cualquier tiempo) + participio",
        examples: [
          { en: "English is spoken here.", es: "Aquí se habla inglés." },
          { en: "The bridge was built in 1890.", es: "El puente se construyó en 1890." },
          { en: "The results will be published tomorrow.", es: "Los resultados se publicarán mañana." },
        ],
        table: {
          head: ["Tiempo", "Ejemplo"],
          rows: [
            ["Present simple", "It is made in Spain."],
            ["Past simple", "It was made in 1990."],
            ["Present perfect", "It has been made."],
            ["Future (will)", "It will be made."],
            ["Modales", "It must be made."],
          ],
        },
      },
      {
        title: "Cuándo usarla",
        text: "Cuando no sabemos quién hizo la acción, no importa o es obvio. Si queremos decir quién fue, se añade *by*.",
        examples: [
          { en: "My bike was stolen last night.", es: "Anoche me robaron la bici." },
          { en: "The novel was written by Gabriel García Márquez.", es: "La novela la escribió Gabriel García Márquez." },
        ],
      },
      {
        title: "Have something done",
        text: "Para servicios que otra persona hace por nosotros. Es una estructura muy usada y no tiene equivalente directo en español.",
        form: "have + objeto + participio",
        examples: [
          { en: "I had my hair cut yesterday.", es: "Ayer me corté el pelo (en la peluquería)." },
          { en: "We're having the kitchen painted.", es: "Nos están pintando la cocina." },
        ],
      },
    ],
    mistakes: [
      { wrong: "The house was build in 1990.", right: "The house was built in 1990.", why: "La pasiva usa el participio (built), no la forma base." },
      { wrong: "It was wrote by a famous author.", right: "It was written by a famous author.", why: "El participio de write es written." },
      { wrong: "I cut my hair at the hairdresser's.", right: "I had my hair cut at the hairdresser's.", why: "Si lo hace otra persona: have something done." },
    ],
    practice: [
      {
        id: "p1",
        prompt: "Coffee ___ in Colombia.",
        options: ["grows", "is grown", "is growing"],
        answer: 1,
        explanation: "La gente cultiva el café: pasiva en presente (is grown).",
      },
      {
        id: "p2",
        prompt: "The letter ___ yesterday.",
        options: ["was sent", "has sent", "was send"],
        answer: 0,
        explanation: "Pasiva en past simple: was + participio (sent).",
      },
      {
        id: "p3",
        prompt: "The new hospital ___ next year.",
        options: ["will build", "will be built", "is building"],
        answer: 1,
        explanation: "Pasiva en futuro: will be + participio.",
      },
      {
        id: "p4",
        prompt: "I'm ___ my car repaired this week.",
        options: ["having", "making", "doing"],
        answer: 0,
        explanation: "Have something done: lo hace otra persona por ti.",
      },
    ],
  },
  {
    id: "reported-speech",
    title: "Reported speech",
    subtitle: "Estilo indirecto",
    level: "B2",
    category: "estructuras",
    minutes: 10,
    summary: "Contar lo que otra persona dijo, preguntó o pidió.",
    intro:
      "Cuando contamos lo que alguien dijo, los tiempos suelen dar un paso atrás y cambian pronombres y referencias de tiempo y lugar. Las preguntas pierden su forma de pregunta.",
    rules: [
      {
        title: "Los tiempos dan un paso atrás",
        text: "Si el verbo introductorio está en pasado (*said, told*), el tiempo de lo dicho suele retroceder. Si lo dicho sigue siendo cierto, se puede mantener.",
        examples: [
          { en: "“I'm tired.” → She said she was tired.", es: "Dijo que estaba cansada." },
          { en: "“I'll call you.” → He said he would call me.", es: "Dijo que me llamaría." },
          { en: "“I've lost my keys.” → She said she had lost her keys.", es: "Dijo que había perdido las llaves." },
        ],
        table: {
          head: ["Estilo directo", "Estilo indirecto"],
          rows: [
            ["present simple", "past simple"],
            ["present continuous", "past continuous"],
            ["present perfect / past simple", "past perfect"],
            ["will", "would"],
            ["can", "could"],
            ["today, tomorrow, here", "that day, the next day, there"],
          ],
        },
      },
      {
        title: "Say y tell",
        text: "*Tell* necesita decir a quién (*tell someone*). *Say* no lleva persona, o la lleva con *to*.",
        examples: [
          { en: "She told me she was leaving.", es: "Me dijo que se iba." },
          { en: "She said she was leaving.", es: "Dijo que se iba." },
        ],
      },
      {
        title: "Preguntas indirectas",
        text: "Se pierde el orden de pregunta: sujeto antes del verbo y sin *do/does/did*. Las preguntas de sí o no usan *if* o *whether*.",
        examples: [
          { en: "“Where do you live?” → He asked me where I lived.", es: "Me preguntó dónde vivía." },
          { en: "“Are you coming?” → She asked if I was coming.", es: "Me preguntó si iba a ir." },
        ],
      },
      {
        title: "Órdenes y peticiones",
        text: "Con *tell* o *ask* + persona + *to* + verbo (o *not to* en negativa).",
        examples: [
          { en: "“Sit down.” → The teacher told us to sit down.", es: "El profesor nos dijo que nos sentáramos." },
          { en: "“Please don't be late.” → She asked me not to be late.", es: "Me pidió que no llegara tarde." },
        ],
      },
    ],
    mistakes: [
      { wrong: "She said me that she was busy.", right: "She told me that she was busy.", why: "Con persona se usa tell, no say." },
      { wrong: "He asked me where did I live.", right: "He asked me where I lived.", why: "En la pregunta indirecta no hay inversión ni did." },
      { wrong: "She told me don't worry.", right: "She told me not to worry.", why: "Orden negativa: tell + persona + not to + verbo." },
    ],
    practice: [
      {
        id: "p1",
        prompt: "“I can swim.” → He said he ___ swim.",
        options: ["can", "could", "would can"],
        answer: 1,
        explanation: "Can da un paso atrás a could.",
      },
      {
        id: "p2",
        prompt: "She ___ me the truth.",
        options: ["said", "told", "says to"],
        answer: 1,
        explanation: "Tell + persona: told me.",
      },
      {
        id: "p3",
        prompt: "“What time is it?” → He asked me what time ___.",
        options: ["was it", "it was", "is it"],
        answer: 1,
        explanation: "Pregunta indirecta: sujeto + verbo (it was).",
      },
      {
        id: "p4",
        prompt: "“Don't touch it.” → She told him ___ it.",
        options: ["don't touch", "not touch", "not to touch"],
        answer: 2,
        explanation: "Orden negativa en estilo indirecto: not to + verbo.",
      },
    ],
  },
  {
    id: "relative-clauses",
    title: "Relative clauses",
    subtitle: "Oraciones de relativo: who, which, that, whose",
    level: "B2",
    category: "estructuras",
    minutes: 9,
    summary: "Dar información sobre personas y cosas sin repetir.",
    intro:
      "Las oraciones de relativo añaden información a un sustantivo. En español casi todo se hace con *que*; en inglés el pronombre depende de si hablamos de personas o cosas, y de si la información es esencial o extra.",
    rules: [
      {
        title: "Who, which, that, whose, where",
        text: "*Who* para personas, *which* para cosas, *that* para las dos (en oraciones especificativas), *whose* para posesión y *where* para lugares.",
        examples: [
          { en: "The woman who lives next door is a doctor.", es: "La mujer que vive al lado es médica." },
          { en: "The book that I lent you is mine.", es: "El libro que te presté es mío." },
          { en: "That's the man whose car was stolen.", es: "Ese es el hombre al que le robaron el coche." },
          { en: "This is the café where we met.", es: "Esta es la cafetería donde nos conocimos." },
        ],
      },
      {
        title: "Especificativas: sin comas",
        text: "Dicen de qué persona o cosa hablamos; sin ellas la frase pierde el sentido. No llevan comas. Si el pronombre es objeto del verbo, se puede omitir.",
        examples: [
          { en: "The film (that) we watched was great.", es: "La película que vimos era genial." },
          { en: "People who exercise live longer.", es: "La gente que hace ejercicio vive más." },
        ],
      },
      {
        title: "Explicativas: con comas",
        text: "Añaden información extra. Van entre comas, nunca usan *that* y el pronombre no se puede omitir.",
        examples: [
          { en: "My brother, who lives in Canada, is visiting us.", es: "Mi hermano, que vive en Canadá, viene a visitarnos." },
          { en: "The Thames, which flows through London, is 346 km long.", es: "El Támesis, que atraviesa Londres, mide 346 km." },
        ],
      },
    ],
    mistakes: [
      { wrong: "The man which called you is here.", right: "The man who called you is here.", why: "Para personas: who (o that)." },
      { wrong: "My mother, that is a teacher, …", right: "My mother, who is a teacher, …", why: "En explicativas (con comas) no se usa that." },
      { wrong: "The book that I read it was long.", right: "The book that I read was long.", why: "El pronombre relativo ya sustituye a it: no se repite." },
    ],
    practice: [
      {
        id: "p1",
        prompt: "That's the girl ___ won the prize.",
        options: ["which", "who", "whose"],
        answer: 1,
        explanation: "Persona y sujeto del verbo: who.",
      },
      {
        id: "p2",
        prompt: "I met a man ___ dog speaks.",
        options: ["who", "whose", "which"],
        answer: 1,
        explanation: "Posesión (el perro de él): whose.",
      },
      {
        id: "p3",
        prompt: "Madrid, ___ is the capital of Spain, is very lively.",
        options: ["that", "which", "where"],
        answer: 1,
        explanation: "Explicativa con comas sobre una cosa: which (nunca that).",
      },
      {
        id: "p4",
        prompt: "Which sentence is correct?",
        options: ["The cake you made was delicious.", "The cake you made it was delicious.", "The cake who you made was delicious."],
        answer: 0,
        explanation: "En especificativas se puede omitir el relativo cuando es objeto, y no se repite el pronombre.",
      },
    ],
  },
  {
    id: "gerunds-infinitives",
    title: "Gerunds and infinitives",
    subtitle: "Verbo + -ing o verbo + to",
    level: "B2",
    category: "estructuras",
    minutes: 9,
    summary: "Qué forma va detrás de cada verbo y por qué a veces cambia el sentido.",
    intro:
      "Cuando un verbo va detrás de otro, el inglés exige *-ing* o *to + verbo* según el primero. No hay una regla única: hay grupos frecuentes que conviene memorizar.",
    rules: [
      {
        title: "Verbos seguidos de -ing",
        text: "Entre los más comunes: *enjoy, finish, avoid, mind, suggest, keep, practice, consider, can't stand*. También después de preposiciones.",
        examples: [
          { en: "I enjoy cooking.", es: "Disfruto cocinando." },
          { en: "Would you mind closing the door?", es: "¿Te importaría cerrar la puerta?" },
          { en: "She's good at drawing.", es: "Se le da bien dibujar." },
        ],
      },
      {
        title: "Verbos seguidos de to + verbo",
        text: "Entre los más comunes: *want, decide, hope, plan, agree, refuse, promise, need, manage, would like*.",
        examples: [
          { en: "We decided to stay.", es: "Decidimos quedarnos." },
          { en: "He refused to answer.", es: "Se negó a contestar." },
          { en: "I'd like to order, please.", es: "Me gustaría pedir, por favor." },
        ],
      },
      {
        title: "Verbos que cambian de significado",
        text: "Con *remember, forget, stop* y *try*, la forma cambia el sentido.",
        examples: [
          { en: "I stopped smoking.", es: "Dejé de fumar." },
          { en: "I stopped to smoke.", es: "Me paré para fumar." },
          { en: "Remember to lock the door.", es: "Acuérdate de cerrar la puerta (antes de hacerlo)." },
          { en: "I remember locking the door.", es: "Recuerdo haber cerrado la puerta." },
        ],
      },
    ],
    mistakes: [
      { wrong: "I enjoy to read.", right: "I enjoy reading.", why: "Enjoy va siempre con -ing." },
      { wrong: "I want going home.", right: "I want to go home.", why: "Want va con to + verbo." },
      { wrong: "I'm looking forward to see you.", right: "I'm looking forward to seeing you.", why: "Aquí to es preposición, así que va -ing." },
    ],
    practice: [
      {
        id: "p1",
        prompt: "Have you finished ___ the report?",
        options: ["to write", "writing", "write"],
        answer: 1,
        explanation: "Finish va con -ing.",
      },
      {
        id: "p2",
        prompt: "They agreed ___ us at the station.",
        options: ["meeting", "to meet", "meet"],
        answer: 1,
        explanation: "Agree va con to + verbo.",
      },
      {
        id: "p3",
        prompt: "He stopped ___ a coffee on his way to work. (= paró para tomarlo)",
        options: ["to buy", "buying", "buy"],
        answer: 0,
        explanation: "Stop + to = detenerse para hacer algo.",
      },
      {
        id: "p4",
        prompt: "I'm thinking about ___ a new job.",
        options: ["to get", "get", "getting"],
        answer: 2,
        explanation: "Después de una preposición (about) va -ing.",
      },
    ],
  },
];
