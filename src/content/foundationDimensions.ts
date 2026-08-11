import type { FoundationDimensions, Locale } from "@/types";

/**
 * Recommended foundation size = exterior sauna footprint + 10 cm of margin on
 * each side (so 20 cm added to both width and depth), per the manufacturer's
 * technical drawings. Keep in sync with the "Exterior dimensions" specs in
 * src/content/products.ts.
 */
export const foundationDimensions: FoundationDimensions[] = [
  {
    modelId: "compact",
    exteriorM: { width: 2.1, depth: 2.145 },
    recommendedM: { width: 2.3, depth: 2.345 },
  },
  {
    modelId: "comfort",
    exteriorM: { width: 2.4, depth: 2.2 },
    recommendedM: { width: 2.6, depth: 2.4 },
  },
  {
    modelId: "premium",
    exteriorM: { width: 3.0, depth: 2.4 },
    recommendedM: { width: 3.2, depth: 2.6 },
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
