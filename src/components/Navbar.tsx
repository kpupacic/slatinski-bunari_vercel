"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { routing } from "@/i18n/routing";

const LOCALITY_DROPDOWN = [
  { key: "bunari",            label: "Bunari" },
  { key: "skrapinski_bunari", label: "Škrapinski bunari" },
  { key: "gustirne",          label: "Gustirne" },
  { key: "lokve",             label: "Lokve" },
  { key: "kamenice",          label: "Kamenice" },
];

export default function Navbar() {
  const t = useTranslations("nav");
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const [localitiesOpen, setLocalitiesOpen] = useState(false);

  function switchLocale(next: string) {
    const segments = pathname.split("/");
    segments[1] = next;
    router.push(segments.join("/") || "/");
  }

  const navLinks = [
    { href: `/${locale}`, label: t("home") },
    { href: `/${locale}/lokaliteti`, label: t("localities") },
    { href: `/${locale}/kviz`, label: t("quiz") },
    { href: `/${locale}/o-projektu`, label: t("about") },
  ];

  function isActive(href: string) {
    if (href === `/${locale}`) return pathname === `/${locale}` || pathname === `/${locale}/`;
    return pathname.startsWith(href);
  }

  return (
    <header>
      {/* Header */}
      <div style={{ backgroundColor: "var(--color-header-bg)" }} className="px-9 py-7 flex items-center gap-8">
        <Link href={`/${locale}`} className="flex items-center gap-9">
          <Image
            src="/images/logos/slatinskiBunari_logo.png"
            alt="Slatinski Bunari"
            width={56}
            height={56}
            className="object-contain"
          />
          <div className="flex items-baseline gap-3 translate-y-1">
            <h1 className="font-cinzel text-5xl font-semibold tracking-[0.2em] uppercase text-white leading-none">
              Slatinski Bunari
            </h1>
            <span className="font-karla text-base tracking-[0.3em] uppercase text-white/80">
              &hellip; iliti ko&apos; jema vodu je kralj
            </span>
          </div>
        </Link>

        {/* Change languages */}
        <div className="ml-auto flex gap-1 text-xs">
          {routing.locales.map((l) => (
            <button
              key={l}
              onClick={() => switchLocale(l)}
              style={l === locale ? { backgroundColor: "var(--color-nav-active)" } : undefined}
              className={`px-3 py-1.5 rounded font-semibold tracking-wider uppercase transition-colors text-white ${
                l !== locale ? "hover:text-white/70" : ""
              }`}
            >
              {l}
            </button>
          ))}
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex shadow-md">
        {navLinks.map(({ href, label }, i) => {
          const isLocaliteti = href === `/${locale}/lokaliteti`;
          const active = isActive(href);
          const borderClass = i < navLinks.length - 1 ? "border-r" : "";

          if (isLocaliteti) {
            return (
              <div
                key={href}
                className={`relative flex-1 ${borderClass}`}
                style={{ borderColor: "var(--color-nav-divider)" }}
                onMouseEnter={() => setLocalitiesOpen(true)}
                onMouseLeave={() => setLocalitiesOpen(false)}
              >
                <Link
                  href={href}
                  style={{ backgroundColor: active ? "var(--color-nav-active)" : "var(--color-nav-default)" }}
                  onMouseEnter={(e) => {
                    if (!active)
                      (e.currentTarget as HTMLElement).style.backgroundColor = "var(--color-nav-hover)";
                  }}
                  onMouseLeave={(e) => {
                    if (!active)
                      (e.currentTarget as HTMLElement).style.backgroundColor = "var(--color-nav-default)";
                  }}
                  className="block text-center py-4 text-sm font-bold tracking-[0.25em] uppercase text-white transition-colors w-full"
                >
                  {label}
                </Link>

                {localitiesOpen && (
                  <div
                    className="absolute left-0 right-0 top-full z-1000 shadow-md"
                    style={{ backgroundColor: "var(--color-nav-default)" }}
                  >
                    {LOCALITY_DROPDOWN.map((item) => (
                      <Link
                        key={item.key}
                        href={`/${locale}/lokaliteti/${item.key}`}
                        style={{ borderColor: "var(--color-nav-divider)", backgroundColor: "var(--color-nav-default)" }}
                        onMouseEnter={(e) => (e.currentTarget as HTMLElement).style.backgroundColor = "var(--color-nav-hover)"}
                        onMouseLeave={(e) => (e.currentTarget as HTMLElement).style.backgroundColor = "var(--color-nav-default)"}
                        className="block text-center py-3 text-xs font-bold tracking-[0.2em] uppercase text-white border-t transition-colors"
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            );
          }

          return (
            <Link
              key={href}
              href={href}
              style={{
                backgroundColor: active ? "var(--color-nav-active)" : "var(--color-nav-default)",
                borderColor: "var(--color-nav-divider)",
              }}
              onMouseEnter={(e) => {
                if (!active)
                  (e.currentTarget as HTMLElement).style.backgroundColor = "var(--color-nav-hover)";
              }}
              onMouseLeave={(e) => {
                if (!active)
                  (e.currentTarget as HTMLElement).style.backgroundColor = "var(--color-nav-default)";
              }}
              className={`flex-1 text-center py-4 text-sm font-bold tracking-[0.25em] uppercase text-white transition-colors ${borderClass}`}
            >
              {label}
            </Link>
          );
        })}
      </nav>
    </header>
  );
}
