"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import type { Locale } from "@/types";
import type { Dictionary } from "@/lib/i18n";
import { routeMap } from "@/lib/site";
import { Button } from "@/components/ui/button";

const STORAGE_KEY = "rs_cookie_consent";

/**
 * Lightweight cookie consent banner. Stores the choice in localStorage. A real
 * Consent Mode integration can read this value before firing marketing tags.
 */
export function CookieBanner({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dictionary;
}) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      if (!localStorage.getItem(STORAGE_KEY)) setVisible(true);
    } catch {
      /* ignore */
    }
  }, []);

  function decide(value: "all" | "essential") {
    try {
      localStorage.setItem(STORAGE_KEY, value);
    } catch {
      /* ignore */
    }
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div className="fixed inset-x-3 bottom-3 z-50 mx-auto max-w-2xl rounded-2xl border border-sand-300 bg-ivory p-5 shadow-soft sm:inset-x-auto sm:left-5 sm:right-auto sm:w-[26rem]">
      <p className="text-sm leading-relaxed text-bark-600">
        {dict.cookies.message}{" "}
        <Link
          href={routeMap.cookies[locale]}
          className="underline underline-offset-2 hover:text-clay-600"
        >
          {dict.cookies.settings}
        </Link>
      </p>
      <div className="mt-4 flex gap-3">
        <Button size="sm" onClick={() => decide("all")}>
          {dict.cookies.accept}
        </Button>
        <Button size="sm" variant="outline" onClick={() => decide("essential")}>
          {dict.cookies.reject}
        </Button>
      </div>
    </div>
  );
}
