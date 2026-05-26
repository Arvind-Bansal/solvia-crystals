import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ProductCard } from "@/components/product/ProductCard";
import { mockProducts, getProductBySlug } from "@/data/mockProducts";
import { ProductActions } from "@/components/product/ProductActions";
import { Star, ShieldCheck, Sparkles, RefreshCcw, Truck } from "lucide-react";

export function generateStaticParams() {
  return mockProducts.map((product) => ({
    slug: product.slug,
  }));
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const relatedProducts = product.relatedProductIds
    .map(id => mockProducts.find(p => p.id === id))
    .filter((p): p is NonNullable<typeof p> => p !== undefined);

  return (
    <>
      <Navbar />
      <main className="pt-32 pb-24 bg-[#0a0a0a] min-h-screen">
        <div className="container mx-auto px-6">
          
          {/* Breadcrumbs */}
          <div className="text-xs text-brand-silver/60 uppercase tracking-widest mb-8 flex items-center space-x-2">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <Link href="/shop" className="hover:text-white transition-colors">Shop</Link>
            <span>/</span>
            <span className="text-brand-gold">{product.name}</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 mb-24">
            {/* Gallery */}
            <div className="space-y-4">
              <div className="relative aspect-[4/5] bg-[#121212] rounded-sm overflow-hidden border border-white/5">
                <Image 
                  src={product.images.primary} 
                  alt={product.name} 
                  fill 
                  priority
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover" 
                />
              </div>
              {product.images.gallery.length > 1 && (
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {product.images.gallery.map((img, idx) => (
                    <div key={idx} className="relative aspect-square bg-[#121212] rounded-sm overflow-hidden border border-white/5 cursor-pointer hover:border-brand-gold transition-colors">
                      <Image src={img} alt={`${product.name} ${idx + 1}`} fill className="object-cover" />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Details */}
            <div className="flex flex-col">
              <div className="mb-6">
                <span className="text-xs text-brand-gold font-bold uppercase tracking-widest mb-2 block">
                  {product.intention} Collection
                </span>
                <h1 className="text-4xl lg:text-5xl font-serif text-white mb-4 leading-tight">{product.name}</h1>
                
                <div className="flex items-center space-x-4 mb-4">
                  <span className="text-2xl text-brand-silver font-medium">${product.price.toFixed(2)}</span>
                  <div className="flex items-center">
                    <div className="flex text-brand-gold mr-2">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'fill-current' : 'text-brand-silver/20'}`} />
                      ))}
                    </div>
                    <span className="text-sm text-brand-silver/60">({product.reviewsCount} reviews)</span>
                  </div>
                </div>
                
                <p className="text-brand-silver/80 leading-relaxed mb-8">
                  {product.description}
                </p>
              </div>

              {/* Add to Cart Actions */}
              <ProductActions product={product} />

              {/* Accordions */}
              <div className="space-y-6">
                <div className="pb-6 border-b border-white/10">
                  <h3 className="text-lg font-serif text-white flex items-center mb-3">
                    <Sparkles className="w-5 h-5 mr-3 text-brand-gold" /> Crystal Meaning & Lore
                  </h3>
                  <p className="text-sm text-brand-silver/70 leading-relaxed pl-8">
                    {product.meaning}
                  </p>
                  <p className="text-sm text-brand-silver/70 leading-relaxed pl-8 mt-2">
                    <span className="text-brand-silver font-medium">Chakra:</span> {product.chakra} <br/>
                    <span className="text-brand-silver font-medium">Zodiac:</span> {product.zodiac.join(', ')}
                  </p>
                </div>
                
                <div className="pb-6 border-b border-white/10">
                  <h3 className="text-lg font-serif text-white flex items-center mb-3">
                    <ShieldCheck className="w-5 h-5 mr-3 text-brand-gold" /> Materials & Care
                  </h3>
                  <ul className="text-sm text-brand-silver/70 leading-relaxed pl-8 list-disc ml-4 space-y-1 mb-3">
                    {product.materials.map(mat => (
                      <li key={mat}>{mat}</li>
                    ))}
                  </ul>
                  <p className="text-sm text-brand-silver/70 leading-relaxed pl-8">
                    {product.careInstructions}
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-serif text-white flex items-center mb-3">
                    <Truck className="w-5 h-5 mr-3 text-brand-gold" /> Shipping & Returns
                  </h3>
                  <p className="text-sm text-brand-silver/70 leading-relaxed pl-8 mb-2">
                    Free worldwide shipping on orders over $150. All pieces are cleansed with sage before dispatch.
                  </p>
                  <p className="text-sm text-brand-silver/70 leading-relaxed pl-8 flex items-center">
                    <RefreshCcw className="w-4 h-4 mr-2" /> 30-day money-back energetic guarantee.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <div className="pt-16 border-t border-white/10">
              <h2 className="text-3xl font-serif text-white mb-8 text-center">Complete Your Ritual</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {relatedProducts.map(related => (
                  <ProductCard key={related.id} product={related} />
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
