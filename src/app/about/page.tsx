"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Leaf, Moon, Sparkles } from "lucide-react";

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1 pt-24 pb-0 bg-[#0a0a0a]">
        
        {/* Hero Section */}
        <section className="relative py-32 overflow-hidden border-b border-white/5">
          <div className="container mx-auto px-6 relative z-10 text-center max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-4xl md:text-6xl font-serif text-white mb-6">Our Story</h1>
              <p className="text-xl text-brand-silver/90 leading-relaxed font-light">
                Founded on the belief that luxury and spirituality can coexist. Solvia Crystals brings ancient energy into the modern world through exquisite craftsmanship.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-24">
          <div className="container mx-auto px-6">
            <div className="flex flex-col md:flex-row gap-16 items-center">
              <motion.div 
                className="w-full md:w-1/2"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <div className="relative aspect-[3/4] w-full max-w-md mx-auto rounded-sm overflow-hidden">
                  <Image
                    src="https://images.unsplash.com/photo-1599643478524-fb66f4fa0a14?q=80&w=800&auto=format&fit=crop"
                    alt="Founder"
                    fill
                    className="object-cover"
                  />
                </div>
              </motion.div>
              
              <motion.div 
                className="w-full md:w-1/2"
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <h2 className="text-3xl md:text-4xl font-serif text-white mb-6">A Note from the Founder</h2>
                <p className="text-brand-silver mb-6 leading-relaxed">
                  "I started Solvia Crystals because I couldn't find crystal jewelry that felt truly elevated. The market was filled with mass-produced pieces that lacked the reverence these ancient stones deserve."
                </p>
                <p className="text-brand-silver mb-8 leading-relaxed">
                  "Every Solvia bracelet is a testament to my commitment to quality, ethical sourcing, and the authentic energetic properties of the crystals. We don't just make jewelry; we create tools for transformation."
                </p>
                <div className="font-serif text-2xl text-brand-gold italic">
                  — Elara Vance
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-24 bg-[#050505] border-t border-white/5">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl md:text-4xl font-serif text-white text-center mb-16">The Solvia Standard</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {[
                { 
                  icon: <Leaf className="w-8 h-8 text-brand-gold mb-4" />, 
                  title: "Ethically Sourced", 
                  desc: "We trace every stone back to its origin, ensuring fair labor practices and minimal environmental impact."
                },
                { 
                  icon: <Moon className="w-8 h-8 text-brand-gold mb-4" />, 
                  title: "Energetically Cleansed", 
                  desc: "Each piece is cleansed with white sage and charged under the full moon before it reaches your hands."
                },
                { 
                  icon: <Sparkles className="w-8 h-8 text-brand-gold mb-4" />, 
                  title: "Premium Craftsmanship", 
                  desc: "Using only AAA grade crystals and 18k gold vermeil hardware, our pieces are built to last a lifetime."
                }
              ].map((value, idx) => (
                <motion.div 
                  key={idx}
                  className="text-center"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.2 }}
                >
                  <div className="flex justify-center">{value.icon}</div>
                  <h3 className="text-xl font-serif text-white mb-3">{value.title}</h3>
                  <p className="text-brand-silver/80 leading-relaxed">{value.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
