import { notFound } from "next/navigation";
import Image from "next/image";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ProductCard } from "@/components/product/ProductCard";
import { getAllIntentions, getIntentionBySlug, getProductsForIntention } from "@/data";
import { constructMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return getAllIntentions().map((intention) => ({
    slug: intention.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const data = getIntentionBySlug(slug);
  if (!data) return {};

  return constructMetadata({
    title: `${data.title} Collection`,
    description: data.description,
    image: data.heroImage,
    canonicalUrl: `https://solviacrystals.com/intentions/${slug}`,
  });
}

export default async function IntentionPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const data = getIntentionBySlug(slug);

  if (!data) {
    notFound();
  }

  const intentionProducts = getProductsForIntention(data.title);

  return (
    <>
      <Navbar />
      <main className="bg-[#0a0a0a] min-h-screen">
        {/* Storytelling Header */}
        <section className="relative pt-40 pb-32 border-b border-white/5">
          <div className="absolute inset-0 z-0 opacity-30">
            <Image 
              src={data.heroImage}
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
              <span className="text-brand-silver/60 text-sm">{intentionProducts.length} {intentionProducts.length === 1 ? 'piece' : 'pieces'}</span>
            </div>

            {intentionProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {intentionProducts.map(product => (
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
                  <h3 className="text-lg font-serif text-white mb-3">{faq.question}</h3>
                  <p className="text-brand-silver/80 text-sm leading-relaxed">{faq.answer}</p>
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
