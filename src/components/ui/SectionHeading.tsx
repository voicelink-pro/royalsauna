import Image from "next/image";
import { cn } from "@/lib/utils";

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className,
  as = "h2",
  accentLine = false,
  divider = false,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
  as?: "h1" | "h2";
  /** Small brass accent rule under the eyebrow label. */
  accentLine?: boolean;
  /** Ornamental line–leaf–line divider between the title and description. */
  divider?: boolean;
}) {
  const Title = as;
  return (
    <div
      className={cn(
        "max-w-prose",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      {eyebrow && (
        <p className="mb-3 text-xs font-medium uppercase tracking-widest text-clay-500">
          {eyebrow}
        </p>
      )}
      {accentLine && (
        <div
          aria-hidden="true"
          className={cn("mb-5 h-px w-10 bg-brass", align === "center" && "mx-auto")}
        />
      )}
      <Title
        className={cn(
          "font-serif text-bark-700",
          as === "h1"
            ? "text-4xl leading-tight sm:text-5xl lg:text-6xl"
            : "text-3xl leading-tight sm:text-4xl",
        )}
      >
        {title}
      </Title>
      {divider && (
        <div aria-hidden="true" className="my-6 flex w-full items-center gap-4">
          <span className="h-px flex-1 bg-brass/40" />
          <span className="relative h-7 w-7 shrink-0">
            <Image src="/logo-nkd.png" alt="" fill sizes="28px" className="object-contain" />
          </span>
          <span className="h-px flex-1 bg-brass/40" />
        </div>
      )}
      {description && (
        <p
          className={cn(
            "text-lg leading-relaxed text-bark-500",
            !divider && "mt-5",
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}
