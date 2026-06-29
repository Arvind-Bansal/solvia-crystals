import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/Button";
import { constructMetadata } from "@/lib/seo";

export const metadata = constructMetadata({
  title: "Page Not Found",
  description: "The page you're looking for doesn't exist or has been moved.",
  noIndex: true,
});

export default function NotFound() {
  return (
    <>
      <Navbar />
      <main className="pt-40 pb-24 bg-[#0a0a0a] min-h-screen flex items-center justify-center">
        <div className="container mx-auto px-6 text-center max-w-lg">
          <p className="text-brand-gold text-sm uppercase tracking-[0.3em] mb-4 font-medium">404</p>
          <h1 className="text-4xl md:text-5xl font-serif text-white mb-6">Page Not Found</h1>
          <p className="text-brand-silver/80 mb-10 leading-relaxed">
            The page you&apos;re looking for doesn&apos;t exist or has been moved. Let us help you find your way.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/shop">
              <Button size="lg" className="w-full sm:w-auto min-w-[180px]">
                Browse Collection
              </Button>
            </Link>
            <Link href="/">
              <Button variant="outline" size="lg" className="w-full sm:w-auto min-w-[180px]">
                Back to Home
              </Button>
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
