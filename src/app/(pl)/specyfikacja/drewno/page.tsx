import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { getDictionary } from "@/lib/i18n";
import { WoodPage } from "@/components/pages/WoodPage";

export function generateMetadata(): Metadata {
  const dict = getDictionary("pl");
  return pageMetadata({
    locale: "pl",
    routeKey: "wood",
    title: dict.woodPage.meta.title,
    description: dict.woodPage.meta.description,
  });
}

export default function Page() {
  return <WoodPage locale="pl" />;
}
