import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { getDictionary } from "@/lib/i18n";
import { qrRouteMap } from "@/lib/site";
import { QrWelcomePackagePage } from "@/components/pages/QrWelcomePackagePage";

export function generateMetadata(): Metadata {
  const dict = getDictionary("pl");
  const paths = qrRouteMap.welcomePackage;
  return buildMetadata({
    locale: "pl",
    path: paths.pl,
    alternates: paths,
    title: dict.qrPages.welcomePackage.metaTitle,
    description: dict.qrPages.welcomePackage.metaDescription,
    noindex: true,
  });
}

export default function Page() {
  return <QrWelcomePackagePage locale="pl" />;
}
