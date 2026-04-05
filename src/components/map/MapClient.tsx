"use client";

import dynamic from "next/dynamic";
import type { WaterSource } from "@/types";

const WaterSourceMap = dynamic(() => import("./WaterSourceMap"), { ssr: false });

export default function MapClient({ sources }: { sources: WaterSource[] }) {
  return <WaterSourceMap sources={sources} />;
}
