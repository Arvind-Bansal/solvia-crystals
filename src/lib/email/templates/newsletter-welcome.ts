// ─── Newsletter Welcome Email Template ───────

import { emailWrapper, emailButton, BRAND } from "../components";

export function newsletterWelcomeEmail(email: string): string {
  const content = `
    <tr>
      <td style="padding:32px 0 16px;">
        <h1 style="font-family:Georgia,serif;font-size:24px;color:${BRAND.white};margin:0;font-weight:400;">
          Welcome to the Solvia community
        </h1>
        <p style="font-family:${BRAND.font};font-size:14px;color:${BRAND.silver};margin:8px 0 0;">
          You're now signed up at ${email}. Here's what to expect:
        </p>
      </td>
    </tr>
    <tr>
      <td style="padding:16px 0;">
        <table width="100%" cellpadding="0" cellspacing="0" style="font-family:${BRAND.font};font-size:14px;color:${BRAND.silver};line-height:1.8;">
          <tr><td style="padding:4px 0;">✦ Early access to new collections</td></tr>
          <tr><td style="padding:4px 0;">✦ Styling guides and crystal care tips</td></tr>
          <tr><td style="padding:4px 0;">✦ Exclusive subscriber-only offers</td></tr>
        </table>
      </td>
    </tr>
    <tr>
      <td style="padding:8px 0;">
        <p style="font-family:${BRAND.font};font-size:13px;color:${BRAND.silver};margin:0;">
          We send 2–3 emails per month. No spam, ever.
        </p>
      </td>
    </tr>
    <tr>
      <td align="center">
        ${emailButton("Browse the Collection", "https://solviacrystals.com/shop")}
      </td>
    </tr>
  `;

  return emailWrapper(content);
}
