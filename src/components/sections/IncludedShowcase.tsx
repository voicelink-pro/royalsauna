import Image from "next/image";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";

/**
 * `shape` matches the source photo's actual aspect ratio (see
 * public/images/README.md), so each box is sized to fit its image natively
 * instead of forcing a crop: "wide" = 16:9, "portrait" = 4:5, "square" = 1:1.
 */
export interface IncludedGroup {
  title: string;
  description: string;
  image: string;
  alt: string;
  shape: "wide" | "portrait" | "square";
}

const ASPECT: Record<IncludedGroup["shape"], string> = {
  wide: "aspect-[16/9]",
  portrait: "aspect-[4/5]",
  square: "aspect-square",
};

/**
 * Premium photo "bento" for the home page's "what's included" section.
 * Layout is built around each photo's real aspect ratio rather than a
 * generic grid: the wide shot runs full-width up top, then the portrait shot
 * sits beside the two square shots in a row whose column widths (4/5/5) are
 * chosen so all three end up the same height with zero cropping.
 */
export function IncludedShowcase({ groups }: { groups: IncludedGroup[] }) {
  const wide = groups.find((g) => g.shape === "wide");
  const rest = groups.filter((g) => g.shape !== "wide");

  return (
    <div className="grid gap-5">
      {wide && (
        <Reveal>
          <Tile group={wide} large />
        </Reveal>
      )}
      <div className="grid gap-5 sm:grid-cols-[4fr_5fr_5fr]">
        {rest.map((group, i) => (
          <Reveal key={group.title} delay={120 + i * 90}>
            <Tile group={group} />
          </Reveal>
        ))}
      </div>
    </div>
  );
}

function Tile({ group, large = false }: { group: IncludedGroup; large?: boolean }) {
  return (
    <div
      className={cn(
        "group relative isolate overflow-hidden rounded-3xl shadow-card",
        ASPECT[group.shape],
      )}
    >
      <Image
        src={group.image}
        alt={group.alt}
        fill
        sizes={large ? "(max-width: 640px) 100vw, 1200px" : "(max-width: 640px) 100vw, 420px"}
        className="object-cover transition-transform duration-700 ease-calm group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-bark-900/85 via-bark-900/10 to-transparent" />
      <div className={cn("absolute inset-x-0 bottom-0", large ? "p-6 sm:p-9" : "p-5 sm:p-6")}>
        <h3
          className={cn(
            "font-serif text-ivory",
            large ? "text-2xl sm:text-3xl" : "text-lg sm:text-xl",
          )}
        >
          {group.title}
        </h3>
        <p
          className={cn(
            "mt-1.5 text-sand-100/90",
            large ? "max-w-md text-sm sm:text-base" : "text-sm",
          )}
        >
          {group.description}
        </p>
      </div>
    </div>
  );
}
