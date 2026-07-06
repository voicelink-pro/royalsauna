import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { getDictionary } from "@/lib/i18n";
import { ConfiguratorPage } from "@/components/pages/ConfiguratorPage";

export function generateMetadata(): Metadata {
  const dict = getDictionary("en");
  return pageMetadata({
    locale: "en",
    routeKey: "configurator",
    title: dict.configurator.hero.h1,
    description: dict.configurator.hero.description,
  });
}

export default function Page() {
  return <ConfiguratorPage locale="en" />;
}
