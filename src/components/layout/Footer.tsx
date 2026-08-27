"use client";

import { useState } from "react";
import Link from "next/link";
import { FaInstagram, FaFacebook } from "react-icons/fa";
import { Button } from "@/components/ui/Button";
import { submitNewsletterForm } from "@/lib/form-service";
import { analytics } from "@/lib/analytics";
import { toast } from "sonner";

// ─── Social Links ─────────────────────────────
// TODO: Replace "#" hrefs with the real Solvia Crystals account URLs.
// Links with href="#" are filtered out and won't appear in the footer.
const socialLinks = [
  { label: "Instagram", href: "#" /* TODO: replace with real Instagram URL e.g. https://instagram.com/YOUR_HANDLE */, icon: FaInstagram },
  { label: "Facebook", href: "#" /* TODO: replace with real Facebook URL e.g. https://facebook.com/YOUR_HANDLE */, icon: FaFacebook },
  // YouTube: account does not exist yet — add when ready
].filter(link => link.href && link.href !== "#");

export function Footer() {
  const [email, setEmail] = useState("");
  const [newsletterStatus, setNewsletterStatus] = useState<"idle" | "loading" | "success">("idle");

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setNewsletterStatus("loading");

    const result = await submitNewsletterForm(email);

    if (result.success) {
      setNewsletterStatus("success");
      analytics.track({ name: "newsletter_signup", properties: { source: "footer" } });
      setEmail("");
      toast.success("You're in! Watch your inbox for updates.");
    } else {
      setNewsletterStatus("idle");
      toast.error(result.error || "Something went wrong. Please try again.");
    }
  };

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
              Ethically sourced crystals. Considered design.
            </p>
            {socialLinks.length > 0 && (
              <div className="flex space-x-4">
                {socialLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-brand-silver hover:text-brand-gold transition-colors"
                    aria-label={link.label}
                  >
                    <link.icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-medium mb-4 uppercase tracking-wider text-sm">Shop</h4>
            <ul className="space-y-3">
              {[
                { label: "All Pieces", href: "/shop" },
                { label: "Collections", href: "/collections" },
                { label: "Wishlist", href: "/wishlist" },
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
                { label: "Shipping", href: "/shipping" },
                { label: "Returns", href: "/returns" },
                { label: "Care Guide", href: "/care-guide" },
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
            {newsletterStatus === "success" ? (
              <p className="text-sm text-brand-gold">Thanks for subscribing! ✨</p>
            ) : (
              <form className="space-y-2" onSubmit={handleNewsletterSubmit}>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address"
                  className="w-full bg-transparent border border-white/20 rounded-sm px-4 py-3 text-sm text-white focus:outline-none focus:border-brand-gold transition-colors"
                  required
                />
                <Button className="w-full" variant="outline" disabled={newsletterStatus === "loading"}>
                  {newsletterStatus === "loading" ? "Subscribing..." : "Subscribe"}
                </Button>
              </form>
            )}
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
