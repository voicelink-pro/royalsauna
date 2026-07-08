import type { MetadataRoute } from "next";
import { getSiteUrl, routeMap } from "@/lib/site";
import { products } from "@/content/products";
import { blogPosts } from "@/content/blog";

/**
 * hreflang codes must match `buildMetadata()` in `@/lib/seo` exactly
 * ("pl-PL", not "pl") so the <head> alternates and the sitemap agree —
 * search engines treat a mismatch as a signal to distrust both.
 */
function languageAlternates(pl: string, en: string) {
  return { "pl-PL": pl, en, "x-default": pl };
}

export default function sitemap(): MetadataRoute.Sitemap {
  const base = getSiteUrl();
  const now = new Date();
  const home = (path: string) => `${base}${path === "/" ? "" : path}`;

  const staticEntries: MetadataRoute.Sitemap = Object.values(routeMap).flatMap(
    (entry) => {
      const plUrl = home(entry.pl);
      const enUrl = home(entry.en);
      const alternates = { languages: languageAlternates(plUrl, enUrl) };
      const priority = entry.pl === "/" ? 1 : 0.8;

      return [
        { url: plUrl, lastModified: now, changeFrequency: "monthly", priority, alternates },
        { url: enUrl, lastModified: now, changeFrequency: "monthly", priority, alternates },
      ];
    },
  );

  const productEntries: MetadataRoute.Sitemap = products.flatMap((p) => {
    const plUrl = `${base}/sauny/${p.slug}`;
    const enUrl = `${base}/en/saunas/${p.enSlug}`;
    const alternates = { languages: languageAlternates(plUrl, enUrl) };

    return [
      { url: plUrl, lastModified: now, changeFrequency: "monthly", priority: 0.9, alternates },
      { url: enUrl, lastModified: now, changeFrequency: "monthly", priority: 0.9, alternates },
    ];
  });

  const blogEntries: MetadataRoute.Sitemap = blogPosts.flatMap((post) => {
    const plUrl = `${base}/blog/${post.slug}`;
    const enUrl = `${base}/en/blog/${post.enSlug}`;
    const alternates = { languages: languageAlternates(plUrl, enUrl) };
    const lastModified = new Date(post.date);

    return [
      { url: plUrl, lastModified, changeFrequency: "yearly", priority: 0.6, alternates },
      { url: enUrl, lastModified, changeFrequency: "yearly", priority: 0.6, alternates },
    ];
  });

  return [...staticEntries, ...productEntries, ...blogEntries];
}
