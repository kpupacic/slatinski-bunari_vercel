"use client";

import { useState, useCallback } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import type { LatLngExpression } from "leaflet";
import { useLocale, useTranslations } from "next-intl";
import type { WaterSource } from "@/types";
import MapSidebar from "./MapSidebar";

// One color per locality type
const LOCALITY_COLORS: Record<string, string> = {
  bunari:             "#2563eb", // blue
  skrapinski_bunari:  "#16a34a", // green
  lokve:              "#9333ea", // purple
  gustirne:           "#ea580c", // orange
  kamenice:           "#11ddee", // cyan
};
const DEFAULT_COLOR = "#ef4444"; // red fallback

function colorForType(type: string): string {
  return LOCALITY_COLORS[type] ?? DEFAULT_COLOR;
}

function markerSvg(color: string) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="25" height="41" viewBox="0 0 25 41">
    <path d="M12.5 0C5.6 0 0 5.6 0 12.5C0 22 12.5 41 12.5 41S25 22 25 12.5C25 5.6 19.4 0 12.5 0Z" fill="${color}" stroke="#fff" stroke-width="1.5"/>
    <circle cx="12.5" cy="12.5" r="5.5" fill="#fff"/>
  </svg>`;
}

const iconCache = new Map<string, L.DivIcon>();

function iconForType(type: string): L.DivIcon {
  if (iconCache.has(type)) return iconCache.get(type)!;
  const icon = L.divIcon({
    html: markerSvg(colorForType(type)),
    className: "",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
  });
  iconCache.set(type, icon);
  return icon;
}

const TILE_LAYERS = {
  street: {
    url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  },
  satellite: {
    url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
    attribution: "Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community",
  },
} as const;

type LayerType = keyof typeof TILE_LAYERS;

// Slatine
const MAP_CENTER: LatLngExpression = [43.499, 16.334];
const MAP_ZOOM = 16;

interface Props {
  sources: WaterSource[];
}

function FlyToSource({ source, markerRefs }: { source: WaterSource | null; markerRefs: Map<number, L.Marker> }) {
  const map = useMap();
  if (source) {
    map.flyTo([source.latitude, source.longitude], 18, { duration: 0.8 });
    const marker = markerRefs.get(source.id);
    if (marker) {
      setTimeout(() => marker.openPopup(), 800);
    }
  }
  return null;
}

export default function WaterSourceMap({ sources }: Props) {
  const t = useTranslations("map");
  const locale = useLocale();
  const localityTypes = [...new Set(sources.map((s) => s.localityType))];
  const [activeTypes, setActiveTypes] = useState<Set<string>>(new Set(localityTypes));
  const [layer, setLayer] = useState<LayerType>("street");
  const [selectedSource, setSelectedSource] = useState<WaterSource | null>(null);
  const [markerRefs] = useState(() => new Map<number, L.Marker>());

  const visibleSources = sources.filter((s) => activeTypes.has(s.localityType));

  const handleSelectSource = useCallback((source: WaterSource) => {
    // Ensure the type is visible
    if (!activeTypes.has(source.localityType)) {
      const next = new Set(activeTypes);
      next.add(source.localityType);
      setActiveTypes(next);
    }
    setSelectedSource(source);
    // Reset after fly completes so it can be re-selected
    setTimeout(() => setSelectedSource(null), 1500);
  }, [activeTypes]);

  const setMarkerRef = useCallback((id: number, marker: L.Marker | null) => {
    if (marker) markerRefs.set(id, marker);
    else markerRefs.delete(id);
  }, [markerRefs]);

  return (
    <div className="flex px-60 py-7 gap-4" style={{ height: "calc(100vh - 168px)" }}>
      {/* Map fills remaining space */}
      <div className="relative flex-1 h-full">
        <MapContainer center={MAP_CENTER} zoom={MAP_ZOOM} className="w-full h-full rounded-lg shadow-md">
          <TileLayer
            key={layer}
            attribution={TILE_LAYERS[layer].attribution}
            url={TILE_LAYERS[layer].url}
          />
          <FlyToSource source={selectedSource} markerRefs={markerRefs} />
          {visibleSources.map((source) => (
            <Marker
              key={source.id}
              position={[source.latitude, source.longitude]}
              icon={iconForType(source.localityType)}
              ref={(ref) => setMarkerRef(source.id, ref as unknown as L.Marker | null)}
            >
              <Popup>
                <strong className="block text-sm mb-1">{source.name}</strong>
                <span className="block text-xs text-gray-600">
                  {t("clarity")}: {t("na")}
                </span>
                <span className="block text-xs text-gray-600">
                  {t("depth")}: 0 {t("depthUnit")}
                </span>
                <div className="my-1.5 w-full h-16 bg-gray-200 rounded flex items-center justify-center">
                  <span className="text-xs text-gray-400">{t("imagePlaceholder")}</span>
                </div>
                <a
                  href={`/${locale}/lokaliteti/${source.localityType}`}
                  className="text-xs text-blue-600 hover:underline"
                >
                  {t("learnMore")} →
                </a>
              </Popup>
            </Marker>
          ))}
        </MapContainer>

        {/* Layer toggle buttons */}
        <div className="absolute bottom-4 left-4 z-1000 flex rounded-md shadow-md overflow-hidden border border-gray-300">
          <button
            onClick={() => setLayer("street")}
            className={`px-3 py-1.5 text-sm font-medium ${layer === "street" ? "bg-gray-200 text-gray-900" : "bg-white text-gray-700"}`}
          >
            {t("streetView")}
          </button>
          <button
            onClick={() => setLayer("satellite")}
            className={`px-3 py-1.5 text-sm font-medium border-l border-gray-300 ${layer === "satellite" ? "bg-gray-200 text-gray-900" : "bg-white text-gray-700"}`}
          >
            {t("satelliteView")}
          </button>
        </div>
      </div>

      {/* Sidebar on the right */}
      <MapSidebar
        localityTypes={localityTypes}
        activeTypes={activeTypes}
        onChange={setActiveTypes}
        sources={sources}
        onSelectSource={handleSelectSource}
      />
    </div>
  );
}