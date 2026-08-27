// ─── POST /api/payments/razorpay/create-order ──────────────────────────────
// Creates a Razorpay order server-side and persists a pending order in Supabase.
//
// Security:
//   • Prices are NEVER trusted from the client.
//   • Every cart item is validated against the server-side product catalogue.
//   • Totals are recalculated from first principles.
//   • The amount sent to Razorpay == the amount stored in the database.
//
// Flow:
//   1. Parse + validate request (items + full customer/shipping data)
//   2. Validate each product exists, is in stock, get server-side price
//   3. Recalculate subtotal, shipping, GST, total
//   4. Generate internal SOL-XXXXXX order ID
//   5. Create Razorpay order (if this fails, we stop — no DB record left)
//   6. Persist pending order in Supabase
//      (if DB write fails, return 500 — Razorpay order expires in 15 min)
//   7. Return Razorpay modal data to the browser

import { NextRequest, NextResponse } from "next/server";
import { getProductById } from "@/data/products";
import { getShippingCost, calculateTax } from "@/lib/currency";
import { generateOrderId } from "@/lib/orders";
import { PAYMENT_CONFIG, PAYMENT_ENV } from "@/lib/payments/config";
import { RazorpayProvider } from "@/lib/payments/razorpay";
import { saveOrderToDb } from "@/lib/db/orders";
import type { OrderItem } from "@/types/order";

// ─── Request body shape ────────────────────────────────────────────────────

interface CreateOrderRequestItem {
  productId: string;
  quantity: number;
}

interface CreateOrderRequest {
  items: CreateOrderRequestItem[];
  customer: {
    email: string;
    firstName: string;
    lastName: string;
    phone?: string;
    // Shipping address — required for order persistence
    address: string;
    city: string;
    state: string;
    zip: string;
    country: string;
  };
}

// ─── Route handler ─────────────────────────────────────────────────────────

export async function POST(req: NextRequest) {
  // ── 1. Parse body ──────────────────────────────────────────────────────
  let body: CreateOrderRequest;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const { items, customer } = body;

  // ── 2. Validate structure ──────────────────────────────────────────────
  if (!Array.isArray(items) || items.length === 0) {
    return NextResponse.json({ error: "Cart is empty." }, { status: 400 });
  }

  if (
    !customer?.email ||
    !customer?.firstName ||
    !customer?.lastName ||
    !customer?.address ||
    !customer?.city ||
    !customer?.state ||
    !customer?.zip ||
    !customer?.country
  ) {
    return NextResponse.json(
      { error: "Customer and shipping details are required." },
      { status: 400 }
    );
  }

  // ── 3. Validate Razorpay credentials ──────────────────────────────────
  if (!PAYMENT_ENV.razorpay.keyId || !PAYMENT_ENV.razorpay.keySecret) {
    return NextResponse.json(
      { error: "Payment gateway is not configured. Please contact support." },
      { status: 503 }
    );
  }

  // ── 4. Re-validate every cart item against the server catalogue ────────
  //    Prices from the client are IGNORED — we always use server prices.
  let subtotal = 0;
  const validatedItems: OrderItem[] = [];

  for (const item of items) {
    if (!item.productId || typeof item.quantity !== "number" || item.quantity < 1) {
      return NextResponse.json(
        { error: `Invalid item: ${JSON.stringify(item)}` },
        { status: 400 }
      );
    }

    const product = getProductById(item.productId);
    if (!product) {
      return NextResponse.json(
        { error: `Product not found: ${item.productId}` },
        { status: 400 }
      );
    }

    if (!product.inStock) {
      return NextResponse.json(
        { error: `"${product.name}" is currently out of stock.` },
        { status: 400 }
      );
    }

    subtotal += product.price * item.quantity;

    // Build OrderItem snapshot — prices and metadata locked at this moment.
    // This is what gets stored in the database JSONB column.
    validatedItems.push({
      productId: product.id,
      name: product.name,
      slug: product.slug,
      price: product.price, // server-side price — never client-supplied
      quantity: item.quantity,
      image: product.images.primary,
    });
  }

  // ── 5. Recalculate totals server-side ──────────────────────────────────
  const shipping = getShippingCost(subtotal);
  const tax = calculateTax(subtotal);
  const discount = 0; // Future: apply coupon logic here
  const total = subtotal + shipping + tax - discount;

  // Razorpay requires integer paise (₹1 = 100 paise)
  const amountPaise = Math.round(total * 100);

  // ── 6. Generate internal order ID ──────────────────────────────────────
  const internalOrderId = generateOrderId();

  // ── 7. Create Razorpay order ───────────────────────────────────────────
  //    If this fails we stop here — no DB record is created, nothing to clean up.
  const provider = new RazorpayProvider();

  const result = await provider.createOrder({
    orderId: internalOrderId,
    amount: amountPaise,
    currency: PAYMENT_CONFIG.currency,
    customerEmail: customer.email,
    customerName: `${customer.firstName} ${customer.lastName}`,
    customerPhone: customer.phone,
    notes: {
      internalOrderId,
      customerEmail: customer.email,
      itemCount: String(validatedItems.length),
    },
  });

  if (!result.success || !result.providerData) {
    console.error("[create-order] Razorpay order creation failed:", result.error);
    return NextResponse.json(
      { error: result.error || "Failed to create payment order." },
      { status: 500 }
    );
  }

  const razorpayOrderId = result.providerData.orderId as string;

  // ── 8. Persist pending order in Supabase ───────────────────────────────
  //    Stores: server-calculated prices, full customer/address, item snapshot.
  //    If DB write fails, return 500 — the Razorpay order will expire in ~15 min.
  try {
    await saveOrderToDb({
      internalOrderId,
      razorpayOrderId,
      customer: {
        email: customer.email,
        firstName: customer.firstName,
        lastName: customer.lastName,
        phone: customer.phone,
        address: customer.address,
        city: customer.city,
        state: customer.state,
        zip: customer.zip,
        country: customer.country,
      },
      items: validatedItems,
      subtotal,
      shipping,
      tax,
      discount,
      total,
    });
  } catch (dbErr) {
    console.error("[create-order] Database write failed:", dbErr);
    return NextResponse.json(
      { error: "Order could not be recorded. Please try again." },
      { status: 500 }
    );
  }

  // ── 9. Return Razorpay modal data to the browser ───────────────────────
  //    Note: keyId (NEXT_PUBLIC_) is safe to return.
  //    The secret never leaves the server.
  return NextResponse.json({
    internalOrderId,
    razorpayOrderId,
    amount: amountPaise,
    currency: PAYMENT_CONFIG.currency,
    keyId: PAYMENT_ENV.razorpay.keyId,
    breakdown: {
      subtotal,
      shipping,
      tax,
      discount,
      total,
    },
  });
}
