"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/Button";
import { ProductCard } from "@/components/product/ProductCard";
import { mockProducts } from "@/data/mockProducts";
import { Star, ShieldCheck, Truck, Gem } from "lucide-react";

const CATEGORIES = [
  { name: "Protection", slug: "protection", image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=800&auto=format&fit=crop" },
  { name: "Clarity", slug: "clarity", image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=800&auto=format&fit=crop" },
  { name: "Confidence", slug: "confidence", image: "https://images.unsplash.com/photo-1596944924616-7b38e7cfac36?q=80&w=800&auto=format&fit=crop" },
  { name: "Love", slug: "love", image: "https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?q=80&w=800&auto=format&fit=crop" },
  { name: "Balance", slug: "balance", image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=800&auto=format&fit=crop" },
  { name: "Wealth", slug: "wealth", image: "https://images.unsplash.com/photo-1559825481-12a05cc00344?q=80&w=800&auto=format&fit=crop" }
];

export default function Home() {
  const bestsellers = mockProducts.filter(p => p.isBestseller).slice(0, 4);

  return (
    <>
      <Navbar />
      <main className="flex-1 bg-[#0a0a0a]">
        
        {/* Hero Section */}
        <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden pt-24 pb-12">
          <div className="absolute inset-0 z-0 bg-gradient-to-b from-[#0a0a0a] via-black/40 to-[#0a0a0a]" />
          
          <div className="absolute inset-0 z-0 flex items-center justify-center">
            <div className="relative w-full max-w-[1400px] h-full opacity-60 mix-blend-screen">
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
              <h1 className="text-5xl md:text-7xl lg:text-[6rem] font-serif text-white tracking-tight leading-[1.1] mb-8 drop-shadow-2xl">
                Stones Worth <br className="hidden md:block" />
                <span className="text-brand-gold italic font-light tracking-normal">Wearing.</span>
              </h1>
              <p className="text-lg md:text-xl text-brand-silver/80 max-w-2xl mx-auto mb-14 font-light leading-relaxed tracking-wide">
                Ethically sourced crystals, 14k gold detailing, and designs built to last. Jewellery for people who value intention over impulse.
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
        <section className="py-24 border-t border-white/5">
          <div className="container mx-auto px-6">
            <div className="flex flex-col md:flex-row justify-between items-end mb-16">
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="max-w-xl"
              >
                <h2 className="text-3xl md:text-4xl font-serif text-white mb-4">Most Loved</h2>
                <p className="text-brand-silver/80">The pieces our community reaches for again and again. Chosen for their craftsmanship, wearability, and timeless appeal.</p>
              </motion.div>
              <Link href="/shop" className="hidden md:inline-flex mt-6 md:mt-0 items-center text-sm font-medium text-brand-gold uppercase tracking-widest hover:text-white transition-colors">
                View All <span className="ml-2">&rarr;</span>
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {bestsellers.map((product) => (
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

        {/* Shop by Intention */}
        <section className="py-24 bg-[#050505] border-t border-white/5">
          <div className="container mx-auto px-6">
            <motion.div 
              className="text-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-serif text-white mb-4">Shop by Intention</h2>
              <p className="text-brand-silver/80 max-w-2xl mx-auto">Every stone carries its own character. Find the one that speaks to where you are right now.</p>
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
              {CATEGORIES.map((cat, i) => (
                <Link key={cat.name} href={`/intentions/${cat.slug}`} className="group block relative aspect-[3/4] overflow-hidden rounded-sm">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08 }}
                    className="w-full h-full"
                  >
                    <Image 
                      src={cat.image} 
                      alt={cat.name} 
                      fill 
                      className="object-cover opacity-80 group-hover:opacity-100 group-hover:scale-[1.03] transition-all duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    <div className="absolute bottom-6 left-0 w-full text-center">
                      <h3 className="text-xl md:text-2xl font-serif text-white group-hover:text-brand-gold transition-colors">{cat.name}</h3>
                    </div>
                  </motion.div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Brand Philosophy */}
        <section className="py-24 border-t border-white/5">
          <div className="container mx-auto px-6">
            <div className="flex flex-col md:flex-row gap-16 items-center max-w-5xl mx-auto">
              <motion.div
                className="w-full md:w-1/2 relative aspect-[3/4] rounded-sm overflow-hidden"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <Image
                  src="https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=800&auto=format&fit=crop"
                  alt="Solvia Crystals craftsmanship"
                  fill
                  className="object-cover"
                />
              </motion.div>
              <motion.div
                className="w-full md:w-1/2"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <span className="text-xs text-brand-gold uppercase tracking-widest font-medium mb-4 block">Our Philosophy</span>
                <h2 className="text-3xl md:text-4xl font-serif text-white mb-6 leading-tight">
                  Designed with<br />Intention, Built to Last
                </h2>
                <p className="text-brand-silver/80 leading-relaxed mb-6">
                  Every Solvia piece begins with the stone. We source directly from small-scale mines, selecting only AAA-grade crystals that meet our standards for colour, clarity, and character.
                </p>
                <p className="text-brand-silver/80 leading-relaxed mb-8">
                  Each bracelet is hand-assembled with 14k solid gold hardware — not plated, not vermeil. The result is jewellery that feels substantial on the wrist, ages beautifully, and carries meaning beyond the aesthetic.
                </p>
                <Link href="/about">
                  <Button variant="outline">Learn More</Button>
                </Link>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Social Proof / Trust Strip */}
        <section className="py-16 bg-[#050505] border-t border-b border-white/5">
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
                <p className="text-white font-medium text-lg">4.8 / 5</p>
                <p className="text-brand-silver/60 text-sm mt-1">Average Rating</p>
              </div>
              <div>
                <div className="flex justify-center mb-3">
                  <Gem className="w-6 h-6 text-brand-gold" />
                </div>
                <p className="text-white font-medium text-lg">AAA Grade</p>
                <p className="text-brand-silver/60 text-sm mt-1">Certified Stones</p>
              </div>
              <div>
                <div className="flex justify-center mb-3">
                  <ShieldCheck className="w-6 h-6 text-brand-gold" />
                </div>
                <p className="text-white font-medium text-lg">14k Solid Gold</p>
                <p className="text-brand-silver/60 text-sm mt-1">Not Plated</p>
              </div>
              <div>
                <div className="flex justify-center mb-3">
                  <Truck className="w-6 h-6 text-brand-gold" />
                </div>
                <p className="text-white font-medium text-lg">Free Shipping</p>
                <p className="text-brand-silver/60 text-sm mt-1">Orders Over $150</p>
              </div>
            </div>
          </div>
        </section>




      </main>
      <Footer />
    </>
  );
}
