import { BlogPost } from "@/types";

export const mockPosts: BlogPost[] = [
  {
    id: "post_1",
    title: "The Ultimate Guide to Cleansing Your Crystals",
    slug: "ultimate-guide-cleansing-crystals",
    excerpt: "Learn how to energetically cleanse and recharge your crystal bracelets using moonlight, sage, and selenite to keep their vibrations high.",
    content: `
      <h2>Why Cleanse Your Crystals?</h2>
      <p>Crystals are natural energy absorbers. Over time, they can become bogged down with stagnant or negative energy, especially if you wear them daily. Cleansing them restores their natural vibration and effectiveness.</p>
      
      <h2>Methods of Cleansing</h2>
      <ul>
        <li><strong>Moonlight:</strong> The most gentle and universally safe method. Leave your crystals under the full moon overnight.</li>
        <li><strong>Sage Smoke:</strong> Smudging your crystals with sage clears away heavy energies instantly.</li>
        <li><strong>Selenite:</strong> Placing your bracelets on a selenite charging plate for a few hours will naturally draw out impurities.</li>
      </ul>
      
      <p>Remember, not all crystals are water-safe. Selenite, Malachite, and Lapis Lazuli should never be soaked in water.</p>
    `,
    image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=800&auto=format&fit=crop",
    author: "Elena Vance",
    date: "2026-05-10",
    readTime: "4 min read",
    category: "Crystal Care"
  },
  {
    id: "post_2",
    title: "Crystals for Attracting Wealth and Abundance",
    slug: "crystals-attracting-wealth-abundance",
    excerpt: "Discover the best crystals to align your energy with prosperity, including Citrine, Pyrite, and Green Aventurine.",
    content: `
      <h2>The Energy of Abundance</h2>
      <p>Wealth isn't just about money; it's a state of mind and an energetic frequency. Crystals can help tune your personal frequency to align with abundance.</p>
      
      <h2>Top Wealth Crystals</h2>
      <ul>
        <li><strong>Citrine:</strong> The Merchant's Stone. Known for attracting success and joy.</li>
        <li><strong>Pyrite:</strong> Often called Fool's Gold, Pyrite is a powerful manifestation stone that encourages taking action.</li>
        <li><strong>Green Aventurine:</strong> The Stone of Opportunity. Excellent for manifesting wealth and increasing luck.</li>
      </ul>
      
      <p>Wear these stones on your left wrist (your receiving side) to draw wealth into your life.</p>
    `,
    image: "https://images.unsplash.com/photo-1559825481-12a05cc00344?q=80&w=800&auto=format&fit=crop",
    author: "Solvia Editorial",
    date: "2026-05-18",
    readTime: "5 min read",
    category: "Manifestation"
  },
  {
    id: "post_3",
    title: "Understanding the 7 Chakras and Crystal Healing",
    slug: "understanding-chakras-crystal-healing",
    excerpt: "A beginner's guide to the body's energy centers and how to use specific crystals to balance and align them.",
    content: `
      <h2>What are Chakras?</h2>
      <p>Chakras are spinning wheels of energy throughout your body. When they are open and aligned, energy flows freely. When blocked, it can manifest as physical or emotional distress.</p>
      
      <h2>The 7 Main Chakras</h2>
      <ul>
        <li><strong>Root Chakra (Red/Black):</strong> Foundation and grounding. Use Obsidian or Red Jasper.</li>
        <li><strong>Sacral Chakra (Orange):</strong> Creativity and passion. Use Carnelian.</li>
        <li><strong>Solar Plexus (Yellow):</strong> Confidence and power. Use Citrine or Tiger's Eye.</li>
        <li><strong>Heart Chakra (Green/Pink):</strong> Love and compassion. Use Rose Quartz or Malachite.</li>
        <li><strong>Throat Chakra (Blue):</strong> Communication. Use Lapis Lazuli.</li>
        <li><strong>Third Eye (Indigo):</strong> Intuition. Use Amethyst.</li>
        <li><strong>Crown Chakra (Clear/White):</strong> Spiritual connection. Use Clear Quartz.</li>
      </ul>
    `,
    image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=800&auto=format&fit=crop",
    author: "Elena Vance",
    date: "2026-05-22",
    readTime: "7 min read",
    category: "Education"
  }
];

export function getPostBySlug(slug: string): BlogPost | undefined {
  return mockPosts.find(p => p.slug === slug);
}
