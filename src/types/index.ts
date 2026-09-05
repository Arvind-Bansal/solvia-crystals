// ─── Product ─────────────────────────────────

export interface ProductImages {
  primary: string;
  hover?: string;
  gallery: string[];
}

export interface Product {
  id: string;
  name: string;
  subtitle: string;
  slug: string;
  price: number;
  compareAtPrice?: number;
  rating: number;
  reviewsCount: number;
  description: string;
  meaning: string;
  intention: string;
  style: "Minimal" | "Signature" | "Statement";
  collection: string;
  collectionSlug: string;
  chakra: string;
  zodiac: string[];
  materials: string[];
  careInstructions: string;
  images: ProductImages;
  isBestseller: boolean;
  inStock: boolean;
  relatedProductIds: string[];
  stylingNote?: string;
  sortOrder?: number;
}

// ─── Collection ──────────────────────────────

export interface Collection {
  title: string;
  slug: string;
  description: string;
  heroCopy: string;
  editorialText: string;
  featuredImage: string;
  productSlugs: string[];
}

// ─── Intention ───────────────────────────────

export interface IntentionFAQ {
  question: string;
  answer: string;
}

export interface Intention {
  title: string;
  slug: string;
  description: string;
  heroCopy: string;
  heroImage: string;
  faqs: IntentionFAQ[];
}

// ─── Editorial ───────────────────────────────

export type EditorialBlockType =
  | "quote"
  | "split-image"
  | "full-width"
  | "packaging"
  | "craftsmanship"
  | "lifestyle"
  | "material";

export interface EditorialBlock {
  id: string;
  type: EditorialBlockType;
  title?: string;
  subtitle?: string;
  body: string;
  image?: string;
  imageAlt?: string;
  position?: "left" | "right";
}

// ─── Filters ─────────────────────────────────

export interface FilterDefinition {
  key: string;
  label: string;
  options: string[];
}

// ─── Social Proof ────────────────────────────

export interface InstagramPost {
  id: string;
  image: string;
  caption?: string;
  url: string;
}

export interface CustomerStory {
  id: string;
  name: string;
  quote: string;
  productSlug?: string;
  image?: string;
}

// ─── Ecommerce ───────────────────────────────

export interface Review {
  id: string;
  productId: string;
  authorName: string;
  rating: number;
  content: string;
  createdAt: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
}

// ─── Blog ────────────────────────────────────

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  date: string;
  readTime: string;
  author: string;
  category: string;
  image: string;
}

// ─── SEO ─────────────────────────────────────

export interface SEOProps {
  title?: string;
  description?: string;
  canonicalUrl?: string;
  ogImage?: string;
}
