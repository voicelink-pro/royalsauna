import Image from "next/image";
import type { Locale } from "@/types";
import { getDictionary } from "@/lib/i18n";
import { qrRouteMap } from "@/lib/site";
import { welcomePackageItems } from "@/content/welcomePackage";
import { QrShell } from "@/components/layout/QrShell";
import { CtaButton } from "@/components/ui/CtaButton";

/**
 * Mobile-first, single-scroll welcome-package landing for physical QR codes.
 */
export function QrWelcomePackagePage({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  const copy = dict.qrPages.welcomePackage;
  const itemCopy = copy.items;
  const fullItems = dict.welcomePackagePage.showcase.items;

  return (
    <QrShell locale={locale} dict={dict}>
      <div className="mx-auto max-w-lg px-4 pb-28 pt-8 sm:px-6">
        <p className="text-xs font-medium uppercase tracking-[0.25em] text-clay-500">
          {copy.eyebrow}
        </p>
        <h1 className="mt-3 font-serif text-3xl leading-tight text-bark-700 sm:text-4xl">
          {copy.title}
        </h1>
        <p className="mt-4 text-base leading-relaxed text-bark-500">
          {copy.description}
        </p>

        <ul className="mt-10 space-y-8">
          {welcomePackageItems.map((item, index) => {
            const title = fullItems[item.id]?.title ?? item.alt[locale];
            const blurb = itemCopy[item.id as keyof typeof itemCopy];
            const number = String(index + 1).padStart(2, "0");

            return (
              <li key={item.id} className="space-y-3">
                <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-sand-200">
                  <Image
                    src={item.image}
                    alt={item.alt[locale]}
                    fill
                    sizes="(max-width: 640px) 100vw, 512px"
                    className={
                      item.frame === "tall"
                        ? "object-contain object-center"
                        : "object-cover"
                    }
                  />
                </div>
                <div className="flex items-baseline gap-3">
                  <span className="font-serif text-xs tracking-[0.3em] text-brass">
                    {number}
                  </span>
                  <h2 className="font-serif text-xl text-bark-700">{title}</h2>
                </div>
                <p className="text-sm leading-relaxed text-bark-500">{blurb}</p>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="fixed inset-x-0 bottom-0 z-20 border-t border-sand-200 bg-sand-100/95 px-4 py-3 backdrop-blur sm:px-6">
        <div className="mx-auto max-w-lg">
          <CtaButton
            href={qrRouteMap.offer[locale]}
            location="qr_welcome_package"
            variant="primary"
            className="w-full justify-center py-3.5"
          >
            {copy.offerCta}
          </CtaButton>
        </div>
      </div>
    </QrShell>
  );
}
