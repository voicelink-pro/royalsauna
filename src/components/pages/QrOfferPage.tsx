import Link from "next/link";
import type { Locale } from "@/types";
import { getDictionary } from "@/lib/i18n";
import { qrRouteMap } from "@/lib/site";
import { QrShell } from "@/components/layout/QrShell";
import { LeadForm } from "@/components/forms/LeadForm";
import { ContactLink } from "@/components/ui/ContactLink";

export function QrOfferPage({
  locale,
  sourceLabel,
}: {
  locale: Locale;
  sourceLabel?: string;
}) {
  const dict = getDictionary(locale);
  const copy = dict.qrPages.offer;

  return (
    <QrShell locale={locale} dict={dict}>
      <div className="mx-auto max-w-lg px-4 pb-16 pt-8 sm:px-6">
        <p className="text-xs font-medium uppercase tracking-[0.25em] text-clay-500">
          {copy.eyebrow}
        </p>
        <h1 className="mt-3 font-serif text-3xl leading-tight text-bark-700 sm:text-4xl">
          {copy.title}
        </h1>
        <p className="mt-4 text-base leading-relaxed text-bark-500">
          {copy.description}
        </p>

        <p className="mt-5 text-sm text-bark-500">
          <ContactLink
            type="phone"
            href={dict.brand.phoneHref}
            location="qr_offer"
            className="font-medium text-bark-700 underline-offset-4 hover:text-clay-600 hover:underline"
          >
            {dict.brand.phone}
          </ContactLink>
        </p>

        <div className="mt-8 rounded-2xl border border-sand-200 bg-ivory p-5 shadow-card sm:p-7">
          <h2 className="mb-5 font-serif text-xl text-bark-700">
            {copy.formTitle}
          </h2>
          <LeadForm
            locale={locale}
            dict={dict}
            formLocation={sourceLabel ? "qr_centrum_ostaszewo" : "qr_garden_center"}
            compact
            sourceLabel={sourceLabel}
            attributionOverride={{
              utm_source: sourceLabel ? "centrum-ostaszewo" : "centrum-ogrodnicze",
              utm_medium: "qr",
              utm_campaign: "sauna-ekspozycja",
              utm_content: sourceLabel ? "ofertakodqr-centrum" : "ofertakodqr",
            }}
          />
        </div>

        <p className="mt-8 text-center">
          <Link
            href={qrRouteMap.welcomePackage[locale]}
            className="text-sm font-medium text-clay-600 underline-offset-4 hover:underline"
          >
            {copy.packageLink} →
          </Link>
        </p>
      </div>
    </QrShell>
  );
}
