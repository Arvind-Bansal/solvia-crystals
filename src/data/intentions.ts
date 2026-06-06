import { Intention } from '@/types';
import { products } from './products';

export const intentions: Intention[] = [
  {
    title: "Protection",
    slug: "protection",
    description: "Grounding stones for those who value boundaries — in energy, in attention, and in lifestyle. Black Obsidian, Black Tourmaline, and deep volcanic stones form the foundation of this intention.",
    heroCopy: "Boundaries worth wearing.",
    heroImage: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=2000&auto=format&fit=crop",
    faqs: [
      { question: "What is the difference between Obsidian and Tourmaline?", answer: "Both are protective stones, but they differ in character. Obsidian is bold and statement-making with its volcanic glass finish. Black Tourmaline is subtler and more understated — ideal for daily, low-profile wear." },
      { question: "Do these pieces work well layered?", answer: "Yes. Our Protection pieces in both Minimal and Statement tiers are designed to layer beautifully with each other or with pieces from other intentions." }
    ]
  },
  {
    title: "Clarity",
    slug: "clarity",
    description: "For moments that demand focus, composure, and clear thinking. Amethyst, Clear Quartz, and Smoky Quartz form the foundation — stones valued for their simplicity and mental association with stillness.",
    heroCopy: "Clear the noise.",
    heroImage: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=2000&auto=format&fit=crop",
    faqs: [
      { question: "What is the difference between Clear Quartz and Amethyst?", answer: "Clear Quartz is pure and minimal — a versatile stone that pairs with everything. Amethyst adds depth with its distinctive violet hue and has been traditionally associated with intuition and composure." },
      { question: "Which piece is best for daily wear?", answer: "Lunar Clarity (Clear Quartz) is our most versatile clarity piece — understated enough for every day, with a single gold accent for warmth." }
    ]
  },
  {
    title: "Confidence",
    slug: "confidence",
    description: "Bold, warm-toned stones for those who lead with presence. Tiger\u0027s Eye, Sunstone, and amber-hued crystals bring a natural sense of self-assurance and quiet personal power.",
    heroCopy: "Wear your certainty.",
    heroImage: "https://images.unsplash.com/photo-1596944924616-7b38e7cfac36?q=80&w=2000&auto=format&fit=crop",
    faqs: [
      { question: "What makes Tiger\u0027s Eye unique?", answer: "Tiger\u0027s Eye exhibits chatoyancy — a natural optical phenomenon where bands of light shift across the surface as the stone moves. This gives each bead a living, dynamic quality." },
      { question: "How do I choose between Terra Nova and Solstice?", answer: "Terra Nova (Tiger\u0027s Eye) is our Signature tier — bolder, with heavyweight gold accents. Solstice (Sunstone) is Minimal — lighter, softer, and more understated. Choose based on how much presence you want the piece to have." }
    ]
  },
  {
    title: "Love",
    slug: "love",
    description: "Pieces designed for emotional openness, self-compassion, and the quiet confidence that comes from leading with your heart. Rose Quartz and soft pink-toned stones anchor this collection.",
    heroCopy: "Lead with your heart.",
    heroImage: "https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?q=80&w=2000&auto=format&fit=crop",
    faqs: [
      { question: "Which stone is best for self-compassion?", answer: "Rose Quartz is widely regarded as the quintessential stone for emotional warmth and self-compassion. Our Rose Veil bracelet features hand-selected AAA-grade beads." },
      { question: "Can I wear love-intention pieces daily?", answer: "Absolutely. These pieces are designed for everyday wear. Rose Quartz and similar stones are naturally durable and develop a beautiful patina over time." }
    ]
  },
  {
    title: "Balance",
    slug: "balance",
    description: "Calming, grounding stones for those seeking steadiness. Aquamarine, Jade, and cool-toned crystals bring a sense of equilibrium and emotional composure to the wearer.",
    heroCopy: "Find your centre.",
    heroImage: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=2000&auto=format&fit=crop",
    faqs: [
      { question: "What is the significance of Jade?", answer: "Jade has been revered across cultures for over 7,000 years as a symbol of harmony, longevity, and quiet prosperity. Our Jade Meridian bracelet uses Grade A Nephrite Jade, which develops a richer lustre with wear." },
      { question: "Is Aquamarine fragile?", answer: "No — Aquamarine is quite hard (7.5-8 on the Mohs scale). It is a durable stone for daily wear, though we recommend avoiding extreme heat." }
    ]
  },
  {
    title: "Wealth",
    slug: "wealth",
    description: "Stones traditionally associated with prosperity, ambition, and creative drive. Citrine, Pyrite, and golden-toned crystals bring warmth and intention to every outfit.",
    heroCopy: "Ambition, crystallised.",
    heroImage: "https://images.unsplash.com/photo-1559825481-12a05cc00344?q=80&w=2000&auto=format&fit=crop",
    faqs: [
      { question: "Is Pyrite safe to wear every day?", answer: "Pyrite is durable but sensitive to moisture. We recommend removing your Pyrite Monarch bracelet before swimming or bathing, and storing it in the included velvet box." }
    ]
  }
];

// ─── Query Helpers ───────────────────────────

export function getAllIntentions(): Intention[] {
  return intentions;
}

export function getIntentionBySlug(slug: string): Intention | undefined {
  return intentions.find(i => i.slug === slug);
}

export function getProductsForIntention(intentionTitle: string) {
  return products.filter(p => p.intention === intentionTitle);
}
