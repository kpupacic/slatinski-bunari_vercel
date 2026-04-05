import { getLocale } from "next-intl/server";
import Link from "next/link";
import LightboxImage from "@/components/LightboxImage";
import { prisma } from "@/lib/prisma";

const TYPE_KEYS = ["bunari", "skrapinski_bunari", "gustirne", "lokve", "kamenice"] as const;
export type LocalityTypeKey = (typeof TYPE_KEYS)[number];

const TYPE_NAMES: Record<LocalityTypeKey, string> = {
  bunari: "Bunari",
  skrapinski_bunari: "Škrapinski bunari",
  gustirne: "Gustirne",
  lokve: "Lokve",
  kamenice: "Kamenice",
};

const TYPE_DESCRIPTIONS: Record<LocalityTypeKey, string> = {
  bunari:
    "<b>Bunari</b> su dublji i uski, strukturalno ojačani - obzidani iskopi okomitih stijenki te se voda za korištenje iz njih vadi pomoću posuda ili pumpi. Kako bi bila dostupna za piće životinjama na kontrolirani način, voda se pretače u kamenice ili korita u neposrednoj blizini. Bunari su ponekad i natkriveni, svođeni.",
  skrapinski_bunari:
    "<b>Škraparski bunari</b> su potpuno prirodne krške tvorevine - udubine okomitih tj. strmih stijenki gdje je prirodnim procesom taloženja materijala dno postalo vodonepropusno i omogućilo akumulaciju vode.",
  gustirne:
    "<b>Gustirne (cisterne, šterne, čatrnje) su udubine, šupljine</b> između prirodnih stijena nepravilnog oblika koje su ljudi dodatno uredili: vapnom ili drugim veznim mješavinama zabrtvili pukotine u svrhu vododrživosti, ponekad i natkrili tj. zatvorili. Kao i kod bunara, voda se iz njih vadi.",
  lokve:
    "<b>Lokve</b> su šire i pliće udubine, barem dijelom položenih obala, vodne površine dostupne ljudima i životinjama direktnim pristupom.",
  kamenice:
    "<b>Kamenice</b> su male prirodne ili isklesane udubine u kamenu koje skupljaju kišnicu. Služile su kao izvor pitke vode za ljude i životinje na putovima i pašnjacima.",
};

export { TYPE_NAMES };

export default async function LocalitetiPage() {
  const locale = await getLocale();

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
              dangerouslySetInnerHTML={{ __html: TYPE_DESCRIPTIONS[key] }}
            />
          ))}
        </div>

        <div className="w-full xl:w-130 self-center mx-auto max-w-sm xl:max-w-none xl:mx-0">
          <LightboxImage
            src="/images/vrste lokaliteta info.png"
            alt="Vrste vodnih lokaliteta — dijagram"
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
              {TYPE_NAMES[key]}
            </span>
          </Link>
        ))}
      </div>

    </div>
  );
}
