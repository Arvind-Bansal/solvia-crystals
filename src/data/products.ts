import { Product } from '@/types';

// ─── Launch 1 Catalogue ─────────────────────
// 8 finalized products. Real product photography pending.
// Image paths reference local directories under public/products/{slug}/.
// Until real images are placed, components handle missing images gracefully
// via the FALLBACK_IMAGE in lib/images.ts.
//
// Fields marked "TODO" require real product specifications before launch.

function localImages(slug: string): Product['images'] {
  return {
    primary: `/products/${slug}/primary.webp`,
    hover: `/products/${slug}/hover.webp`,
    gallery: [
      `/products/${slug}/primary.webp`,
      `/products/${slug}/gallery-01.webp`,
      `/products/${slug}/gallery-02.webp`,
      `/products/${slug}/gallery-03.webp`,
    ],
  };
}

export const products: Product[] = [
  {
    id: "prod_001",
    name: "Violet Hour",
    subtitle: "Amethyst Bracelet",
    slug: "violet-hour",
    price: 799,
    rating: 0,
    reviewsCount: 0,
    description: "A study in restraint and depth. Grade AAA Amethyst beads create a piece that feels as considered as it is beautiful. Worn alone or layered, Violet Hour brings a quiet sense of composure to everything it touches.",
    meaning: "Amethyst has been valued since antiquity for its deep violet hue and its long association with composure, intuition, and clear thinking.",
    intention: "Clarity",
    style: "Signature",
    collection: "Everyday Rituals",
    collectionSlug: "everyday-rituals",
    chakra: "TODO",
    zodiac: [],
    materials: ["TODO — Bead size, cord type, and hardware to be confirmed"],
    careInstructions: "Avoid prolonged direct sunlight to preserve the natural colour depth. Wipe gently with a soft cloth after wear.",
    images: localImages("violet-hour"),
    isBestseller: false,
    inStock: true,
    relatedProductIds: ["prod_006", "prod_002"],
    stylingNote: "Violet Hour pairs beautifully with neutral tones — think charcoal, ivory, and soft grey. Wear solo as a quiet statement or layer with Sightline for a tonal composition.",
  },
  {
    id: "prod_002",
    name: "Affinity",
    subtitle: "Rose Quartz Bracelet",
    slug: "affinity",
    price: 699,
    rating: 0,
    reviewsCount: 0,
    description: "Soft, deliberate, and unmistakably elegant. Hand-selected Rose Quartz gives this piece its gentle warmth — a bracelet that feels personal from the moment you put it on.",
    meaning: "Rose Quartz is widely regarded as a stone of emotional openness. Its soft pink hue has long symbolised tenderness, self-compassion, and quiet warmth.",
    intention: "Love",
    style: "Signature",
    collection: "Everyday Rituals",
    collectionSlug: "everyday-rituals",
    chakra: "TODO",
    zodiac: [],
    materials: ["TODO — Bead size, cord type, and hardware to be confirmed"],
    careInstructions: "Avoid contact with perfume and harsh chemicals. Store in the provided pouch when not worn.",
    images: localImages("affinity"),
    isBestseller: false,
    inStock: true,
    relatedProductIds: ["prod_001", "prod_004"],
    stylingNote: "Affinity is one of our most versatile pieces. Pair with warmer stones like Citrine for a sun-drenched stack, or wear alone against bare skin.",
  },
  {
    id: "prod_012",
    name: "Prospect",
    subtitle: "Pyrite Bracelet",
    slug: "prospect",
    price: 799,
    rating: 0,
    reviewsCount: 0,
    description: "Unapologetically bold. Pyrite's metallic lustre and angular crystalline structure make it one of the most visually striking stones in any collection. A bracelet that commands attention without saying a word.",
    meaning: "Often called 'Fool's Gold', Pyrite has been carried by merchants and leaders as a symbol of ambition, action, and determination.",
    intention: "Wealth",
    style: "Statement",
    collection: "Everyday Rituals",
    collectionSlug: "everyday-rituals",
    chakra: "TODO",
    zodiac: [],
    materials: ["TODO — Bead size, cord type, and hardware to be confirmed"],
    careInstructions: "Pyrite can oxidise over time if exposed to moisture. Store in the included pouch and avoid contact with water.",
    images: localImages("prospect"),
    isBestseller: false,
    inStock: true,
    relatedProductIds: ["prod_004", "prod_008"],
    stylingNote: "Prospect is a statement piece — let it breathe. Wear alone or with one minimal companion. Its metallic lustre provides its own layering depth.",
  },
  {
    id: "prod_005",
    name: "Stronghold",
    subtitle: "Black Tourmaline Bracelet",
    slug: "stronghold",
    price: 799,
    rating: 0,
    reviewsCount: 0,
    description: "Understated presence, refined to its essence. Black Tourmaline beads create a bracelet that looks as good layered as it does alone. A daily essential for those who value their boundaries.",
    meaning: "Black Tourmaline is one of the most valued protective stones in traditional practice. It is associated with grounding, composure, and a sense of personal sovereignty.",
    intention: "Protection",
    style: "Minimal",
    collection: "Everyday Rituals",
    collectionSlug: "everyday-rituals",
    chakra: "TODO",
    zodiac: [],
    materials: ["TODO — Bead size, cord type, and hardware to be confirmed"],
    careInstructions: "Tourmaline is naturally durable. Wipe with a dry cloth to maintain its matte finish.",
    images: localImages("stronghold"),
    isBestseller: false,
    inStock: true,
    relatedProductIds: ["prod_001", "prod_008"],
    stylingNote: "A perfect everyday piece. Stronghold's minimal profile sits close to the wrist and layers effortlessly with almost any other bracelet in the collection.",
  },
  {
    id: "prod_004",
    name: "Late Harvest",
    subtitle: "Citrine Bracelet",
    slug: "late-harvest",
    price: 899,
    rating: 0,
    reviewsCount: 0,
    description: "Warm, luminous, and effortlessly wearable. Natural Citrine catches every shift of light, creating a piece that feels alive on the wrist. Late Harvest is for those drawn to warmth — in colour, in energy, and in ambition.",
    meaning: "Known historically as the Merchant's Stone, Citrine has been carried by traders and entrepreneurs for centuries as a symbol of prosperity, optimism, and creative drive.",
    intention: "Wealth",
    style: "Signature",
    collection: "Everyday Rituals",
    collectionSlug: "everyday-rituals",
    chakra: "TODO",
    zodiac: [],
    materials: ["TODO — Bead size, cord type, and hardware to be confirmed"],
    careInstructions: "Citrine is light-sensitive — store away from direct sunlight to maintain its natural golden warmth.",
    images: localImages("late-harvest"),
    isBestseller: false,
    inStock: true,
    relatedProductIds: ["prod_012", "prod_013"],
    stylingNote: "Late Harvest's warm tones work best against deep colours — navy, forest green, black. Layer with Conviction for a rich, amber-toned composition.",
  },
  {
    id: "prod_013",
    name: "Fortune",
    subtitle: "Green Aventurine Bracelet",
    slug: "fortune",
    price: 699,
    rating: 0,
    reviewsCount: 0,
    description: "Steady, grounded, and quietly assured. Green Aventurine's soft verdant tone carries a natural calm — a bracelet that feels rooted in something older and more enduring than trends.",
    meaning: "Green Aventurine has been valued across cultures as a stone of opportunity and optimism. Its gentle green hue is traditionally associated with growth, perseverance, and quiet prosperity.",
    intention: "Wealth",
    style: "Minimal",
    collection: "Everyday Rituals",
    collectionSlug: "everyday-rituals",
    chakra: "TODO",
    zodiac: [],
    materials: ["TODO — Bead size, cord type, and hardware to be confirmed"],
    careInstructions: "Green Aventurine is naturally durable. Clean with warm water and a soft cloth.",
    images: localImages("fortune"),
    isBestseller: false,
    inStock: true,
    relatedProductIds: ["prod_004", "prod_012"],
    stylingNote: "Fortune is a versatile layering piece. Its green tones work with almost any colour palette — pair with Stronghold for an earthy stack or Sightline for a cool contrast.",
  },
  {
    id: "prod_008",
    name: "Conviction",
    subtitle: "Tiger Eye Bracelet",
    slug: "conviction",
    price: 699,
    rating: 0,
    reviewsCount: 0,
    description: "Confident, warm, and impossible to ignore. Tiger Eye shifts between amber, bronze, and deep gold as it catches the light — a natural phenomenon called chatoyancy. Conviction is designed for those who lead, not follow.",
    meaning: "Tiger Eye has been worn as a stone of courage and self-assurance since the Roman era. Its shifting bands of colour symbolise adaptability, focus, and quiet personal power.",
    intention: "Confidence",
    style: "Signature",
    collection: "Everyday Rituals",
    collectionSlug: "everyday-rituals",
    chakra: "TODO",
    zodiac: [],
    materials: ["TODO — Bead size, cord type, and hardware to be confirmed"],
    careInstructions: "Tiger Eye is naturally resilient. Clean with a damp cloth. Avoid ultrasonic cleaners.",
    images: localImages("conviction"),
    isBestseller: false,
    inStock: true,
    relatedProductIds: ["prod_005", "prod_004"],
    stylingNote: "Conviction makes a statement on its own but truly shines layered with earthy companions. Try pairing with Fortune or Late Harvest for a grounded, confident stack.",
  },
  {
    id: "prod_006",
    name: "Sightline",
    subtitle: "Clear Quartz Bracelet",
    slug: "sightline",
    price: 699,
    rating: 0,
    reviewsCount: 0,
    description: "Pure, minimal, and quietly magnetic. Clear Quartz — sometimes called the 'master stone' — is a piece you reach for when you need to think clearly.",
    meaning: "Clear Quartz has been valued across cultures as a stone of amplification and focus. It is associated with sharpening intention and bringing mental clarity.",
    intention: "Clarity",
    style: "Minimal",
    collection: "Everyday Rituals",
    collectionSlug: "everyday-rituals",
    chakra: "TODO",
    zodiac: [],
    materials: ["TODO — Bead size, cord type, and hardware to be confirmed"],
    careInstructions: "Clear Quartz is one of the hardest natural stones. Clean with warm water and a soft cloth.",
    images: localImages("sightline"),
    isBestseller: false,
    inStock: true,
    relatedProductIds: ["prod_001", "prod_008"],
    stylingNote: "Sightline is the ultimate base layer. Its transparent beads let other stones take centre stage while adding quiet structure to a multi-piece stack.",
  },
];

// ─── Query Helpers ───────────────────────────

export function getAllProducts(): Product[] {
  return products;
}

export function getProductBySlug(slug: string): Product | undefined {
  return products.find(p => p.slug === slug);
}

export function getProductById(id: string): Product | undefined {
  return products.find(p => p.id === id);
}

export function getProductsByIds(ids: string[]): Product[] {
  return ids
    .map(id => products.find(p => p.id === id))
    .filter((p): p is Product => p !== undefined);
}

export function getProductsByIntention(intention: string): Product[] {
  return products.filter(p => p.intention === intention);
}

export function getProductsByCollection(collectionSlug: string): Product[] {
  return products.filter(p => p.collectionSlug === collectionSlug);
}
