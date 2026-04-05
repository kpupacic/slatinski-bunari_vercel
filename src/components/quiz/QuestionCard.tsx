"use client";

import { Question } from "@/lib/quizData";

type Props = {
  question: Question;
  locale: string;
  selected: string[];
  onChange: (selected: string[]) => void;
  questionIndex: number;
  totalQuestions: number;
  onNext: () => void;
  isLast: boolean;
};

export default function QuestionCard({
  question,
  locale,
  selected,
  onChange,
  questionIndex,
  totalQuestions,
  onNext,
  isLast,
}: Props) {
  const lang = locale === "en" ? "en" : "hr";

  function toggleOption(id: string) {
    if (question.type === "single") {
      onChange([id]);
    } else {
      if (selected.includes(id)) {
        onChange(selected.filter((s) => s !== id));
      } else {
        onChange([...selected, id]);
      }
    }
  }

  const canProceed = selected.length > 0;

  return (
    <div className="bg-white rounded-xl shadow-md px-10 py-8 flex flex-col gap-6">
      {/* Progress */}
      <div className="flex items-center gap-3">
        <div className="flex-1 h-1.5 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{
              width: `${((questionIndex + 1) / totalQuestions) * 100}%`,
              backgroundColor: "var(--color-nav-default)",
            }}
          />
        </div>
        <span className="text-xs font-semibold tracking-wider text-gray-400 uppercase whitespace-nowrap">
          {lang === "hr"
            ? `${questionIndex + 1} / ${totalQuestions}`
            : `${questionIndex + 1} / ${totalQuestions}`}
        </span>
      </div>

      {/* Question type hint */}
      {question.type === "multiple" && (
        <p className="text-xs font-semibold tracking-widest uppercase text-[#297EB3]">
          {lang === "hr" ? "Više točnih odgovora" : "Multiple correct answers"}
        </p>
      )}

      {/* Question text */}
      <h2 className="font-cinzel text-xl font-semibold text-gray-800 leading-snug">
        {question.question[lang]}
      </h2>

      {/* Options */}
      <div className="flex flex-col gap-3">
        {question.options.map((option) => {
          const isSelected = selected.includes(option.id);
          return (
            <button
              key={option.id}
              onClick={() => toggleOption(option.id)}
              className={`
                flex items-center gap-4 px-5 py-3.5 rounded-lg border-2 text-left transition-all duration-150
                ${isSelected
                  ? "border-[#2973A8] bg-[#2973A8] text-white"
                  : "border-gray-200 bg-gray-50 text-gray-700 hover:border-[#68ACDB] hover:bg-blue-50"
                }
              `}
            >
              {/* Indicator */}
              <span
                className={`
                  shrink-0 w-5 h-5 flex items-center justify-center border-2 text-xs font-bold transition-colors
                  ${question.type === "multiple" ? "rounded" : "rounded-full"}
                  ${isSelected ? "border-white bg-white text-[#2973A8]" : "border-gray-300"}
                `}
              >
                {isSelected && (question.type === "multiple" ? "✓" : "●")}
              </span>
              <span className="text-sm font-medium leading-snug">
                {option.text[lang]}
              </span>
            </button>
          );
        })}
      </div>

      {/* Next / Submit */}
      <div className="flex justify-end pt-2">
        <button
          onClick={onNext}
          disabled={!canProceed}
          className={`
            px-8 py-3 rounded-lg text-sm font-bold tracking-[0.15em] uppercase transition-all duration-150
            ${canProceed
              ? "text-white cursor-pointer hover:opacity-90"
              : "bg-gray-200 text-gray-400 cursor-not-allowed"
            }
          `}
          style={canProceed ? { backgroundColor: "var(--color-nav-default)" } : undefined}
        >
          {isLast
            ? (lang === "hr" ? "Završi" : "Finish")
            : (lang === "hr" ? "Sljedeće" : "Next")}
        </button>
      </div>
    </div>
  );
}