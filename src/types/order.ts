// ─── Order Types ─────────────────────────────
// Provider-agnostic order architecture.
// These types are used by the checkout flow and will be consumed
// by the payment provider, email service, and future admin panel.

// ─── Enums ───────────────────────────────────

export type PaymentStatus = "pending" | "paid" | "failed" | "refunded";

export type FulfillmentStatus =
  | "processing"
  | "packed"
  | "shipped"
  | "delivered"
  | "cancelled";

// ─── Interfaces ──────────────────────────────

export interface OrderCustomer {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  country: string;
}

export interface OrderItem {
  productId: string;
  name: string;
  slug: string;
  price: number;
  quantity: number;
  image: string;
}

export interface Order {
  id: string;
  customer: OrderCustomer;
  items: OrderItem[];
  subtotal: number;
  shipping: number;
  tax: number;
  discount: number;
  total: number;
  couponCode?: string;
  paymentStatus: PaymentStatus;
  fulfillmentStatus: FulfillmentStatus;
  paymentId?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}
