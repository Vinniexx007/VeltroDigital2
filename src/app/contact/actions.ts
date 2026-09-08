'use server'

import { Resend } from 'resend'

import { buildEmailSubject, buildEmailTemplate } from '@/lib/contact/email-template'
import type { EnquiryPayload, EnquiryResult } from '@/lib/contact/types'
import { validateEnquiry } from '@/lib/contact/validate'

/** User-safe failure message shown when an enquiry cannot be delivered. */
const SEND_FAILURE_MESSAGE =
  "We couldn't send your message. Please contact us directly via WhatsApp or email."

/**
 * Read a single form field and coerce it to a string. A missing field
 * (`FormData.get` returns `null`) or a `File` value becomes an empty string, so
 * downstream validation sees a consistent shape.
 */
function readField(formData: FormData, name: string): string {
  const value = formData.get(name)
  return typeof value === 'string' ? value : ''
}

/**
 * Handle a contact-form enquiry submitted from the client.
 *
 * This is a Server Action (`'use server'`): it runs only on the server and is
 * reachable as an untrusted POST endpoint, so every input is treated as
 * untrusted and validated here rather than relying on client-side checks.
 *
 * The Resend API key is read exclusively from `process.env.RESEND_API_KEY` and
 * is never hardcoded, logged, or returned to the client.
 */
export async function submitEnquiry(formData: FormData): Promise<EnquiryResult> {
  // 1. Honeypot: a real user never fills the hidden `hp` field. If it has any
  // content we assume a bot and silently accept the submission without doing
  // any work, so spammers get no signal that they were rejected.
  const honeypot = formData.get('hp')
  if (typeof honeypot === 'string' && honeypot.length > 0) {
    return { success: true }
  }

  // 2. Parse all fields into an EnquiryPayload. Nulls/Files coerce to ''.
  const payload: EnquiryPayload = {
    name: readField(formData, 'name'),
    businessName: readField(formData, 'businessName'),
    businessType: readField(formData, 'businessType'),
    phone: readField(formData, 'phone'),
    email: readField(formData, 'email'),
    website: readField(formData, 'website'),
    service: readField(formData, 'service'),
    message: readField(formData, 'message'),
  }

  // 3. Server-side validation. Field-level messages are surfaced client-side;
  // here we return a single summary message when anything is invalid.
  const { valid } = validateEnquiry(payload)
  if (!valid) {
    return {
      success: false,
      error: 'Please check the highlighted fields and try again.',
    }
  }

  // 4. TEST MODE. Only the literal 'test' key skips the real Resend call, so CI
  // and E2E runs can exercise the full validation + submission flow without
  // sending real email. A MISSING key is treated as a misconfiguration (see
  // below) rather than a silent success — otherwise a deployment without the
  // env var would confirm "sent" to users while delivering nothing.
  const apiKey = process.env.RESEND_API_KEY
  if (apiKey === 'test') {
    return { success: true }
  }

  // A real (non-test) send requires a configured key. If it's missing we must
  // NOT report success — that was the original bug: users saw "message sent"
  // while nothing was delivered.
  if (!apiKey) {
    console.error('Enquiry send failed: RESEND_API_KEY is not configured')
    return { success: false, error: SEND_FAILURE_MESSAGE }
  }

  // 5. Real send.
  try {
    const html = buildEmailTemplate(payload)
    const subject = buildEmailSubject(payload)

    const resend = new Resend(apiKey)

    // The `from` address MUST be on a domain verified in Resend, otherwise the
    // send is rejected. It's configurable via CONTACT_FROM_EMAIL so the sending
    // domain can change (e.g. a verified subdomain) without a code change; the
    // default targets the verified `contact.` subdomain. The recipient inbox is
    // separately configurable via CONTACT_TO_EMAIL and need not be verified.
    const fromEmail =
      process.env.CONTACT_FROM_EMAIL ?? 'Veltro Digital <hello@contact.veltrodigital.co.uk>'
    const toEmail = process.env.CONTACT_TO_EMAIL ?? 'hello@veltrodigital.co.uk'

    // Resend reports API-level failures (e.g. an unverified sending domain) via
    // the returned `error` object rather than by throwing. We MUST inspect it —
    // a non-null `error` means the email was NOT delivered, so treat it as a
    // failure instead of returning a false success.
    const { data, error } = await resend.emails.send({
      from: fromEmail,
      to: toEmail,
      replyTo: payload.email,
      subject,
      html,
    })

    if (error) {
      // Log the provider's error name/message only — never the API key or the
      // full request. This surfaces causes like "domain not verified" in logs.
      console.error(
        `Enquiry send failed: ${error.name ?? 'unknown_error'} — ${error.message ?? 'no message'}`,
      )
      return { success: false, error: SEND_FAILURE_MESSAGE }
    }

    if (!data?.id) {
      // Defensive: a success response should carry an email id. If it doesn't,
      // we can't confirm delivery, so don't claim success.
      console.error('Enquiry send failed: Resend returned no email id')
      return { success: false, error: SEND_FAILURE_MESSAGE }
    }

    // 6. Success — the provider accepted the message for delivery.
    return { success: true }
  } catch {
    // 7. Network/unexpected error. Log only a safe, static message. The caught
    // error may contain the API key or other secrets, so it is never logged or
    // returned.
    console.error('Enquiry send failed: unexpected error calling Resend')
    return { success: false, error: SEND_FAILURE_MESSAGE }
  }
}
