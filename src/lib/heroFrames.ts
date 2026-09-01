/** Extracted hero frame sequences used by the scroll-scrubbed homepage hero. */

export const HERO_DESKTOP_FRAME_COUNT = 72;
export const HERO_MOBILE_DAY_FRAME_COUNT = 73;
export const HERO_NIGHT_FRAME_COUNT = 73;

const pad = (index: number) => String(index).padStart(4, "0");

export const heroDesktopFrame = (index: number) =>
  `/hero-frames/frame-${pad(index)}.webp`;

export const heroMobileDayFrame = (index: number) =>
  `/hero-frames-mobile-day/frame-${pad(index)}.jpg`;

export const heroNightFrame = (index: number) =>
  `/hero-frames-night/frame-${pad(index)}.webp`;
