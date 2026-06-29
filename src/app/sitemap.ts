import { MetadataRoute } from 'next'
import { getAllProducts, getAllPosts, getAllCollections, getAllIntentions } from '@/data'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://solviacrystals.com'

  // Core routes
  const routes = ['', '/shop', '/blog', '/about', '/contact', '/collections', '/wishlist'].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }))

  // Trust / info pages
  const infoRoutes = ['/shipping', '/returns', '/care-guide', '/privacy', '/terms'].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'monthly' as const,
    priority: 0.4,
  }))

  // Product routes
  const productRoutes = getAllProducts().map((product) => ({
    url: `${baseUrl}/product/${product.slug}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }))

  // Collection routes
  const collectionRoutes = getAllCollections().map((collection) => ({
    url: `${baseUrl}/collections/${collection.slug}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }))

  // Intention routes
  const intentionRoutes = getAllIntentions().map((intention) => ({
    url: `${baseUrl}/intentions/${intention.slug}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }))

  // Blog routes
  const blogRoutes = getAllPosts().map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.date).toISOString(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))

  return [...routes, ...infoRoutes, ...productRoutes, ...collectionRoutes, ...intentionRoutes, ...blogRoutes]
}
