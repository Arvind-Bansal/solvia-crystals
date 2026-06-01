"use client";

import { useEffect } from "react";
import { Product } from "@/types";
import { useRecentStore } from "@/store/useRecentStore";

/**
 * Invisible component that records a product visit to the recently-viewed store.
 * Place this inside any product detail page.
 */
export function TrackRecentView({ product }: { product: Product }) {
  const { addRecent } = useRecentStore();

  useEffect(() => {
    addRecent(product);
  }, [product, addRecent]);

  return null;
}
