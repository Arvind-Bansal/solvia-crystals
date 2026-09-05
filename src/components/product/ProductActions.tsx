"use client";

import { Button } from "@/components/ui/Button";
import { ShieldCheck, Heart } from "lucide-react";
import { Product } from "@/types";
import { useCartStore } from "@/store/useCartStore";
import { useWishlistStore } from "@/store/useWishlistStore";
import { toast } from "sonner";
import { analytics } from "@/lib/analytics";

export function ProductActions({ product }: { product: Product }) {
  const { addItem: addToCart } = useCartStore();
  const { addItem: addToWishlist, removeItem: removeFromWishlist, hasItem } = useWishlistStore();
  
  const isWishlisted = hasItem(product.id);

  const handleAddToCart = () => {
    addToCart(product);
    analytics.track({ name: "add_to_cart", properties: { productId: product.id, name: product.name, price: product.price } });
    toast.success(`${product.name} added to cart`);
  };

  const handleWishlist = () => {
    if (isWishlisted) {
      removeFromWishlist(product.id);
      analytics.track({ name: "remove_from_wishlist", properties: { productId: product.id } });
      toast("Removed from wishlist");
    } else {
      addToWishlist(product);
      analytics.track({ name: "add_to_wishlist", properties: { productId: product.id, name: product.name } });
      toast.success("Added to wishlist");
    }
  };

  return (
    <div className="p-6 border border-[#262626]/10 bg-[#F2EDE4] rounded-sm mb-12 relative shadow-xs">
      <button
        onClick={handleWishlist}
        className="absolute top-4 right-4 p-2 bg-white/80 backdrop-blur-sm rounded-full text-[#262626] hover:text-brand-gold hover:bg-white transition-all z-10 shadow-xs"
        aria-label="Toggle wishlist"
      >
        <Heart className={`w-5 h-5 ${isWishlisted ? "fill-brand-gold text-brand-gold" : ""}`} />
      </button>

      <Button 
        className="w-full mb-4" 
        size="lg" 
        disabled={!product.inStock}
        onClick={handleAddToCart}
      >
        {product.inStock ? "Add to Cart" : "Sold Out"}
      </Button>
      
      <p className="text-xs text-center text-[#262626]/70">
        <ShieldCheck className="w-4 h-4 inline mr-1 text-brand-gold" /> 
        Ethically sourced stones. Designed for everyday wear.
      </p>
    </div>
  );
}
