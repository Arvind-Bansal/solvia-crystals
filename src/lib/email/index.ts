// ─── Email Service ───────────────────────────
// Provider-agnostic email sending abstraction.
// In development, emails are logged to console.
// In production, swap the sendToProvider function for Resend, SendGrid, or SES.

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
 * Send an email.
 * Currently logs to console in development.
 * Replace sendToProvider internals when an email service is configured.
 */
export async function sendEmail(payload: EmailPayload): Promise<EmailResult> {
  if (process.env.NODE_ENV !== "production") {
    console.log(`[Email] To: ${payload.to}`);
    console.log(`[Email] Subject: ${payload.subject}`);
    console.log(`[Email] HTML length: ${payload.html.length} chars`);
    return { success: true, messageId: `dev_${Date.now()}` };
  }

  return sendToProvider(payload);
}

/**
 * Provider implementation.
 * Replace this function body with your email service SDK.
 *
 * Example with Resend:
 * ```
 * import { Resend } from 'resend';
 * const resend = new Resend(process.env.RESEND_API_KEY);
 * const { data, error } = await resend.emails.send({
 *   from: 'Solvia Crystals <hello@solviacrystals.com>',
 *   to: payload.to,
 *   subject: payload.subject,
 *   html: payload.html,
 * });
 * ```
 */
async function sendToProvider(payload: EmailPayload): Promise<EmailResult> {
  // No provider configured yet
  console.warn("[Email] No email provider configured. Email not sent:", payload.subject);
  return { success: false, error: "Email provider not configured." };
}

export type { EmailPayload, EmailResult };
