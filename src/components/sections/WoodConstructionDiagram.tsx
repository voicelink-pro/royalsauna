import Image from "next/image";
import { cn } from "@/lib/utils";

type HotspotId = "shell" | "walls" | "benches" | "floor";

type HotspotCopy = {
  label: string;
  description: string;
};

type Point = { x: number; y: number };

type HotspotLayout = {
  id: HotspotId;
  /** Where the label box sits (controls box position, unaffected by `dot`). */
  anchor: Point;
  /** Which side of the anchor the box/line extends towards. */
  side: "left" | "right";
  /** Where the marker dot sits on the actual photo — the true element. */
  dot: Point;
};

/**
 * `anchor` pins the label box in place; `dot` is the true point on the photo
 * the leader line should touch. Tune `dot` freely to chase the right detail
 * in public/images/sauna-explosive.jpg — moving it never shifts the box.
 */
const layout: HotspotLayout[] = [
  { id: "shell", anchor: { x: 78, y: 16 }, side: "right", dot: { x: 60, y: 28 } },
  { id: "walls", anchor: { x: 30, y: 36 }, side: "left", dot: { x: 30, y: 36 } },
  { id: "benches", anchor: { x: 24, y: 72 }, side: "left", dot: { x: 41, y: 55 } },
  { id: "floor", anchor: { x: 68, y: 80 }, side: "right", dot: { x: 55, y: 71 } },
];

export function WoodConstructionDiagram({
  hotspots,
  alt,
}: {
  hotspots: Record<HotspotId, HotspotCopy>;
  alt: string;
}) {
  return (
    <div className="mx-auto max-w-3xl">
      <div className="relative aspect-[16/9]">
        <div className="absolute inset-0 overflow-hidden rounded-3xl shadow-soft">
          <Image
            src="/images/sauna-explosive.jpg"
            alt={alt}
            fill
            sizes="(min-width: 1280px) 768px, 100vw"
            className="object-cover"
          />
        </div>

        {/* Desktop: leader lines from the true detail to the fixed label boxes. */}
        <div className="pointer-events-none absolute inset-0 hidden xl:block">
          <svg
            className="absolute inset-0 h-full w-full"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            {layout.map((spot) => (
              <line
                key={spot.id}
                x1={spot.dot.x}
                y1={spot.dot.y}
                x2={spot.anchor.x}
                y2={spot.anchor.y}
                stroke="rgba(251,248,242,0.55)"
                strokeWidth={1}
                vectorEffect="non-scaling-stroke"
              />
            ))}
          </svg>

          {layout.map((spot) => (
            <span
              key={`${spot.id}-dot`}
              className="absolute h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brass ring-4 ring-brass/25"
              style={{ left: `${spot.dot.x}%`, top: `${spot.dot.y}%` }}
            />
          ))}

          {layout.map((spot) => {
            const copy = hotspots[spot.id];
            return (
              <div
                key={spot.id}
                className="absolute"
                style={{ left: `${spot.anchor.x}%`, top: `${spot.anchor.y}%` }}
              >
                <div
                  className={cn(
                    "absolute top-1/2 flex w-56 -translate-y-1/2 items-center",
                    spot.side === "right"
                      ? "left-0"
                      : "right-0 flex-row-reverse",
                  )}
                >
                  <span className="h-px w-6 shrink-0 bg-ivory/60" />
                  <div className="w-48 shrink-0 rounded-xl border border-ivory/15 bg-bark-800/90 p-3 shadow-soft backdrop-blur-sm">
                    <p className="font-serif text-sm text-ivory">
                      {copy.label}
                    </p>
                    <p className="mt-1 text-xs leading-snug text-ivory/70">
                      {copy.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Smaller screens: numbered markers on the true detail, legend follows below. */}
        <div className="absolute inset-0 xl:hidden">
          {layout.map((spot, i) => (
            <span
              key={spot.id}
              className="absolute flex h-6 w-6 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-brass text-xs font-semibold text-ivory shadow-soft ring-2 ring-ivory/70"
              style={{ left: `${spot.dot.x}%`, top: `${spot.dot.y}%` }}
            >
              {i + 1}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:hidden">
        {layout.map((spot, i) => {
          const copy = hotspots[spot.id];
          return (
            <div
              key={spot.id}
              className="flex items-start gap-3 rounded-xl border border-sand-200 bg-ivory p-3"
            >
              <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brass text-xs font-semibold text-ivory">
                {i + 1}
              </span>
              <div>
                <p className="font-serif text-sm text-bark-800">
                  {copy.label}
                </p>
                <p className="mt-0.5 text-xs leading-snug text-bark-500">
                  {copy.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
