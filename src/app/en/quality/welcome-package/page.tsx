import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { getDictionary } from "@/lib/i18n";
import { WelcomePackagePage } from "@/components/pages/WelcomePackagePage";

export function generateMetadata(): Metadata {
  const dict = getDictionary("en");
  return pageMetadata({
    locale: "en",
    routeKey: "welcomePackage",
    title: dict.welcomePackagePage.meta.title,
    description: dict.welcomePackagePage.meta.description,
  });
}

export default function Page() {
  return <WelcomePackagePage locale="en" />;
}
