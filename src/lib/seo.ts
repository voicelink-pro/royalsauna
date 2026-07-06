import type { Metadata } from "next";
import type { Locale, SaunaSize } from "@/types";
import { absoluteUrl, getSiteUrl, routeMap } from "@/lib/site";
import { getProduct } from "@/content/products";

interface BuildMetadataArgs {
  title: string;
  description: string;
  locale: Locale;
  /** Canonical path for the current locale, e.g. "/sauny" or "/en/saunas". */
  path: string;
  /** Alternate paths keyed by locale for hreflang. */
  alternates: Record<Locale, string>;
  image?: string;
  type?: "website" | "article";
  noindex?: boolean;
}

const ogLocaleMap: Record<Locale, string> = {
  pl: "pl_PL",
  en: "en_US",
};

/**
 * Centralized metadata builder: canonical URL, hreflang alternates, Open Graph
 * and Twitter cards. Every page should call this for consistent SEO.
 */
export function buildMetadata({
  title,
  description,
  locale,
  path,
  alternates,
  image,
  type = "website",
  noindex = false,
}: BuildMetadataArgs): Metadata {
  const canonical = absoluteUrl(path);
  const ogImage = image ?? `${getSiteUrl()}/og-image.jpg`;

  return {
    title,
    description,
    metadataBase: new URL(getSiteUrl()),
    alternates: {
      canonical,
      languages: {
        "pl-PL": absoluteUrl(alternates.pl),
        en: absoluteUrl(alternates.en),
        "x-default": absoluteUrl(alternates.pl),
      },
    },
    robots: noindex
      ? { index: false, follow: false }
      : { index: true, follow: true },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: "RoyalSauna",
      locale: ogLocaleMap[locale],
      type,
      images: [{ url: ogImage, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

/**
 * Convenience builder for pages whose paths live in the central `routeMap`.
 */
export function pageMetadata(args: {
  locale: Locale;
  routeKey: keyof typeof routeMap;
  title: string;
  description: string;
  type?: "website" | "article";
}): Metadata {
  const { locale, routeKey, title, description, type } = args;
  const entry = routeMap[routeKey];
  return buildMetadata({
    title,
    description,
    locale,
    path: entry[locale],
    alternates: { pl: entry.pl, en: entry.en },
    type,
  });
}

export function productMetadata(
  locale: Locale,
  size: SaunaSize,
): Metadata {
  const product = getProduct(size);
  if (!product) return {};
  const copy = product.i18n[locale];
  const plPath = `/sauny/${product.slug}`;
  const enPath = `/en/saunas/${product.enSlug}`;
  return buildMetadata({
    title: `${product.name} – ${copy.tagline}`,
    description: copy.shortDescription,
    locale,
    path: locale === "pl" ? plPath : enPath,
    alternates: { pl: plPath, en: enPath },
    image: product.images[0]?.src,
  });
}
