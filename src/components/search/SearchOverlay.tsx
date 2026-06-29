"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { getAllProducts, getAllCollections, getAllPosts } from "@/data";
import { analytics } from "@/lib/analytics";
import { formatPrice } from "@/lib/currency";

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SearchOverlay({ isOpen, onClose }: SearchOverlayProps) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const allProducts = useMemo(() => getAllProducts(), []);
  const allCollections = useMemo(() => getAllCollections(), []);
  const allPosts = useMemo(() => getAllPosts(), []);

  /* eslint-disable react-hooks/set-state-in-effect */
  useEffect(() => {
    if (isOpen) {
      setQuery("");
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);
  /* eslint-enable react-hooks/set-state-in-effect */

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) onClose();
      // Cmd/Ctrl+K to open search
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  const q = query.toLowerCase().trim();

  const productResults = q.length >= 2
    ? allProducts.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.intention.toLowerCase().includes(q) ||
        p.meaning.toLowerCase().includes(q) ||
        p.collection.toLowerCase().includes(q)
      ).slice(0, 6)
    : [];

  const collectionResults = q.length >= 2
    ? allCollections.filter(c =>
        c.title.toLowerCase().includes(q) ||
        c.description.toLowerCase().includes(q)
      ).slice(0, 3)
    : [];

  const blogResults = q.length >= 2
    ? allPosts.filter(p =>
        p.title.toLowerCase().includes(q) ||
        p.excerpt.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q)
      ).slice(0, 3)
    : [];

  const hasResults = productResults.length > 0 || collectionResults.length > 0 || blogResults.length > 0;
  const hasQuery = q.length >= 2;

  const handleNavigate = () => {
    if (hasQuery) {
      analytics.track({ name: "search", properties: { query: q, results: productResults.length + collectionResults.length + blogResults.length } });
    }
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
          />
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed top-0 left-0 right-0 z-50 max-h-[85vh] overflow-y-auto"
            role="dialog"
            aria-modal="true"
            aria-label="Search"
          >
            <div className="container mx-auto px-6 pt-6 pb-8">
              <div className="bg-[#121212] border border-white/10 rounded-sm shadow-2xl max-w-2xl mx-auto">
                {/* Search Input */}
                <div className="flex items-center border-b border-white/10 px-6">
                  <Search className="w-5 h-5 text-brand-silver/60 flex-shrink-0" />
                  <input
                    ref={inputRef}
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search products, collections, journal..."
                    className="flex-1 bg-transparent text-white placeholder:text-brand-silver/40 px-4 py-5 text-base focus:outline-none"
                    aria-label="Search"
                  />
                  {query && (
                    <button onClick={() => setQuery("")} className="text-brand-silver/60 hover:text-white p-1">
                      <X className="w-4 h-4" />
                    </button>
                  )}
                  <button
                    onClick={onClose}
                    className="ml-3 text-xs text-brand-silver/40 border border-white/10 rounded px-2 py-1 hover:text-white"
                  >
                    ESC
                  </button>
                </div>

                {/* Results */}
                <div className="p-4 max-h-[60vh] overflow-y-auto">
                  {!hasQuery && (
                    <p className="text-sm text-brand-silver/40 text-center py-8">
                      Start typing to search...
                    </p>
                  )}

                  {hasQuery && !hasResults && (
                    <div className="text-center py-12">
                      <p className="text-brand-silver/60 mb-2">No results for &ldquo;{query}&rdquo;</p>
                      <p className="text-sm text-brand-silver/40">Try a different search term</p>
                    </div>
                  )}

                  {/* Product Results */}
                  {productResults.length > 0 && (
                    <div className="mb-6">
                      <h3 className="text-xs text-brand-silver/40 uppercase tracking-widest font-medium mb-3 px-2">
                        Products
                      </h3>
                      <div className="space-y-1">
                        {productResults.map((product) => (
                          <Link
                            key={product.id}
                            href={`/product/${product.slug}`}
                            onClick={handleNavigate}
                            className="flex items-center gap-4 p-3 rounded-sm hover:bg-white/5 transition-colors group"
                          >
                            <div className="relative w-12 h-12 rounded-sm overflow-hidden bg-[#1a1a1a] flex-shrink-0 border border-white/5">
                              <Image
                                src={product.images.primary}
                                alt={product.name}
                                fill
                                sizes="48px"
                                className="object-cover"
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-white text-sm font-medium group-hover:text-brand-gold transition-colors truncate">
                                {product.name}
                              </p>
                              <p className="text-xs text-brand-silver/50">{product.intention} · {formatPrice(product.price)}</p>
                            </div>
                            <ArrowRight className="w-4 h-4 text-brand-silver/20 group-hover:text-brand-gold transition-colors flex-shrink-0" />
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Collection Results */}
                  {collectionResults.length > 0 && (
                    <div className="mb-6">
                      <h3 className="text-xs text-brand-silver/40 uppercase tracking-widest font-medium mb-3 px-2">
                        Collections
                      </h3>
                      <div className="space-y-1">
                        {collectionResults.map((collection) => (
                          <Link
                            key={collection.slug}
                            href={`/collections/${collection.slug}`}
                            onClick={handleNavigate}
                            className="flex items-center gap-4 p-3 rounded-sm hover:bg-white/5 transition-colors group"
                          >
                            <div className="w-12 h-12 rounded-sm bg-brand-gold/10 flex items-center justify-center flex-shrink-0">
                              <span className="text-brand-gold text-lg font-serif">{collection.title.charAt(0)}</span>
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-white text-sm font-medium group-hover:text-brand-gold transition-colors truncate">
                                {collection.title}
                              </p>
                              <p className="text-xs text-brand-silver/50 truncate">{collection.description}</p>
                            </div>
                            <ArrowRight className="w-4 h-4 text-brand-silver/20 group-hover:text-brand-gold transition-colors flex-shrink-0" />
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Blog Results */}
                  {blogResults.length > 0 && (
                    <div>
                      <h3 className="text-xs text-brand-silver/40 uppercase tracking-widest font-medium mb-3 px-2">
                        Journal
                      </h3>
                      <div className="space-y-1">
                        {blogResults.map((post) => (
                          <Link
                            key={post.id}
                            href={`/blog/${post.slug}`}
                            onClick={handleNavigate}
                            className="flex items-center gap-4 p-3 rounded-sm hover:bg-white/5 transition-colors group"
                          >
                            <div className="w-12 h-12 rounded-sm bg-white/5 flex items-center justify-center flex-shrink-0">
                              <span className="text-brand-silver/40 text-xs uppercase">{post.category.slice(0, 4)}</span>
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-white text-sm font-medium group-hover:text-brand-gold transition-colors truncate">
                                {post.title}
                              </p>
                              <p className="text-xs text-brand-silver/50">{post.readTime}</p>
                            </div>
                            <ArrowRight className="w-4 h-4 text-brand-silver/20 group-hover:text-brand-gold transition-colors flex-shrink-0" />
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
