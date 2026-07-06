"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import type { Locale } from "@/types";
import type { Dictionary } from "@/lib/i18n";
import { routeMap } from "@/lib/site";
import { trackEvent } from "@/lib/analytics";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

/**
 * Sticky bottom CTA bar on mobile. Appears after the user scrolls past the
 * hero so the primary conversion is always one tap away.
 */
export function MobileStickyCTA({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dictionary;
}) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={cn(
        "fixed inset-x-0 bottom-0 z-30 border-t border-sand-200 bg-ivory/95 p-3 backdrop-blur transition-transform duration-500 ease-calm lg:hidden",
        visible ? "translate-y-0" : "translate-y-full",
      )}
    >
      <div className="flex items-center gap-3">
        <a
          href={dict.brand.phoneHref}
          onClick={() => trackEvent("phone_click", { location: "sticky_cta" })}
          aria-label={dict.contact.phoneTitle}
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-bark-700 text-bark-700"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            aria-hidden="true"
          >
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
          </svg>
        </a>
        <Button asChild className="h-12 flex-1">
          <Link
            href={routeMap.configurator[locale]}
            onClick={() =>
              trackEvent("cta_click", {
                cta_location: "sticky_cta",
                cta_target: routeMap.configurator[locale],
              })
            }
          >
            {dict.nav.requestOffer}
          </Link>
        </Button>
      </div>
    </div>
  );
}
