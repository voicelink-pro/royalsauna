"use client";

import { useEffect, useRef, useState } from "react";
import type { Locale } from "@/types";
import type { Dictionary } from "@/lib/i18n";
import { routeMap } from "@/lib/site";
import { trackEvent } from "@/lib/analytics";
import { cn } from "@/lib/utils";
import { CtaButton } from "@/components/ui/CtaButton";
import { Container } from "@/components/ui/Container";
import { Switch } from "@/components/ui/switch";
import { FrameSequenceCanvas } from "@/components/sections/FrameSequenceCanvas";

/** Number of extracted frames in /public/hero-frames (see scripts/extract-hero-frames.sh). */
const FRAME_COUNT = 72;
const framePath = (index: number) =>
  `/hero-frames/frame-${String(index).padStart(4, "0")}.jpg`;

/**
 * Night variant of the same shot, for the day/night toggle. Generated the
 * same way — see `npm run hero:frames:night` in scripts/extract-hero-frames.sh.
 */
const NIGHT_FRAME_COUNT = 73;
const nightFramePath = (index: number) =>
  `/hero-frames-night/frame-${String(index).padStart(4, "0")}.jpg`;

function clamp(value: number, min = 0, max = 1) {
  return Math.min(max, Math.max(min, value));
}

function SunIcon({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
    </svg>
  );
}

function MoonIcon({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M20.5 14.7A8.5 8.5 0 1 1 9.3 3.5a7 7 0 0 0 11.2 11.2z" />
    </svg>
  );
}

/**
 * Scroll-scrubbed hero. A pre-rendered image sequence is painted to a canvas
 * (see FrameSequenceCanvas) and advanced as the user scrolls through a tall,
 * sticky section. This is the Apple-style approach: smooth, frame-accurate and
 * consistent across browsers — unlike seeking a <video>'s currentTime.
 *
 * A day/night toggle crossfades to a second, independently-timed frame
 * sequence of the same shot after dark. The night sequence is mounted lazily
 * (only once the visitor switches to it for the first time) so it never
 * affects the initial page weight; once loaded it stays mounted for instant
 * toggling in both directions for the rest of the visit.
 */
