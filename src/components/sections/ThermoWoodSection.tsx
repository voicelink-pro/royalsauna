import type { Dictionary } from "@/lib/i18n";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

/**
 * Deep-dive editorial on ThermoWood for /specyfikacja/drewno —
 * lead story, benefits grid and closing statement.
 */
export function ThermoWoodSection({
  copy,
}: {
  copy: Dictionary["woodPage"]["thermoWoodSection"];
}) {
  return (
    <Section
      tone="sand"
      id="thermowood"
      className="scroll-mt-28"
      ariaLabel={copy.title}
    >
      <SectionHeading
        eyebrow={copy.eyebrow}
        title={copy.title}
        description={copy.lead}
        align="center"
        accentLine
        className="mx-auto mb-16 max-w-3xl"
      />

      <Reveal className="mx-auto mb-16 max-w-3xl text-center">
        <h3 className="font-serif text-2xl text-bark-700 sm:text-3xl">
          {copy.beautyTitle}
        </h3>
        <p className="mt-5 text-base leading-relaxed text-bark-500 sm:text-lg">
          {copy.beautyBody}
        </p>
      </Reveal>

      <div className="mx-auto max-w-5xl">
        <Reveal>
          <p className="mb-10 text-center text-xs font-medium uppercase tracking-[0.25em] text-clay-500">
            {copy.whyTitle}
          </p>
        </Reveal>
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {copy.benefits.map((benefit, index) => (
            <Reveal key={benefit.title} delay={index * 50} as="li">
              <div className="h-full border-t border-brass/35 pt-5">
                <h4 className="font-serif text-lg text-bark-700">
                  {benefit.title}
                </h4>
                <p className="mt-2 text-sm leading-relaxed text-bark-500">
                  {benefit.description}
                </p>
              </div>
            </Reveal>
          ))}
        </ul>
      </div>

      <Reveal className="mx-auto mt-20 max-w-2xl text-center">
        <div
          aria-hidden="true"
          className="mx-auto mb-6 h-px w-12 bg-brass/50"
        />
        <h3 className="font-serif text-2xl text-bark-700 sm:text-3xl">
          {copy.closingTitle}
        </h3>
        <p className="mt-5 text-base leading-relaxed text-bark-500 sm:text-lg">
          {copy.closingBody}
        </p>
      </Reveal>
    </Section>
  );
}
