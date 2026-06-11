"use client";

import { useEffect } from "react";
import { Product } from "@/types";
import { useRecentStore } from "@/store/useRecentStore";
import { analytics } from "@/lib/analytics";

/**
 * Invisible component that records a product visit to the recently-viewed store.
 * Place this inside any product detail page.
 */
export function TrackRecentView({ product }: { product: Product }) {
  const { addRecent } = useRecentStore();

  useEffect(() => {
    addRecent(product);
    analytics.track({ name: "view_item", properties: { productId: product.id, name: product.name, price: product.price } });
  }, [product, addRecent]);

  return null;
}