export function HeroVideoScroll({
  locale,
  dict,
  scrollHeightVh = 240,
}: {
  locale: Locale;
  dict: Dictionary;
  scrollHeightVh?: number;
}) {
  const sectionRef = useRef<HTMLElement>(null);
  const [percentage, setPercentage] = useState(0);
  const [firstFrame, setFirstFrame] = useState(false);

  const [isNight, setIsNight] = useState(false);
  const [nightMounted, setNightMounted] = useState(false);
  const [nightReady, setNightReady] = useState(false);

  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const el = sectionRef.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const scrollable = rect.height - window.innerHeight;
        const pct = scrollable > 0 ? clamp(-rect.top / scrollable) : 0;
        setPercentage((prev) =>
          Math.abs(prev - pct) > 0.0005 ? pct : prev,
        );
      });
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  function handleNightToggle(checked: boolean) {
    setIsNight(checked);
    if (checked) setNightMounted(true);
    trackEvent("hero_theme_toggle", { state: checked ? "night" : "day" });
  }

  // Only cross-fade to night once its frames have actually decoded — avoids
  // flashing a blank canvas while the sequence is still loading.
  const showNight = isNight && nightReady;
  const nightLoading = isNight && !nightReady;
  const W = dict.home.hero;

  return (
    <section
      ref={sectionRef}
      className="relative bg-bark-900"
      style={{ height: `${scrollHeightVh}vh` }}
      aria-label={dict.home.hero.h1}
    >
      <div className="sticky top-0 flex h-screen w-full items-center overflow-hidden">
        {/* Poster: instant first paint before frames decode / if JS is slow. */}
        <img
          src={framePath(1)}
          alt=""
          aria-hidden="true"
          className={`absolute inset-0 z-0 h-full w-full object-cover transition-opacity duration-500 ${
            firstFrame ? "opacity-0" : "opacity-100"
          }`}
        />

        {/* Day frame sequence — always mounted. */}
        <div
          className={cn(
            "absolute inset-0 z-[1] transition-opacity duration-700 ease-calm motion-reduce:transition-none",
            showNight ? "opacity-0" : "opacity-100",
          )}
        >
          <FrameSequenceCanvas
            frameCount={FRAME_COUNT}
            framePath={framePath}
            progress={percentage}
            onFirstFrame={() => setFirstFrame(true)}
            className="h-full w-full"
          />
        </div>

        {/* Night frame sequence — mounted lazily on first toggle, then kept alive. */}
        {nightMounted && (
          <div
            className={cn(
              "absolute inset-0 z-[2] transition-opacity duration-700 ease-calm motion-reduce:transition-none",
              showNight ? "opacity-100" : "opacity-0",
            )}
          >
            <FrameSequenceCanvas
              frameCount={NIGHT_FRAME_COUNT}
              framePath={nightFramePath}
              progress={percentage}
              onFirstFrame={() => setNightReady(true)}
              className="h-full w-full"
            />
          </div>
        )}

        {/* Warm gradient overlay for legibility. */}
        <div className="absolute inset-0 z-10 bg-gradient-to-t from-bark-900/75 via-bark-800/35 to-bark-900/35" />

        {/* Day / night toggle — z-30 so it stays above the hero Container's
            full-width hit area on mobile, where the two would otherwise tie
            on z-index and the later-in-DOM Container would win hit-testing. */}
        <div className="absolute right-5 top-24 z-30 sm:right-8">
          <div className="flex items-center gap-2.5 rounded-full border border-ivory/25 bg-bark-900/40 px-3 py-2 backdrop-blur-sm">
            <SunIcon
              className={cn(
                "h-4 w-4 shrink-0 transition-colors duration-500",
                showNight ? "text-ivory/40" : "text-brass",
              )}
            />
            <Switch
              checked={isNight}
              onCheckedChange={handleNightToggle}
              disabled={nightLoading}
              aria-label={isNight ? W.nightToggle.toDay : W.nightToggle.toNight}
              className="data-[state=checked]:bg-bark-900/80 data-[state=unchecked]:bg-ivory/25"
            />
            <MoonIcon
              className={cn(
                "h-4 w-4 shrink-0 transition-colors duration-500",
                showNight ? "text-brass" : "text-ivory/40",
                nightLoading && "animate-pulse text-ivory/70",
              )}
            />
          </div>
        </div>

        <Container className="relative z-20 py-32">
          <div className="max-w-2xl">
            <p className="mb-5 text-xs font-medium uppercase tracking-widest text-sand-200 animate-fade-in">
              {dict.home.hero.eyebrow}
            </p>
            <h1 className="font-serif text-4xl leading-[1.08] text-ivory sm:text-5xl lg:text-6xl animate-fade-up">
              {dict.home.hero.h1}
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-sand-100/90 animate-fade-up">
              {dict.home.hero.subtitle}
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <CtaButton
                href={routeMap.configurator[locale]}
                location="hero"
                variant="primary"
              >
                {dict.home.hero.ctaPrimary}
              </CtaButton>
              <CtaButton
                href={routeMap.saunas[locale]}
                location="hero_secondary"
                variant="secondary"
                className="border-ivory text-ivory hover:bg-ivory hover:text-bark-700"
              >
                {dict.home.hero.ctaSecondary}
              </CtaButton>
            </div>
          </div>
        </Container>

        {/* Scroll cue, fades out as scrubbing begins. */}
        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-8 z-20 flex justify-center transition-opacity duration-500"
          style={{ opacity: clamp(1 - percentage * 6) }}
        >
          <span className="flex h-10 w-6 items-start justify-center rounded-full border border-ivory/50 p-1.5">
            <span className="h-2 w-1 animate-bounce rounded-full bg-ivory/80" />
          </span>
        </div>
      </div>
    </section>
  );
}
