import { Intention } from '@/types';
import { products } from './products';

export const intentions: Intention[] = [
  {
    title: "Protection",
    slug: "protection",
    description: "Grounding stones for those who value boundaries — in energy, in attention, and in lifestyle. Black Tourmaline forms the foundation of this intention.",
    heroCopy: "Boundaries worth wearing.",
    heroImage: "/products/stronghold/primary.webp",
    faqs: [
      { question: "Which piece is best for daily protective wear?", answer: "Stronghold (Black Tourmaline) is our most understated protective piece — durable, low-profile, and designed for everyday comfort." },
      { question: "Does Stronghold layer well with other pieces?", answer: "Yes. Its minimal profile and neutral black tone make it an ideal base for layering with any other bracelet in the collection." }
    ]
  },
  {
    title: "Clarity",
    slug: "clarity",
    description: "For moments that demand focus, composure, and clear thinking. Amethyst and Clear Quartz form the foundation — stones valued for their simplicity and association with stillness.",
    heroCopy: "Clear the noise.",
    heroImage: "/products/sightline/primary.webp",
    faqs: [
      { question: "What is the difference between Clear Quartz and Amethyst?", answer: "Clear Quartz (Sightline) is pure and minimal — a versatile stone that pairs with everything. Amethyst (Violet Hour) adds depth with its distinctive violet hue and has been traditionally associated with intuition and composure." },
      { question: "Which piece is best for daily wear?", answer: "Sightline (Clear Quartz) is our most versatile clarity piece — understated enough for every day and pairs with everything in the collection." }
    ]
  },
  {
    title: "Confidence",
    slug: "confidence",
    description: "Bold, warm-toned stones for those who lead with presence. Tiger Eye brings a natural sense of self-assurance and quiet personal power.",
    heroCopy: "Wear your certainty.",
    heroImage: "/products/conviction/primary.webp",
    faqs: [
      { question: "What makes Tiger Eye unique?", answer: "Tiger Eye exhibits chatoyancy — a natural optical phenomenon where bands of light shift across the surface as the stone moves. This gives each bead a living, dynamic quality." },
      { question: "How does Conviction wear?", answer: "Conviction (Tiger Eye) is a Signature-tier piece — bold, warm, and confident. Its shifting amber and bronze tones make it a natural centrepiece for any stack." }
    ]
  },
  {
    title: "Love",
    slug: "love",
    description: "Pieces designed for emotional openness, self-compassion, and the quiet confidence that comes from leading with your heart. Rose Quartz anchors this collection.",
    heroCopy: "Lead with your heart.",
    heroImage: "/products/affinity/primary.webp",
    faqs: [
      { question: "Which stone is best for self-compassion?", answer: "Rose Quartz is widely regarded as the quintessential stone for emotional warmth and self-compassion. Our Affinity bracelet features hand-selected Rose Quartz beads." },
      { question: "Can I wear Affinity daily?", answer: "Absolutely. Affinity is designed for everyday wear. Rose Quartz is naturally durable and develops a beautiful patina over time." }
    ]
  },
  {
    title: "Wealth",
    slug: "wealth",
    description: "Stones traditionally associated with prosperity, ambition, and creative drive. Citrine, Pyrite, and Green Aventurine bring warmth and intention to every outfit.",
    heroCopy: "Ambition, crystallised.",
    heroImage: "/products/late-harvest/primary.webp",
    faqs: [
      { question: "Is Pyrite safe to wear every day?", answer: "Pyrite is durable but sensitive to moisture. We recommend removing your Prospect bracelet before swimming or bathing, and storing it in the included pouch." },
      { question: "How do I choose between the three wealth-intention pieces?", answer: "Late Harvest (Citrine) is warm and luminous — ideal for those drawn to golden tones. Prospect (Pyrite) is bold and metallic — a true statement piece. Fortune (Green Aventurine) is the most understated of the three — earthy, grounded, and quietly versatile." }
    ]
  },
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
