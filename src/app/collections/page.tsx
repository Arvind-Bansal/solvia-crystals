import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { getAllCollections } from "@/data";
import { constructMetadata } from "@/lib/seo";
import { ArrowRight } from "lucide-react";

export const metadata = constructMetadata({
  title: "Collections | Solvia Crystals",
  description: "Explore our curated crystal bracelet collections — each one grouped by intention, energy, and design philosophy.",
  canonicalUrl: "https://solviacrystals.com/collections",
});

export default function CollectionsPage() {
  const collections = getAllCollections();

  return (
    <>
      <Navbar />
      <main className="bg-[#0a0a0a] min-h-screen pt-32 pb-24">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mb-16">
            <h1 className="text-4xl md:text-5xl font-serif text-white mb-4">Collections</h1>
            <p className="text-lg text-brand-silver/80 leading-relaxed">
              Each collection is curated around a single intention — a shared thread that connects every piece within it.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {collections.map((collection) => (
              <Link
                key={collection.slug}
                href={`/collections/${collection.slug}`}
                className="group relative aspect-[16/10] rounded-sm overflow-hidden border border-white/5 hover:border-white/15 transition-colors"
              >
                <Image
                  src={collection.featuredImage}
                  alt={collection.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                  <h2 className="text-2xl md:text-3xl font-serif text-white mb-2 group-hover:text-brand-gold transition-colors">
                    {collection.title}
                  </h2>
                  <p className="text-sm text-brand-silver/80 mb-4 line-clamp-2">
                    {collection.description}
                  </p>
                  <span className="inline-flex items-center text-sm font-medium text-brand-gold group-hover:text-white transition-colors">
                    Explore Collection <ArrowRight className="w-4 h-4 ml-2" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
