import type {
  DiscussionTask,
  EmailTask,
  InterviewQuestion,
  ListeningLine,
  Question,
  RepeatItem,
  SentenceItem,
} from "@/lib/types";

/**
 * Simulacro tipo TOEFL iBT (formato vigente desde enero de 2026): Reading y Listening en dos
 * etapas adaptativas, Writing y Speaking con tareas cortas. Todo el contenido es original.
 */

// ── Reading ────────────────────────────────────────────────────────────────

/** Las letras entre corchetes son las que hay que escribir: "lea[ves]" muestra "lea" y pide "ves". */
export const completeWordsText =
  "Trees do more for a city than make it look pleasant. Their lea[ves] give sha[de] in summer, which can low[er] the tempe[rature] of a street by several degrees. Their roots abs[orb] rainwater and red[uce] the risk of floo[ding]. Trees also clean the air by trap[ping] dust on their surfaces. For these reas[ons], many cities now plant thousands of new trees every ye[ar].";

export const dailyLife = {
  heading: "Riverside Sports Centre",
  title: "Main pool closed for maintenance",
  paragraphs: [
    "The main swimming pool will be closed from Monday 3 March to Friday 7 March while the water filters are replaced.",
    "The small training pool stays open during the week. Swimming lessons for children will take place there at 4 p.m. instead of 5 p.m.",
    "Members who cannot use the center that week can ask at reception for a free guest pass, valid until the end of April. The gym and the café are not affected.",
  ],
  questions: [
    {
      id: "d1",
      prompt: "Why is the main pool closing?",
      options: [
        "The water filters are being replaced.",
        "A competition is taking place.",
        "The center is short of staff.",
        "The training pool is being enlarged.",
      ],
      answer: 0,
      explanation: "",
    },
    {
      id: "d2",
      prompt: "What changes for the children's lessons?",
      options: [
        "They are canceled for the week.",
        "They move to the gym.",
        "They start one hour earlier.",
        "They cost less than usual.",
      ],
      answer: 2,
      explanation: "",
    },
    {
      id: "d3",
      prompt: "What can members who miss that week receive?",
      options: [
        "A refund for the month",
        "A free guest pass",
        "A discount at the café",
        "An extra private lesson",
      ],
      answer: 1,
      explanation: "",
    },
  ] satisfies Question[],
};

type AcademicPassage = { title: string; paragraphs: string[]; questions: Question[] };

export const academicStandard: AcademicPassage = {
  title: "How Honeybees Share Directions",
  paragraphs: [
    "When a honeybee finds a rich patch of flowers, it does not keep the discovery to itself. Back in the dark hive, it performs a series of movements that other bees follow closely. The Austrian scientist Karl von Frisch spent decades studying this behaviour, which is known as the waggle dance, and received a Nobel Prize for his work in 1973.",
    "In the dance, the bee runs in a straight line while shaking its body from side to side, then circles back and repeats the run. The direction of the straight run carries the first message. Because the bees dance on a vertical surface, they use “up” to stand for the position of the sun: a run pointing straight up means “fly toward the sun”, and a run to the right of vertical means “fly to the right of the sun”.",
    "The second message is distance. The longer the bee shakes during the straight run, the farther away the food is. Bees that follow the dance leave the hive and fly to roughly the right place, even though they have never been there before.",
  ],
  questions: [
    {
      id: "a1",
      prompt: "What is the passage mainly about?",
      options: [
        "How bees make honey inside the hive",
        "How a bee tells others where food is",
        "Why bees are attracted to the sun",
        "How scientists win Nobel Prizes",
      ],
      answer: 1,
      explanation: "",
    },
    {
      id: "a2",
      prompt: "According to the passage, what does the direction of the straight run show?",
      options: [
        "How much food there is",
        "How far away the food is",
        "Where the food is in relation to the sun",
        "Which bee found the food",
      ],
      answer: 2,
      explanation: "",
    },
    {
      id: "a3",
      prompt: "How does a bee signal that food is far away?",
      options: [
        "By dancing in smaller circles",
        "By shaking for longer during the straight run",
        "By running straight down",
        "By repeating the dance fewer times",
      ],
      answer: 1,
      explanation: "",
    },
    {
      id: "a4",
      prompt: "The word “rich” in paragraph 1 is closest in meaning to…",
      options: ["expensive", "full of food", "brightly colored", "difficult to reach"],
      answer: 1,
      explanation: "",
    },
    {
      id: "a5",
      prompt: "What can be inferred about the bees that follow the dance?",
      options: [
        "They already know where the flowers are.",
        "They need to see the flowers before leaving.",
        "They can find a place using only the information in the dance.",
        "They always fly directly toward the sun.",
      ],
      answer: 2,
      explanation: "",
    },
    {
      id: "a6",
      prompt: "Which of the following is NOT mentioned as information carried by the waggle dance?",
      options: ["The direction of the food", "The distance to the food", "The type of flower", "The position relative to the sun"],
      answer: 2,
      explanation: "",
    },
  ],
};

