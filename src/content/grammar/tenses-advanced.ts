import type { GrammarLesson } from "./types";

export const advancedTenseLessons: GrammarLesson[] = [
  {
    id: "used-to-would",
    title: "Used to, would and be used to",
    subtitle: "Hábitos del pasado y estar acostumbrado",
    level: "B1",
    category: "tiempos",
    minutes: 9,
    summary: "Tres estructuras parecidas con significados muy distintos.",
    intro:
      "*Used to* habla de lo que solías hacer y ya no haces. *Would* también describe hábitos pasados, pero solo acciones. Y *be used to* no habla del pasado: significa *estar acostumbrado*. Confundirlas es uno de los errores más frecuentes en nivel intermedio.",
    rules: [
      {
        title: "Used to + verbo: hábitos y estados que ya no existen",
        text: "Para cosas que eran verdad en el pasado y ya no lo son, tanto acciones repetidas como estados. En negativas y preguntas se escribe *use to*, porque *did* ya marca el pasado.",
        form: "used to + verbo · didn't use to + verbo · Did … use to + verbo?",
        examples: [
          { en: "I used to play the piano when I was a kid.", es: "De niño tocaba el piano." },
          { en: "She used to live in Chicago.", es: "Antes vivía en Chicago." },
          { en: "We didn't use to have a car.", es: "Antes no teníamos coche." },
          { en: "Did you use to wear glasses?", es: "¿Antes usabas gafas?" },
        ],
      },
      {
        title: "Would + verbo: acciones repetidas en una narración",
        text: "*Would* describe acciones habituales del pasado, sobre todo al contar recuerdos. No sirve para estados: con *live, have, be, know* se usa *used to*.",
        examples: [
          { en: "Every summer we would go to the lake and fish all day.", es: "Cada verano íbamos al lago y pescábamos todo el día." },
          { en: "My grandfather would tell us stories after dinner.", es: "Mi abuelo nos contaba historias después de cenar." },
        ],
        table: {
          head: ["", "used to", "would"],
          rows: [
            ["Acciones repetidas", "✔ I used to walk to school.", "✔ I would walk to school."],
            ["Estados", "✔ I used to have long hair.", "✘ I would have long hair."],
            ["Una sola vez", "✘", "✘ (se usa past simple)"],
          ],
        },
      },
      {
        title: "Be used to + -ing / sustantivo: estar acostumbrado",
        text: "Indica que algo ya no te resulta extraño. Puede ir en cualquier tiempo. Detrás va un sustantivo o un verbo en *-ing*, porque *to* es una preposición.",
        form: "be used to + sustantivo / verbo-ing",
        examples: [
          { en: "I'm used to working at night.", es: "Estoy acostumbrado a trabajar de noche." },
          { en: "She wasn't used to the cold weather.", es: "No estaba acostumbrada al frío." },
        ],
      },
      {
        title: "Get used to: acostumbrarse (el proceso)",
        text: "*Get used to* describe el cambio, el proceso de pasar de lo extraño a lo normal.",
        examples: [
          { en: "You'll get used to driving on the highway.", es: "Te acostumbrarás a conducir por la autopista." },
          { en: "It took me months to get used to the noise.", es: "Tardé meses en acostumbrarme al ruido." },
        ],
      },
    ],
    mistakes: [
      { wrong: "I use to go to the gym every day.", right: "I go to the gym every day.", why: "Para el presente no existe use to: se usa el presente simple (o usually)." },
      { wrong: "I'm used to work late.", right: "I'm used to working late.", why: "Be used to va seguido de -ing." },
      { wrong: "Did you used to smoke?", right: "Did you use to smoke?", why: "Con did, se escribe use to." },
      { wrong: "When I was young I would have a dog.", right: "When I was young I used to have a dog.", why: "Have (poseer) es un estado: would no sirve." },
    ],
    practice: [
      {
        id: "p1",
        prompt: "There ___ a cinema on this street, but it closed years ago.",
        options: ["would be", "used to be", "was used to be"],
        answer: 1,
        explanation: "Estado pasado que ya no existe: used to be. Would no se usa con estados.",
      },
      {
        id: "p2",
        prompt: "After a year in Boston, I'm finally used to ___ snow.",
        options: ["see", "seeing", "saw"],
        answer: 1,
        explanation: "Be used to + -ing.",
      },
      {
        id: "p3",
        prompt: "As children, we ___ hide in the garden for hours.",
        options: ["would", "were used to", "use to"],
        answer: 0,
        explanation: "Acción repetida en un recuerdo: would (también valdría used to).",
      },
      {
        id: "p4",
        prompt: "It's hard at first, but you'll ___ the new schedule.",
        options: ["use to", "get used to", "used to"],
        answer: 1,
        explanation: "El proceso de acostumbrarse: get used to.",
      },
      {
        id: "p5",
        prompt: "She ___ like vegetables, but now she loves them.",
        options: ["didn't use to", "wasn't used to", "wouldn't"],
        answer: 0,
        explanation: "Gusto (estado) del pasado que cambió: didn't use to.",
      },
    ],
  },
  {
    id: "present-perfect-continuous",
    title: "Present perfect continuous",
    subtitle: "Pretérito perfecto continuo: have been doing",
    level: "B1",
    category: "tiempos",
    minutes: 8,
    summary: "La duración de una actividad que empezó en el pasado y llega hasta ahora.",
    intro:
      "El present perfect continuous pone el foco en la actividad y su duración, no en el resultado. Es la forma natural de decir *llevo dos horas esperando*.",
    rules: [
      {
        title: "Forma y uso principal",
        text: "Para actividades que empezaron en el pasado y siguen ahora, o acaban de terminar. Suele ir con *for, since* y *How long…?*",
        form: "have/has been + verbo-ing",
        examples: [
          { en: "I've been waiting for twenty minutes.", es: "Llevo veinte minutos esperando." },
          { en: "How long have you been studying English?", es: "¿Cuánto tiempo llevas estudiando inglés?" },
        ],
      },
      {
        title: "Actividad reciente con consecuencias visibles",
        text: "Explica por qué algo se ve o se nota ahora, aunque la actividad ya haya terminado.",
        examples: [
          { en: "Your eyes are red. Have you been crying?", es: "Tienes los ojos rojos. ¿Has estado llorando?" },
          { en: "The ground is wet. It's been raining.", es: "El suelo está mojado. Ha estado lloviendo." },
        ],
      },
      {
        title: "Continuo frente a simple: actividad o resultado",
        text: "El continuo responde a *cuánto tiempo*; el simple, a *cuánto* o *cuántos*, o al resultado terminado. Con verbos de estado (*know, have, like*) se usa siempre el simple.",
        examples: [
          { en: "I've been writing emails all morning.", es: "Me he pasado la mañana escribiendo correos." },
          { en: "I've written fifteen emails.", es: "He escrito quince correos." },
          { en: "We've known each other since college.", es: "Nos conocemos desde la universidad." },
        ],
      },
    ],
    mistakes: [
      { wrong: "I'm waiting here for an hour.", right: "I've been waiting here for an hour.", why: "Duración hasta ahora: present perfect continuous, no presente continuo." },
      { wrong: "I've been knowing her for years.", right: "I've known her for years.", why: "Know es un verbo de estado." },
      { wrong: "I've been reading three books this month.", right: "I've read three books this month.", why: "Si cuentas cuántos (resultado), va el simple." },
    ],
    practice: [
      {
        id: "p1",
        prompt: "She's tired because she ___ all day.",
        options: ["has been working", "is working", "works"],
        answer: 0,
        explanation: "Actividad reciente que explica el cansancio actual.",
      },
      {
        id: "p2",
        prompt: "How many cups of coffee ___ today?",
        options: ["have you been drinking", "have you drunk", "are you drinking"],
        answer: 1,
        explanation: "Pregunta por una cantidad (resultado): present perfect simple.",
      },
      {
        id: "p3",
        prompt: "They ___ married since 2010.",
        options: ["have been being", "have been", "are"],
        answer: 1,
        explanation: "Be married es un estado: present perfect simple con since.",
      },
      {
        id: "p4",
        prompt: "I ___ this book for weeks and I'm still only halfway through.",
        options: ["have read", "have been reading", "read"],
        answer: 1,
        explanation: "Actividad en curso, sin terminar, con duración: continuo.",
      },
    ],
  },
  {
    id: "past-perfect",
    title: "Past perfect simple and continuous",
    subtitle: "Pluscuamperfecto: had done y had been doing",
    level: "B2",
    category: "tiempos",
    minutes: 9,
    summary: "El pasado anterior a otro momento del pasado.",
    intro:
      "El past perfect sitúa una acción antes de otro punto del pasado. Equivale a *había hecho*. Es imprescindible para contar historias con orden y en el estilo indirecto.",
    rules: [
      {
        title: "Past perfect simple: lo que ya había pasado",
        text: "Para dejar claro que una acción ocurrió antes que otra, también en pasado.",
        form: "had + participio",
        examples: [
          { en: "When we arrived, the movie had already started.", es: "Cuando llegamos, la película ya había empezado." },
          { en: "She had never flown before her trip to Japan.", es: "Nunca había volado antes de su viaje a Japón." },
        ],
      },
      {
        title: "Cuándo hace falta y cuándo no",
        text: "Si el orden ya queda claro con *before, after* o con el orden de la frase, el past simple suele bastar. El past perfect es necesario cuando, sin él, la secuencia sería ambigua.",
        examples: [
          { en: "When I got home, my sister left.", es: "Cuando llegué, mi hermana se fue (después)." },
          { en: "When I got home, my sister had left.", es: "Cuando llegué, mi hermana ya se había ido (antes)." },
        ],
      },
      {
        title: "Past perfect continuous: duración antes de un momento pasado",
        text: "Para una actividad que llevaba tiempo ocurriendo hasta cierto punto del pasado, o que explica una situación pasada.",
        form: "had been + verbo-ing",
        examples: [
          { en: "We had been driving for six hours when the car broke down.", es: "Llevábamos seis horas conduciendo cuando se averió el coche." },
          { en: "He was exhausted because he had been studying all night.", es: "Estaba agotado porque se había pasado la noche estudiando." },
        ],
      },
    ],
    mistakes: [
      { wrong: "I had seen him yesterday.", right: "I saw him yesterday.", why: "Sin un segundo momento pasado de referencia, basta el past simple." },
      { wrong: "When I arrived, she already left.", right: "When I arrived, she had already left.", why: "Ya se había ido antes de que llegaras: past perfect." },
      { wrong: "I had been knowing him for years.", right: "I had known him for years.", why: "Know es un verbo de estado." },
    ],
    practice: [
      {
        id: "p1",
        prompt: "By the time the police arrived, the thief ___.",
        options: ["escaped", "had escaped", "has escaped"],
        answer: 1,
        explanation: "La huida ocurrió antes de la llegada de la policía.",
      },
      {
        id: "p2",
        prompt: "Her hands were dirty because she ___ in the garden.",
        options: ["had been working", "has worked", "was work"],
        answer: 0,
        explanation: "Actividad con duración que explica una situación pasada.",
      },
      {
        id: "p3",
        prompt: "I didn't recognize him. He ___ a lot.",
        options: ["changed", "had changed", "has changed"],
        answer: 1,
        explanation: "El cambio fue anterior al momento de no reconocerlo.",
      },
      {
        id: "p4",
        prompt: "She told me she ___ the report the day before.",
        options: ["has finished", "had finished", "finishes"],
        answer: 1,
        explanation: "Estilo indirecto: un pasado anterior al momento en que lo dijo.",
      },
    ],
  },
  {
    id: "future-continuous-perfect",
    title: "Future continuous and future perfect",
    subtitle: "Futuro continuo y futuro perfecto",
    level: "B2",
    category: "tiempos",
    minutes: 8,
    summary: "Lo que estará pasando y lo que ya habrá pasado.",
    intro:
      "Estos futuros sitúan una acción respecto a un momento concreto del futuro: estará en curso (*will be doing*) o ya habrá terminado (*will have done*).",
    rules: [
      {
        title: "Future continuous: en curso en un momento futuro",
        text: "Para algo que estará pasando en un momento concreto del futuro. También para preguntar planes con cortesía.",
        form: "will be + verbo-ing",
        examples: [
          { en: "This time tomorrow I'll be flying to Denver.", es: "Mañana a esta hora estaré volando a Denver." },
          { en: "Will you be using the car tonight?", es: "¿Vas a usar el coche esta noche?" },
        ],
      },
      {
        title: "Future perfect: terminado antes de un momento futuro",
        text: "Para algo que ya habrá terminado antes de cierto momento. Suele ir con *by* (*para*) o *by the time*.",
        form: "will have + participio",
        examples: [
          { en: "By June, I'll have finished my degree.", es: "Para junio habré terminado la carrera." },
          { en: "The movie will have started by the time we get there.", es: "La película habrá empezado cuando lleguemos." },
        ],
      },
      {
        title: "Future perfect continuous: duración hasta un momento futuro",
        text: "Para la duración de una actividad hasta un momento del futuro.",
        form: "will have been + verbo-ing",
        examples: [
          { en: "In May, I'll have been working here for ten years.", es: "En mayo hará diez años que trabajo aquí." },
        ],
      },
    ],
    mistakes: [
      { wrong: "By next year I will finish my studies.", right: "By next year I will have finished my studies.", why: "Con by + momento futuro, para lo ya terminado: future perfect." },
      { wrong: "By the time you will arrive, I'll have left.", right: "By the time you arrive, I'll have left.", why: "Tras by the time (y when, before…) va presente, no will." },
    ],
    practice: [
      {
        id: "p1",
        prompt: "Don't call at 8. We ___ dinner.",
        options: ["will have", "will be having", "will have had"],
        answer: 1,
        explanation: "Acción en curso en un momento futuro: future continuous.",
      },
      {
        id: "p2",
        prompt: "By 2030, scientists ___ a cure, I hope.",
        options: ["will have found", "will be finding", "find"],
        answer: 0,
        explanation: "Terminado antes de un momento futuro: future perfect.",
      },
      {
        id: "p3",
        prompt: "Next month she ___ here for exactly a year.",
        options: ["will be working", "will have been working", "works"],
        answer: 1,
        explanation: "Duración hasta un momento futuro: future perfect continuous.",
      },
      {
        id: "p4",
        prompt: "I'll call you as soon as I ___.",
        options: ["will land", "land", "will have landed"],
        answer: 1,
        explanation: "En oraciones de tiempo (as soon as, when) se usa presente con valor futuro.",
      },
    ],
  },
];
