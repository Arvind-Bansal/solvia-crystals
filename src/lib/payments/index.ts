// ─── Payment Orchestrator ────────────────────
// Delegates to the active payment provider.
// To switch providers, update PAYMENT_CONFIG.provider.

import type { PaymentProvider, PaymentOrder, PaymentResult, PaymentVerification } from "./types";
import { PAYMENT_CONFIG } from "./config";
import { RazorpayProvider } from "./razorpay";

function getProvider(): PaymentProvider {
  switch (PAYMENT_CONFIG.provider) {
    case "razorpay":
      return new RazorpayProvider();
    default:
      throw new Error(`Unknown payment provider: ${PAYMENT_CONFIG.provider}`);
  }
}

/**
 * Initialize a payment for an order.
 * Returns provider-specific data needed for the frontend checkout widget.
 */
export async function initializePayment(order: PaymentOrder): Promise<PaymentResult & { providerData?: Record<string, unknown> }> {
  const provider = getProvider();
  return provider.createOrder(order);
}

/**
 * Verify a completed payment.
 */
export async function verifyPayment(verification: PaymentVerification): Promise<PaymentResult> {
  const provider = getProvider();
  return provider.verifyPayment(verification);
}

/**
 * Get the active provider name.
 */
export function getActiveProvider(): string {
  return PAYMENT_CONFIG.provider;
}

export { PAYMENT_CONFIG } from "./config";
export type { PaymentOrder, PaymentResult, PaymentVerification } from "./types";
