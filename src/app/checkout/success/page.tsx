"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/Button";
import { CheckCircle, Package, ArrowRight } from "lucide-react";
import Link from "next/link";

function SuccessContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("order") || "SOL-000000";

  return (
    <div className="max-w-xl mx-auto text-center">
      <div className="w-20 h-20 rounded-full bg-brand-gold/10 flex items-center justify-center mx-auto mb-8">
        <CheckCircle className="w-10 h-10 text-brand-gold" />
      </div>

      <h1 className="text-3xl md:text-4xl font-serif text-white mb-4">
        Thank You for Your Order
      </h1>

      <p className="text-brand-silver/80 mb-2 leading-relaxed">
        Your order has been placed successfully. We&apos;ll prepare your pieces with care.
      </p>

      <div className="inline-flex items-center bg-[#121212] border border-white/10 rounded-sm px-6 py-3 mt-6 mb-8">
        <Package className="w-5 h-5 text-brand-gold mr-3" />
        <div className="text-left">
          <p className="text-xs text-brand-silver/60 uppercase tracking-wider">Order Number</p>
          <p className="text-white font-medium tracking-wider">{orderId}</p>
        </div>
      </div>

      <p className="text-sm text-brand-silver/60 mb-10 max-w-md mx-auto">
        You&apos;ll receive a confirmation email shortly with your order details and tracking information once your pieces ship.
      </p>

      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Link href="/shop">
          <Button variant="outline">
            Continue Shopping <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default function CheckoutSuccessPage() {
  return (
    <>
      <Navbar />
      <main className="pt-32 pb-24 bg-[#0a0a0a] min-h-screen flex items-center">
        <div className="container mx-auto px-6">
          <Suspense fallback={null}>
            <SuccessContent />
          </Suspense>
        </div>
      </main>
      <Footer />
    </>
  );
}
