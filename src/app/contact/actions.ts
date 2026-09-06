'use server'

import { Resend } from 'resend'

import { buildEmailSubject, buildEmailTemplate } from '@/lib/contact/email-template'
import type { EnquiryPayload, EnquiryResult } from '@/lib/contact/types'
import { validateEnquiry } from '@/lib/contact/validate'

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

  // 4. TEST MODE. When RESEND_API_KEY is the literal 'test' or is unset/empty,
  // skip the real Resend call and report success. This lets CI and E2E runs
  // exercise the full validation + submission flow without sending real email
  // or requiring a live API key.
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey || apiKey === 'test') {
    return { success: true }
  }

  // 5. Real send.
  try {
    const html = buildEmailTemplate(payload)
    const subject = buildEmailSubject(payload)

    const resend = new Resend(apiKey)
    await resend.emails.send({
      from: 'noreply@veltrodigital.co.uk',
      to: 'hello@veltrodigital.co.uk',
      replyTo: payload.email,
      subject,
      html,
    })

    // 6. Success.
    return { success: true }
  } catch {
    // 7. Log only a safe, static message. The caught error may contain the API
    // key, tokens, or other secrets, so it is never logged or returned.
    console.error('Enquiry send failed')
    return {
      success: false,
      error:
        "We couldn't send your message. Please contact us directly via WhatsApp or email.",
    }
  }
}
