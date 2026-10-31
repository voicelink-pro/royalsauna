import type { Locale } from "@/types";
import { routeMap } from "@/lib/site";
import { products } from "@/content/products";

/** Canonical keys that resolve to a path (routeMap, product, or blog post). */
export type VoicePageKey = string;

function normalizePath(pathname: string): string {
  if (!pathname || pathname === "/") return "/";
  const trimmed = pathname.replace(/\/+$/, "");
  return trimmed || "/";
}

function normalizeAlias(value: string): string {
  return value.trim().toLowerCase().replace(/_/g, "-");
}

/**
 * Agent / Polish aliases AND routeMap keys → canonical page key.
 * Source of truth for paths is still {@link routeMap} plus product/blog slugs.
 */
const ALIASES: Record<string, string> = {
  home: "home",
  sauny: "saunas",
  saunas: "saunas",
  compact: "compact",
  comfort: "comfort",
  premium: "premium",
  specyfikacja: "quality",
  quality: "quality",
  piece: "heaters",
  heaters: "heaters",
  drewno: "wood",
  wood: "wood",
  podloze: "foundation",
  foundation: "foundation",
  "pakiet-powitalny": "welcomePackage",
  welcomepackage: "welcomePackage",
  "welcome-package": "welcomePackage",
  konfigurator: "configurator",
  configurator: "configurator",
  "konfigurator-oferty": "configurator",
  "offer-configurator": "configurator",
  blog: "blog",
  kontakt: "contact",
  contact: "contact",
  "polityka-prywatnosci": "privacy",
  privacy: "privacy",
  "privacy-policy": "privacy",
  "polityka-cookies": "cookies",
  cookies: "cookies",
  "cookie-policy": "cookies",
  "sauna-a-stres": "sauna-a-stres",
  "sauna-and-stress": "sauna-a-stres",
  "korzysci-sauny-dla-zdrowia": "korzysci-sauny-dla-zdrowia",
  "sauna-health-benefits": "korzysci-sauny-dla-zdrowia",
  "ile-razy-w-tygodniu": "ile-razy-w-tygodniu",
  "ile-razy-w-tygodniu-korzystac-z-sauny": "ile-razy-w-tygodniu",
  "how-often-to-use-a-sauna": "ile-razy-w-tygodniu",
  "thermowood": "thermowood-blog",
  "thermowood-dlaczego-najlepsze-drewno": "thermowood-blog",
  "thermowood-why-the-best-wood": "thermowood-blog",
  "swierk-skandynawski": "thermowood-blog",
  "swierk-skandynawski-dlaczego-najlepszy": "thermowood-blog",
  "scandinavian-spruce-why-the-best": "thermowood-blog",
  "jaki-rozmiar-sauny": "jaki-rozmiar-sauny",
  "jaki-rozmiar-sauny-wybrac": "jaki-rozmiar-sauny",
  "which-sauna-size-to-choose": "jaki-rozmiar-sauny",
  "domowy-rytual-sauny": "domowy-rytual-sauny",
  "home-sauna-ritual": "domowy-rytual-sauny",
};

const BLOG_PATHS: Record<string, Record<Locale, string>> = {
  "sauna-a-stres": {
    pl: "/blog/sauna-a-stres",
    en: "/en/blog/sauna-and-stress",
  },
  "korzysci-sauny-dla-zdrowia": {
    pl: "/blog/korzysci-sauny-dla-zdrowia",
    en: "/en/blog/sauna-health-benefits",
  },
  "ile-razy-w-tygodniu": {
    pl: "/blog/ile-razy-w-tygodniu-korzystac-z-sauny",
    en: "/en/blog/how-often-to-use-a-sauna",
  },
  "thermowood-blog": {
    pl: "/blog/thermowood-dlaczego-najlepsze-drewno",
    en: "/en/blog/thermowood-why-the-best-wood",
  },
  "jaki-rozmiar-sauny": {
    pl: "/blog/jaki-rozmiar-sauny-wybrac",
    en: "/en/blog/which-sauna-size-to-choose",
  },
  "domowy-rytual-sauny": {
    pl: "/blog/domowy-rytual-sauny",
    en: "/en/blog/home-sauna-ritual",
  },
};

const PRODUCT_KEYS = new Set(["compact", "comfort", "premium"]);

function productPath(key: string, locale: Locale): string | null {
  const product = products.find((p) => p.id === key);
  if (!product) return null;
  return locale === "pl"
    ? `/sauny/${product.slug}`
    : `/en/saunas/${product.enSlug}`;
}

export function localeFromPath(pathname: string): Locale {
  const path = normalizePath(pathname);
  return path === "/en" || path.startsWith("/en/") ? "en" : "pl";
}

export function isConfiguratorPath(pathname: string): boolean {
  return pageKeyFromPath(pathname) === "configurator";
}

export function resolveVoicePage(
  page: string,
  locale: Locale,
): { key: string; path: string } | null {
  const trimmed = page.trim();
  if (!trimmed) return null;

  if (trimmed.startsWith("/")) {
    const key = pageKeyFromPath(trimmed);
    if (key === "unknown") return null;
    return resolveCanonicalKey(key, locale);
  }

  const key = ALIASES[normalizeAlias(trimmed)];
  if (!key) return null;
  return resolveCanonicalKey(key, locale);
}

function resolveCanonicalKey(
  key: string,
  locale: Locale,
): { key: string; path: string } | null {
  if (key in routeMap) {
    return { key, path: routeMap[key][locale] };
  }
  if (PRODUCT_KEYS.has(key)) {
    const path = productPath(key, locale);
    return path ? { key, path } : null;
  }
  if (key in BLOG_PATHS) {
    return { key, path: BLOG_PATHS[key][locale] };
  }
  return null;
}

/** Reverse-lookup: current pathname → canonical page key. */
export function pageKeyFromPath(pathname: string): string {
  const path = normalizePath(pathname);

  for (const [key, paths] of Object.entries(BLOG_PATHS)) {
    if (paths.pl === path || paths.en === path) return key;
  }

  for (const product of products) {
    if (
      path === `/sauny/${product.slug}` ||
      path === `/en/saunas/${product.enSlug}`
    ) {
      return product.id;
    }
  }

  for (const [key, entry] of Object.entries(routeMap)) {
    if (entry.pl === path || entry.en === path) return key;
  }

  return path === "/" ? "home" : "unknown";
}

export function currentPathname(): string {
  if (typeof window === "undefined") return "/";
  return normalizePath(window.location.pathname);
}

export { normalizePath };
