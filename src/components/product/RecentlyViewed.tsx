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
    <div className="pt-16 border-t border-[#262626]/10 mt-16">
      <h2 className="text-2xl font-serif text-[#262626] mb-8 text-center">
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
            <div className="relative aspect-square rounded-sm overflow-hidden bg-[#F2EDE4] border border-[#262626]/10 group-hover:border-brand-gold/50 transition-colors mb-3">
              <Image
                src={product.images.primary}
                alt={product.name}
                fill
                sizes="(max-width: 768px) 180px, 25vw"
                className="object-cover group-hover:scale-[1.03] transition-transform duration-500"
              />
            </div>
            <p className="text-[10px] text-brand-gold uppercase tracking-wider mb-0.5 font-medium">{product.intention}</p>
            <h3 className="text-sm font-serif font-medium text-[#262626] group-hover:text-brand-gold transition-colors uppercase tracking-wide">{product.name}</h3>
            <p className="text-xs text-[#262626]/70 mb-1">{product.subtitle}</p>
            <span className="text-sm font-medium text-[#262626]">{formatPrice(product.price)}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
