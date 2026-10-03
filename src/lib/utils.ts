import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/** Merges class names and resolves conflicting Tailwind utilities (shadcn-style). */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

/** Polish postal code as "00-000", or null when the input isn't one. */
export function normalizePostalCode(raw: string): string | null {
  const digits = raw.replace(/[\s-]/g, "");
  if (!/^\d{5}$/.test(digits)) return null;
  return `${digits.slice(0, 2)}-${digits.slice(2)}`;
}

export function formatPrice(value: number, locale: "pl" | "en"): string {
  return new Intl.NumberFormat(locale === "pl" ? "pl-PL" : "en-US").format(
    value,
  );
}
