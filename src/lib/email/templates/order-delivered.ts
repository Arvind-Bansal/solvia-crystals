// ─── Order Delivered Email Template ──────────

import { emailWrapper, emailButton, BRAND } from "../components";

interface DeliveredEmailData {
  customerName: string;
  orderId: string;
}

export function orderDeliveredEmail(data: DeliveredEmailData): string {
  const content = `
    <tr>
      <td style="padding:32px 0 16px;">
        <h1 style="font-family:Georgia,serif;font-size:24px;color:${BRAND.white};margin:0;font-weight:400;">
          Your order has arrived
        </h1>
        <p style="font-family:${BRAND.font};font-size:14px;color:${BRAND.silver};margin:8px 0 0;">
          Hi ${data.customerName}, your order #${data.orderId} has been delivered. We hope you love your new piece.
        </p>
      </td>
    </tr>
    <tr>
      <td style="padding:16px 0;">
        <p style="font-family:${BRAND.font};font-size:14px;color:${BRAND.silver};margin:0;line-height:1.7;">
          Each Solvia Crystals bracelet is designed to be worn daily. For care tips and cleansing rituals, visit our
          <a href="https://solviacrystals.com/care-guide" style="color:${BRAND.gold};text-decoration:none;">Care Guide</a>.
        </p>
      </td>
    </tr>
    <tr>
      <td align="center">
        ${emailButton("Shop Again", "https://solviacrystals.com/shop")}
      </td>
    </tr>
  `;

  return emailWrapper(content);
}
