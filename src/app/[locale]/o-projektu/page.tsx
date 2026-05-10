import { getTranslations } from "next-intl/server";
import Image from "next/image";

const sponsors = [
  {
    src: "/images/logos/MZO transparent.jpg",
    alt: "MZO",
    nameKey: "partnerMZO" as const,
  },
  {
    src: "/images/logos/IDIZ logo transparent.png",
    alt: "IDIZ",
    nameKey: "partnerIDIZ" as const,
  },
  {
    src: "/images/logos/split transparent.png",
    alt: "Grad Split",
    nameKey: "partnerCity" as const,
  },
  {
    src: "/images/logos/A1_red_logo transparent.png",
    alt: "A1 Hrvatska",
    nameKey: "partnerA1" as const,
  },
];

export default async function OProjektuPage() {
  const t = await getTranslations("about");

  return (
    <div className="px-4 md:px-12 lg:px-16 xl:px-60 py-7 space-y-8">
      {/* About the Project */}
      <section>
        <h1 className="font-cinzel text-3xl font-semibold text-[#205A83] tracking-wide mb-6">
          {t("title")}
        </h1>

        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
          <div className="flex-1 space-y-5">
            <p className="text-base leading-7 text-gray-700 text-justify">
              {t("introText")}
            </p>
            <p className="text-base leading-7 text-gray-700 text-justify">
              {t("introText2")}
            </p>
          </div>

          {/* Project image */}
          <div className="w-full md:w-140 shrink-0">
            <div className="aspect-4/3 rounded-xl overflow-hidden relative">
              <Image
                src="/images/os_slatine_projekt_glina.jpg"
                alt="OŠ Slatine projekt Glina"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>

        {/* Goal highlight box */}
        <div className="mt-10 bg-[#297EB3]/6 border-l-4 border-[#297EB3] rounded-r-lg px-8 py-6">
          <h3 className="font-cinzel text-lg font-semibold text-[#205A83] mb-2">
            {t("goalTitle")}
          </h3>
          <p className="text-base leading-7 text-gray-700">
            {t("goalText")}
          </p>
        </div>
      </section>

      <hr className="border-gray-200" />

      {/* School Section */}
      <section>
        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
          {/* School logo */}
          <div className="w-48 shrink-0 flex flex-col items-center">
            <div className="w-36 h-36 relative mb-4">
              <Image
                src="/images/logos/OS slatine transparent.png"
                alt="OŠ Slatine"
                fill
                className="object-contain"
              />
            </div>
            <p className="text-xs text-gray-400 text-center leading-relaxed">
              {t("schoolAddress")}
            </p>
          </div>

          <div className="flex-1 space-y-4">
            <h2 className="font-cinzel text-3xl font-semibold text-[#205A83] tracking-wide">
              {t("schoolTitle")}
            </h2>
            <p className="text-base leading-7 text-gray-700 text-justify">
              {t("schoolText")}
            </p>
            <p className="text-base leading-7 text-gray-700 text-justify">
              {t("schoolText2")}
            </p>
          </div>
        </div>

        {/* School gallery */}
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {[
            { src: "/images/skola_velika.jpg", alt: "Škola Velika" },
            { src: "/images/bunari_glina.jpg", alt: "Bunari Glina" },
            { src: "/images/slatine_crtez.jpg", alt: "Slatine crtež" },
          ].map((img) => (
            <div key={img.src} className="aspect-16/10 rounded-lg overflow-hidden relative">
              <Image src={img.src} alt={img.alt} fill className="object-cover" />
            </div>
          ))}
        </div>
      </section>

      <hr className="border-gray-200" />

      {/* STEM Femme Section */}
      <section>
        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
          <div className="flex-1 space-y-4">
            <h2 className="font-cinzel text-3xl font-semibold text-[#205A83] tracking-wide">
              {t("stemTitle")}
            </h2>
            <p className="text-sm text-[#297EB3] font-medium tracking-wide uppercase">
              {t("stemSubtitle")}
            </p>
            <p className="text-base leading-7 text-gray-700 text-justify">
              {t("stemText")}
            </p>
            <p className="text-base leading-7 text-gray-700 text-justify">
              {t("stemText2")}
            </p>
          </div>

          {/* STEaM logo */}
          <div className="w-48 shrink-0 flex flex-col items-center justify-center">
            <div className="w-40 h-40 relative">
              <Image
                src="/images/logos/STEaM logo transparent.png"
                alt="STEaM"
                fill
                className="object-contain"
              />
            </div>
          </div>
        </div>
      </section>

      <hr className="border-gray-200" />

      {/* Sponsors Section */}
      <section className="text-center py-4">
        <h2 className="font-cinzel text-3xl font-semibold text-[#205A83] tracking-wide mb-3">
          {t("sponsorsTitle")}
        </h2>
        <p className="text-base text-gray-500 mb-12 max-w-2xl mx-auto">
          {t("sponsorsText")}
        </p>

        <div className="flex items-center justify-center gap-12 flex-wrap">
          {sponsors.map((sponsor) => (
            <div
              key={sponsor.alt}
              className="group flex flex-col items-center gap-3"
            >
              <div className="relative w-20 h-20 grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300">
                <Image
                  src={sponsor.src}
                  alt={sponsor.alt}
                  fill
                  className="object-contain"
                />
              </div>
              <span className="text-xs text-gray-400 group-hover:text-gray-600 transition-colors duration-300 max-w-30 text-center">
                {t(sponsor.nameKey)}
              </span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
