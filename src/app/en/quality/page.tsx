import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { getDictionary } from "@/lib/i18n";
import { QualityPage } from "@/components/pages/QualityPage";

export function generateMetadata(): Metadata {
  const dict = getDictionary("en");
  return pageMetadata({
    locale: "en",
    routeKey: "quality",
    title: dict.quality.hero.h1,
    description: dict.quality.hero.description,
  });
}

export default function Page() {
  return <QualityPage locale="en" />;
}
