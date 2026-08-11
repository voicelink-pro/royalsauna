import { CtaButton } from "@/components/ui/CtaButton";

export function ProductIncluded({
  items,
  title,
  ctaHref,
  ctaLabel,
  ctaLocation = "product_included",
}: {
  items: string[];
  title?: string;
  /** Link to the welcome-package page (optional). */
  ctaHref?: string;
  ctaLabel?: string;
  ctaLocation?: string;
}) {
  return (
    <div>
      {title ? (
        <h2 className="font-serif text-2xl text-bark-700">{title}</h2>
      ) : null}
      <ul className="mt-6 grid gap-3.5 sm:grid-cols-2">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-3 text-bark-600">
            <span
              aria-hidden="true"
              className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-brass/45 text-brass"
            >
              <svg
                viewBox="0 0 20 20"
                fill="none"
                className="h-3 w-3"
                stroke="currentColor"
                strokeWidth="2.2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.5 10.5 8 14l7.5-8"
                />
              </svg>
            </span>
            <span className="pt-0.5 text-[15px] leading-snug">{item}</span>
          </li>
        ))}
      </ul>
      {ctaHref && ctaLabel ? (
        <div className="mt-8">
          <CtaButton
            href={ctaHref}
            location={ctaLocation}
            variant="secondary"
            className="px-5 py-2.5"
          >
            {ctaLabel}
          </CtaButton>
        </div>
      ) : null}
    </div>
  );
}
