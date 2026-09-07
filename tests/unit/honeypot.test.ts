// Feature: veltro-digital-website
// Property 3: Non-empty honeypot always causes silent rejection (no email sent)
//
// For any otherwise-valid form payload combined with any non-empty string value
// for the honeypot field (`hp`), the `submitEnquiry` server action must return
// `{ success: true }` and must NOT invoke the Resend email transport.
//
// Validates: Requirements 15.7

import * as fc from 'fast-check'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

// A module-level mock for `resend`'s `emails.send`. Declared via `vi.hoisted`
// so it is initialised before the hoisted `vi.mock` factory runs and remains
// referenceable from the test body.
const { sendMock } = vi.hoisted(() => ({ sendMock: vi.fn() }))

vi.mock('resend', () => ({
  Resend: vi.fn(function () {
    return { emails: { send: sendMock } }
  }),
}))

import { submitEnquiry } from '@/app/contact/actions'

/**
 * Build a FormData with all valid required fields plus a honeypot value.
 * The honeypot (`hp`) is checked first in `submitEnquiry`, so a non-empty value
 * must short-circuit to success before any send path is reached.
 */
function buildFormData(honeypot: string): FormData {
  const formData = new FormData()
  formData.set('name', 'Alex Doe')
  formData.set('businessName', 'Doe Restaurant Ltd')
  formData.set('businessType', 'restaurant')
  formData.set('phone', '07700900000')
  formData.set('email', 'alex@example.com')
  formData.set('website', 'https://example.com')
  formData.set('service', 'A brand new website')
  formData.set('message', 'Looking forward to it.')
  formData.set('hp', honeypot)
  return formData
}

describe('Property 3: non-empty honeypot always causes silent rejection', () => {
  const originalApiKey = process.env.RESEND_API_KEY

  beforeEach(() => {
    // Use a non-'test', non-empty key so the send path WOULD run if reached.
    // This proves the honeypot check (which runs first) is what short-circuits,
    // rather than the test-mode early return.
    process.env.RESEND_API_KEY = 'real-looking-key-not-test'
    sendMock.mockClear()
  })

  afterEach(() => {
    if (originalApiKey === undefined) {
      delete process.env.RESEND_API_KEY
    } else {
      process.env.RESEND_API_KEY = originalApiKey
    }
  })

  it('returns { success: true } and never calls Resend for any non-empty honeypot', async () => {
    await fc.assert(
      fc.asyncProperty(fc.string({ minLength: 1 }), async (honeypot) => {
        sendMock.mockClear()

        const result = await submitEnquiry(buildFormData(honeypot))

        expect(result).toEqual({ success: true })
        expect(sendMock).not.toHaveBeenCalled()
      }),
      { numRuns: 100 },
    )
  })
})
