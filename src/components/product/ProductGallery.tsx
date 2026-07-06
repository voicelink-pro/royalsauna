"use client";

import { useState } from "react";
import Image from "next/image";
import type { ProductImage } from "@/types";
import { cn } from "@/lib/utils";

/** Image gallery with a large active image and thumbnail selector. */
export function ProductGallery({
  images,
  videoCaption,
}: {
  images: ProductImage[];
  videoCaption?: string;
}) {
  const [active, setActive] = useState(0);

  return (
    <div>
      <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-sand-100">
        {/* Video-ready slot: replace this Image with a <video> when available. */}
        <Image
          src={images[active].src}
          alt={images[active].alt}
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover"
        />
        {videoCaption && (
          <span className="sr-only">{videoCaption}</span>
        )}
      </div>

      {images.length > 1 && (
        <div className="mt-4 grid grid-cols-4 gap-3">
          {images.map((img, index) => (
            <button
              key={img.src}
              type="button"
              onClick={() => setActive(index)}
              aria-label={img.alt}
              aria-current={index === active}
              className={cn(
                "relative aspect-square overflow-hidden rounded-xl transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brass",
                index === active
                  ? "ring-2 ring-bark-700 ring-offset-2 ring-offset-ivory"
                  : "opacity-70 hover:opacity-100",
              )}
            >
              <Image
                src={img.src}
                alt=""
                fill
                sizes="120px"
                loading="lazy"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
