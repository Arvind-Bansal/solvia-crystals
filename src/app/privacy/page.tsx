import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { constructMetadata } from "@/lib/seo";

export const metadata = constructMetadata({
  title: "Privacy Policy | Solvia Crystals",
  canonicalUrl: "https://solviacrystals.com/privacy",
});

export default function PrivacyPage() {
  return (
    <>
      <Navbar />
      <main className="pt-40 pb-24 bg-[#F8F5EF] min-h-screen text-[#262626]">
        <div className="container mx-auto px-6 max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-serif text-[#262626] mb-8 font-medium">Privacy Policy</h1>
          <div className="prose prose-brand max-w-none text-[#262626]/80 prose-headings:text-[#262626] prose-headings:font-serif">
            <p className="mb-6">Last updated: May 2026</p>
            
            <h2 className="text-2xl font-serif text-[#262626] mt-8 mb-4 font-medium">1. Information We Collect</h2>
            <p className="mb-4">We collect information that you provide directly to us, including your name, email address, postal address, phone number, and payment information when you place an order or subscribe to our newsletter.</p>
            
            <h2 className="text-2xl font-serif text-[#262626] mt-8 mb-4 font-medium">2. How We Use Your Information</h2>
            <p className="mb-4">We use the information we collect to fulfill your orders, communicate with you about products and promotions, and improve our website and services.</p>
            
            <h2 className="text-2xl font-serif text-[#262626] mt-8 mb-4 font-medium">3. Information Sharing</h2>
            <p className="mb-4">We do not sell or rent your personal information to third parties. We may share your information with trusted third-party service providers who assist us in operating our website and fulfilling orders.</p>
            
            <h2 className="text-2xl font-serif text-[#262626] mt-8 mb-4 font-medium">4. Security</h2>
            <p className="mb-4">We implement reasonable security measures to protect your personal information. However, no method of transmission over the Internet is 100% secure.</p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
