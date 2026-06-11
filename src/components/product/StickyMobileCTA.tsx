"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Product } from "@/types";
import { useCartStore } from "@/store/useCartStore";
import { toast } from "sonner";
import { ShoppingBag } from "lucide-react";
import { analytics } from "@/lib/analytics";

export function StickyMobileCTA({ product }: { product: Product }) {
  const { addItem: addToCart } = useCartStore();

  const handleAddToCart = () => {
    addToCart(product);
    analytics.track({ name: "add_to_cart", properties: { productId: product.id, name: product.name, price: product.price, source: "mobile_cta" } });
    toast.success(`${product.name} added to cart`);
  };

  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.5, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-[#0a0a0a]/95 backdrop-blur-md border-t border-white/10 shadow-[0_-4px_20px_rgba(0,0,0,0.4)] safe-area-pb"
    >
      <div className="flex items-center justify-between gap-4 px-4 py-3">
        <div className="min-w-0">
          <p className="text-white font-serif text-base truncate">{product.name}</p>
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
    </motion.div>
  );
}
