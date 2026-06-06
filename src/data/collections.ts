import { Collection } from '@/types';
import { products } from './products';

export const collections: Collection[] = [
  {
    title: "Everyday Rituals",
    slug: "everyday-rituals",
    description: "Pieces designed to be part of your daily rhythm. Comfortable, versatile, and quietly meaningful — the bracelets you reach for without thinking.",
    heroCopy: "The pieces you reach for every morning.",
    editorialText: "Some jewellery is saved for occasions. These pieces are for the everyday — chosen for their wearability, durability, and the way they settle into your routine. Each stone is selected for its resilience and comfort on the wrist.",
    featuredImage: "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?q=80&w=1200&auto=format&fit=crop",
    productSlugs: ["rose-veil", "midnight-shield", "jade-meridian"],
  },
  {
    title: "Quiet Energy",
    slug: "quiet-energy",
    description: "Understated stones with a calming presence. For moments that call for composure, stillness, and a gentle shift in perspective.",
    heroCopy: "Stillness you can carry with you.",
    editorialText: "Not every piece needs to announce itself. This collection draws from stones traditionally associated with calm and clarity — smoky quartz, aquamarine, sunstone — each chosen for its subtle energy and tonal beauty.",
    featuredImage: "https://images.unsplash.com/photo-1599643477877-530eb83abc8e?q=80&w=1200&auto=format&fit=crop",
    productSlugs: ["smoke-and-stone", "solstice", "stillwater"],
  },
  {
    title: "Grounding Series",
    slug: "grounding-series",
    description: "Bold, protective stones for those who value boundaries. Volcanic glass, metallic lustre, and deep black tones anchor this collection.",
    heroCopy: "Rooted in something solid.",
    editorialText: "The Grounding Series draws from the earth's most protective formations — obsidian forged in volcanic heat, pyrite crystallised under immense pressure. These are pieces that carry weight, both physical and symbolic.",
    featuredImage: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=1200&auto=format&fit=crop",
    productSlugs: ["obsidian-eclipse", "pyrite-monarch"],
  },
  {
    title: "Signature Stones",
    slug: "signature-stones",
    description: "Our most distinctive pieces. Each bracelet features a hero stone with unmistakable character — the kind of piece that becomes part of your identity.",
    heroCopy: "The piece that becomes yours.",
    editorialText: "A signature stone isn't chosen — it chooses you. This collection brings together our most expressive, character-rich pieces: deep amethyst, shifting tiger's eye, luminous citrine. Each one carries a presence you can feel.",
    featuredImage: "https://images.unsplash.com/photo-1596944924616-7b38e7cfac36?q=80&w=1200&auto=format&fit=crop",
    productSlugs: ["violet-hour", "golden-aura", "terra-nova"],
  },
  {
    title: "Minimal Forms",
    slug: "minimal-forms",
    description: "Pared-back design. Clean lines, smaller beads, and single-stone compositions. For those who prefer their jewellery quiet and essential.",
    heroCopy: "Less, with intention.",
    editorialText: "Minimal Forms strips crystal jewellery to its essence — one stone, one cord, one considered accent. These pieces sit close to the wrist, layer seamlessly, and let the natural beauty of the stone speak for itself.",
    featuredImage: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=1200&auto=format&fit=crop",
    productSlugs: ["lunar-clarity"],
  },
];

// ─── Query Helpers ───────────────────────────

export function getAllCollections(): Collection[] {
  return collections;
}

export function getCollectionBySlug(slug: string): Collection | undefined {
  return collections.find(c => c.slug === slug);
}

export function getProductsForCollection(collectionSlug: string) {
  return products.filter(p => p.collectionSlug === collectionSlug);
}
