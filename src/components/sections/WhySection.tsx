"use client";

import Image from "next/image";
import type { Dictionary } from "@/lib/i18n";
import { Reveal } from "@/components/ui/Reveal";

/**
 * Luxurious "Why RoyalSauna" section. Large image on the left, headline +
 * quality pillars on the right. Calm staggered reveal animations.
 *
 * Place your own image at /public/images/quality.jpg.
 */
export function WhySection({ dict }: { dict: Dictionary }) {
  const w = dict.home.why;

  return (
    <div className="grid items-center gap-8 lg:grid-cols-[1.5fr_1fr] lg:gap-14">
      {/* Image slot — large, dominant */}
      <Reveal className="relative order-1 aspect-[4/3] overflow-hidden sm:aspect-[16/10] lg:order-none lg:aspect-[5/4]">
        <Image
          src="/images/quality.jpg"
          alt="RoyalSauna — detal jakości"
          fill
          sizes="(max-width: 1024px) 100vw, 60vw"
          loading="lazy"
          className="object-contain"
        />
      </Reveal>

      {/* Copy */}
      <div>
        <Reveal>
          <p className="mb-3 text-xs font-medium uppercase tracking-widest text-clay-500">
            {w.eyebrow}
          </p>
          <h2 className="font-serif text-3xl leading-tight text-bark-700 sm:text-4xl">
            {w.title}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-bark-500">
            {w.lead}
          </p>
        </Reveal>

        <div className="mt-8 grid gap-x-6 gap-y-7 sm:grid-cols-2">
          {w.items.map((item, index) => (
            <Reveal key={item.title} delay={index * 100}>
              <div className="group">
                <span className="font-serif text-sm text-clay-500 transition-colors duration-500 group-hover:text-brass">
                  0{index + 1}
                </span>
                <h3 className="mt-1 font-serif text-lg text-bark-700">
                  {item.title}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-bark-500">
                  {item.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  );
}
