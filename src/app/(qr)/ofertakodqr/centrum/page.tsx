import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { getDictionary } from "@/lib/i18n";
import { qrRouteMap } from "@/lib/site";
import { QrOfferPage } from "@/components/pages/QrOfferPage";

export function generateMetadata(): Metadata {
  const dict = getDictionary("pl");
  const paths = qrRouteMap.offerCentrum;
  return buildMetadata({
    locale: "pl",
    path: paths.pl,
    alternates: paths,
    title: dict.qrPages.offer.metaTitle,
    description: dict.qrPages.offer.metaDescription,
    noindex: true,
  });
}

export default function Page() {
  return <QrOfferPage locale="pl" sourceLabel="Centrum Ostaszewo" />;
}
