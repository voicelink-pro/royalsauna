import type { Metadata } from "next";
import { productMetadata } from "@/lib/seo";
import { ProductPage } from "@/components/pages/ProductPage";

export function generateMetadata(): Metadata {
  return productMetadata("en", "premium");
}

export default function Page() {
  return <ProductPage locale="en" size="premium" />;
}
