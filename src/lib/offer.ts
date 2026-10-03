import type { LeadPayload, Locale, ModelId } from "@/types";
import { getProduct } from "@/content/products";
import { getDictionary } from "@/lib/i18n";
import { formatPrice } from "@/lib/utils";
import { getHeaterModel } from "@/content/heaterModels";
import { buildLeadRows } from "@/lib/configurator-summary";

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
    postalCode: string;
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
  /** Heater picked in the configurator, if any. */
  heater?: string;
  /** Configurator answers as label/value rows for the office notification (PL). */
  preferences: { label: string; value: string }[];
  sourceLabel?: string;
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
    heater: "Piec",
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
    heater: "Heater",
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
    )?.value ?? (locale === "en" ? "ThermoWood (thermally modified Scandinavian spruce)" : "ThermoWood (termowany świerk skandynawski)");

  // Office notification is always in Polish, whatever the form's locale.
  const preferences = payload.configurator
    ? buildLeadRows(payload.configurator, "pl", getDictionary("pl").configurator.wizard).map(
        ({ label, value }) => ({ label, value }),
      )
    : [];
  const heater = payload.configurator
    ? getHeaterModel(payload.configurator.heater)?.name
    : undefined;

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
      postalCode: payload.postalCode,
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
    heater,
    preferences,
    sourceLabel: payload.sourceLabel?.trim() || undefined,
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