export const academicAdvanced: AcademicPassage = {
  title: "The Printing Press and the Spread of Ideas",
  paragraphs: [
    "Before the middle of the fifteenth century, every book in Europe was copied by hand. A single volume could take a scribe months to complete, which made books scarce and costly, and kept most of them in monasteries, universities and the homes of the wealthy. Around 1450, Johannes Gutenberg combined several existing techniques, among them the screw press and metal casting, into a system of movable metal type. Individual letters could be arranged into a page, printed hundreds of times, and then rearranged for the next page.",
    "The immediate consequence was economic. As the cost of producing a book fell, the number of titles in circulation rose sharply, and reading gradually ceased to be the privilege of a small elite. A less obvious consequence was uniformity. Hand-copied texts drifted apart as each scribe introduced small errors, whereas printed copies of an edition were identical. Scholars in different cities could now refer to the same page of the same work, which made it far easier to compare, criticise and build on one another's findings.",
    "Printing also changed who could address the public. Short, cheap pamphlets could be produced in days, and writers used them to argue about religion and politics before audiences that no preacher or lecturer could have reached. Authorities responded with licensing and censorship, but the sheer volume of printed material made control difficult. The press did not determine what people thought; it altered how quickly an argument could travel and how many people could take part in it.",
  ],
  questions: [
    {
      id: "a1",
      prompt: "According to paragraph 1, what was new about Gutenberg's system?",
      options: [
        "It was the first use of a press of any kind.",
        "It brought existing techniques together so that letters could be reused.",
        "It allowed scribes to copy books more quickly by hand.",
        "It replaced metal with a cheaper material.",
      ],
      answer: 1,
      explanation: "",
    },
    {
      id: "a2",
      prompt: "The word “scarce” in paragraph 1 is closest in meaning to…",
      options: ["heavy", "valuable", "rare", "old"],
      answer: 2,
      explanation: "",
    },
    {
      id: "a3",
      prompt: "Why does the author mention that hand-copied texts “drifted apart”?",
      options: [
        "To explain why printed books were more expensive at first",
        "To contrast them with the identical copies that printing produced",
        "To show that scribes were poorly educated",
        "To argue that early printed books contained many errors",
      ],
      answer: 1,
      explanation: "",
    },
    {
      id: "a4",
      prompt: "What can be inferred from paragraph 3 about attempts to control printing?",
      options: [
        "They were largely successful.",
        "They were abandoned almost immediately.",
        "They were limited by the amount of material being printed.",
        "They applied only to religious texts.",
      ],
      answer: 2,
      explanation: "",
    },
    {
      id: "a5",
      prompt: "Which statement best expresses the author's view in the final sentence?",
      options: [
        "The press decided which ideas people would accept.",
        "The press mainly affected the speed and reach of debate.",
        "The press had little effect on public discussion.",
        "The press made arguments less important than before.",
      ],
      answer: 1,
      explanation: "",
    },
    {
      id: "a6",
      prompt: "Which sentence best expresses the essential information in “Scholars in different cities could now refer to the same page of the same work”?",
      options: [
        "Scholars began to travel more often between cities.",
        "Identical printed copies allowed scholars in different places to work from exactly the same text.",
        "Every city printed its own version of important works.",
        "Scholars stopped reading hand-copied books entirely.",
      ],
      answer: 1,
      explanation: "",
    },
  ],
};

// ── Listening ──────────────────────────────────────────────────────────────

export type ResponseItem = { id: string; said: string; options: string[]; answer: number };

