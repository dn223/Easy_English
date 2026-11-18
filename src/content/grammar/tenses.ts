import type { GrammarLesson } from "./types";

export const tenseLessons: GrammarLesson[] = [
  {
    id: "present-simple-continuous",
    title: "Present simple and present continuous",
    subtitle: "Presente simple y presente continuo",
    level: "A2",
    category: "tiempos",
    minutes: 8,
    summary: "Hábitos y verdades frente a lo que pasa ahora o es temporal.",
    intro:
      "En español decimos *trabajo* tanto para un hábito como para algo que hacemos ahora mismo. En inglés hay dos tiempos distintos, y elegir bien depende de si la acción es habitual o está en curso.",
    rules: [
      {
        title: "Present simple: hábitos, rutinas y verdades",
        text: "Se usa para lo que pasa con regularidad, para hechos que siempre son ciertos y para horarios fijos. Con *he, she, it* el verbo lleva *-s* o *-es*.",
        form: "sujeto + verbo (+ -s con he/she/it)",
        examples: [
          { en: "I walk to work every day.", es: "Voy caminando al trabajo todos los días." },
          { en: "Water boils at 100 degrees.", es: "El agua hierve a 100 grados." },
          { en: "The train leaves at 7:15.", es: "El tren sale a las 7:15." },
        ],
      },
      {
        title: "Negativas y preguntas con do / does",
        text: "En negativas y preguntas aparece el auxiliar *do* o *does*, y el verbo principal vuelve a su forma base, sin *-s*.",
        form: "do/does + not + verbo · Do/Does + sujeto + verbo?",
        examples: [
          { en: "She doesn't eat meat.", es: "Ella no come carne." },
          { en: "Do you speak French?", es: "¿Hablas francés?" },
          { en: "Where does he live?", es: "¿Dónde vive él?" },
        ],
      },
      {
        title: "Present continuous: lo que pasa ahora o es temporal",
        text: "Se usa para acciones en curso en este momento, para situaciones temporales y para cambios que están ocurriendo.",
        form: "am/is/are + verbo-ing",
        examples: [
          { en: "I'm reading a really good book at the moment.", es: "Ahora estoy leyendo un libro muy bueno." },
          { en: "She's staying with her parents this week.", es: "Esta semana se está quedando con sus padres." },
          { en: "Prices are going up.", es: "Los precios están subiendo." },
        ],
      },
      {
        title: "Verbos de estado: casi nunca en continuo",
        text: "Los verbos que expresan estados y no acciones (*know, like, want, need, believe, understand, belong*) normalmente no se usan en continuo, aunque hablen del momento presente.",
        examples: [
          { en: "I know the answer.", es: "Sé la respuesta." },
          { en: "Do you understand?", es: "¿Entiendes?" },
          { en: "This bag belongs to Maria.", es: "Esta bolsa es de María." },
        ],
      },
    ],
    mistakes: [
      { wrong: "She work in a bank.", right: "She works in a bank.", why: "Con he/she/it el verbo lleva -s en presente simple." },
      { wrong: "I am knowing the answer.", right: "I know the answer.", why: "Know es un verbo de estado: no va en continuo." },
      { wrong: "Does she works here?", right: "Does she work here?", why: "Con does, el verbo principal va en forma base." },
      { wrong: "I'm agree with you.", right: "I agree with you.", why: "Agree es un verbo, no un adjetivo: no lleva am." },
    ],
    practice: [
      {
        id: "p1",
        prompt: "Look! It ___ outside.",
        options: ["snows", "is snowing", "snow"],
        answer: 1,
        explanation: "“Look!” indica que pasa ahora mismo: present continuous.",
      },
      {
        id: "p2",
        prompt: "My brother ___ in Madrid.",
        options: ["live", "lives", "is live"],
        answer: 1,
        explanation: "Situación permanente y sujeto he/she/it: lives.",
      },
      {
        id: "p3",
        prompt: "I ___ what you mean.",
        options: ["am understanding", "understand", "understands"],
        answer: 1,
        explanation: "Understand es un verbo de estado y el sujeto es I: understand.",
      },
      {
        id: "p4",
        prompt: "___ your sister like coffee?",
        options: ["Do", "Is", "Does"],
        answer: 2,
        explanation: "Pregunta en presente simple con sujeto your sister (= she): Does.",
      },
    ],
  },
  {
    id: "past-simple-continuous",
    title: "Past simple and past continuous",
    subtitle: "Pasado simple y pasado continuo",
    level: "A2",
    category: "tiempos",
    minutes: 8,
    summary: "Acciones terminadas frente a acciones en curso en el pasado.",
    intro:
      "El past simple equivale casi siempre al pretérito (*fui, comí*), y el past continuous al imperfecto en curso (*estaba comiendo*). Juntos sirven para contar historias: una acción de fondo interrumpida por otra.",
    rules: [
      {
        title: "Past simple: acciones terminadas",
        text: "Para acciones completas en un momento del pasado. Los verbos regulares añaden *-ed*; los irregulares hay que aprenderlos (*go → went, see → saw, buy → bought*).",
        form: "sujeto + verbo-ed / forma irregular",
        examples: [
          { en: "We visited Lisbon last summer.", es: "Visitamos Lisboa el verano pasado." },
          { en: "She bought a new phone yesterday.", es: "Ayer se compró un móvil nuevo." },
        ],
      },
      {
        title: "Negativas y preguntas con did",
        text: "*Did* ya marca el pasado, así que el verbo principal vuelve a la forma base.",
        form: "did not (didn't) + verbo · Did + sujeto + verbo?",
        examples: [
          { en: "I didn't see the message.", es: "No vi el mensaje." },
          { en: "Did you go to the party?", es: "¿Fuiste a la fiesta?" },
        ],
      },
      {
        title: "Past continuous: acción en curso",
        text: "Para algo que estaba pasando en un momento concreto del pasado, o como fondo de otra acción.",
        form: "was/were + verbo-ing",
        examples: [
          { en: "At eight o'clock I was having dinner.", es: "A las ocho estaba cenando." },
          { en: "They were watching TV all evening.", es: "Estuvieron viendo la tele toda la tarde." },
        ],
      },
      {
        title: "When y while: una acción interrumpe a otra",
        text: "La acción larga va en past continuous y la corta, que la interrumpe, en past simple. *While* suele ir con la larga y *when* con la corta.",
        examples: [
          { en: "I was cooking when the phone rang.", es: "Estaba cocinando cuando sonó el teléfono." },
          { en: "While she was driving, it started to rain.", es: "Mientras conducía, empezó a llover." },
        ],
      },
    ],
    mistakes: [
      { wrong: "Did you saw the film?", right: "Did you see the film?", why: "Con did, el verbo va en forma base." },
      { wrong: "I was go to the cinema.", right: "I went to the cinema.", why: "Para una acción terminada se usa el past simple, no was + verbo." },
      { wrong: "When I arrived, they had dinner.", right: "When I arrived, they were having dinner.", why: "La cena ya estaba en curso: past continuous." },
    ],
    practice: [
      {
        id: "p1",
        prompt: "I ___ my keys yesterday.",
        options: ["lose", "lost", "was losing"],
        answer: 1,
        explanation: "Acción puntual y terminada en el pasado: past simple (lose → lost).",
      },
      {
        id: "p2",
        prompt: "She was sleeping when the alarm ___.",
        options: ["went off", "was going off", "goes off"],
        answer: 0,
        explanation: "La acción corta que interrumpe va en past simple.",
      },
      {
        id: "p3",
        prompt: "What ___ at 10 p.m. last night?",
        options: ["did you do", "were you doing", "you did"],
        answer: 1,
        explanation: "Pregunta por una acción en curso en un momento concreto: past continuous.",
      },
      {
        id: "p4",
        prompt: "We ___ the museum because it was closed.",
        options: ["didn't visit", "didn't visited", "not visited"],
        answer: 0,
        explanation: "Negativa en pasado: didn't + forma base.",
      },
    ],
  },
  {
    id: "present-perfect",
    title: "Present perfect vs past simple",
    subtitle: "Pretérito perfecto frente a pasado simple",
    level: "B1",
    category: "tiempos",
    minutes: 10,
    summary: "Cuándo el pasado conecta con el presente y cuándo no.",
    intro:
      "El present perfect (*have done*) une el pasado con el presente: experiencias sin fecha, resultados que se notan ahora o situaciones que siguen. Si dices cuándo pasó, el inglés pide past simple, aunque en español uses *he hecho*.",
    rules: [
      {
        title: "Forma",
        text: "Se construye con *have/has* y el participio pasado. Los regulares terminan en *-ed*; los irregulares tienen su propia forma (*go → gone, see → seen, write → written*).",
        form: "have/has + participio",
        examples: [
          { en: "I have finished my homework.", es: "He terminado los deberes." },
          { en: "She hasn't called yet.", es: "Todavía no ha llamado." },
        ],
      },
      {
        title: "Experiencias sin momento concreto",
        text: "Para lo que has hecho alguna vez en la vida, sin decir cuándo. Suele ir con *ever* y *never*.",
        examples: [
          { en: "Have you ever been to Mexico?", es: "¿Has estado alguna vez en México?" },
          { en: "I've never seen snow.", es: "Nunca he visto la nieve." },
        ],
      },
      {
        title: "Situaciones que empezaron en el pasado y siguen",
        text: "Con *for* (duración) y *since* (punto de inicio). Aquí el español usa el presente (*vivo aquí desde 2020*), pero el inglés pide present perfect.",
        examples: [
          { en: "I've lived here since 2020.", es: "Vivo aquí desde 2020." },
          { en: "We've known each other for ten years.", es: "Nos conocemos desde hace diez años." },
        ],
      },
      {
        title: "Con un momento terminado: past simple",
        text: "Si aparece un tiempo ya cerrado (*yesterday, last year, in 2019, two days ago, when I was a child*), se usa past simple.",
        examples: [
          { en: "I saw that film last week.", es: "Vi esa película la semana pasada." },
          { en: "She moved to London in 2019.", es: "Se mudó a Londres en 2019." },
        ],
        table: {
          head: ["Present perfect", "Past simple"],
          rows: [
            ["ever, never, already, yet, just", "yesterday, last week, ago"],
            ["for, since (sigue ahora)", "in 2019, when I was young"],
            ["this week (aún no termina)", "Preguntas con When…?"],
          ],
        },
      },
    ],
    mistakes: [
      { wrong: "I have seen him yesterday.", right: "I saw him yesterday.", why: "Yesterday es un tiempo terminado: past simple." },
      { wrong: "I live here since 2020.", right: "I've lived here since 2020.", why: "Situación que empezó en el pasado y sigue: present perfect." },
      { wrong: "When have you arrived?", right: "When did you arrive?", why: "Las preguntas con When piden past simple." },
      { wrong: "I have 25 years.", right: "I am 25 (years old).", why: "La edad se dice con be, no con have." },
    ],
    practice: [
      {
        id: "p1",
        prompt: "I ___ to Japan twice.",
        options: ["went", "have been", "was"],
        answer: 1,
        explanation: "Experiencia de vida sin fecha concreta: present perfect.",
      },
      {
        id: "p2",
        prompt: "They ___ married in 2015.",
        options: ["have got", "got", "have been getting"],
        answer: 1,
        explanation: "In 2015 es un momento terminado: past simple.",
      },
      {
        id: "p3",
        prompt: "She has worked here ___ three years.",
        options: ["since", "for", "during"],
        answer: 1,
        explanation: "For + duración (three years); since + punto de inicio.",
      },
      {
        id: "p4",
        prompt: "___ you ever ___ sushi?",
        options: ["Did / eat", "Have / eaten", "Have / ate"],
        answer: 1,
        explanation: "Experiencia de vida con ever: present perfect (have + participio eaten).",
      },
    ],
  },
  {
    id: "future-forms",
    title: "Future forms",
    subtitle: "Will, going to y presente continuo para el futuro",
    level: "B1",
    category: "tiempos",
    minutes: 9,
    summary: "Decisiones, planes, predicciones y citas acordadas.",
    intro:
      "El inglés no tiene un único futuro. La forma depende de si decides en el momento, si ya lo tenías planeado o si ya está organizado con otras personas.",
    rules: [
      {
        title: "Will: decisiones del momento, ofrecimientos y promesas",
        text: "Para algo que decides al hablar, para ofrecer ayuda o prometer. También para predicciones basadas en opinión.",
        form: "will + verbo",
        examples: [
          { en: "It's cold. I'll close the window.", es: "Hace frío. Cierro la ventana." },
          { en: "I'll help you with your bags.", es: "Te ayudo con las maletas." },
          { en: "I think she'll win.", es: "Creo que ganará." },
        ],
      },
      {
        title: "Going to: planes e intenciones, y predicciones con pruebas",
        text: "Para algo que ya habías decidido antes de hablar, o cuando ves señales claras de lo que va a pasar.",
        form: "am/is/are going to + verbo",
        examples: [
          { en: "I'm going to study medicine.", es: "Voy a estudiar medicina." },
          { en: "Look at those clouds. It's going to rain.", es: "Mira esas nubes. Va a llover." },
        ],
      },
      {
        title: "Present continuous: citas y planes acordados",
        text: "Para planes ya organizados, con hora, lugar u otra persona implicada.",
        examples: [
          { en: "I'm meeting Tom at six.", es: "He quedado con Tom a las seis." },
          { en: "We're flying to Rome on Friday.", es: "Volamos a Roma el viernes." },
        ],
      },
    ],
    mistakes: [
      { wrong: "I will to call you.", right: "I will call you.", why: "Will va seguido del verbo sin to." },
      { wrong: "Tomorrow I go to the dentist at 3.", right: "Tomorrow I'm going to the dentist at 3.", why: "Cita acordada: present continuous." },
      { wrong: "I'm going to help you! (al ver que alguien no puede)", right: "I'll help you!", why: "Ofrecimiento decidido en el momento: will." },
    ],
    practice: [
      {
        id: "p1",
        prompt: "The phone's ringing. — I ___ get it.",
        options: ["'ll", "'m going to", "'m getting"],
        answer: 0,
        explanation: "Decisión tomada en el momento: will.",
      },
      {
        id: "p2",
        prompt: "She ___ a baby. She's due in May.",
        options: ["will have", "is going to have", "has"],
        answer: 1,
        explanation: "Predicción con pruebas claras: going to.",
      },
      {
        id: "p3",
        prompt: "We ___ dinner with the Smiths on Saturday. It's all arranged.",
        options: ["have", "will have", "are having"],
        answer: 2,
        explanation: "Plan acordado con otras personas: present continuous.",
      },
      {
        id: "p4",
        prompt: "I've decided. I ___ a new laptop next month.",
        options: ["'m going to buy", "'ll buy", "buy"],
        answer: 0,
        explanation: "Plan decidido antes de hablar: going to.",
      },
    ],
  },
];
