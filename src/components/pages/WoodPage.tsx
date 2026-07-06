import Image from "next/image";
import type { Locale } from "@/types";
import { getDictionary } from "@/lib/i18n";
import { routeMap } from "@/lib/site";
import { woodMaterials } from "@/content/woodMaterials";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { PageHeroBanner } from "@/components/sections/PageHeroBanner";
import { WoodConstructionDiagram } from "@/components/sections/WoodConstructionDiagram";
import { ProductShowcase } from "@/components/product/ProductShowcase";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";

/**
 * /specyfikacja/drewno — built incrementally, page-by-page. So far: the
 * full-bleed banner and the "three woods" materials section. Further
 * sections (finishes, construction detail…) will follow the same pattern.
 */
export function WoodPage({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  const w = dict.woodPage;

  return (
    <>
      <PageHeroBanner
        image="/images/drewno-banner.jpg"
        alt={w.banner.caption}
        eyebrow={w.banner.eyebrow}
        caption={w.banner.caption}
      />

      <Container className="pt-16">
        <Breadcrumbs
          items={[
            { name: dict.nav.home, href: routeMap.home[locale] },
            { name: dict.nav.quality, href: routeMap.quality[locale] },
            { name: dict.nav.specWood, href: routeMap.wood[locale] },
          ]}
        />
      </Container>

      {/* The three woods */}
      <Section tone="ivory" id="materialy" className="pt-10 scroll-mt-28">
        <SectionHeading
          eyebrow={w.materialsSection.eyebrow}
          title={w.materialsSection.title}
          description={w.materialsSection.description}
          align="center"
          className="mx-auto mb-16 max-w-2xl"
        />
        <div className="space-y-20">
          {woodMaterials.map((material, i) => {
            const copy = material.i18n[locale];
            return (
              <Reveal key={material.id} delay={i * 100}>
                <ProductShowcase
                  image={material.image}
                  eyebrow={copy.usageTag}
                  title={copy.name}
                  description={copy.description}
                  imageSide={i % 2 === 0 ? "left" : "right"}
                >
                  <div className="mt-8 flex flex-wrap gap-4">
                    {material.elements.map((element) => {
                      const elementCopy = element.i18n[locale];
                      return (
                        <div
                          key={elementCopy.label}
                          className="flex items-center gap-4 rounded-2xl border border-sand-200 bg-ivory p-3 pr-5"
                        >
                          <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl">
                            <Image
                              src={element.image.src}
                              alt={element.image.alt}
                              fill
                              sizes="64px"
                              className="object-cover"
                            />
                          </div>
                          <div>
                            <p className="text-[11px] font-medium uppercase tracking-widest text-clay-500">
                              {w.materialsSection.madeFrom}
                            </p>
                            <p className="mt-1 font-serif text-base text-bark-700">
                              {elementCopy.label}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </ProductShowcase>
              </Reveal>
            );
          })}
        </div>
      </Section>

      {/* Exploded construction diagram */}
      <Section
        tone="ivory"
        id="konstrukcja"
        className="scroll-mt-28 pt-0 lg:pt-0"
      >
        <SectionHeading
          eyebrow={w.diagramSection.eyebrow}
          title={w.diagramSection.title}
          description={w.diagramSection.description}
          align="center"
          className="mx-auto mb-12 max-w-2xl"
        />
        <Reveal>
          <WoodConstructionDiagram
            hotspots={w.diagramSection.hotspots}
            alt={w.diagramSection.title}
          />
        </Reveal>
      </Section>
    </>
  );
}
