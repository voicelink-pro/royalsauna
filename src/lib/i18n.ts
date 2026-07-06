import type { Locale } from "@/types";
import { pl } from "@/content/i18n/pl";
import { en } from "@/content/i18n/en";

export type Dictionary = typeof pl;

const dictionaries: Record<Locale, Dictionary> = { pl, en };

export const locales: Locale[] = ["pl", "en"];
export const defaultLocale: Locale = "pl";

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale] ?? dictionaries[defaultLocale];
}

/**
 * Returns the canonical href for a route in a given locale.
 * PL lives at the root, EN is prefixed with `/en`.
 */
export function localizedPath(path: string, locale: Locale): string {
  const clean = path === "/" ? "" : path.replace(/^\/+/, "/");
  if (locale === "pl") return clean === "" ? "/" : clean;
  return clean === "" ? "/en" : `/en${clean}`;
}

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}
