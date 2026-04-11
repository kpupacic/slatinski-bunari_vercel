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
      hr: "Što su lokve?",
      en: "What are ponds (lokve)?",
    },
    type: "single",
    options: [
      { id: "a", text: { hr: "Duboke rupe s vodom", en: "Deep holes with water" } },
      { id: "b", text: { hr: "Podzemne rijeke", en: "Underground rivers" } },
      { id: "c", text: { hr: "Spremnici za kišnicu", en: "Rainwater containers" } },
      { id: "d", text: { hr: "Široke i plitke udubine s vodom", en: "Wide and shallow depressions with water" } },
    ],
    correctAnswers: ["d"],
  },
  {
    id: 2,
    question: {
      hr: "Koja je glavna razlika između bunara i lokve?",
      en: "What is the main difference between a well and a pond?",
    },
    type: "single",
    options: [
      { id: "a", text: { hr: "Bunari su plići", en: "Wells are shallower" } },
      { id: "b", text: { hr: "Lokve su dublje", en: "Ponds are deeper" } },
      { id: "c", text: { hr: "Bunari su duboki i voda se vadi, lokve su plitke", en: "Wells are deep and water is drawn from them, ponds are shallow" } },
      { id: "d", text: { hr: "Nema razlike", en: "There is no difference" } },
    ],
    correctAnswers: ["c"],
  },
  {
    id: 3,
    question: {
      hr: "Čemu služe kamenice (pojila)?",
      en: "What are stone basins (kamenice) used for?",
    },
    type: "single",
    options: [
      { id: "a", text: { hr: "Za skladištenje hrane", en: "For storing food" } },
      { id: "b", text: { hr: "Za pranje rublja", en: "For washing laundry" } },
      { id: "c", text: { hr: "Za napajanje stoke", en: "For watering livestock" } },
      { id: "d", text: { hr: "Za skupljanje kiše", en: "For collecting rain" } },
    ],
    correctAnswers: ["c"],
  },
  {
    id: 4,
    question: {
      hr: "Što su cisterne (šterne, gustrine)?",
      en: "What are cisterns (šterne, gustrine)?",
    },
    type: "single",
    options: [
      { id: "a", text: { hr: "Prirodna jezera", en: "Natural lakes" } },
      { id: "b", text: { hr: "Podzemne rijeke", en: "Underground rivers" } },
      { id: "c", text: { hr: "Spremnici za skupljanje vode", en: "Containers for collecting water" } },
      { id: "d", text: { hr: "Vrste bunara", en: "Types of wells" } },
    ],
    correctAnswers: ["c"],
  },
  {
    id: 5,
    question: {
      hr: "Kako se sakupljala kišnica za cisterne?",
      en: "How was rainwater collected for cisterns?",
    },
    type: "single",
    options: [
      { id: "a", text: { hr: "Iz rijeka", en: "From rivers" } },
      { id: "b", text: { hr: "S krovova putem žlijebova", en: "From rooftops via gutters" } },
      { id: "c", text: { hr: "Iz mora", en: "From the sea" } },
      { id: "d", text: { hr: "Iz bunara", en: "From wells" } },
    ],
    correctAnswers: ["b"],
  },
  {
    id: 6,
    question: {
      hr: "Koju su dodatnu ulogu imali bunari u selima?",
      en: "What additional role did wells play in villages?",
    },
    type: "single",
    options: [
      { id: "a", text: { hr: "Obrambeni objekt", en: "Defensive structure" } },
      { id: "b", text: { hr: "Za skladištenje hrane", en: "For storing food" } },
      { id: "c", text: { hr: "Za grijanje", en: "For heating" } },
      { id: "d", text: { hr: "Mjesto okupljanja ljudi", en: "A gathering place for people" } },
    ],
    correctAnswers: ["d"],
  },
  {
    id: 7,
    question: {
      hr: "Što su bunari simbolizirali u prošlosti?",
      en: "What did wells symbolize in the past?",
    },
    type: "single",
    options: [
      { id: "a", text: { hr: "Rat", en: "War" } },
      { id: "b", text: { hr: "Siromaštvo", en: "Poverty" } },
      { id: "c", text: { hr: "Život i plodnost", en: "Life and fertility" } },
      { id: "d", text: { hr: "Industriju i turizam", en: "Industry and tourism" } },
    ],
    correctAnswers: ["c"],
  },
  {
    id: 8,
    question: {
      hr: "Što znači izreka 'Ko\' jema vode taj je kralj'?",
      en: "What does the saying \"Ko' jema vode taj je kralj\" mean?",
    },
    type: "single",
    options: [
      { id: "a", text: { hr: "Voda nije važna", en: "Water is not important" } },
      { id: "b", text: { hr: "Voda je ukras", en: "Water is decorative" } },
      { id: "c", text: { hr: "Onaj tko ima vodu ima bogatstvo i sigurnost", en: "He who has water has wealth and security" } },
      { id: "d", text: { hr: "Voda je opasna", en: "Water is dangerous" } },
    ],
    correctAnswers: ["c"],
  },
  {
    id: 9,
    question: {
      hr: "Zašto je pitka voda važna za naseljavanje ljudi?",
      en: "Why is drinking water important for human settlement?",
    },
    type: "single",
    options: [
      { id: "a", text: { hr: "Zbog turizma", en: "Because of tourism" } },
      { id: "b", text: { hr: "Jer je potrebna za život", en: "Because it is necessary for life" } },
      { id: "c", text: { hr: "Zbog gradnje kuća", en: "Because of house construction" } },
      { id: "d", text: { hr: "Jer hladi zrak", en: "Because it cools the air" } },
    ],
    correctAnswers: ["b"],
  },
  {
    id: 10,
    question: {
      hr: "Gdje su se najčešće razvijala naselja u prošlosti?",
      en: "Where did settlements most often develop in the past?",
    },
    type: "single",
    options: [
      { id: "a", text: { hr: "Uz rijeke i izvore", en: "Near rivers and springs" } },
      { id: "b", text: { hr: "Na vrhovima planina", en: "On mountaintops" } },
      { id: "c", text: { hr: "U pustinjama", en: "In deserts" } },
      { id: "d", text: { hr: "Na otocima bez vode", en: "On islands without water" } },
    ],
    correctAnswers: ["a"],
  },
  {
    id: 11,
    question: {
      hr: "Prije milijun godina na Zemlji je bilo vode:",
      en: "A million years ago, the amount of water on Earth was:",
    },
    type: "single",
    options: [
      { id: "a", text: { hr: "Više nego danas", en: "More than today" } },
      { id: "b", text: { hr: "Ista količina kao i danas", en: "The same as today" } },
      { id: "c", text: { hr: "Nije bilo vode", en: "There was no water" } },
      { id: "d", text: { hr: "Manje nego danas", en: "Less than today" } },
    ],
    correctAnswers: ["b"],
  },
  {
    id: 12,
    question: {
      hr: "Koliki dio ljudskog tijela čini voda (otprilike)?",
      en: "Approximately what portion of the human body is water?",
    },
    type: "single",
    options: [
      { id: "a", text: { hr: "20%", en: "20%" } },
      { id: "b", text: { hr: "40%", en: "40%" } },
      { id: "c", text: { hr: "60%", en: "60%" } },
      { id: "d", text: { hr: "90%", en: "90%" } },
    ],
    correctAnswers: ["c"],
  },
  {
    id: 13,
    question: {
      hr: "Koliko čaša vode otprilike trebamo popiti svaki dan?",
      en: "Approximately how many glasses of water should we drink each day?",
    },
    type: "single",
    options: [
      { id: "a", text: { hr: "1–2", en: "1–2" } },
      { id: "b", text: { hr: "3–4", en: "3–4" } },
      { id: "c", text: { hr: "4–6", en: "4–6" } },
      { id: "d", text: { hr: "6–8", en: "6–8" } },
    ],
    correctAnswers: ["d"],
  },
  {
    id: 14,
    question: {
      hr: "Koliko dugo čovjek može živjeti bez vode?",
      en: "How long can a person survive without water?",
    },
    type: "single",
    options: [
      { id: "a", text: { hr: "3–7 dana", en: "3–7 days" } },
      { id: "b", text: { hr: "30 dana", en: "30 days" } },
      { id: "c", text: { hr: "15 dana", en: "15 days" } },
      { id: "d", text: { hr: "1 dan", en: "1 day" } },
    ],
    correctAnswers: ["a"],
  },
  {
    id: 15,
    question: {
      hr: "Kada obilježavamo Svjetski dan voda?",
      en: "When is World Water Day celebrated?",
    },
    type: "single",
    options: [
      { id: "a", text: { hr: "29. siječnja", en: "January 29" } },
      { id: "b", text: { hr: "22. ožujka", en: "March 22" } },
      { id: "c", text: { hr: "21. lipnja", en: "June 21" } },
      { id: "d", text: { hr: "20. srpnja", en: "July 20" } },
    ],
    correctAnswers: ["b"],
  },
  {
    id: 16,
    question: {
      hr: "Jedan od najvećih problema današnjice vezan uz vodu je nedostatak pitke vode i njezino zagađenje.",
      en: "One of the biggest problems today related to water is the lack of drinking water and its pollution.",
    },
    type: "single",
    options: [
      { id: "a", text: { hr: "Točno", en: "True" } },
      { id: "b", text: { hr: "Netočno", en: "False" } },
    ],
    correctAnswers: ["a"],
  },
  {
    id: 17,
    question: {
      hr: "Sva voda na Zemlji je pitka.",
      en: "All water on Earth is drinkable.",
    },
    type: "single",
    options: [
      { id: "a", text: { hr: "Točno", en: "True" } },
      { id: "b", text: { hr: "Netočno", en: "False" } },
    ],
    correctAnswers: ["b"],
  },
  {
    id: 18,
    question: {
      hr: "Slatine su dobile ime zbog mnoštva lokvi bočate ili slane vode.",
      en: "Slatine got its name due to the abundance of brackish or saltwater ponds.",
    },
    type: "single",
    options: [
      { id: "a", text: { hr: "Točno", en: "True" } },
      { id: "b", text: { hr: "Netočno", en: "False" } },
    ],
    correctAnswers: ["a"],
  },
  {
    id: 19,
    question: {
      hr: "U prošlosti je skoro svaka kuća u Slatinama imala bunar.",
      en: "In the past, almost every house in Slatine had a well.",
    },
    type: "single",
    options: [
      { id: "a", text: { hr: "Točno", en: "True" } },
      { id: "b", text: { hr: "Netočno", en: "False" } },
    ],
    correctAnswers: ["a"],
  },
  {
    id: 20,
    question: {
      hr: "Iz seoskog bunara u Slatinama vodu se nije smjelo uzimati neograničeno, već prema broju članova obitelji.",
      en: "From the village well in Slatine, water could not be taken without limit — it was allocated according to the number of family members.",
    },
    type: "single",
    options: [
      { id: "a", text: { hr: "Točno", en: "True" } },
      { id: "b", text: { hr: "Netočno", en: "False" } },
    ],
    correctAnswers: ["a"],
  },
];
