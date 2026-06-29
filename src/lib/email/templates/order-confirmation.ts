// ─── Order Confirmation Email Template ───────

import type { Order } from "@/types/order";
import { formatPrice } from "@/lib/currency";
import { emailWrapper, emailProductRow, emailButton, BRAND } from "../components";

export function orderConfirmationEmail(order: Order): string {
  const itemRows = order.items
    .map((item) =>
      emailProductRow({
        name: item.name,
        price: formatPrice(item.price * item.quantity),
        quantity: item.quantity,
        image: item.image,
      })
    )
    .join("");

  const content = `
    <tr>
      <td style="padding:32px 0 16px;">
        <h1 style="font-family:Georgia,serif;font-size:24px;color:${BRAND.white};margin:0;font-weight:400;">
          Thank you for your order
        </h1>
        <p style="font-family:${BRAND.font};font-size:14px;color:${BRAND.silver};margin:8px 0 0;">
          Hi ${order.customer.firstName}, your order has been confirmed and is being prepared.
        </p>
      </td>
    </tr>
    <tr>
      <td style="padding:16px 0;">
        <table width="100%" cellpadding="0" cellspacing="0" style="background:${BRAND.cardBg};border-radius:4px;padding:20px;">
          <tr>
            <td style="font-family:${BRAND.font};font-size:12px;color:${BRAND.silver};text-transform:uppercase;letter-spacing:0.1em;padding-bottom:8px;">
              Order #${order.id}
            </td>
          </tr>
        </table>
      </td>
    </tr>
    <tr>
      <td>
        <table width="100%" cellpadding="0" cellspacing="0">
          ${itemRows}
        </table>
      </td>
    </tr>
    <tr>
      <td style="padding:20px 0;">
        <table width="100%" cellpadding="0" cellspacing="0" style="font-family:${BRAND.font};font-size:14px;">
          <tr>
            <td style="color:${BRAND.silver};padding:4px 0;">Subtotal</td>
            <td align="right" style="color:${BRAND.white};padding:4px 0;">${formatPrice(order.subtotal)}</td>
          </tr>
          <tr>
            <td style="color:${BRAND.silver};padding:4px 0;">Shipping</td>
            <td align="right" style="color:${BRAND.white};padding:4px 0;">${order.shipping === 0 ? "Free" : formatPrice(order.shipping)}</td>
          </tr>
          <tr>
            <td style="color:${BRAND.silver};padding:4px 0;">Tax (GST)</td>
            <td align="right" style="color:${BRAND.white};padding:4px 0;">${formatPrice(order.tax)}</td>
          </tr>
          <tr>
            <td style="color:${BRAND.white};font-weight:600;padding:12px 0 4px;border-top:1px solid ${BRAND.border};">Total</td>
            <td align="right" style="color:${BRAND.gold};font-weight:600;font-size:16px;padding:12px 0 4px;border-top:1px solid ${BRAND.border};">${formatPrice(order.total)}</td>
          </tr>
        </table>
      </td>
    </tr>
    <tr>
      <td style="padding:16px 0;">
        <h2 style="font-family:Georgia,serif;font-size:16px;color:${BRAND.white};margin:0 0 8px;font-weight:400;">Shipping to</h2>
        <p style="font-family:${BRAND.font};font-size:13px;color:${BRAND.silver};margin:0;line-height:1.6;">
          ${order.customer.firstName} ${order.customer.lastName}<br/>
          ${order.customer.address}<br/>
          ${order.customer.city}, ${order.customer.state} ${order.customer.zip}<br/>
          ${order.customer.country}
        </p>
      </td>
    </tr>
    <tr>
      <td align="center">
        ${emailButton("Track Your Order", `https://solviacrystals.com/orders/${order.id}`)}
      </td>
    </tr>
  `;

  return emailWrapper(content);
}
