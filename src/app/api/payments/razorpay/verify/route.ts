// ─── POST /api/payments/razorpay/verify ────────
// Verifies a Razorpay payment server-side using HMAC-SHA256 signature.
//
// Security: NEVER mark a payment as successful based solely on
// the frontend claiming success. This route performs the authoritative
// server-side cryptographic verification.
//
// Called by the checkout page after Razorpay's handler callback fires.

import { NextRequest, NextResponse } from "next/server";
import { RazorpayProvider } from "@/lib/payments/razorpay";

interface VerifyRequest {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
  /** Internal Solvia order ID (SOL-XXXXXX) */
  internalOrderId: string;
}

export async function POST(req: NextRequest) {
  // ── 1. Parse body ─────────────────────────
  let body: VerifyRequest;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const {
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature,
    internalOrderId,
  } = body;

  if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
    return NextResponse.json(
      { error: "Missing required payment verification fields." },
      { status: 400 }
    );
  }

  // ── 2. Verify signature ───────────────────
  const provider = new RazorpayProvider();

  const result = await provider.verifyPayment({
    providerOrderId: razorpay_order_id,
    paymentId: razorpay_payment_id,
    signature: razorpay_signature,
  });

  if (!result.success) {
    console.warn("[verify] Payment signature mismatch:", {
      razorpay_order_id,
      razorpay_payment_id,
    });
    return NextResponse.json(
      { error: result.error || "Payment verification failed." },
      { status: 400 }
    );
  }

  // ── 3. Payment is verified ────────────────
  // At this point the payment is cryptographically confirmed.
  //
  // TODO (production): Persist the order to your database here:
  //   - Create/update order record with paymentStatus: "paid"
  //   - Store razorpay_payment_id and internalOrderId
  //   - Trigger confirmation email via your email service
  //
  // This project currently uses a client-side data layer (no DB).
  // The order ID and payment ID are returned to the frontend,
  // which then redirects to the success page.

  console.info("[verify] Payment verified:", {
    internalOrderId,
    razorpay_order_id,
    razorpay_payment_id,
  });

  return NextResponse.json({
    verified: true,
    internalOrderId,
    paymentId: razorpay_payment_id,
  });
}
