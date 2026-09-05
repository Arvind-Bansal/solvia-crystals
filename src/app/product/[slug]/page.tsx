import { notFound } from "next/navigation";
import { ProductGallery } from "@/components/product/ProductGallery";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ProductCard } from "@/components/product/ProductCard";
import { getAllProducts, getProductBySlug, getRelatedProducts } from "@/data";
import { ProductActions } from "@/components/product/ProductActions";
import { TrackRecentView } from "@/components/product/TrackRecentView";
import { RecentlyViewed } from "@/components/product/RecentlyViewed";
import { StickyMobileCTA } from "@/components/product/StickyMobileCTA";
import { ReviewSection } from "@/components/product/ReviewSection";
import { Star, ShieldCheck, Sparkles, RefreshCcw, Truck, Layers } from "lucide-react";

import { constructMetadata, generateStructuredProductData } from "@/lib/seo";
import { formatPrice, FREE_SHIPPING_THRESHOLD } from "@/lib/currency";

export function generateStaticParams() {
  return getAllProducts().map((product) => ({
    slug: product.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return {};

  return constructMetadata({
    title: `${product.name} — ${product.subtitle}`,
    description: product.description,
    image: product.images.primary,
    canonicalUrl: `https://solviacrystals.com/product/${slug}`,
  });
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const jsonLd = generateStructuredProductData(product, `https://solviacrystals.com/product/${slug}`);
  const relatedProducts = getRelatedProducts(product.id);

  return (
    <>
      <Navbar />
      <main className="pt-32 pb-32 md:pb-24 bg-[#F8F5EF] min-h-screen text-[#262626]">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <TrackRecentView product={product} />
        <div className="container mx-auto px-6">
          
          {/* Breadcrumbs */}
          <div className="text-xs text-[#262626]/60 uppercase tracking-widest mb-8 flex items-center space-x-2">
            <Link href="/" className="hover:text-[#262626] transition-colors">Home</Link>
            <span>/</span>
            <Link href="/shop" className="hover:text-[#262626] transition-colors">Shop</Link>
            <span>/</span>
            <span className="text-brand-gold font-medium">{product.name}</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 mb-24">
            {/* Gallery */}
            <ProductGallery images={product.images} productName={product.name} />

            {/* Details */}
            <div className="flex flex-col">
              <div className="mb-6">
                <span className="text-xs text-brand-gold font-bold uppercase tracking-widest mb-2 block">
                  {product.intention} · Everyday Rituals
                </span>
                
                {/* Dual Naming Display */}
                <h1 className="text-4xl lg:text-5xl font-serif text-[#262626] mb-1 font-medium leading-tight uppercase tracking-wide">
                  {product.name}
                </h1>
                <p className="text-lg text-[#262626]/70 mb-4 font-sans tracking-wide">
                  {product.subtitle}
                </p>
                
                <div className="flex items-center space-x-4 mb-6">
                  <span className="text-2xl text-[#262626] font-medium">{formatPrice(product.price)}</span>
                  {product.reviewsCount > 0 && (
                    <div className="flex items-center">
                      <div className="flex text-brand-gold mr-2">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'fill-current' : 'text-[#262626]/20'}`} />
                        ))}
                      </div>
                      <span className="text-sm text-[#262626]/60">({product.reviewsCount} reviews)</span>
                    </div>
                  )}
                </div>
                
                <p className="text-[#262626]/80 leading-relaxed mb-8 text-base">
                  {product.description}
                </p>
              </div>

              {/* Add to Cart Actions */}
              <ProductActions product={product} />

              {/* Accordions */}
              <div className="space-y-6">
                <div className="pb-6 border-b border-[#262626]/10">
                  <h3 className="text-lg font-serif text-[#262626] flex items-center mb-3">
                    <Sparkles className="w-5 h-5 mr-3 text-brand-gold" /> Stone & Symbolism
                  </h3>
                  <p className="text-sm text-[#262626]/70 leading-relaxed pl-8">
                    {product.meaning}
                  </p>
                  {product.chakra !== "TODO" && (
                    <p className="text-sm text-[#262626]/70 leading-relaxed pl-8 mt-2">
                      <span className="text-[#262626] font-medium">Chakra:</span> {product.chakra} <br/>
                      {product.zodiac.length > 0 && (
                        <>
                          <span className="text-[#262626] font-medium">Zodiac:</span> {product.zodiac.join(', ')}
                        </>
                      )}
                    </p>
                  )}
                </div>
                
                <div className="pb-6 border-b border-[#262626]/10">
                  <h3 className="text-lg font-serif text-[#262626] flex items-center mb-3">
                    <ShieldCheck className="w-5 h-5 mr-3 text-brand-gold" /> Materials & Care
                  </h3>
                  <ul className="text-sm text-[#262626]/70 leading-relaxed pl-8 list-disc ml-4 space-y-1 mb-3">
                    {product.materials.map(mat => (
                      <li key={mat}>{mat}</li>
                    ))}
                  </ul>
                  <p className="text-sm text-[#262626]/70 leading-relaxed pl-8">
                    {product.careInstructions}
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-serif text-[#262626] flex items-center mb-3">
                    <Truck className="w-5 h-5 mr-3 text-brand-gold" /> Shipping & Returns
                  </h3>
                  <p className="text-sm text-[#262626]/70 leading-relaxed pl-8 mb-2">
                    Complimentary shipping on orders over {formatPrice(FREE_SHIPPING_THRESHOLD)}. Each piece is inspected and carefully packaged before dispatch.
                  </p>
                  <p className="text-sm text-[#262626]/70 leading-relaxed pl-8 flex items-center">
                    <RefreshCcw className="w-4 h-4 mr-2" /> 30-day hassle-free returns in original condition.
                  </p>
                </div>
              </div>

              {/* Styling Notes */}
              {product.stylingNote && (
                <div className="mt-8 p-6 bg-[#F2EDE4] border border-[#262626]/10 rounded-sm">
                  <h3 className="text-lg font-serif text-[#262626] flex items-center mb-3">
                    <Layers className="w-5 h-5 mr-3 text-brand-gold" /> How to Wear
                  </h3>
                  <p className="text-sm text-[#262626]/70 leading-relaxed pl-8">
                    {product.stylingNote}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <div className="pt-16 border-t border-[#262626]/10">
              <h2 className="text-3xl font-serif text-[#262626] mb-8 text-center">You May Also Like</h2>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
                {relatedProducts.map(related => (
                  <ProductCard key={related.id} product={related} />
                ))}
              </div>
            </div>
          )}

          {/* Reviews */}
          <ReviewSection productName={`${product.name} (${product.subtitle})`} />

          {/* Recently Viewed */}
          <RecentlyViewed excludeId={product.id} />
        </div>
      </main>
      <Footer />
      <StickyMobileCTA product={product} />
    </>
  );
}
