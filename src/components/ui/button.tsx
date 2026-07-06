import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/**
 * shadcn/ui-style Button: same shape/anatomy as the shadcn `button` component
 * (rounded-md, cva variants/sizes, `asChild` via Radix `Slot`), restyled with
 * the RoyalSauna brand palette (bark / brass / ivory) instead of the default
 * shadcn theme tokens.
 */
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium tracking-wide transition-all duration-300 ease-calm outline-none disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2",
  {
    variants: {
      variant: {
        default:
          "bg-bark-700 text-ivory shadow-card hover:bg-bark-600 focus-visible:outline-brass",
        outline:
          "border border-bark-700 bg-transparent text-bark-700 hover:bg-bark-700 hover:text-ivory focus-visible:outline-bark-700",
        secondary:
          "bg-brass text-bark-800 hover:bg-brass-light focus-visible:outline-bark-700",
        ghost:
          "text-bark-700 hover:text-clay-600 underline-offset-4 hover:underline focus-visible:outline-bark-700",
        link: "text-bark-700 underline-offset-4 hover:underline",
        destructive:
          "bg-red-700 text-ivory shadow-card hover:bg-red-800 focus-visible:outline-red-700",
      },
      size: {
        default: "h-11 px-6 py-2.5 has-[>svg]:px-5",
        xs: "h-8 px-3 text-xs has-[>svg]:px-2.5",
        sm: "h-9 px-4 has-[>svg]:px-3.5",
        lg: "h-12 px-8 text-base has-[>svg]:px-7",
        icon: "size-10",
        "icon-xs": "size-8",
        "icon-sm": "size-9",
        "icon-lg": "size-11",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        ref={ref}
        data-slot="button"
        className={cn(buttonVariants({ variant, size, className }))}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
