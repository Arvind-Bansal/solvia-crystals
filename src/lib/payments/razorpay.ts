// ─── Razorpay Provider ───────────────────────
// Implements the PaymentProvider interface using the official Razorpay Node SDK.
// Requires: npm install razorpay
// Env vars: NEXT_PUBLIC_RAZORPAY_KEY_ID, RAZORPAY_KEY_SECRET, RAZORPAY_WEBHOOK_SECRET

import crypto from "crypto";
import type { PaymentProvider, PaymentOrder, PaymentResult, PaymentVerification, PaymentWebhookEvent } from "./types";
import { PAYMENT_ENV } from "./config";

// Lazy-load the Razorpay SDK to avoid build errors when not configured.
// Only used in server-side API routes — never in client bundles.
function getRazorpayInstance() {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const Razorpay = require("razorpay");
  return new Razorpay({
    key_id: PAYMENT_ENV.razorpay.keyId,
    key_secret: PAYMENT_ENV.razorpay.keySecret,
  });
}

export class RazorpayProvider implements PaymentProvider {
  name = "razorpay";

  private get isConfigured(): boolean {
    return Boolean(PAYMENT_ENV.razorpay.keyId && PAYMENT_ENV.razorpay.keySecret);
  }

  async createOrder(
    order: PaymentOrder
  ): Promise<PaymentResult & { providerData?: Record<string, unknown> }> {
    if (!this.isConfigured) {
      return {
        success: false,
        error: "Razorpay is not configured. Set NEXT_PUBLIC_RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET in .env.local",
      };
    }

    try {
      const instance = getRazorpayInstance();
      const razorpayOrder = await instance.orders.create({
        amount: order.amount, // amount in paise
        currency: order.currency,
        receipt: order.orderId,
        notes: order.notes ?? {},
      });

      return {
        success: true,
        providerOrderId: razorpayOrder.id,
        providerData: {
          key: PAYMENT_ENV.razorpay.keyId,
          orderId: razorpayOrder.id,
          amount: razorpayOrder.amount,
          currency: razorpayOrder.currency,
        },
      };
    } catch (err) {
      const message = err instanceof Error ? err.message : "Razorpay order creation failed.";
      console.error("[RazorpayProvider] createOrder error:", message);
      return { success: false, error: message };
    }
  }

  async verifyPayment(verification: PaymentVerification): Promise<PaymentResult> {
    if (!this.isConfigured) {
      return { success: false, error: "Razorpay is not configured." };
    }

    try {
      const body = `${verification.providerOrderId}|${verification.paymentId}`;
      const expectedSignature = crypto
        .createHmac("sha256", PAYMENT_ENV.razorpay.keySecret)
        .update(body)
        .digest("hex");

      if (expectedSignature === verification.signature) {
        return { success: true, paymentId: verification.paymentId };
      }

      return { success: false, error: "Payment signature verification failed." };
    } catch (err) {
      const message = err instanceof Error ? err.message : "Verification error.";
      console.error("[RazorpayProvider] verifyPayment error:", message);
      return { success: false, error: message };
    }
  }

  async handleWebhook(
    event: PaymentWebhookEvent
  ): Promise<{ status: string; orderId?: string }> {
    const handled = ["payment.captured", "payment.failed", "order.paid"];

    if (!handled.includes(event.event)) {
      return { status: `unhandled:${event.event}` };
    }

    try {
      // Extract order/payment IDs from the standard Razorpay webhook payload structure
      const payload = event.payload as {
        payment?: { entity?: { order_id?: string; id?: string } };
        order?: { entity?: { id?: string; receipt?: string } };
      };

      const orderId =
        payload?.payment?.entity?.order_id ||
        payload?.order?.entity?.receipt ||
        undefined;

      console.info(`[RazorpayProvider] Webhook: ${event.event}`, { orderId });

      return { status: event.event, orderId };
    } catch (err) {
      console.error("[RazorpayProvider] handleWebhook error:", err);
      return { status: "error" };
    }
  }
}
