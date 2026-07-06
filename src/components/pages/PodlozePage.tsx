import Image from "next/image";
import type { Locale } from "@/types";
import { getDictionary } from "@/lib/i18n";
import { routeMap } from "@/lib/site";
import { cn } from "@/lib/utils";
import { products } from "@/content/products";
import { foundationTypes } from "@/content/foundationTypes";
import {
  foundationDimensions,
  formatFootprint,
} from "@/content/foundationDimensions";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { FeatureGrid } from "@/components/ui/FeatureGrid";
import { PageHeroBanner } from "@/components/sections/PageHeroBanner";
import { FAQSection } from "@/components/sections/FAQSection";
import { CTASection } from "@/components/sections/CTASection";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { JsonLd, faqSchema } from "@/components/seo/JsonLd";

/**
 * /specyfikacja/podloze — built incrementally, page-by-page. So far: the
 * full-bleed banner, the "three foundations" section with how-to steps,
 * general requirements, per-model dimensions, a comparison table and FAQ.
 */
export function PodlozePage({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  const p = dict.podlozePage;

  return (
    <>
      <JsonLd data={faqSchema(p.faq.items)} />

      <PageHeroBanner
        image="/images/podloze-banner.jpg"
        alt={p.banner.caption}
        eyebrow={p.banner.eyebrow}
        caption={p.banner.caption}
      />

      <Container className="pt-16">
        <Breadcrumbs
          items={[
            { name: dict.nav.home, href: routeMap.home[locale] },
            { name: dict.nav.quality, href: routeMap.quality[locale] },
            { name: dict.nav.specFoundation, href: routeMap.foundation[locale] },
          ]}
        />
      </Container>

      <Section tone="ivory" id="rodzaje" className="pt-10 scroll-mt-28">
        <SectionHeading
          eyebrow={p.typesSection.eyebrow}
          title={p.typesSection.title}
          description={p.typesSection.description}
          align="center"
          className="mx-auto mb-10 max-w-2xl"
        />

        <Reveal>
          <div className="mx-auto mb-14 flex max-w-2xl items-start gap-4 rounded-2xl border border-brass/30 bg-sand-100 p-5 sm:p-6">
            <span
              aria-hidden="true"
              className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brass/15 text-brass-dark"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.75}
                className="h-5 w-5"
              >
                <circle cx="12" cy="12" r="9" />
                <path strokeLinecap="round" d="M12 11v5.5" />
                <circle cx="12" cy="7.75" r="0.75" fill="currentColor" stroke="none" />
              </svg>
            </span>
            <div>
              <p className="font-serif text-lg text-bark-700">
                {p.notice.title}
              </p>
              <p className="mt-1.5 text-sm leading-relaxed text-bark-500">
                {p.notice.description}
              </p>
            </div>
          </div>
        </Reveal>

        <div className="grid gap-8 lg:grid-cols-3">
          {foundationTypes.map((type, i) => {
            const copy = type.i18n[locale];
            return (
              <Reveal key={type.id} delay={i * 100} className="h-full">
                <div className="flex h-full flex-col overflow-hidden rounded-3xl border border-sand-200 bg-ivory shadow-card">
                  <div className="relative aspect-[4/3]">
                    <Image
                      src={type.image.src}
                      alt={type.image.alt}
                      fill
                      sizes="(min-width: 1024px) 33vw, 100vw"
                      className="object-cover"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <h3 className="font-serif text-xl text-bark-700">
                      {copy.name}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-bark-500">
                      {copy.description}
                    </p>
                    <p className="mt-5 text-xs font-medium uppercase tracking-widest text-clay-500">
                      {p.typesSection.stepsLabel}
                    </p>
                    <ol className="mt-3 space-y-3">
                      {copy.steps.map((step, idx) => (
                        <li key={idx} className="flex gap-3">
                          <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brass text-[11px] font-semibold text-ivory">
                            {idx + 1}
                          </span>
                          <span className="text-sm leading-snug text-bark-600">
                            {step}
                          </span>
                        </li>
                      ))}
                    </ol>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </Section>

      {/* General requirements */}
      <Section tone="sand" id="wymagania" className="scroll-mt-28">
        <SectionHeading
          eyebrow={p.requirementsSection.eyebrow}
          title={p.requirementsSection.title}
          description={p.requirementsSection.description}
          className="mb-12 max-w-2xl"
        />
        <FeatureGrid items={p.requirementsSection.items} columns={2} numbered />
      </Section>

      {/* Dimensions per model */}
      <Section
        tone="ivory"
        id="wymiary"
        className="scroll-mt-28"
        ariaLabel={p.dimensionsSection.title}
      >
        <SectionHeading
          eyebrow={p.dimensionsSection.eyebrow}
          title={p.dimensionsSection.title}
          description={p.dimensionsSection.description}
          align="center"
          className="mx-auto mb-14 max-w-2xl"
        />
        <div className="space-y-10">
          {foundationDimensions.map((dim, i) => {
            const product = products.find((prod) => prod.id === dim.modelId);
            if (!product) return null;
            const copy = product.i18n[locale];
            const cols = p.dimensionsSection.columns;
            return (
              <Reveal key={dim.modelId} delay={i * 100}>
                <div className="grid overflow-hidden rounded-3xl bg-ivory shadow-card lg:grid-cols-2">
                  <div
                    className={cn(
                      "relative aspect-[4/3] lg:aspect-auto",
                      i % 2 === 1 && "lg:order-2",
                    )}
                  >
                    <Image
                      src={product.images[0].src}
                      alt={product.images[0].alt}
                      fill
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="object-cover"
                    />
                  </div>
                  <div className="flex flex-col justify-center p-8 sm:p-10 lg:p-12">
                    <p className="text-xs font-medium uppercase tracking-widest text-clay-500">
                      {product.line}
                    </p>
                    <h3 className="mt-2 font-serif text-3xl text-bark-700 sm:text-4xl">
                      {product.name}
                    </h3>
                    <p className="mt-4 leading-relaxed text-bark-500">
                      {copy.tagline}
                    </p>

                    <dl className="mt-8 grid grid-cols-2 gap-x-6 gap-y-6 border-t border-sand-200 pt-7">
                      <SpecItem
                        label={copy.specs[0].label}
                        value={copy.specs[0].value}
                      />
                      <SpecItem
                        label={copy.specs[2].label}
                        value={copy.specs[2].value}
                      />
                      <SpecItem
                        label={cols.exterior}
                        value={formatFootprint(dim.exteriorM, locale)}
                      />
                      <SpecItem
                        label={cols.recommended}
                        value={formatFootprint(dim.recommendedM, locale)}
                        highlight
                      />
                    </dl>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </Section>

      {/* Comparison */}
      <Section
        tone="sand"
        id="porownanie"
        className="scroll-mt-28"
        ariaLabel={p.compareSection.title}
      >
        <SectionHeading
          eyebrow={p.compareSection.eyebrow}
          title={p.compareSection.title}
          description={p.compareSection.description}
          align="center"
          className="mx-auto mb-14 max-w-2xl"
        />
        <div className="space-y-10">
          {foundationTypes.map((type, i) => {
            const copy = type.i18n[locale];
            const cols = p.compareSection.columns;
            return (
              <Reveal key={type.id} delay={i * 100}>
                <div className="overflow-hidden rounded-3xl bg-ivory shadow-card">
                  <div className="relative aspect-[4/3] sm:aspect-[16/9]">
                    <Image
                      src={type.image.src}
                      alt={type.image.alt}
                      fill
                      sizes="(max-width: 1024px) 100vw, 1024px"
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-bark-900/70 via-bark-900/10 to-transparent" />
                    <h3 className="absolute bottom-0 left-0 p-6 font-serif text-2xl text-ivory sm:p-8 sm:text-3xl">
                      {copy.name}
                    </h3>
                  </div>
                  <div className="p-6 sm:p-8">
                    <p className="text-bark-500">{copy.description}</p>
                    <dl className="mt-6 grid grid-cols-2 gap-x-6 gap-y-6 border-t border-sand-200 pt-6 sm:grid-cols-4">
                      <SpecItem label={cols.cost} value={copy.compare.cost} />
                      <SpecItem label={cols.time} value={copy.compare.time} />
                      <SpecItem
                        label={cols.difficulty}
                        value={copy.compare.difficulty}
                      />
                      <SpecItem
                        label={cols.drainage}
                        value={copy.compare.drainage}
                      />
                    </dl>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </Section>

      {/* FAQ */}
      <Section
        tone="ivory"
        id="faq"
        className="scroll-mt-28"
        ariaLabel={dict.faq.title}
      >
        <SectionHeading
          eyebrow="FAQ"
          title={dict.faq.title}
          description={dict.faq.description}
          align="center"
          accentLine
          className="mx-auto mb-12 max-w-xl"
        />
        <div className="mx-auto max-w-3xl">
          <FAQSection items={p.faq.items} />
        </div>
      </Section>

      <CTASection
        locale={locale}
        dict={dict}
        withForm
        location="foundation_page_cta"
      />
    </>
  );
}

function SpecItem({
  label,
  value,
  highlight = false,
}: {
  label: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <div>
      <dt className="text-[11px] font-medium uppercase tracking-widest text-clay-500">
        {label}
      </dt>
      <dd
        className={cn(
          "mt-1 font-medium text-bark-700",
          highlight && "text-clay-600",
        )}
      >
        {value}
      </dd>
    </div>
  );
}
