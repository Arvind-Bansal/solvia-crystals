import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { mockPosts, getPostBySlug } from "@/data/mockBlog";
import { constructMetadata, generateStructuredArticleData } from "@/lib/seo";

export function generateStaticParams() {
  return mockPosts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};

  return constructMetadata({
    title: post.title,
    description: post.excerpt,
    image: post.image,
    canonicalUrl: `https://solviacrystals.com/blog/${slug}`,
  });
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const jsonLd = generateStructuredArticleData(post, `https://solviacrystals.com/blog/${slug}`);

  return (
    <>
      <Navbar />
      <main className="pt-32 pb-24 bg-[#0a0a0a] min-h-screen">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <article className="container mx-auto px-6 max-w-4xl">
          <div className="text-xs text-brand-silver/60 uppercase tracking-widest mb-8 flex items-center space-x-2">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <Link href="/blog" className="hover:text-white transition-colors">Journal</Link>
            <span>/</span>
            <span className="text-brand-gold">{post.category}</span>
          </div>

          <header className="mb-12">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif text-white mb-6 leading-tight">
              {post.title}
            </h1>
            <div className="flex items-center space-x-4 text-sm text-brand-silver/60 border-b border-white/10 pb-6">
              <div className="flex items-center">
                <span className="w-8 h-8 rounded-full bg-brand-gold/20 flex items-center justify-center text-brand-gold font-bold mr-3">
                  {post.author.charAt(0)}
                </span>
                <span className="font-medium text-white">{post.author}</span>
              </div>
              <span>•</span>
              <time dateTime={post.date}>{new Date(post.date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}</time>
              <span>•</span>
              <span>{post.readTime}</span>
            </div>
          </header>

          <div className="relative aspect-video w-full mb-12 rounded-sm overflow-hidden border border-white/5">
            <Image 
              src={post.image} 
              alt={post.title} 
              fill 
              priority
              className="object-cover" 
            />
          </div>

          <div 
            className="prose prose-invert prose-brand max-w-none"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

        </article>
      </main>
      <Footer />
    </>
  );
}
