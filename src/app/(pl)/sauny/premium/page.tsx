import type { Metadata } from "next";
import { productMetadata } from "@/lib/seo";
import { ProductPage } from "@/components/pages/ProductPage";

export function generateMetadata(): Metadata {
  return productMetadata("pl", "premium");
}

export default function Page() {
  return <ProductPage locale="pl" size="premium" />;
}
