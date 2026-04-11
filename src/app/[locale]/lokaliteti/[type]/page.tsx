import { getTranslations } from "next-intl/server";
import { getLocale } from "next-intl/server";
import Link from "next/link";
import LightboxImage from "@/components/LightboxImage";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { type LocalityTypeKey } from "../page";

function toEmbedUrl(url: string): string {
  const shortMatch = url.match(/youtu\.be\/([^?]+)/);
  if (shortMatch) return `https://www.youtube-nocookie.com/embed/${shortMatch[1]}`;
  const longMatch = url.match(/[?&]v=([^&]+)/);
  if (longMatch) return `https://www.youtube-nocookie.com/embed/${longMatch[1]}`;
  return url;
}

interface Props {
  params: Promise<{ type: string }>;
}

export default async function LocalityTypePage({ params }: Props) {
  const { type } = await params;
  const t = await getTranslations("localities");
  const locale = await getLocale();

  const sources = await prisma.waterSource.findMany({
    where: { localityType: type },
    orderBy: { name: "asc" },
  });

  if (sources.length === 0) notFound();

  const typeName = t(`typeName_${type as LocalityTypeKey}` as never) ?? type;

  return (
    <div className="px-4 md:px-12 lg:px-60 py-7">

      {/* Back link + heading */}
      <div className="space-y-2 mb-10">
        <Link href={`/${locale}/lokaliteti`} className="text-sm text-[#297EB3] hover:underline">
          {t("backToAll")}
        </Link>
        <h1 className="font-cinzel text-3xl font-bold tracking-wide text-gray-800">
          {typeName}
        </h1>
      </div>

      {/* Source entries */}
      {sources.map((source, index) => (
        <div key={source.id}>
          {/* Separator between entries */}
          {index > 0 && (
            <div className="flex items-center gap-4 my-14">
              <div className="flex-1 h-px bg-linear-to-r from-transparent via-[#297EB3]/40 to-transparent" />
              <div className="w-2 h-2 rounded-full bg-[#297EB3]/30" />
              <div className="flex-1 h-px bg-linear-to-r from-transparent via-[#297EB3]/40 to-transparent" />
            </div>
          )}

          <article id={`source-${source.id}`} className="scroll-mt-8">
            <h2 className="font-cinzel text-2xl font-semibold text-gray-800 mb-5">
              {source.name}
            </h2>

            <div className="space-y-5">

                {/* Info */}
                <div className="flex flex-wrap gap-6 md:gap-15">
                  <div>
                    <span className="block text-xs font-medium text-gray-400 uppercase tracking-wide mb-0.5">
                      {t("coordinates")}
                    </span>
                    <span className="text-base font-semibold text-gray-800">
                      {source.latitude.toFixed(5)}, {source.longitude.toFixed(5)}
                    </span>
                  </div>
                </div>

                {/* Description */}
                <div>
                  <h3 className="text-xs font-medium text-gray-400 uppercase tracking-wide mb-1.5">
                    {t("description")}
                  </h3>
                  <p className="text-sm leading-7 text-gray-700">
                    {locale === "en" && source.shortDescriptionEn
                      ? source.shortDescriptionEn
                      : source.shortDescription}
                  </p>
                </div>

                {/* Photos + Video */}
                {(() => {
                  const media = [];
                  source.photos.slice(0, 3).forEach((url, i) => {
                    media.push({
                      key: `photo-${i}`,
                      node: (
                        <div className="relative aspect-4/3 rounded-lg overflow-hidden border border-gray-200">
                          <LightboxImage src={url} alt={`${source.name} — ${i + 1}`} fill className="object-cover" />
                        </div>
                      ),
                    });
                  });
                  if (media.length < 3 && source.youtubeVideoUrl) {
                    media.push({
                      key: "video",
                      node: (
                        <div className="aspect-4/3 rounded-lg overflow-hidden border border-gray-200">
                          <iframe
                            src={toEmbedUrl(source.youtubeVideoUrl)}
                            title={source.name}
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            className="w-full h-full"
                          />
                        </div>
                      ),
                    });
                  }
                  if (media.length === 0) return null;
                  return (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                      {media.map(({ key, node }) => <div key={key}>{node}</div>)}
                    </div>
                  );
                })()}
            </div>
          </article>
        </div>
      ))}
    </div>
  );
}
