import Image from "next/image";
import Link from "next/link";
import type { Locale } from "@/types";
import { getDictionary } from "@/lib/i18n";
import { routeMap } from "@/lib/site";
import { getSortedPosts } from "@/content/blog";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";

export function BlogIndexPage({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  const base = routeMap.blog[locale];
  const posts = getSortedPosts();

  return (
    <>
      <Container className="pt-28">
        <Breadcrumbs
          items={[
            { name: dict.nav.home, href: routeMap.home[locale] },
            { name: dict.nav.blog, href: base },
          ]}
        />
      </Container>

      <Section tone="ivory" className="pt-10">
        <SectionHeading
          as="h1"
          eyebrow={dict.blog.hero.eyebrow}
          title={dict.blog.hero.h1}
          description={dict.blog.hero.description}
          className="mb-14 max-w-3xl"
        />

        {posts.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-sand-300 bg-ivory/50 py-20 text-center">
            <p className="font-serif text-2xl text-bark-700">
              {dict.blog.emptyTitle}
            </p>
            <p className="mt-3 text-bark-500">{dict.blog.emptyDescription}</p>
          </div>
        ) : (
        <div className="grid gap-x-8 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post, index) => {
            const copy = post.i18n[locale];
            const href = `${base}/${locale === "pl" ? post.slug : post.enSlug}`;
            return (
              <Reveal as="article" key={post.slug} delay={index * 80}>
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
                      loading={index < 3 ? "eager" : "lazy"}
                      className="object-cover transition-transform duration-700 ease-calm group-hover:scale-105"
                    />
                  </div>
                  <p className="mt-5 text-xs font-medium uppercase tracking-widest text-clay-500">
                    {copy.category} · {post.readingTime}{" "}
                    {dict.common.readingTime}
                  </p>
                  <h2 className="mt-2 font-serif text-2xl leading-snug text-bark-700 group-hover:text-clay-600">
                    {copy.title}
                  </h2>
                  <p className="mt-2 text-sm text-bark-500">{copy.excerpt}</p>
                </Link>
              </Reveal>
            );
          })}
        </div>
        )}
      </Section>
    </>
  );
}
