// ─── Payment Provider Interface ──────────────
// Provider-agnostic payment types.
// Implement this interface for Razorpay, Stripe, or any future provider.

export interface PaymentOrder {
  /** Internal order ID (SOL-XXXXXX) */
  orderId: string;
  /** Amount in smallest currency unit (paise for INR) */
  amount: number;
  /** ISO 4217 currency code */
  currency: string;
  /** Customer email for receipts */
  customerEmail: string;
  /** Customer name */
  customerName: string;
  /** Customer phone */
  customerPhone?: string;
  /** Optional notes */
  notes?: Record<string, string>;
}

export interface PaymentResult {
  success: boolean;
  /** Provider's payment ID */
  paymentId?: string;
  /** Provider's order ID */
  providerOrderId?: string;
  /** Error message if failed */
  error?: string;
}

export interface PaymentVerification {
  /** Provider's payment ID */
  paymentId: string;
  /** Provider's order ID */
  providerOrderId: string;
  /** Provider's signature for verification */
  signature: string;
}

export interface PaymentWebhookEvent {
  event: string;
  payload: Record<string, unknown>;
}

/**
 * Payment provider interface.
 * Implement this for each payment provider (Razorpay, Stripe, etc.)
 */
export interface PaymentProvider {
  /** Provider name for logging */
  name: string;

  /**
   * Create a payment order with the provider.
   * Returns provider-specific order data needed for frontend checkout.
   */
  createOrder(order: PaymentOrder): Promise<PaymentResult & { providerData?: Record<string, unknown> }>;

  /**
   * Verify a completed payment.
   * Called after the user completes payment on the frontend.
   */
  verifyPayment(verification: PaymentVerification): Promise<PaymentResult>;

  /**
   * Process a webhook event from the provider.
   * Used for async payment status updates.
   */
  handleWebhook(event: PaymentWebhookEvent): Promise<{ status: string; orderId?: string }>;
}
