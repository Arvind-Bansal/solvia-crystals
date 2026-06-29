// ─── Email Component Primitives ──────────────
// Shared, inline-styled HTML components for email templates.
// Email clients don't support external CSS — all styles must be inline.

const BRAND = {
  bg: "#0a0a0a",
  cardBg: "#121212",
  gold: "#C8A960",
  white: "#F2F2F2",
  silver: "#ABABAB",
  border: "rgba(255,255,255,0.1)",
  font: "'Helvetica Neue', Helvetica, Arial, sans-serif",
};

export function emailHeader(): string {
  return `
    <table width="100%" cellpadding="0" cellspacing="0" style="background:${BRAND.bg};padding:32px 0;">
      <tr>
        <td align="center">
          <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">
            <tr>
              <td align="center" style="padding:24px 0 16px;">
                <span style="font-family:Georgia,serif;font-size:28px;font-weight:500;letter-spacing:0.2em;color:${BRAND.white};">SOLVIA</span>
                <br/>
                <span style="font-family:${BRAND.font};font-size:10px;text-transform:uppercase;letter-spacing:0.3em;color:${BRAND.gold};">Crystals</span>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  `;
}

export function emailFooter(): string {
  return `
    <table width="100%" cellpadding="0" cellspacing="0" style="background:${BRAND.bg};padding:32px 0;">
      <tr>
        <td align="center">
          <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">
            <tr>
              <td align="center" style="border-top:1px solid ${BRAND.border};padding:24px 20px;">
                <p style="font-family:${BRAND.font};font-size:12px;color:${BRAND.silver};margin:0 0 8px;">
                  Solvia Crystals · Handcrafted Crystal Jewellery
                </p>
                <p style="font-family:${BRAND.font};font-size:11px;color:rgba(171,171,171,0.5);margin:0;">
                  You received this email because of your interaction with solviacrystals.com
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  `;
}

export function emailButton(label: string, url: string): string {
  return `
    <table cellpadding="0" cellspacing="0" style="margin:24px auto;">
      <tr>
        <td align="center" style="background:${BRAND.gold};padding:14px 32px;border-radius:2px;">
          <a href="${url}" style="font-family:${BRAND.font};font-size:13px;font-weight:600;color:${BRAND.bg};text-decoration:none;text-transform:uppercase;letter-spacing:0.1em;">${label}</a>
        </td>
      </tr>
    </table>
  `;
}

export function emailProductRow(item: { name: string; price: string; quantity: number; image: string }): string {
  return `
    <tr>
      <td style="padding:12px 0;border-bottom:1px solid ${BRAND.border};">
        <table width="100%" cellpadding="0" cellspacing="0">
          <tr>
            <td width="64" style="padding-right:16px;">
              <img src="${item.image}" alt="${item.name}" width="64" height="64" style="display:block;border-radius:2px;object-fit:cover;" />
            </td>
            <td style="font-family:${BRAND.font};vertical-align:middle;">
              <p style="margin:0;font-size:14px;color:${BRAND.white};font-weight:500;">${item.name}</p>
              <p style="margin:4px 0 0;font-size:12px;color:${BRAND.silver};">Qty: ${item.quantity}</p>
            </td>
            <td align="right" style="font-family:${BRAND.font};font-size:14px;color:${BRAND.white};vertical-align:middle;">
              ${item.price}
            </td>
          </tr>
        </table>
      </td>
    </tr>
  `;
}

export function emailWrapper(content: string): string {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Solvia Crystals</title>
    </head>
    <body style="margin:0;padding:0;background:${BRAND.bg};font-family:${BRAND.font};">
      ${emailHeader()}
      <table width="100%" cellpadding="0" cellspacing="0" style="background:${BRAND.bg};">
        <tr>
          <td align="center">
            <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;padding:0 20px;">
              ${content}
            </table>
          </td>
        </tr>
      </table>
      ${emailFooter()}
    </body>
    </html>
  `;
}

export { BRAND };
