// ─── Business Extension Types ────────────────
// Clean type contracts for future systems.
// These are architecture-only — no implementations.
// When building these features, start by implementing against these interfaces.

// ─── Inventory ───────────────────────────────

export interface InventoryEntry {
  productId: string;
  sku: string;
  quantity: number;
  lowStockThreshold: number;
  reservedQuantity: number;
  lastRestocked?: string;
}

export interface InventoryProvider {
  getStock(productId: string): Promise<InventoryEntry | null>;
  reserveStock(productId: string, quantity: number): Promise<boolean>;
  releaseStock(productId: string, quantity: number): Promise<void>;
  updateStock(productId: string, quantity: number): Promise<void>;
}

// ─── Coupons & Discounts ─────────────────────

export type DiscountType = "percentage" | "fixed";

export interface Coupon {
  code: string;
  type: DiscountType;
  /** Percentage (0-100) or fixed amount in INR */
  value: number;
  minOrderValue?: number;
  maxUses?: number;
  currentUses: number;
  expiresAt?: string;
  isActive: boolean;
  applicableProductIds?: string[];
  applicableCollections?: string[];
}

export interface CouponProvider {
  validate(code: string, orderTotal: number): Promise<{ valid: boolean; coupon?: Coupon; error?: string }>;
  apply(code: string): Promise<{ discount: number }>;
  redeem(code: string): Promise<void>;
}

// ─── Customer Accounts ───────────────────────

export interface CustomerAddress {
  id: string;
  label?: string;
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  phone?: string;
  isDefault: boolean;
}

export interface CustomerAccount {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  addresses: CustomerAddress[];
  orderHistory: string[];
  wishlistProductIds: string[];
  createdAt: string;
}

// ─── Shipment Tracking ───────────────────────

export type ShipmentStatus =
  | "label_created"
  | "picked_up"
  | "in_transit"
  | "out_for_delivery"
  | "delivered"
  | "failed_attempt"
  | "returned";

export interface ShipmentEvent {
  status: ShipmentStatus;
  location?: string;
  timestamp: string;
  description: string;
}

export interface ShipmentTracking {
  orderId: string;
  carrier: string;
  trackingNumber: string;
  status: ShipmentStatus;
  estimatedDelivery?: string;
  events: ShipmentEvent[];
}

export interface ShipmentProvider {
  createShipment(orderId: string, carrier: string): Promise<ShipmentTracking>;
  getTracking(trackingNumber: string): Promise<ShipmentTracking | null>;
  cancelShipment(trackingNumber: string): Promise<boolean>;
}
