"use client";

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ProductCard } from "@/components/product/ProductCard";
import { EmptyState } from "@/components/ui/EmptyState";
import { useWishlistStore } from "@/store/useWishlistStore";
import { Heart } from "lucide-react";
import { useState, useEffect } from "react";

export default function WishlistPage() {
  const { items } = useWishlistStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      <Navbar />
      <main className="pt-32 pb-24 bg-[#0a0a0a] min-h-screen">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mb-12">
            <h1 className="text-4xl md:text-5xl font-serif text-white mb-4">Wishlist</h1>
            <p className="text-brand-silver/80">
              {mounted && items.length > 0
                ? `${items.length} ${items.length === 1 ? "piece" : "pieces"} saved`
                : "Pieces you\u2019ve been drawn to."}
            </p>
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
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
              {items.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
