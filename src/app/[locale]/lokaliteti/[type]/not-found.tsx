import { getLocale } from "next-intl/server";
import Image from "next/image";
import Link from "next/link";

export default async function NotFound() {
  const locale = await getLocale();

  return (
    <div className="flex-1 flex flex-col items-center justify-center px-6 py-16 text-center gap-8">
      <div className="w-60 h-60 relative">
        <Image
          src="/images/dry-well-404.jpg"
          alt="Suhi bunar"
          fill
          className="object-cover rounded-full"
        />
      </div>
      <div className="space-y-3">
        <h1 className="font-cinzel text-5xl font-bold text-[#205A83]">404</h1>
        <p className="font-cinzel text-xl font-semibold text-gray-700">
          {locale === "en" ? "This well has run dry." : "Ovaj bunar je presušio."}
        </p>
        <p className="text-sm text-gray-500 max-w-sm mx-auto">
          {locale === "en"
            ? "No water sources were found for this locality type."
            : "Nisu pronađeni vodni izvori za ovaj tip lokaliteta."}
        </p>
      </div>
      <Link
        href={`/${locale}/lokaliteti`}
        className="px-8 py-3 rounded-lg text-sm font-bold tracking-[0.15em] uppercase text-white hover:opacity-90 transition-all"
        style={{ backgroundColor: "var(--color-nav-default)" }}
      >
        {locale === "en" ? "← All localities" : "← Svi lokaliteti"}
      </Link>
    </div>
  );
}