export const chooseResponse: ResponseItem[] = [
  {
    id: "c1",
    said: "Would you mind if I opened the window?",
    options: ["Yes, I opened it.", "Not at all. Go ahead.", "It is next to the door.", "I don't mind the weather."],
    answer: 1,
  },
  {
    id: "c2",
    said: "How long does the train take to get to the airport?",
    options: ["About forty minutes.", "It leaves from platform two.", "Twice a day.", "Since last year."],
    answer: 0,
  },
  {
    id: "c3",
    said: "I'm afraid the report won't be ready until Thursday.",
    options: [
      "Yes, I read it yesterday.",
      "That's fine. Thursday works for me.",
      "It was ready on Monday.",
      "I'm not afraid of that.",
    ],
    answer: 1,
  },
  {
    id: "c4",
    said: "Why don't we meet in front of the library at six?",
    options: [
      "Because the library is closed.",
      "I met him there last week.",
      "Sounds good. See you there.",
      "For about six hours.",
    ],
    answer: 2,
  },
];

type ListeningPart = { title: string; lines: ListeningLine[]; questions: Question[] };

export const conversation: ListeningPart = {
  title: "Conversation: student and advisor",
  lines: [
    { speaker: "Student", text: "Hi, Ms. Patel. Do you have a minute? I'd like to change one of my courses." },
    { speaker: "Advisor", text: "Sure. Which one are you thinking of dropping?" },
    {
      speaker: "Student",
      text: "Statistics. It's at the same time as my new job at the bookshop, so I keep missing the first half hour.",
    },
    {
      speaker: "Advisor",
      text: "I see. There is an evening section on Tuesdays and Thursdays. It covers the same material, and it still has a few places.",
    },
    { speaker: "Student", text: "That would be perfect. Is it too late to switch?" },
    {
      speaker: "Advisor",
      text: "Not yet. The deadline for changes is this Friday. Fill in the online form today, and I'll approve it this afternoon.",
    },
  ],
  questions: [
    {
      id: "v1",
      prompt: "Why does the student want to change the course?",
      options: [
        "The course is too difficult.",
        "It clashes with a new job.",
        "The professor has changed.",
        "It is not required for the degree.",
      ],
      answer: 1,
      explanation: "",
    },
    {
      id: "v2",
      prompt: "What does the advisor suggest?",
      options: [
        "Taking the course next year",
        "Leaving the job at the bookshop",
        "Moving to an evening section",
        "Studying the material alone",
      ],
      answer: 2,
      explanation: "",
    },
    {
      id: "v3",
      prompt: "What should the student do today?",
      options: [
        "Speak to the statistics professor",
        "Fill in the online form",
        "Pay a fee for the change",
        "Wait until Friday",
      ],
      answer: 1,
      explanation: "",
    },
  ],
};

export const talkStandard: ListeningPart = {
  title: "Talk: why leaves change color",
  lines: [
    {
      speaker: "Professor",
      text: "Let's talk about why leaves change color in the fall. During spring and summer, leaves are green because they are full of chlorophyll, the substance plants use to turn sunlight into food. But leaves also contain yellow and orange pigments. We simply cannot see them, because the green is so strong. When the days get shorter and cooler, the tree stops making chlorophyll. The green slowly disappears, and the yellow and orange that were there all along finally become visible. Red is different. Red pigments are not hidden in the leaf during summer. The tree produces them in autumn, from sugar that is trapped in the leaf. That is why the brightest reds appear after a period of sunny days and cool nights. Sunny days produce a lot of sugar, and cool nights keep it in the leaves.",
    },
  ],
  questions: [
    {
      id: "t1",
      prompt: "What is the talk mainly about?",
      options: [
        "How trees survive the winter",
        "Why leaves change color in the fall",
        "How plants turn sunlight into food",
        "Which trees have the brightest leaves",
      ],
      answer: 1,
      explanation: "",
    },
    {
      id: "t2",
      prompt: "Why can't we see yellow and orange pigments in summer?",
      options: [
        "They have not been produced yet.",
        "They are covered by the strong green.",
        "They are only in the roots.",
        "They need cold weather to exist.",
      ],
      answer: 1,
      explanation: "",
    },
    {
      id: "t3",
      prompt: "According to the professor, how are red pigments different?",
      options: [
        "They are present all year.",
        "They are produced in the fall.",
        "They come from the soil.",
        "They disappear when it is sunny.",
      ],
      answer: 1,
      explanation: "",
    },
    {
      id: "t4",
      prompt: "Which weather produces the brightest red leaves?",
      options: [
        "Cloudy days and warm nights",
        "Rainy days and cold nights",
        "Sunny days and cool nights",
        "Windy days and warm nights",
      ],
      answer: 2,
      explanation: "",
    },
    {
      id: "t5",
      prompt: "Why does the professor say the yellow and orange colors were “there all along”?",
      options: [
        "To show that these pigments are hidden in summer rather than newly produced",
        "To explain why trees lose their leaves",
        "To compare leaves from different trees",
        "To suggest that red leaves are more common",
      ],
      answer: 0,
      explanation: "",
    },
  ],
};

