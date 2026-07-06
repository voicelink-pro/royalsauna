import type { ProductOption } from "@/types";

export function ProductOptions({
  options,
  title,
}: {
  options: ProductOption[];
  title: string;
}) {
  return (
    <div>
      <h2 className="font-serif text-2xl text-bark-700">{title}</h2>
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {options.map((option) => (
          <div
            key={option.title}
            className="rounded-2xl border border-sand-200 bg-ivory p-5"
          >
            <h3 className="font-serif text-lg text-bark-700">{option.title}</h3>
            <p className="mt-2 text-sm text-bark-500">{option.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
