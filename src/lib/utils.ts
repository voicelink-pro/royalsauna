import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/** Merges class names and resolves conflicting Tailwind utilities (shadcn-style). */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

export function formatPrice(value: number, locale: "pl" | "en"): string {
  return new Intl.NumberFormat(locale === "pl" ? "pl-PL" : "en-US").format(
    value,
  );
}
