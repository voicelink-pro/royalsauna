import { Reveal } from "@/components/ui/Reveal";

/**
 * Refined list of "key features" shown next to the interior photo on product
 * pages — a leaf-accent icon + title + description per row, separated by
 * hairlines instead of the bare, plain-text stack used elsewhere.
 */
export function KeyFeatureList({
  items,
}: {
  items: { title: string; description: string }[];
}) {
  return (
    <ul className="mt-5 divide-y divide-sand-200 border-t border-sand-200">
      {items.map((item, index) => (
        <Reveal key={item.title} delay={index * 80}>
          <li className="flex gap-4 py-5">
            <span
              aria-hidden="true"
              className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brass/15 text-brass-dark"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.75}
                className="h-4 w-4"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M20 6 9 17l-5-5" />
              </svg>
            </span>
            <div>
              <h4 className="font-serif text-lg leading-snug text-bark-700">
                {item.title}
              </h4>
              <p className="mt-1.5 text-sm leading-relaxed text-bark-500">
                {item.description}
              </p>
            </div>
          </li>
        </Reveal>
      ))}
    </ul>
  );
}
