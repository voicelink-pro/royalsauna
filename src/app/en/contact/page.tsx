import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { getDictionary } from "@/lib/i18n";
import { ContactPage } from "@/components/pages/ContactPage";

export function generateMetadata(): Metadata {
  const dict = getDictionary("en");
  return pageMetadata({
    locale: "en",
    routeKey: "contact",
    title: dict.contact.hero.h1,
    description: dict.contact.hero.description,
  });
}

export default function Page() {
  return <ContactPage locale="en" />;
}
