import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { getDictionary } from "@/lib/i18n";
import { HomePage } from "@/components/pages/HomePage";

export function generateMetadata(): Metadata {
  const dict = getDictionary("en");
  return buildMetadata({
    title: "RoyalSauna – your private home spa in the garden",
    description: dict.home.hero.subtitle,
    locale: "en",
    path: "/en",
    alternates: { pl: "/", en: "/en" },
  });
}

export default function Page() {
  return <HomePage locale="en" />;
}
