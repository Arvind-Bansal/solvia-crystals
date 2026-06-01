"use client";

import { Button } from "@/components/ui/Button";
import { Product } from "@/types";
import { useCartStore } from "@/store/useCartStore";
import { toast } from "sonner";
import { ShoppingBag } from "lucide-react";

export function StickyMobileCTA({ product }: { product: Product }) {
  const { addItem: addToCart } = useCartStore();

  const handleAddToCart = () => {
    addToCart(product);
    toast.success(`${product.name} added to cart`);
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-[#0a0a0a]/95 backdrop-blur-md border-t border-white/10 p-4 safe-area-pb">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-white font-serif text-base">{product.name}</p>
          <p className="text-brand-silver/80 text-sm">${product.price.toFixed(2)}</p>
        </div>
        <Button
          size="lg"
          className="flex-shrink-0 min-w-[140px]"
          disabled={!product.inStock}
          onClick={handleAddToCart}
        >
          {product.inStock ? (
            <>
              <ShoppingBag className="w-4 h-4 mr-2" /> Add to Cart
            </>
          ) : (
            "Sold Out"
          )}
        </Button>
      </div>
    </div>
  );
}
