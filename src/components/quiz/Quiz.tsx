"use client";

import { useState } from "react";
import { questions } from "@/lib/quizData";
import QuestionCard from "./QuestionCard";
import ResultScreen from "./ResultScreen";

type Phase = "idle" | "active" | "finished" | "done";

type Props = {
  locale: string;
};

export default function Quiz({ locale }: Props) {
  const lang = locale === "en" ? "en" : "hr";
  const [phase, setPhase] = useState<Phase>("idle");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string[]>>({});

  function start() {
    setCurrentIndex(0);
    setAnswers({});
    setPhase("active");
  }

  function handleAnswer(selected: string[]) {
    const q = questions[currentIndex];
    setAnswers((prev) => ({ ...prev, [q.id]: selected }));
  }

  function handleNext() {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((i) => i + 1);
    } else {
      setPhase("finished");
    }
  }

  const currentQuestion = questions[currentIndex];
  const currentSelected = answers[currentQuestion?.id] ?? [];

  const score = questions.filter((q) => {
    const correct = [...q.correctAnswers].sort();
    const given = [...(answers[q.id] ?? [])].sort();
    return correct.length === given.length && correct.every((c, i) => c === given[i]);
  }).length;
  const pct = Math.round((score / questions.length) * 100);

  if (phase === "idle") {
    return (
      <div className="bg-white rounded-xl shadow-md px-10 py-14 flex flex-col items-center gap-6 text-center">
        <p className="text-xs font-semibold tracking-[0.3em] uppercase text-[#297EB3]">
          {lang === "hr" ? "Provjeri znanje" : "Test your knowledge"}
        </p>
        <h2 className="font-cinzel text-3xl font-semibold text-gray-800">
          {lang === "hr" ? "Kviz o izvorima vode" : "Water Sources Quiz"}
        </h2>
        <p className="text-gray-500 text-sm max-w-md leading-relaxed">
          {lang === "hr"
            ? `Ovaj kviz sadrži ${questions.length} pitanja o lokalnim vodnim izvorima. Odgovorite na sva pitanja i provjerite koliko ste naučili.`
            : `This quiz contains ${questions.length} questions about local water sources. Answer all questions and see how much you've learned.`}
        </p>
        <button
          onClick={start}
          className="mt-2 px-10 py-3.5 rounded-lg text-sm font-bold tracking-[0.2em] uppercase text-white transition-all hover:opacity-90"
          style={{ backgroundColor: "var(--color-nav-default)" }}
        >
          {lang === "hr" ? "Započni kviz" : "Start quiz"}
        </button>
      </div>
    );
  }

  if (phase === "finished") {
    return (
      <div className="bg-white rounded-xl shadow-md px-10 py-14 flex flex-col items-center gap-6 text-center">
        <p className="text-xs font-semibold tracking-[0.3em] uppercase text-[#297EB3]">
          {lang === "hr" ? "Kviz završen" : "Quiz complete"}
        </p>
        <h2 className="font-cinzel text-3xl font-semibold text-gray-800">
          {lang === "hr" ? "Odgovorili ste na sva pitanja!" : "You've answered all questions!"}
        </h2>
        <div
          className="text-6xl font-cinzel font-bold"
          style={{ color: pct >= 50 ? "var(--color-nav-default)" : "#dc2626" }}
        >
          {score}/{questions.length}
        </div>
        <div
          className="text-xl font-semibold -mt-2"
          style={{ color: pct >= 50 ? "var(--color-nav-default)" : "#dc2626" }}
        >
          {pct}%
        </div>
        <div className="flex gap-4 mt-2">
          <button
            onClick={start}
            className="px-8 py-3 rounded-lg text-sm font-bold tracking-[0.15em] uppercase border-2 text-[#2973A8] border-[#2973A8] hover:bg-blue-50 transition-all"
          >
            {lang === "hr" ? "Pokušaj ponovo" : "Try again"}
          </button>
          <button
            onClick={() => setPhase("done")}
            className="px-8 py-3 rounded-lg text-sm font-bold tracking-[0.15em] uppercase text-white hover:opacity-90 transition-all"
            style={{ backgroundColor: "var(--color-nav-default)" }}
          >
            {lang === "hr" ? "Pogledaj rezultate" : "View results"}
          </button>
        </div>
      </div>
    );
  }

  if (phase === "active") {
    return (
      <QuestionCard
        question={currentQuestion}
        locale={locale}
        selected={currentSelected}
        onChange={handleAnswer}
        questionIndex={currentIndex}
        totalQuestions={questions.length}
        onNext={handleNext}
        isLast={currentIndex === questions.length - 1}
      />
    );
  }

  return (
    <ResultScreen
      questions={questions}
      answers={answers}
      locale={locale}
      onRestart={start}
    />
  );
}