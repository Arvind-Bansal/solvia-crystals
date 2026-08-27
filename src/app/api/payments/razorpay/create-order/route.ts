// ─── POST /api/payments/razorpay/create-order ──
// Creates a Razorpay order server-side.
//
// Security: The amount is NEVER trusted from the client.
// Cart items are re-validated against the server-side product catalog
// and totals are recalculated using the same business rules as checkout.

import { NextRequest, NextResponse } from "next/server";
import { getProductById } from "@/data/products";
import { getShippingCost, calculateTax } from "@/lib/currency";
import { generateOrderId } from "@/lib/orders";
import { PAYMENT_CONFIG, PAYMENT_ENV } from "@/lib/payments/config";
import { RazorpayProvider } from "@/lib/payments/razorpay";

// ─── Request shape (sent from checkout page) ─
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
  };
}

export async function POST(req: NextRequest) {
  // ── 1. Parse body ─────────────────────────
  let body: CreateOrderRequest;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const { items, customer } = body;

  if (!Array.isArray(items) || items.length === 0) {
    return NextResponse.json({ error: "Cart is empty." }, { status: 400 });
  }

  if (!customer?.email || !customer?.firstName || !customer?.lastName) {
    return NextResponse.json({ error: "Customer details are required." }, { status: 400 });
  }

  // ── 2. Re-validate items & recalculate total server-side ──
  let subtotal = 0;
  const validatedItems: Array<{ productId: string; name: string; price: number; quantity: number }> = [];

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

    const lineTotal = product.price * item.quantity;
    subtotal += lineTotal;

    validatedItems.push({
      productId: product.id,
      name: product.name,
      price: product.price,
      quantity: item.quantity,
    });
  }

  // ── 3. Calculate shipping & tax (same logic as checkout UI) ──
  const shipping = getShippingCost(subtotal);
  const tax = calculateTax(subtotal);
  const total = subtotal + shipping + tax;

  // Razorpay expects amount in the smallest currency unit (paise for INR)
  const amountPaise = Math.round(total * 100);

  // ── 4. Generate internal order ID ─────────
  const internalOrderId = generateOrderId();

  // ── 5. Create Razorpay order ──────────────
  const provider = new RazorpayProvider();

  if (!PAYMENT_ENV.razorpay.keyId || !PAYMENT_ENV.razorpay.keySecret) {
    return NextResponse.json(
      { error: "Payment gateway is not configured. Please contact support." },
      { status: 503 }
    );
  }

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

  // ── 6. Return data needed by the frontend Razorpay modal ──
  return NextResponse.json({
    internalOrderId,
    razorpayOrderId: result.providerData.orderId,
    amount: amountPaise,
    currency: PAYMENT_CONFIG.currency,
    keyId: PAYMENT_ENV.razorpay.keyId,
    // Return the server-calculated breakdown for display (optional)
    breakdown: {
      subtotal,
      shipping,
      tax,
      total,
    },
  });
}
