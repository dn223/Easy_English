import type { DiscussionTask, EmailTask, SentenceItem } from "@/lib/types";

export const BUILD_ACTIVITY_ID = "writing-build";

export const sentenceItems: SentenceItem[] = [
  {
    id: "s1",
    context: "What time does the meeting start?",
    words: ["It", "starts", "at", "half", "past", "nine"],
  },
  {
    id: "s2",
    context: "Have you finished the report?",
    words: ["I", "am", "still", "working", "on", "it"],
    note: "“Still” va después del verbo “be” y antes del verbo principal.",
  },
  {
    id: "s3",
    context: "Why were you late this morning?",
    words: ["The", "bus", "broke", "down", "on", "the", "way"],
  },
  {
    id: "s4",
    context: "Do you know where the station is?",
    words: ["I", "am", "not", "sure", "where", "it", "is"],
    note: "Pregunta indirecta: sujeto + verbo (“where it is”), sin invertir.",
  },
  {
    id: "s5",
    context: "How long have you lived here?",
    words: ["I", "have", "lived", "here", "since", "last", "summer"],
    note: "“Since” + punto de inicio; “for” + duración.",
  },
  {
    id: "s6",
    context: "Should I call her now?",
    words: ["You", "had", "better", "wait", "until", "tomorrow"],
    note: "“Had better” + verbo sin “to”.",
  },
  {
    id: "s7",
    context: "What would you do with a free year?",
    words: ["If", "I", "had", "the", "money", "I", "would", "travel"],
    note: "Segundo condicional: if + past simple, would + infinitivo.",
  },
  {
    id: "s8",
    context: "Was the exam difficult?",
    words: ["It", "was", "harder", "than", "I", "had", "expected"],
  },
  {
    id: "s9",
    context: "Do you know when the library closes?",
    words: ["I", "have", "no", "idea", "what", "time", "it", "closes"],
    note: "Pregunta indirecta: what time + sujeto + verbo, sin does.",
  },
  {
    id: "s10",
    context: "Why didn't you come to the meeting?",
    words: ["Nobody", "told", "me", "that", "it", "had", "been", "moved"],
    note: "Pasiva en past perfect: had been + participio.",
  },
  {
    id: "s11",
    context: "Are you going to apply for the scholarship?",
    words: ["I", "would", "have", "applied", "if", "I", "had", "known", "about", "it"],
    note: "Third conditional: would have + participio / if + had + participio.",
  },
  {
    id: "s12",
    context: "What did the professor say about the essay?",
    words: ["She", "asked", "us", "not", "to", "exceed", "two", "pages"],
    note: "Petición en estilo indirecto: ask + persona + not to + verbo.",
  },
  {
    id: "s13",
    context: "How was the conference?",
    words: ["Not", "only", "was", "it", "useful", "but", "also", "fun"],
    note: "Inversión con not only: was + it.",
  },
  {
    id: "s14",
    context: "Is the new manager strict?",
    words: ["She", "is", "said", "to", "be", "very", "demanding"],
    note: "Pasiva de opinión: be said to + verbo.",
  },
];

export const emailTasks: EmailTask[] = [
  {
    id: "broken-heating",
    title: "The Heating Is Not Working",
    level: "B1",
    minutes: 7,
    summary: "Escribe al administrador de tu edificio.",
    scenario:
      "The heating in your apartment stopped working, and the weather is getting colder. Write an email to Mr. Daniels, the building manager.",
    recipient: "Mr. Daniels (building manager)",
    points: [
      "Explain what the problem is.",
      "Say when the problem started.",
      "Ask when someone can come to repair it.",
    ],
    minWords: 80,
    model:
      "Dear Mr. Daniels,\n\nI am writing to let you know that the heating in apartment 4B has stopped working. The radiators stay cold even when the thermostat is set to the highest temperature.\n\nThe problem started on Monday evening, and it has not improved since then. As the nights are getting colder, the apartment is now quite uncomfortable.\n\nCould you tell me when someone will be able to come and repair it? I am at home every day after five o'clock, and I can also be available on Saturday morning.\n\nThank you for your help.\n\nBest regards,\nAlex Rivera",
  },
  {
    id: "deadline-extension",
    title: "Asking for More Time",
    level: "B2",
    minutes: 7,
    summary: "Pide una prórroga a tu profesora.",
    scenario:
      "You cannot finish your history essay by Friday because you have been sick this week. Write an email to your professor, Dr. Chen.",
    recipient: "Dr. Chen (history professor)",
    points: [
      "Explain why you cannot meet the deadline.",
      "Propose a new date for handing in the essay.",
      "Ask whether she needs any document from you.",
    ],
    minWords: 100,
    model:
      "Dear Dr. Chen,\n\nI am writing to ask whether it would be possible to have a short extension for the history essay due this Friday. I have been sick since Monday and was unable to work for most of the week, so the essay is not yet at the standard I would like to submit.\n\nIf you agree, I could hand it in by Wednesday of next week. That would give me enough time to finish the final section and check my sources carefully.\n\nPlease let me know if you need a medical note or any other document from me. I would be happy to send it today.\n\nI apologize for the inconvenience, and thank you for considering my request.\n\nKind regards,\nAlex Rivera",
  },
  {
    id: "wrong-order",
    title: "A Problem with Your Order",
    level: "C1",
    minutes: 8,
    summary: "Una reclamación formal a una tienda en línea.",
    scenario:
      "You ordered a laptop online. It arrived two weeks late, and it is a different model from the one you paid for. Write an email to the store's customer service department.",
    recipient: "TechPoint customer service",
    points: [
      "Explain what you ordered and what you received.",
      "Describe the inconvenience the delay caused you.",
      "Say clearly what you want the store to do.",
    ],
    minWords: 120,
    model:
      "Dear Customer Service Team,\n\nI am writing to complain about order #48213, which I placed on March 3. I paid for a ZenBook 14 with 16 GB of memory, but the package I received on March 24, two weeks after the promised delivery date, contained an older model with only 8 GB.\n\nThe delay caused me considerable inconvenience. I had ordered the laptop specifically for an online course that began on March 10, and I had to borrow a computer for the first two weeks of classes.\n\nI would therefore like you to arrange for the incorrect laptop to be collected and to send the model I ordered by express delivery at no extra cost. If this is not possible within five working days, I would prefer a full refund.\n\nI look forward to your prompt reply.\n\nSincerely,\nAlex Rivera",
  },
];

