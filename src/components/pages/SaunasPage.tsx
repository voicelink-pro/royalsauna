import type { Locale } from "@/types";
import { getDictionary } from "@/lib/i18n";
import { routeMap } from "@/lib/site";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FeatureGrid } from "@/components/ui/FeatureGrid";
import { ProductCards } from "@/components/sections/ProductCards";
import { ProductComparison } from "@/components/sections/ProductComparison";
import { CTASection } from "@/components/sections/CTASection";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";

export function SaunasPage({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  const s = dict.saunas;

  return (
    <>
      <Container className="pt-28">
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
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <SectionHeading title={s.oneModel.title} description={s.oneModel.description} />
          <div className="rounded-2xl border border-sand-300 bg-ivory p-8">
            <ProductComparison locale={locale} dict={dict} />
          </div>
        </div>
      </Section>

      <Section tone="ivory" ariaLabel={s.whichSize.title}>
        <SectionHeading title={s.whichSize.title} align="center" className="mb-14" />
        <FeatureGrid items={s.whichSize.items} columns={3} />
      </Section>

      <Section tone="sand" ariaLabel={s.priceFactors.title}>
        <SectionHeading title={s.priceFactors.title} align="center" className="mb-14" />
        <FeatureGrid items={s.priceFactors.items} columns={4} />
      </Section>

      <CTASection locale={locale} dict={dict} withForm location="saunas_cta" />
    </>
  );
}
