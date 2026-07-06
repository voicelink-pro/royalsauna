import Image from "next/image";
import type { Locale, Product } from "@/types";

/**
 * Full-bleed intro banner shown at the very top of each product page, above
 * the existing gallery/spec sections. Purely visual — the real, accessible
 * <h1> and description still live in {@link ProductHero} further down the
 * page, so this text is decorative rather than a duplicate heading.
 */
export function ProductHeroBanner({
  product,
  locale,
}: {
  product: Product;
  locale: Locale;
}) {
  const copy = product.i18n[locale];

  return (
    <section className="relative isolate flex h-screen w-full items-center justify-center overflow-hidden text-center">
      <Image
        src={product.bannerImage.src}
        alt={product.bannerImage.alt}
        fill
        priority
        sizes="100vw"
        className="animate-zoom-slow object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-bark-900/50 via-bark-900/25 to-bark-900/60" />

      <div className="relative z-10 px-6">
        <p className="mb-5 animate-fade-up text-xs font-medium uppercase tracking-[0.3em] text-ivory/75">
          {product.line}
        </p>
        <p
          className="animate-fade-up font-serif text-6xl leading-none text-ivory sm:text-7xl lg:text-8xl [animation-delay:120ms]"
        >
          {product.name}
        </p>
        <div
          aria-hidden="true"
          className="mx-auto my-6 h-px w-14 animate-fade-in bg-ivory/40 [animation-delay:500ms]"
        />
        <p className="mx-auto max-w-md animate-fade-up text-base font-light leading-relaxed text-ivory/80 sm:text-lg [animation-delay:280ms]">
          {copy.tagline}
        </p>
      </div>
    </section>
  );
}
