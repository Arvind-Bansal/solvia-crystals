"use client";

import { useState, useCallback, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ProductCard } from "@/components/product/ProductCard";
import { getAllProducts } from "@/data";
import { FILTER_INTENTIONS, FILTER_STYLES, FILTER_CHAKRAS } from "@/data/filters";
import { Search, SlidersHorizontal, ChevronDown, X } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";
import { Product } from "@/types";

const allProducts = getAllProducts();

const SORT_OPTIONS = [
  { value: "featured", label: "Featured" },
  { value: "newest", label: "Newest" },
  { value: "price-asc", label: "Price: Low → High" },
  { value: "price-desc", label: "Price: High → Low" },
  { value: "rating", label: "Top Rated" },
] as const;

type SortValue = (typeof SORT_OPTIONS)[number]["value"];

function sortProducts(products: Product[], sort: SortValue): Product[] {
  const sorted = [...products];
  switch (sort) {
    case "price-asc":
      return sorted.sort((a, b) => a.price - b.price);
    case "price-desc":
      return sorted.sort((a, b) => b.price - a.price);
    case "rating":
      return sorted.sort((a, b) => b.rating - a.rating);
    case "newest":
      return sorted.sort((a, b) => (b.sortOrder ?? 0) - (a.sortOrder ?? 0));
    case "featured":
    default:
      return sorted.sort((a, b) => (b.isBestseller ? 1 : 0) - (a.isBestseller ? 1 : 0));
  }
}

function ShopContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [activeIntention, setActiveIntention] = useState(searchParams.get("intention") || "All");
  const [activeStyle, setActiveStyle] = useState(searchParams.get("style") || "All");
  const [activeChakra, setActiveChakra] = useState(searchParams.get("chakra") || "All");
  const [searchQuery, setSearchQuery] = useState(searchParams.get("q") || "");
  const [sortBy, setSortBy] = useState<SortValue>((searchParams.get("sort") as SortValue) || "featured");
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Sync state to URL
  const updateURL = useCallback(
    (params: Record<string, string>) => {
      const url = new URLSearchParams();
      const merged = {
        intention: activeIntention,
        style: activeStyle,
        chakra: activeChakra,
        q: searchQuery,
        sort: sortBy,
        ...params,
      };
      if (merged.intention && merged.intention !== "All") url.set("intention", merged.intention);
      if (merged.style && merged.style !== "All") url.set("style", merged.style);
      if (merged.chakra && merged.chakra !== "All") url.set("chakra", merged.chakra);
      if (merged.q) url.set("q", merged.q);
      if (merged.sort && merged.sort !== "featured") url.set("sort", merged.sort);

      const qs = url.toString();
      router.replace(`/shop${qs ? `?${qs}` : ""}`, { scroll: false });
    },
    [activeIntention, activeStyle, activeChakra, searchQuery, sortBy, router]
  );

  const handleIntention = (v: string) => { setActiveIntention(v); updateURL({ intention: v }); };
  const handleStyle = (v: string) => { setActiveStyle(v); updateURL({ style: v }); };
  const handleChakra = (v: string) => { setActiveChakra(v); updateURL({ chakra: v }); };
  const handleSearch = (v: string) => { setSearchQuery(v); updateURL({ q: v }); };
  const handleSort = (v: SortValue) => { setSortBy(v); updateURL({ sort: v }); };

  const clearAllFilters = () => {
    setActiveIntention("All");
    setActiveStyle("All");
    setActiveChakra("All");
    setSearchQuery("");
    setSortBy("featured");
    router.replace("/shop", { scroll: false });
  };

  const filteredProducts = sortProducts(
    allProducts.filter((product) => {
      const matchesIntention = activeIntention === "All" || product.intention === activeIntention;
      const matchesStyle = activeStyle === "All" || product.style === activeStyle;
      const matchesChakra = activeChakra === "All" || product.chakra === activeChakra;
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            product.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            product.meaning.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesIntention && matchesStyle && matchesChakra && matchesSearch;
    }),
    sortBy
  );

  return (
    <div className="container mx-auto px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12"
      >
        <h1 className="text-4xl md:text-5xl font-serif text-[#262626] mb-4 font-medium">The Collection</h1>
        <p className="text-[#262626]/70 max-w-2xl">
          Every piece is assembled by hand with ethically sourced stones and durable hardware. Browse by intention, style, or simply follow your instinct.
        </p>
      </motion.div>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        {/* Desktop Intentions */}
        <div className="hidden md:flex items-center space-x-2 overflow-x-auto pb-2 scrollbar-hide w-full md:w-auto">
          {FILTER_INTENTIONS.options.map((intention) => (
            <button
              key={intention}
              onClick={() => handleIntention(intention)}
              className={`whitespace-nowrap px-4 py-2 rounded-sm text-sm font-medium transition-all ${
                activeIntention === intention
                  ? "bg-[#262626] text-[#F8F5EF]"
                  : "border border-[#262626]/10 text-[#262626]/80 hover:border-brand-gold/50 bg-white"
              }`}
            >
              {intention}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto">
          {/* Search */}
          <div className="relative flex-1 md:w-72">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#262626]/40" />
            <input
              type="text"
              placeholder="Search pieces..."
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              className="w-full bg-white border border-[#262626]/10 rounded-full pl-12 pr-6 py-2.5 text-sm text-[#262626] placeholder:text-[#262626]/40 focus:outline-none focus:border-brand-gold/50 transition-all duration-300 shadow-xs"
            />
          </div>

          {/* Sort (Desktop) */}
          <div className="hidden md:flex relative">
            <select
              value={sortBy}
              onChange={(e) => handleSort(e.target.value as SortValue)}
              className="appearance-none bg-white border border-[#262626]/10 rounded-full pl-4 pr-10 py-2.5 text-sm text-[#262626] focus:outline-none focus:border-brand-gold/50 cursor-pointer shadow-xs"
            >
              {SORT_OPTIONS.map(opt => (
                <option key={opt.value} value={opt.value} className="bg-white text-[#262626]">{opt.label}</option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#262626]/50 pointer-events-none" />
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
      <div className="hidden md:flex items-center gap-6 mb-12 py-4 border-t border-[#262626]/10">
        <div className="flex items-center gap-2">
          <span className="text-sm text-[#262626]/60">Style:</span>
          <div className="flex items-center space-x-2">
            {FILTER_STYLES.options.map((style) => (
              <button
                key={style}
                onClick={() => handleStyle(style)}
                className={`whitespace-nowrap px-3 py-1.5 rounded-sm text-xs font-medium transition-all ${
                  activeStyle === style
                    ? "bg-[#262626] text-[#F8F5EF]"
                    : "text-[#262626]/70 hover:text-[#262626]"
                }`}
              >
                {style}
              </button>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-[#262626]/60">Chakra:</span>
          <div className="relative">
            <select
              value={activeChakra}
              onChange={(e) => handleChakra(e.target.value)}
              className="appearance-none bg-white border border-[#262626]/10 rounded-sm pl-4 pr-10 py-1.5 text-sm text-[#262626] focus:outline-none focus:border-brand-gold cursor-pointer"
            >
              {FILTER_CHAKRAS.options.map(c => <option key={c} value={c} className="bg-white">{c}</option>)}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#262626]/50 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Mobile Filter Drawer */}
      <AnimatePresence>
        {isFilterOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsFilterOpen(false)}
              className="md:hidden fixed inset-0 bg-[#262626]/40 backdrop-blur-sm z-40"
            />
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 260 }}
              className="md:hidden fixed bottom-0 left-0 right-0 z-50 rounded-t-2xl border-t border-[#262626]/10 bg-[#F8F5EF] p-6 pb-[env(safe-area-inset-bottom,24px)] max-h-[70vh] overflow-y-auto"
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-serif text-[#262626] text-lg">Filters</h3>
                <button
                  onClick={() => setIsFilterOpen(false)}
                  className="w-11 h-11 flex items-center justify-center rounded-full bg-[#F2EDE4] hover:bg-[#262626]/10 transition-colors"
                >
                  <X className="w-5 h-5 text-[#262626]" />
                </button>
              </div>

              <div className="mb-6">
                <label className="text-xs text-[#262626]/60 uppercase tracking-wider mb-3 block">Intention</label>
                <div className="flex flex-wrap gap-2">
                  {FILTER_INTENTIONS.options.map(intention => (
                    <button
                      key={intention}
                      onClick={() => handleIntention(intention)}
                      className={`min-h-[44px] px-4 py-2.5 text-sm rounded-sm transition-colors ${activeIntention === intention ? 'bg-[#262626] text-[#F8F5EF] font-medium' : 'bg-white text-[#262626] border border-[#262626]/10'}`}
                    >
                      {intention}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <label className="text-xs text-[#262626]/60 uppercase tracking-wider mb-3 block">Style</label>
                <div className="flex flex-wrap gap-2">
                  {FILTER_STYLES.options.map(style => (
                    <button
                      key={style}
                      onClick={() => handleStyle(style)}
                      className={`min-h-[44px] px-4 py-2.5 text-sm rounded-sm transition-colors ${activeStyle === style ? 'bg-[#262626] text-[#F8F5EF] font-medium' : 'bg-white text-[#262626] border border-[#262626]/10'}`}
                    >
                      {style}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <label className="text-xs text-[#262626]/60 uppercase tracking-wider mb-3 block">Chakra</label>
                <div className="flex flex-wrap gap-2">
                  {FILTER_CHAKRAS.options.map(chakra => (
                    <button
                      key={chakra}
                      onClick={() => handleChakra(chakra)}
                      className={`min-h-[44px] px-4 py-2.5 text-sm rounded-sm transition-colors ${activeChakra === chakra ? 'bg-[#262626] text-[#F8F5EF] font-medium' : 'bg-white text-[#262626] border border-[#262626]/10'}`}
                    >
                      {chakra}
                    </button>
                  ))}
                </div>
              </div>

              {/* Mobile Sort */}
              <div className="mb-6">
                <label className="text-xs text-[#262626]/60 uppercase tracking-wider mb-3 block">Sort By</label>
                <div className="flex flex-wrap gap-2">
                  {SORT_OPTIONS.map(opt => (
                    <button
                      key={opt.value}
                      onClick={() => handleSort(opt.value)}
                      className={`min-h-[44px] px-4 py-2.5 text-sm rounded-sm transition-colors ${sortBy === opt.value ? 'bg-[#262626] text-[#F8F5EF] font-medium' : 'bg-white text-[#262626] border border-[#262626]/10'}`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              <Button
                className="w-full min-h-[48px]"
                onClick={() => setIsFilterOpen(false)}
              >
                Show {filteredProducts.length} {filteredProducts.length === 1 ? 'Piece' : 'Pieces'}
              </Button>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Product Grid */}
      {filteredProducts.length > 0 ? (
        <motion.div
          layout
          className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-8"
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
        <EmptyState
          icon={Search}
          title="No pieces found"
          description="We couldn't find any pieces matching your current filters. Try adjusting your search or clearing your filters."
          cta={{
            label: "Clear All Filters",
            onClick: clearAllFilters,
          }}
          className="border border-[#262626]/10 rounded-sm bg-white"
        />
      )}
    </div>
  );
}

export default function ShopPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1 pt-32 pb-24 bg-[#F8F5EF] min-h-screen text-[#262626]">
        <Suspense fallback={null}>
          <ShopContent />
        </Suspense>
      </main>
      <Footer />
    </>
  );
}
