import type { EmailTask, SentenceItem } from "@/lib/types";

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
      "You cannot finish your history essay by Friday because you have been ill this week. Write an email to your professor, Dr. Chen.",
    recipient: "Dr. Chen (history professor)",
    points: [
      "Explain why you cannot meet the deadline.",
      "Propose a new date for handing in the essay.",
      "Ask whether she needs any document from you.",
    ],
    minWords: 100,
    model:
      "Dear Dr. Chen,\n\nI am writing to ask whether it would be possible to have a short extension for the history essay due this Friday. I have been ill since Monday and was unable to work for most of the week, so the essay is not yet at the standard I would like to submit.\n\nIf you agree, I could hand it in by Wednesday of next week. That would give me enough time to finish the final section and check my sources carefully.\n\nPlease let me know if you need a medical note or any other document from me. I would be happy to send it today.\n\nI apologise for the inconvenience, and thank you for considering my request.\n\nKind regards,\nAlex Rivera",
  },
];
