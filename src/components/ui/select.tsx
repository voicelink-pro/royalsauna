import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * Lightweight native `<select>` styled like the shadcn Select trigger
 * (h-9, rounded-md, focus ring, chevron affordance). Kept native (no Radix
 * Select/portal) so existing state/logic wiring doesn't change — just the
 * shape and shadcn-style visuals.
 */
const NativeSelect = React.forwardRef<HTMLSelectElement, React.ComponentProps<"select">>(
  ({ className, children, ...props }, ref) => {
    return (
      <div className="relative">
        <select
          ref={ref}
          data-slot="select"
          className={cn(
            "flex h-9 w-full min-w-0 appearance-none rounded-md border border-sand-300 bg-ivory px-3 py-1 pr-9 text-sm text-bark-700 shadow-xs outline-none transition-[color,box-shadow,border-color] disabled:cursor-not-allowed disabled:opacity-50",
            "focus-visible:border-clay-500 focus-visible:ring-[3px] focus-visible:ring-clay-500/20",
            "aria-invalid:border-red-600 aria-invalid:ring-[3px] aria-invalid:ring-red-600/20",
            className,
          )}
          {...props}
        >
          {children}
        </select>
        <svg
          aria-hidden="true"
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-bark-400"
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </div>
    );
  },
);
NativeSelect.displayName = "NativeSelect";

export { NativeSelect };
