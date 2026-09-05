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
      <main className="bg-[#F8F5EF] min-h-screen text-[#262626]">
        {/* Hero */}
        <section className="relative pt-40 pb-32 border-b border-[#262626]/10 bg-[#F2EDE4]">
          {collection.featuredImage && (
            <div className="absolute inset-0 z-0 opacity-20">
              <Image
                src={collection.featuredImage}
                alt={collection.title}
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-b from-[#F8F5EF] via-[#F8F5EF]/80 to-[#F8F5EF]" />
            </div>
          )}

          <div className="container relative z-10 mx-auto px-6 max-w-4xl text-center">
            <span className="text-brand-gold text-xs font-bold uppercase tracking-widest mb-4 block">Collection</span>
            <h1 className="text-5xl md:text-7xl font-serif text-[#262626] mb-6 font-medium">{collection.title}</h1>
            <p className="text-lg md:text-xl text-[#262626]/80 leading-relaxed font-light max-w-2xl mx-auto">
              {collection.heroCopy}
            </p>
          </div>
        </section>

        {/* Editorial Text */}
        {collection.editorialText && (
          <section className="py-20">
            <div className="container mx-auto px-6 max-w-3xl">
              <p className="text-[#262626]/80 leading-relaxed text-lg text-center font-light">
                {collection.editorialText}
              </p>
            </div>
          </section>
        )}

        {/* Product Grid */}
        <section className="pb-24">
          <div className="container mx-auto px-6">
            <div className="flex justify-between items-end mb-12">
              <h2 className="text-3xl font-serif text-[#262626] font-medium">Pieces in This Collection</h2>
              <span className="text-[#262626]/60 text-sm">
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
              <p className="text-center text-[#262626]/60 py-12 border border-[#262626]/10 bg-white rounded-sm">
                New pieces for this collection are currently in production.
              </p>
            )}
          </div>
        </section>

        {/* Other Collections */}
        {otherCollections.length > 0 && (
          <section className="py-24 bg-[#F2EDE4] border-t border-[#262626]/10">
            <div className="container mx-auto px-6">
              <h2 className="text-3xl font-serif text-[#262626] mb-12 text-center font-medium">Explore Other Collections</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {otherCollections.map((c) => (
                  <Link
                    key={c.slug}
                    href={`/collections/${c.slug}`}
                    className="group relative aspect-[4/5] rounded-sm overflow-hidden border border-[#262626]/10 hover:border-brand-gold/50 transition-colors bg-white shadow-xs"
                  >
                    {c.featuredImage && (
                      <Image src={c.featuredImage} alt={c.title} fill sizes="25vw" className="object-cover transition-transform duration-500 group-hover:scale-[1.03]" />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-white/90 via-white/40 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <h3 className="text-lg font-serif text-[#262626] group-hover:text-brand-gold transition-colors font-medium">{c.title}</h3>
                      <span className="inline-flex items-center text-xs text-brand-gold mt-1 font-medium">
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
