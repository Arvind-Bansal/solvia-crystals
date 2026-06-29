// ─── Shipping Confirmation Email Template ────

import { emailWrapper, emailButton, BRAND } from "../components";

interface ShippingEmailData {
  customerName: string;
  orderId: string;
  trackingNumber?: string;
  carrier?: string;
  estimatedDelivery?: string;
}

export function shippingConfirmationEmail(data: ShippingEmailData): string {
  const content = `
    <tr>
      <td style="padding:32px 0 16px;">
        <h1 style="font-family:Georgia,serif;font-size:24px;color:${BRAND.white};margin:0;font-weight:400;">
          Your order is on its way
        </h1>
        <p style="font-family:${BRAND.font};font-size:14px;color:${BRAND.silver};margin:8px 0 0;">
          Hi ${data.customerName}, great news — your order #${data.orderId} has shipped.
        </p>
      </td>
    </tr>
    <tr>
      <td style="padding:16px 0;">
        <table width="100%" cellpadding="0" cellspacing="0" style="background:${BRAND.cardBg};border-radius:4px;padding:20px;">
          <tr>
            <td style="font-family:${BRAND.font};font-size:13px;color:${BRAND.silver};padding:4px 0;">
              <strong style="color:${BRAND.white};">Carrier:</strong> ${data.carrier || "Standard Shipping"}
            </td>
          </tr>
          ${data.trackingNumber ? `
          <tr>
            <td style="font-family:${BRAND.font};font-size:13px;color:${BRAND.silver};padding:4px 0;">
              <strong style="color:${BRAND.white};">Tracking:</strong> ${data.trackingNumber}
            </td>
          </tr>` : ""}
          ${data.estimatedDelivery ? `
          <tr>
            <td style="font-family:${BRAND.font};font-size:13px;color:${BRAND.silver};padding:4px 0;">
              <strong style="color:${BRAND.white};">Estimated delivery:</strong> ${data.estimatedDelivery}
            </td>
          </tr>` : ""}
        </table>
      </td>
    </tr>
    <tr>
      <td align="center">
        ${emailButton("Track Your Order", `https://solviacrystals.com/orders/${data.orderId}`)}
      </td>
    </tr>
    <tr>
      <td style="padding:16px 0;">
        <p style="font-family:${BRAND.font};font-size:13px;color:${BRAND.silver};margin:0;">
          If you have any questions about your delivery, feel free to <a href="https://solviacrystals.com/contact" style="color:${BRAND.gold};text-decoration:none;">contact us</a>.
        </p>
      </td>
    </tr>
  `;

  return emailWrapper(content);
}
