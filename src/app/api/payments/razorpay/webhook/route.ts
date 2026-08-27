// ─── POST /api/payments/razorpay/webhook ────────────────────────────────────
// Handles Razorpay webhook events with full database integration.
//
// Security:
//   • Verifies X-Razorpay-Signature using RAZORPAY_WEBHOOK_SECRET (HMAC-SHA256)
//   • Rejects any request without a valid signature
//   • Responds 200 immediately after signature check (Razorpay requires this)
//   • DB processing happens asynchronously after acknowledgement
//
// Idempotency:
//   • markOrderPaid() uses .eq("payment_status","pending") — safe to call twice
//   • sendOrderConfirmationIfNotSent() checks email_sent_at — safe to call twice
//   • payment.captured and order.paid can both fire for the same payment;
//     the second call to markOrderPaid will match 0 rows (already "paid")
//
// Race condition safety (webhook vs verify):
//   • Both verify/route.ts and this route call markOrderPaid + email helper.
//   • The DB constraint (.eq("payment_status","pending")) + email_sent_at
//     ensure only one write succeeds and only one email is sent.
//
// Webhook setup (manual — required before going live):
//   1. Razorpay Dashboard → Settings → Webhooks → Add Webhook
//   2. URL: https://yourdomain.com/api/payments/razorpay/webhook
//   3. Events: payment.captured, payment.failed, order.paid
//   4. Copy the generated secret → RAZORPAY_WEBHOOK_SECRET in .env.local

import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { PAYMENT_ENV } from "@/lib/payments/config";
import { getOrderByRazorpayOrderId, markOrderFailed } from "@/lib/db/orders";
import { sendOrderConfirmationIfNotSent } from "@/lib/order-mailer";

export async function POST(req: NextRequest) {
  // ── 1. Read raw body — required for HMAC verification ─────────────────
  const rawBody = await req.text();

  // ── 2. Verify webhook signature ───────────────────────────────────────
  const signature = req.headers.get("x-razorpay-signature");

  if (!signature) {
    console.warn("[webhook] Missing X-Razorpay-Signature header.");
    return NextResponse.json({ error: "Missing signature." }, { status: 400 });
  }

  if (!PAYMENT_ENV.razorpay.webhookSecret) {
    // Secret not yet configured — log and reject safely.
    // See comment at top of file for setup instructions.
    console.error(
      "[webhook] RAZORPAY_WEBHOOK_SECRET is not set. Add it to .env.local and restart."
    );
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

  // ── 3. Parse event ────────────────────────────────────────────────────
  let event: { event: string; payload: Record<string, unknown> };
  try {
    event = JSON.parse(rawBody);
  } catch {
    return NextResponse.json({ error: "Invalid JSON payload." }, { status: 400 });
  }

  // ── 4. Acknowledge immediately ────────────────────────────────────────
  //    Razorpay retries if it doesn't receive 200 within a few seconds.
  //    We respond now and process asynchronously.
  processWebhookEvent(event).catch((err) => {
    console.error("[webhook] Background processing error:", err);
  });

  return NextResponse.json({ received: true });
}

// ─── Async event processing ────────────────────────────────────────────────

async function processWebhookEvent(event: {
  event: string;
  payload: Record<string, unknown>;
}) {
  const payload = event.payload as {
    payment?: { entity?: { id?: string; order_id?: string } };
    order?: { entity?: { id?: string; receipt?: string } };
  };

  // Extract IDs from the Razorpay payload structure
  const razorpayOrderId =
    payload?.payment?.entity?.order_id ||
    payload?.order?.entity?.id;

  const razorpayPaymentId = payload?.payment?.entity?.id;

  switch (event.event) {
    case "payment.captured":
    case "order.paid": {
      if (!razorpayOrderId) {
        console.warn("[webhook] No razorpay_order_id in payload:", event.event);
        break;
      }

      // Look up the order by Razorpay's order ID
      const dbOrder = await getOrderByRazorpayOrderId(razorpayOrderId);

      if (!dbOrder) {
        console.warn(
          "[webhook] Order not found for razorpay_order_id:",
          razorpayOrderId
        );
        break;
      }

      // Only act if still pending (idempotency guard)
      if (dbOrder.payment_status !== "pending") {
        console.info(
          "[webhook] Order already processed (idempotent):",
          dbOrder.id
        );
        break;
      }

      // Mark as paid — uses .eq("payment_status","pending") guard internally
      if (razorpayPaymentId) {
        const { markOrderPaid } = await import("@/lib/db/orders");
        await markOrderPaid(dbOrder.id, razorpayPaymentId);
        console.info("[webhook] Order marked paid:", {
          id: dbOrder.id,
          razorpayPaymentId,
        });
      }

      // Send confirmation email (idempotent — checks email_sent_at)
      await sendOrderConfirmationIfNotSent(dbOrder.id);
      break;
    }

    case "payment.failed": {
      if (!razorpayOrderId) {
        console.warn("[webhook] No razorpay_order_id in payment.failed payload");
        break;
      }

      const dbOrder = await getOrderByRazorpayOrderId(razorpayOrderId);
      if (dbOrder) {
        await markOrderFailed(dbOrder.id);
        console.warn("[webhook] Order marked failed:", dbOrder.id);
      }
      break;
    }

    default:
      console.info("[webhook] Unhandled event type:", event.event);
  }
}
