"use client";

import { useState } from "react";
import type { Dictionary } from "@/lib/i18n";

/**
 * Placeholder for a future AI voice agent. Gated behind
 * NEXT_PUBLIC_ENABLE_AI_AGENT. Positioned above the chat widget.
 */
export function VoiceAgentPlaceholder({ dict }: { dict: Dictionary }) {
  const [open, setOpen] = useState(false);

  if (process.env.NEXT_PUBLIC_ENABLE_AI_AGENT !== "true") return null;

  return (
    <div className="fixed bottom-24 right-5 z-50 hidden md:block">
      {open && (
        <div
          role="dialog"
          aria-label={dict.widgets.voiceTitle}
          className="mb-3 w-80 rounded-2xl border border-sand-300 bg-ivory p-5 shadow-soft animate-fade-up"
        >
          <p className="font-serif text-lg text-bark-700">
            {dict.widgets.voiceTitle}
          </p>
          <p className="mt-2 text-sm text-bark-500">
            {dict.widgets.voicePlaceholder}
          </p>
        </div>
      )}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-label={dict.widgets.voiceLabel}
        className="flex h-14 w-14 items-center justify-center rounded-full border border-brass bg-ivory text-bark-700 shadow-soft transition-transform duration-300 ease-calm hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brass"
      >
        <svg
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          aria-hidden="true"
        >
          <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
          <path d="M19 10v2a7 7 0 0 1-14 0v-2M12 19v4" />
        </svg>
      </button>
    </div>
  );
}
