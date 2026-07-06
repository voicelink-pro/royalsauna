import Link from "next/link";
import type { Locale } from "@/types";
import type { Dictionary } from "@/lib/i18n";
import { products } from "@/content/products";
import { formatPrice } from "@/lib/utils";

/**
 * Responsive comparison table of S/M/L. On small screens it scrolls
 * horizontally; the first column is a sticky header of row labels.
 */
export function ProductComparison({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dictionary;
}) {
  const c = dict.saunas.comparison;
  const base = locale === "pl" ? "/sauny" : "/en/saunas";

  const rows: { label: string; render: (i: number) => string }[] = [
    {
      label: c.capacityLabel,
      render: (i) => String(products[i].capacity),
    },
    {
      label: c.dimensionsLabel,
      render: (i) =>
        products[i].i18n[locale].specs.find((s) =>
          s.label.toLowerCase().includes(locale === "pl" ? "wymiary" : "dimensions"),
        )?.value ?? "—",
    },
    {
      label: c.heaterLabel,
      render: (i) =>
        products[i].i18n[locale].specs.find((s) =>
          s.label.toLowerCase().includes(locale === "pl" ? "piec" : "heater"),
        )?.value ?? "—",
    },
    {
      label: c.priceLabel,
      render: (i) =>
        `${formatPrice(products[i].priceFrom, locale)} ${dict.common.currency}`,
    },
  ];

  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[640px] border-collapse text-left">
        <caption className="sr-only">{c.title}</caption>
        <thead>
          <tr className="border-b border-sand-300">
            <th scope="col" className="py-5 pr-4 text-sm font-medium text-bark-400">
              {c.sizeLabel}
            </th>
            {products.map((p) => (
              <th
                key={p.id}
                scope="col"
                className="py-5 pr-4 font-serif text-xl text-bark-700"
              >
                {p.name}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.label} className="border-b border-sand-200">
              <th
                scope="row"
                className="py-4 pr-4 text-sm font-normal text-bark-400"
              >
                {row.label}
              </th>
              {products.map((p, i) => (
                <td key={p.id} className="py-4 pr-4 text-bark-700">
                  {row.render(i)}
                </td>
              ))}
            </tr>
          ))}
          <tr>
            <td className="py-5 pr-4" />
            {products.map((p) => (
              <td key={p.id} className="py-5 pr-4">
                <Link
                  href={`${base}/${locale === "pl" ? p.slug : p.enSlug}`}
                  className="text-sm font-medium text-clay-600 underline-offset-4 hover:underline"
                >
                  {c.ctaLabel} →
                </Link>
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
}
