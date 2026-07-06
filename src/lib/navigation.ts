import type { Locale } from "@/types";
import { routeMap } from "@/lib/site";
import { products } from "@/content/products";
import { blogPosts } from "@/content/blog";

export interface NavItem {
  key: string;
  label: string;
  href: string;
}

/**
 * Builds the primary navigation for a locale, pulling labels from the
 * dictionary and hrefs from the central route map.
 */
export function getNavItems(
  locale: Locale,
  labels: {
    saunas: string;
    quality: string;
    configurator: string;
    blog: string;
    contact: string;
  },
): NavItem[] {
  return [
    { key: "saunas", label: labels.saunas, href: routeMap.saunas[locale] },
    { key: "quality", label: labels.quality, href: routeMap.quality[locale] },
    {
      key: "configurator",
      label: labels.configurator,
      href: routeMap.configurator[locale],
    },
    { key: "blog", label: labels.blog, href: routeMap.blog[locale] },
    { key: "contact", label: labels.contact, href: routeMap.contact[locale] },
  ];
}

/**
 * Given the current pathname, returns the equivalent path in the target locale.
 * Handles static routes (via routeMap), product pages and blog posts. Falls
 * back to the target locale home if no mapping is found.
 */
export function getAlternatePath(
  currentPath: string,
  targetLocale: Locale,
): string {
  const path = currentPath.replace(/\/$/, "") || "/";

  // Static routes from the central map.
  for (const entry of Object.values(routeMap)) {
    if (entry.pl === path) return entry[targetLocale];
    if (entry.en === path) return entry[targetLocale];
  }

  // Product detail pages.
  for (const p of products) {
    if (path === `/sauny/${p.slug}` || path === `/en/saunas/${p.enSlug}`) {
      return targetLocale === "pl"
        ? `/sauny/${p.slug}`
        : `/en/saunas/${p.enSlug}`;
    }
  }

  // Blog posts.
  for (const post of blogPosts) {
    if (path === `/blog/${post.slug}` || path === `/en/blog/${post.enSlug}`) {
      return targetLocale === "pl"
        ? `/blog/${post.slug}`
        : `/en/blog/${post.enSlug}`;
    }
  }

  // Fallback: locale home.
  return targetLocale === "pl" ? "/" : "/en";
}
