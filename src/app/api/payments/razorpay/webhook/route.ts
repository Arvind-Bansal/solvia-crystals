// ─── POST /api/payments/razorpay/webhook ───────
// Handles Razorpay webhook events.
//
// Security:
//   - Verifies the X-Razorpay-Signature header using RAZORPAY_WEBHOOK_SECRET
//   - Responds 200 immediately to acknowledge receipt (Razorpay requires this)
//   - Processing happens after acknowledgement
//
// Idempotency:
//   - Checks event type before acting
//   - Safe to receive the same event multiple times
//
// To configure:
//   1. Go to Razorpay Dashboard > Webhooks
//   2. Add your webhook URL: https://yourdomain.com/api/payments/razorpay/webhook
//   3. Select events: payment.captured, payment.failed, order.paid
//   4. Copy the webhook secret to RAZORPAY_WEBHOOK_SECRET in your .env.local
//
// NOTE: Next.js App Router requires the raw request body for HMAC verification.
// This route reads the body as text before parsing JSON.

import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { PAYMENT_ENV } from "@/lib/payments/config";
import { RazorpayProvider } from "@/lib/payments/razorpay";

export async function POST(req: NextRequest) {
  // ── 1. Read raw body (required for HMAC verification) ──
  const rawBody = await req.text();

  // ── 2. Verify webhook signature ───────────
  const signature = req.headers.get("x-razorpay-signature");

  if (!signature) {
    console.warn("[webhook] Missing X-Razorpay-Signature header.");
    return NextResponse.json({ error: "Missing signature." }, { status: 400 });
  }

  if (!PAYMENT_ENV.razorpay.webhookSecret) {
    console.error("[webhook] RAZORPAY_WEBHOOK_SECRET is not set. Rejecting webhook.");
    return NextResponse.json({ error: "Webhook not configured." }, { status: 503 });
  }

  const expectedSignature = crypto
    .createHmac("sha256", PAYMENT_ENV.razorpay.webhookSecret)
    .update(rawBody)
    .digest("hex");

  if (expectedSignature !== signature) {
    console.warn("[webhook] Signature mismatch — possible spoofed request.");
    return NextResponse.json({ error: "Invalid signature." }, { status: 400 });
  }

  // ── 3. Parse event ────────────────────────
  let event: { event: string; payload: Record<string, unknown> };
  try {
    event = JSON.parse(rawBody);
  } catch {
    return NextResponse.json({ error: "Invalid JSON payload." }, { status: 400 });
  }

  // ── 4. Acknowledge immediately (Razorpay requires 200 within a few seconds) ──
  // Process the event asynchronously after responding.
  processWebhookEvent(event).catch((err) => {
    console.error("[webhook] Background processing error:", err);
  });

  return NextResponse.json({ received: true });
}

async function processWebhookEvent(event: {
  event: string;
  payload: Record<string, unknown>;
}) {
  const provider = new RazorpayProvider();
  const result = await provider.handleWebhook(event);

  switch (event.event) {
    case "payment.captured":
    case "order.paid": {
      // TODO (production): Update order status to "paid" in your database
      // Use result.orderId (the Solvia internal order ID from the receipt field)
      console.info("[webhook] Payment confirmed:", result);
      break;
    }

    case "payment.failed": {
      // TODO (production): Update order status to "failed" in your database
      // Optionally send a follow-up email to the customer
      console.warn("[webhook] Payment failed:", result);
      break;
    }

    default:
      console.info("[webhook] Unhandled event type:", event.event);
  }
}
