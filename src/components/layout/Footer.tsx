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
              Premium crystal bracelets designed with intention, elegance, and high vibrations for the modern mystic.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-brand-silver hover:text-brand-gold transition-colors">
                <FaInstagram className="w-5 h-5" />
              </Link>
              <Link href="#" className="text-brand-silver hover:text-brand-gold transition-colors">
                <FaFacebook className="w-5 h-5" />
              </Link>
              <Link href="#" className="text-brand-silver hover:text-brand-gold transition-colors">
                <FaYoutube className="w-5 h-5" />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-medium mb-4 uppercase tracking-wider text-sm">Shop</h4>
            <ul className="space-y-3">
              {["All Bracelets", "Bestsellers", "New Arrivals", "Shop by Intention", "Gift Cards"].map((item) => (
                <li key={item}>
                  <Link href="/shop" className="text-brand-silver/80 hover:text-white text-sm transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-white font-medium mb-4 uppercase tracking-wider text-sm">Support</h4>
            <ul className="space-y-3">
              {["FAQ", "Shipping & Returns", "Contact Us", "Jewelry Care", "Ring Sizer"].map((item) => (
                <li key={item}>
                  <Link href="/contact" className="text-brand-silver/80 hover:text-white text-sm transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-white font-medium mb-4 uppercase tracking-wider text-sm">Join the Coven</h4>
            <p className="text-sm text-brand-silver/80 mb-4">
              Subscribe to get special offers, free giveaways, and once-in-a-lifetime deals.
            </p>
            <form className="space-y-2">
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
            <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
