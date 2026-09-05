"use client";

import { useState, useEffect } from "react";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Sparkles } from "lucide-react";
import { toast } from "sonner";
import Image from "next/image";
import { submitNewsletterForm } from "@/lib/form-service";
import { analytics } from "@/lib/analytics";

export function NewsletterPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // Only show if not previously dismissed
    const hasSeenPopup = localStorage.getItem("solvia_newsletter_seen");
    if (hasSeenPopup) return;

    // Show popup after 10 seconds or when scrolling down 50%
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 10000);

    const handleScroll = () => {
      if (window.scrollY > document.documentElement.scrollHeight / 2) {
        setIsOpen(true);
        window.removeEventListener("scroll", handleScroll);
        clearTimeout(timer);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    localStorage.setItem("solvia_newsletter_seen", "true");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const result = await submitNewsletterForm(email);

    setIsSubmitting(false);
    if (result.success) {
      analytics.track({ name: "newsletter_signup", properties: { source: "popup" } });
      handleClose();
      toast.success("Welcome! Check your inbox for your 15% off code.");
    } else {
      toast.error(result.error || "Something went wrong. Please try again.");
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose}>
      <div className="flex flex-col md:flex-row bg-[#F8F5EF] rounded-sm overflow-hidden max-w-3xl w-full border border-[#262626]/10 shadow-lg">
        <div className="hidden md:block relative w-1/2 aspect-square">
          <Image 
            src="https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=800&auto=format&fit=crop"
            alt="Crystal Collection"
            fill
            sizes="(max-width: 768px) 0vw, 384px"
            className="object-cover"
          />
        </div>
        <div className="flex-1 p-8 md:p-12 flex flex-col justify-center">
          <div className="flex items-center justify-center mb-4 text-brand-gold">
            <Sparkles className="w-6 h-6" />
          </div>
          <h2 className="text-3xl font-serif text-[#262626] text-center mb-4 font-medium">The Inner Circle</h2>
          <p className="text-[#262626]/70 text-center mb-8 text-sm leading-relaxed">
            Subscribe for 15% off your first piece, plus early access to new releases and styling guides.
          </p>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input 
              type="email" 
              placeholder="Enter your email address" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              aria-label="Email address"
              className="bg-white border-[#262626]/20 text-[#262626] placeholder:text-[#262626]/40"
            />
            <Button 
              type="submit" 
              className="w-full"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Joining..." : "Unlock 15% Off"}
            </Button>
          </form>
          <button 
            onClick={handleClose}
            className="mt-6 text-xs text-[#262626]/50 hover:text-[#262626] underline text-center w-full transition-colors"
          >
            Maybe later
          </button>
        </div>
      </div>
    </Modal>
  );
}
