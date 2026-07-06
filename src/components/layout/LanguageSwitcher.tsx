"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Locale } from "@/types";
import { getAlternatePath } from "@/lib/navigation";
import { trackEvent } from "@/lib/analytics";
import { cn } from "@/lib/utils";

const locales: { code: Locale; label: string }[] = [
  { code: "pl", label: "PL" },
  { code: "en", label: "EN" },
];

export function LanguageSwitcher({
  current,
  className,
}: {
  current: Locale;
  className?: string;
}) {
  const pathname = usePathname() || "/";

  return (
    <div
      className={cn("flex items-center gap-1 text-sm", className)}
      role="group"
      aria-label="Language"
    >
      {locales.map(({ code, label }, i) => {
        const isActive = code === current;
        const href = getAlternatePath(pathname, code);
        return (
          <span key={code} className="flex items-center">
            {i > 0 && <span className="px-1 text-sand-400">/</span>}
            <Link
              href={href}
              hrefLang={code}
              aria-current={isActive ? "true" : undefined}
              onClick={() =>
                !isActive &&
                trackEvent("language_change", {
                  from: current,
                  to: code,
                })
              }
              className={cn(
                "rounded px-1.5 py-0.5 font-medium tracking-wide transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brass",
                isActive
                  ? "text-bark-700"
                  : "text-bark-400 hover:text-bark-700",
              )}
            >
              {label}
            </Link>
          </span>
        );
      })}
    </div>
  );
}
