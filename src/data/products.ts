import { Product } from '@/types';

export const products: Product[] = [
  {
    id: "prod_001",
    name: "Violet Hour",
    slug: "violet-hour",
    price: 185.00,
    rating: 4.9,
    reviewsCount: 124,
    description: "A study in restraint and depth. Grade AAA Amethyst beads sit alongside brushed metal accents, creating a piece that feels as considered as it is beautiful. Worn alone or layered, Violet Hour brings a quiet sense of clarity to everything it touches.",
    meaning: "Amethyst has been prized since antiquity as a stone of composure and clear thinking. Its deep violet hue has long been associated with intuition, inner stillness, and thoughtful decision-making.",
    intention: "Clarity",
    style: "Signature",
    collection: "Signature Stones",
    collectionSlug: "signature-stones",
    chakra: "Third Eye",
    zodiac: ["Aquarius", "Pisces"],
    materials: ["Grade AAA Amethyst 8mm beads", "Brushed metal accents", "Japanese elastic cord"],
    careInstructions: "Avoid prolonged direct sunlight to preserve the natural color depth. Wipe gently with a soft cloth after wear.",
    images: {
      primary: "https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?q=80&w=1200&auto=format&fit=crop",
      hover: "https://images.unsplash.com/photo-1596944924616-7b38e7cfac36?q=80&w=1200&auto=format&fit=crop",
      gallery: [
        "https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?q=80&w=1200&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1596944924616-7b38e7cfac36?q=80&w=1200&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=1200&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=1200&auto=format&fit=crop"
      ]
    },
    isBestseller: true,
    inStock: true,
    relatedProductIds: ["prod_002", "prod_007"],
    stylingNote: "Violet Hour pairs beautifully with neutral tones — think charcoal, ivory, and soft grey. Layer with Lunar Clarity for a tonal stack, or wear solo as a quiet statement."
  },
  {
    id: "prod_002",
    name: "Rose Veil",
    slug: "rose-veil",
    price: 175.00,
    rating: 4.8,
    reviewsCount: 98,
    description: "Soft, deliberate, and unmistakably elegant. Hand-selected Rose Quartz gives this piece its gentle warmth — a bracelet that feels personal from the moment you put it on. Designed for those who wear their heart with care.",
    meaning: "Rose Quartz is the stone of emotional openness. Throughout history, it has symbolised tenderness, self-compassion, and the quiet strength that comes from vulnerability.",
    intention: "Love",
    style: "Signature",
    collection: "Everyday Rituals",
    collectionSlug: "everyday-rituals",
    chakra: "Heart",
    zodiac: ["Taurus", "Libra"],
    materials: ["Grade AAA Rose Quartz 8mm beads", "Metal accent hardware"],
    careInstructions: "Avoid contact with perfume and harsh chemicals. Store in the provided linen pouch when not worn.",
    images: {
      primary: "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?q=80&w=1200&auto=format&fit=crop",
      hover: "https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?q=80&w=1200&auto=format&fit=crop",
      gallery: [
        "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?q=80&w=1200&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?q=80&w=1200&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?q=80&w=1200&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=1200&auto=format&fit=crop"
      ]
    },
    isBestseller: true,
    inStock: true,
    relatedProductIds: ["prod_001", "prod_005"],
    stylingNote: "Rose Veil is one of our most versatile layering pieces. Pair with warmer stones like Citrine or Sunstone for a sun-drenched stack, or wear alone against bare skin."
  },
  {
    id: "prod_003",
    name: "Obsidian Eclipse",
    slug: "obsidian-eclipse",
    price: 195.00,
    rating: 5.0,
    reviewsCount: 210,
    description: "Bold and undeniably striking. Matte Black Obsidian beads catch the light just enough to remind you they're volcanic glass — born from fire, shaped with precision. A single metal charm anchors an otherwise monochromatic palette.",
    meaning: "Obsidian has been used as a protective talisman for centuries. It is a stone of boundaries — helping the wearer feel grounded, present, and firmly in their own power.",
    intention: "Protection",
    style: "Statement",
    collection: "Grounding Series",
    collectionSlug: "grounding-series",
    chakra: "Root",
    zodiac: ["Scorpio", "Sagittarius"],
    materials: ["Matte Black Obsidian 10mm beads", "Metal alloy charm"],
    careInstructions: "Wipe with a soft damp cloth. Obsidian is durable but can chip on hard surfaces — handle with care.",
    images: {
      primary: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=1200&auto=format&fit=crop",
      hover: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=1200&auto=format&fit=crop",
      gallery: [
        "https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=1200&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=1200&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=1200&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1599643477877-530eb83abc8e?q=80&w=1200&auto=format&fit=crop"
      ]
    },
    isBestseller: true,
    inStock: true,
    relatedProductIds: ["prod_005", "prod_008"],
    stylingNote: "Obsidian Eclipse is a natural anchor piece. Its bold 10mm beads ground any stack — pair with Midnight Shield or Smoke & Stone for a monochromatic edge."
  },
  {
    id: "prod_004",
    name: "Golden Aura",
    slug: "golden-aura",
    price: 210.00,
    rating: 4.7,
    reviewsCount: 86,
    description: "Warm, luminous, and effortlessly wearable. Natural untreated Citrine catches every shift of light, creating a piece that feels alive on the wrist. Golden Aura is for those drawn to warmth — in colour, in energy, and in ambition.",
    meaning: "Known historically as the Merchant's Stone, Citrine has been carried by traders and entrepreneurs for centuries as a symbol of prosperity, optimism, and creative drive.",
    intention: "Wealth",
    style: "Signature",
    collection: "Signature Stones",
    collectionSlug: "signature-stones",
    chakra: "Solar Plexus",
    zodiac: ["Aries", "Leo", "Libra"],
    materials: ["Natural untreated Citrine 6mm beads", "Metal accent hardware"],
    careInstructions: "Citrine is light-sensitive — store away from direct sunlight to maintain its natural golden warmth.",
    images: {
      primary: "https://images.unsplash.com/photo-1589674781759-c21c37956a44?q=80&w=1200&auto=format&fit=crop",
      hover: "https://images.unsplash.com/photo-1599643477877-530eb83abc8e?q=80&w=1200&auto=format&fit=crop",
      gallery: [
        "https://images.unsplash.com/photo-1589674781759-c21c37956a44?q=80&w=1200&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1599643477877-530eb83abc8e?q=80&w=1200&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?q=80&w=1200&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1596944924616-7b38e7cfac36?q=80&w=1200&auto=format&fit=crop"
      ]
    },
    isBestseller: true,
    inStock: true,
    relatedProductIds: ["prod_012"],
    stylingNote: "Golden Aura's warm tones work best against deep colours — navy, forest green, black. Layer with Terra Nova for a rich, amber-toned composition."
  },
  {
    id: "prod_005",
    name: "Midnight Shield",
    slug: "midnight-shield",
    price: 165.00,
    rating: 4.8,
    reviewsCount: 72,
    description: "Understated protection, refined to its essence. Black Tourmaline beads sit flush against brushed spacers, creating a bracelet that looks as good layered as it does alone. A daily essential for those who value their boundaries.",
    meaning: "Black Tourmaline is one of the most trusted protective stones in traditional practice. It is associated with grounding, mental clarity, and a sense of personal sovereignty.",
    intention: "Protection",
    style: "Minimal",
    collection: "Everyday Rituals",
    collectionSlug: "everyday-rituals",
    chakra: "Root",
    zodiac: ["Capricorn", "Scorpio"],
    materials: ["Black Tourmaline 6mm beads", "Brushed metal spacers"],
    careInstructions: "Tourmaline is naturally durable. Wipe with a dry cloth to maintain its matte finish.",
    images: {
      primary: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=1200&auto=format&fit=crop",
      hover: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=1200&auto=format&fit=crop",
      gallery: [
        "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=1200&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=1200&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1599643477877-530eb83abc8e?q=80&w=1200&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=1200&auto=format&fit=crop"
      ]
    },
    isBestseller: false,
    inStock: true,
    relatedProductIds: ["prod_003", "prod_007"],
    stylingNote: "A perfect everyday piece. Midnight Shield's minimal 6mm beads sit close to the wrist and layer effortlessly with almost any other bracelet in the collection."
  },
  {
    id: "prod_006",
    name: "Lunar Clarity",
    slug: "lunar-clarity",
    price: 155.00,
    rating: 4.9,
    reviewsCount: 64,
    description: "Pure, minimal, and quietly magnetic. Clear Quartz — sometimes called the 'master stone' — is paired here with a single accent bead that anchors the entire composition. The piece you reach for when you need to think clearly.",
    meaning: "Clear Quartz has been valued across cultures as a stone of amplification and focus. It is believed to sharpen intention and bring mental clarity to the wearer.",
    intention: "Clarity",
    style: "Minimal",
    collection: "Minimal Forms",
    collectionSlug: "minimal-forms",
    chakra: "Crown",
    zodiac: ["Aries", "Leo"],
    materials: ["Clear Quartz 6mm beads", "Metal accent bead"],
    careInstructions: "Clear Quartz is one of the hardest natural stones. Clean with warm water and a soft cloth.",
    images: {
      primary: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=1200&auto=format&fit=crop",
      hover: "https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?q=80&w=1200&auto=format&fit=crop",
      gallery: [
        "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=1200&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?q=80&w=1200&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1596944924616-7b38e7cfac36?q=80&w=1200&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?q=80&w=1200&auto=format&fit=crop"
      ]
    },
    isBestseller: false,
    inStock: true,
    relatedProductIds: ["prod_001", "prod_011"],
    stylingNote: "Lunar Clarity is the ultimate base layer. Its transparent beads let other stones take centre stage while adding quiet structure to a multi-piece stack."
  },
  {
    id: "prod_007",
    name: "Smoke & Stone",
    slug: "smoke-and-stone",
    price: 160.00,
    rating: 4.6,
    reviewsCount: 53,
    description: "Earthy and effortlessly wearable. Smoky Quartz ranges from translucent grey to deep brown, and each bead carries its own subtle character. Paired with a matte black clasp, this piece bridges the gap between jewellery and daily companion.",
    meaning: "Smoky Quartz is traditionally associated with letting go — releasing what no longer serves you and finding steadiness in uncertain moments.",
    intention: "Clarity",
    style: "Minimal",
    collection: "Quiet Energy",
    collectionSlug: "quiet-energy",
    chakra: "Root",
    zodiac: ["Scorpio", "Capricorn"],
    materials: ["Natural Smoky Quartz 8mm beads", "Matte black clasp"],
    careInstructions: "Avoid extended exposure to heat. Store flat in the included linen pouch.",
    images: {
      primary: "https://images.unsplash.com/photo-1599643477877-530eb83abc8e?q=80&w=1200&auto=format&fit=crop",
      hover: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=1200&auto=format&fit=crop",
      gallery: [
        "https://images.unsplash.com/photo-1599643477877-530eb83abc8e?q=80&w=1200&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=1200&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=1200&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1589674781759-c21c37956a44?q=80&w=1200&auto=format&fit=crop"
      ]
    },
    isBestseller: false,
    inStock: true,
    relatedProductIds: ["prod_001", "prod_006"],
    stylingNote: "Smoke & Stone is a transitional piece — equally at home with earthy Jade Meridian or deep Violet Hour. Its grey-to-brown gradient bridges warm and cool palettes."
  },
  {
    id: "prod_008",
    name: "Terra Nova",
    slug: "terra-nova",
    price: 190.00,
    rating: 4.8,
    reviewsCount: 91,
    description: "Confident, warm, and impossible to ignore. Tiger's Eye shifts between amber, bronze, and deep gold as it catches the light — a natural phenomenon called chatoyancy. Terra Nova is designed for those who lead, not follow.",
    meaning: "Tiger's Eye has been worn as a stone of courage and self-assurance since the Roman era. Its shifting bands of colour symbolise adaptability, focus, and quiet personal power.",
    intention: "Confidence",
    style: "Signature",
    collection: "Signature Stones",
    collectionSlug: "signature-stones",
    chakra: "Solar Plexus",
    zodiac: ["Leo", "Capricorn"],
    materials: ["Grade AAA Tiger's Eye 8mm beads", "Metal accent hardware"],
    careInstructions: "Tiger's Eye is naturally resilient. Clean with a damp cloth. Avoid ultrasonic cleaners.",
    images: {
      primary: "https://images.unsplash.com/photo-1596944924616-7b38e7cfac36?q=80&w=1200&auto=format&fit=crop",
      hover: "https://images.unsplash.com/photo-1589674781759-c21c37956a44?q=80&w=1200&auto=format&fit=crop",
      gallery: [
        "https://images.unsplash.com/photo-1596944924616-7b38e7cfac36?q=80&w=1200&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1589674781759-c21c37956a44?q=80&w=1200&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=1200&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?q=80&w=1200&auto=format&fit=crop"
      ]
    },
    isBestseller: false,
    inStock: true,
    relatedProductIds: ["prod_003", "prod_009"],
    stylingNote: "Terra Nova makes a statement on its own but truly shines layered with earthy companions. Try pairing with Smoke & Stone or Jade Meridian for a grounded, confident stack."
  },
  {
    id: "prod_009",
    name: "Solstice",
    slug: "solstice",
    price: 145.00,
    rating: 4.5,
    reviewsCount: 38,
    description: "Warm light, captured in stone. Sunstone's natural inclusions create a soft shimmer that feels alive on the wrist — never flashy, always luminous. Solstice is the piece for anyone drawn to quiet optimism and unhurried mornings.",
    meaning: "Sunstone has been linked to joy and vitality since Viking seafarers used it to navigate by overcast skies. It symbolises warmth, independence, and a generous spirit.",
    intention: "Confidence",
    style: "Minimal",
    collection: "Quiet Energy",
    collectionSlug: "quiet-energy",
    chakra: "Sacral",
    zodiac: ["Leo", "Libra"],
    materials: ["Natural Sunstone 6mm beads", "Gold-tone clasp"],
    careInstructions: "Sunstone is moderately delicate. Remove before swimming or bathing. Store separately to avoid scratching.",
    images: {
      primary: "https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?q=80&w=1200&auto=format&fit=crop",
      hover: "https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?q=80&w=1200&auto=format&fit=crop",
      gallery: [
        "https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?q=80&w=1200&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?q=80&w=1200&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?q=80&w=1200&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1589674781759-c21c37956a44?q=80&w=1200&auto=format&fit=crop"
      ]
    },
    isBestseller: false,
    inStock: true,
    relatedProductIds: ["prod_008", "prod_004"],
    stylingNote: "Solstice is a warm-weather favourite. Its subtle shimmer catches sunlight beautifully. Layer with Rose Veil for a soft, luminous pairing."
  },
  {
    id: "prod_010",
    name: "Stillwater",
    slug: "stillwater",
    price: 205.00,
    rating: 4.9,
    reviewsCount: 77,
    description: "Cool, composed, and deeply calming. Aquamarine's pale blue transparency evokes open water and clear skies. Stillwater is a piece that feels both personal and deeply wearable — the kind of bracelet that becomes part of your day.",
    meaning: "Aquamarine has been treasured by sailors and travellers as a stone of safe passage and inner peace. Its name — from the Latin for 'sea water' — reflects its long association with calm, balance, and emotional clarity.",
    intention: "Balance",
    style: "Signature",
    collection: "Quiet Energy",
    collectionSlug: "quiet-energy",
    chakra: "Throat",
    zodiac: ["Pisces", "Gemini"],
    materials: ["Grade AAA Aquamarine 6mm beads", "Polished metal spacers"],
    careInstructions: "Aquamarine is relatively hard but can be sensitive to heat. Clean gently with warm water and mild soap.",
    images: {
      primary: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=1200&auto=format&fit=crop",
      hover: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=1200&auto=format&fit=crop",
      gallery: [
        "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=1200&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=1200&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?q=80&w=1200&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?q=80&w=1200&auto=format&fit=crop"
      ]
    },
    isBestseller: false,
    inStock: true,
    relatedProductIds: ["prod_011", "prod_002"],
    stylingNote: "Stillwater's cool blue tones pair beautifully with silver and white textiles. Try layering with Lunar Clarity for a pale, oceanic composition."
  },
  {
    id: "prod_011",
    name: "Jade Meridian",
    slug: "jade-meridian",
    price: 170.00,
    rating: 4.7,
    reviewsCount: 61,
    description: "Timeless and quietly assured. Nephrite Jade has been revered for millennia — not for flash, but for substance. Deep green stones with minimal hardware, creating a piece that feels rooted in something older and more enduring than trends.",
    meaning: "Jade has been a symbol of harmony, prosperity, and inner balance across cultures for over 7,000 years. It represents steadiness, longevity, and the kind of wealth that can't be measured.",
    intention: "Balance",
    style: "Minimal",
    collection: "Everyday Rituals",
    collectionSlug: "everyday-rituals",
    chakra: "Heart",
    zodiac: ["Taurus", "Libra"],
    materials: ["Grade A Nephrite Jade 8mm beads", "Gold-tone accent bead"],
    careInstructions: "Jade is extremely durable. Clean with warm soapy water. Its lustre improves with wear over time.",
    images: {
      primary: "https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?q=80&w=1200&auto=format&fit=crop",
      hover: "https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?q=80&w=1200&auto=format&fit=crop",
      gallery: [
        "https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?q=80&w=1200&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?q=80&w=1200&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?q=80&w=1200&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=1200&auto=format&fit=crop"
      ]
    },
    isBestseller: false,
    inStock: true,
    relatedProductIds: ["prod_010", "prod_002"],
    stylingNote: "Jade Meridian is a timeless layering piece. Its deep green works with almost any colour palette — pair with Smoke & Stone for an earthy stack or Stillwater for a cool contrast."
  },
  {
    id: "prod_012",
    name: "Pyrite Monarch",
    slug: "pyrite-monarch",
    price: 225.00,
    rating: 4.8,
    reviewsCount: 45,
    description: "Unapologetically bold. Pyrite's metallic lustre and angular crystalline structure make it one of the most visually striking stones in any collection. Large-format beads with tonal metallic detailing — a bracelet that commands attention without saying a word.",
    meaning: "Often called 'Fool's Gold', Pyrite is anything but. It has been carried by merchants and leaders as a symbol of ambition, action, and the willingness to pursue what you want.",
    intention: "Wealth",
    style: "Statement",
    collection: "Grounding Series",
    collectionSlug: "grounding-series",
    chakra: "Solar Plexus",
    zodiac: ["Aries", "Leo"],
    materials: ["Natural Pyrite 10mm beads", "Metal charm and spacers"],
    careInstructions: "Pyrite can oxidise over time if exposed to moisture. Store in the included velvet box and avoid contact with water.",
    images: {
      primary: "https://images.unsplash.com/photo-1589674781759-c21c37956a44?q=80&w=1200&auto=format&fit=crop",
      hover: "https://images.unsplash.com/photo-1596944924616-7b38e7cfac36?q=80&w=1200&auto=format&fit=crop",
      gallery: [
        "https://images.unsplash.com/photo-1589674781759-c21c37956a44?q=80&w=1200&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1596944924616-7b38e7cfac36?q=80&w=1200&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1599643477877-530eb83abc8e?q=80&w=1200&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=1200&auto=format&fit=crop"
      ]
    },
    isBestseller: false,
    inStock: false,
    relatedProductIds: ["prod_004", "prod_008"],
    stylingNote: "Pyrite Monarch is a statement piece — let it breathe. Wear alone or with one minimal companion like Midnight Shield. Its metallic lustre provides its own layering depth."
  }
];

// ─── Query Helpers ───────────────────────────
// These become the CMS fetch layer. Swap internals when migrating to Sanity/Contentful.

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
