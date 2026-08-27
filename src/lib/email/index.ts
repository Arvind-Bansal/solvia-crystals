// ─── Email Service ────────────────────────────
// Provider-agnostic email sending abstraction.
//
// In development (NODE_ENV !== "production"):
//   Emails are logged to the console. No provider is called.
//   This is intentional — use a real inbox test (Resend test mode) for E2E.
//
// In production:
//   Uses Resend (https://resend.com). Requires:
//     RESEND_API_KEY=re_xxxxxxxxxxxx
//     EMAIL_FROM=Solvia Crystals <concierge@solviacrystals.com>
//
// To swap providers, replace the body of sendToProvider() only.
// The rest of this module is provider-agnostic.

interface EmailPayload {
  to: string;
  subject: string;
  html: string;
  replyTo?: string;
}

interface EmailResult {
  success: boolean;
  messageId?: string;
  error?: string;
}

/**
 * Send a transactional email.
 *
 * In development: logs to console, returns { success: true }.
 * In production: sends via the configured email provider.
 *
 * Never throws — always returns an EmailResult.
 */
export async function sendEmail(payload: EmailPayload): Promise<EmailResult> {
  if (process.env.NODE_ENV !== "production") {
    console.log("[Email:dev] ─────────────────────────────────");
    console.log(`[Email:dev] To:      ${payload.to}`);
    console.log(`[Email:dev] Subject: ${payload.subject}`);
    console.log(`[Email:dev] HTML:    ${payload.html.length} chars`);
    console.log("[Email:dev] ─────────────────────────────────");
    return { success: true, messageId: `dev_${Date.now()}` };
  }

  return sendToProvider(payload);
}

/**
 * Production email provider implementation — Resend.
 *
 * Replace this function body to swap providers (SendGrid, SES, Postmark, etc.).
 * The interface (EmailPayload → EmailResult) stays the same.
 */
async function sendToProvider(payload: EmailPayload): Promise<EmailResult> {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.EMAIL_FROM ?? "Solvia Crystals <concierge@solviacrystals.com>";

  if (!apiKey) {
    console.warn(
      "[Email] RESEND_API_KEY is not set. Email not sent. " +
        "Add RESEND_API_KEY to .env.local and restart."
    );
    return { success: false, error: "Email provider not configured." };
  }

  try {
    // Using the Resend REST API directly to avoid adding a dependency.
    // If you prefer the Resend SDK: npm install resend
    // then: const resend = new Resend(apiKey); await resend.emails.send({...})
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: payload.to,
        subject: payload.subject,
        html: payload.html,
        ...(payload.replyTo ? { reply_to: payload.replyTo } : {}),
      }),
    });

    if (res.ok) {
      const data = await res.json().catch(() => ({}));
      return { success: true, messageId: (data as { id?: string }).id };
    }

    const errBody = await res.json().catch(() => null);
    const message =
      (errBody as { message?: string } | null)?.message ??
      `Resend API responded with ${res.status}`;
    console.error("[Email] Resend API error:", message);
    return { success: false, error: message };
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown email error";
    console.error("[Email] Network error sending email:", message);
    return { success: false, error: message };
  }
}

export type { EmailPayload, EmailResult };
