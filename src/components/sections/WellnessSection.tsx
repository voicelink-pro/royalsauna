import Image from "next/image";
import type { Dictionary } from "@/lib/i18n";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

/**
 * Full-bleed wellness section with a warm image background and pillar cards.
 */
export function WellnessSection({ dict }: { dict: Dictionary }) {
  const w = dict.home.wellness;

  return (
    <section className="relative overflow-hidden py-24 lg:py-32">
      <div className="absolute inset-0">
        <Image
          src="/images/wellness-bg.jpg"
          alt=""
          aria-hidden="true"
          fill
          sizes="100vw"
          loading="lazy"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-bark-900/65" />
      </div>

      <Container className="relative z-10">
        <SectionHeading
          eyebrow={w.eyebrow}
          title={w.title}
          description={w.description}
          className="max-w-2xl [&_p]:text-sand-100/90 [&_h2]:text-ivory [&>p:first-child]:text-clay-400"
        />
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {w.pillars.map((pillar, i) => (
            <Reveal
              key={pillar.title}
              delay={i * 80}
              className="rounded-2xl border border-ivory/15 bg-bark-900/30 p-6 backdrop-blur-sm"
            >
              <h3 className="font-serif text-xl text-ivory">{pillar.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-sand-100/85">
                {pillar.description}
              </p>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
