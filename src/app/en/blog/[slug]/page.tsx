import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { blogPosts, getPostBySlug } from "@/content/blog";
import { BlogPostPage } from "@/components/pages/BlogPostPage";

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.enSlug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug, "en");
  if (!post) return {};
  const copy = post.i18n.en;
  return buildMetadata({
    title: copy.title,
    description: copy.excerpt,
    locale: "en",
    path: `/en/blog/${post.enSlug}`,
    alternates: {
      pl: `/blog/${post.slug}`,
      en: `/en/blog/${post.enSlug}`,
    },
    image: post.cover.src,
    type: "article",
  });
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return <BlogPostPage locale="en" slug={slug} />;
}
