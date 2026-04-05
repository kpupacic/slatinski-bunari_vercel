import { getLocale } from "next-intl/server";
import Quiz from "@/components/quiz/Quiz";

export default async function KvizPage() {
  const locale = await getLocale();

  return (
    <div className="flex-1 flex items-center justify-center px-6 py-6">
      <div className="w-full max-w-4xl">
        <Quiz locale={locale} />
      </div>
    </div>
  );
}