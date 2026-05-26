import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { mockPosts } from "@/data/mockBlog";
import { constructMetadata } from "@/lib/seo";
import { ArrowRight } from "lucide-react";

export const metadata = constructMetadata({
  title: "The Coven Blog | Solvia Crystals",
  description: "Educational articles on crystal healing, manifestation, and maintaining a high-vibrational lifestyle.",
  canonicalUrl: "https://solviacrystals.com/blog",
});

export default function BlogPage() {
  return (
    <>
      <Navbar />
      <main className="pt-32 pb-24 bg-[#0a0a0a] min-h-screen">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mb-16">
            <h1 className="text-4xl md:text-5xl font-serif text-white mb-4">The Coven Journal</h1>
            <p className="text-brand-silver/80 text-lg">
              Explore the metaphysical properties of crystals, learn how to cleanse your aura, and discover practices for the modern mystic.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {mockPosts.map((post) => (
              <article key={post.id} className="group bg-[#121212] border border-white/5 rounded-sm overflow-hidden flex flex-col">
                <Link href={`/blog/${post.slug}`} className="relative aspect-[16/10] overflow-hidden">
                  <Image 
                    src={post.image} 
                    alt={post.title} 
                    fill 
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-sm border border-white/10">
                    <span className="text-[10px] text-brand-gold uppercase tracking-wider font-bold">{post.category}</span>
                  </div>
                </Link>
                <div className="p-6 flex flex-col flex-1">
                  <div className="text-xs text-brand-silver/60 flex items-center space-x-2 mb-3">
                    <time dateTime={post.date}>{new Date(post.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</time>
                    <span>•</span>
                    <span>{post.readTime}</span>
                  </div>
                  <Link href={`/blog/${post.slug}`}>
                    <h2 className="text-xl font-serif text-white group-hover:text-brand-gold transition-colors mb-3 leading-snug">
                      {post.title}
                    </h2>
                  </Link>
                  <p className="text-sm text-brand-silver/70 mb-6 line-clamp-3">
                    {post.excerpt}
                  </p>
                  <div className="mt-auto pt-4 border-t border-white/5">
                    <Link href={`/blog/${post.slug}`} className="inline-flex items-center text-sm font-medium text-brand-gold hover:text-white transition-colors">
                      Read Article <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
