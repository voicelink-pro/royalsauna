import * as React from "react";
import * as SwitchPrimitive from "@radix-ui/react-switch";
import { cn } from "@/lib/utils";

/**
 * shadcn/ui-style Switch (Radix primitive), restyled with the RoyalSauna
 * brand palette to match Button/Select. Purely visual — no day/night logic
 * lives here, that belongs to the feature using it (e.g. the hero theme
 * toggle in HeroVideoScroll).
 */
const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SwitchPrimitive.Root>
>(({ className, ...props }, ref) => (
  <SwitchPrimitive.Root
    ref={ref}
    data-slot="switch"
    className={cn(
      "peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border border-transparent shadow-xs outline-none transition-colors duration-300 ease-calm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brass disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-bark-700 data-[state=unchecked]:bg-sand-300",
      className,
    )}
    {...props}
  >
    <SwitchPrimitive.Thumb
      data-slot="switch-thumb"
      className="pointer-events-none flex size-5 items-center justify-center rounded-full bg-ivory shadow-card ring-0 transition-transform duration-300 ease-calm data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0.5"
    />
  </SwitchPrimitive.Root>
));
Switch.displayName = SwitchPrimitive.Root.displayName;

export { Switch };
