import { notFound } from "next/navigation";
import Image from "next/image";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ProductCard } from "@/components/product/ProductCard";
import { getAllIntentions, getIntentionBySlug, getProductsForIntention } from "@/data";
import { constructMetadata } from "@/lib/seo";
import { Accordion } from "@/components/ui/Accordion";

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
      <main className="bg-[#F8F5EF] min-h-screen text-[#262626]">
        {/* Storytelling Header */}
        <section className="relative pt-40 pb-32 border-b border-[#262626]/10 bg-[#F2EDE4]">
          <div className="absolute inset-0 z-0 opacity-20">
            <Image 
              src={data.heroImage}
              alt={data.title}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-b from-[#F8F5EF] via-[#F8F5EF]/80 to-[#F8F5EF]" />
          </div>
          
          <div className="container relative z-10 mx-auto px-6 max-w-4xl text-center">
            <span className="text-brand-gold text-xs font-bold uppercase tracking-widest mb-4 block">Shop by Intention</span>
            <h1 className="text-5xl md:text-7xl font-serif text-[#262626] mb-8 font-medium">{data.title}</h1>
            <p className="text-lg md:text-xl text-[#262626]/80 leading-relaxed font-light">
              {data.description}
            </p>
          </div>
        </section>

        {/* Product Grid */}
        <section className="py-24">
          <div className="container mx-auto px-6">
            <div className="flex justify-between items-end mb-12">
              <h2 className="text-3xl font-serif text-[#262626] font-medium">Curated Pieces</h2>
              <span className="text-[#262626]/60 text-sm">{intentionProducts.length} {intentionProducts.length === 1 ? 'piece' : 'pieces'}</span>
            </div>

            {intentionProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {intentionProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <p className="text-center text-[#262626]/60 py-12 border border-[#262626]/10 bg-white rounded-sm">
                New pieces for this collection are currently in production.
              </p>
            )}
          </div>
        </section>

        {/* FAQs */}
        <section className="py-24 bg-[#F2EDE4] border-t border-[#262626]/10">
          <div className="container mx-auto px-6 max-w-3xl">
            <h2 className="text-3xl font-serif text-[#262626] mb-12 text-center font-medium">Frequently Asked Questions</h2>
            <Accordion items={data.faqs} structuredData />
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
