import Image from "next/image";
import Link from "next/link";
import type { Locale } from "@/types";
import type { Dictionary } from "@/lib/i18n";
import { blogPosts } from "@/content/blog";
import { Reveal } from "@/components/ui/Reveal";

export function BlogPreview({
  locale,
  dict,
  limit = 3,
}: {
  locale: Locale;
  dict: Dictionary;
  limit?: number;
}) {
  const base = locale === "pl" ? "/blog" : "/en/blog";
  const posts = blogPosts.slice(0, limit);

  return (
    <div className="grid gap-8 md:grid-cols-3">
      {posts.map((post, index) => {
        const copy = post.i18n[locale];
        const href = `${base}/${locale === "pl" ? post.slug : post.enSlug}`;
        return (
          <Reveal as="article" key={post.slug} delay={index * 90}>
            <Link
              href={href}
              className="group block focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brass"
            >
              <div className="relative aspect-[3/2] overflow-hidden rounded-2xl">
                <Image
                  src={post.cover.src}
                  alt={post.cover.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  loading="lazy"
                  className="object-cover transition-transform duration-700 ease-calm group-hover:scale-105"
                />
              </div>
              <p className="mt-5 text-xs font-medium uppercase tracking-widest text-clay-500">
                {copy.category} · {post.readingTime} {dict.common.readingTime}
              </p>
              <h3 className="mt-2 font-serif text-xl leading-snug text-bark-700 group-hover:text-clay-600">
                {copy.title}
              </h3>
              <p className="mt-2 line-clamp-2 text-sm text-bark-500">
                {copy.excerpt}
              </p>
              <span className="mt-3 inline-block text-sm font-medium text-clay-600">
                {dict.blog.readMore} →
              </span>
            </Link>
          </Reveal>
        );
      })}
    </div>
  );
}
