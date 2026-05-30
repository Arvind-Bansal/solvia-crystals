"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ShoppingBag, Menu, X, Search, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { CartDrawer } from "@/components/ecommerce/CartDrawer";
import { useCartStore } from "@/store/useCartStore";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  
  const { items } = useCartStore();

  useEffect(() => {
    // eslint-disable-next-line
    setMounted(true);
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Shop", href: "/shop" },
    { name: "Collections", href: "/shop" },
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
            ? "bg-[#0a0a0a]/90 backdrop-blur-md border-white/10 py-4"
            : "bg-transparent py-6"
        )}
      >
        <div className="container mx-auto px-6 flex items-center justify-between">
          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden text-brand-silver hover:text-white transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          {/* Logo */}
          <Link href="/" className="flex-1 md:flex-none flex items-center justify-center md:justify-start group">
            <div className="relative flex items-center justify-center w-8 h-8 mr-3">
              <svg viewBox="0 0 100 100" className="w-full h-full text-brand-gold group-hover:rotate-180 transition-transform duration-1000 ease-in-out" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M50 0 L100 50 L50 100 L0 50 Z" />
                <path d="M50 20 L80 50 L50 80 L20 50 Z" strokeWidth="1" opacity="0.5" />
                <circle cx="50" cy="50" r="5" fill="currentColor" />
              </svg>
            </div>
            <div className="flex flex-col items-start justify-center leading-none">
              <span className="font-serif text-xl md:text-2xl font-medium tracking-[0.2em] text-white">
                SOLVIA
              </span>
              <span className="text-[9px] md:text-[10px] uppercase tracking-[0.3em] text-brand-gold mt-1">
                Crystals
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-sm font-medium text-brand-silver hover:text-brand-gold transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Icons */}
          <div className="flex items-center space-x-4">
            <button aria-label="Search" className="text-brand-silver hover:text-white hidden md:block">
              <Search className="w-5 h-5" />
            </button>
            <button aria-label="Account" className="text-brand-silver hover:text-white hidden md:block">
              <User className="w-5 h-5" />
            </button>
            <button 
              aria-label="Cart" 
              className="text-brand-silver hover:text-white relative"
              onClick={() => setCartOpen(true)}
            >
              <ShoppingBag className="w-5 h-5" />
              <span className="absolute -top-2 -right-2 bg-brand-gold text-[#0a0a0a] text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {mounted ? items.reduce((acc, i) => acc + i.quantity, 0) : 0}
              </span>
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        <motion.div
          initial={false}
          animate={{ height: mobileMenuOpen ? "auto" : 0, opacity: mobileMenuOpen ? 1 : 0 }}
          className="md:hidden overflow-hidden bg-[#0a0a0a] border-b border-white/10"
        >
          <nav className="flex flex-col py-4 px-6 space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-lg font-medium text-brand-silver hover:text-brand-gold transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </nav>
        </motion.div>
      </header>

      <CartDrawer isOpen={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
}
