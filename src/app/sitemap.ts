import { MetadataRoute } from 'next'
import { getAllProducts, getAllPosts } from '@/data'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://solviacrystals.com'

  // Core routes
  const routes = ['', '/shop', '/blog', '/about', '/contact'].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }))

  // Product routes
  const productRoutes = getAllProducts().map((product) => ({
    url: `${baseUrl}/product/${product.slug}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }))

  // Blog routes
  const blogRoutes = getAllPosts().map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.date).toISOString(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  return [...routes, ...productRoutes, ...blogRoutes]
}
