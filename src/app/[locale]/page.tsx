import { prisma } from "@/lib/prisma";
import MapClient from "@/components/map/MapClient";
import "leaflet/dist/leaflet.css";

export default async function HomePage() {
  const sources = await prisma.waterSource.findMany({
    orderBy: { name: "asc" },
  });

  return <MapClient sources={sources} />;
}
