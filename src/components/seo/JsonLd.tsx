import type { BreadcrumbItem, FaqItem, Locale, Product } from "@/types";
import { absoluteUrl, getSiteUrl } from "@/lib/site";

/** Renders a JSON-LD <script> tag. Data is serialized safely. */
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      // JSON.stringify output is safe; we also escape `<` to avoid breaking out.
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}

export function organizationSchema(): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "RoyalSauna",
    legalName: "B4wood Sp. z o.o.",
    url: getSiteUrl(),
    logo: `${getSiteUrl()}/logo.png`,
    description:
      "Sauny ogrodowe premium ze świerku skandynawskiego. Jeden model w trzech wariantach.",
    sameAs: [],
    address: {
      "@type": "PostalAddress",
      addressLocality: "Łysomice",
      postalCode: "87-148",
      addressCountry: "PL",
    },
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "sales",
      email: "biuro@royalsauna.pl",
      telephone: "+48600359180",
      areaServed: "PL",
      availableLanguage: ["pl", "en"],
    },
  };
}

export function websiteSchema(): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "RoyalSauna",
    url: getSiteUrl(),
    inLanguage: ["pl-PL", "en"],
  };
}

export function productSchema(
  product: Product,
  locale: Locale,
  path: string,
): Record<string, unknown> {
  const copy = product.i18n[locale];
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: copy.shortDescription,
    image: product.images.map((i) => i.src),
    brand: { "@type": "Brand", name: "RoyalSauna" },
    category: locale === "pl" ? "Sauny ogrodowe" : "Garden saunas",
    offers: {
      "@type": "Offer",
      priceCurrency: "PLN",
      price: product.priceFrom,
      availability: "https://schema.org/InStock",
      url: absoluteUrl(path),
      priceValidUntil: `${new Date().getFullYear() + 1}-12-31`,
    },
  };
}

export function faqSchema(items: FaqItem[]): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };
}

export function breadcrumbSchema(
  items: BreadcrumbItem[],
): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.href),
    })),
  };
}

export function articleSchema(args: {
  title: string;
  description: string;
  image: string;
  datePublished: string;
  path: string;
}): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: args.title,
    description: args.description,
    image: args.image,
    datePublished: args.datePublished,
    dateModified: args.datePublished,
    author: { "@type": "Organization", name: "RoyalSauna" },
    publisher: {
      "@type": "Organization",
      name: "RoyalSauna",
      logo: { "@type": "ImageObject", url: `${getSiteUrl()}/logo.png` },
    },
    mainEntityOfPage: absoluteUrl(args.path),
  };
}
