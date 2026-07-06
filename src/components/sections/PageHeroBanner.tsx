import Image from "next/image";

/**
 * Full-bleed, full-screen intro banner for standalone content pages (e.g.
 * /specyfikacja/piece). Mirrors {@link ProductHeroBanner}'s look, generalized
 * to take plain text instead of a `Product`.
 */
export function PageHeroBanner({
  image,
  alt,
  eyebrow,
  caption,
}: {
  image: string;
  alt: string;
  eyebrow: string;
  caption: string;
}) {
  return (
    <section className="relative isolate flex h-screen w-full items-center justify-center overflow-hidden text-center">
      <Image
        src={image}
        alt={alt}
        fill
        priority
        sizes="100vw"
        className="animate-zoom-slow object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-bark-900/50 via-bark-900/25 to-bark-900/60" />

      <div className="relative z-10 px-6">
        <p className="mb-5 animate-fade-up text-xs font-medium uppercase tracking-[0.3em] text-ivory/75">
          {eyebrow}
        </p>
        <p className="mx-auto max-w-3xl animate-fade-up font-serif text-4xl leading-tight text-ivory sm:text-5xl lg:text-6xl [animation-delay:120ms]">
          {caption}
        </p>
        <div
          aria-hidden="true"
          className="mx-auto my-6 h-px w-14 animate-fade-in bg-ivory/40 [animation-delay:500ms]"
        />
      </div>
    </section>
  );
}
