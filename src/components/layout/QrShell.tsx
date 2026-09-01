import Image from "next/image";
import Link from "next/link";
import type { Locale } from "@/types";
import type { Dictionary } from "@/lib/i18n";
import { ContactLink } from "@/components/ui/ContactLink";

/**
 * Minimal chrome for physical QR landing pages — logo + phone only.
 * No main navigation, footer or sticky CTAs from the marketing site.
 */
export function QrShell({
  locale,
  dict,
  children,
}: {
  locale: Locale;
  dict: Dictionary;
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-sand-100 text-bark-700">
      <header className="sticky top-0 z-30 border-b border-sand-200/80 bg-sand-100/95 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-lg items-center justify-between px-4 sm:h-[4.5rem] sm:px-6">
          <Link
            href={locale === "pl" ? "/" : "/en"}
            aria-label={dict.brand.name}
            className="relative block h-10 w-[140px] sm:h-11 sm:w-[155px]"
          >
            <Image
              src="/logo.png"
              alt={dict.brand.name}
              fill
              sizes="155px"
              className="object-contain object-left"
            />
          </Link>
          <ContactLink
            type="phone"
            href={dict.brand.phoneHref}
            location="qr_shell"
            className="text-sm font-medium text-bark-700 underline-offset-4 hover:text-clay-600 hover:underline"
          >
            {dict.brand.phone}
          </ContactLink>
        </div>
      </header>
      <main>{children}</main>
    </div>
  );
}
