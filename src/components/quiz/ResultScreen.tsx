"use client";

import { Question } from "@/lib/quizData";

type Props = {
  questions: Question[];
  answers: Record<number, string[]>;
  locale: string;
  onRestart: () => void;
};

function isCorrect(question: Question, selected: string[]): boolean {
  const correct = [...question.correctAnswers].sort();
  const given = [...selected].sort();
  return correct.length === given.length && correct.every((c, i) => c === given[i]);
}

export default function ResultScreen({ questions, answers, locale, onRestart }: Props) {
  const lang = locale === "en" ? "en" : "hr";
  const score = questions.filter((q) => isCorrect(q, answers[q.id] ?? [])).length;
  const total = questions.length;
  const pct = Math.round((score / total) * 100);

  return (
    <div className="flex flex-col gap-8">
      {/* Score card */}
      <div className="bg-white rounded-xl shadow-md px-10 py-10 flex flex-col items-center gap-4 text-center">
        <p className="text-xs font-semibold tracking-[0.25em] uppercase text-gray-400">
          {lang === "hr" ? "Vaš rezultat" : "Your score"}
        </p>
        <div
          className="text-7xl font-cinzel font-bold"
          style={{ color: pct >= 50 ? "var(--color-nav-default)" : "#dc2626" }}
        >
          {score}/{total}
        </div>
        <div
          className="text-2xl font-semibold"
          style={{ color: pct >= 50 ? "var(--color-nav-default)" : "#dc2626" }}
        >
          {pct}%
        </div>
        <p className="text-gray-500 text-sm">
          {lang === "hr"
            ? pct === 100
              ? "Odlično! Sve točno!"
              : pct >= 50
              ? "Dobar pokušaj!"
              : "Pokušajte ponovo."
            : pct === 100
            ? "Excellent! All correct!"
            : pct >= 50
            ? "Good attempt!"
            : "Try again."}
        </p>

        <button
          onClick={onRestart}
          className="mt-2 px-8 py-3 rounded-lg text-sm font-bold tracking-[0.15em] uppercase text-white transition-all hover:opacity-90"
          style={{ backgroundColor: "var(--color-nav-default)" }}
        >
          {lang === "hr" ? "Pokušaj ponovo" : "Try again"}
        </button>
      </div>

      {/* Per-question breakdown */}
      <div className="flex flex-col gap-4">
        <h3 className="font-cinzel text-base font-semibold tracking-wider text-gray-600 uppercase">
          {lang === "hr" ? "Pregled odgovora" : "Answer breakdown"}
        </h3>
        {questions.map((q, i) => {
          const given = answers[q.id] ?? [];
          const correct = isCorrect(q, given);
          return (
            <div
              key={q.id}
              className={`bg-white rounded-xl shadow-sm border-l-4 px-6 py-5 flex flex-col gap-3 ${
                correct ? "border-[#2973A8]" : "border-red-400"
              }`}
            >
              <div className="flex items-start gap-3">
                <span
                  className={`shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white ${
                    correct ? "bg-[#2973A8]" : "bg-red-400"
                  }`}
                >
                  {correct ? "✓" : "✗"}
                </span>
                <p className="text-sm font-semibold text-gray-700 leading-snug">
                  {i + 1}. {q.question[lang]}
                </p>
              </div>

              <div className="flex flex-col gap-1.5 pl-9">
                {q.options.map((opt) => {
                  const wasSelected = given.includes(opt.id);
                  const isRight = q.correctAnswers.includes(opt.id);
                  return (
                    <div
                      key={opt.id}
                      className={`flex items-center gap-2 text-xs px-3 py-1.5 rounded ${
                        isRight
                          ? "bg-blue-50 text-[#2973A8] font-semibold"
                          : wasSelected
                          ? "bg-red-50 text-red-600"
                          : "text-gray-400"
                      }`}
                    >
                      <span className="w-4 flex-shrink-0">
                        {isRight ? "✓" : wasSelected ? "✗" : "·"}
                      </span>
                      {opt.text[lang]}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}