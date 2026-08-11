import type { Locale } from "@/types";
import { getDictionary } from "@/lib/i18n";
import { routeMap } from "@/lib/site";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { PageHeroBanner } from "@/components/sections/PageHeroBanner";
import { WelcomePackageShowcase } from "@/components/sections/WelcomePackageShowcase";
import { FAQSection } from "@/components/sections/FAQSection";
import { CTASection } from "@/components/sections/CTASection";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { JsonLd, faqSchema } from "@/components/seo/JsonLd";

/**
 * /specyfikacja/pakiet-powitalny — full-bleed banner, premium catalogue,
 * value checklist, FAQ and final CTA.
 */
export function WelcomePackagePage({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  const w = dict.welcomePackagePage;

  return (
    <>
      <JsonLd data={faqSchema(w.faq.items)} />

      <PageHeroBanner
        image="/images/pakiet-powitalny-banner.jpg"
        mobileImage="/images/pakiet-powitalny-banner-mobile.jpg"
        alt={w.banner.caption}
        eyebrow={w.banner.eyebrow}
        caption={w.banner.caption}
      />

      <Container className="pt-16">
        <Breadcrumbs
          items={[
            { name: dict.nav.home, href: routeMap.home[locale] },
            { name: dict.nav.quality, href: routeMap.quality[locale] },
            {
              name: dict.nav.specWelcomePackage,
              href: routeMap.welcomePackage[locale],
            },
          ]}
        />
      </Container>

      <Section
        tone="transparent"
        id="zawartosc"
        className="scroll-mt-28 bg-gradient-to-b from-sand-100 via-ivory to-sand-100 pt-10"
        ariaLabel={w.showcase.title}
      >
        <SectionHeading
          eyebrow={w.showcase.eyebrow}
          title={w.showcase.title}
          description={w.showcase.description}
          align="center"
          accentLine
          divider
          className="mx-auto max-w-2xl"
        />
        <WelcomePackageShowcase locale={locale} items={w.showcase.items} />
      </Section>

      <Section
        tone="sand"
        id="w-cenie"
        className="scroll-mt-28"
        ariaLabel={w.includedValue.title}
      >
        <SectionHeading
          eyebrow={w.includedValue.eyebrow}
          title={w.includedValue.title}
          description={w.includedValue.description}
          align="center"
          accentLine
          className="mx-auto mb-14 max-w-2xl"
        />
        <ul className="mx-auto grid max-w-4xl gap-5 sm:grid-cols-2">
          {w.includedValue.items.map((item, index) => (
            <Reveal key={item.title} delay={index * 70} as="li">
              <div className="flex gap-4">
                <span
                  aria-hidden="true"
                  className="mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-brass/50 text-brass"
                >
                  <svg
                    viewBox="0 0 20 20"
                    fill="none"
                    className="h-3.5 w-3.5"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4.5 10.5 8 14l7.5-8"
                    />
                  </svg>
                </span>
                <div>
                  <h3 className="font-serif text-xl text-bark-700">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-bark-500 sm:text-base">
                    {item.description}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </ul>
      </Section>

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
          <FAQSection items={w.faq.items} />
        </div>
      </Section>

      <CTASection
        locale={locale}
        dict={dict}
        withForm
        location="welcome_package_cta"
      />
    </>
  );
}
