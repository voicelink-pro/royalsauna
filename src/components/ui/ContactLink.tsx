"use client";

import { trackEvent } from "@/lib/analytics";
import { cn } from "@/lib/utils";

/** Phone/email link that fires the matching tracking event on click. */
export function ContactLink({
  type,
  href,
  children,
  className,
  location = "footer",
}: {
  type: "phone" | "email";
  href: string;
  children: React.ReactNode;
  className?: string;
  location?: string;
}) {
  return (
    <a
      href={href}
      onClick={() =>
        trackEvent(type === "phone" ? "phone_click" : "email_click", {
          location,
        })
      }
      className={cn(
        "transition-colors hover:text-clay-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brass",
        className,
      )}
    >
      {children}
    </a>
  );
}
