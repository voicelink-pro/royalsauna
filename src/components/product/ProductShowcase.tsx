import Image from "next/image";
import type { ProductImage } from "@/types";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";

/**
 * Editorial image + text band used on product pages. The image can sit on the
 * left or right, with a soft framed presentation for a premium feel.
 */
export function ProductShowcase({
  image,
  eyebrow,
  title,
  description,
  imageSide = "left",
  children,
  priority = false,
  imagePosition,
  imageZoom,
}: {
  image: ProductImage;
  eyebrow: string;
  title: string;
  description?: string;
  imageSide?: "left" | "right";
  children?: React.ReactNode;
  priority?: boolean;
  /** CSS `object-position` value, e.g. "38% 50%", to re-centre a cropped image. */
  imagePosition?: string;
  /** Scale factor (< 1 zooms out, revealing more breathing room around the subject). */
  imageZoom?: number;
}) {
  return (
    <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
      <Reveal
        className={cn(
          imageSide === "right" ? "lg:order-2" : "lg:order-1",
        )}
      >
        <div
          className={cn(
            "relative aspect-[4/5] overflow-hidden rounded-3xl shadow-soft sm:aspect-[4/3] lg:aspect-[4/5]",
            imageZoom && imageZoom < 1 && "bg-white",
          )}
        >
          <Image
            src={image.src}
            alt={image.alt}
            fill
            priority={priority}
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
            style={{
              objectPosition: imagePosition,
              transform: imageZoom ? `scale(${imageZoom})` : undefined,
            }}
          />
        </div>
      </Reveal>

      <Reveal
        delay={120}
        className={cn(imageSide === "right" ? "lg:order-1" : "lg:order-2")}
      >
        <p className="mb-3 text-xs font-medium uppercase tracking-widest text-clay-500">
          {eyebrow}
        </p>
        <h2 className="font-serif text-3xl leading-tight text-bark-700 sm:text-4xl">
          {title}
        </h2>
        {description && (
          <p className="mt-5 text-lg leading-relaxed text-bark-500">
            {description}
          </p>
        )}
        {children}
      </Reveal>
    </div>
  );
}
