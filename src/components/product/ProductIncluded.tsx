import { CtaButton } from "@/components/ui/CtaButton";

function IncludedItem({ item }: { item: string }) {
  return (
    <li className="flex items-start gap-3 text-bark-600">
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
  );
}

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
  // Split so order reads top→bottom in the left column, then the right —
  // not left→right across each row (CSS grid default).
  const mid = Math.ceil(items.length / 2);
  const left = items.slice(0, mid);
  const right = items.slice(mid);

  return (
    <div>
      {title ? (
        <h2 className="font-serif text-2xl text-bark-700">{title}</h2>
      ) : null}
      <ul className="mt-6 grid gap-3.5 sm:hidden">
        {items.map((item) => (
          <IncludedItem key={item} item={item} />
        ))}
      </ul>
      <div className="mt-6 hidden gap-x-8 sm:grid sm:grid-cols-2">
        <ul className="grid gap-3.5">
          {left.map((item) => (
            <IncludedItem key={item} item={item} />
          ))}
        </ul>
        <ul className="grid gap-3.5">
          {right.map((item) => (
            <IncludedItem key={item} item={item} />
          ))}
        </ul>
      </div>
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
