import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { constructMetadata } from "@/lib/seo";
import { Truck, Clock, Globe, ShieldCheck } from "lucide-react";

export const metadata = constructMetadata({
  title: "Shipping Information | Solvia Crystals",
  description: "Free shipping on orders over $150. Learn about our shipping methods, processing times, and international delivery options.",
  canonicalUrl: "https://solviacrystals.com/shipping",
});

const shippingMethods = [
  { name: "Standard Shipping", time: "5–8 business days", cost: "$12", note: "Free on orders over $150" },
  { name: "Express Shipping", time: "2–3 business days", cost: "$24", note: "" },
  { name: "Overnight", time: "1 business day", cost: "$45", note: "Order by 12pm EST" },
];

export default function ShippingPage() {
  return (
    <>
      <Navbar />
      <main className="pt-40 pb-24 bg-[#0a0a0a] min-h-screen">
        <div className="container mx-auto px-6 max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-serif text-white mb-4">Shipping</h1>
          <p className="text-brand-silver/80 mb-12 text-lg">
            Every order is prepared by hand and shipped with care. Here&apos;s what to expect.
          </p>

          {/* Processing */}
          <section className="mb-16">
            <div className="flex items-center mb-6">
              <Clock className="w-6 h-6 text-brand-gold mr-3" />
              <h2 className="text-2xl font-serif text-white">Processing Time</h2>
            </div>
            <p className="text-brand-silver/80 leading-relaxed">
              Orders are processed within 1–2 business days. During peak seasons or launches, processing may take up to 3 business days. You&apos;ll receive a confirmation email with tracking information once your order ships.
            </p>
          </section>

          {/* Methods */}
          <section className="mb-16">
            <div className="flex items-center mb-6">
              <Truck className="w-6 h-6 text-brand-gold mr-3" />
              <h2 className="text-2xl font-serif text-white">Shipping Methods</h2>
            </div>
            <div className="space-y-4">
              {shippingMethods.map((method) => (
                <div key={method.name} className="flex items-center justify-between p-5 bg-[#121212] border border-white/5 rounded-sm">
                  <div>
                    <p className="text-white font-medium">{method.name}</p>
                    <p className="text-sm text-brand-silver/60">{method.time}</p>
                    {method.note && <p className="text-xs text-brand-gold mt-1">{method.note}</p>}
                  </div>
                  <span className="text-white font-medium">{method.cost}</span>
                </div>
              ))}
            </div>
          </section>

          {/* International */}
          <section className="mb-16">
            <div className="flex items-center mb-6">
              <Globe className="w-6 h-6 text-brand-gold mr-3" />
              <h2 className="text-2xl font-serif text-white">International Shipping</h2>
            </div>
            <p className="text-brand-silver/80 leading-relaxed mb-4">
              We ship worldwide. International orders typically arrive within 7–14 business days depending on your location. Import duties and taxes are the responsibility of the buyer and are not included in the order total.
            </p>
          </section>

          {/* Packaging */}
          <section>
            <div className="flex items-center mb-6">
              <ShieldCheck className="w-6 h-6 text-brand-gold mr-3" />
              <h2 className="text-2xl font-serif text-white">Packaging</h2>
            </div>
            <p className="text-brand-silver/80 leading-relaxed">
              Each bracelet ships in our signature branded box with a soft pouch, care card, and stone guide. Gift wrapping is available at checkout for $5.
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
