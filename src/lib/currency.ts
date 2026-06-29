// ─── Currency & Localization ─────────────────
// Centralized currency formatting for the Indian market.
// All prices in the data layer are stored as plain numbers (INR paise-free).
// This module ensures consistent display across every surface.

const INR_FORMATTER = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});

/**
 * Format a price in INR.
 * @example formatPrice(2850) → "₹2,850"
 */
export function formatPrice(amount: number): string {
  return INR_FORMATTER.format(amount);
}

// ─── Shipping Constants ──────────────────────
export const FREE_SHIPPING_THRESHOLD = 2500;

export const SHIPPING_RATES = {
  standard: { label: "Standard Shipping", time: "5–7 business days", cost: 199, note: `Free on orders over ${formatPrice(FREE_SHIPPING_THRESHOLD)}` },
  express: { label: "Express Shipping", time: "2–3 business days", cost: 399, note: "" },
  overnight: { label: "Overnight", time: "1 business day", cost: 699, note: "Order by 2pm IST" },
} as const;

/**
 * Calculate shipping cost for an order.
 */
export function getShippingCost(subtotal: number, method: keyof typeof SHIPPING_RATES = "standard"): number {
  if (method === "standard" && subtotal >= FREE_SHIPPING_THRESHOLD) return 0;
  return SHIPPING_RATES[method].cost;
}

// ─── Tax ─────────────────────────────────────
export const GST_RATE = 0.03; // 3% GST on jewellery

export function calculateTax(subtotal: number): number {
  return Math.round(subtotal * GST_RATE);
}
