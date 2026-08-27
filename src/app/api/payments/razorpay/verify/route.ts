// ─── POST /api/payments/razorpay/verify ─────────────────────────────────────
// Verifies a Razorpay payment server-side using HMAC-SHA256 signature,
// then updates the order record in Supabase and triggers the confirmation email.
//
// Security:
//   • Signature is verified cryptographically before any DB write.
//   • The stored razorpay_order_id is cross-checked against what Razorpay sent
//     to prevent an attacker substituting a different internalOrderId.
//   • Cart is NOT cleared from the server — the frontend does it only after
//     receiving { verified: true }.
//
// Idempotency:
//   • If the order is already "paid", returns success without re-writing.
//   • email_sent_at prevents duplicate confirmation emails even if both
//     this route and the webhook fire for the same payment.

import { NextRequest, NextResponse } from "next/server";
import { RazorpayProvider } from "@/lib/payments/razorpay";
import { getOrderById, markOrderPaid } from "@/lib/db/orders";
import { sendOrderConfirmationIfNotSent } from "@/lib/order-mailer";

interface VerifyRequest {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
  /** Internal Solvia order ID (SOL-XXXXXX) */
  internalOrderId: string;
}

export async function POST(req: NextRequest) {
  // ── 1. Parse body ────────────────────────────────────────────────────
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

  if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature || !internalOrderId) {
    return NextResponse.json(
      { error: "Missing required payment verification fields." },
      { status: 400 }
    );
  }

  // ── 2. Cryptographic signature verification ──────────────────────────
  //    HMAC-SHA256(razorpay_order_id + "|" + razorpay_payment_id, KEY_SECRET)
  //    This uses RAZORPAY_KEY_SECRET — server-only, never exposed to the client.
  const provider = new RazorpayProvider();

  const signatureResult = await provider.verifyPayment({
    providerOrderId: razorpay_order_id,
    paymentId: razorpay_payment_id,
    signature: razorpay_signature,
  });

  if (!signatureResult.success) {
    console.warn("[verify] Signature mismatch — possible tampered request:", {
      razorpay_order_id,
      razorpay_payment_id,
    });
    return NextResponse.json(
      { error: signatureResult.error || "Payment verification failed." },
      { status: 400 }
    );
  }

  // ── 3. Look up the order in the database ─────────────────────────────
  let dbOrder;
  try {
    dbOrder = await getOrderById(internalOrderId);
  } catch (err) {
    console.error("[verify] Database lookup failed:", err);
    return NextResponse.json(
      { error: "Order lookup failed. Please contact support." },
      { status: 500 }
    );
  }

  if (!dbOrder) {
    console.error("[verify] Order not found in database:", internalOrderId);
    return NextResponse.json({ error: "Order not found." }, { status: 404 });
  }

  // ── 4. Cross-check Razorpay order ID ─────────────────────────────────
  //    Prevents an attacker from pairing a valid payment_id with a
  //    different internalOrderId to falsely mark another order as paid.
  if (dbOrder.razorpay_order_id !== razorpay_order_id) {
    console.warn("[verify] Razorpay order ID mismatch:", {
      stored: dbOrder.razorpay_order_id,
      received: razorpay_order_id,
      internalOrderId,
    });
    return NextResponse.json({ error: "Order ID mismatch." }, { status: 400 });
  }

  // ── 5. Idempotency: already paid ──────────────────────────────────────
  if (dbOrder.payment_status === "paid") {
    console.info("[verify] Order already verified (idempotent):", internalOrderId);
    return NextResponse.json({
      verified: true,
      internalOrderId,
      paymentId: dbOrder.razorpay_payment_id,
    });
  }

  // ── 6. Mark order as paid in the database ─────────────────────────────
  try {
    await markOrderPaid(internalOrderId, razorpay_payment_id);
    console.info("[verify] Payment verified and order marked paid:", {
      internalOrderId,
      razorpay_payment_id,
    });
  } catch (dbErr) {
    console.error("[verify] Failed to update order status:", dbErr);
    return NextResponse.json(
      { error: "Payment verified but order update failed. Please contact support." },
      { status: 500 }
    );
  }

  // ── 7. Send confirmation email ────────────────────────────────────────
  //    Idempotent — checks email_sent_at before sending.
  //    If email fails, the order remains paid. We log but do NOT throw.
  //    The webhook may also trigger this — only one call will actually send.
  sendOrderConfirmationIfNotSent(internalOrderId).catch((err) => {
    console.error("[verify] Unexpected error in email send:", err);
  });

  // ── 8. Return success ─────────────────────────────────────────────────
  //    The frontend clears the cart and redirects to /checkout/success
  //    only upon receiving this response.
  return NextResponse.json({
    verified: true,
    internalOrderId,
    paymentId: razorpay_payment_id,
  });
}
