// ─── Contact Form Auto-Reply Template ────────

import { emailWrapper, BRAND } from "../components";

interface ContactReplyData {
  customerName: string;
  subject: string;
}

export function contactConfirmationEmail(data: ContactReplyData): string {
  const content = `
    <tr>
      <td style="padding:32px 0 16px;">
        <h1 style="font-family:Georgia,serif;font-size:24px;color:${BRAND.white};margin:0;font-weight:400;">
          We received your message
        </h1>
        <p style="font-family:${BRAND.font};font-size:14px;color:${BRAND.silver};margin:8px 0 0;">
          Hi ${data.customerName}, thanks for reaching out. We've received your message regarding "${data.subject}" and will get back to you within 24–48 hours.
        </p>
      </td>
    </tr>
    <tr>
      <td style="padding:16px 0;">
        <p style="font-family:${BRAND.font};font-size:13px;color:${BRAND.silver};margin:0;line-height:1.7;">
          In the meantime, you might find answers in our
          <a href="https://solviacrystals.com/shipping" style="color:${BRAND.gold};text-decoration:none;">Shipping</a> or
          <a href="https://solviacrystals.com/returns" style="color:${BRAND.gold};text-decoration:none;">Returns</a> pages.
        </p>
      </td>
    </tr>
  `;

  return emailWrapper(content);
}
