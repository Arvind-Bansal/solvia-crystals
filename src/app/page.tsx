"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/Button";
import { ProductCard } from "@/components/product/ProductCard";
import { mockProducts } from "@/data/mockProducts";

const CATEGORIES = [
  { name: "Love", image: "https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?q=80&w=800&auto=format&fit=crop" },
  { name: "Protection", image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=800&auto=format&fit=crop" },
  { name: "Wealth", image: "https://images.unsplash.com/photo-1559825481-12a05cc00344?q=80&w=800&auto=format&fit=crop" },
  { name: "Healing", image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=800&auto=format&fit=crop" }
];

export default function Home() {
  const bestsellers = mockProducts.filter(p => p.isBestseller).slice(0, 4);

  return (
    <>
      <Navbar />
      <main className="flex-1 bg-[#0a0a0a]">
        
        {/* Cinematic Hero Section */}
        <section className="relative h-screen flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 z-0 bg-black/60" />
          <div className="absolute inset-0 z-0">
            <Image 
              src="https://images.unsplash.com/photo-1599643478524-fb66f4fa0a14?q=80&w=2000&auto=format&fit=crop" 
              alt="Solvia Crystals Hero" 
              fill 
              priority
              className="object-cover opacity-60 mix-blend-overlay"
            />
          </div>
          
          <div className="container relative z-10 mx-auto px-6 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
            >
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif text-white tracking-tight mb-6 drop-shadow-2xl">
                Adorn Your <br />
                <span className="text-brand-gold italic font-light">Highest Self</span>
              </h1>
              <p className="text-lg md:text-xl text-brand-silver/90 max-w-2xl mx-auto mb-10 font-light">
                Ethically sourced, high-vibrational crystal jewelry designed for the modern mystic. Elevate your energy and style.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="/shop">
                  <Button size="lg" className="w-full sm:w-auto px-12">
                    Shop Collection
                  </Button>
                </Link>
                <Link href="/about">
                  <Button variant="outline" size="lg" className="w-full sm:w-auto px-12">
                    Our Story
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
          
          {/* Scroll Indicator */}
          <motion.div 
            className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center"
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          >
            <span className="text-[10px] uppercase tracking-widest text-brand-silver mb-2">Scroll</span>
            <div className="w-[1px] h-12 bg-gradient-to-b from-brand-silver to-transparent" />
          </motion.div>
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
                <h2 className="text-3xl md:text-4xl font-serif text-white mb-4">The Ritual Collection</h2>
                <p className="text-brand-silver/80">Our most beloved pieces, chosen by the community for their powerful energetic resonance and timeless elegance.</p>
              </motion.div>
              <Link href="/shop" className="hidden md:inline-flex mt-6 md:mt-0 items-center text-sm font-medium text-brand-gold uppercase tracking-widest hover:text-white transition-colors">
                View All <span className="ml-2">→</span>
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {bestsellers.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
            
            <div className="mt-12 text-center md:hidden">
              <Link href="/shop">
                <Button variant="outline" className="w-full">View All Bestsellers</Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Intention Categories */}
        <section className="py-24 bg-[#050505] border-t border-white/5">
          <div className="container mx-auto px-6">
            <motion.div 
              className="text-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-serif text-white mb-4">Shop by Intention</h2>
              <p className="text-brand-silver/80 max-w-2xl mx-auto">What are you calling into your life? Select a category to find the crystals uniquely attuned to your desires.</p>
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
              {CATEGORIES.map((cat, i) => (
                <Link key={cat.name} href={`/shop?intention=${cat.name}`} className="group block relative aspect-[3/4] overflow-hidden rounded-sm">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="w-full h-full"
                  >
                    <Image 
                      src={cat.image} 
                      alt={cat.name} 
                      fill 
                      className="object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
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
      </main>
      <Footer />
    </>
  );
}
