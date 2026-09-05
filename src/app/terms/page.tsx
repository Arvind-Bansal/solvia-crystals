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
      <main className="pt-40 pb-24 bg-[#F8F5EF] min-h-screen text-[#262626]">
        <div className="container mx-auto px-6 max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-serif text-[#262626] mb-8 font-medium">Terms of Service</h1>
          <div className="prose prose-brand max-w-none text-[#262626]/80 prose-headings:text-[#262626] prose-headings:font-serif">
            <p className="mb-6">Last updated: May 2026</p>
            
            <h2 className="text-2xl font-serif text-[#262626] mt-8 mb-4 font-medium">1. Product Disclaimer</h2>
            <p className="mb-4">The symbolic and traditional properties discussed on Solvia Crystals are for cultural and educational purposes only. Crystal jewellery is not a substitute for professional medical or psychological treatment. If you are experiencing health issues, please consult a qualified healthcare provider.</p>
            
            <h2 className="text-2xl font-serif text-[#262626] mt-8 mb-4 font-medium">2. Product Variations</h2>
            <p className="mb-4">Because crystals are natural formations, each piece is entirely unique. The products you receive may vary slightly in colour, size, and pattern from the images shown on our website.</p>
            
            <h2 className="text-2xl font-serif text-[#262626] mt-8 mb-4 font-medium">3. Returns & Refunds</h2>
            <p className="mb-4">We offer a 30-day return policy for items in their original, unworn condition with all packaging intact. Returned items are inspected and cleaned before being restocked.</p>
            
            <h2 className="text-2xl font-serif text-[#262626] mt-8 mb-4 font-medium">4. Intellectual Property</h2>
            <p className="mb-4">All content, designs, images, and text on this website are the intellectual property of Solvia Crystals and may not be reproduced without explicit written consent.</p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
