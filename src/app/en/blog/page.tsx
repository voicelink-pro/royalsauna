import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { getDictionary } from "@/lib/i18n";
import { BlogIndexPage } from "@/components/pages/BlogIndexPage";

export function generateMetadata(): Metadata {
  const dict = getDictionary("en");
  return pageMetadata({
    locale: "en",
    routeKey: "blog",
    title: dict.blog.hero.h1,
    description: dict.blog.hero.description,
  });
}

export default function Page() {
  return <BlogIndexPage locale="en" />;
}
