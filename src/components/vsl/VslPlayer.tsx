"use client";

import { useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface VslPlayerProps {
  src: string;
  playLabel: string;
  durationLabel: string;
  replayLabel: string;
  ariaLabel: string;
}

export function VslPlayer({
  src,
  playLabel,
  durationLabel,
  replayLabel,
  ariaLabel,
}: VslPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [started, setStarted] = useState(false);
  const [ended, setEnded] = useState(false);

  const handlePlay = () => {
    const video = videoRef.current;
    if (!video) return;
    if (ended) {
      video.currentTime = 0;
      setEnded(false);
    }
    setStarted(true);
    video.play().catch(() => {
      setStarted(false);
    });
  };

  return (
    <div className="relative mx-auto w-full max-w-6xl">
      {/* Rounded luxury frame */}
      <div className="relative rounded-[1.75rem] border border-sand-200/20 bg-bark-900/55 p-2 shadow-[0_30px_90px_-20px_rgba(0,0,0,0.55)] sm:rounded-[2.25rem] sm:p-3">
        <div className="relative aspect-video w-full overflow-hidden rounded-[1.25rem] bg-bark-900 ring-1 ring-ivory/10 sm:rounded-[1.6rem]">
          <video
            ref={videoRef}
            src={`${src}#t=0.1`}
            aria-label={ariaLabel}
            controls={started && !ended}
            playsInline
            preload="metadata"
            onPlay={() => {
              setStarted(true);
              setEnded(false);
            }}
            onEnded={() => setEnded(true)}
            className="h-full w-full object-cover"
          />

          {/* Full-screen clickable Play overlay */}
          <button
            type="button"
            onClick={handlePlay}
            aria-label={playLabel}
            tabIndex={started ? -1 : 0}
            aria-hidden={started}
            className={cn(
              "group absolute inset-0 flex cursor-pointer items-center justify-center bg-gradient-to-t from-bark-900/65 via-bark-900/25 to-bark-900/20 transition-opacity duration-500 ease-calm focus-visible:outline-none",
              started ? "pointer-events-none opacity-0" : "opacity-100",
            )}
          >
            <span className="relative flex items-center justify-center">
              <span className="relative flex h-20 w-20 items-center justify-center rounded-full border border-brass/75 bg-bark-900/70 text-ivory shadow-[0_12px_40px_rgba(0,0,0,0.45)] backdrop-blur-md transition-all duration-500 ease-calm group-hover:scale-105 group-hover:border-brass-light group-hover:bg-brass group-hover:text-bark-900 group-focus-visible:ring-2 group-focus-visible:ring-brass sm:h-24 sm:w-24">
                <span
                  aria-hidden="true"
                  className="absolute inset-0 rounded-full border border-brass/40 transition-transform duration-700 ease-calm group-hover:scale-125 group-hover:opacity-0"
                />
                {/* Optical centroid aligned at (12, 12) */}
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="block h-9 w-9 sm:h-10 sm:w-10"
                  aria-hidden="true"
                >
                  <path d="M8.4 5.45v13.1a.9.9 0 0 0 1.37.77l10.6-6.55a.9.9 0 0 0 0-1.54L9.77 4.68a.9.9 0 0 0-1.37.77Z" />
                </svg>
              </span>

              <span className="absolute top-full mt-4 inline-flex items-center gap-2 whitespace-nowrap rounded-full border border-ivory/20 bg-bark-900/65 px-4 py-1.5 text-xs font-medium uppercase tracking-widest text-sand-100 backdrop-blur-md transition-colors duration-300 group-hover:border-brass/60 group-hover:text-ivory">
                <span>{playLabel}</span>
                <span aria-hidden="true" className="text-brass">
                  •
                </span>
                <span className="text-sand-200/80">{durationLabel}</span>
              </span>
            </span>
          </button>

          {/* Full-screen clickable Replay overlay once finished */}
          {ended && (
            <button
              type="button"
              onClick={handlePlay}
              aria-label={replayLabel}
              className="group animate-fade-in absolute inset-0 flex cursor-pointer items-center justify-center bg-bark-900/70 backdrop-blur-sm focus-visible:outline-none"
            >
              <span className="inline-flex items-center gap-3 rounded-full border border-brass/70 bg-bark-800/90 px-6 py-3.5 text-sm font-medium tracking-wide text-ivory transition-all duration-300 group-hover:border-brass-light group-hover:bg-brass group-hover:text-bark-900 group-focus-visible:ring-2 group-focus-visible:ring-brass">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  className="h-4 w-4 transition-transform duration-500 group-hover:-rotate-90"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 12a9 9 0 1 0 3-6.7L3 8m0-5v5h5"
                  />
                </svg>
                {replayLabel}
              </span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
