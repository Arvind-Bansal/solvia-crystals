import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ProductCard } from "@/components/product/ProductCard";
import { mockProducts } from "@/data/mockProducts";
import { constructMetadata } from "@/lib/seo";

const intentionsData: Record<string, { title: string, description: string, image: string, faqs: {q: string, a: string}[] }> = {
  love: {
    title: "Crystals for Love & Healing",
    description: "Open your heart chakra, heal past emotional wounds, and invite unconditional love into your life. Whether you are calling in a soulmate or learning to deeply love yourself, these crystals are your energetic allies.",
    image: "https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?q=80&w=2000&auto=format&fit=crop",
    faqs: [
      { q: "Which crystal is best for self-love?", a: "Rose Quartz is universally recognized as the ultimate stone for self-love, emotional healing, and gentle compassion." },
      { q: "How should I wear my love crystals?", a: "Wear them on your left wrist to draw love and receptive energy into your aura." }
    ]
  },
  protection: {
    title: "Crystals for Energetic Protection",
    description: "Shield your aura from psychic attacks, energy vampires, and environmental stress. Ground yourself into the earth and create an impenetrable boundary of light.",
    image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=2000&auto=format&fit=crop",
    faqs: [
      { q: "Do I need to cleanse protection crystals often?", a: "Yes. Stones like Black Obsidian absorb heavy energy rapidly and should be cleansed weekly." },
      { q: "Can I sleep with protection crystals?", a: "While grounding, some find stones like Obsidian too intense for sleep. Amethyst is a better protective sleep alternative." }
    ]
  },
  wealth: {
    title: "Crystals for Wealth & Abundance",
    description: "Activate your solar plexus, step into your personal power, and align your frequency with prosperity and infinite abundance.",
    image: "https://images.unsplash.com/photo-1559825481-12a05cc00344?q=80&w=2000&auto=format&fit=crop",
    faqs: [
      { q: "How long does it take to manifest wealth?", a: "Crystals amplify your intention and actions. While shifts can happen instantly, consistent alignment is key." }
    ]
  },
  healing: {
    title: "Crystals for Deep Healing",
    description: "Support your physical, emotional, and spiritual recovery. These stones emit gentle, restorative frequencies to bring your entire system back into harmonious balance.",
    image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=2000&auto=format&fit=crop",
    faqs: [
      { q: "What is the master healer stone?", a: "Clear Quartz is known as the Master Healer as it can be programmed for any condition and amplifies the energy of all other stones." }
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
    title: data.title,
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
              <h2 className="text-3xl font-serif text-white">Curated Collection</h2>
              <span className="text-brand-silver/60 text-sm">{products.length} pieces</span>
            </div>

            {products.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {products.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <p className="text-center text-brand-silver/60 py-12 border border-white/5 bg-[#121212] rounded-sm">
                New pieces are currently being cleansed and prepared for this collection.
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
