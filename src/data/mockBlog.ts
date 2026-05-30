import { BlogPost } from "@/types";

export const mockPosts: BlogPost[] = [
  {
    id: "post_1",
    title: "How to Care for Your Crystal Jewellery",
    slug: "caring-for-crystal-jewellery",
    excerpt: "A practical guide to cleaning, storing, and preserving the natural beauty of your crystal bracelets — so they age as gracefully as the stones themselves.",
    content: `
      <h2>Why Proper Care Matters</h2>
      <p>Natural crystals are remarkably durable, but they're also unique geological formations with specific sensitivities. Understanding how to care for your pieces ensures they maintain their lustre, colour depth, and structural integrity for years.</p>
      
      <h2>Cleaning Your Bracelets</h2>
      <ul>
        <li><strong>Daily wear:</strong> Wipe gently with a soft, dry cloth after each wear to remove oils and residue.</li>
        <li><strong>Deeper cleaning:</strong> Use lukewarm water with a drop of mild soap. Avoid submerging elastic-strung pieces — instead, dampen a cloth and gently clean each bead.</li>
        <li><strong>What to avoid:</strong> Ultrasonic cleaners, harsh chemicals, and prolonged water exposure. Some stones — particularly Selenite, Pyrite, and Malachite — are water-sensitive.</li>
      </ul>
      
      <h2>Storage</h2>
      <p>Store each piece in its provided linen pouch or velvet box. Keep bracelets separated to prevent harder stones from scratching softer ones. Avoid direct sunlight for extended periods — stones like Amethyst, Rose Quartz, and Citrine can fade with prolonged UV exposure.</p>
      
      <h2>When to Restring</h2>
      <p>If you wear your bracelet daily, we recommend professional restringing every 12–18 months. Elastic naturally stretches over time, and a fresh cord ensures your piece sits properly on the wrist.</p>
    `,
    image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=800&auto=format&fit=crop",
    author: "Solvia Editorial",
    date: "2026-05-10",
    readTime: "4 min read",
    category: "Care Guide"
  },
  {
    id: "post_2",
    title: "The Art of Layering: Styling Crystal Bracelets",
    slug: "art-of-layering-crystal-bracelets",
    excerpt: "From minimal single-stone pieces to curated stacks — a guide to wearing crystal jewellery with the same intentionality you'd bring to the rest of your wardrobe.",
    content: `
      <h2>Start with a Foundation Piece</h2>
      <p>Every good stack begins with one anchor bracelet. Choose your most worn or most meaningful piece — something like Obsidian Eclipse or Rose Veil — and build outward from there.</p>
      
      <h2>Mixing Tones and Textures</h2>
      <ul>
        <li><strong>Contrast matte with polished:</strong> A matte Obsidian next to a polished Citrine creates visual depth without clutter.</li>
        <li><strong>Vary bead sizes:</strong> Layer 6mm beads alongside 8mm or 10mm for a natural, organic rhythm.</li>
        <li><strong>Gold as a connector:</strong> The 14k gold accents across our collection are designed to unify different stones when worn together.</li>
      </ul>
      
      <h2>The Rule of Three</h2>
      <p>For most wrists, three bracelets is the sweet spot — enough to create a statement without feeling heavy. One Minimal, one Signature, and one Statement piece creates the most balanced visual composition.</p>
      
      <h2>Dressing Up vs. Down</h2>
      <p>For everyday wear, lean into Minimal pieces in neutral tones. For evenings or occasions, swap in a Statement piece — something like Pyrite Monarch or Obsidian Eclipse — and let it anchor the look.</p>
    `,
    image: "https://images.unsplash.com/photo-1559825481-12a05cc00344?q=80&w=800&auto=format&fit=crop",
    author: "Solvia Editorial",
    date: "2026-05-18",
    readTime: "5 min read",
    category: "Style"
  },
  {
    id: "post_3",
    title: "A Guide to Choosing Your First Crystal",
    slug: "choosing-your-first-crystal",
    excerpt: "Not sure where to start? We break down the most popular stones by intention, lifestyle, and personal style — so you can find a piece that genuinely resonates.",
    content: `
      <h2>Forget the Rules</h2>
      <p>There is no wrong first crystal. The best approach is simple: choose the stone you're most drawn to. Your instinct is usually more reliable than any guide — but if you'd like a framework, here's how we think about it.</p>
      
      <h2>By Intention</h2>
      <ul>
        <li><strong>Seeking clarity or focus?</strong> Start with Clear Quartz (Lunar Clarity) or Amethyst (Violet Hour). Both are versatile, timeless, and pair with everything.</li>
        <li><strong>Want grounding or boundaries?</strong> Black Tourmaline (Midnight Shield) or Obsidian (Obsidian Eclipse) are our most popular protective stones.</li>
        <li><strong>Drawn to warmth and confidence?</strong> Tiger's Eye (Terra Nova) or Sunstone (Solstice) bring a natural, earthy warmth to daily wear.</li>
        <li><strong>Looking for emotional balance?</strong> Rose Quartz (Rose Veil) or Aquamarine (Stillwater) are our most calming, emotionally resonant stones.</li>
      </ul>
      
      <h2>By Style</h2>
      <p>If you prefer jewellery that blends into your wardrobe quietly, explore our Minimal tier — smaller beads, understated hardware. If you want something that makes a statement, our Statement pieces use larger stones and bolder compositions.</p>
      
      <h2>Start Simple</h2>
      <p>One piece, worn consistently, will teach you more about what you're drawn to than buying five at once. Let it become part of your routine before expanding your collection.</p>
    `,
    image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=800&auto=format&fit=crop",
    author: "Solvia Editorial",
    date: "2026-05-22",
    readTime: "6 min read",
    category: "Guide"
  }
];

export function getPostBySlug(slug: string): BlogPost | undefined {
  return mockPosts.find(p => p.slug === slug);
}