export const talkAdvanced: ListeningPart = {
  title: "Talk: urban heat islands",
  lines: [
    {
      speaker: "Professor",
      text: "If you have ever left a city center on a summer evening and felt the air cool as you reached the countryside, you have experienced what we call the urban heat island. Cities are consistently warmer than the land around them, and the reasons are mostly about materials. Asphalt, brick and dark roofs absorb sunlight during the day instead of reflecting it. Vegetation behaves differently. Plants release water into the air, and that evaporation cools their surroundings, so a district with few trees loses that natural cooling. On top of this, cars and air conditioners release waste heat directly into the streets. Now, here is what surprises most students. The difference between city and countryside is usually greatest at night, not in the afternoon. Buildings and roads store heat all day and release it slowly after sunset, so the city cannot cool down. That matters for health, because during a heatwave it is the hot nights, when the body gets no chance to recover, that are most dangerous. The solutions follow directly from the causes: plant trees, replace dark roofs with reflective or planted ones, and use lighter materials for streets.",
    },
  ],
  questions: [
    {
      id: "t1",
      prompt: "What is the main purpose of the talk?",
      options: [
        "To compare city life with country life",
        "To explain why cities are warmer than their surroundings and what can be done",
        "To argue that air conditioning should be banned",
        "To describe how heatwaves are forecast",
      ],
      answer: 1,
      explanation: "",
    },
    {
      id: "t2",
      prompt: "According to the professor, how do plants cool their surroundings?",
      options: [
        "They reflect sunlight back into space.",
        "They block the wind between buildings.",
        "They release water that evaporates.",
        "They store heat in their roots.",
      ],
      answer: 2,
      explanation: "",
    },
    {
      id: "t3",
      prompt: "Why is the temperature difference usually greatest at night?",
      options: [
        "Traffic is heavier after sunset.",
        "Buildings and roads slowly release the heat they stored during the day.",
        "The countryside becomes warmer at night.",
        "Air conditioners are switched off.",
      ],
      answer: 1,
      explanation: "",
    },
    {
      id: "t4",
      prompt: "Why does the professor mention heatwaves?",
      options: [
        "To show that hot nights in cities are a health risk",
        "To explain why cities were built with dark materials",
        "To prove that the countryside is also getting warmer",
        "To suggest that people should move out of cities",
      ],
      answer: 0,
      explanation: "",
    },
    {
      id: "t5",
      prompt: "What can be inferred about a city district with many trees?",
      options: [
        "It is likely to stay cooler than a district with few trees.",
        "It produces more waste heat.",
        "It has more air conditioners.",
        "It is warmer at night than in the afternoon.",
      ],
      answer: 0,
      explanation: "",
    },
  ],
};

// ── Writing ────────────────────────────────────────────────────────────────

export const testSentences: SentenceItem[] = [
  { id: "ts1", context: "Where did you put my keys?", words: ["I", "left", "them", "on", "the", "kitchen", "table"] },
  { id: "ts2", context: "Is Maria coming to the party?", words: ["She", "said", "she", "would", "try", "to", "come"] },
  {
    id: "ts3",
    context: "How was the concert?",
    words: ["It", "was", "the", "best", "one", "I", "have", "ever", "seen"],
  },
  {
    id: "ts4",
    context: "Why didn't you answer the phone?",
    words: ["I", "must", "have", "been", "asleep", "when", "you", "called"],
  },
  {
    id: "ts5",
    context: "When will the results be announced?",
    words: ["They", "are", "supposed", "to", "be", "published", "next", "week"],
  },
];

