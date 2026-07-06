import * as React from "react";
import { cn } from "@/lib/utils";

/** shadcn/ui-style Textarea, restyled with the RoyalSauna brand palette. */
const Textarea = React.forwardRef<HTMLTextAreaElement, React.ComponentProps<"textarea">>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        data-slot="textarea"
        className={cn(
          "flex min-h-[90px] w-full rounded-md border border-sand-300 bg-ivory px-3 py-2 text-sm text-bark-700 shadow-xs outline-none transition-[color,box-shadow,border-color] placeholder:text-bark-400/60 disabled:cursor-not-allowed disabled:opacity-50",
          "focus-visible:border-clay-500 focus-visible:ring-[3px] focus-visible:ring-clay-500/20",
          "aria-invalid:border-red-600 aria-invalid:ring-[3px] aria-invalid:ring-red-600/20",
          className,
        )}
        {...props}
      />
    );
  },
);
Textarea.displayName = "Textarea";

export { Textarea };
