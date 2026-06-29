"use client";

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { EmptyState } from "@/components/ui/EmptyState";
import { ProductImage } from "@/components/ui/ProductImage";
import { Button } from "@/components/ui/Button";
import { useWishlistStore } from "@/store/useWishlistStore";
import { useCartStore } from "@/store/useCartStore";
import { analytics } from "@/lib/analytics";
import { formatPrice } from "@/lib/currency";
import { Heart, ShoppingBag, Trash2, ArrowRight } from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function WishlistPage() {
  const { items, removeItem: removeFromWishlist } = useWishlistStore();
  const { addItem: addToCart } = useCartStore();
  const [mounted, setMounted] = useState(false);

  /* eslint-disable react-hooks/set-state-in-effect */
  useEffect(() => {
    setMounted(true);
  }, []);
  /* eslint-enable react-hooks/set-state-in-effect */

  const handleAddToCart = (product: (typeof items)[0]) => {
    addToCart(product);
    analytics.track({ name: "add_to_cart", properties: { productId: product.id, name: product.name, price: product.price, source: "wishlist" } });
    toast.success(`${product.name} added to cart`);
  };

  const handleRemove = (product: (typeof items)[0]) => {
    removeFromWishlist(product.id);
    analytics.track({ name: "remove_from_wishlist", properties: { productId: product.id } });
    toast("Removed from wishlist");
  };

  const handleMoveToCart = (product: (typeof items)[0]) => {
    addToCart(product);
    removeFromWishlist(product.id);
    analytics.track({ name: "add_to_cart", properties: { productId: product.id, name: product.name, price: product.price, source: "wishlist_move" } });
    toast.success(`${product.name} moved to cart`);
  };

  return (
    <>
      <Navbar />
      <main className="pt-32 pb-24 bg-[#0a0a0a] min-h-screen">
        <div className="container mx-auto px-6">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12">
            <div>
              <h1 className="text-4xl md:text-5xl font-serif text-white mb-2">Wishlist</h1>
              <p className="text-brand-silver/80">
                {mounted && items.length > 0
                  ? `${items.length} ${items.length === 1 ? "piece" : "pieces"} saved`
                  : "Pieces you\u2019ve been drawn to."}
              </p>
            </div>
            {mounted && items.length > 0 && (
              <Link href="/shop">
                <Button variant="outline" className="flex-shrink-0">
                  Continue Shopping <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            )}
          </div>

          {!mounted ? null : items.length === 0 ? (
            <EmptyState
              icon={Heart}
              title="Your wishlist is empty"
              description="Tap the heart on any piece to save it here for later."
              cta={{ label: "Browse Collection", href: "/shop" }}
              className="border border-white/5 rounded-sm bg-[#121212]"
            />
          ) : (
            <div className="space-y-4">
              <AnimatePresence mode="popLayout">
                {items.map((product) => (
                  <motion.div
                    key={product.id}
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -20, transition: { duration: 0.2 } }}
                    className="flex gap-4 md:gap-6 p-4 md:p-5 bg-[#121212] border border-white/5 rounded-sm hover:border-white/10 transition-colors"
                  >
                    {/* Product Image */}
                    <Link href={`/product/${product.slug}`} className="relative w-24 h-24 md:w-32 md:h-32 rounded-sm overflow-hidden border border-white/5 flex-shrink-0 bg-[#1a1a1a]">
                      <ProductImage
                        src={product.images.primary}
                        alt={product.name}
                        fill
                        sizes="(max-width: 768px) 96px, 128px"
                        className="object-cover"
                      />
                    </Link>

                    {/* Product Info */}
                    <div className="flex-1 min-w-0 flex flex-col">
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <Link href={`/product/${product.slug}`} className="hover:text-brand-gold transition-colors">
                          <h3 className="text-white font-serif text-base md:text-lg leading-tight">{product.name}</h3>
                        </Link>
                        <button
                          onClick={() => handleRemove(product)}
                          aria-label={`Remove ${product.name} from wishlist`}
                          className="text-brand-silver/40 hover:text-red-400 transition-colors flex-shrink-0 p-1"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <p className="text-sm text-brand-silver/60 mb-1 hidden md:block">{product.intention} · {product.collection}</p>
                      <p className="text-brand-gold font-medium mb-auto">{formatPrice(product.price)}</p>

                      {/* Action Buttons */}
                      <div className="flex items-center gap-2 mt-3">
                        <Button
                          size="sm"
                          className="text-xs"
                          disabled={!product.inStock}
                          onClick={() => handleMoveToCart(product)}
                        >
                          <ShoppingBag className="w-3.5 h-3.5 mr-1.5" />
                          {product.inStock ? "Move to Cart" : "Sold Out"}
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-xs"
                          onClick={() => handleAddToCart(product)}
                          disabled={!product.inStock}
                        >
                          Add to Cart
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
