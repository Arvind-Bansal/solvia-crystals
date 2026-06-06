import { Product } from '@/types';
import { products, getProductsByIds } from './products';

export function getBestsellers(limit = 4): Product[] {
  return products.filter(p => p.isBestseller).slice(0, limit);
}

export function getRelatedProducts(productId: string): Product[] {
  const product = products.find(p => p.id === productId);
  if (!product) return [];
  return getProductsByIds(product.relatedProductIds);
}

export function getFeaturedHeroProduct(): Product | undefined {
  // Returns the highest-rated bestseller for hero placement
  return products
    .filter(p => p.isBestseller && p.inStock)
    .sort((a, b) => b.rating - a.rating)[0];
}
