"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Minus, Plus, ShoppingBag } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";
import { useCartStore } from "@/store/useCartStore";
import Link from "next/link";
import { useState, useEffect } from "react";
import { analytics } from "@/lib/analytics";
import { formatPrice } from "@/lib/currency";

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  const { items, removeItem, updateQuantity, getCartTotal } = useCartStore();
  const subtotal = getCartTotal();
  const [mounted, setMounted] = useState(false);

  /* eslint-disable react-hooks/set-state-in-effect */
  useEffect(() => {
    setMounted(true);
  }, []);
  /* eslint-enable react-hooks/set-state-in-effect */

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#262626]/40 backdrop-blur-sm z-50"
          />
          
          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-[#F8F5EF] border-l border-[#262626]/10 z-50 flex flex-col shadow-2xl"
            role="dialog"
            aria-modal="true"
            aria-label="Shopping cart"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-[#262626]/10">
              <h2 className="text-xl font-serif text-[#262626] flex items-center">
                <ShoppingBag className="w-5 h-5 mr-3 text-brand-gold" />
                Your Cart {mounted && `(${items.reduce((acc, i) => acc + i.quantity, 0)})`}
              </h2>
              <button 
                onClick={onClose}
                className="text-[#262626]/60 hover:text-[#262626] transition-colors p-1"
                aria-label="Close cart"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {!mounted ? null : items.length === 0 ? (
                <EmptyState
                  icon={ShoppingBag}
                  title="Your cart is empty"
                  description="You haven't added any pieces yet. Find something that speaks to you."
                  cta={{ label: "Continue Shopping", onClick: onClose }}
                />
              ) : (
                items.map((item) => (
                  <div key={item.product.id} className="flex gap-4 items-center">
                    <Link href={`/product/${item.product.slug}`} onClick={onClose} className="relative w-20 h-24 rounded-sm overflow-hidden border border-[#262626]/10 flex-shrink-0 bg-[#F2EDE4]">
                      <Image src={item.product.images.primary} alt={item.product.name} fill className="object-cover" />
                    </Link>
                    <div className="flex flex-col flex-1">
                      <div className="flex justify-between items-start mb-1">
                        <Link href={`/product/${item.product.slug}`} onClick={onClose}>
                          <h3 className="text-[#262626] font-serif font-medium text-sm pr-2 hover:text-brand-gold transition-colors uppercase tracking-wide">
                            {item.product.name}
                          </h3>
                          <p className="text-xs text-[#262626]/70 mt-0.5">{item.product.subtitle}</p>
                        </Link>
                        <button 
                          onClick={() => {
                            analytics.track({ name: "remove_from_cart", properties: { productId: item.product.id, name: item.product.name } });
                            removeItem(item.product.id);
                          }}
                          className="text-[#262626]/40 hover:text-[#262626] transition-colors"
                          aria-label="Remove item"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                      <p className="text-[#262626] font-medium text-sm my-1">{formatPrice(item.product.price)}</p>
                      
                      <div className="flex items-center border border-[#262626]/20 rounded-sm overflow-hidden h-8 w-24 mt-1 bg-white">
                        <button 
                          onClick={() => updateQuantity(item.product.id, Math.max(1, item.quantity - 1))}
                          className="w-8 h-full flex items-center justify-center text-[#262626] hover:bg-[#F2EDE4] transition-colors"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="flex-1 text-center text-[#262626] text-xs font-medium">{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          className="w-8 h-full flex items-center justify-center text-[#262626] hover:bg-[#F2EDE4] transition-colors"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer / Checkout */}
            {mounted && items.length > 0 && (
              <div className="p-6 border-t border-[#262626]/10 bg-[#F2EDE4]">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-[#262626]/80 text-sm">Subtotal</span>
                  <span className="text-xl text-[#262626] font-medium">{formatPrice(subtotal)}</span>
                </div>
                <p className="text-[#262626]/60 text-xs mb-6 text-center">Shipping and taxes calculated at checkout.</p>
                <Link href="/checkout" onClick={onClose}>
                  <Button size="lg" className="w-full">
                    Proceed to Checkout
                  </Button>
                </Link>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
