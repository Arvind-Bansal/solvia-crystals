"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ShoppingBag, Menu, X, Search, Heart } from "lucide-react";
import { cn } from "@/lib/utils";
import { CartDrawer } from "@/components/ecommerce/CartDrawer";
import { SearchOverlay } from "@/components/search/SearchOverlay";
import { useCartStore } from "@/store/useCartStore";
import { useWishlistStore } from "@/store/useWishlistStore";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  
  const { items } = useCartStore();
  const { items: wishlistItems } = useWishlistStore();
  const wishlistCount = mounted ? wishlistItems.length : 0;
  const cartCount = mounted ? items.reduce((acc, i) => acc + i.quantity, 0) : 0;

  /* eslint-disable react-hooks/set-state-in-effect */
  useEffect(() => {
    setMounted(true);
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  /* eslint-enable react-hooks/set-state-in-effect */

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Shop", href: "/shop" },
    { name: "Everyday Rituals", href: "/collections/everyday-rituals" },
    { name: "About", href: "/about" },
    { name: "Journal", href: "/blog" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <>
      <header
        className={cn(
          "fixed top-0 w-full z-40 transition-all duration-300 border-b border-transparent",
          isScrolled
            ? "bg-[#F8F5EF]/95 backdrop-blur-md border-[#262626]/10 py-4 shadow-xs"
            : "bg-transparent py-6"
        )}
      >
        <div className="container mx-auto px-6 flex items-center justify-between">
          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden text-[#262626] hover:text-brand-gold transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          {/* Dynamic Logo */}
          <Link href="/" className="flex-1 md:flex-none flex items-center justify-center md:justify-start group relative h-9">
            <div className="relative flex items-center justify-center md:justify-start h-9 w-[140px] md:w-[160px]">
              <Image
                src="/solvia-logo.png"
                alt="Solvia Crystals"
                width={160}
                height={40}
                className={cn(
                  "h-8 md:h-9 w-auto object-contain transition-all duration-300 ease-in-out absolute",
                  isScrolled ? "opacity-0 scale-90 pointer-events-none invisible" : "opacity-100 scale-100 visible"
                )}
                priority
              />
              <Image
                src="/solvia-emblem.png"
                alt="Solvia Crystals Emblem"
                width={40}
                height={40}
                className={cn(
                  "h-7 md:h-8 w-auto object-contain transition-all duration-300 ease-in-out absolute",
                  isScrolled ? "opacity-100 scale-100 visible" : "opacity-0 scale-90 pointer-events-none invisible"
                )}
                priority
              />
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-sm font-medium text-[#262626]/80 hover:text-brand-gold transition-colors tracking-wide"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Icons */}
          <div className="flex items-center space-x-5">
            <button aria-label="Search" className="text-[#262626]/80 hover:text-[#262626] transition-colors" onClick={() => setSearchOpen(true)}>
              <Search className="w-5 h-5" />
            </button>
            <Link
              href="/wishlist"
              aria-label="Wishlist"
              className="text-[#262626]/80 hover:text-[#262626] relative transition-colors"
            >
              <Heart className={`w-5 h-5 ${wishlistCount > 0 ? "fill-brand-gold text-brand-gold" : ""}`} />
              {wishlistCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-brand-gold text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </Link>
            <button 
              aria-label="Cart" 
              className="text-[#262626]/80 hover:text-[#262626] relative"
              onClick={() => setCartOpen(true)}
            >
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-brand-gold text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center" aria-label={`${cartCount} items in cart`}>
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        <motion.div
          initial={false}
          animate={{ height: mobileMenuOpen ? "auto" : 0, opacity: mobileMenuOpen ? 1 : 0 }}
          className="md:hidden overflow-hidden bg-[#F8F5EF] border-b border-[#262626]/10"
        >
          <nav className="flex flex-col py-4 px-6 space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-base font-medium text-[#262626] hover:text-brand-gold transition-colors"
              >
                {link.name}
              </Link>
            ))}
            <Link
              href="/wishlist"
              onClick={() => setMobileMenuOpen(false)}
              className="text-base font-medium text-[#262626] hover:text-brand-gold transition-colors flex items-center justify-between"
            >
              Wishlist
              {wishlistCount > 0 && (
                <span className="ml-2 bg-brand-gold text-white text-xs font-bold px-2 py-0.5 rounded-full">
                  {wishlistCount}
                </span>
              )}
            </Link>
          </nav>
        </motion.div>
      </header>

      <CartDrawer isOpen={cartOpen} onClose={() => setCartOpen(false)} />
      <SearchOverlay isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
