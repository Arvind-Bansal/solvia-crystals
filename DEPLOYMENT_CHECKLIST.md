# Solvia Crystals — Deployment Checklist

Use this checklist before going live. Work through it top-to-bottom.
Do not mark a step complete unless you have actually verified it.

---

## 1. Environment Variables

Set all of these in your hosting provider (e.g. Vercel > Project > Settings > Environment Variables).
Refer to `.env.example` for descriptions and expected formats.

| Variable | Required | Notes |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | ✅ | Your live domain, e.g. `https://solviacrystals.com` |
| `NEXT_PUBLIC_RAZORPAY_KEY_ID` | ✅ | Live key from Razorpay Dashboard |
| `RAZORPAY_KEY_SECRET` | ✅ | Server-only — never expose to client |
| `RAZORPAY_WEBHOOK_SECRET` | ✅ | Set after configuring webhook below |
| `NEXT_PUBLIC_FORMSPREE_CONTACT_ID` | Recommended | Contact form |
| `NEXT_PUBLIC_FORMSPREE_NEWSLETTER_ID` | Recommended | Newsletter signup |

---

## 2. Razorpay Configuration

### 2a. Account Setup
- [ ] Sign up at [razorpay.com](https://razorpay.com) and complete KYC
- [ ] Switch from **Test Mode** to **Live Mode** in the Razorpay Dashboard
- [ ] Copy your **Live Key ID** and **Live Key Secret**
- [ ] Add them to your production environment variables

### 2b. Webhook Configuration
- [ ] Go to Razorpay Dashboard > Webhooks > Add New Webhook
- [ ] Set the URL to: `https://yourdomain.com/api/payments/razorpay/webhook`
- [ ] Enable these events:
  - `payment.captured`
  - `payment.failed`
  - `order.paid`
- [ ] Copy the **Webhook Secret** and set it as `RAZORPAY_WEBHOOK_SECRET`

### 2c. Footer Social Links
- [ ] Update `src/components/layout/Footer.tsx` — replace the `"#"` placeholders with real Instagram and Facebook URLs
- [ ] Add YouTube URL when the channel is created

---

## 3. Contact Form & Newsletter (Formspree)

- [ ] Create an account at [formspree.io](https://formspree.io)
- [ ] Create a **Contact** form — set `NEXT_PUBLIC_FORMSPREE_CONTACT_ID` to the form ID
- [ ] Create a **Newsletter** form — set `NEXT_PUBLIC_FORMSPREE_NEWSLETTER_ID` to the form ID
- [ ] Configure notification email addresses in Formspree settings
- [ ] Test both forms in production

> **Until Formspree is configured**, the contact form and newsletter will show an honest error message directing users to `concierge@solviacrystals.com`. This is intentional — see `src/lib/form-service.ts`.

---

## 4. Production Build

Run locally before deploying:

```bash
npm run lint
npm run build
```

- [ ] No lint errors
- [ ] Build completes without errors
- [ ] Check `next build` output for any warnings about page size or missing static assets

---

## 5. Vercel Deployment

- [ ] Connect your GitHub repository to Vercel
- [ ] Set all environment variables in Vercel (Project > Settings > Environment Variables)
- [ ] Set environment scope to **Production** for secret keys
- [ ] Deploy from `main` branch
- [ ] Verify the deployment URL resolves correctly

---

## 6. Domain Configuration

- [ ] Add your custom domain in Vercel (Project > Settings > Domains)
- [ ] Update DNS records at your registrar:
  - Add CNAME or A records as instructed by Vercel
- [ ] Verify HTTPS/SSL is active (Vercel provisions this automatically)
- [ ] Confirm `NEXT_PUBLIC_SITE_URL` matches your live domain exactly

---

## 7. Payment Testing

Before going live, test the full payment flow in **Razorpay Test Mode**:

- [ ] Add item to cart → proceed to checkout
- [ ] Fill in all required fields
- [ ] Confirm Razorpay modal opens (not a simulated redirect)
- [ ] Use Razorpay test card: `4111 1111 1111 1111` / Any future expiry / Any CVV
- [ ] Confirm payment verification runs server-side (check server logs)
- [ ] Confirm cart is cleared **only** after payment verification succeeds
- [ ] Confirm success page shows the real order ID and payment ID
- [ ] Test payment cancellation — cart must remain intact

**Switch to Live Mode only after all test-mode flows pass.**

---

## 8. Checkout Testing (Live Mode — Small Amount)

After switching to live Razorpay keys:

- [ ] Place a real ₹1 test order (or lowest-priced item)
- [ ] Confirm payment is captured in Razorpay Dashboard
- [ ] Confirm webhook fires and is received (check Razorpay Dashboard > Webhooks > Logs)
- [ ] Confirm order ID appears in the success page URL

---

## 9. Contact Form Testing (Production)

- [ ] Submit the contact form and verify email is received in Formspree
- [ ] Submit the newsletter form and verify signup is recorded
- [ ] Test with Formspree unconfigured — confirm honest error message appears

---

## 10. Order Persistence (Future)

> **Known Limitation**: This project does not currently have a backend database. Orders are not persisted beyond the payment verification step. The order ID and payment ID are displayed on the success page but are not stored anywhere permanently.
>
> **Before launching at scale**, integrate a database (e.g. Supabase, Firebase, PlanetScale) to:
> - Store verified orders with customer details, items, and payment IDs
> - Send transactional confirmation emails (e.g. via Resend, SendGrid, or Postmark)
> - Enable order lookup and management

The API route `src/app/api/payments/razorpay/verify/route.ts` contains a clear `TODO` comment marking where database persistence should be added.

---

## 11. SEO & Metadata

- [ ] Confirm `NEXT_PUBLIC_SITE_URL` is set correctly (affects sitemap and canonical URLs)
- [ ] Visit `/sitemap.xml` — verify all product and collection pages are included
- [ ] Visit `/robots.txt` — verify it is accessible
- [ ] Check Open Graph preview with [opengraph.xyz](https://opengraph.xyz) or [metatags.io](https://metatags.io)

---

## 12. Final Launch Checks

- [ ] Homepage loads in under 3 seconds on mobile (test with [PageSpeed Insights](https://pagespeed.web.dev))
- [ ] No horizontal overflow on mobile (iPhone SE / 375px)
- [ ] Images all load (no 404s on product images)
- [ ] All navigation links resolve to real pages
- [ ] Footer social links point to real Solvia accounts (not `#`)
- [ ] Contact email `concierge@solviacrystals.com` is monitored
- [ ] Privacy Policy and Terms of Service pages are live
- [ ] Shipping and Returns policies are accurate

---

## Status

**Not production ready until:**
- Razorpay Live keys are configured and webhook is set up
- Formspree forms are configured
- A database/order persistence layer is added
- Payment flow has been end-to-end tested in both test and live mode
