"use client";

import { useRecentStore } from "@/store/useRecentStore";
import { formatPrice } from "@/lib/currency";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

interface RecentlyViewedProps {
  /** Exclude a product ID (e.g. the currently viewed product) */
  excludeId?: string;
  /** Max items to display */
  limit?: number;
}

export function RecentlyViewed({ excludeId, limit = 4 }: RecentlyViewedProps) {
  const { items } = useRecentStore();
  const [mounted, setMounted] = useState(false);

  /* eslint-disable react-hooks/set-state-in-effect */
  useEffect(() => {
    setMounted(true);
  }, []);
  /* eslint-enable react-hooks/set-state-in-effect */

  if (!mounted) return null;

  const recentItems = items
    .filter((item) => item.id !== excludeId)
    .slice(0, limit);

  if (recentItems.length === 0) return null;

  return (
    <div className="pt-16 border-t border-white/10 mt-16">
      <h2 className="text-2xl font-serif text-white mb-8 text-center">
        Recently Viewed
      </h2>
      {/* Horizontal scroll on mobile, grid on desktop */}
      <div className="flex md:grid md:grid-cols-4 gap-4 md:gap-6 overflow-x-auto md:overflow-visible pb-4 md:pb-0 scrollbar-hide -mx-6 px-6 md:mx-0 md:px-0">
        {recentItems.map((product) => (
          <Link
            key={product.id}
            href={`/product/${product.slug}`}
            className="group flex-shrink-0 w-[180px] md:w-auto"
          >
            <div className="relative aspect-square rounded-sm overflow-hidden bg-[#121212] border border-white/5 group-hover:border-white/15 transition-colors mb-3">
              <Image
                src={product.images.primary}
                alt={product.name}
                fill
                sizes="(max-width: 768px) 180px, 25vw"
                className="object-cover group-hover:scale-[1.03] transition-transform duration-500"
              />
            </div>
            <p className="text-xs text-brand-gold uppercase tracking-wider mb-1 font-medium">{product.intention}</p>
            <h3 className="text-sm font-serif text-white group-hover:text-brand-gold transition-colors">{product.name}</h3>
            <span className="text-sm text-brand-silver/60">{formatPrice(product.price)}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
