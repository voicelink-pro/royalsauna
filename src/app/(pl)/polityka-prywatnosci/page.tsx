import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { legalContent } from "@/content/legal";
import { LegalPage } from "@/components/pages/LegalPage";

export function generateMetadata(): Metadata {
  const doc = legalContent.privacy.pl;
  return pageMetadata({
    locale: "pl",
    routeKey: "privacy",
    title: doc.title,
    description: doc.intro,
  });
}

export default function Page() {
  return <LegalPage locale="pl" doc="privacy" />;
}
