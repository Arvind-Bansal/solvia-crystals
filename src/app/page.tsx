"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/Button";
import { ProductCard } from "@/components/product/ProductCard";
import { getAllProducts, getAllIntentions, getEditorialBlock } from "@/data";
import { EditorialQuote } from "@/components/editorial/EditorialQuote";
import { EditorialSplit } from "@/components/editorial/EditorialSplit";
import { Star, ShieldCheck, Truck, Gem } from "lucide-react";
import { formatPrice, FREE_SHIPPING_THRESHOLD } from "@/lib/currency";

const intentions = getAllIntentions();
const craftsmanshipQuote = getEditorialBlock("craftsmanship-quote");
const philosophySplit = getEditorialBlock("philosophy-split");
const packagingSplit = getEditorialBlock("packaging-split");

export default function Home() {
  const featuredProducts = getAllProducts().slice(0, 4);

  return (
    <>
      <Navbar />
      <main className="flex-1 bg-[#F8F5EF] text-[#262626]">
        
        {/* Hero Section */}
        <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden pt-24 pb-12 bg-[#F2EDE4]">
          <div className="absolute inset-0 z-0 bg-gradient-to-b from-[#F8F5EF]/60 via-transparent to-[#F8F5EF]" />
          
          <div className="absolute inset-0 z-0 flex items-center justify-center">
            <div className="relative w-full max-w-[1400px] h-full opacity-25">
              <Image 
                src="https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=2000&auto=format&fit=crop" 
                alt="Solvia Crystals — handcrafted crystal bracelets" 
                fill 
                priority
                className="object-cover md:object-contain object-center scale-105"
              />
            </div>
          </div>
          
          <div className="container relative z-10 mx-auto px-6 flex flex-col items-center justify-center text-center mt-12 md:mt-0">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="max-w-4xl mx-auto"
            >
              <h1 className="text-5xl md:text-7xl lg:text-[6rem] font-serif text-[#262626] tracking-tight leading-[1.1] mb-8 font-medium">
                Stones Worth <br className="hidden md:block" />
                <span className="text-brand-gold italic font-light tracking-normal">Wearing.</span>
              </h1>
              <p className="text-lg md:text-xl text-[#262626]/80 max-w-2xl mx-auto mb-14 font-light leading-relaxed tracking-wide">
                Ethically sourced crystals and considered design. Bracelets for people who value meaning over trend.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                <Link href="/shop">
                  <Button size="lg" className="w-full sm:w-auto min-w-[200px]">
                    Shop Collection
                  </Button>
                </Link>
                <Link href="/about">
                  <Button variant="ghost" size="lg" className="w-full sm:w-auto min-w-[200px]">
                    Our Philosophy
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Bestsellers Section */}
        <section className="py-24 border-t border-[#262626]/10">
          <div className="container mx-auto px-6">
            <div className="flex flex-col md:flex-row justify-between items-end mb-16">
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="max-w-xl"
              >
                <h2 className="text-3xl md:text-4xl font-serif text-[#262626] mb-4 font-medium">Launch Collection</h2>
                <p className="text-[#262626]/70">Explore our initial release of everyday essentials. Chosen for their wearability and timeless appeal.</p>
              </motion.div>
              <Link href="/shop" className="hidden md:inline-flex mt-6 md:mt-0 items-center text-sm font-medium text-brand-gold uppercase tracking-widest hover:text-[#262626] transition-colors">
                View All <span className="ml-2">&rarr;</span>
              </Link>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
            
            <div className="mt-12 text-center md:hidden">
              <Link href="/shop">
                <Button variant="outline" className="w-full">View All Pieces</Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Craftsmanship Interlude */}
        {craftsmanshipQuote && <EditorialQuote block={craftsmanshipQuote} />}

        {/* Shop by Intention */}
        <section className="py-24 bg-[#F2EDE4] border-t border-[#262626]/10">
          <div className="container mx-auto px-6">
            <motion.div 
              className="text-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-serif text-[#262626] mb-4 font-medium">Shop by Intention</h2>
              <p className="text-[#262626]/70 max-w-2xl mx-auto">Every stone carries its own character. Find the one that speaks to where you are right now.</p>
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
              {intentions.map((intent, i) => (
                <Link key={intent.title} href={`/intentions/${intent.slug}`} className="group block relative aspect-[3/4] overflow-hidden rounded-sm bg-white border border-[#262626]/10 shadow-xs">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08 }}
                    className="w-full h-full relative"
                  >
                    <Image 
                      src={intent.heroImage} 
                      alt={intent.title} 
                      fill 
                      sizes="(max-width: 768px) 50vw, 33vw"
                      className="object-cover opacity-90 group-hover:opacity-100 group-hover:scale-[1.03] transition-all duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-white/90 via-white/20 to-transparent" />
                    <div className="absolute bottom-6 left-0 w-full text-center">
                      <h3 className="text-xl md:text-2xl font-serif text-[#262626] group-hover:text-brand-gold transition-colors font-medium">{intent.title}</h3>
                    </div>
                  </motion.div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Brand Philosophy */}
        {philosophySplit && (
          <EditorialSplit
            block={philosophySplit}
            cta={{ label: "Learn More", href: "/about" }}
          />
        )}

        {/* Packaging */}
        {packagingSplit && (
          <div className="py-4">
            <EditorialSplit block={packagingSplit} />
          </div>
        )}

        {/* Social Proof / Trust Strip */}
        <section className="py-16 bg-[#F2EDE4] border-t border-b border-[#262626]/10">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 text-center">
              <div>
                <div className="flex items-center justify-center text-brand-gold mb-3">
                  <Star className="w-5 h-5 fill-current" />
                  <Star className="w-5 h-5 fill-current" />
                  <Star className="w-5 h-5 fill-current" />
                  <Star className="w-5 h-5 fill-current" />
                  <Star className="w-5 h-5 fill-current" />
                </div>
                <p className="text-[#262626] font-medium text-lg">4.8 / 5</p>
                <p className="text-[#262626]/60 text-sm mt-1">Average Rating</p>
              </div>
              <div>
                <div className="flex justify-center mb-3">
                  <Gem className="w-6 h-6 text-brand-gold" />
                </div>
                <p className="text-[#262626] font-medium text-lg">Ethically Sourced</p>
                <p className="text-[#262626]/60 text-sm mt-1">Natural Stones</p>
              </div>
              <div>
                <div className="flex justify-center mb-3">
                  <ShieldCheck className="w-6 h-6 text-brand-gold" />
                </div>
                <p className="text-[#262626] font-medium text-lg">Wears Daily</p>
                <p className="text-[#262626]/60 text-sm mt-1">Built to Last</p>
              </div>
              <div>
                <div className="flex justify-center mb-3">
                  <Truck className="w-6 h-6 text-brand-gold" />
                </div>
                <p className="text-[#262626] font-medium text-lg">Free Shipping</p>
                <p className="text-[#262626]/60 text-sm mt-1">Orders Over {formatPrice(FREE_SHIPPING_THRESHOLD)}</p>
              </div>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
