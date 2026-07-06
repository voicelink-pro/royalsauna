import type { Locale } from "@/types";

/** Single source of truth for site-wide config. */
export const siteConfig = {
  name: "RoyalSauna",
  /** Fallback used when NEXT_PUBLIC_SITE_URL is not set (e.g. local dev). */
  defaultUrl: "https://royalsauna.pl",
  twitter: "@royalsauna",
} as const;

export function getSiteUrl(): string {
  const url = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "");
  return url && url.length > 0 ? url : siteConfig.defaultUrl;
}

export function absoluteUrl(path: string): string {
  const base = getSiteUrl();
  if (!path || path === "/") return base;
  return `${base}${path.startsWith("/") ? "" : "/"}${path}`;
}

/**
 * Maps a "logical" page key to its localized paths. Used for canonical URLs,
 * hreflang alternates and the sitemap. Keeping the map centralized means
 * adding a page (or changing a slug) happens in exactly one place.
 */
export const routeMap: Record<string, Record<Locale, string>> = {
  home: { pl: "/", en: "/en" },
  saunas: { pl: "/sauny", en: "/en/saunas" },
  quality: { pl: "/specyfikacja", en: "/en/quality" },
  heaters: { pl: "/specyfikacja/piece", en: "/en/quality/heaters" },
  wood: { pl: "/specyfikacja/drewno", en: "/en/quality/wood" },
  foundation: { pl: "/specyfikacja/podloze", en: "/en/quality/foundation" },
  configurator: { pl: "/konfigurator-oferty", en: "/en/offer-configurator" },
  blog: { pl: "/blog", en: "/en/blog" },
  contact: { pl: "/kontakt", en: "/en/contact" },
  privacy: { pl: "/polityka-prywatnosci", en: "/en/privacy-policy" },
  cookies: { pl: "/polityka-cookies", en: "/en/cookie-policy" },
};

export function getAlternates(plPath: string, enPath: string) {
  return {
    canonical: undefined as string | undefined,
    languages: {
      "pl-PL": absoluteUrl(plPath),
      en: absoluteUrl(enPath),
      "x-default": absoluteUrl(plPath),
    },
  };
}
