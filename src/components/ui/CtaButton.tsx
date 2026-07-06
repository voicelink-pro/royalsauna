"use client";

import Link from "next/link";
import { Button, type ButtonProps } from "@/components/ui/button";
import { trackEvent } from "@/lib/analytics";

type Variant = "primary" | "secondary" | "ghost";

/** Maps the site's semantic variant names onto the shadcn Button variants. */
const variantMap: Record<Variant, ButtonProps["variant"]> = {
  primary: "default",
  secondary: "outline",
  ghost: "ghost",
};

/**
 * Primary CTA. Renders the shadcn-shaped `Button` as a Next.js `Link` (via
 * `asChild`) and tracks a `cta_click` event with the provided label/location
 * so conversions can be attributed across the site.
 */
export function CtaButton({
  href,
  children,
  variant = "primary",
  location,
  className,
  ariaLabel,
}: {
  href: string;
  children: React.ReactNode;
  variant?: Variant;
  /** Where on the site the CTA lives, e.g. "hero", "footer". */
  location: string;
  className?: string;
  ariaLabel?: string;
}) {
  return (
    <Button asChild variant={variantMap[variant]} size="default" className={className}>
      <Link
        href={href}
        aria-label={ariaLabel}
        onClick={() =>
          trackEvent("cta_click", {
            cta_location: location,
            cta_target: href,
            cta_label: typeof children === "string" ? children : undefined,
          })
        }
      >
        {children}
      </Link>
    </Button>
  );
}
