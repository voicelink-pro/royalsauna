import Image from "next/image";
import Link from "next/link";
import type { HeaterModel, Locale } from "@/types";
import { getDictionary } from "@/lib/i18n";
import type { Dictionary } from "@/lib/i18n";
import { routeMap } from "@/lib/site";
import { cn } from "@/lib/utils";
import { products } from "@/content/products";
import { heaterModels, heaterModelsByProduct, getHeaterModel } from "@/content/heaterModels";
import {
  formatHeaterDimensions,
  formatHeaterPower,
  formatHeaterStones,
  formatHeaterVolume,
  formatHeaterWifi,
} from "@/lib/heaterFormat";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { PageHeroBanner } from "@/components/sections/PageHeroBanner";
import { HeaterComparisonTable } from "@/components/sections/HeaterComparisonTable";
import { FAQSection } from "@/components/sections/FAQSection";
import { CTASection } from "@/components/sections/CTASection";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { JsonLd, faqSchema } from "@/components/seo/JsonLd";

export function HeatersPage({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  const h = dict.heatersPage;

  return (
    <>
      <JsonLd data={faqSchema(h.faq.items)} />

      <PageHeroBanner
        image="/images/heaters-banner.jpg"
        alt={h.banner.caption}
        eyebrow={h.banner.eyebrow}
        caption={h.banner.caption}
      />

      <Container className="pt-16">
        <Breadcrumbs
          items={[
            { name: dict.nav.home, href: routeMap.home[locale] },
            { name: dict.nav.quality, href: routeMap.quality[locale] },
            { name: dict.nav.specHeaters, href: routeMap.heaters[locale] },
          ]}
        />
      </Container>

      <Section tone="ivory" className="pt-10">
        <SectionHeading
          as="h1"
          eyebrow={h.hero.eyebrow}
          title={h.hero.h1}
          description={h.hero.description}
          align="center"
          className="mx-auto max-w-2xl"
        />
      </Section>

      {/* Which heaters fit which model */}
      <Section tone="ivory" id="dopasowanie" className="scroll-mt-28">
        <SectionHeading
          eyebrow={h.matchSection.eyebrow}
          title={h.matchSection.title}
          description={h.matchSection.description}
          className="mb-14 max-w-2xl"
        />
        <div className="space-y-14">
          {products.map((product, i) => {
            const heatersForModel = heaterModelsByProduct[product.id]
              .map(getHeaterModel)
              .filter((heater): heater is HeaterModel => Boolean(heater));

            return (
              <Reveal key={product.id} delay={i * 100}>
                <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)] lg:items-center">
                  <div className="relative aspect-[4/3] overflow-hidden rounded-3xl shadow-card">
                    <Image
                      src={product.images[0].src}
                      alt={product.images[0].alt}
                      fill
                      sizes="(max-width: 1024px) 100vw, 480px"
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-bark-900/70 via-bark-900/5 to-transparent" />
                    <div className="absolute inset-x-0 bottom-0 p-6">
                      <p className="text-xs font-medium uppercase tracking-widest text-ivory/70">
                        {product.line}
                      </p>
                      <h3 className="mt-1 font-serif text-2xl text-ivory">
                        {product.name}
                      </h3>
                    </div>
                  </div>

                  <div className="flex flex-wrap justify-center gap-4">
                    {heatersForModel.map((heater) => (
                      <HeaterCard
                        key={heater.id}
                        heater={heater}
                        locale={locale}
                        dict={dict}
                        className="w-full sm:w-[calc(50%-0.5rem)]"
                      />
                    ))}
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </Section>

      {/* Comparison table */}
      <Section tone="sand" id="porownanie" className="scroll-mt-28">
        <SectionHeading
          eyebrow={h.compareSection.eyebrow}
          title={h.compareSection.title}
          description={h.compareSection.description}
          className="mb-10 max-w-2xl"
        />
        <Reveal>
          <HeaterComparisonTable locale={locale} dict={dict} />
        </Reveal>
      </Section>

      {/* Individual heater sections */}
      <Section
        tone="sand"
        id="piece"
        className="scroll-mt-28"
        ariaLabel={h.detailSection.title}
      >
        <SectionHeading
          eyebrow={h.detailSection.eyebrow}
          title={h.detailSection.title}
          description={h.detailSection.description}
          className="mb-14 max-w-2xl"
        />
        <div className="space-y-16">
          {heaterModels.map((heater, i) => {
            const copy = heater.i18n[locale];
            const specs = h.detailSection.specLabels;
            return (
              <div key={heater.id} id={heater.id} className="scroll-mt-28">
                <Reveal delay={i * 100}>
                  <div className="grid gap-10 rounded-3xl bg-ivory p-6 shadow-card sm:p-8 lg:grid-cols-2 lg:items-center lg:p-10">
                    <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
                      <Image
                        src={heater.image.src}
                        alt={heater.image.alt}
                        fill
                        sizes="(max-width: 1024px) 100vw, 560px"
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <p className="text-xs font-medium uppercase tracking-widest text-clay-500">
                        {copy.highlight}
                      </p>
                      <h3 className="mt-2 font-serif text-3xl text-bark-700">
                        {heater.name}
                      </h3>
                      <p className="mt-4 leading-relaxed text-bark-500">
                        {copy.description}
                      </p>

                      <dl className="mt-8 grid grid-cols-2 gap-x-6 gap-y-5 border-t border-sand-200 pt-6">
                        <SpecItem label={specs.power} value={formatHeaterPower(heater, locale)} />
                        <SpecItem label={specs.volume} value={formatHeaterVolume(heater, dict)} />
                        <SpecItem label={specs.mounting} value={h.mounting[heater.mounting]} />
                        <SpecItem label={specs.controller} value={heater.controller} />
                        <SpecItem label={specs.wifi} value={formatHeaterWifi(heater, dict)} />
                        <SpecItem label={specs.stones} value={formatHeaterStones(heater)} />
                        <SpecItem label={specs.dimensions} value={formatHeaterDimensions(heater)} />
                        <SpecItem label={specs.color} value={h.color[heater.color]} />
                      </dl>
                    </div>
                  </div>
                </Reveal>
              </div>
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
          <FAQSection items={h.faq.items} />
        </div>
      </Section>

      <CTASection
        locale={locale}
        dict={dict}
        withForm
        location="heaters_page_cta"
      />
    </>
  );
}

function SpecItem({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-[11px] font-medium uppercase tracking-widest text-clay-500">
        {label}
      </dt>
      <dd className="mt-1 font-medium text-bark-700">{value}</dd>
    </div>
  );
}

function HeaterCard({
  heater,
  locale,
  dict,
  className,
}: {
  heater: HeaterModel;
  locale: Locale;
  dict: Dictionary;
  className?: string;
}) {
  const h = dict.heatersPage;
  return (
    <Link
      href={`${routeMap.heaters[locale]}#${heater.id}`}
      className={cn(
        "group flex gap-4 rounded-2xl border border-sand-200 bg-ivory p-4 transition-all duration-300 hover:border-brass hover:shadow-card",
        className,
      )}
    >
      <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl">
        <Image
          src={heater.image.src}
          alt={heater.image.alt}
          fill
          sizes="80px"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="min-w-0">
        <h4 className="font-serif text-base leading-snug text-bark-700">
          {heater.name}
        </h4>
        <p className="mt-1.5 text-xs text-bark-500">
          {h.mounting[heater.mounting]} · {formatHeaterPower(heater, locale)}
        </p>
      </div>
    </Link>
  );
}
