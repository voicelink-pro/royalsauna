import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { legalContent } from "@/content/legal";
import { LegalPage } from "@/components/pages/LegalPage";

export function generateMetadata(): Metadata {
  const doc = legalContent.cookies.en;
  return pageMetadata({
    locale: "en",
    routeKey: "cookies",
    title: doc.title,
    description: doc.intro,
  });
}

export default function Page() {
  return <LegalPage locale="en" doc="cookies" />;
}
