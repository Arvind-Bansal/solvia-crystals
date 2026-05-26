import { Metadata } from "next";

const siteName = "Solvia Crystals";
const defaultDescription = "Premium crystal bracelets designed with intention, elegance, and high vibrations for the modern mystic.";
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export function constructMetadata({
  title,
  description = defaultDescription,
  image = "/og-image.jpg",
  noIndex = false,
  canonicalUrl,
}: {
  title?: string;
  description?: string;
  image?: string;
  noIndex?: boolean;
  canonicalUrl?: string;
} = {}): Metadata {
  return {
    title: title ? `${title} | ${siteName}` : siteName,
    description,
    openGraph: {
      title: title ? `${title} | ${siteName}` : siteName,
      description,
      url: canonicalUrl || siteUrl,
      siteName,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
        },
      ],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: title ? `${title} | ${siteName}` : siteName,
      description,
      images: [image],
    },
    robots: {
      index: !noIndex,
      follow: !noIndex,
    },
    alternates: {
      canonical: canonicalUrl || siteUrl,
    },
  };
}

export function generateStructuredProductData(product: any, url: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": product.name,
    "image": product.images.primary,
    "description": product.description,
    "sku": product.id,
    "brand": {
      "@type": "Brand",
      "name": siteName
    },
    "offers": {
      "@type": "Offer",
      "url": url,
      "priceCurrency": "USD",
      "price": product.price,
      "itemCondition": "https://schema.org/NewCondition",
      "availability": product.inStock ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
      "seller": {
        "@type": "Organization",
        "name": siteName
      }
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": product.rating,
      "reviewCount": product.reviewsCount
    }
  };
}

export function generateStructuredArticleData(article: any, url: string) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": url
    },
    "headline": article.title,
    "image": article.image,
    "datePublished": article.date,
    "author": {
      "@type": "Organization",
      "name": siteName
    },
    "publisher": {
      "@type": "Organization",
      "name": siteName,
      "logo": {
        "@type": "ImageObject",
        "url": `${siteUrl}/logo.png`
      }
    }
  };
}
