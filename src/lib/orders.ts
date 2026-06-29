// ─── Order Service ───────────────────────────
// Creates and manages orders. Currently client-side only.
// When a backend API is added, swap the internals of these functions.

import type { CartItem } from "@/types";
import type { Order, OrderCustomer, OrderItem } from "@/types/order";
import { getShippingCost, calculateTax } from "@/lib/currency";

/**
 * Generate a unique order ID.
 * Format: SOL-XXXXXX (uppercase alphanumeric)
 */
export function generateOrderId(): string {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  const suffix = Array.from({ length: 6 }, () =>
    chars[Math.floor(Math.random() * chars.length)]
  ).join("");
  return `SOL-${suffix}`;
}

/**
 * Create an order from cart items and customer data.
 * Does NOT persist — that will be handled by the payment/backend integration.
 */
export function createOrder(
  customer: OrderCustomer,
  cartItems: CartItem[],
  couponCode?: string
): Order {
  const items: OrderItem[] = cartItems.map((item) => ({
    productId: item.product.id,
    name: item.product.name,
    slug: item.product.slug,
    price: item.product.price,
    quantity: item.quantity,
    image: item.product.images.primary,
  }));

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );
  const shipping = getShippingCost(subtotal);
  const tax = calculateTax(subtotal);
  const discount = 0; // Future: apply coupon logic here
  const total = subtotal + shipping + tax - discount;

  const now = new Date().toISOString();

  return {
    id: generateOrderId(),
    customer,
    items,
    subtotal,
    shipping,
    tax,
    discount,
    total,
    couponCode,
    paymentStatus: "pending",
    fulfillmentStatus: "processing",
    createdAt: now,
    updatedAt: now,
  };
}