export const testEmail: EmailTask = {
  id: "test-hotel",
  title: "Write an Email",
  level: "B1",
  minutes: 7,
  summary: "",
  scenario:
    "Last weekend you stayed at the Harbor View Hotel. When you got home, you realized you had left your laptop charger in the room. Write an email to the hotel reception.",
  recipient: "Harbor View Hotel (reception)",
  points: [
    "Say when you stayed and in which room.",
    "Describe the item you left behind.",
    "Ask them to send it to you and offer to pay for the postage.",
  ],
  minWords: 80,
  model:
    "Dear Sir or Madam,\n\nI stayed at your hotel last weekend, from Friday, June 14, to Sunday, June 16, in room 212. When I arrived home, I realized that I had left my laptop charger in the room.\n\nIt is a black charger with a long cable, and I believe it was plugged in next to the desk by the window.\n\nIf you have found it, could you please send it to my home address? I would be happy to pay for the postage, so please let me know the cost and how you would like me to pay.\n\nThank you very much for your help.\n\nBest regards,\nAlex Rivera",
};

export const testDiscussion: DiscussionTask = {
  id: "test-online-learning",
  title: "Write for an Academic Discussion",
  level: "B2",
  minutes: 10,
  summary: "",
  course: "Sociology",
  professor: {
    name: "Dr. Harris",
    text: "Online courses have become a common alternative to traditional classes. Some people believe that online learning will eventually replace most classroom teaching at universities. Others think face-to-face instruction will always be essential. What is your view? Explain why.",
  },
  posts: [
    {
      name: "Sofia",
      text: "I think online learning will replace most lectures. Students can watch recorded classes at their own pace and replay difficult parts. It's also much cheaper for universities, so I believe they will move in that direction.",
    },
    {
      name: "Daniel",
      text: "I don't agree. Learning isn't just about receiving information. In a classroom you can ask questions immediately, discuss ideas with classmates and build relationships with professors, which is hard to do through a screen.",
    },
  ],
  minWords: 100,
  model:
    "I agree with Daniel that discussion and relationships matter, but I think Sofia is right about lectures specifically. Large lectures, where one professor speaks to hundreds of students, are already a one-way experience, so recording them loses very little and gives students the chance to review difficult material. What I believe will happen is a division of roles: basic content will move online, while class time will be used for seminars, labs and projects that require people to work together. For example, in my statistics course last year, the explanations were videos, and our weekly meetings were spent solving problems in small groups. I learned more that way than in any traditional lecture. Therefore, online learning will not replace universities, but it will change what we do when we are in the same room.",
};

// ── Speaking ───────────────────────────────────────────────────────────────

export const testRepeat: RepeatItem[] = [
  { id: "tr1", text: "The bookstore closes early on Sundays." },
  { id: "tr2", text: "Could you tell me where the main office is?" },
  { id: "tr3", text: "All assignments must be submitted before midnight." },
  { id: "tr4", text: "The professor asked us to read two chapters by Monday." },
  { id: "tr5", text: "Although it was raining, the tour continued as planned." },
];

export const testInterview: InterviewQuestion[] = [
  { id: "ti1", text: "What do you like to do in your free time, and why?", tip: "Nombra una actividad y explica por qué te gusta." },
  {
    id: "ti2",
    text: "Describe a teacher or mentor who influenced you. What did you learn from them?",
    tip: "Di quién era y da un ejemplo concreto de lo que aprendiste.",
  },
  {
    id: "ti3",
    text: "Some people think students should take a year off before starting university. Do you agree?",
    tip: "Toma una postura, da dos razones y cierra con una conclusión.",
  },
];

// ── Reglas del simulacro ───────────────────────────────────────────────────

/** Proporción de aciertos en la primera etapa a partir de la cual la segunda es la avanzada. */
export const ADVANCED_THRESHOLD = 0.7;
/** Cada acierto de la etapa avanzada vale más: la ruta estándar no puede llegar al 100 %. */
export const ADVANCED_WEIGHT = 1.5;

export const READING_SECONDS = 12 * 60;
export const LISTENING_SECONDS = 10 * 60;
export const EMAIL_SECONDS = 7 * 60;
export const DISCUSSION_SECONDS = 10 * 60;
