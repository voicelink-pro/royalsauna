import type { Locale } from "@/types";
import { getDictionary } from "@/lib/i18n";
import { routeMap } from "@/lib/site";
import { generalFaq } from "@/content/faq";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { HeroVideoScroll } from "@/components/sections/HeroVideoScroll";
import { ProductCards } from "@/components/sections/ProductCards";
import { WhySection } from "@/components/sections/WhySection";
import { InteriorVideoSection } from "@/components/sections/InteriorVideoSection";
import { IncludedShowcase } from "@/components/sections/IncludedShowcase";
import { ProcessSection } from "@/components/sections/ProcessSection";
import { FAQSection } from "@/components/sections/FAQSection";
import { BlogPreview } from "@/components/sections/BlogPreview";
import { CTASection } from "@/components/sections/CTASection";
import { CtaButton } from "@/components/ui/CtaButton";
import {
  JsonLd,
  organizationSchema,
  websiteSchema,
  faqSchema,
} from "@/components/seo/JsonLd";

export function HomePage({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  const faq = generalFaq[locale];

  return (
    <>
      <JsonLd data={organizationSchema()} />
      <JsonLd data={websiteSchema()} />
      <JsonLd data={faqSchema(faq)} />

      <HeroVideoScroll locale={locale} dict={dict} />

      {/* One sauna, three sizes */}
      <Section tone="ivory" ariaLabel={dict.home.sizes.title}>
        <SectionHeading
          eyebrow={dict.home.sizes.eyebrow}
          title={dict.home.sizes.title}
          description={dict.home.sizes.description}
          align="center"
          className="mb-14"
        />
        <ProductCards locale={locale} dict={dict} />
      </Section>

      {/* Why RoyalSauna — luxury / quality */}
      <Section tone="sand" ariaLabel={dict.home.why.title} className="py-20 lg:py-24">
        <WhySection dict={dict} />
      </Section>

      {/* Interior video — full-bleed, play on click, freezes on last frame */}
      <InteriorVideoSection locale={locale} dict={dict} />

      {/* What's included */}
      <Section tone="sand" ariaLabel={dict.home.included.title} className="py-20 lg:py-28">
        <SectionHeading
          eyebrow={dict.home.included.eyebrow}
          title={dict.home.included.title}
          description={dict.home.included.description}
          align="center"
          className="mx-auto mb-14 max-w-2xl"
        />
        <IncludedShowcase groups={dict.home.included.groups} />
      </Section>

      {/* Process */}
      <Section tone="ivory" ariaLabel={dict.home.process.title}>
        <SectionHeading
          eyebrow={dict.home.process.eyebrow}
          title={dict.home.process.title}
          align="center"
          className="mb-16"
        />
        <ProcessSection dict={dict} />
      </Section>

      {/* FAQ */}
      <Section tone="sand" ariaLabel={dict.faq.title} className="relative overflow-hidden">
        <div className="relative grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <div className="relative">
            <SectionHeading
              eyebrow="FAQ"
              title={dict.faq.title}
              description={dict.faq.description}
              accentLine
              divider
            />
            <div className="relative z-10 mt-8">
              <CtaButton
                href={routeMap.contact[locale]}
                location="home_faq"
                variant="primary"
                className="pl-5"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" />
                </svg>
                {dict.nav.contact}
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </CtaButton>
            </div>
          </div>
          <FAQSection items={faq} />
        </div>
      </Section>

      {/* Blog preview */}
      <Section tone="ivory" ariaLabel={dict.blog.hero.h1}>
        <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            eyebrow={dict.blog.hero.eyebrow}
            title={dict.blog.hero.h1}
          />
          <CtaButton
            href={routeMap.blog[locale]}
            location="home_blog"
            variant="ghost"
          >
            {dict.blog.readMore} →
          </CtaButton>
        </div>
        <BlogPreview locale={locale} dict={dict} />
      </Section>

      {/* Final CTA with form */}
      <CTASection locale={locale} dict={dict} withForm location="home_final" />
    </>
  );
}
