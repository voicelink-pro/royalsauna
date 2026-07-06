import type { ProductSpec } from "@/types";

export function ProductSpecs({
  specs,
  title,
}: {
  specs: ProductSpec[];
  title: string;
}) {
  return (
    <div>
      <h2 className="font-serif text-2xl text-bark-700">{title}</h2>
      <dl className="mt-6 divide-y divide-sand-200 border-y border-sand-200">
        {specs.map((spec) => (
          <div
            key={spec.label}
            className="flex items-baseline justify-between gap-6 py-4"
          >
            <dt className="text-bark-400">{spec.label}</dt>
            <dd className="text-right font-medium text-bark-700">
              {spec.value}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
