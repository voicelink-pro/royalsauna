export function ProductIncluded({
  items,
  title,
}: {
  items: string[];
  title?: string;
}) {
  return (
    <div>
      {title ? (
        <h2 className="font-serif text-2xl text-bark-700">{title}</h2>
      ) : null}
      <ul className="mt-6 grid gap-3 sm:grid-cols-2">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-3 text-bark-600">
            <span
              aria-hidden="true"
              className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brass/20 text-clay-600"
            >
              <svg
                width="13"
                height="13"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.4"
              >
                <path d="M20 6 9 17l-5-5" />
              </svg>
            </span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
