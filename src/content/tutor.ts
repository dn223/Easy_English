export const TUTOR_NAME = "Ava";

export type TutorScenario = {
  id: string;
  title: string;
  summary: string;
  /** Papel que interpreta la tutora, en inglés porque va en las instrucciones del modelo. */
  role: string;
  opener: string;
};

export const tutorScenarios: TutorScenario[] = [
  {
    id: "free",
    title: "Charla libre",
    summary: "Habla de lo que quieras: tu día, tus planes, tus gustos.",
    role: "a friendly conversation partner chatting casually about whatever the learner brings up",
    opener: "Hi! I'm Ava. It's nice to meet you. What would you like to talk about today?",
  },
  {
    id: "cafe",
    title: "En una cafetería",
    summary: "Pide algo de beber y de comer, pregunta precios y paga.",
    role: "a barista at a small café called Blue Door Café, taking the learner's order",
    opener: "Good morning! Welcome to Blue Door Café. What can I get for you today?",
  },
  {
    id: "interview",
    title: "Entrevista de trabajo",
    summary: "Preséntate y responde preguntas sobre tu experiencia.",
    role: "a hiring manager interviewing the learner for an office job, polite and professional",
    opener: "Thanks for coming in today. To start, could you tell me a little about yourself?",
  },
  {
    id: "airport",
    title: "En el aeropuerto",
    summary: "Factura tu equipaje y resuelve dudas sobre tu vuelo.",
    role: "an airline check-in agent helping the learner check in for a flight",
    opener: "Good afternoon. Where are you flying today, and do you have any bags to check?",
  },
  {
    id: "neighbour",
    title: "Conocer a alguien",
    summary: "Una vecina nueva se presenta: conversación social de primer encuentro.",
    role: "a new neighbour who has just moved into the learner's building and wants to get to know them",
    opener: "Hi! I don't think we've met. I'm Ava, and I just moved in upstairs. How long have you lived here?",
  },
];

export const tutorLevels = ["A2", "B1", "B2"] as const;
export type TutorLevel = (typeof tutorLevels)[number];

export const TUTOR_MAX_TURNS = 30;
export const TUTOR_MAX_CHARS = 600;

export type TutorReply = {
  reply: string;
  correction: { corrected: string; note: string } | null;
};

export type TutorErrorCode = "invalid" | "busy" | "setup" | "declined" | "failed";
