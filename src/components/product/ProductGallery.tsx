"use client";

import { useState } from "react";
import { ProductImage } from "@/components/ui/ProductImage";
import { ProductImages } from "@/types";

interface ProductGalleryProps {
  images: ProductImages;
  productName: string;
}

export function ProductGallery({ images, productName }: ProductGalleryProps) {
  const allImages = [images.primary, ...images.gallery.filter(img => img !== images.primary)];
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <div className="relative aspect-[4/5] bg-[#F2EDE4] rounded-sm overflow-hidden border border-[#262626]/10 shadow-xs">
        <ProductImage
          src={allImages[activeIndex]}
          alt={productName}
          fill
          priority
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover"
        />
      </div>

      {/* Thumbnails */}
      {allImages.length > 1 && (
        <div
          className="flex md:grid md:grid-cols-4 gap-3 md:gap-4 overflow-x-auto md:overflow-visible pb-2 md:pb-0 scrollbar-hide -mx-6 px-6 md:mx-0 md:px-0"
          role="tablist"
          aria-label="Product images"
        >
          {allImages.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setActiveIndex(idx)}
              onKeyDown={(e) => {
                if (e.key === "ArrowRight") setActiveIndex((idx + 1) % allImages.length);
                if (e.key === "ArrowLeft") setActiveIndex((idx - 1 + allImages.length) % allImages.length);
              }}
              role="tab"
              aria-selected={activeIndex === idx}
              aria-label={`View image ${idx + 1} of ${allImages.length}`}
              className={`relative flex-shrink-0 w-20 h-20 md:w-auto md:h-auto md:aspect-square bg-[#F2EDE4] rounded-sm overflow-hidden border-2 cursor-pointer transition-colors ${
                activeIndex === idx
                  ? "border-brand-gold"
                  : "border-[#262626]/10 hover:border-[#262626]/30"
              }`}
            >
              <ProductImage
                src={img}
                alt={`${productName} ${idx + 1}`}
                fill
                sizes="(max-width: 640px) 80px, 12.5vw"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
