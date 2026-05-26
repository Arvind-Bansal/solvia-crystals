export interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  rating: number;
  reviewsCount: number;
  description: string;
  meaning: string;
  intention: string;
  chakra: string;
  zodiac: string[];
  materials: string[];
  careInstructions: string;
  images: {
    primary: string;
    hover?: string;
    gallery: string[];
  };
  isBestseller: boolean;
  inStock: boolean;
  relatedProductIds: string[];
}

export interface Review {
  id: string;
  productId: string;
  authorName: string;
  rating: number;
  content: string;
  createdAt: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string; // Markdown or HTML
  publishedAt: string;
  author: string;
  category: string;
  coverImage: string;
}

export interface SEOProps {
  title?: string;
  description?: string;
  canonicalUrl?: string;
  ogImage?: string;
}
