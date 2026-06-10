import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ProductCard } from "@/components/product/ProductCard";
import { getAllCollections, getCollectionBySlug, getProductsForCollection } from "@/data";
import { constructMetadata } from "@/lib/seo";
import { ArrowRight } from "lucide-react";

export function generateStaticParams() {
  return getAllCollections().map((c) => ({
    slug: c.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const collection = getCollectionBySlug(slug);
  if (!collection) return {};

  return constructMetadata({
    title: `${collection.title} Collection`,
    description: collection.description,
    image: collection.featuredImage,
    canonicalUrl: `https://solviacrystals.com/collections/${slug}`,
  });
}

export default async function CollectionDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const collection = getCollectionBySlug(slug);

  if (!collection) {
    notFound();
  }

  const products = getProductsForCollection(slug);
  const otherCollections = getAllCollections().filter(c => c.slug !== slug);

  return (
    <>
      <Navbar />
      <main className="bg-[#0a0a0a] min-h-screen">
        {/* Hero */}
        <section className="relative pt-40 pb-32 border-b border-white/5">
          <div className="absolute inset-0 z-0 opacity-30">
            <Image
              src={collection.featuredImage}
              alt={collection.title}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-[#0a0a0a]/80 to-[#0a0a0a]" />
          </div>

          <div className="container relative z-10 mx-auto px-6 max-w-4xl text-center">
            <span className="text-brand-gold text-xs font-bold uppercase tracking-widest mb-4 block">Collection</span>
            <h1 className="text-5xl md:text-7xl font-serif text-white mb-6">{collection.title}</h1>
            <p className="text-lg md:text-xl text-brand-silver/90 leading-relaxed font-light max-w-2xl mx-auto">
              {collection.heroCopy}
            </p>
          </div>
        </section>

        {/* Editorial Text */}
        <section className="py-20">
          <div className="container mx-auto px-6 max-w-3xl">
            <p className="text-brand-silver/80 leading-relaxed text-lg text-center font-light">
              {collection.editorialText}
            </p>
          </div>
        </section>

        {/* Product Grid */}
        <section className="pb-24">
          <div className="container mx-auto px-6">
            <div className="flex justify-between items-end mb-12">
              <h2 className="text-3xl font-serif text-white">Pieces in This Collection</h2>
              <span className="text-brand-silver/60 text-sm">
                {products.length} {products.length === 1 ? "piece" : "pieces"}
              </span>
            </div>

            {products.length > 0 ? (
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
                {products.map((product) => (
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

        {/* Other Collections */}
        {otherCollections.length > 0 && (
          <section className="py-24 bg-[#050505] border-t border-white/5">
            <div className="container mx-auto px-6">
              <h2 className="text-3xl font-serif text-white mb-12 text-center">Explore Other Collections</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {otherCollections.map((c) => (
                  <Link
                    key={c.slug}
                    href={`/collections/${c.slug}`}
                    className="group relative aspect-[4/5] rounded-sm overflow-hidden border border-white/5 hover:border-white/15 transition-colors"
                  >
                    <Image src={c.featuredImage} alt={c.title} fill sizes="25vw" className="object-cover transition-transform duration-500 group-hover:scale-[1.03]" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <h3 className="text-lg font-serif text-white group-hover:text-brand-gold transition-colors">{c.title}</h3>
                      <span className="inline-flex items-center text-xs text-brand-gold mt-1">
                        View <ArrowRight className="w-3 h-3 ml-1" />
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </>
  );
}
