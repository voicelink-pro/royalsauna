"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import type { Locale } from "@/types";
import type { Dictionary } from "@/lib/i18n";
import { routeMap } from "@/lib/site";
import { trackEvent } from "@/lib/analytics";
import { cn } from "@/lib/utils";

type PointId = "heater" | "benches" | "walls" | "floor";

interface Hotspot {
  id: PointId;
  /** Which spec page this point links to. */
  target: "wood" | "heaters";
  hash: string;
  /** Marker position on the image, in %. */
  point: { x: number; y: number };
  /** Desktop card placement (corner) + leader line start, in %. */
  corner: string;
  line: { x1: number; y1: number; x2: number; y2: number };
}

const HOTSPOTS: Hotspot[] = [
  {
    id: "benches",
    target: "wood",
    hash: "#konstrukcja",
    point: { x: 20, y: 60 },
    corner: "lg:left-8 lg:top-24",
    line: { x1: 17, y1: 36, x2: 20, y2: 58 },
  },
  {
    id: "walls",
    target: "wood",
    hash: "#konstrukcja",
    point: { x: 82, y: 22 },
    corner: "lg:right-8 lg:top-24",
    line: { x1: 83, y1: 36, x2: 81, y2: 24 },
  },
  {
    id: "floor",
    target: "wood",
    hash: "#konstrukcja",
    point: { x: 44, y: 90 },
    corner: "lg:left-8 lg:bottom-12",
    line: { x1: 17, y1: 70, x2: 43, y2: 88 },
  },
  {
    id: "heater",
    target: "heaters",
    hash: "#piece",
    point: { x: 52, y: 52 },
    corner: "lg:right-8 lg:bottom-12",
    line: { x1: 83, y1: 70, x2: 54, y2: 54 },
  },
];

/**
 * Full-screen interior video. Plays once on click and freezes on its last
 * frame, then reveals subtle annotations (leader lines + cards) pointing at the
 * heater, benches, walls and floor, each linking to its spec subpage.
 */
export function InteriorVideoSection({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dictionary;
}) {
  const t = dict.home.interior;
  const videoRef = useRef<HTMLVideoElement>(null);
  const [started, setStarted] = useState(false);
  const [ended, setEnded] = useState(false);

  const play = () => {
    if (started) return;
    const video = videoRef.current;
    if (!video) return;
    setStarted(true);
    trackEvent("interior_video_play", { source: "home" });
    video.play().catch(() => setStarted(false));
  };

  const specBase = { wood: routeMap.wood[locale], heaters: routeMap.heaters[locale] };

  return (
    <section
      aria-label={t.title}
      className="relative h-screen min-h-[520px] w-full overflow-hidden bg-bark-900"
    >
      <video
        ref={videoRef}
        src="/videos/wnetrze.mp4"
        poster="/images/interior-poster.jpg"
        muted
        playsInline
        preload="auto"
        onEnded={() => setEnded(true)}
        className="absolute inset-0 h-full w-full object-cover"
      />

      {/* Start still — shown before the clip is played. */}
      {!started && (
        <img
          src="/images/interior-poster.jpg"
          alt={t.title}
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover"
        />
      )}

      {/* Final still — replaces the frozen last frame once the clip ends. */}
      {ended && (
        <img
          src="/images/cubus5-frontinterir.png"
          alt={t.title}
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover"
        />
      )}

      {/* Play button + wash (before playback). */}
      <div
        className={cn(
          "absolute inset-0 flex items-center justify-center bg-gradient-to-t from-bark-900/45 via-bark-900/10 to-bark-900/15 transition-opacity duration-700",
          started ? "pointer-events-none opacity-0" : "opacity-100",
        )}
      >
        <button
          type="button"
          onClick={play}
          aria-label={t.button}
          className="group flex items-center gap-3 rounded-full border border-ivory/40 bg-ivory/10 px-7 py-4 text-ivory backdrop-blur-md transition-all duration-300 hover:border-ivory/80 hover:bg-ivory/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ivory"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-full border border-ivory/60 transition-transform duration-300 group-hover:scale-110">
            <svg
              viewBox="0 0 24 24"
              fill="currentColor"
              className="ml-0.5 h-4 w-4"
              aria-hidden="true"
            >
              <path d="M8 5v14l11-7z" />
            </svg>
          </span>
          <span className="text-sm font-medium tracking-wide">{t.button}</span>
        </button>
      </div>

      {/* Annotations (after the clip ends). */}
      <div
        className={cn(
          "absolute inset-0 transition-opacity duration-1000",
          ended ? "opacity-100" : "pointer-events-none opacity-0",
        )}
      >
        {/* Leader lines + markers (desktop). */}
        <svg
          className="absolute inset-0 hidden h-full w-full lg:block"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          {HOTSPOTS.map((h) => (
            <g key={h.id} className="text-ivory">
              <line
                x1={h.line.x1}
                y1={h.line.y1}
                x2={h.line.x2}
                y2={h.line.y2}
                stroke="currentColor"
                strokeWidth={1}
                strokeOpacity={0.5}
                vectorEffect="non-scaling-stroke"
              />
            </g>
          ))}
        </svg>

        {/* Pulsing markers on the image (desktop). */}
        {HOTSPOTS.map((h) => (
          <span
            key={h.id}
            aria-hidden="true"
            className="absolute hidden h-3 w-3 -translate-x-1/2 -translate-y-1/2 lg:block"
            style={{ left: `${h.point.x}%`, top: `${h.point.y}%` }}
          >
            <span className="absolute inset-0 animate-ping rounded-full bg-ivory/60" />
            <span className="absolute inset-0 rounded-full border border-ivory bg-ivory/30" />
          </span>
        ))}

        {/* Cards: corners on desktop, stacked scrim on mobile. */}
        <div className="absolute inset-x-0 bottom-0 flex flex-col gap-2 bg-gradient-to-t from-bark-900/80 to-transparent p-4 lg:contents lg:bg-none lg:p-0">
          {HOTSPOTS.map((h, i) => {
            const p = t.points[h.id];
            return (
              <div
                key={h.id}
                style={{ transitionDelay: `${300 + i * 120}ms` }}
                className={cn(
                  "rounded-2xl border border-ivory/15 bg-bark-900/70 p-4 text-ivory backdrop-blur-md transition-all duration-700",
                  "lg:absolute lg:w-60",
                  h.corner,
                  ended
                    ? "translate-y-0 opacity-100"
                    : "translate-y-3 opacity-0",
                )}
              >
                <h3 className="font-serif text-lg">{p.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-sand-100/80">
                  {p.description}
                </p>
                <Link
                  href={`${specBase[h.target]}${h.hash}`}
                  onClick={() =>
                    trackEvent("interior_point_click", { point: h.id })
                  }
                  className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-brass-light transition-colors hover:text-ivory"
                >
                  {t.readMore}
                  <span aria-hidden="true">→</span>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
