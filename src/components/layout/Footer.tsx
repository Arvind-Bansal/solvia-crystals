"use client";

import Link from "next/link";
import { FaInstagram, FaFacebook, FaYoutube } from "react-icons/fa";
import { Button } from "@/components/ui/Button";

export function Footer() {
  return (
    <footer className="bg-[#050505] border-t border-white/5 pt-16 pb-8">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand Col */}
          <div className="col-span-1 md:col-span-1">
            <span className="font-serif text-2xl font-bold tracking-wider text-white block mb-4">
              SOLVIA <span className="text-brand-gold font-light">CRYSTALS</span>
            </span>
            <p className="text-sm text-brand-silver/80 mb-6 leading-relaxed">
              Handcrafted crystal bracelets designed with intention and elegance. Ethically sourced stones, 14k gold detailing.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-brand-silver hover:text-brand-gold transition-colors" aria-label="Instagram">
                <FaInstagram className="w-5 h-5" />
              </Link>
              <Link href="#" className="text-brand-silver hover:text-brand-gold transition-colors" aria-label="Facebook">
                <FaFacebook className="w-5 h-5" />
              </Link>
              <Link href="#" className="text-brand-silver hover:text-brand-gold transition-colors" aria-label="YouTube">
                <FaYoutube className="w-5 h-5" />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-medium mb-4 uppercase tracking-wider text-sm">Shop</h4>
            <ul className="space-y-3">
              {[
                { label: "All Pieces", href: "/shop" },
                { label: "Bestsellers", href: "/shop" },
                { label: "New Arrivals", href: "/shop" },
                { label: "Shop by Intention", href: "/shop" },
              ].map((item) => (
                <li key={item.label}>
                  <Link href={item.href} className="text-brand-silver/80 hover:text-white text-sm transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-white font-medium mb-4 uppercase tracking-wider text-sm">Support</h4>
            <ul className="space-y-3">
              {[
                { label: "Contact Us", href: "/contact" },
                { label: "Shipping & Returns", href: "/contact" },
                { label: "Jewellery Care", href: "/blog/caring-for-crystal-jewellery" },
                { label: "Privacy Policy", href: "/privacy" },
                { label: "Terms of Service", href: "/terms" },
              ].map((item) => (
                <li key={item.label}>
                  <Link href={item.href} className="text-brand-silver/80 hover:text-white text-sm transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-white font-medium mb-4 uppercase tracking-wider text-sm">Stay Connected</h4>
            <p className="text-sm text-brand-silver/80 mb-4">
              New releases, styling guides, and early access. No spam.
            </p>
            <form className="space-y-2" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="Your email address"
                className="w-full bg-transparent border border-white/20 rounded-sm px-4 py-3 text-sm text-white focus:outline-none focus:border-brand-gold transition-colors"
                required
              />
              <Button className="w-full" variant="outline">
                Subscribe
              </Button>
            </form>
          </div>
        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center">
          <p className="text-xs text-brand-silver/60 mb-4 md:mb-0">
            &copy; 2026 Solvia Crystals. All rights reserved.
          </p>
          <div className="flex space-x-6 text-xs text-brand-silver/60">
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
