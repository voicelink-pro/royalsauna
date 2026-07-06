import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { getDictionary } from "@/lib/i18n";
import { PodlozePage } from "@/components/pages/PodlozePage";

export function generateMetadata(): Metadata {
  const dict = getDictionary("pl");
  return pageMetadata({
    locale: "pl",
    routeKey: "foundation",
    title: dict.podlozePage.meta.title,
    description: dict.podlozePage.meta.description,
  });
}

export default function Page() {
  return <PodlozePage locale="pl" />;
}
