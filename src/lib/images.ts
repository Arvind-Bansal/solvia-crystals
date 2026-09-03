// ─── Image Pipeline Utilities ────────────────
// Centralized image path resolution, aspect ratios, and size presets.
// Product images are expected at: public/products/{slug}/{variant}.webp
// Until real photography is placed in these directories, components should
// render a clearly temporary placeholder — NOT a generic stock photo
// that could be mistaken for actual product photography.

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

// Neutral placeholder for missing product images.
// This is an intentionally generic image — NOT a product photograph.
// Components displaying product images should make it visually obvious
// when a product is using this fallback rather than real photography.
export const FALLBACK_IMAGE = "https://images.unsplash.com/photo-1599643477877-530eb83abc8e?q=80&w=800&auto=format&fit=crop";

// Base64 blur placeholder (tiny 1x1 dark pixel)
export const BLUR_PLACEHOLDER = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==";

/**
 * Resolves the best available image path for a product.
 * Returns the provided URL if given, otherwise returns the generic fallback.
 *
 * IMPORTANT: The fallback is a temporary development placeholder, not a
 * product photograph. Real product photography must be placed at:
 *   public/products/{slug}/primary.webp
 *   public/products/{slug}/hover.webp
 *   public/products/{slug}/gallery-01.webp
 *   public/products/{slug}/gallery-02.webp
 *   public/products/{slug}/gallery-03.webp
 */
export function getProductImagePath(
  slug: string,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _variant: "thumbnail" | "1" | "2" | "lifestyle" | "packaging" = "1",
  fallbackUrl?: string
): string {
  // Future: check if local file exists at /products/{slug}/{variant}.webp
  // For now, return fallback URL or the generic fallback
  return fallbackUrl || FALLBACK_IMAGE;
}
