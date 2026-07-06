import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { getDictionary } from "@/lib/i18n";
import { HeatersPage } from "@/components/pages/HeatersPage";

export function generateMetadata(): Metadata {
  const dict = getDictionary("en");
  return pageMetadata({
    locale: "en",
    routeKey: "heaters",
    title: dict.heatersPage.hero.h1,
    description: dict.heatersPage.hero.description,
  });
}

export default function Page() {
  return <HeatersPage locale="en" />;
}
