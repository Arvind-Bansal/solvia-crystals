import { Product } from '@/types';

export const mockProducts: Product[] = [
  {
    id: "prod_001",
    name: "Violet Hour",
    slug: "violet-hour",
    price: 185.00,
    rating: 4.9,
    reviewsCount: 124,
    description: "A study in restraint and depth. Grade AAA Amethyst beads are set alongside polished 14k gold accents, creating a piece that feels as considered as it is beautiful. Worn alone or layered, Violet Hour brings a quiet sense of clarity to everything it touches.",
    meaning: "Amethyst has been prized since antiquity as a stone of composure and clear thinking. Its deep violet hue has long been associated with intuition, inner stillness, and thoughtful decision-making.",
    intention: "Clarity",
    style: "Signature",
    collection: "Premium Collection",
    chakra: "Third Eye",
    zodiac: ["Aquarius", "Pisces"],
    materials: ["14k solid gold accents", "Grade AAA Amethyst 8mm beads", "Japanese elastic cord"],
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
    relatedProductIds: ["prod_002", "prod_007"]
  },
  {
    id: "prod_002",
    name: "Rose Veil",
    slug: "rose-veil",
    price: 175.00,
    rating: 4.8,
    reviewsCount: 98,
    description: "Soft, deliberate, and unmistakably elegant. Rose Veil pairs hand-selected Rose Quartz with warm gold hardware to create a piece that feels personal from the moment you put it on. Designed for those who wear their heart with intention.",
    meaning: "Rose Quartz is the stone of emotional openness. Throughout history, it has symbolised tenderness, self-compassion, and the quiet strength that comes from vulnerability.",
    intention: "Love",
    style: "Signature",
    collection: "Everyday Rituals",
    chakra: "Heart",
    zodiac: ["Taurus", "Libra"],
    materials: ["14k solid gold accents", "Grade AAA Rose Quartz 8mm beads"],
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
    relatedProductIds: ["prod_001", "prod_005"]
  },
  {
    id: "prod_003",
    name: "Obsidian Eclipse",
    slug: "obsidian-eclipse",
    price: 195.00,
    rating: 5.0,
    reviewsCount: 210,
    description: "Bold, grounding, and undeniably striking. Matte Black Obsidian beads catch the light just enough to remind you they're volcanic glass — born from fire, shaped with precision. The 14k gold charm adds a point of warmth to an otherwise monochromatic palette.",
    meaning: "Obsidian has been used as a protective talisman for centuries. It is a stone of boundaries — helping the wearer feel grounded, present, and firmly in their own power.",
    intention: "Protection",
    style: "Statement",
    collection: "Premium Collection",
    chakra: "Root",
    zodiac: ["Scorpio", "Sagittarius"],
    materials: ["Matte Black Obsidian 10mm beads", "14k solid gold charm"],
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
    relatedProductIds: ["prod_005", "prod_008"]
  },
  {
    id: "prod_004",
    name: "Golden Aura",
    slug: "golden-aura",
    price: 210.00,
    rating: 4.7,
    reviewsCount: 86,
    description: "Warm, luminous, and effortlessly luxurious. Natural untreated Citrine catches every shift of light, creating a piece that feels alive on the wrist. Golden Aura is designed for those drawn to warmth — in colour, in energy, and in ambition.",
    meaning: "Known historically as the Merchant's Stone, Citrine has been carried by traders and entrepreneurs for centuries as a symbol of prosperity, optimism, and creative drive.",
    intention: "Wealth",
    style: "Signature",
    collection: "Premium Collection",
    chakra: "Solar Plexus",
    zodiac: ["Aries", "Leo", "Libra"],
    materials: ["14k solid gold accents", "Natural untreated Citrine 6mm beads"],
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
    relatedProductIds: ["prod_012"]
  },
  {
    id: "prod_005",
    name: "Midnight Shield",
    slug: "midnight-shield",
    price: 165.00,
    rating: 4.8,
    reviewsCount: 72,
    description: "Understated protection, refined to its essence. Black Tourmaline beads sit flush against brushed gold spacers, creating a bracelet that looks as good layered as it does alone. A daily essential for those who value boundaries — in life and in style.",
    meaning: "Black Tourmaline is one of the most trusted protective stones in traditional practice. It is associated with grounding, mental clarity, and a sense of personal sovereignty.",
    intention: "Protection",
    style: "Minimal",
    collection: "Everyday Rituals",
    chakra: "Root",
    zodiac: ["Capricorn", "Scorpio"],
    materials: ["Black Tourmaline 6mm beads", "Brushed 14k gold spacers"],
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
    relatedProductIds: ["prod_003", "prod_007"]
  },
  {
    id: "prod_006",
    name: "Lunar Clarity",
    slug: "lunar-clarity",
    price: 155.00,
    rating: 4.9,
    reviewsCount: 64,
    description: "Pure, minimal, and quietly magnetic. Clear Quartz — sometimes called the 'master stone' — is paired here with a single 14k gold bead that grounds the entire composition. Lunar Clarity is the piece you reach for when you need to think clearly.",
    meaning: "Clear Quartz has been valued across cultures as a stone of amplification and focus. It is believed to sharpen intention and bring mental clarity to the wearer.",
    intention: "Clarity",
    style: "Minimal",
    collection: "Everyday Rituals",
    chakra: "Crown",
    zodiac: ["Aries", "Leo"],
    materials: ["Clear Quartz 6mm beads", "14k solid gold accent bead"],
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
    relatedProductIds: ["prod_001", "prod_011"]
  },
  {
    id: "prod_007",
    name: "Smoke & Stone",
    slug: "smoke-and-stone",
    price: 160.00,
    rating: 4.6,
    reviewsCount: 53,
    description: "Earthy, grounded, and effortlessly wearable. Smoky Quartz ranges from translucent grey to deep brown, and each bead carries its own subtle character. Paired with a blackened gold clasp, this piece bridges the gap between jewellery and ritual object.",
    meaning: "Smoky Quartz is traditionally associated with letting go — releasing what no longer serves you and finding steadiness in uncertain moments.",
    intention: "Clarity",
    style: "Minimal",
    collection: "Everyday Rituals",
    chakra: "Root",
    zodiac: ["Scorpio", "Capricorn"],
    materials: ["Natural Smoky Quartz 8mm beads", "Blackened 14k gold clasp"],
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
    relatedProductIds: ["prod_001", "prod_006"]
  },
  {
    id: "prod_008",
    name: "Terra Nova",
    slug: "terra-nova",
    price: 190.00,
    rating: 4.8,
    reviewsCount: 91,
    description: "Confident, warm, and impossible to ignore. Tiger's Eye shifts between amber, bronze, and deep gold as it catches the light — a natural phenomenon called chatoyancy. Paired with heavyweight gold accents, Terra Nova is designed for those who lead, not follow.",
    meaning: "Tiger's Eye has been worn as a stone of courage and self-assurance since the Roman era. Its shifting bands of colour symbolise adaptability, focus, and quiet personal power.",
    intention: "Confidence",
    style: "Signature",
    collection: "Premium Collection",
    chakra: "Solar Plexus",
    zodiac: ["Leo", "Capricorn"],
    materials: ["Grade AAA Tiger's Eye 8mm beads", "14k solid gold accents"],
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
    relatedProductIds: ["prod_003", "prod_009"]
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
    collection: "Everyday Rituals",
    chakra: "Sacral",
    zodiac: ["Leo", "Libra"],
    materials: ["Natural Sunstone 6mm beads", "14k gold-fill clasp"],
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
    relatedProductIds: ["prod_008", "prod_004"]
  },
  {
    id: "prod_010",
    name: "Stillwater",
    slug: "stillwater",
    price: 205.00,
    rating: 4.9,
    reviewsCount: 77,
    description: "Cool, composed, and deeply calming. Aquamarine's pale blue transparency evokes open water and clear skies. Set with polished gold details, Stillwater is a piece that feels both precious and deeply personal — the kind of bracelet that becomes part of your daily ritual.",
    meaning: "Aquamarine has been treasured by sailors and travellers as a stone of safe passage and inner peace. Its name — from the Latin for 'sea water' — reflects its long association with calm, balance, and emotional clarity.",
    intention: "Balance",
    style: "Signature",
    collection: "Premium Collection",
    chakra: "Throat",
    zodiac: ["Pisces", "Gemini"],
    materials: ["Grade AAA Aquamarine 6mm beads", "14k solid gold spacers"],
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
    relatedProductIds: ["prod_011", "prod_002"]
  },
  {
    id: "prod_011",
    name: "Jade Meridian",
    slug: "jade-meridian",
    price: 170.00,
    rating: 4.7,
    reviewsCount: 61,
    description: "Timeless, grounding, and quietly luxurious. Nephrite Jade has been revered for millennia — not for flash, but for substance. Jade Meridian pairs deep green stones with minimal gold hardware, creating a piece that feels rooted in something older and more enduring than trends.",
    meaning: "Jade has been a symbol of harmony, prosperity, and inner balance across cultures for over 7,000 years. It represents steadiness, longevity, and the kind of wealth that can't be measured.",
    intention: "Balance",
    style: "Minimal",
    collection: "Everyday Rituals",
    chakra: "Heart",
    zodiac: ["Taurus", "Libra"],
    materials: ["Grade A Nephrite Jade 8mm beads", "14k gold accent bead"],
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
    relatedProductIds: ["prod_010", "prod_002"]
  },
  {
    id: "prod_012",
    name: "Pyrite Monarch",
    slug: "pyrite-monarch",
    price: 225.00,
    rating: 4.8,
    reviewsCount: 45,
    description: "Unapologetically bold. Pyrite's metallic lustre and angular crystalline structure make it one of the most visually striking stones in any collection. Monarch pairs large-format Pyrite beads with 14k gold detailing for a bracelet that commands attention without saying a word.",
    meaning: "Often called 'Fool's Gold', Pyrite is anything but. It has been carried by merchants and leaders as a symbol of ambition, action, and the willingness to pursue what you want.",
    intention: "Wealth",
    style: "Statement",
    collection: "Premium Collection",
    chakra: "Solar Plexus",
    zodiac: ["Aries", "Leo"],
    materials: ["Natural Pyrite 10mm beads", "14k solid gold charm and spacers"],
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
    relatedProductIds: ["prod_004", "prod_008"]
  }
];

export function getProductBySlug(slug: string): Product | undefined {
  return mockProducts.find(p => p.slug === slug);
}
