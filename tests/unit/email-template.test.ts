// Feature: veltro-digital-website — unit tests for the enquiry email template
// Validates: Requirements 15.3
import { describe, it, expect } from 'vitest'
import {
  buildEmailTemplate,
  buildEmailSubject,
} from '@/lib/contact/email-template'
import type { EnquiryPayload } from '@/lib/contact/types'

/** A payload where every field (including optional ones) holds a value. */
function completePayload(): EnquiryPayload {
  return {
    name: 'Alex Example',
    businessName: 'Example Bistro Ltd',
    businessType: 'restaurant',
    phone: '07700900123',
    email: 'alex@example.com',
    website: 'https://example.com',
    service: 'A brand new website',
    message: 'We need a new site before the summer season.',
  }
}

describe('buildEmailTemplate', () => {
  it('includes the header text on every enquiry email', () => {
    const html = buildEmailTemplate(completePayload())
    expect(html).toContain('New enquiry')
  })

  it('renders every field value from a complete payload as a visible string', () => {
    const payload = completePayload()
    const html = buildEmailTemplate(payload)

    expect(html).toContain(payload.name)
    expect(html).toContain(payload.businessName)
    expect(html).toContain(payload.businessType)
    expect(html).toContain(payload.phone)
    expect(html).toContain(payload.email)
    expect(html).toContain(payload.website as string)
    expect(html).toContain(payload.service)
    expect(html).toContain(payload.message as string)
  })

  it('labels each field in the rendered output', () => {
    const html = buildEmailTemplate(completePayload())
    for (const label of [
      'Name',
      'Business Name',
      'Business Type',
      'Phone',
      'Email',
      'Website',
      'Service',
      'Message',
    ]) {
      expect(html).toContain(label)
    }
  })

  it('HTML-escapes user input so script payloads cannot execute in email clients', () => {
    const payload = completePayload()
    payload.message = "<script>alert('xss')</script>"
    const html = buildEmailTemplate(payload)

    // The raw, executable string must never survive into the output.
    expect(html).not.toContain("<script>alert('xss')</script>")
    // The escaped form must be present instead.
    expect(html).toContain('&lt;script&gt;')
    expect(html).toContain('&lt;/script&gt;')
  })

  it('escapes each of the five sensitive HTML characters', () => {
    const payload = completePayload()
    payload.name = `& < > " '`
    const html = buildEmailTemplate(payload)

    expect(html).toContain('&amp;')
    expect(html).toContain('&lt;')
    expect(html).toContain('&gt;')
    expect(html).toContain('&quot;')
    expect(html).toContain('&#39;')
  })

  it('renders "Not provided" for empty optional fields', () => {
    const payload = completePayload()
    payload.website = ''
    payload.message = ''
    const html = buildEmailTemplate(payload)

    expect(html).toContain('Not provided')
  })

  it('never leaks secrets or env artifacts into the output', () => {
    // Even if a secret-looking value were somehow present in a field, the
    // template only ever renders EnquiryPayload data — it must not surface
    // Resend keys, env references, or tokens of its own accord.
    const html = buildEmailTemplate(completePayload())

    expect(html).not.toContain('RESEND')
    expect(html).not.toContain('process.env')
  })
})

describe('buildEmailSubject', () => {
  it('includes both the name and business name', () => {
    const payload = completePayload()
    const subject = buildEmailSubject(payload)

    expect(subject).toContain(payload.name)
    expect(subject).toContain(payload.businessName)
  })
})
