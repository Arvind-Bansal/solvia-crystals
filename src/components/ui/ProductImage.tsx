"use client";

import Image, { ImageProps } from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { FALLBACK_IMAGE, BLUR_PLACEHOLDER } from "@/lib/images";

interface ProductImageProps extends Omit<ImageProps, "onError"> {
  fallbackSrc?: string;
}

/**
 * Wrapper around next/image with:
 * - Built-in blur placeholder
 * - Graceful error fallback (branded placeholder, not broken image)
 * - Consistent loading animation (subtle fade-in)
 */
export function ProductImage({
  src,
  alt,
  fallbackSrc,
  className,
  ...props
}: ProductImageProps) {
  const [imgSrc, setImgSrc] = useState(src);
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <Image
      src={imgSrc}
      alt={alt}
      className={cn(
        "transition-opacity duration-500",
        isLoaded ? "opacity-100" : "opacity-0",
        className
      )}
      placeholder="blur"
      blurDataURL={BLUR_PLACEHOLDER}
      onLoad={() => setIsLoaded(true)}
      onError={() => setImgSrc(fallbackSrc || FALLBACK_IMAGE)}
      {...props}
    />
  );
}
