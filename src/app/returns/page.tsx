import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { constructMetadata } from "@/lib/seo";
import { RefreshCcw, ShieldCheck, AlertCircle } from "lucide-react";

export const metadata = constructMetadata({
  title: "Returns & Exchanges | Solvia Crystals",
  description: "30-day return policy. Learn about our hassle-free returns process for crystal bracelets.",
  canonicalUrl: "https://solviacrystals.com/returns",
});

export default function ReturnsPage() {
  return (
    <>
      <Navbar />
      <main className="pt-40 pb-24 bg-[#0a0a0a] min-h-screen">
        <div className="container mx-auto px-6 max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-serif text-white mb-4">Returns & Exchanges</h1>
          <p className="text-brand-silver/80 mb-12 text-lg">
            We want you to feel confident in every purchase. If something doesn&apos;t feel right, we&apos;re here to help.
          </p>

          <section className="mb-16">
            <div className="flex items-center mb-6">
              <RefreshCcw className="w-6 h-6 text-brand-gold mr-3" />
              <h2 className="text-2xl font-serif text-white">30-Day Return Policy</h2>
            </div>
            <p className="text-brand-silver/80 leading-relaxed mb-4">
              We offer a 30-day return policy from the date of delivery. Items must be in their original, unworn condition with all packaging and tags intact. Once we receive your return, a full refund will be issued to your original payment method within 5–7 business days.
            </p>
          </section>

          <section className="mb-16">
            <div className="flex items-center mb-6">
              <ShieldCheck className="w-6 h-6 text-brand-gold mr-3" />
              <h2 className="text-2xl font-serif text-white">Exchanges</h2>
            </div>
            <p className="text-brand-silver/80 leading-relaxed mb-4">
              If you&apos;d like to exchange your piece for a different product, please initiate a return and place a new order. This ensures you receive your preferred piece as quickly as possible.
            </p>
          </section>

          <section className="mb-16">
            <h2 className="text-2xl font-serif text-white mb-6">How to Return</h2>
            <div className="space-y-4">
              {[
                { step: "1", text: "Email concierge@solviacrystals.com with your order number and reason for return." },
                { step: "2", text: "We'll send you a prepaid return label within 24 hours." },
                { step: "3", text: "Pack your item securely in its original packaging and drop it off at the nearest shipping location." },
                { step: "4", text: "Once received and inspected, your refund will be processed within 5–7 business days." },
              ].map((item) => (
                <div key={item.step} className="flex gap-4 p-5 bg-[#121212] border border-white/5 rounded-sm">
                  <span className="w-8 h-8 rounded-full bg-brand-gold/20 text-brand-gold text-sm font-bold flex items-center justify-center flex-shrink-0">{item.step}</span>
                  <p className="text-brand-silver/80 text-sm leading-relaxed">{item.text}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <div className="flex items-center mb-6">
              <AlertCircle className="w-6 h-6 text-brand-gold mr-3" />
              <h2 className="text-2xl font-serif text-white">Non-Returnable Items</h2>
            </div>
            <ul className="list-disc list-inside text-brand-silver/80 space-y-2 text-sm">
              <li>Custom or personalised orders</li>
              <li>Items marked as final sale</li>
              <li>Gift cards</li>
            </ul>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
