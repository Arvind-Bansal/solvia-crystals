"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Script from "next/script";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";
import { useCartStore } from "@/store/useCartStore";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { ShoppingBag, ChevronRight, ShieldCheck, Truck, RefreshCcw } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";
import { analytics } from "@/lib/analytics";
import { formatPrice, FREE_SHIPPING_THRESHOLD, getShippingCost, calculateTax } from "@/lib/currency";
import { PAYMENT_CONFIG } from "@/lib/payments/config";

const checkoutSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  address: z.string().min(1, "Address is required"),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State / Province is required"),
  zip: z.string().min(1, "Postal code is required"),
  country: z.string().min(1, "Country is required"),
  phone: z.string().optional(),
});

type CheckoutFormData = z.infer<typeof checkoutSchema>;

export default function CheckoutPage() {
  const router = useRouter();
  const { items, getCartTotal, clearCart } = useCartStore();
  const [mounted, setMounted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [couponCode, setCouponCode] = useState("");
  const [razorpayReady, setRazorpayReady] = useState(false);

  const subtotal = getCartTotal();
  const shipping = getShippingCost(subtotal);
  const tax = calculateTax(subtotal);
  const total = subtotal + shipping + tax;

  /* eslint-disable react-hooks/exhaustive-deps, react-hooks/set-state-in-effect */
  useEffect(() => {
    setMounted(true);
    analytics.track({ name: "checkout_start", properties: { itemCount: items.length, total: subtotal } });
  }, []);
  /* eslint-enable react-hooks/exhaustive-deps, react-hooks/set-state-in-effect */

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: { country: "India" },
  });

  const onSubmit = async (data: CheckoutFormData) => {
    if (!razorpayReady) {
      toast.error("Payment gateway is still loading. Please try again in a moment.");
      return;
    }

    setIsSubmitting(true);

    try {
      // ── Step 1: Create Razorpay order server-side ──
      // The server re-validates all items and recalculates totals.
      const createRes = await fetch("/api/payments/razorpay/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: items.map((i) => ({
            productId: i.product.id,
            quantity: i.quantity,
          })),
          customer: {
            email: data.email,
            firstName: data.firstName,
            lastName: data.lastName,
            phone: data.phone,
          },
        }),
      });

      const orderData = await createRes.json();

      if (!createRes.ok) {
        toast.error(orderData.error || "Could not create order. Please try again.");
        setIsSubmitting(false);
        return;
      }

      const { razorpayOrderId, amount, currency, keyId, internalOrderId } = orderData;

      // ── Step 2: Open Razorpay checkout modal ──
      const rzp = new window.Razorpay({
        key: keyId,
        amount,
        currency,
        name: PAYMENT_CONFIG.merchantName,
        description: PAYMENT_CONFIG.merchantDescription,
        image: PAYMENT_CONFIG.merchantLogo,
        order_id: razorpayOrderId,
        prefill: {
          name: `${data.firstName} ${data.lastName}`,
          email: data.email,
          contact: data.phone || "",
        },
        notes: {
          address: `${data.address}, ${data.city}, ${data.state} ${data.zip}, ${data.country}`,
          internalOrderId,
        },
        theme: {
          color: PAYMENT_CONFIG.themeColor,
        },
        modal: {
          ondismiss: () => {
            toast("Payment was cancelled. Your cart has been preserved.");
            setIsSubmitting(false);
          },
        },
        handler: async (response) => {
          // ── Step 3: Verify payment server-side ──
          // NEVER clear cart here — only after verified.
          try {
            const verifyRes = await fetch("/api/payments/razorpay/verify", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                internalOrderId,
              }),
            });

            const verifyData = await verifyRes.json();

            if (!verifyRes.ok || !verifyData.verified) {
              toast.error(
                verifyData.error ||
                  "Payment could not be verified. Please contact support with your payment ID: " +
                    response.razorpay_payment_id
              );
              setIsSubmitting(false);
              return;
            }

            // ── Step 4: Payment verified — clear cart and redirect ──
            analytics.track({
              name: "purchase",
              properties: {
                orderId: internalOrderId,
                paymentId: response.razorpay_payment_id,
                total: total,
                itemCount: items.length,
                items: items.map((i) => ({
                  name: i.product.name,
                  quantity: i.quantity,
                  price: i.product.price,
                })),
                customer: { email: data.email, city: data.city, country: data.country },
              },
            });

            clearCart();
            router.push(`/checkout/success?order=${internalOrderId}&payment=${response.razorpay_payment_id}`);
          } catch {
            toast.error(
              "Payment verification failed due to a network error. If your payment was deducted, please contact us with your payment ID: " +
                response.razorpay_payment_id
            );
            setIsSubmitting(false);
          }
        },
      });

      rzp.open();
    } catch {
      toast.error("Something went wrong. Please try again.");
      setIsSubmitting(false);
    }
  };

  const inputClass =
    "w-full bg-transparent border border-white/20 rounded-sm px-4 py-3 text-white text-sm focus:outline-none focus:border-brand-gold transition-colors placeholder:text-brand-silver/30";
  const errorClass = "text-red-400 text-xs mt-1";

  if (!mounted) return null;

  if (items.length === 0) {
    return (
      <>
        <Navbar />
        <main className="pt-32 pb-24 bg-[#0a0a0a] min-h-screen">
          <div className="container mx-auto px-6">
            <EmptyState
              icon={ShoppingBag}
              title="Nothing to checkout"
              description="Your cart is empty. Add some pieces before checking out."
              cta={{ label: "Browse Shop", href: "/shop" }}
            />
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      {/* Load Razorpay checkout.js */}
      <Script
        src="https://checkout.razorpay.com/v1/checkout.js"
        strategy="afterInteractive"
        onLoad={() => setRazorpayReady(true)}
        onError={() => {
          console.error("Failed to load Razorpay checkout script.");
        }}
      />

      <Navbar />
      <main className="pt-32 pb-24 bg-[#0a0a0a] min-h-screen">
        <div className="container mx-auto px-6">
          {/* Breadcrumbs */}
          <div className="text-xs text-brand-silver/60 uppercase tracking-widest mb-8 flex items-center space-x-2">
            <Link href="/shop" className="hover:text-white transition-colors">Shop</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-brand-gold">Checkout</span>
          </div>

          <h1 className="text-3xl md:text-4xl font-serif text-white mb-12">Checkout</h1>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
              {/* Left — Form */}
              <div className="flex-1 space-y-10">
                {/* Contact */}
                <section>
                  <h2 className="text-lg font-serif text-white mb-6 flex items-center">
                    <span className="w-7 h-7 rounded-full bg-brand-gold/20 text-brand-gold text-xs font-bold flex items-center justify-center mr-3">1</span>
                    Contact
                  </h2>
                  <div className="space-y-4">
                    <div>
                      <input {...register("email")} type="email" placeholder="Email address" className={inputClass} />
                      {errors.email && <p className={errorClass}>{errors.email.message}</p>}
                    </div>
                  </div>
                </section>

                {/* Shipping */}
                <section>
                  <h2 className="text-lg font-serif text-white mb-6 flex items-center">
                    <span className="w-7 h-7 rounded-full bg-brand-gold/20 text-brand-gold text-xs font-bold flex items-center justify-center mr-3">2</span>
                    Shipping Address
                  </h2>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <input {...register("firstName")} placeholder="First name" className={inputClass} />
                        {errors.firstName && <p className={errorClass}>{errors.firstName.message}</p>}
                      </div>
                      <div>
                        <input {...register("lastName")} placeholder="Last name" className={inputClass} />
                        {errors.lastName && <p className={errorClass}>{errors.lastName.message}</p>}
                      </div>
                    </div>
                    <div>
                      <input {...register("address")} placeholder="Address" className={inputClass} />
                      {errors.address && <p className={errorClass}>{errors.address.message}</p>}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <input {...register("city")} placeholder="City" className={inputClass} />
                        {errors.city && <p className={errorClass}>{errors.city.message}</p>}
                      </div>
                      <div>
                        <input {...register("state")} placeholder="State / Province" className={inputClass} />
                        {errors.state && <p className={errorClass}>{errors.state.message}</p>}
                      </div>
                      <div>
                        <input {...register("zip")} placeholder="Postal code" className={inputClass} />
                        {errors.zip && <p className={errorClass}>{errors.zip.message}</p>}
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <input {...register("country")} placeholder="Country" className={inputClass} />
                        {errors.country && <p className={errorClass}>{errors.country.message}</p>}
                      </div>
                      <div>
                        <input {...register("phone")} type="tel" placeholder="Phone (optional)" className={inputClass} />
                      </div>
                    </div>
                  </div>
                </section>

                {/* Coupon */}
                <section>
                  <h2 className="text-lg font-serif text-white mb-6 flex items-center">
                    <span className="w-7 h-7 rounded-full bg-brand-gold/20 text-brand-gold text-xs font-bold flex items-center justify-center mr-3">3</span>
                    Discount Code
                  </h2>
                  <div className="flex gap-3">
                    <input
                      type="text"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      placeholder="Enter discount code"
                      className={`flex-1 ${inputClass}`}
                    />
                    <Button type="button" variant="outline" className="flex-shrink-0" disabled>
                      Apply
                    </Button>
                  </div>
                  <p className="text-xs text-brand-silver/40 mt-2">Discount codes will be available at launch.</p>
                </section>

                {/* Trust Signals */}
                <div className="flex flex-wrap gap-6 pt-4 border-t border-white/5">
                  <div className="flex items-center text-xs text-brand-silver/60">
                    <ShieldCheck className="w-4 h-4 mr-2 text-brand-gold" /> Secure checkout
                  </div>
                  <div className="flex items-center text-xs text-brand-silver/60">
                    <Truck className="w-4 h-4 mr-2 text-brand-gold" /> Free shipping over {formatPrice(FREE_SHIPPING_THRESHOLD)}
                  </div>
                  <div className="flex items-center text-xs text-brand-silver/60">
                    <RefreshCcw className="w-4 h-4 mr-2 text-brand-gold" /> 30-day returns
                  </div>
                </div>
              </div>

              {/* Right — Order Summary */}
              <div className="w-full lg:w-[380px] flex-shrink-0">
                <div className="bg-[#121212] border border-white/10 rounded-sm p-6 lg:sticky lg:top-28">
                  <h2 className="text-lg font-serif text-white mb-6">Order Summary</h2>

                  <div className="space-y-4 mb-6 max-h-[40vh] overflow-y-auto">
                    {items.map((item) => (
                      <div key={item.product.id} className="flex gap-4">
                        <div className="relative w-16 h-16 rounded-sm overflow-hidden border border-white/5 flex-shrink-0 bg-[#1a1a1a]">
                          <Image
                            src={item.product.images.primary}
                            alt={item.product.name}
                            fill
                            sizes="64px"
                            className="object-cover"
                          />
                          <span className="absolute -top-1 -right-1 bg-brand-gold text-black text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center">
                            {item.quantity}
                          </span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-white text-sm font-medium truncate">{item.product.name}</p>
                          <p className="text-xs text-brand-silver/50">{item.product.intention}</p>
                        </div>
                        <span className="text-white text-sm flex-shrink-0">
                          {formatPrice(item.product.price * item.quantity)}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-3 pt-4 border-t border-white/10 text-sm">
                    <div className="flex justify-between text-brand-silver">
                      <span>Subtotal</span>
                      <span>{formatPrice(subtotal)}</span>
                    </div>
                    <div className="flex justify-between text-brand-silver">
                      <span>Shipping</span>
                      <span>{shipping === 0 ? "Free" : formatPrice(shipping)}</span>
                    </div>
                    <div className="flex justify-between text-brand-silver">
                      <span>Tax (GST)</span>
                      <span>{formatPrice(tax)}</span>
                    </div>
                    <div className="flex justify-between text-white font-medium text-base pt-3 border-t border-white/10">
                      <span>Total</span>
                      <span>{formatPrice(total)}</span>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    className="w-full mt-6"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Processing..." : `Pay · ${formatPrice(total)}`}
                  </Button>

                  <p className="text-[10px] text-brand-silver/40 text-center mt-4 leading-relaxed">
                    By placing this order you agree to our{" "}
                    <Link href="/terms" className="underline hover:text-white">Terms of Service</Link>{" "}and{" "}
                    <Link href="/privacy" className="underline hover:text-white">Privacy Policy</Link>.
                  </p>
                </div>
              </div>
            </div>
          </form>
        </div>
      </main>
      <Footer />
    </>
  );
}
