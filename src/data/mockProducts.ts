import { Product } from '@/types';

export const mockProducts: Product[] = [
  {
    id: "prod_001",
    name: "Amethyst Aura Bracelet",
    slug: "amethyst-aura-bracelet",
    price: 85.00,
    rating: 4.9,
    reviewsCount: 124,
    description: "A premium handcrafted bracelet featuring grade AAA Amethyst. Designed to soothe the mind, ease anxiety, and heighten your natural intuition.",
    meaning: "Amethyst is known as the stone of spiritual protection and purification. It acts as a barrier against lower energies, psychological stress, and unhealthy environments.",
    intention: "Healing",
    chakra: "Third Eye",
    zodiac: ["Aquarius", "Pisces"],
    materials: ["14k Solid Gold accents", "Grade AAA Amethyst 8mm beads", "Durable elastic cord"],
    careInstructions: "Keep away from harsh chemicals and prolonged direct sunlight to prevent color fading. Cleanse under full moonlight.",
    images: {
      primary: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=800&auto=format&fit=crop",
      hover: "https://images.unsplash.com/photo-1599643477877-530eb83abc8e?q=80&w=800&auto=format&fit=crop",
      gallery: [
        "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1599643477877-530eb83abc8e?q=80&w=800&auto=format&fit=crop"
      ]
    },
    isBestseller: true,
    inStock: true,
    relatedProductIds: ["prod_002", "prod_004"]
  },
  {
    id: "prod_002",
    name: "Rose Quartz Radiance",
    slug: "rose-quartz-radiance",
    price: 75.00,
    rating: 4.8,
    reviewsCount: 98,
    description: "Cultivate unconditional love and deep emotional healing with this elegant Rose Quartz bracelet.",
    meaning: "Rose Quartz is the stone of universal love. It restores trust and harmony in relationships, encouraging unconditional love.",
    intention: "Love",
    chakra: "Heart",
    zodiac: ["Taurus", "Libra"],
    materials: ["Sterling Silver accents", "Grade AAA Rose Quartz 8mm beads"],
    careInstructions: "Avoid submerging in salt water. Cleanse with sage smoke or clear quartz.",
    images: {
      primary: "https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?q=80&w=800&auto=format&fit=crop",
      gallery: [
        "https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?q=80&w=800&auto=format&fit=crop"
      ]
    },
    isBestseller: true,
    inStock: true,
    relatedProductIds: ["prod_001", "prod_003"]
  },
  {
    id: "prod_003",
    name: "Obsidian Shield",
    slug: "obsidian-shield",
    price: 95.00,
    rating: 5.0,
    reviewsCount: 210,
    description: "A powerful talisman of protection. Black Obsidian forms a shield against negativity and blocks psychic attack.",
    meaning: "Born out of rapidly cooling volcanic lava, Obsidian draws out mental stress and tension while stimulating growth on all levels.",
    intention: "Protection",
    chakra: "Root",
    zodiac: ["Scorpio", "Sagittarius"],
    materials: ["Matte Black Obsidian 10mm beads", "Titanium steel charms"],
    careInstructions: "Wipe with a soft damp cloth. Requires frequent energetic cleansing due to its highly absorptive nature.",
    images: {
      primary: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=800&auto=format&fit=crop",
      gallery: [
        "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=800&auto=format&fit=crop"
      ]
    },
    isBestseller: false,
    inStock: true,
    relatedProductIds: ["prod_004"]
  },
  {
    id: "prod_004",
    name: "Citrine Abundance",
    slug: "citrine-abundance",
    price: 110.00,
    rating: 4.7,
    reviewsCount: 86,
    description: "Attract wealth, prosperity, and success. Citrine carries the power of the sun to energize every level of your life.",
    meaning: "Known as the 'Merchant's Stone', Citrine imparts joy, wonder, delight and enthusiasm.",
    intention: "Wealth",
    chakra: "Solar Plexus",
    zodiac: ["Aries", "Leo", "Libra"],
    materials: ["14k Solid Gold accents", "Natural untreated Citrine 6mm beads"],
    careInstructions: "Citrine fades under prolonged direct sunlight. Cleanse using sound or selenite.",
    images: {
      primary: "https://images.unsplash.com/photo-1559825481-12a05cc00344?q=80&w=800&auto=format&fit=crop",
      gallery: [
        "https://images.unsplash.com/photo-1559825481-12a05cc00344?q=80&w=800&auto=format&fit=crop"
      ]
    },
    isBestseller: true,
    inStock: false,
    relatedProductIds: ["prod_001"]
  }
];

export function getProductBySlug(slug: string): Product | undefined {
  return mockProducts.find(p => p.slug === slug);
}
