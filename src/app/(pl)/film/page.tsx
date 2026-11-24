import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { VslFilmPage } from "@/components/pages/VslFilmPage";

export function generateMetadata(): Metadata {
  return buildMetadata({
    locale: "pl",
    path: "/film",
    alternates: { pl: "/film", en: "/en/film" },
    title: "Dlaczego nasze sauny są tak wyjątkowe?",
    description:
      "Krótki film powitalny RoyalSauna. Zobacz, co wyróżnia nasze ogrodowe sauny z linii Regenerum.",
    noindex: true,
  });
}

export default function Page() {
  return <VslFilmPage locale="pl" />;
}
