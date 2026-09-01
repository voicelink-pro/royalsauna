import { heroDesktopFrame, heroMobileDayFrame } from "@/lib/heroFrames";

/**
 * Tells the browser to fetch the LCP poster before it parses the hero markup.
 * Media queries keep mobile from downloading the desktop frame and vice versa.
 */
export function HeroLcpHints() {
  return (
    <>
      <link
        rel="preload"
        as="image"
        href={heroMobileDayFrame(1)}
        type="image/jpeg"
        media="(max-width: 639px)"
        fetchPriority="high"
      />
      <link
        rel="preload"
        as="image"
        href={heroDesktopFrame(1)}
        type="image/webp"
        media="(min-width: 640px)"
        fetchPriority="high"
      />
    </>
  );
}
