// ─── Razorpay Provider (Stub) ────────────────
// Implements the PaymentProvider interface for Razorpay.
// This is a preparation stub — actual SDK integration will be added
// when Razorpay credentials are available.
//
// Integration steps when ready:
// 1. npm install razorpay
// 2. Set NEXT_PUBLIC_RAZORPAY_KEY_ID, RAZORPAY_KEY_SECRET, RAZORPAY_WEBHOOK_SECRET in .env.local
// 3. Uncomment the SDK calls below
// 4. Create API route at /api/payments/razorpay/create-order
// 5. Create API route at /api/payments/razorpay/verify
// 6. Create API route at /api/payments/razorpay/webhook

import type { PaymentProvider, PaymentOrder, PaymentResult, PaymentVerification, PaymentWebhookEvent } from "./types";
import { PAYMENT_ENV } from "./config";

export class RazorpayProvider implements PaymentProvider {
  name = "razorpay";

  private get isConfigured(): boolean {
    return Boolean(PAYMENT_ENV.razorpay.keyId && PAYMENT_ENV.razorpay.keySecret);
  }

  async createOrder(order: PaymentOrder): Promise<PaymentResult & { providerData?: Record<string, unknown> }> {
    if (!this.isConfigured) {
      // Development fallback — simulate success
      if (process.env.NODE_ENV !== "production") {
        return {
          success: true,
          providerOrderId: `dev_order_${Date.now()}`,
          providerData: {
            key: "dev_key",
            orderId: `dev_order_${Date.now()}`,
            amount: order.amount,
            currency: order.currency,
          },
        };
      }
      return { success: false, error: "Razorpay is not configured. Set RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET." };
    }

    // TODO: Implement when Razorpay SDK is installed
    // const Razorpay = require('razorpay');
    // const instance = new Razorpay({ key_id: PAYMENT_ENV.razorpay.keyId, key_secret: PAYMENT_ENV.razorpay.keySecret });
    // const razorpayOrder = await instance.orders.create({
    //   amount: order.amount,
    //   currency: order.currency,
    //   receipt: order.orderId,
    //   notes: order.notes,
    // });
    // return { success: true, providerOrderId: razorpayOrder.id, providerData: { key: PAYMENT_ENV.razorpay.keyId, orderId: razorpayOrder.id, amount: order.amount, currency: order.currency } };

    return { success: false, error: "Razorpay integration pending." };
  }

  async verifyPayment(verification: PaymentVerification): Promise<PaymentResult> {
    if (!this.isConfigured) {
      if (process.env.NODE_ENV !== "production") {
        return { success: true, paymentId: verification.paymentId };
      }
      return { success: false, error: "Razorpay is not configured." };
    }

    // TODO: Implement HMAC verification
    // const crypto = require('crypto');
    // const body = verification.providerOrderId + '|' + verification.paymentId;
    // const expectedSignature = crypto.createHmac('sha256', PAYMENT_ENV.razorpay.keySecret).update(body).digest('hex');
    // if (expectedSignature === verification.signature) {
    //   return { success: true, paymentId: verification.paymentId };
    // }
    // return { success: false, error: "Payment verification failed." };

    return { success: false, error: "Payment verification not implemented." };
  }

  async handleWebhook(event: PaymentWebhookEvent): Promise<{ status: string; orderId?: string }> {
    // TODO: Implement webhook signature verification and event handling
    // Common events: payment.authorized, payment.captured, payment.failed, refund.created

    return { status: `unhandled:${event.event}` };
  }
}
