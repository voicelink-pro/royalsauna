import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { getDictionary } from "@/lib/i18n";
import { SaunasPage } from "@/components/pages/SaunasPage";

export function generateMetadata(): Metadata {
  const dict = getDictionary("pl");
  return pageMetadata({
    locale: "pl",
    routeKey: "saunas",
    title: dict.saunas.hero.h1,
    description: dict.saunas.hero.description,
  });
}

export default function Page() {
  return <SaunasPage locale="pl" />;
}
