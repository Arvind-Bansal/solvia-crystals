"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/Button";
import { Mail, Clock, CheckCircle } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { submitContactForm } from "@/lib/form-service";
import { analytics } from "@/lib/analytics";
import Link from "next/link";

const contactSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Please enter a valid email"),
  subject: z.string().min(1, "Please select a subject"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormData = z.infer<typeof contactSchema>;

export default function ContactPage() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: { subject: "Order Inquiry" },
  });

  const onSubmit = async (data: ContactFormData) => {
    setStatus("loading");
    setErrorMessage("");

    const result = await submitContactForm(data);

    if (result.success) {
      setStatus("success");
      analytics.track({ name: "contact_form", properties: { subject: data.subject } });
      reset();
    } else {
      setStatus("error");
      setErrorMessage(result.error || "Something went wrong.");
    }
  };

  const inputClass = "w-full bg-transparent border border-white/20 rounded-sm px-4 py-3 text-white focus:outline-none focus:border-brand-gold transition-colors";
  const errorClass = "text-red-400 text-xs mt-1";

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
              {status === "success" ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="w-16 h-16 rounded-full bg-brand-gold/10 flex items-center justify-center mb-6">
                    <CheckCircle className="w-8 h-8 text-brand-gold" />
                  </div>
                  <h3 className="text-xl font-serif text-white mb-2">Message Sent</h3>
                  <p className="text-brand-silver/60 text-sm mb-6 max-w-sm">
                    Thank you for reaching out. We&apos;ll respond within 24 hours.
                  </p>
                  <Button variant="outline" onClick={() => setStatus("idle")}>
                    Send Another Message
                  </Button>
                </div>
              ) : (
                <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm text-brand-silver">First Name</label>
                      <input {...register("firstName")} className={inputClass} />
                      {errors.firstName && <p className={errorClass}>{errors.firstName.message}</p>}
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm text-brand-silver">Last Name</label>
                      <input {...register("lastName")} className={inputClass} />
                      {errors.lastName && <p className={errorClass}>{errors.lastName.message}</p>}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm text-brand-silver">Email Address</label>
                    <input {...register("email")} type="email" className={inputClass} />
                    {errors.email && <p className={errorClass}>{errors.email.message}</p>}
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm text-brand-silver">Subject</label>
                    <select {...register("subject")} className={`${inputClass} appearance-none`}>
                      <option className="bg-[#121212]">Order Inquiry</option>
                      <option className="bg-[#121212]">Styling Guidance</option>
                      <option className="bg-[#121212]">Press / Partnerships</option>
                      <option className="bg-[#121212]">Other</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm text-brand-silver">Message</label>
                    <textarea {...register("message")} rows={5} className={`${inputClass} resize-none`} />
                    {errors.message && <p className={errorClass}>{errors.message.message}</p>}
                  </div>

                  {status === "error" && (
                    <p className="text-red-400 text-sm bg-red-400/10 border border-red-400/20 rounded-sm px-4 py-3">{errorMessage}</p>
                  )}

                  <Button size="lg" className="w-full" disabled={status === "loading"}>
                    {status === "loading" ? "Sending..." : "Send Message"}
                  </Button>
                </form>
              )}
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
                      <p className="text-brand-silver text-sm">Monday – Friday: 10am – 6pm IST</p>
                      <p className="text-brand-silver text-sm">Saturday: 10am – 4pm IST</p>
                    </div>
                  </div>

                </div>
              </div>

              <div className="p-6 bg-gradient-luxury rounded-sm border border-white/10">
                <h4 className="text-white font-medium mb-2">Need help choosing?</h4>
                <p className="text-sm text-brand-silver mb-4">Read our guide to choosing your first crystal — covering intentions, styles, and what to expect.</p>
                <Link href="/blog/choosing-your-first-crystal">
                  <Button variant="outline" className="w-full bg-black/30 border-white/20">Read the Guide</Button>
                </Link>
              </div>
            </motion.div>

          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
