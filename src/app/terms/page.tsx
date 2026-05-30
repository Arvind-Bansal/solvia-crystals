import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { constructMetadata } from "@/lib/seo";

export const metadata = constructMetadata({
  title: "Terms of Service | Solvia Crystals",
  canonicalUrl: "https://solviacrystals.com/terms",
});

export default function TermsPage() {
  return (
    <>
      <Navbar />
      <main className="pt-40 pb-24 bg-[#0a0a0a] min-h-screen">
        <div className="container mx-auto px-6 max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-serif text-white mb-8">Terms of Service</h1>
          <div className="prose prose-invert prose-brand max-w-none text-brand-silver/80">
            <p className="mb-6">Last updated: May 2026</p>
            
            <h2 className="text-2xl font-serif text-white mt-8 mb-4">1. Product Disclaimer</h2>
            <p className="mb-4">The symbolic and traditional properties discussed on Solvia Crystals are for cultural and educational purposes only. Crystal jewellery is not a substitute for professional medical or psychological treatment. If you are experiencing health issues, please consult a qualified healthcare provider.</p>
            
            <h2 className="text-2xl font-serif text-white mt-8 mb-4">2. Product Variations</h2>
            <p className="mb-4">Because crystals are natural formations, each piece is entirely unique. The products you receive may vary slightly in colour, size, and pattern from the images shown on our website.</p>
            
            <h2 className="text-2xl font-serif text-white mt-8 mb-4">3. Returns & Refunds</h2>
            <p className="mb-4">We offer a 30-day return policy for items in their original, unworn condition with all packaging intact. Returned items are inspected and cleaned before being restocked.</p>
            
            <h2 className="text-2xl font-serif text-white mt-8 mb-4">4. Intellectual Property</h2>
            <p className="mb-4">All content, designs, images, and text on this website are the intellectual property of Solvia Crystals and may not be reproduced without explicit written consent.</p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
