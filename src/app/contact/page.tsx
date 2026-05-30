"use client";

import { motion } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/Button";
import { MapPin, Mail, Clock } from "lucide-react";

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1 pt-32 pb-24 bg-[#0a0a0a] min-h-screen">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-2xl mx-auto mb-16"
          >
            <h1 className="text-4xl md:text-5xl font-serif text-white mb-4">Connect With Us</h1>
            <p className="text-brand-silver/80">
              Have a question about a piece, or need help finding the right crystal for your intention? Our concierges are here to assist you.
            </p>
          </motion.div>

          <div className="flex flex-col lg:flex-row gap-16 max-w-5xl mx-auto">
            
            {/* Contact Form */}
            <motion.div 
              className="w-full lg:w-3/5 bg-[#121212] p-8 md:p-10 rounded-sm border border-white/5"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm text-brand-silver">First Name</label>
                    <input 
                      type="text" 
                      className="w-full bg-transparent border border-white/20 rounded-sm px-4 py-3 text-white focus:outline-none focus:border-brand-gold transition-colors"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm text-brand-silver">Last Name</label>
                    <input 
                      type="text" 
                      className="w-full bg-transparent border border-white/20 rounded-sm px-4 py-3 text-white focus:outline-none focus:border-brand-gold transition-colors"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm text-brand-silver">Email Address</label>
                  <input 
                    type="email" 
                    className="w-full bg-transparent border border-white/20 rounded-sm px-4 py-3 text-white focus:outline-none focus:border-brand-gold transition-colors"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm text-brand-silver">Subject</label>
                  <select className="w-full bg-transparent border border-white/20 rounded-sm px-4 py-3 text-white focus:outline-none focus:border-brand-gold transition-colors appearance-none">
                    <option className="bg-[#121212]">Order Inquiry</option>
                    <option className="bg-[#121212]">Styling Guidance</option>
                    <option className="bg-[#121212]">Press / Partnerships</option>
                    <option className="bg-[#121212]">Other</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm text-brand-silver">Message</label>
                  <textarea 
                    rows={5}
                    className="w-full bg-transparent border border-white/20 rounded-sm px-4 py-3 text-white focus:outline-none focus:border-brand-gold transition-colors resize-none"
                    required
                  ></textarea>
                </div>
                <Button size="lg" className="w-full">Send Message</Button>
              </form>
            </motion.div>

            {/* Contact Info */}
            <motion.div 
              className="w-full lg:w-2/5 space-y-10"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <div>
                <h3 className="text-2xl font-serif text-white mb-6">Reach Out</h3>
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <Mail className="w-6 h-6 text-brand-gold mt-1" />
                    <div>
                      <p className="text-white font-medium mb-1">Email</p>
                      <p className="text-brand-silver text-sm">concierge@solviacrystals.com</p>
                      <p className="text-brand-silver/60 text-xs mt-1">We aim to reply within 24 hours.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <Clock className="w-6 h-6 text-brand-gold mt-1" />
                    <div>
                      <p className="text-white font-medium mb-1">Hours</p>
                      <p className="text-brand-silver text-sm">Monday - Friday: 9am - 6pm EST</p>
                      <p className="text-brand-silver text-sm">Saturday: 10am - 4pm EST</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <MapPin className="w-6 h-6 text-brand-gold mt-1" />
                    <div>
                      <p className="text-white font-medium mb-1">Studio</p>
                      <p className="text-brand-silver text-sm">42 Crosby Street, Suite 4B</p>
                      <p className="text-brand-silver text-sm">New York, NY 10012</p>
                      <p className="text-brand-silver/60 text-xs mt-1">By appointment only.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6 bg-gradient-luxury rounded-sm border border-white/10">
                <h4 className="text-white font-medium mb-2">Need help choosing?</h4>
                <p className="text-sm text-brand-silver mb-4">Read our guide to choosing your first crystal — covering intentions, styles, and what to expect.</p>
                <Button variant="outline" className="w-full bg-black/30 border-white/20">Read the Guide</Button>
              </div>
            </motion.div>

          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
