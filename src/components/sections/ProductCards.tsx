"use client";

import Image from "next/image";
import Link from "next/link";
import type { Locale } from "@/types";
import type { Dictionary } from "@/lib/i18n";
import { products } from "@/content/products";
import { trackEvent } from "@/lib/analytics";
import { formatPrice } from "@/lib/utils";

export function ProductCards({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dictionary;
}) {
  const base = locale === "pl" ? "/sauny" : "/en/saunas";

  return (
    <div className="grid gap-6 md:grid-cols-3">
      {products.map((product, index) => {
        const copy = product.i18n[locale];
        const href = `${base}/${locale === "pl" ? product.slug : product.enSlug}`;
        return (
          <Link
            key={product.id}
            href={href}
            onClick={() =>
              trackEvent("product_size_select", {
                model: product.id,
                source: "home_cards",
              })
            }
            className="group flex flex-col overflow-hidden rounded-2xl border border-sand-200 bg-ivory shadow-card transition-all duration-500 ease-calm hover:-translate-y-1 hover:shadow-soft focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brass"
          >
            <div className="relative aspect-[4/3] overflow-hidden">
              <Image
                src={product.images[0].src}
                alt={product.images[0].alt}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                loading={index === 0 ? "eager" : "lazy"}
                className="object-cover transition-transform duration-700 ease-calm group-hover:scale-105"
              />
            </div>
            <div className="flex flex-1 flex-col p-6">
              <p className="text-xs font-medium uppercase tracking-widest text-clay-500">
                {copy.tagline}
              </p>
              <h3 className="mt-2 font-serif text-2xl text-bark-700">
                {product.name}
              </h3>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-bark-500">
                {copy.shortDescription}
              </p>
              <div className="mt-6 flex items-center justify-between border-t border-sand-200 pt-4">
                <div>
                  <span className="text-xs text-bark-400">
                    {dict.common.priceFrom}
                  </span>
                  <p className="font-serif text-lg text-bark-700">
                    {formatPrice(product.priceFrom, locale)}{" "}
                    {dict.common.currency}
                  </p>
                </div>
                <span className="text-sm font-medium text-clay-600 transition-transform duration-300 group-hover:translate-x-1">
                  {dict.common.seeModel} →
                </span>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
