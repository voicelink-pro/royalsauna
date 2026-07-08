export type Locale = "pl" | "en";

/** Product model ids for the Regenerum line. */
export type ModelId = "compact" | "comfort" | "premium";

/** @deprecated kept as an alias during the rename; use {@link ModelId}. */
export type SaunaSize = ModelId;

export interface ProductImage {
  src: string;
  alt: string;
}

export interface ProductSpec {
  label: string;
  value: string;
}

export interface ProductFeature {
  title: string;
  description: string;
}

export interface ProductOption {
  title: string;
  description: string;
}

/**
 * Locale-independent product data. Human-readable, translatable strings live in
 * the `i18n` map keyed by locale so the same product can power PL and EN pages.
 */
export interface Product {
  /** Stable internal id, used for tracking and config. */
  id: ModelId;
  /** Product line this model belongs to, e.g. "Regenerum". */
  line: string;
  /** URL slug (PL). EN slug is derived in the i18n layer. */
  slug: string;
  enSlug: string;
  /** Display name, identical across locales. */
  name: string;
  /** Price floor in PLN. Final price depends on configuration. */
  priceFrom: number;
  /** Ordering / capacity used for the comparison table. */
  capacity: number;
  images: ProductImage[];
  /** Full-bleed background photo for the top-of-page intro banner. */
  bannerImage: ProductImage;
  i18n: Record<Locale, ProductCopy>;
}

export interface ProductCopy {
  tagline: string;
  audience: string;
  shortDescription: string;
  longDescription: string;
  features: ProductFeature[];
  specs: ProductSpec[];
  included: string[];
  options: ProductOption[];
  faq: FaqItem[];
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface BlogPost {
  slug: string;
  enSlug: string;
  date: string;
  readingTime: number;
  cover: ProductImage;
  i18n: Record<
    Locale,
    {
      title: string;
      excerpt: string;
      category: string;
      /** Body as an array of paragraphs / headings for simple rendering. */
      body: BlogBlock[];
    }
  >;
}

export type BlogBlock =
  | { type: "h2"; text: string }
  | { type: "p"; text: string }
  | { type: "quote"; text: string }
  | { type: "list"; items: string[] };

export interface BreadcrumbItem {
  name: string;
  href: string;
}

/** Named physical heater models shown on the /specyfikacja/piece page. */
export type HeaterModelId = "cilindro" | "legend" | "spirit";

/** Named wood materials shown on the /specyfikacja/drewno page. */
export type WoodMaterialId = "spruce" | "aspen" | "thermowood";

/** A finished sauna element made from a given {@link WoodMaterial}, e.g. benches. */
export interface WoodMaterialElement {
  image: ProductImage;
  i18n: Record<Locale, { label: string }>;
}

export interface WoodMaterial {
  id: WoodMaterialId;
  /** Main texture / raw-material photo. */
  image: ProductImage;
  elements: WoodMaterialElement[];
  i18n: Record<
    Locale,
    {
      name: string;
      /** Short tag naming what this wood is used for, e.g. "Bryła sauny". */
      usageTag: string;
      description: string;
    }
  >;
}

/** Recommended foundation/base types shown on the /specyfikacja/podloze page. */
export type FoundationTypeId = "slab" | "blocks" | "pavers";

export interface FoundationType {
  id: FoundationTypeId;
  image: ProductImage;
  i18n: Record<
    Locale,
    {
      name: string;
      description: string;
      /** Short comparison values shown in the foundation comparison table. */
      compare: {
        cost: string;
        time: string;
        difficulty: string;
        drainage: string;
      };
    }
  >;
}

/** Exterior footprint + recommended foundation size for a given sauna model. */
export interface FoundationDimensions {
  modelId: ModelId;
  exteriorM: { width: number; depth: number };
  recommendedM: { width: number; depth: number };
}

/** A specific, named heater (brand + controller + full manufacturer spec). */
export interface HeaterModel {
  id: HeaterModelId;
  /** Full commercial name, identical across locales (e.g. brand + SKU). */
  name: string;
  /** Manufacturer product code, e.g. "HPC904XW". */
  productCode: string;
  /** Product family / series, e.g. "Cilindro". */
  family: string;
  mounting: "standing" | "hanging";
  color: "steel" | "black";
  powerKw: number;
  /** Recommended sauna volume in m³, or null when the manufacturer doesn't publish one. */
  volumeM3: { min: number; max: number } | null;
  /** Control panel, e.g. "Harvia Xenio WiFi". */
  controller: string;
  /** WiFi app, e.g. "MyHarvia WiFi". */
  wifiApp: string;
  /** Whether remote control requires purchasing a MyHarvia Control app licence. */
  requiresControlLicense: boolean;
  stonesKg: number;
  dimensionsMm: { height: number; width: number; depth: number };
  image: ProductImage;
  i18n: Record<
    Locale,
    {
      /** One-line standout differentiator, shown as a small badge on the card. */
      highlight: string;
      description: string;
    }
  >;
}

/** Lead payload shared by every form on the site. */
export interface LeadPayload {
  name: string;
  email: string;
  phone?: string;
  preferredModel: SaunaSize | "unknown";
  location: string;
  message?: string;
  consent: boolean;
  // Configurator answers (optional — only present from the guided flow).
  peopleCount?: string;
  gardenSpace?: string;
  frequency?: string;
  // Tracking / attribution context (hidden fields).
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  utm_term?: string;
  gclid?: string;
  fbclid?: string;
  landing_page?: string;
  referrer?: string;
  selected_model?: string;
  locale: Locale;
}
