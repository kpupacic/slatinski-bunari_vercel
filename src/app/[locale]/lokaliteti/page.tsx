import { getLocale, getTranslations } from "next-intl/server";
import Link from "next/link";
import LightboxImage from "@/components/LightboxImage";
import { prisma } from "@/lib/prisma";

const TYPE_KEYS = ["bunari", "skrapinski_bunari", "gustirne", "lokve", "kamenice"] as const;
export type LocalityTypeKey = (typeof TYPE_KEYS)[number];

export default async function LocalitetiPage() {
  const locale = await getLocale();
  const t = await getTranslations("localities");

  const typesInDb = await prisma.waterSource.findMany({
    select: { localityType: true },
    distinct: ["localityType"],
  });
  const activeTypes = new Set(typesInDb.map((r) => r.localityType));

  return (
    <div className="px-4 md:px-12 lg:px-60 py-7 space-y-8">
      <div className="flex flex-col xl:flex-row gap-8 xl:gap-14">

        <div className="flex-1 space-y-4 text-base leading-7 text-gray-700 self-center text-justify">
          {TYPE_KEYS.map((key) => (
            <p
              key={key}
              dangerouslySetInnerHTML={{ __html: t.raw(`typeDescription_${key}` as never) }}
            />
          ))}
        </div>

        <div className="w-full xl:w-130 self-center mx-auto max-w-sm xl:max-w-none xl:mx-0">
          <LightboxImage
            src="/images/vrste lokaliteta info.png"
            alt={t("title")}
            width={400}
            height={540}
            className="w-full h-auto rounded-lg"
          />
        </div>
      </div>

      {/* Cards grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
        {TYPE_KEYS.map((key) => (
          <Link
            key={key}
            href={activeTypes.has(key) ? `/${locale}/lokaliteti/${key}` : "#"}
            className={`
              flex items-center justify-center rounded-lg
              aspect-square text-center px-4
              transition-colors duration-200
              ${activeTypes.has(key)
                ? "bg-[#297EB3] hover:bg-[#103855] cursor-pointer"
                : "bg-gray-300 cursor-default"}
            `}
          >
            <span className="font-bold tracking-[0.12em] uppercase text-white text-sm leading-6">
              {t(`typeName_${key}` as never)}
            </span>
          </Link>
        ))}
      </div>

    </div>
  );
}
