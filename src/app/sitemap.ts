import type { MetadataRoute } from "next";
import { getSiteUrl, routeMap } from "@/lib/site";
import { products } from "@/content/products";
import { blogPosts } from "@/content/blog";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = getSiteUrl();
  const now = new Date();

  const staticEntries: MetadataRoute.Sitemap = Object.values(routeMap).map(
    (entry) => ({
      url: `${base}${entry.pl === "/" ? "" : entry.pl}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: entry.pl === "/" ? 1 : 0.8,
      alternates: {
        languages: {
          pl: `${base}${entry.pl === "/" ? "" : entry.pl}`,
          en: `${base}${entry.en}`,
        },
      },
    }),
  );

  const productEntries: MetadataRoute.Sitemap = products.map((p) => ({
    url: `${base}/sauny/${p.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.9,
    alternates: {
      languages: {
        pl: `${base}/sauny/${p.slug}`,
        en: `${base}/en/saunas/${p.enSlug}`,
      },
    },
  }));

  const blogEntries: MetadataRoute.Sitemap = blogPosts.map((post) => ({
    url: `${base}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "yearly",
    priority: 0.6,
    alternates: {
      languages: {
        pl: `${base}/blog/${post.slug}`,
        en: `${base}/en/blog/${post.enSlug}`,
      },
    },
  }));

  return [...staticEntries, ...productEntries, ...blogEntries];
}
