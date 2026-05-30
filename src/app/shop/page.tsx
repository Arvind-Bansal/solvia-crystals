"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ProductCard } from "@/components/product/ProductCard";
import { mockProducts } from "@/data/mockProducts";
import { Search, SlidersHorizontal, ChevronDown, X } from "lucide-react";
import { Button } from "@/components/ui/Button";

const INTENTIONS = ["All", "Protection", "Clarity", "Confidence", "Love", "Balance", "Wealth"];
const STYLES = ["All", "Minimal", "Signature", "Statement"];
const CHAKRAS = ["All", "Root", "Sacral", "Solar Plexus", "Heart", "Throat", "Third Eye", "Crown"];

export default function ShopPage() {
  const [activeIntention, setActiveIntention] = useState("All");
  const [activeStyle, setActiveStyle] = useState("All");
  const [activeChakra, setActiveChakra] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const filteredProducts = mockProducts.filter((product) => {
    const matchesIntention = activeIntention === "All" || product.intention === activeIntention;
    const matchesStyle = activeStyle === "All" || product.style === activeStyle;
    const matchesChakra = activeChakra === "All" || product.chakra === activeChakra;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          product.meaning.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesIntention && matchesStyle && matchesChakra && matchesSearch;
  });

  return (
    <>
      <Navbar />
      <main className="flex-1 pt-32 pb-24 bg-[#0a0a0a] min-h-screen">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-serif text-white mb-4">The Collection</h1>
            <p className="text-brand-silver/80 max-w-2xl">
              Every piece is hand-assembled with ethically sourced stones and 14k solid gold hardware. Browse by intention, style, or simply follow your instinct.
            </p>
          </motion.div>

          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
            {/* Desktop Intentions */}
            <div className="hidden md:flex items-center space-x-2 overflow-x-auto pb-2 scrollbar-hide w-full md:w-auto">
              {INTENTIONS.map((intention) => (
                <button
                  key={intention}
                  onClick={() => setActiveIntention(intention)}
                  className={`whitespace-nowrap px-4 py-2 rounded-sm text-sm font-medium transition-all ${
                    activeIntention === intention
                      ? "bg-brand-gold text-[#0a0a0a]"
                      : "border border-white/10 text-brand-silver hover:border-brand-gold/50"
                  }`}
                >
                  {intention}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2 w-full md:w-auto">
              {/* Search */}
              <div className="relative flex-1 md:w-72">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-silver/40" />
                <input 
                  type="text" 
                  placeholder="Search pieces..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-white/5 border border-white/5 rounded-full pl-12 pr-6 py-2.5 text-sm text-white placeholder:text-brand-silver/40 focus:outline-none focus:border-brand-gold/50 focus:bg-white/10 transition-all duration-300"
                />
              </div>
              
              {/* Mobile Filter Toggle */}
              <Button 
                variant="outline" 
                size="icon" 
                className="md:hidden flex-shrink-0"
                onClick={() => setIsFilterOpen(!isFilterOpen)}
              >
                <SlidersHorizontal className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Advanced Filters (Desktop) */}
          <div className="hidden md:flex items-center gap-6 mb-12 py-4 border-t border-white/5">
            <div className="flex items-center gap-2">
              <span className="text-sm text-brand-silver/60">Style:</span>
              <div className="flex items-center space-x-2">
                {STYLES.map((style) => (
                  <button
                    key={style}
                    onClick={() => setActiveStyle(style)}
                    className={`whitespace-nowrap px-3 py-1.5 rounded-sm text-xs font-medium transition-all ${
                      activeStyle === style
                        ? "bg-white/10 text-white border border-white/20"
                        : "text-brand-silver/60 hover:text-white"
                    }`}
                  >
                    {style}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-brand-silver/60">Chakra:</span>
              <div className="relative">
                <select 
                  value={activeChakra}
                  onChange={(e) => setActiveChakra(e.target.value)}
                  className="appearance-none bg-transparent border border-white/10 rounded-sm pl-4 pr-10 py-1.5 text-sm text-white focus:outline-none focus:border-brand-gold cursor-pointer"
                >
                  {CHAKRAS.map(c => <option key={c} value={c} className="bg-brand-black">{c}</option>)}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-silver/50 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Mobile Filter Drawer */}
          <AnimatePresence>
            {isFilterOpen && (
              <motion.div 
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="md:hidden overflow-hidden mb-8 border border-white/10 rounded-sm p-4 bg-[#121212]"
              >
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-serif text-white">Filters</h3>
                  <button onClick={() => setIsFilterOpen(false)}><X className="w-4 h-4 text-brand-silver" /></button>
                </div>
                
                <div className="mb-4">
                  <label className="text-xs text-brand-silver/60 uppercase tracking-wider mb-2 block">Intention</label>
                  <div className="flex flex-wrap gap-2">
                    {INTENTIONS.map(intention => (
                      <button
                        key={intention}
                        onClick={() => setActiveIntention(intention)}
                        className={`px-3 py-1 text-xs rounded-sm transition-colors ${activeIntention === intention ? 'bg-brand-gold text-black' : 'bg-white/5 text-white'}`}
                      >
                        {intention}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="mb-4">
                  <label className="text-xs text-brand-silver/60 uppercase tracking-wider mb-2 block">Style</label>
                  <div className="flex flex-wrap gap-2">
                    {STYLES.map(style => (
                      <button
                        key={style}
                        onClick={() => setActiveStyle(style)}
                        className={`px-3 py-1 text-xs rounded-sm transition-colors ${activeStyle === style ? 'bg-brand-gold text-black' : 'bg-white/5 text-white'}`}
                      >
                        {style}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-xs text-brand-silver/60 uppercase tracking-wider mb-2 block">Chakra</label>
                  <div className="flex flex-wrap gap-2">
                    {CHAKRAS.map(chakra => (
                      <button
                        key={chakra}
                        onClick={() => setActiveChakra(chakra)}
                        className={`px-3 py-1 text-xs rounded-sm transition-colors ${activeChakra === chakra ? 'bg-brand-gold text-black' : 'bg-white/5 text-white'}`}
                      >
                        {chakra}
                      </button>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Product Grid */}
          {filteredProducts.length > 0 ? (
            <motion.div 
              layout
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
            >
              <AnimatePresence>
                {filteredProducts.map((product) => (
                  <motion.div
                    key={product.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ProductCard product={product} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          ) : (
            <div className="flex flex-col items-center justify-center py-24 text-center border border-white/5 rounded-sm bg-[#121212]">
              <Search className="w-12 h-12 text-brand-silver/20 mb-4" />
              <h3 className="text-xl font-serif text-white mb-2">No pieces found</h3>
              <p className="text-brand-silver/60 max-w-md">
                We couldn&apos;t find any pieces matching your current filters. Try adjusting your search or clearing your filters.
              </p>
              <Button 
                variant="outline" 
                className="mt-6"
                onClick={() => {
                  setActiveIntention("All");
                  setActiveStyle("All");
                  setActiveChakra("All");
                  setSearchQuery("");
                }}
              >
                Clear All Filters
              </Button>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
