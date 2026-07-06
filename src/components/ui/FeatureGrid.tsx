import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";

/** Generic grid of titled feature/benefit items with calm staggered reveal. */
export function FeatureGrid({
  items,
  columns = 4,
  numbered = false,
}: {
  items: { title: string; description: string }[];
  columns?: 1 | 2 | 3 | 4;
  numbered?: boolean;
}) {
  const colClass = {
    1: "grid-cols-1",
    2: "sm:grid-cols-2",
    3: "sm:grid-cols-2 lg:grid-cols-3",
    4: "sm:grid-cols-2 lg:grid-cols-4",
  }[columns];

  return (
    <div className={cn("grid gap-x-8 gap-y-10", colClass)}>
      {items.map((item, index) => (
        <Reveal key={item.title} delay={index * 80}>
          {numbered && (
            <span className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-full border border-clay-400 font-serif text-lg text-clay-600">
              {index + 1}
            </span>
          )}
          <h3 className="font-serif text-xl text-bark-700">{item.title}</h3>
          <p className="mt-3 text-bark-500">{item.description}</p>
        </Reveal>
      ))}
    </div>
  );
}
