import type { LeadPayload, Locale, ModelId } from "@/types";
import { getProduct } from "@/content/products";
import { getDictionary } from "@/lib/i18n";
import { formatPrice } from "@/lib/utils";

/**
 * Normalised, locale-aware view of a lead that the PDF / email layers consume.
 */
export interface OfferData {
  locale: Locale;
  generatedAt: string;
  client: {
    name: string;
    email: string;
    phone?: string;
    location: string;
    message?: string;
  };
  model: {
    id: ModelId;
    line: string;
    name: string;
    tagline: string;
    capacity: number;
    priceFrom: number;
    priceFormatted: string;
    currency: string;
    material: string;
  };
  included: string[];
  preferences: { label: string; value: string }[];
  brand: {
    name: string;
    tagline: string;
    phone: string;
    email: string;
    address: string;
    url: string;
  };
  labels: ReturnType<typeof offerLabels>;
}

function offerLabels(locale: Locale) {
  const pl = {
    documentTitle: "Wstępna oferta",
    preparedFor: "Przygotowano dla",
    date: "Data",
    recommendedModel: "Rekomendowany model",
    capacity: "Liczba osób",
    material: "Materiał",
    priceFrom: "Cena od",
    included: "W cenie zestawu",
    yourPreferences: "Twoje preferencje",
    nextSteps: "Kolejne kroki",
    nextStepsBody:
      "Skontaktujemy się z Tobą, aby potwierdzić szczegóły konfiguracji, termin dostawy i montażu oraz przygotować ostateczną wycenę.",
    priceDisclaimer:
      "Podana cena ma charakter orientacyjny i nie stanowi oferty w rozumieniu Kodeksu cywilnego. Ostateczna wycena zależy od wybranej konfiguracji, miejsca montażu i opcji dodatkowych.",
    contact: "Kontakt",
    people: "Liczba osób",
    garden: "Miejsce w ogrodzie",
    frequency: "Częstotliwość",
    none: "—",
  };
  const en = {
    documentTitle: "Preliminary offer",
    preparedFor: "Prepared for",
    date: "Date",
    recommendedModel: "Recommended model",
    capacity: "People",
    material: "Material",
    priceFrom: "Price from",
    included: "Included in the set",
    yourPreferences: "Your preferences",
    nextSteps: "Next steps",
    nextStepsBody:
      "We will contact you to confirm configuration details, delivery and installation dates, and to prepare the final quote.",
    priceDisclaimer:
      "The price shown is indicative and does not constitute a binding offer. The final quote depends on the chosen configuration, installation site and additional options.",
    contact: "Contact",
    people: "People",
    garden: "Garden space",
    frequency: "Frequency",
    none: "—",
  };
  return locale === "en" ? en : pl;
}

const PREF_VALUE_LABELS: Record<Locale, Record<string, string>> = {
  pl: {
    "2": "1–2 osoby",
    "3": "3–4 osoby",
    "5": "5 i więcej",
    small: "Niewiele miejsca",
    medium: "Średnio miejsca",
    large: "Dużo miejsca",
    occasional: "Okazjonalnie",
    regular: "Regularnie",
    daily: "Codziennie",
  },
  en: {
    "2": "1–2 people",
    "3": "3–4 people",
    "5": "5 or more",
    small: "Little space",
    medium: "Medium space",
    large: "Plenty of space",
    occasional: "Occasionally",
    regular: "Regularly",
    daily: "Daily",
  },
};

function resolveModelId(value: LeadPayload["preferredModel"]): ModelId {
  if (value === "compact" || value === "comfort" || value === "premium") {
    return value;
  }
  return "comfort";
}

export function buildOfferData(payload: LeadPayload): OfferData {
  const locale = payload.locale === "en" ? "en" : "pl";
  const dict = getDictionary(locale);
  const labels = offerLabels(locale);

  const modelId = resolveModelId(payload.preferredModel);
  const product = getProduct(modelId)!;
  const copy = product.i18n[locale];

  const material =
    copy.specs.find((s) =>
      locale === "en"
        ? s.label.toLowerCase().includes("material")
        : s.label.toLowerCase().includes("materiał"),
    )?.value ?? (locale === "en" ? "Premium Estonian spruce" : "Estoński świerk premium");

  const v = PREF_VALUE_LABELS[locale];
  const preferences: { label: string; value: string }[] = [];
  if (payload.peopleCount) preferences.push({ label: labels.people, value: v[payload.peopleCount] ?? payload.peopleCount });
  if (payload.gardenSpace) preferences.push({ label: labels.garden, value: v[payload.gardenSpace] ?? payload.gardenSpace });
  if (payload.frequency) preferences.push({ label: labels.frequency, value: v[payload.frequency] ?? payload.frequency });

  const dateFormatter = new Intl.DateTimeFormat(locale === "en" ? "en-GB" : "pl-PL", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return {
    locale,
    generatedAt: dateFormatter.format(new Date()),
    client: {
      name: payload.name,
      email: payload.email,
      phone: payload.phone,
      location: payload.location,
      message: payload.message,
    },
    model: {
      id: modelId,
      line: product.line,
      name: product.name,
      tagline: copy.tagline,
      capacity: product.capacity,
      priceFrom: product.priceFrom,
      priceFormatted: formatPrice(product.priceFrom, locale),
      currency: dict.common.currency,
      material,
    },
    included: dict.home.included.items,
    preferences,
    brand: {
      name: dict.brand.name,
      tagline: dict.brand.tagline,
      phone: dict.brand.phone,
      email: dict.brand.email,
      address: dict.brand.address,
      url: process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || "https://royalsauna.pl",
    },
    labels,
  };
}
