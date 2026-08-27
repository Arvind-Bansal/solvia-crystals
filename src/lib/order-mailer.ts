// ─── Order Confirmation Mailer ────────────────
// Wraps the existing email abstraction + DB layer to send order
// confirmation emails safely and idempotently.
//
// Rules:
//   • An email is only sent if email_sent_at IS NULL in the database.
//   • email_sent_at is written AFTER the provider accepts the message.
//   • If sending fails, the order stays paid — email failure never
//     rolls back payment status.
//   • Safe to call from both verify/route.ts AND webhook/route.ts.
//     Only one of them will actually send; the other finds email_sent_at set.

import { getOrderById, markEmailSent, dbRowToOrder } from "@/lib/db/orders";
import { sendEmail } from "@/lib/email";
import { orderConfirmationEmail } from "@/lib/email/templates/order-confirmation";

/**
 * Sends a confirmation email for the given order ID,
 * unless one has already been sent (idempotent).
 *
 * Never throws — email failures are logged but do not propagate.
 * The caller should NOT roll back payment status if this fails.
 */
export async function sendOrderConfirmationIfNotSent(
  orderId: string
): Promise<void> {
  let dbRow;
  try {
    dbRow = await getOrderById(orderId);
  } catch (err) {
    console.error(
      `[OrderMailer] Could not fetch order ${orderId} for email:`,
      err
    );
    return;
  }

  if (!dbRow) {
    console.warn(`[OrderMailer] Order ${orderId} not found — skipping email.`);
    return;
  }

  // Idempotency guard — already sent
  if (dbRow.email_sent_at) {
    console.info(
      `[OrderMailer] Email already sent for ${orderId} at ${dbRow.email_sent_at}.`
    );
    return;
  }

  const order = dbRowToOrder(dbRow);
  const html = orderConfirmationEmail(order);

  const result = await sendEmail({
    to: order.customer.email,
    subject: `Your Solvia Crystals order — ${order.id}`,
    html,
    replyTo: "concierge@solviacrystals.com",
  });

  if (result.success) {
    // Record that email was accepted — prevents duplicate sends
    await markEmailSent(orderId);
    console.info(`[OrderMailer] Confirmation email sent for ${orderId}.`);
  } else {
    // Log failure but DO NOT throw — order remains paid
    console.error(
      `[OrderMailer] Email send failed for ${orderId}:`,
      result.error
    );
  }
}
