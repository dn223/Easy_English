import type { GrammarLesson } from "./types";

export const advancedStructureLessons: GrammarLesson[] = [
  {
    id: "modals-deduction",
    title: "Modals of deduction",
    subtitle: "Must, might, can't (have): suposiciones y deducciones",
    level: "B2",
    category: "estructuras",
    minutes: 9,
    summary: "Qué tan seguro estás de algo, en presente y en pasado.",
    intro:
      "Los modales sirven para expresar cuán seguro estás de una conclusión. En presente van con el verbo base; para hablar del pasado, con *have + participio*.",
    rules: [
      {
        title: "Presente: must, might/may/could, can't",
        text: "*Must* = estoy casi seguro de que sí. *Might, may, could* = es posible. *Can't* = estoy casi seguro de que no. Ojo: lo contrario de *must* en deducción es *can't*, no *mustn't*.",
        form: "modal + verbo (o be + -ing)",
        examples: [
          { en: "She must be at home. Her car is outside.", es: "Debe de estar en casa. Su coche está fuera." },
          { en: "He might be stuck in traffic.", es: "Puede que esté atascado en el tráfico." },
          { en: "That can't be Tom. He's in Spain this week.", es: "Ese no puede ser Tom. Está en España esta semana." },
        ],
        table: {
          head: ["Seguridad", "Presente", "Pasado"],
          rows: [
            ["Casi seguro que sí", "must be", "must have been"],
            ["Es posible", "might / may / could be", "might / may / could have been"],
            ["Casi seguro que no", "can't / couldn't be", "can't / couldn't have been"],
          ],
        },
      },
      {
        title: "Pasado: modal + have + participio",
        text: "La misma escala, aplicada a algo que ya pasó.",
        form: "must / might / can't + have + participio",
        examples: [
          { en: "The streets are wet. It must have rained last night.", es: "Las calles están mojadas. Debe de haber llovido anoche." },
          { en: "I can't find my keys. I might have left them at work.", es: "No encuentro las llaves. Puede que las haya dejado en el trabajo." },
          { en: "She can't have seen us, or she would have said hello.", es: "No puede habernos visto; si no, nos habría saludado." },
        ],
      },
      {
        title: "Should have / could have: crítica y oportunidades perdidas",
        text: "*Should have + participio* expresa arrepentimiento o crítica: era lo correcto y no se hizo. *Could have* indica que era posible, pero no ocurrió.",
        examples: [
          { en: "You should have told me earlier.", es: "Deberías habérmelo dicho antes." },
          { en: "We could have won if we'd trained harder.", es: "Podríamos haber ganado si hubiéramos entrenado más." },
        ],
      },
    ],
    mistakes: [
      { wrong: "He mustn't be at home; the lights are off.", right: "He can't be at home; the lights are off.", why: "Para deducir que no, se usa can't." },
      { wrong: "She must have went home.", right: "She must have gone home.", why: "Detrás de have va el participio (gone)." },
      { wrong: "You should told me.", right: "You should have told me.", why: "Para el pasado: should have + participio." },
    ],
    practice: [
      {
        id: "p1",
        prompt: "He's been working for 14 hours. He ___ exhausted.",
        options: ["can't be", "must be", "should have been"],
        answer: 1,
        explanation: "Conclusión casi segura en presente: must be.",
      },
      {
        id: "p2",
        prompt: "She ___ the email. She replied five minutes later.",
        options: ["must have read", "can't have read", "might read"],
        answer: 0,
        explanation: "Deducción segura sobre el pasado: must have + participio.",
      },
      {
        id: "p3",
        prompt: "That ___ the right answer. It doesn't make any sense.",
        options: ["mustn't be", "can't be", "might have been"],
        answer: 1,
        explanation: "Seguro de que no, en presente: can't be.",
      },
      {
        id: "p4",
        prompt: "I failed. I ___ more.",
        options: ["should study", "should have studied", "must have studied"],
        answer: 1,
        explanation: "Arrepentimiento sobre el pasado: should have + participio.",
      },
      {
        id: "p5",
        prompt: "Where's Ana? — I'm not sure. She ___ gone to the library.",
        options: ["might have", "must", "can't"],
        answer: 0,
        explanation: "Posibilidad en el pasado: might have + participio.",
      },
    ],
  },
  {
    id: "wishes",
    title: "Wish and if only",
    subtitle: "Deseos y lamentos",
    level: "B2",
    category: "estructuras",
    minutes: 8,
    summary: "Desear que el presente o el pasado fueran distintos.",
    intro:
      "Con *wish* e *if only* expresamos deseos sobre situaciones irreales. Como en las condicionales, el verbo da un paso atrás: presente → pasado, pasado → past perfect.",
    rules: [
      {
        title: "Deseos sobre el presente: wish + pasado",
        text: "Para algo que es distinto de lo que te gustaría ahora. Con *be*, en estilo cuidado se usa *were* con todas las personas.",
        form: "wish + past simple",
        examples: [
          { en: "I wish I had more free time.", es: "Ojalá tuviera más tiempo libre." },
          { en: "I wish I were taller.", es: "Ojalá fuera más alto." },
        ],
      },
      {
        title: "Lamentos sobre el pasado: wish + past perfect",
        text: "Para arrepentirse de algo que pasó o no pasó.",
        form: "wish + had + participio",
        examples: [
          { en: "I wish I had studied harder.", es: "Ojalá hubiera estudiado más." },
          { en: "She wishes she hadn't said that.", es: "Le gustaría no haber dicho eso." },
        ],
      },
      {
        title: "Quejas sobre el comportamiento de otros: wish + would",
        text: "Para algo que te molesta y que te gustaría que otra persona cambiara. No se usa con *I* ni *we* como sujeto del segundo verbo.",
        form: "wish + persona + would + verbo",
        examples: [
          { en: "I wish you would stop interrupting me.", es: "Ojalá dejaras de interrumpirme." },
          { en: "I wish it would stop raining.", es: "Ojalá dejara de llover." },
        ],
      },
      {
        title: "If only: más intenso",
        text: "*If only* funciona igual que *wish*, pero con más emoción.",
        examples: [
          { en: "If only I knew the answer!", es: "¡Si al menos supiera la respuesta!" },
          { en: "If only we had left earlier!", es: "¡Si hubiéramos salido antes!" },
        ],
      },
    ],
    mistakes: [
      { wrong: "I wish I have a car.", right: "I wish I had a car.", why: "Deseo sobre el presente: pasado." },
      { wrong: "I wish I would be rich.", right: "I wish I were rich.", why: "Would no se usa para deseos sobre uno mismo." },
      { wrong: "I wish I didn't eat so much last night.", right: "I wish I hadn't eaten so much last night.", why: "Lamento sobre el pasado: past perfect." },
    ],
    practice: [
      {
        id: "p1",
        prompt: "I wish I ___ how to swim.",
        options: ["know", "knew", "would know"],
        answer: 1,
        explanation: "Deseo sobre el presente: past simple.",
      },
      {
        id: "p2",
        prompt: "He wishes he ___ that job offer last year.",
        options: ["accepted", "had accepted", "would accept"],
        answer: 1,
        explanation: "Lamento sobre el pasado: had + participio.",
      },
      {
        id: "p3",
        prompt: "I wish my neighbors ___ so much noise.",
        options: ["wouldn't make", "don't make", "hadn't made"],
        answer: 0,
        explanation: "Queja sobre el comportamiento de otros: wouldn't + verbo.",
      },
      {
        id: "p4",
        prompt: "If only I ___ so tired right now!",
        options: ["am not", "wasn't", "hadn't been"],
        answer: 1,
        explanation: "Deseo sobre el presente: pasado (también valdría weren't).",
      },
    ],
  },
  {
    id: "mixed-conditionals",
    title: "Mixed conditionals and alternatives to if",
    subtitle: "Condicionales mixtas, unless, provided that, inversión",
    level: "C1",
    category: "estructuras",
    minutes: 10,
    summary: "Combinar pasado y presente, y otras formas de expresar condición.",
    intro:
      "En el habla real las condiciones se mezclan: un pasado diferente puede cambiar el presente, y un rasgo permanente puede explicar un pasado. Además, *if* no es la única forma de expresar una condición.",
    rules: [
      {
        title: "Pasado irreal con resultado presente",
        text: "La condición es un pasado que no ocurrió y el resultado se nota ahora.",
        form: "if + had + participio, would + verbo",
        examples: [
          { en: "If I had taken that job, I would live in Seattle now.", es: "Si hubiera aceptado ese trabajo, ahora viviría en Seattle." },
          { en: "If she hadn't missed the flight, she would be here.", es: "Si no hubiera perdido el vuelo, estaría aquí." },
        ],
      },
      {
        title: "Presente irreal con resultado pasado",
        text: "La condición es una situación general irreal (un rasgo, una habilidad) y el resultado es un pasado distinto.",
        form: "if + past simple, would have + participio",
        examples: [
          { en: "If I spoke French, I would have understood the guide.", es: "Si hablara francés, habría entendido al guía." },
          { en: "If he weren't so shy, he would have asked her out.", es: "Si no fuera tan tímido, la habría invitado a salir." },
        ],
      },
      {
        title: "Unless, provided that, as long as, in case",
        text: "*Unless* = a menos que (si no). *Provided (that)* y *as long as* = siempre que, con la condición de. *In case* = por si acaso: no es una condición, es una precaución.",
        examples: [
          { en: "You won't pass unless you study.", es: "No aprobarás a menos que estudies." },
          { en: "You can borrow my car as long as you're careful.", es: "Puedes llevarte mi coche siempre que tengas cuidado." },
          { en: "Take an umbrella in case it rains.", es: "Llévate un paraguas por si llueve." },
        ],
      },
      {
        title: "Condición con inversión (formal)",
        text: "En registro formal se puede quitar *if* e invertir el auxiliar: *Had I known* = *If I had known*; *Should you need* = *If you need*; *Were I* = *If I were*.",
        examples: [
          { en: "Had I known about the delay, I would have taken a later train.", es: "De haber sabido lo del retraso, habría tomado un tren más tarde." },
          { en: "Should you have any questions, please contact us.", es: "Si tiene alguna pregunta, contáctenos." },
          { en: "Were I in your position, I would accept the offer.", es: "Si yo estuviera en tu lugar, aceptaría la oferta." },
        ],
      },
    ],
    mistakes: [
      { wrong: "Unless you don't hurry, you'll be late.", right: "Unless you hurry, you'll be late.", why: "Unless ya es negativo (= if not)." },
      { wrong: "If I would have known, I would have come.", right: "If I had known, I would have come.", why: "En la condición no va would." },
      { wrong: "Had I know, I would have helped.", right: "Had I known, I would have helped.", why: "Inversión con had + participio." },
    ],
    practice: [
      {
        id: "p1",
        prompt: "If I ___ breakfast, I wouldn't be so hungry now.",
        options: ["ate", "had eaten", "would eat"],
        answer: 1,
        explanation: "Pasado irreal con resultado presente: if + had + participio.",
      },
      {
        id: "p2",
        prompt: "If she were more organized, she ___ the deadline last week.",
        options: ["wouldn't miss", "wouldn't have missed", "didn't miss"],
        answer: 1,
        explanation: "Rasgo general irreal con resultado pasado: would have + participio.",
      },
      {
        id: "p3",
        prompt: "I'll lend you the money ___ you pay me back by Friday.",
        options: ["unless", "provided that", "in case"],
        answer: 1,
        explanation: "Condición necesaria: provided that (siempre que).",
      },
      {
        id: "p4",
        prompt: "___ any problems, call the front desk.",
        options: ["Should you have", "Had you", "Unless you have"],
        answer: 0,
        explanation: "Inversión formal: Should you have = If you have.",
      },
      {
        id: "p5",
        prompt: "Write down my number ___ you get lost.",
        options: ["unless", "in case", "as long as"],
        answer: 1,
        explanation: "Precaución: in case (por si).",
      },
    ],
  },
  {
    id: "inversion",
    title: "Inversion for emphasis",
    subtitle: "Inversión: Never have I…, Not only…, Rarely…",
    level: "C1",
    category: "estructuras",
    minutes: 8,
    summary: "Cómo dar énfasis en inglés formal cambiando el orden.",
    intro:
      "Cuando una frase empieza con una expresión negativa o restrictiva, el inglés formal invierte sujeto y auxiliar, como en una pregunta. Es típico de discursos, textos académicos y escritura cuidada.",
    rules: [
      {
        title: "Expresiones negativas al principio",
        text: "Con *never, rarely, seldom, hardly ever, at no time, under no circumstances*, el auxiliar va antes del sujeto. Si no hay auxiliar, se añade *do/does/did*.",
        form: "expresión negativa + auxiliar + sujeto + verbo",
        examples: [
          { en: "Never have I seen such a beautiful sunset.", es: "Nunca he visto una puesta de sol tan bonita." },
          { en: "Rarely do we get the chance to travel together.", es: "Rara vez tenemos la oportunidad de viajar juntos." },
          { en: "Under no circumstances should you open this door.", es: "Bajo ninguna circunstancia debes abrir esta puerta." },
        ],
      },
      {
        title: "Not only … but also",
        text: "Con *Not only* al principio, la primera parte se invierte; la segunda, no.",
        examples: [
          { en: "Not only did she win the race, but she also broke the record.", es: "No solo ganó la carrera, sino que también batió el récord." },
        ],
      },
      {
        title: "Hardly / No sooner / Only when",
        text: "*Hardly … when* y *No sooner … than* expresan que algo pasó justo después de otra cosa, normalmente con past perfect. Con *Only when, Only after, Only then* se invierte la oración principal.",
        examples: [
          { en: "No sooner had we sat down than the fire alarm went off.", es: "Apenas nos habíamos sentado cuando sonó la alarma." },
          { en: "Hardly had I closed my eyes when the phone rang.", es: "Apenas había cerrado los ojos cuando sonó el teléfono." },
          { en: "Only when I moved abroad did I appreciate my family.", es: "Solo cuando me fui al extranjero valoré a mi familia." },
        ],
      },
    ],
    mistakes: [
      { wrong: "Never I have seen this.", right: "Never have I seen this.", why: "Tras never al principio, auxiliar antes del sujeto." },
      { wrong: "Not only she speaks French, …", right: "Not only does she speak French, …", why: "Sin auxiliar, se añade does y el verbo va en forma base." },
      { wrong: "No sooner had I arrived when it started.", right: "No sooner had I arrived than it started.", why: "No sooner va con than; hardly va con when." },
    ],
    practice: [
      {
        id: "p1",
        prompt: "Seldom ___ such dedication in a new employee.",
        options: ["we see", "do we see", "we do see"],
        answer: 1,
        explanation: "Seldom al principio: inversión con do.",
      },
      {
        id: "p2",
        prompt: "Not only ___ late, but he also forgot the documents.",
        options: ["he arrived", "did he arrive", "arrived he"],
        answer: 1,
        explanation: "Not only + did + sujeto + verbo base.",
      },
      {
        id: "p3",
        prompt: "Only after the meeting ___ the real problem.",
        options: ["I understood", "did I understand", "I did understand"],
        answer: 1,
        explanation: "Only after al principio: se invierte la oración principal.",
      },
      {
        id: "p4",
        prompt: "No sooner had the game started ___ it began to rain.",
        options: ["when", "than", "that"],
        answer: 1,
        explanation: "No sooner … than.",
      },
    ],
  },
  {
    id: "cleft-sentences",
    title: "Cleft sentences",
    subtitle: "Oraciones escindidas: It was… who…, What I need is…",
    level: "C1",
    category: "estructuras",
    minutes: 7,
    summary: "Destacar la información más importante de la frase.",
    intro:
      "Las oraciones escindidas dividen una idea en dos partes para poner el foco en un elemento. En español hacemos algo parecido con *fue Ana quien…* o *lo que necesito es…*.",
    rules: [
      {
        title: "It + be + elemento destacado + that/who",
        text: "Destaca una persona, cosa, momento o lugar, a menudo para corregir o contrastar.",
        form: "It is/was + X + that/who + resto",
        examples: [
          { en: "It was Maria who found the mistake, not me.", es: "Fue María quien encontró el error, no yo." },
          { en: "It's the price that worries me.", es: "Lo que me preocupa es el precio." },
          { en: "It was in 2015 that we first met.", es: "Fue en 2015 cuando nos conocimos." },
        ],
      },
      {
        title: "What + cláusula + be",
        text: "Pone el foco en lo que viene al final. Muy útil para ordenar ideas al hablar y escribir.",
        form: "What + sujeto + verbo + is/was + X",
        examples: [
          { en: "What I need is a long vacation.", es: "Lo que necesito son unas largas vacaciones." },
          { en: "What surprised me was how calm she was.", es: "Lo que me sorprendió fue lo tranquila que estaba." },
          { en: "What we did was call the manager.", es: "Lo que hicimos fue llamar al encargado." },
        ],
      },
      {
        title: "All, the thing, the reason, the place",
        text: "Otras formas frecuentes: *All I want is…* (solo quiero), *The thing is…*, *The reason (why) … is that…*",
        examples: [
          { en: "All I want is a quiet evening.", es: "Lo único que quiero es una noche tranquila." },
          { en: "The reason I called is that I need your advice.", es: "El motivo por el que llamé es que necesito tu consejo." },
        ],
      },
    ],
    mistakes: [
      { wrong: "What I need it is more time.", right: "What I need is more time.", why: "No se repite it: what ya es el sujeto." },
      { wrong: "The reason is because I was sick.", right: "The reason is that I was sick.", why: "En registro cuidado: the reason is that." },
    ],
    practice: [
      {
        id: "p1",
        prompt: "___ was the noise that kept me awake.",
        options: ["What", "It", "That"],
        answer: 1,
        explanation: "It was + elemento destacado + that.",
      },
      {
        id: "p2",
        prompt: "___ I like about this city is the food.",
        options: ["What", "That", "Which"],
        answer: 0,
        explanation: "What + cláusula + is.",
      },
      {
        id: "p3",
        prompt: "It was my brother ___ told me the news.",
        options: ["which", "who", "what"],
        answer: 1,
        explanation: "Persona destacada: who (o that).",
      },
      {
        id: "p4",
        prompt: "All I did ___ ask a simple question.",
        options: ["is", "was", "were"],
        answer: 1,
        explanation: "All I did was + verbo base (pasado).",
      },
    ],
  },
  {
    id: "participle-clauses",
    title: "Participle clauses",
    subtitle: "Cláusulas de participio: Having finished…, Built in 1900…",
    level: "C1",
    category: "estructuras",
    minutes: 8,
    summary: "Condensar oraciones en textos formales y académicos.",
    intro:
      "Las cláusulas de participio reducen una oración subordinada a un participio. Hacen los textos más compactos y son frecuentes en lecturas académicas como las del TOEFL.",
    rules: [
      {
        title: "Participio presente (-ing): acción activa",
        text: "Sustituye a una cláusula activa, a menudo de tiempo o causa. El sujeto de las dos partes debe ser el mismo.",
        examples: [
          { en: "Walking down the street, I saw an old friend.", es: "Mientras caminaba por la calle, vi a un viejo amigo." },
          { en: "Not knowing what to say, she stayed silent.", es: "Como no sabía qué decir, se quedó callada." },
        ],
      },
      {
        title: "Participio pasado: significado pasivo",
        text: "Sustituye a una cláusula pasiva.",
        examples: [
          { en: "Built in 1890, the bridge is still in use.", es: "Construido en 1890, el puente sigue en uso." },
          { en: "Asked about the delay, the manager apologized.", es: "Cuando le preguntaron por el retraso, el gerente se disculpó." },
        ],
      },
      {
        title: "Having + participio: acción anterior",
        text: "Indica que una acción terminó antes que la otra.",
        form: "Having + participio, oración principal",
        examples: [
          { en: "Having finished the report, she went home.", es: "Tras terminar el informe, se fue a casa." },
          { en: "Having lived in Mexico, he speaks fluent Spanish.", es: "Como ha vivido en México, habla español con fluidez." },
        ],
      },
      {
        title: "Cuidado con el sujeto",
        text: "Si el sujeto de la cláusula y el de la oración principal no coinciden, la frase resulta incorrecta o absurda (en inglés se llama *dangling participle*).",
        examples: [
          { en: "✘ Walking into the room, the lights went off.", es: "Parece que las luces entraron en la habitación." },
          { en: "✔ Walking into the room, I noticed the lights go off.", es: "Al entrar en la habitación, noté que se apagaban las luces." },
        ],
      },
    ],
    mistakes: [
      { wrong: "Finished the work, he left.", right: "Having finished the work, he left.", why: "Acción anterior activa: having + participio." },
      { wrong: "Written in 1850, I read the novel last year.", right: "Written in 1850, the novel is still popular.", why: "El sujeto de la principal debe ser lo que fue escrito." },
    ],
    practice: [
      {
        id: "p1",
        prompt: "___ the instructions, he started assembling the desk.",
        options: ["Read", "Having read", "To read"],
        answer: 1,
        explanation: "Acción terminada antes de la otra: having + participio.",
      },
      {
        id: "p2",
        prompt: "___ by millions of tourists every year, the museum is always crowded.",
        options: ["Visiting", "Visited", "Having visited"],
        answer: 1,
        explanation: "Significado pasivo (el museo es visitado): participio pasado.",
      },
      {
        id: "p3",
        prompt: "___ tired, she went to bed early.",
        options: ["Feeling", "Felt", "Having been felt"],
        answer: 0,
        explanation: "Causa activa con el mismo sujeto: feeling.",
      },
      {
        id: "p4",
        prompt: "Which sentence is correct?",
        options: [
          "Driving to work, the accident happened.",
          "Driving to work, I saw an accident.",
          "Driven to work, I saw an accident.",
        ],
        answer: 1,
        explanation: "El sujeto de driving debe ser quien conduce: I.",
      },
    ],
  },
];
