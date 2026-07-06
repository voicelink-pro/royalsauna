import Image from "next/image";
import type { ProductImage, ProductSpec } from "@/types";

/**
 * Dedicated technical section. The drawing is shown in FULL (object-contain)
 * inside a framed canvas so dimension callouts are never cropped, with the
 * specification table presented alongside it.
 */
export function ProductTechnical({
  drawing,
  specs,
  eyebrow,
  title,
  note,
  drawingLabel,
  specsTitle,
}: {
  drawing?: ProductImage;
  specs: ProductSpec[];
  eyebrow: string;
  title: string;
  note: string;
  drawingLabel: string;
  specsTitle: string;
}) {
  return (
    <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
      {/* Drawing — full, never cropped */}
      {drawing && (
        <figure className="order-2 lg:order-1">
          <div className="relative overflow-hidden rounded-3xl border border-sand-200 bg-ivory p-4 shadow-card sm:p-6">
            <div className="relative aspect-[4/3] w-full">
              <Image
                src={drawing.src}
                alt={drawing.alt}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-contain"
              />
            </div>
          </div>
          <figcaption className="mt-3 text-center text-xs uppercase tracking-widest text-clay-500">
            {drawingLabel}
          </figcaption>
        </figure>
      )}

      {/* Specs */}
      <div className="order-1 lg:order-2">
        <p className="mb-3 text-xs font-medium uppercase tracking-widest text-clay-500">
          {eyebrow}
        </p>
        <h2 className="font-serif text-3xl leading-tight text-bark-700 sm:text-4xl">
          {title}
        </h2>

        <dl className="mt-8 overflow-hidden rounded-2xl border border-sand-200 bg-ivory">
          {specs.map((spec, i) => (
            <div
              key={spec.label}
              className={`flex items-baseline justify-between gap-6 px-5 py-4 ${
                i % 2 === 1 ? "bg-sand-100/60" : ""
              }`}
            >
              <dt className="text-sm text-bark-400">{spec.label}</dt>
              <dd className="text-right font-medium text-bark-700">
                {spec.value}
              </dd>
            </div>
          ))}
        </dl>

        <div className="mt-5 flex items-start gap-3 rounded-xl bg-sand-100 px-4 py-3 text-sm text-bark-500">
          <svg
            className="mt-0.5 h-4 w-4 shrink-0 text-clay-500"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            aria-hidden="true"
          >
            <circle cx="12" cy="12" r="9" />
            <path d="M12 8h.01M11 12h1v4h1" />
          </svg>
          <span>{note}</span>
        </div>

        <span className="sr-only">{specsTitle}</span>
      </div>
    </div>
  );
}
