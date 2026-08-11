import Image from "next/image";
import type { Locale } from "@/types";
import { welcomePackageItems } from "@/content/welcomePackage";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";

export interface WelcomePackageItemCopy {
  title: string;
  /** Opening paragraphs above an optional list. */
  paragraphs: string[];
  listLabel: string;
  list: string[];
  /** Closing paragraph below the list. */
  closing: string;
}

function hasCopy(copy: WelcomePackageItemCopy) {
  return (
    copy.paragraphs.some(Boolean) ||
    copy.list.length > 0 ||
    Boolean(copy.closing)
  );
}

/**
 * Ultra-premium editorial catalogue of welcome-package accessories:
 * numbered entries, generous whitespace, alternating photography —
 * no card chrome, just form and light.
 */
export function WelcomePackageShowcase({
  locale,
  items,
}: {
  locale: Locale;
  items: Record<string, WelcomePackageItemCopy>;
}) {
  return (
    <div className="mt-12 space-y-14 lg:mt-16 lg:space-y-20">
      {welcomePackageItems.map((item, index) => {
        const copy = items[item.id];
        if (!copy) return null;
        const imageRight = index % 2 === 1;
        const number = String(index + 1).padStart(2, "0");
        const rich = hasCopy(copy);

        return (
          <Reveal key={item.id} delay={Math.min(index * 60, 240)}>
            <article
              className={cn(
                "grid items-center gap-6 lg:grid-cols-12 lg:gap-10 xl:gap-12",
              )}
            >
              <div
                className={cn(
                  "relative lg:col-span-7",
                  imageRight && "lg:order-2",
                )}
              >
                {item.frame === "tall" ? (
                  <div className="overflow-hidden rounded-2xl">
                    <Image
                      src={item.image}
                      alt={item.alt[locale]}
                      width={1200}
                      height={1600}
                      sizes="(max-width: 1024px) 100vw, 58vw"
                      className="h-auto w-full rounded-2xl transition-transform duration-[1.4s] ease-calm hover:scale-[1.03]"
                    />
                  </div>
                ) : (
                  <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
                    <Image
                      src={item.image}
                      alt={item.alt[locale]}
                      fill
                      sizes="(max-width: 1024px) 100vw, 58vw"
                      className="object-cover transition-transform duration-[1.4s] ease-calm hover:scale-[1.03]"
                    />
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-0 bg-gradient-to-t from-bark-900/15 via-transparent to-transparent"
                    />
                  </div>
                )}
              </div>

              <div
                className={cn(
                  "lg:col-span-5",
                  imageRight && "lg:order-1",
                  !rich && imageRight && "lg:text-right lg:flex lg:flex-col lg:items-end",
                )}
              >
                <p
                  className={cn(
                    "font-serif text-xs tracking-[0.35em] text-brass",
                    !rich && imageRight && "lg:text-right",
                  )}
                >
                  {number}
                </p>
                <div
                  aria-hidden="true"
                  className={cn(
                    "my-3 h-px w-10 bg-brass/50",
                    !rich && imageRight && "lg:ml-auto",
                  )}
                />
                <h3 className="font-serif text-2xl leading-tight text-bark-700 sm:text-3xl lg:text-[2.15rem]">
                  {copy.title}
                </h3>

                {rich ? (
                  <div className="mt-5 max-w-md space-y-4 text-base leading-relaxed text-bark-500">
                    {copy.paragraphs.filter(Boolean).map((paragraph) => (
                      <p key={paragraph.slice(0, 48)}>{paragraph}</p>
                    ))}
                    {copy.list.length > 0 ? (
                      <div>
                        {copy.listLabel ? (
                          <p className="mb-2 font-medium text-bark-600">
                            {copy.listLabel}
                          </p>
                        ) : null}
                        <ul className="space-y-1.5 border-l border-brass/40 pl-4">
                          {copy.list.map((entry) => (
                            <li key={entry}>{entry}</li>
                          ))}
                        </ul>
                      </div>
                    ) : null}
                    {copy.closing ? <p>{copy.closing}</p> : null}
                  </div>
                ) : null}
              </div>
            </article>
          </Reveal>
        );
      })}
    </div>
  );
}
