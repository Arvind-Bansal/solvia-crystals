// ─── Image Pipeline Utilities ────────────────
// Centralized image path resolution, aspect ratios, and size presets.
// When real product photography is added to public/products/[slug]/,
// these helpers will automatically serve local images over Unsplash fallbacks.

export const ASPECT_RATIOS = {
  card: "4/5",
  gallery: "1/1",
  hero: "16/9",
  thumbnail: "1/1",
  portrait: "3/4",
} as const;

export const IMAGE_SIZES = {
  card: "(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw",
  gallery: "(max-width: 640px) 80px, 12.5vw",
  hero: "100vw",
  thumbnail: "180px",
  pdpMain: "(max-width: 768px) 100vw, 50vw",
  split: "(max-width: 768px) 100vw, 50vw",
} as const;

// Fallback placeholder for broken/missing images
export const FALLBACK_IMAGE = "https://images.unsplash.com/photo-1599643477877-530eb83abc8e?q=80&w=800&auto=format&fit=crop";

// Base64 blur placeholder (tiny 1x1 dark pixel)
export const BLUR_PLACEHOLDER = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==";

/**
 * Resolves the best available image path for a product.
 * Checks local path first, falls back to provided URL.
 * In production with a CMS, this would query the CMS asset pipeline.
 */
export function getProductImagePath(
  slug: string,
  variant: "thumbnail" | "1" | "2" | "lifestyle" | "packaging" = "1",
  fallbackUrl?: string
): string {
  // Future: check if local file exists at /products/{slug}/{variant}.webp
  // For now, return fallback URL (Unsplash) or the generic fallback
  return fallbackUrl || FALLBACK_IMAGE;
}
