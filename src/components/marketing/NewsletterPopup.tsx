"use client";

import { useState, useEffect } from "react";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Sparkles } from "lucide-react";
import { toast } from "sonner";
import Image from "next/image";

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      handleClose();
      toast.success("Welcome! Check your inbox for your 15% off code.");
    }, 1000);
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose}>
      <div className="flex flex-col md:flex-row bg-[#0a0a0a] rounded-sm overflow-hidden max-w-3xl w-full">
        <div className="hidden md:block relative w-1/2 aspect-square">
          <Image 
            src="https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=800&auto=format&fit=crop"
            alt="Crystal Collection"
            fill
            className="object-cover"
          />
        </div>
        <div className="flex-1 p-8 md:p-12 flex flex-col justify-center">
          <div className="flex items-center justify-center mb-4 text-brand-gold">
            <Sparkles className="w-6 h-6" />
          </div>
          <h2 className="text-3xl font-serif text-white text-center mb-4">The Inner Circle</h2>
          <p className="text-brand-silver/80 text-center mb-8 text-sm leading-relaxed">
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
              className="bg-transparent border-white/20 text-white placeholder:text-brand-silver/50"
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
            className="mt-6 text-xs text-brand-silver/60 hover:text-white underline text-center w-full transition-colors"
          >
            Maybe later
          </button>
        </div>
      </div>
    </Modal>
  );
}
