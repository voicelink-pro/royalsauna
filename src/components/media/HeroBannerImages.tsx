"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { blurDark } from "@/lib/images";
import { cn } from "@/lib/utils";

/**
 * Full-bleed hero photo. After the viewport is known, only the matching crop
 * stays mounted — so mobile never downloads the desktop file and vice versa.
 * `priority` is set on that one image only.
 */
export function HeroBannerImages({
  image,
  mobileImage,
  alt,
}: {
  image: string;
  mobileImage?: string;
  alt: string;
}) {
  const [isMobile, setIsMobile] = useState<boolean | null>(null);

  useEffect(() => {
    const media = window.matchMedia("(max-width: 639px)");
    const update = () => setIsMobile(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  const showMobile = Boolean(mobileImage) && isMobile !== false;
  const showDesktop = !mobileImage || isMobile !== true;
  const mobilePriority = Boolean(mobileImage) && isMobile === true;
  const desktopPriority = mobileImage ? isMobile === false : true;

  return (
    <>
      {showMobile && mobileImage && (
        <Image
          src={mobileImage}
          alt={alt}
          fill
          priority={mobilePriority}
          sizes="100vw"
          className={cn(
            "animate-zoom-slow object-cover",
            isMobile === null && "sm:hidden",
          )}
          {...blurDark}
        />
      )}
      {showDesktop && (
        <Image
          src={image}
          alt={alt}
          fill
          priority={desktopPriority}
          sizes="100vw"
          className={cn(
            "animate-zoom-slow object-cover",
            mobileImage && isMobile === null && "hidden sm:block",
          )}
          {...blurDark}
        />
      )}
    </>
  );
}
