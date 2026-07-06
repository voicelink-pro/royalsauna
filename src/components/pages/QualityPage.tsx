import Image from "next/image";
import type { Locale } from "@/types";
import { getDictionary } from "@/lib/i18n";
import { routeMap } from "@/lib/site";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { CTASection } from "@/components/sections/CTASection";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";

export function QualityPage({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  const q = dict.quality;

  return (
    <>
      <Container className="pt-28">
        <Breadcrumbs
          items={[
            { name: dict.nav.home, href: routeMap.home[locale] },
            { name: dict.nav.quality, href: routeMap.quality[locale] },
          ]}
        />
      </Container>

      <Section tone="ivory" className="pt-10">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <SectionHeading
            as="h1"
            eyebrow={q.hero.eyebrow}
            title={q.hero.h1}
            description={q.hero.description}
          />
          <Reveal className="relative aspect-[4/3] overflow-hidden rounded-2xl">
            <Image
              src="/images/spec/spec-hero.jpg"
              alt={
                locale === "pl"
                  ? "Estoński las świerkowy"
                  : "Estonian spruce forest"
              }
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </Reveal>
        </div>
      </Section>

      <Section tone="sand">
        <div className="grid gap-x-12 gap-y-14 md:grid-cols-2">
          {q.sections.map((section, i) => (
            <Reveal key={section.title} delay={i * 80}>
              <span className="font-serif text-3xl text-clay-400">
                0{i + 1}
              </span>
              <h2 className="mt-3 font-serif text-2xl text-bark-700">
                {section.title}
              </h2>
              <p className="mt-3 leading-relaxed text-bark-500">
                {section.body}
              </p>
            </Reveal>
          ))}
        </div>
      </Section>

      <CTASection locale={locale} dict={dict} withForm location="quality_cta" />
    </>
  );
}
