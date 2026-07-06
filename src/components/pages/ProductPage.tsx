import { notFound } from "next/navigation";
import type { Locale, SaunaSize } from "@/types";
import { getDictionary } from "@/lib/i18n";
import { routeMap } from "@/lib/site";
import { getProduct } from "@/content/products";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { ProductHeroBanner } from "@/components/product/ProductHeroBanner";
import { ProductHero } from "@/components/product/ProductHero";
import { ProductShowcase } from "@/components/product/ProductShowcase";
import { KeyFeatureList } from "@/components/product/KeyFeatureList";
import { ProductTechnical } from "@/components/product/ProductTechnical";
import { ProductIncluded } from "@/components/product/ProductIncluded";
import { ProductViewTracker } from "@/components/product/ProductViewTracker";
import { FAQSection } from "@/components/sections/FAQSection";
import { LeadForm } from "@/components/forms/LeadForm";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { JsonLd, productSchema, faqSchema } from "@/components/seo/JsonLd";

export function ProductPage({
  locale,
  size,
}: {
  locale: Locale;
  size: SaunaSize;
}) {
  const dict = getDictionary(locale);
  const product = getProduct(size);
  if (!product) notFound();

  const copy = product.i18n[locale];
  const productPath = `${routeMap.saunas[locale]}/${
    locale === "pl" ? product.slug : product.enSlug
  }`;

  // Images by role: [0] exterior/hero, [1] interior, [2] cutout, [3] technical.
  const interiorImg = product.images[1] ?? product.images[0];
  const cutoutImg = product.images[2] ?? product.images[0];
  const technicImg = product.images[3];
  // Gallery shows everything except the technical drawing (it gets its own section).
  const galleryImages = product.images.filter((img) => img !== technicImg);

  return (
    <>
      <ProductViewTracker
        model={product.id}
        name={product.name}
        price={product.priceFrom}
      />
      <JsonLd data={productSchema(product, locale, productPath)} />
      <JsonLd data={faqSchema(copy.faq)} />

      {/* Full-bleed intro banner with the model photo + name. */}
      <ProductHeroBanner product={product} locale={locale} />

      <Container className="pt-16">
        <Breadcrumbs
          items={[
            { name: dict.nav.home, href: routeMap.home[locale] },
            { name: dict.nav.saunas, href: routeMap.saunas[locale] },
            { name: product.name, href: productPath },
          ]}
        />
      </Container>

      {/* Hero */}
      <Section tone="ivory" className="pt-10">
        <ProductHero
          product={product}
          locale={locale}
          dict={dict}
          galleryImages={galleryImages}
          offerHref={`${routeMap.configurator[locale]}?model=${product.id}`}
        />
      </Section>

      {/* Interior editorial */}
      <Section tone="sand" id="wnetrze" className="scroll-mt-28">
        <ProductShowcase
          image={interiorImg}
          eyebrow={dict.common.interiorEyebrow}
          title={dict.common.interiorTitle}
          description={copy.audience}
          imageSide="left"
        >
          <div className="mt-8">
            <h3 className="font-serif text-xl text-bark-700">
              {dict.common.keyFeatures}
            </h3>
            <KeyFeatureList items={copy.features} />
          </div>
        </ProductShowcase>
      </Section>

      {/* Exterior / design editorial */}
      <Section tone="ivory" id="design" className="scroll-mt-28">
        <ProductShowcase
          image={cutoutImg}
          eyebrow={dict.common.exteriorEyebrow}
          title={dict.common.exteriorTitle}
          description={copy.shortDescription}
          imageSide="right"
        >
          <div className="mt-8">
            <ProductIncluded
              items={copy.included}
              title={dict.common.standardEquipment}
            />
          </div>
        </ProductShowcase>
      </Section>

      {/* Technical drawing + specs */}
      <Section
        tone="sand"
        id="wymiary"
        className="scroll-mt-28"
        ariaLabel={dict.common.dimensionsTitle}
      >
        <ProductTechnical
          drawing={technicImg}
          specs={copy.specs}
          eyebrow={dict.common.dimensionsEyebrow}
          title={dict.common.dimensionsTitle}
          note={dict.common.dimensionsNote}
          drawingLabel={dict.common.technicalDrawing}
          specsTitle={dict.common.specification}
        />
      </Section>

      {/* FAQ */}
      <Section
        tone="ivory"
        id="faq"
        className="scroll-mt-28"
        ariaLabel={dict.faq.title}
      >
        <SectionHeading title={dict.faq.title} className="mb-10 max-w-2xl" />
        <FAQSection items={copy.faq} />
      </Section>

      {/* Offer form for this model */}
      <Section tone="sand" id="oferta" className="scroll-mt-28">
        <div className="mx-auto max-w-3xl">
          <SectionHeading
            title={dict.common.requestOfferFor}
            description={`${dict.common.priceFrom} ${product.priceFrom.toLocaleString(
              locale === "pl" ? "pl-PL" : "en-US",
            )} ${dict.common.currency} – ${dict.common.priceNote}.`}
            align="center"
            className="mb-10"
          />
          <Reveal className="rounded-3xl border border-sand-200 bg-sand-100 p-6 shadow-card sm:p-8">
            <LeadForm
              locale={locale}
              dict={dict}
              defaultModel={product.id}
              formLocation={`product_${product.id}`}
            />
          </Reveal>
        </div>
      </Section>
    </>
  );
}
