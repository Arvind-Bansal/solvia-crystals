// ─── Orders Database Layer ────────────────────
// All Supabase reads/writes for orders.
// Server-side ONLY — never import this in client components.
//
// Monetary values in this module:
//   • Function parameters: INR (e.g. 2850.00)
//   • Database storage: paise integer (e.g. 285000)
//   • Conversion: INR → paise = Math.round(value * 100)
//                 paise → INR = paise / 100

import { getSupabaseServer } from "@/lib/supabase/server";
import type { Order, OrderCustomer, OrderItem, PaymentStatus, FulfillmentStatus } from "@/types/order";

// ─── Database Row Shape ───────────────────────
// Mirrors the orders table columns exactly.

export interface OrderDbRow {
  id: string;
  razorpay_order_id: string;
  razorpay_payment_id: string | null;
  payment_status: PaymentStatus;
  fulfillment_status: FulfillmentStatus;
  customer_email: string;
  customer_first_name: string;
  customer_last_name: string;
  customer_phone: string | null;
  shipping_address: string;
  shipping_city: string;
  shipping_state: string;
  shipping_zip: string;
  shipping_country: string;
  items: OrderItem[];
  subtotal_paise: number;
  shipping_paise: number;
  tax_paise: number;
  discount_paise: number;
  total_paise: number;
  coupon_code: string | null;
  notes: string | null;
  created_at: string;
  updated_at: string;
  email_sent_at: string | null;
}

// ─── Params for saving a new order ───────────

export interface SaveOrderParams {
  internalOrderId: string;
  razorpayOrderId: string;
  customer: OrderCustomer;
  items: OrderItem[];
  /** INR */
  subtotal: number;
  /** INR */
  shipping: number;
  /** INR */
  tax: number;
  /** INR */
  discount: number;
  /** INR — must equal Math.round((subtotal+shipping+tax-discount)*100)/100 */
  total: number;
  couponCode?: string;
}

// ─── WRITE: Save pending order ────────────────

/**
 * Inserts a new order with paymentStatus = "pending".
 * Called from create-order/route.ts after Razorpay order creation succeeds.
 * Throws on DB error so the API route can return 500.
 */
export async function saveOrderToDb(params: SaveOrderParams): Promise<void> {
  const supabase = getSupabaseServer();

  const { error } = await supabase.from("orders").insert({
    id: params.internalOrderId,
    razorpay_order_id: params.razorpayOrderId,
    razorpay_payment_id: null,
    payment_status: "pending",
    fulfillment_status: "processing",
    customer_email: params.customer.email,
    customer_first_name: params.customer.firstName,
    customer_last_name: params.customer.lastName,
    customer_phone: params.customer.phone ?? null,
    shipping_address: params.customer.address,
    shipping_city: params.customer.city,
    shipping_state: params.customer.state,
    shipping_zip: params.customer.zip,
    shipping_country: params.customer.country,
    items: params.items,
    subtotal_paise: Math.round(params.subtotal * 100),
    shipping_paise: Math.round(params.shipping * 100),
    tax_paise: Math.round(params.tax * 100),
    discount_paise: Math.round(params.discount * 100),
    total_paise: Math.round(params.total * 100),
    coupon_code: params.couponCode ?? null,
  });

  if (error) {
    throw new Error(
      `[DB] Failed to save order ${params.internalOrderId}: ${error.message}`
    );
  }
}

// ─── READ: Fetch by internal ID ───────────────

/**
 * Returns the full order row, or null if not found.
 */
export async function getOrderById(id: string): Promise<OrderDbRow | null> {
  const supabase = getSupabaseServer();

  const { data, error } = await supabase
    .from("orders")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error) {
    console.error(`[DB] getOrderById error for ${id}:`, error.message);
    return null;
  }

  return (data as OrderDbRow) ?? null;
}

// ─── READ: Fetch by Razorpay order ID ─────────

/**
 * Used by the webhook handler to find the order when Razorpay
 * sends payment.captured / order.paid events.
 */
export async function getOrderByRazorpayOrderId(
  razorpayOrderId: string
): Promise<OrderDbRow | null> {
  const supabase = getSupabaseServer();

  const { data, error } = await supabase
    .from("orders")
    .select("*")
    .eq("razorpay_order_id", razorpayOrderId)
    .maybeSingle();

  if (error) {
    console.error(
      `[DB] getOrderByRazorpayOrderId error for ${razorpayOrderId}:`,
      error.message
    );
    return null;
  }

  return (data as OrderDbRow) ?? null;
}

// ─── WRITE: Mark paid ─────────────────────────

/**
 * Sets payment_status = "paid" and stores the Razorpay payment ID.
 * Uses .eq("payment_status", "pending") as a guard — safe to call multiple
 * times (idempotent): if already paid, the UPDATE matches 0 rows silently.
 */
export async function markOrderPaid(
  id: string,
  razorpayPaymentId: string
): Promise<void> {
  const supabase = getSupabaseServer();

  const { error } = await supabase
    .from("orders")
    .update({ payment_status: "paid", razorpay_payment_id: razorpayPaymentId })
    .eq("id", id)
    .eq("payment_status", "pending"); // Only transitions from pending → paid

  if (error) {
    throw new Error(
      `[DB] Failed to mark order ${id} as paid: ${error.message}`
    );
  }
}

// ─── WRITE: Mark failed ───────────────────────

/**
 * Sets payment_status = "failed".
 * Idempotent — only acts on pending orders.
 */
export async function markOrderFailed(id: string): Promise<void> {
  const supabase = getSupabaseServer();

  const { error } = await supabase
    .from("orders")
    .update({ payment_status: "failed" })
    .eq("id", id)
    .eq("payment_status", "pending");

  if (error) {
    console.error(`[DB] Failed to mark order ${id} as failed:`, error.message);
  }
}

// ─── WRITE: Record email sent ─────────────────

/**
 * Sets email_sent_at to now().
 * Called after the email provider accepts the message.
 * Used to prevent duplicate confirmation emails.
 */
export async function markEmailSent(id: string): Promise<void> {
  const supabase = getSupabaseServer();

  const { error } = await supabase
    .from("orders")
    .update({ email_sent_at: new Date().toISOString() })
    .eq("id", id);

  if (error) {
    console.error(
      `[DB] Failed to record email_sent_at for order ${id}:`,
      error.message
    );
  }
}

// ─── UTIL: Convert DB row to Order type ───────

/**
 * Maps a flat database row back to the Order interface defined in
 * src/types/order.ts. Keeps the DB column names out of business logic.
 */
export function dbRowToOrder(row: OrderDbRow): Order {
  const customer: OrderCustomer = {
    firstName: row.customer_first_name,
    lastName: row.customer_last_name,
    email: row.customer_email,
    phone: row.customer_phone ?? undefined,
    address: row.shipping_address,
    city: row.shipping_city,
    state: row.shipping_state,
    zip: row.shipping_zip,
    country: row.shipping_country,
  };

  return {
    id: row.id,
    customer,
    items: row.items,
    subtotal: row.subtotal_paise / 100,
    shipping: row.shipping_paise / 100,
    tax: row.tax_paise / 100,
    discount: row.discount_paise / 100,
    total: row.total_paise / 100,
    couponCode: row.coupon_code ?? undefined,
    paymentStatus: row.payment_status,
    fulfillmentStatus: row.fulfillment_status,
    paymentId: row.razorpay_payment_id ?? undefined,
    notes: row.notes ?? undefined,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}
