import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { VslFilmPage } from "@/components/pages/VslFilmPage";

export function generateMetadata(): Metadata {
  return buildMetadata({
    locale: "en",
    path: "/en/film",
    alternates: { pl: "/film", en: "/en/film" },
    title: "What makes our saunas so special?",
    description:
      "A short welcome video from RoyalSauna. Discover what sets our Regenerum garden saunas apart.",
    noindex: true,
  });
}

export default function Page() {
  return <VslFilmPage locale="en" />;
}
