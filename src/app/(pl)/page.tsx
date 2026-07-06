import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { getDictionary } from "@/lib/i18n";
import { HomePage } from "@/components/pages/HomePage";

export function generateMetadata(): Metadata {
  const dict = getDictionary("pl");
  return buildMetadata({
    title: "RoyalSauna — prywatne domowe spa w Twoim ogrodzie",
    description: dict.home.hero.subtitle,
    locale: "pl",
    path: "/",
    alternates: { pl: "/", en: "/en" },
  });
}

export default function Page() {
  return <HomePage locale="pl" />;
}
