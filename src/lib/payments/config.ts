// ─── Payment Configuration ───────────────────

export const PAYMENT_CONFIG = {
  /** Active payment provider */
  provider: "razorpay" as const,

  /** Currency code */
  currency: "INR",

  /** Company name shown on payment screens */
  merchantName: "Solvia Crystals",

  /** Company description shown on payment screens */
  merchantDescription: "Handcrafted Crystal Jewellery",

  /** Logo URL for payment screens */
  merchantLogo: "/logo.png",

  /** Theme color for payment UI */
  themeColor: "#C8A960",
} as const;

/**
 * Environment variables for payment providers.
 * These should be set in .env.local
 */
export const PAYMENT_ENV = {
  razorpay: {
    keyId: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "",
    keySecret: process.env.RAZORPAY_KEY_SECRET || "",
    webhookSecret: process.env.RAZORPAY_WEBHOOK_SECRET || "",
  },
} as const;
