"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Minus, Plus, ShoppingBag } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { useCartStore } from "@/store/useCartStore";
import Link from "next/link";
import { useState, useEffect } from "react";

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  const { items, removeItem, updateQuantity, getCartTotal } = useCartStore();
  const subtotal = getCartTotal();
  const [mounted, setMounted] = useState(false);

  // Prevent hydration mismatch for persistent store
  useEffect(() => {
    // eslint-disable-next-line
    setMounted(true);
  }, []);

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
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />
          
          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-[#0a0a0a] border-l border-white/10 z-50 flex flex-col shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-white/10">
              <h2 className="text-xl font-serif text-white flex items-center">
                <ShoppingBag className="w-5 h-5 mr-3 text-brand-gold" />
                Your Cart {mounted && `(${items.reduce((acc, i) => acc + i.quantity, 0)})`}
              </h2>
              <button 
                onClick={onClose}
                className="text-brand-silver hover:text-white transition-colors p-1"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {!mounted ? null : items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <ShoppingBag className="w-12 h-12 text-brand-silver/20 mb-4" />
                  <p className="text-brand-silver text-lg mb-6">Your cart is empty.</p>
                  <Button onClick={onClose} variant="outline">Continue Shopping</Button>
                </div>
              ) : (
                items.map((item) => (
                  <div key={item.product.id} className="flex gap-4">
                    <Link href={`/product/${item.product.slug}`} onClick={onClose} className="relative w-24 h-24 rounded-sm overflow-hidden border border-white/5 flex-shrink-0 bg-[#121212]">
                      <Image src={item.product.images.primary} alt={item.product.name} fill className="object-cover" />
                    </Link>
                    <div className="flex flex-col flex-1">
                      <div className="flex justify-between items-start mb-1">
                        <Link href={`/product/${item.product.slug}`} onClick={onClose}>
                          <h3 className="text-white font-medium text-sm pr-4 hover:text-brand-gold transition-colors">{item.product.name}</h3>
                        </Link>
                        <button 
                          onClick={() => removeItem(item.product.id)}
                          className="text-brand-silver/50 hover:text-white transition-colors"
                          aria-label="Remove item"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                      <p className="text-brand-silver text-sm mb-auto">${item.product.price.toFixed(2)}</p>
                      
                      <div className="flex items-center border border-white/20 rounded-sm overflow-hidden h-8 w-24 mt-2">
                        <button 
                          onClick={() => updateQuantity(item.product.id, Math.max(1, item.quantity - 1))}
                          className="w-8 h-full flex items-center justify-center text-white hover:bg-white/5 transition-colors"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="flex-1 text-center text-white text-xs">{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          className="w-8 h-full flex items-center justify-center text-white hover:bg-white/5 transition-colors"
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
              <div className="p-6 border-t border-white/10 bg-[#121212]">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-brand-silver">Subtotal</span>
                  <span className="text-xl text-white font-medium">${subtotal.toFixed(2)}</span>
                </div>
                <p className="text-brand-silver/60 text-xs mb-6 text-center">Shipping, taxes, and discounts calculated at checkout.</p>
                <Button size="lg" className="w-full">
                  Proceed to Checkout
                </Button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
