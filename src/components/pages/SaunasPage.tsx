import type { Locale } from "@/types";
import { getDictionary } from "@/lib/i18n";
import { routeMap } from "@/lib/site";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FeatureGrid } from "@/components/ui/FeatureGrid";
import { PageHeroBanner } from "@/components/sections/PageHeroBanner";
import { ProductCards } from "@/components/sections/ProductCards";
import { ProductComparison } from "@/components/sections/ProductComparison";
import { CTASection } from "@/components/sections/CTASection";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";

export function SaunasPage({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  const s = dict.saunas;

  return (
    <>
      <PageHeroBanner
        image="/images/blog/jaki-rozmiar-sauny.jpg"
        mobileImage="/images/blog/jaki-rozmiar-sauny-mobile.jpg"
        alt={s.hero.h1}
        eyebrow={s.hero.eyebrow}
        caption={s.hero.h1}
      />

      <Container className="pt-16">
        <Breadcrumbs
          items={[
            { name: dict.nav.home, href: routeMap.home[locale] },
            { name: dict.nav.saunas, href: routeMap.saunas[locale] },
          ]}
        />
      </Container>

      <Section tone="ivory" className="pt-10">
        <SectionHeading
          as="h1"
          eyebrow={s.hero.eyebrow}
          title={s.hero.h1}
          description={s.hero.description}
          className="mb-14 max-w-3xl"
        />
        <ProductCards locale={locale} dict={dict} />
      </Section>

      <Section tone="sand">
        <SectionHeading
          title={s.oneModel.title}
          description={s.oneModel.description}
          align="center"
          className="mx-auto mb-10 max-w-2xl"
        />
        <div className="rounded-2xl border border-sand-300 bg-ivory p-4 sm:p-8">
          <ProductComparison locale={locale} dict={dict} />
        </div>
      </Section>

      <Section tone="ivory" ariaLabel={s.whichSize.title}>
        <SectionHeading title={s.whichSize.title} align="center" className="mb-14" />
        <FeatureGrid items={s.whichSize.items} columns={3} />
      </Section>

      <Section tone="sand" ariaLabel={s.priceFactors.title}>
        <SectionHeading title={s.priceFactors.title} align="center" className="mb-14" />
        <FeatureGrid items={s.priceFactors.items} columns={3} />
      </Section>

      <CTASection locale={locale} dict={dict} withForm location="saunas_cta" />
    </>
  );
}
