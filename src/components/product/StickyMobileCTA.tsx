"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Product } from "@/types";
import { useCartStore } from "@/store/useCartStore";
import { toast } from "sonner";
import { ShoppingBag } from "lucide-react";
import { analytics } from "@/lib/analytics";
import { formatPrice } from "@/lib/currency";

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
      className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-[#F8F5EF]/95 backdrop-blur-md border-t border-[#262626]/10 shadow-lg safe-area-pb"
    >
      <div className="flex items-center justify-between gap-4 px-4 py-3">
        <div className="min-w-0">
          <p className="text-[#262626] font-serif font-medium text-sm truncate uppercase tracking-wide">{product.name}</p>
          <p className="text-[#262626]/70 text-xs truncate">{product.subtitle} · {formatPrice(product.price)}</p>
        </div>
        <Button
          size="sm"
          className="flex-shrink-0 min-w-[120px] text-xs h-10"
          disabled={!product.inStock}
          onClick={handleAddToCart}
        >
          {product.inStock ? (
            <>
              <ShoppingBag className="w-3.5 h-3.5 mr-1.5" /> Add
            </>
          ) : (
            "Sold Out"
          )}
        </Button>
      </div>
    </motion.div>
  );
}