export const discussionTasks: DiscussionTask[] = [
  {
    id: "phones-in-class",
    title: "Phones in the Classroom",
    level: "B2",
    minutes: 10,
    summary: "¿Deberían prohibirse los móviles en clase?",
    course: "Education",
    professor: {
      name: "Dr. Gomez",
      text: "Many schools are considering banning smartphones during class time. Supporters say phones distract students and reduce learning, while others argue that phones can be useful learning tools. What do you think? Should smartphones be banned in classrooms? Why or why not?",
    },
    posts: [
      {
        name: "Kelly",
        text: "I think phones should be banned. Even when students aren't using them, notifications pull their attention away. When my high school introduced a ban, I noticed that people talked to each other more during breaks too.",
      },
      {
        name: "Andrew",
        text: "I disagree with a full ban. Phones give students instant access to dictionaries, calculators, and research tools. Instead of banning them, teachers should teach students how to use them responsibly.",
      },
    ],
    minWords: 100,
    model:
      "I see merit in both Kelly's and Andrew's points, but I believe the best approach is to ban phones by default while allowing them for specific activities. Andrew is right that phones can be powerful tools, yet in practice most students do not use them for dictionaries or research during a lecture; they check messages. A clear rule removes the constant temptation. At the same time, a teacher could ask students to take out their phones for a five-minute research task or a quick online quiz, and then put them away again. This way, phones become something students use deliberately, not something that interrupts them. In my experience, the hardest part of studying is staying focused, so any policy that protects attention while keeping the useful features is worth trying.",
  },
  {
    id: "four-day-week",
    title: "A Four-Day Work Week",
    level: "C1",
    minutes: 10,
    summary: "¿Mejoraría la semana laboral de cuatro días la productividad?",
    course: "Business",
    professor: {
      name: "Professor Okafor",
      text: "Several companies have experimented with a four-day work week, in which employees work fewer hours for the same pay. Some report higher productivity and happier staff; others worry about customer service and costs. Do you think a four-day work week is a good idea for most businesses? Explain your reasoning.",
    },
    posts: [
      {
        name: "Priya",
        text: "Yes. Research from trial programs suggests that people work more efficiently when they have more rest. Fewer meetings and less wasted time can make up for the lost day, and companies may find it easier to keep good employees.",
      },
      {
        name: "Marcus",
        text: "It might work for office jobs, but not for businesses like hospitals or restaurants, which need to be open every day. For them, a shorter week would mean hiring more staff, and that is expensive.",
      },
    ],
    minWords: 100,
    model:
      "Marcus raises a fair point about sectors that must operate every day, but I think his argument shows that the four-day week should be adapted, not rejected. Hospitals and restaurants already organize staff in shifts, so the real question is total hours per employee, not which days the business is open. Priya's point about efficiency is also convincing, although I would add a condition: the benefits appear only when companies actually redesign their work, cutting unnecessary meetings and reports. If a firm simply squeezes five days of tasks into four, employees will feel more stressed, not less. Therefore, I believe a four-day week is a good idea for most businesses, provided that it starts as a trial with clear goals, such as maintaining output and customer satisfaction, and that managers are willing to change how work is done.",
  },
];
