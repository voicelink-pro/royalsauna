"use client";

import { useEffect } from "react";
import type { SaunaSize } from "@/types";
import { trackEvent } from "@/lib/analytics";

/** Fires a `product_view` event once when a product page mounts. */
export function ProductViewTracker({
  model,
  name,
  price,
}: {
  model: SaunaSize;
  name: string;
  price: number;
}) {
  useEffect(() => {
    trackEvent("product_view", {
      model,
      product_name: name,
      price,
      currency: "PLN",
    });
  }, [model, name, price]);

  return null;
}
