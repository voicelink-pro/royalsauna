import Image from "next/image";
import type { Locale } from "@/types";
import type { Dictionary } from "@/lib/i18n";
import { routeMap } from "@/lib/site";
import { CtaButton } from "@/components/ui/CtaButton";
import { Reveal } from "@/components/ui/Reveal";

/**
 * Home "Scandinavian spruce & quality" highlight: image + copy + link to /specyfikacja.
 */
export function QualitySection({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dictionary;
}) {
  const points = dict.quality.sections.slice(0, 3);

  return (
    <div className="grid items-center gap-12 lg:grid-cols-2">
      <Reveal className="relative order-2 aspect-[4/5] overflow-hidden rounded-2xl lg:order-1">
        <Image
          src="/images/spec/spec-detail.jpg"
          alt={
            locale === "pl"
              ? "Detal drewna świerku skandynawskiego"
              : "Detail of Scandinavian spruce wood"
          }
          fill
          sizes="(max-width: 1024px) 100vw, 50vw"
          loading="lazy"
          className="object-cover"
        />
      </Reveal>

      <div className="order-1 lg:order-2">
        <p className="mb-3 text-xs font-medium uppercase tracking-widest text-clay-500">
          {dict.quality.hero.eyebrow}
        </p>
        <h2 className="font-serif text-3xl leading-tight text-bark-700 sm:text-4xl">
          {dict.quality.hero.h1}
        </h2>
        <p className="mt-5 text-lg leading-relaxed text-bark-500">
          {dict.quality.hero.description}
        </p>
        <dl className="mt-8 space-y-6">
          {points.map((p) => (
            <div key={p.title}>
              <dt className="font-serif text-lg text-bark-700">{p.title}</dt>
              <dd className="mt-1.5 text-bark-500">{p.body}</dd>
            </div>
          ))}
        </dl>
        <div className="mt-9">
          <CtaButton
            href={routeMap.quality[locale]}
            location="home_quality"
            variant="secondary"
          >
            {dict.common.learnMore}
          </CtaButton>
        </div>
      </div>
    </div>
  );
}
