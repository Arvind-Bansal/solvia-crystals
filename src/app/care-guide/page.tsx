import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { constructMetadata } from "@/lib/seo";
import { Sparkles, Droplets, Moon, ShieldCheck } from "lucide-react";

export const metadata = constructMetadata({
  title: "Crystal Care Guide | Solvia Crystals",
  description: "How to care for your crystal bracelets — cleaning, storage, energetic maintenance, and everyday wear tips.",
  canonicalUrl: "https://solviacrystals.com/care-guide",
});

const careTips = [
  {
    icon: Droplets,
    title: "Cleaning",
    tips: [
      "Gently wipe your bracelet with a soft, lint-free cloth after wearing.",
      "Use lukewarm water with mild soap for deeper cleaning. Avoid harsh chemicals.",
      "Pat dry immediately — prolonged water exposure can weaken elastic cords over time.",
      "For metal accents, use a jewellery polishing cloth to restore shine.",
    ],
  },
  {
    icon: Moon,
    title: "Storage",
    tips: [
      "Store each bracelet in its Solvia pouch or a soft-lined jewellery box.",
      "Keep pieces separated to prevent scratching between stones.",
      "Avoid direct sunlight for extended periods — some crystals (amethyst, rose quartz) may fade.",
      "Store in a cool, dry place away from humidity.",
    ],
  },
  {
    icon: ShieldCheck,
    title: "Everyday Wear",
    tips: [
      "Remove your bracelet before swimming, showering, or exercising.",
      "Apply perfume, lotion, and hairspray before putting on your bracelet.",
      "Avoid sleeping in your bracelet to prevent cord stretching.",
      "Crystal bracelets are durable but not indestructible — treat them with care.",
    ],
  },
  {
    icon: Sparkles,
    title: "Energetic Care",
    tips: [
      "Cleanse your crystals periodically by placing them on a selenite plate overnight.",
      "Moonlight bathing during a full moon is a traditional method for recharging stones.",
      "Set your intention by holding your bracelet and focusing on what it means to you.",
      "Trust your instinct — if a stone feels heavy, give it time to rest.",
    ],
  },
];

export default function CareGuidePage() {
  return (
    <>
      <Navbar />
      <main className="pt-40 pb-24 bg-[#F8F5EF] min-h-screen text-[#262626]">
        <div className="container mx-auto px-6 max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-serif text-[#262626] mb-4 font-medium">Crystal Care Guide</h1>
          <p className="text-[#262626]/70 mb-16 text-lg">
            Your Solvia bracelet is designed for everyday wear. With a little care, it will maintain its beauty and presence for years to come.
          </p>

          <div className="space-y-16">
            {careTips.map((section) => (
              <section key={section.title}>
                <div className="flex items-center mb-6">
                  <section.icon className="w-6 h-6 text-brand-gold mr-3" />
                  <h2 className="text-2xl font-serif text-[#262626] font-medium">{section.title}</h2>
                </div>
                <ul className="space-y-4">
                  {section.tips.map((tip, idx) => (
                    <li key={idx} className="flex gap-4 text-[#262626]/80 text-sm leading-relaxed">
                      <span className="text-brand-gold/60 mt-1">•</span>
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
