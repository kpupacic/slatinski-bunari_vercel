"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import type { WaterSource } from "@/types";

interface Props {
  localityTypes: string[];
  activeTypes: Set<string>;
  onChange: (types: Set<string>) => void;
  sources: WaterSource[];
  onSelectSource?: (source: WaterSource) => void;
}

export default function MapSidebar({ localityTypes, activeTypes, onChange, sources, onSelectSource }: Props) {
  const t = useTranslations("map");
  const allSelected = activeTypes.size === localityTypes.length;
  const [expandedTypes, setExpandedTypes] = useState<Set<string>>(new Set());

  function toggleAll() {
    onChange(allSelected ? new Set() : new Set(localityTypes));
  }

  function toggleType(type: string) {
    const next = new Set(activeTypes);
    next.has(type) ? next.delete(type) : next.add(type);
    onChange(next);
  }

  function toggleExpand(type: string) {
    const next = new Set(expandedTypes);
    next.has(type) ? next.delete(type) : next.add(type);
    setExpandedTypes(next);
  }

  return (
    <aside className="w-full lg:w-60 max-h-60 lg:max-h-none bg-white rounded-lg shadow-md flex flex-col gap-1 py-4 px-5 shrink-0 overflow-y-auto">
      {/* Show all row */}
      <label className="flex items-center gap-3 cursor-pointer py-1 group">
        <span className={`w-5 h-5 rounded border-2 flex items-center justify-center shrink-0 transition-colors ${
          allSelected ? "border-blue-600 bg-blue-600" : "border-gray-400 group-hover:border-blue-400"
        }`}>
          {allSelected && (
            <svg className="w-3 h-3 text-white" viewBox="0 0 12 12" fill="none"><path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          )}
        </span>
        <span className="text-sm font-semibold text-gray-700">
          {t("showAll")}
        </span>
        <input type="checkbox" checked={allSelected} onChange={toggleAll} className="sr-only" />
      </label>

      {/* Divider */}
      <div className="border-t border-gray-100 my-1" />

      {/* Per-type rows */}
      {localityTypes.map((type) => {
        const checked = activeTypes.has(type);
        const expanded = expandedTypes.has(type);
        const typeSources = sources.filter((s) => s.localityType === type);

        return (
          <div key={type}>
            <div className="flex items-center gap-3 py-1 pl-2">
              <label className="flex items-center gap-3 cursor-pointer group flex-1">
                <span className={`w-5 h-5 rounded border-2 flex items-center justify-center shrink-0 transition-colors ${
                  checked ? "border-blue-600 bg-blue-600" : "border-gray-400 group-hover:border-blue-400"
                }`}>
                  {checked && <svg className="w-3 h-3 text-white" viewBox="0 0 12 12" fill="none"><path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>}
                </span>
                <span className="text-sm text-gray-700">
                  {t(`type_${type}` as never)}
                </span>
                <input type="checkbox" checked={checked} onChange={() => toggleType(type)} className="sr-only" />
              </label>

              {typeSources.length > 0 && (
                <button
                  onClick={() => toggleExpand(type)}
                  className="text-gray-400 hover:text-gray-600 transition-colors p-0.5"
                >
                  <svg className={`w-4 h-4 transition-transform ${expanded ? "rotate-180" : ""}`} viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                  </svg>
                </button>
              )}
            </div>

            {expanded && typeSources.length > 0 && (
              <div className="ml-10 mb-2">
                {typeSources.map((source) => (
                  <button
                    key={source.id}
                    onClick={() => onSelectSource?.(source)}
                    className="block text-xs text-gray-500 py-0.5 hover:text-blue-600 cursor-pointer text-left"
                  >
                    {source.name}
                  </button>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </aside>
  );
}
