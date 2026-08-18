import Image from "next/image";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";

/** Generic grid of titled feature/benefit items with calm staggered reveal. */
export function FeatureGrid({
  items,
  columns = 4,
  numbered = false,
}: {
  items: {
    title: string;
    description: string;
    image?: string;
    imageAlt?: string;
    /** Optical scale of the product photo (1 = fill the frame). */
    imageScale?: number;
  }[];
  columns?: 1 | 2 | 3 | 4;
  numbered?: boolean;
}) {
  const colClass = {
    1: "grid-cols-1",
    2: "sm:grid-cols-2",
    3: "sm:grid-cols-2 lg:grid-cols-3",
    4: "sm:grid-cols-2 lg:grid-cols-4",
  }[columns];

  // When the last row is left with a single orphaned item (e.g. 5 items in a
  // 2-column grid), centre it instead of leaving it stranded on the left.
  const orphanCount = items.length % columns;
  const orphanStartIndex = orphanCount === 0 ? items.length : items.length - orphanCount;

  return (
    <div className={cn("grid gap-x-8 gap-y-10", colClass)}>
      {items.map((item, index) => {
        const isOrphan = index >= orphanStartIndex;
        return (
          <Reveal
            key={item.title}
            delay={index * 80}
            className={cn(isOrphan && "sm:col-span-full sm:text-center")}
          >
            {item.image && (
              <div
                className={cn(
                  "relative mb-5 aspect-square w-full max-w-[220px]",
                  isOrphan && "sm:mx-auto",
                )}
              >
                <Image
                  src={item.image}
                  alt={item.imageAlt ?? item.title}
                  fill
                  sizes="220px"
                  className="object-contain object-bottom"
                  style={
                    item.imageScale
                      ? {
                          transform: `scale(${item.imageScale})`,
                          transformOrigin: "center bottom",
                        }
                      : undefined
                  }
                />
              </div>
            )}
            {numbered && (
              <span
                className={cn(
                  "mb-4 inline-flex h-11 w-11 items-center justify-center rounded-full bg-bark-700 font-serif text-lg text-ivory shadow-soft ring-4 ring-ivory/40",
                  isOrphan && "sm:mx-auto",
                )}
              >
                {index + 1}
              </span>
            )}
            <h3 className="font-serif text-xl text-bark-700">{item.title}</h3>
            <p
              className={cn(
                "mt-3 text-bark-500",
                isOrphan && "sm:mx-auto sm:max-w-md",
              )}
            >
              {item.description}
            </p>
          </Reveal>
        );
      })}
    </div>
  );
}
