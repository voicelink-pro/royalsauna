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

/**
 * A dialable phone number, or null when the value is empty, a name, or the wrong length.
 * Accepts 9 national digits, a Polish `48` prefix, or an international `+` / `00` prefix.
 * Spaces, dashes, dots, slashes and parentheses are ignored.
 * A Polish national number is returned as `+48` plus those 9 digits.
 */
export function normalizePhone(raw: string): string | null {
  const trimmed = raw.trim();
  if (!trimmed || /[^\d\s()./+-]/.test(trimmed)) return null;

  const compact = trimmed.replace(/[\s()./-]/g, "");
  if (!/^\+?\d+$/.test(compact)) return null;

  const digits = compact.slice(compact.startsWith("+") ? 1 : 0);

  if (digits.startsWith("00")) {
    const international = digits.slice(2);
    if (international.length < 8 || international.length > 15) return null;
    return `+${international}`;
  }

  if (compact.startsWith("+")) {
    if (digits.length < 8 || digits.length > 15) return null;
    return `+${digits}`;
  }

  if (digits.length === 9) return `+48${digits}`;
  if (digits.length === 11 && digits.startsWith("48")) return `+${digits}`;

  return null;
}

export function formatPrice(value: number, locale: "pl" | "en"): string {
  return new Intl.NumberFormat(locale === "pl" ? "pl-PL" : "en-US").format(
    value,
  );
}
