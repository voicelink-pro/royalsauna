"use client";

import { useId, useState } from "react";
import type { FaqItem } from "@/types";
import { cn } from "@/lib/utils";

/** Accessible accordion for FAQ items. JSON-LD is emitted separately by pages. */
export function FAQSection({ items }: { items: FaqItem[] }) {
  const [open, setOpen] = useState<number | null>(0);
  const baseId = useId();

  return (
    <div className="space-y-3">
      {items.map((item, index) => {
        const isOpen = open === index;
        const btnId = `${baseId}-q-${index}`;
        const panelId = `${baseId}-a-${index}`;
        return (
          <div
            key={item.question}
            className={cn(
              "rounded-2xl border bg-ivory/70 px-5 transition-all duration-300 ease-calm sm:px-7",
              isOpen
                ? "border-clay-400/60 bg-ivory shadow-card"
                : "border-sand-300 hover:border-clay-400/40 hover:bg-ivory",
            )}
          >
            <h3>
              <button
                id={btnId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? null : index)}
                className="flex w-full items-center justify-between gap-4 py-5 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brass"
              >
                <span
                  className={cn(
                    "font-serif text-lg transition-colors duration-300",
                    isOpen ? "text-clay-600" : "text-bark-700",
                  )}
                >
                  {item.question}
                </span>
                <span
                  aria-hidden="true"
                  className={cn(
                    "flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition-all duration-300",
                    isOpen
                      ? "rotate-45 border-bark-700 bg-bark-700 text-ivory"
                      : "border-sand-300 bg-sand-100 text-bark-700",
                  )}
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                  >
                    <path d="M12 5v14M5 12h14" />
                  </svg>
                </span>
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={btnId}
              hidden={!isOpen}
              className="pb-6"
            >
              <p className="max-w-prose leading-relaxed text-bark-500">
                {item.answer}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
