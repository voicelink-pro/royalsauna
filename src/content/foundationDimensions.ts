import type { FoundationDimensions, Locale } from "@/types";

/**
 * Recommended foundation size = exterior sauna footprint + 20 cm of margin on
 * each side (so 40 cm added to both width and depth). Keep in sync with the
 * "Exterior dimensions" specs in src/content/products.ts.
 */
export const foundationDimensions: FoundationDimensions[] = [
  {
    modelId: "compact",
    exteriorM: { width: 2.0, depth: 2.0 },
    recommendedM: { width: 2.4, depth: 2.4 },
  },
  {
    modelId: "comfort",
    exteriorM: { width: 2.4, depth: 2.0 },
    recommendedM: { width: 2.8, depth: 2.4 },
  },
  {
    modelId: "premium",
    exteriorM: { width: 3.0, depth: 2.2 },
    recommendedM: { width: 3.4, depth: 2.6 },
  },
];

/** Formats a width×depth pair as e.g. "2,4 × 2,4 m" (pl) or "2.4 × 2.4 m" (en). */
export function formatFootprint(
  size: { width: number; depth: number },
  locale: Locale,
): string {
  const fmt = (n: number) =>
    locale === "pl" ? n.toFixed(1).replace(".", ",") : n.toFixed(1);
  return `${fmt(size.width)} × ${fmt(size.depth)} m`;
}
