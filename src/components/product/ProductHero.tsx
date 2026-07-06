import type { Locale, Product, ProductImage } from "@/types";
import type { Dictionary } from "@/lib/i18n";
import { CtaButton } from "@/components/ui/CtaButton";
import { ProductGallery } from "@/components/product/ProductGallery";
import { formatPrice } from "@/lib/utils";

export function ProductHero({
  product,
  locale,
  dict,
  offerHref,
  galleryImages,
}: {
  product: Product;
  locale: Locale;
  dict: Dictionary;
  offerHref: string;
  galleryImages?: ProductImage[];
}) {
  const copy = product.i18n[locale];
  const images = galleryImages ?? product.images;

  return (
    <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-16">
      <ProductGallery images={images} />

      <div className="lg:pt-4">
        <p className="text-xs font-medium uppercase tracking-widest text-clay-500">
          {copy.tagline}
        </p>
        <h1 className="mt-3 font-serif text-4xl leading-tight text-bark-700 sm:text-5xl lg:text-6xl">
          {product.name}
        </h1>
        <p className="mt-5 text-lg leading-relaxed text-bark-500">
          {copy.longDescription}
        </p>

        {/* Quick stats */}
        <div className="mt-8 grid grid-cols-3 gap-3">
          {copy.specs.slice(0, 3).map((spec) => (
            <div
              key={spec.label}
              className="rounded-2xl border border-sand-200 bg-ivory px-4 py-3 text-center"
            >
              <p className="font-serif text-xl text-bark-700">{spec.value}</p>
              <p className="mt-1 text-[11px] uppercase tracking-wide text-bark-400">
                {spec.label}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-6 rounded-2xl border border-sand-200 bg-sand-100 p-6">
          <p className="text-sm text-bark-400">{dict.common.priceFrom}</p>
          <p className="font-serif text-3xl text-bark-700">
            {formatPrice(product.priceFrom, locale)} {dict.common.currency}
          </p>
          <p className="mt-1 text-sm text-bark-400">{dict.common.priceNote}</p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <CtaButton
              href={offerHref}
              location={`product_hero_${product.id}`}
              variant="primary"
            >
              {dict.common.requestOfferFor}
            </CtaButton>
          </div>
        </div>
      </div>
    </div>
  );
}
