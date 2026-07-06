"use client";

import { useEffect, useRef } from "react";
import { readAttribution } from "@/lib/analytics";

/**
 * Captures UTM / click-id attribution once on mount and persists it to
 * sessionStorage so it survives navigation within a session. Returns a getter
 * that merges first-touch attribution with the current landing page.
 */
export function useAttribution() {
  const stored = useRef<Record<string, string>>({});

  useEffect(() => {
    const KEY = "rs_attribution";
    try {
      const existing = sessionStorage.getItem(KEY);
      const current = readAttribution();
      if (existing) {
        const parsed = JSON.parse(existing) as Record<string, string>;
        // First-touch wins for UTM/click ids; refresh landing/referrer.
        stored.current = {
          ...current,
          ...parsed,
          landing_page: parsed.landing_page || current.landing_page,
        };
      } else {
        stored.current = current;
        sessionStorage.setItem(KEY, JSON.stringify(current));
      }
    } catch {
      stored.current = readAttribution();
    }
  }, []);

  return () => stored.current;
}
