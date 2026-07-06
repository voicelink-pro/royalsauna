"use client";

import { useState } from "react";
import type { Dictionary } from "@/lib/i18n";

/**
 * Placeholder for a future chat widget (e.g. live chat / AI assistant).
 * Gated behind NEXT_PUBLIC_ENABLE_AI_AGENT so it can be toggled per env.
 */
export function ChatWidgetPlaceholder({ dict }: { dict: Dictionary }) {
  const [open, setOpen] = useState(false);

  if (process.env.NEXT_PUBLIC_ENABLE_AI_AGENT !== "true") return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 hidden md:block">
      {open && (
        <div
          role="dialog"
          aria-label={dict.widgets.chatTitle}
          className="mb-3 w-80 rounded-2xl border border-sand-300 bg-ivory p-5 shadow-soft animate-fade-up"
        >
          <p className="font-serif text-lg text-bark-700">
            {dict.widgets.chatTitle}
          </p>
          <p className="mt-2 text-sm text-bark-500">
            {dict.widgets.chatPlaceholder}
          </p>
        </div>
      )}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-label={dict.widgets.chatLabel}
        className="flex h-14 w-14 items-center justify-center rounded-full bg-bark-700 text-ivory shadow-soft transition-transform duration-300 ease-calm hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brass"
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          aria-hidden="true"
        >
          <path d="M21 11.5a8.38 8.38 0 0 1-8.5 8.5 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8A8.38 8.38 0 0 1 12.5 3 8.38 8.38 0 0 1 21 11.5z" />
        </svg>
      </button>
    </div>
  );
}
