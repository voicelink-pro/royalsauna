import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * shadcn/ui-style Input: same anatomy/shape as the shadcn `input` component
 * (h-9, rounded-md, focus ring, aria-invalid styling), restyled with the
 * RoyalSauna brand palette instead of the default shadcn theme tokens.
 */
const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        ref={ref}
        data-slot="input"
        className={cn(
          "flex h-9 w-full min-w-0 rounded-md border border-sand-300 bg-ivory px-3 py-1 text-sm text-bark-700 shadow-xs outline-none transition-[color,box-shadow,border-color] placeholder:text-bark-400/60 disabled:cursor-not-allowed disabled:opacity-50",
          "focus-visible:border-clay-500 focus-visible:ring-[3px] focus-visible:ring-clay-500/20",
          "aria-invalid:border-red-600 aria-invalid:ring-[3px] aria-invalid:ring-red-600/20",
          className,
        )}
        {...props}
      />
    );
  },
);
Input.displayName = "Input";

export { Input };
