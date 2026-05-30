import { notFound } from "next/navigation";
import Image from "next/image";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ProductCard } from "@/components/product/ProductCard";
import { mockProducts } from "@/data/mockProducts";
import { constructMetadata } from "@/lib/seo";

const intentionsData: Record<string, { title: string, description: string, image: string, faqs: {q: string, a: string}[] }> = {
  love: {
    title: "Love",
    description: "Pieces designed for emotional openness, self-compassion, and the quiet confidence that comes from leading with your heart. Rose Quartz, Rhodonite, and soft pink-toned stones anchor this collection.",
    image: "https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?q=80&w=2000&auto=format&fit=crop",
    faqs: [
      { q: "Which stone is best for self-compassion?", a: "Rose Quartz is widely regarded as the quintessential stone for emotional warmth and self-compassion. Our Rose Veil bracelet features hand-selected AAA-grade beads." },
      { q: "Can I wear love-intention pieces daily?", a: "Absolutely. These pieces are designed for everyday wear. Rose Quartz and similar stones are naturally durable and develop a beautiful patina over time." }
    ]
  },
  protection: {
    title: "Protection",
    description: "Grounding stones for those who value boundaries — in energy, in attention, and in lifestyle. Black Obsidian, Black Tourmaline, and deep volcanic stones form the foundation of this intention.",
    image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=2000&auto=format&fit=crop",
    faqs: [
      { q: "What is the difference between Obsidian and Tourmaline?", a: "Both are protective stones, but they differ in character. Obsidian is bold and statement-making with its volcanic glass finish. Black Tourmaline is subtler and more understated — ideal for daily, low-profile wear." },
      { q: "Do these pieces work well layered?", a: "Yes. Our Protection pieces in both Minimal and Statement tiers are designed to layer beautifully with each other or with pieces from other intentions." }
    ]
  },
  wealth: {
    title: "Wealth",
    description: "Stones traditionally associated with prosperity, ambition, and creative drive. Citrine, Pyrite, and golden-toned crystals bring warmth and intention to every outfit.",
    image: "https://images.unsplash.com/photo-1559825481-12a05cc00344?q=80&w=2000&auto=format&fit=crop",
    faqs: [
      { q: "Is Pyrite safe to wear every day?", a: "Pyrite is durable but sensitive to moisture. We recommend removing your Pyrite Monarch bracelet before swimming or bathing, and storing it in the included velvet box." }
    ]
  },
  clarity: {
    title: "Clarity",
    description: "For moments that demand focus, composure, and clear thinking. Amethyst, Clear Quartz, and Smoky Quartz form the foundation — stones valued for their simplicity and mental association with stillness.",
    image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=2000&auto=format&fit=crop",
    faqs: [
      { q: "What is the difference between Clear Quartz and Amethyst?", a: "Clear Quartz is pure and minimal — a versatile stone that pairs with everything. Amethyst adds depth with its distinctive violet hue and has been traditionally associated with intuition and composure." },
      { q: "Which piece is best for daily wear?", a: "Lunar Clarity (Clear Quartz) is our most versatile clarity piece — understated enough for every day, with a single gold accent for warmth." }
    ]
  },
  confidence: {
    title: "Confidence",
    description: "Bold, warm-toned stones for those who lead with presence. Tiger\u0027s Eye, Sunstone, and amber-hued crystals bring a natural sense of self-assurance and quiet personal power.",
    image: "https://images.unsplash.com/photo-1596944924616-7b38e7cfac36?q=80&w=2000&auto=format&fit=crop",
    faqs: [
      { q: "What makes Tiger\u0027s Eye unique?", a: "Tiger\u0027s Eye exhibits chatoyancy — a natural optical phenomenon where bands of light shift across the surface as the stone moves. This gives each bead a living, dynamic quality." },
      { q: "How do I choose between Terra Nova and Solstice?", a: "Terra Nova (Tiger\u0027s Eye) is our Signature tier — bolder, with heavyweight gold accents. Solstice (Sunstone) is Minimal — lighter, softer, and more understated. Choose based on how much presence you want the piece to have." }
    ]
  },
  balance: {
    title: "Balance",
    description: "Calming, grounding stones for those seeking steadiness. Aquamarine, Jade, and cool-toned crystals bring a sense of equilibrium and emotional composure to the wearer.",
    image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=2000&auto=format&fit=crop",
    faqs: [
      { q: "What is the significance of Jade?", a: "Jade has been revered across cultures for over 7,000 years as a symbol of harmony, longevity, and quiet prosperity. Our Jade Meridian bracelet uses Grade A Nephrite Jade, which develops a richer lustre with wear." },
      { q: "Is Aquamarine fragile?", a: "No — Aquamarine is quite hard (7.5-8 on the Mohs scale). It is a durable stone for daily wear, though we recommend avoiding extreme heat." }
    ]
  }
};

export function generateStaticParams() {
  return Object.keys(intentionsData).map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const data = intentionsData[slug];
  if (!data) return {};

  return constructMetadata({
    title: `${data.title} Collection`,
    description: data.description,
    image: data.image,
    canonicalUrl: `https://solviacrystals.com/intentions/${slug}`,
  });
}

export default async function IntentionPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const data = intentionsData[slug];

  if (!data) {
    notFound();
  }

  // Capitalize slug for filtering mock products (e.g., "love" -> "Love")
  const capitalizedIntention = slug.charAt(0).toUpperCase() + slug.slice(1);
  const products = mockProducts.filter(p => p.intention === capitalizedIntention);

  return (
    <>
      <Navbar />
      <main className="bg-[#0a0a0a] min-h-screen">
        {/* Storytelling Header */}
        <section className="relative pt-40 pb-32 border-b border-white/5">
          <div className="absolute inset-0 z-0 opacity-30">
            <Image 
              src={data.image}
              alt={data.title}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-[#0a0a0a]/80 to-[#0a0a0a]" />
          </div>
          
          <div className="container relative z-10 mx-auto px-6 max-w-4xl text-center">
            <span className="text-brand-gold text-xs font-bold uppercase tracking-widest mb-4 block">Shop by Intention</span>
            <h1 className="text-5xl md:text-7xl font-serif text-white mb-8">{data.title}</h1>
            <p className="text-lg md:text-xl text-brand-silver/90 leading-relaxed font-light">
              {data.description}
            </p>
          </div>
        </section>

        {/* Product Grid */}
        <section className="py-24">
          <div className="container mx-auto px-6">
            <div className="flex justify-between items-end mb-12">
              <h2 className="text-3xl font-serif text-white">Curated Pieces</h2>
              <span className="text-brand-silver/60 text-sm">{products.length} {products.length === 1 ? 'piece' : 'pieces'}</span>
            </div>

            {products.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {products.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <p className="text-center text-brand-silver/60 py-12 border border-white/5 bg-[#121212] rounded-sm">
                New pieces for this collection are currently in production.
              </p>
            )}
          </div>
        </section>

        {/* FAQs */}
        <section className="py-24 bg-[#050505] border-t border-white/5">
          <div className="container mx-auto px-6 max-w-3xl">
            <h2 className="text-3xl font-serif text-white mb-12 text-center">Frequently Asked Questions</h2>
            <div className="space-y-6">
              {data.faqs.map((faq, idx) => (
                <div key={idx} className="p-6 bg-[#121212] border border-white/5 rounded-sm">
                  <h3 className="text-lg font-serif text-white mb-3">{faq.q}</h3>
                  <p className="text-brand-silver/80 text-sm leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
