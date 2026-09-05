import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { getAllPosts } from "@/data";
import { constructMetadata } from "@/lib/seo";
import { ArrowRight } from "lucide-react";

export const metadata = constructMetadata({
  title: "The Journal | Solvia Crystals",
  description: "Styling guides, care tips, and stories behind the stones. Practical content for crystal jewellery enthusiasts.",
  canonicalUrl: "https://solviacrystals.com/blog",
});

export default function BlogPage() {
  return (
    <>
      <Navbar />
      <main className="pt-32 pb-24 bg-[#F8F5EF] min-h-screen text-[#262626]">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mb-16">
            <h1 className="text-4xl md:text-5xl font-serif text-[#262626] mb-4 font-medium">The Journal</h1>
            <p className="text-[#262626]/80 text-lg">
              Styling guides, care tips, and the stories behind the stones we source.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {getAllPosts().map((post) => (
              <article key={post.id} className="group bg-white border border-[#262626]/10 rounded-sm overflow-hidden flex flex-col shadow-xs">
                <Link href={`/blog/${post.slug}`} className="relative aspect-[16/10] overflow-hidden bg-[#F2EDE4]">
                  <Image 
                    src={post.image} 
                    alt={post.title} 
                    fill 
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  />
                  <div className="absolute top-4 left-4 bg-white/80 backdrop-blur-md px-3 py-1 rounded-sm border border-[#262626]/10">
                    <span className="text-[10px] text-brand-gold uppercase tracking-wider font-bold">{post.category}</span>
                  </div>
                </Link>
                <div className="p-6 flex flex-col flex-1">
                  <div className="text-xs text-[#262626]/60 flex items-center space-x-2 mb-3">
                    <time dateTime={post.date}>{new Date(post.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</time>
                    <span>•</span>
                    <span>{post.readTime}</span>
                  </div>
                  <Link href={`/blog/${post.slug}`}>
                    <h2 className="text-xl font-serif text-[#262626] group-hover:text-brand-gold transition-colors mb-3 leading-snug font-medium">
                      {post.title}
                    </h2>
                  </Link>
                  <p className="text-sm text-[#262626]/70 mb-6 line-clamp-3">
                    {post.excerpt}
                  </p>
                  <div className="mt-auto pt-4 border-t border-[#262626]/10">
                    <Link href={`/blog/${post.slug}`} className="inline-flex items-center text-sm font-medium text-brand-gold hover:text-[#262626] transition-colors">
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
