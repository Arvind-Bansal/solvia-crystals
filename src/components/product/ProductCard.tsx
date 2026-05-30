"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Heart, ShoppingBag, Star } from "lucide-react";
import { motion } from "framer-motion";
import { Product } from "@/types";
import { useCartStore } from "@/store/useCartStore";
import { useWishlistStore } from "@/store/useWishlistStore";
import { toast } from "sonner";
import { Button } from "@/components/ui/Button";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const [imgSrc, setImgSrc] = useState(product.images.primary);
  const { addItem: addToCart } = useCartStore();
  const { addItem: addToWishlist, removeItem: removeFromWishlist, hasItem } = useWishlistStore();
  
  const isWishlisted = hasItem(product.id);

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isWishlisted) {
      removeFromWishlist(product.id);
      toast("Removed from wishlist");
    } else {
      addToWishlist(product);
      toast.success("Added to wishlist");
    }
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!product.inStock) return;
    addToCart(product);
    toast.success(`${product.name} added to cart`);
  };

  return (
    <motion.div
      className="group flex flex-col bg-[#121212] rounded-sm overflow-hidden border border-white/5 hover:border-white/15 transition-colors duration-500 h-full"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <Link href={`/product/${product.slug}`} className="relative block aspect-[4/5] overflow-hidden bg-[#1a1a1a]">
        <Image
          src={imgSrc}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 group-hover:scale-[1.02]"
          onError={() => {
            setImgSrc("https://images.unsplash.com/photo-1599643477877-530eb83abc8e?q=80&w=800&auto=format&fit=crop");
          }}
        />
        
        {/* Badges */}
        <div className="absolute top-4 left-4 flex flex-col gap-2 z-20">
          {product.isBestseller && (
            <span className="bg-brand-gold text-brand-black text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-sm">
              Bestseller
            </span>
          )}
          {!product.inStock && (
            <span className="bg-white/10 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-sm">
              Sold Out
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={handleWishlist}
          className="absolute top-4 right-4 p-2 bg-black/40 backdrop-blur-sm rounded-full text-brand-silver hover:text-brand-gold hover:bg-black/60 transition-all z-20"
          aria-label="Toggle wishlist"
        >
          <Heart className={`w-4 h-4 ${isWishlisted ? "fill-brand-gold text-brand-gold" : ""}`} />
        </button>

        {/* Quick Add Overlay */}
        <div className="absolute bottom-0 left-0 w-full p-4 translate-y-0 md:translate-y-full md:group-hover:translate-y-0 transition-transform duration-300 ease-out z-20 bg-gradient-to-t from-black/80 to-transparent">
          <Button 
            className="w-full h-10 text-xs shadow-lg" 
            size="sm" 
            onClick={handleAddToCart}
            disabled={!product.inStock}
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
      </Link>

      {/* Content */}
      <div className="p-4 flex flex-col flex-1">
        <div className="flex justify-between items-start mb-2">
          <div>
            <p className="text-[10px] text-brand-gold uppercase tracking-wider mb-1 font-medium">{product.intention}</p>
            <Link href={`/product/${product.slug}`}>
              <h3 className="text-base font-serif text-white group-hover:text-brand-gold transition-colors line-clamp-1">
                {product.name}
              </h3>
            </Link>
          </div>
          <span className="text-brand-silver font-medium">${product.price.toFixed(2)}</span>
        </div>
        
        <div className="flex items-center space-x-1 mt-auto pt-2">
          <div className="flex text-brand-gold">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className={`w-3.5 h-3.5 ${i < Math.floor(product.rating) ? 'fill-current' : 'text-brand-silver/20'}`} />
            ))}
          </div>
          <span className="text-xs text-brand-silver/60 ml-2">({product.reviewsCount})</span>
        </div>
      </div>
    </motion.div>
  );
}
