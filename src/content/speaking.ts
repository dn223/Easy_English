import type { InterviewQuestion, RepeatItem } from "@/lib/types";

export const REPEAT_ACTIVITY_ID = "speaking-repeat";
export const INTERVIEW_ACTIVITY_ID = "speaking-interview";

export const repeatItems: RepeatItem[] = [
  { id: "r1", text: "The library opens at nine." },
  { id: "r2", text: "Please bring your notebook tomorrow." },
  { id: "r3", text: "I would like a table for two, please." },
  { id: "r4", text: "The meeting has been moved to Friday afternoon." },
  { id: "r5", text: "She has lived in this city since she was a child." },
  { id: "r6", text: "If the weather improves, we will walk to the station." },
  { id: "r7", text: "Students who register early can choose their own schedule." },
];

export const INTERVIEW_SECONDS = 45;

export const interviewQuestions: InterviewQuestion[] = [
  {
    id: "i1",
    text: "Where do you usually study, and why do you like that place?",
    tip: "Di el lugar y da al menos dos razones.",
  },
  {
    id: "i2",
    text: "Tell me about a time when you learned something difficult. How did you do it?",
    tip: "Cuenta la historia en pasado: situación, qué hiciste, resultado.",
  },
  {
    id: "i3",
    text: "Some people prefer to study alone, and others prefer to study in groups. Which do you prefer?",
    tip: "Elige una opción y compárala con la otra.",
  },
  {
    id: "i4",
    text: "Do you think technology makes students learn better? Why or why not?",
    tip: "Da tu opinión, un ejemplo concreto y una conclusión corta.",
  },
];
