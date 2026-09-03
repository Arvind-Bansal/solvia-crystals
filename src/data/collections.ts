import { Collection } from '@/types';
import { products } from './products';

export const collections: Collection[] = [
  {
    title: "Launch 01",
    slug: "launch-01",
    description: "The inaugural Solvia collection. Eight stones, chosen for their character, wearability, and the way they carry meaning without making claims.",
    heroCopy: "Where it begins.",
    editorialText: "Launch 01 is our opening statement — a curated set of eight crystal bracelets, each built around a single stone with unmistakable presence. From the warm chatoyancy of Tiger Eye to the quiet clarity of Clear Quartz, every piece is designed to be worn daily, styled freely, and valued for what it is: considered craftsmanship with natural stone.",
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
// Their productSlugs are empty — pages can gracefully show "collection unavailable" or redirect.

export const legacyCollections: Collection[] = [
  {
    title: "Everyday Rituals",
    slug: "everyday-rituals",
    description: "This collection has been retired. Explore our Launch 01 collection.",
    heroCopy: "Collection retired.",
    editorialText: "",
    featuredImage: "",
    productSlugs: [],
  },
  {
    title: "Quiet Energy",
    slug: "quiet-energy",
    description: "This collection has been retired. Explore our Launch 01 collection.",
    heroCopy: "Collection retired.",
    editorialText: "",
    featuredImage: "",
    productSlugs: [],
  },
  {
    title: "Grounding Series",
    slug: "grounding-series",
    description: "This collection has been retired. Explore our Launch 01 collection.",
    heroCopy: "Collection retired.",
    editorialText: "",
    featuredImage: "",
    productSlugs: [],
  },
  {
    title: "Signature Stones",
    slug: "signature-stones",
    description: "This collection has been retired. Explore our Launch 01 collection.",
    heroCopy: "Collection retired.",
    editorialText: "",
    featuredImage: "",
    productSlugs: [],
  },
  {
    title: "Minimal Forms",
    slug: "minimal-forms",
    description: "This collection has been retired. Explore our Launch 01 collection.",
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
