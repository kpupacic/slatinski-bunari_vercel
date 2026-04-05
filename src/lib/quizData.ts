export type Question = {
  id: number;
  question: { hr: string; en: string };
  type: "single" | "multiple";
  options: { id: string; text: { hr: string; en: string } }[];
  correctAnswers: string[];
};

export const questions: Question[] = [
  {
    id: 1,
    question: {
      hr: "Koja vrsta vodnog lokaliteta je najdublja i strukturalno ojačana obzidanim iskopom?",
      en: "Which type of water source is the deepest and structurally reinforced with walled excavation?",
    },
    type: "single",
    options: [
      { id: "a", text: { hr: "Lokva", en: "Ponds" } },
      { id: "b", text: { hr: "Bunar", en: "Well" } },
      { id: "c", text: { hr: "Kamenica", en: "Kamenica" } },
      { id: "d", text: { hr: "Gustirna", en: "Cistern" } },
    ],
    correctAnswers: ["b"],
  },
  {
    id: 2,
    question: {
      hr: "Koje od navedenih vrsta vodnih lokaliteta su potpuno prirodne krške tvorevine? (odaberite sve točne odgovore)",
      en: "Which of the following water source types are entirely natural karst formations? (select all correct answers)",
    },
    type: "multiple",
    options: [
      { id: "a", text: { hr: "Škraparski bunari", en: "Stone wells" } },
      { id: "b", text: { hr: "Gustirne", en: "Cisterns" } },
      { id: "c", text: { hr: "Kamenice", en: "Kamenice" } },
      { id: "d", text: { hr: "Bunari", en: "Wells" } },
    ],
    correctAnswers: ["a", "c"],
  },
  {
    id: 3,
    question: {
      hr: "Čemu su primarno služile lokve?",
      en: "What were ponds primarily used for?",
    },
    type: "single",
    options: [
      { id: "a", text: { hr: "Navodnjavanje polja", en: "Irrigating fields" } },
      { id: "b", text: { hr: "Direktan pristup vodi za ljude i životinje", en: "Direct water access for people and animals" } },
      { id: "c", text: { hr: "Sakupljanje kišnice za kućanstvo", en: "Collecting rainwater for households" } },
      { id: "d", text: { hr: "Napajanje podzemnih bunara", en: "Feeding underground wells" } },
    ],
    correctAnswers: ["b"],
  },
];