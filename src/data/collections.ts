import { Collection } from '@/types';
import { products } from './products';

export const collections: Collection[] = [
  {
    title: "Everyday Rituals",
    slug: "everyday-rituals",
    description: "Pieces designed to be part of your daily rhythm. Comfortable, versatile, and quietly meaningful — the bracelets you reach for without thinking.",
    heroCopy: "The pieces you reach for every morning.",
    editorialText: "Every Solvia piece begins with the stone. Eight hand-selected natural crystals, chosen for their wearability, character, and quiet presence. Assembled by hand with natural stone and durable hardware.",
    featuredImage: "/products/conviction/primary.webp",
    productSlugs: [
      "conviction",
      "affinity",
      "prospect",
      "stronghold",
      "late-harvest",
      "fortune",
      "violet-hour",
      "sightline",
    ],
  },
];

// ─── Legacy Collection Stubs ─────────────────
// These preserve route compatibility for bookmarked URLs.
// They are not exposed in navigation or filters.
// Their productSlugs are empty — pages can gracefully handle them.

export const legacyCollections: Collection[] = [
  {
    title: "Launch 01",
    slug: "launch-01",
    description: "This collection page is now part of Everyday Rituals.",
    heroCopy: "Collection updated.",
    editorialText: "",
    featuredImage: "",
    productSlugs: [],
  },
  {
    title: "Quiet Energy",
    slug: "quiet-energy",
    description: "This collection has been retired. Explore Everyday Rituals.",
    heroCopy: "Collection retired.",
    editorialText: "",
    featuredImage: "",
    productSlugs: [],
  },
  {
    title: "Grounding Series",
    slug: "grounding-series",
    description: "This collection has been retired. Explore Everyday Rituals.",
    heroCopy: "Collection retired.",
    editorialText: "",
    featuredImage: "",
    productSlugs: [],
  },
  {
    title: "Signature Stones",
    slug: "signature-stones",
    description: "This collection has been retired. Explore Everyday Rituals.",
    heroCopy: "Collection retired.",
    editorialText: "",
    featuredImage: "",
    productSlugs: [],
  },
  {
    title: "Minimal Forms",
    slug: "minimal-forms",
    description: "This collection has been retired. Explore Everyday Rituals.",
    heroCopy: "Collection retired.",
    editorialText: "",
    featuredImage: "",
    productSlugs: [],
  },
];

// Combine active + legacy for route resolution
const allCollections = [...collections, ...legacyCollections];

// ─── Query Helpers ───────────────────────────

export function getAllCollections(): Collection[] {
  // Only return active collections for navigation/listing
  return collections;
}

export function getCollectionBySlug(slug: string): Collection | undefined {
  // Searches both active and legacy for URL compatibility
  return allCollections.find(c => c.slug === slug);
}

export function getProductsForCollection(collectionSlug: string) {
  return products.filter(p => p.collectionSlug === collectionSlug);
}
