/**
 * Form Service — Provider-agnostic abstraction for form submissions.
 * 
 * Current implementation: Formspree (https://formspree.io)
 * To switch providers, update the submitToProvider function.
 * 
 * Setup: Create forms at formspree.io and set env vars:
 *   NEXT_PUBLIC_FORMSPREE_CONTACT_ID=your_form_id
 *   NEXT_PUBLIC_FORMSPREE_NEWSLETTER_ID=your_form_id
 */

interface FormResponse {
  success: boolean;
  error?: string;
}

interface ContactFormData {
  firstName: string;
  lastName: string;
  email: string;
  subject: string;
  message: string;
}

async function submitToFormspree(formId: string, data: Record<string, unknown>): Promise<FormResponse> {
  if (!formId) {
    console.warn("[FormService] No Formspree form ID configured. Set NEXT_PUBLIC_FORMSPREE_CONTACT_ID or NEXT_PUBLIC_FORMSPREE_NEWSLETTER_ID in .env.local");
    return {
      success: false,
      error: "Our message service is not configured yet. Please email us directly at concierge@solviacrystals.com",
    };
  }

  try {
    const res = await fetch(`https://formspree.io/f/${formId}`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(data),
    });

    if (res.ok) {
      return { success: true };
    }

    const body = await res.json().catch(() => null);
    return { success: false, error: body?.error || "Something went wrong. Please try again." };
  } catch {
    return { success: false, error: "Network error. Please check your connection." };
  }
}

export async function submitContactForm(data: ContactFormData): Promise<FormResponse> {
  const formId = process.env.NEXT_PUBLIC_FORMSPREE_CONTACT_ID || "";
  return submitToFormspree(formId, {
    // Combined name for Formspree display
    name: `${data.firstName} ${data.lastName}`,
    // Individual fields so all 5 appear as discrete entries in the Formspree dashboard
    firstName: data.firstName,
    lastName: data.lastName,
    email: data.email,
    subject: data.subject,
    message: data.message,
    // Formspree directive — sets the email notification subject line
    _subject: `Solvia Crystals — ${data.subject}`,
  });
}

export async function submitNewsletterForm(email: string): Promise<FormResponse> {
  const formId = process.env.NEXT_PUBLIC_FORMSPREE_NEWSLETTER_ID || "";
  return submitToFormspree(formId, {
    email,
    _subject: "New Newsletter Subscription",
  });
}
