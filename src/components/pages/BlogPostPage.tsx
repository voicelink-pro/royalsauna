import Image from "next/image";
import { notFound } from "next/navigation";
import type { BlogBlock, Locale } from "@/types";
import { getDictionary } from "@/lib/i18n";
import { routeMap } from "@/lib/site";
import { getPostBySlug } from "@/content/blog";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { BlogPreview } from "@/components/sections/BlogPreview";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { JsonLd, articleSchema } from "@/components/seo/JsonLd";

function renderBlock(block: BlogBlock, index: number) {
  switch (block.type) {
    case "h2":
      return (
        <h2
          key={index}
          className="mt-12 flex items-center gap-3 font-serif text-2xl font-semibold text-bark-700"
        >
          <span
            aria-hidden="true"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brass/15 text-brass-dark"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.75}
              className="h-4 w-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 3v5M12 16v5M3 12h5M16 12h5M6 6l3.5 3.5M14.5 14.5 18 18M6 18l3.5-3.5M14.5 9.5 18 6"
              />
            </svg>
          </span>
          <span>{block.text}</span>
        </h2>
      );
    case "p":
      return (
        <p key={index} className="mt-5 leading-relaxed text-bark-600">
          {block.text}
        </p>
      );
    case "quote":
      return (
        <blockquote
          key={index}
          className="my-8 border-l-2 border-clay-400 pl-6 font-serif text-xl italic text-bark-700"
        >
          {block.text}
        </blockquote>
      );
    case "list":
      return (
        <ul key={index} className="mt-5 space-y-2">
          {block.items.map((item) => (
            <li key={item} className="flex items-start gap-3 text-bark-600">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-clay-500" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      );
    default:
      return null;
  }
}

export function BlogPostPage({
  locale,
  slug,
}: {
  locale: Locale;
  slug: string;
}) {
  const dict = getDictionary(locale);
  const post = getPostBySlug(slug, locale);
  if (!post) notFound();

  const copy = post.i18n[locale];
  const base = routeMap.blog[locale];
  const path = `${base}/${locale === "pl" ? post.slug : post.enSlug}`;

  return (
    <>
      <JsonLd
        data={articleSchema({
          title: copy.title,
          description: copy.excerpt,
          image: post.cover.src,
          datePublished: post.date,
          path,
        })}
      />

      <Container className="pt-28">
        <Breadcrumbs
          items={[
            { name: dict.nav.home, href: routeMap.home[locale] },
            { name: dict.nav.blog, href: base },
            { name: copy.title, href: path },
          ]}
        />
      </Container>

      <article>
        <Container className="pt-10">
          <div className="mx-auto max-w-prose">
            <p className="text-xs font-medium uppercase tracking-widest text-clay-500">
              {copy.category} · {post.readingTime} {dict.common.readingTime}
            </p>
            <h1 className="mt-3 font-serif text-4xl leading-tight text-bark-700 sm:text-5xl">
              {copy.title}
            </h1>
            <p className="mt-5 text-lg text-bark-500">{copy.excerpt}</p>
          </div>

          <div className="relative mx-auto mt-10 aspect-[16/9] max-w-4xl overflow-hidden rounded-2xl">
            <Image
              src={post.cover.src}
              alt={post.cover.alt}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 56rem"
              className="object-cover"
            />
          </div>

          <div className="mx-auto mt-10 max-w-prose pb-10">
            {copy.body.map((block, i) => renderBlock(block, i))}
          </div>
        </Container>
      </article>

      <Section tone="sand" ariaLabel={dict.blog.relatedTitle}>
        <SectionHeading title={dict.blog.relatedTitle} className="mb-12" />
        <BlogPreview locale={locale} dict={dict} />
      </Section>
    </>
  );
}
