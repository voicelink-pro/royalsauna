"use client";

import { useEffect } from "react";

/**
 * Sets <html lang> on the client for locales other than the SSR default (pl).
 * The root layout renders lang="pl"; the EN subtree mounts this to correct it.
 */
export function HtmlLang({ lang }: { lang: string }) {
  useEffect(() => {
    const prev = document.documentElement.lang;
    document.documentElement.lang = lang;
    return () => {
      document.documentElement.lang = prev;
    };
  }, [lang]);

  return null;
}
