import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { getAllPosts, getPostBySlug } from "@/data";
import { constructMetadata, generateStructuredArticleData } from "@/lib/seo";

export function generateStaticParams() {
  return getAllPosts().map((post) => ({
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
      <main className="pt-32 pb-24 bg-[#F8F5EF] min-h-screen text-[#262626]">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <article className="container mx-auto px-6 max-w-4xl">
          <div className="text-xs text-[#262626]/60 uppercase tracking-widest mb-8 flex items-center space-x-2">
            <Link href="/" className="hover:text-[#262626] transition-colors">Home</Link>
            <span>/</span>
            <Link href="/blog" className="hover:text-[#262626] transition-colors">Journal</Link>
            <span>/</span>
            <span className="text-brand-gold">{post.category}</span>
          </div>

          <header className="mb-12">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif text-[#262626] mb-6 leading-tight font-medium">
              {post.title}
            </h1>
            <div className="flex items-center space-x-4 text-sm text-[#262626]/60 border-b border-[#262626]/10 pb-6">
              <div className="flex items-center">
                <span className="w-8 h-8 rounded-full bg-brand-gold/20 flex items-center justify-center text-brand-gold font-bold mr-3">
                  {post.author.charAt(0)}
                </span>
                <span className="font-medium text-[#262626]">{post.author}</span>
              </div>
              <span>•</span>
              <time dateTime={post.date}>{new Date(post.date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}</time>
              <span>•</span>
              <span>{post.readTime}</span>
            </div>
          </header>

          <div className="relative aspect-video w-full mb-12 rounded-sm overflow-hidden border border-[#262626]/10 bg-[#F2EDE4]">
            <Image 
              src={post.image} 
              alt={post.title} 
              fill 
              priority
              className="object-cover" 
            />
          </div>

          <div 
            className="prose prose-brand max-w-none prose-headings:text-[#262626] prose-headings:font-serif prose-p:text-[#262626]/80 prose-a:text-brand-gold prose-strong:text-[#262626]"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

        </article>
      </main>
      <Footer />
    </>
  );
}
