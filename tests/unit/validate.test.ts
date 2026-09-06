// Feature: veltro-digital-website — property tests for contact form validation
import { describe, it } from 'vitest'
import * as fc from 'fast-check'
import { validateEnquiry } from '@/lib/contact/validate'
import type { EnquiryPayload } from '@/lib/contact/types'

const REQUIRED_FIELDS = [
  'name',
  'businessName',
  'businessType',
  'phone',
  'email',
  'service',
] as const

/** A payload where every required field holds a valid, non-blank value. */
function validBasePayload(): EnquiryPayload {
  return {
    name: 'Alex Example',
    businessName: 'Example Ltd',
    businessType: 'restaurant',
    phone: '07700900000',
    email: 'alex@example.com',
    website: '',
    service: 'A brand new website',
    message: '',
  }
}

/**
 * Generator for a well-formed email that satisfies the validator's regex
 * (/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/). Local part and domain are built from
 * alphanumeric characters so they never contain whitespace or `@`.
 */
const alnum = fc
  .stringMatching(/^[a-zA-Z0-9]+$/)
  .filter((s) => s.length > 0)

const validEmail = fc
  .tuple(alnum, alnum)
  .map(([local, domain]) => `${local}@${domain}.com`)

/** Non-empty text with at least one non-whitespace character. */
const nonBlankText = fc
  .string({ minLength: 1 })
  .filter((s) => s.trim().length > 0)

describe('Property 1: required field absence always produces validation errors', () => {
  it('fails validation with an error for every omitted required field', () => {
    fc.assert(
      fc.property(
        // Pick a non-empty subset of required fields to omit (blank out).
        fc.subarray([...REQUIRED_FIELDS], { minLength: 1 }),
        (fieldsToOmit) => {
          const payload: EnquiryPayload = validBasePayload()
          for (const field of fieldsToOmit) {
            payload[field] = ''
          }

          const result = validateEnquiry(payload)

          return (
            result.valid === false &&
            fieldsToOmit.every((field) => result.errors[field] !== undefined)
          )
        }
      ),
      { numRuns: 100 }
    )
  })
})

describe('Property 2: valid complete submissions always pass validation', () => {
  it('returns valid with no errors for any well-formed complete payload', () => {
    fc.assert(
      fc.property(
        fc.record({
          name: nonBlankText,
          businessName: nonBlankText,
          businessType: nonBlankText,
          phone: nonBlankText,
          email: validEmail,
          service: nonBlankText,
          // Optional fields — any string, including empty.
          website: fc.string(),
          message: fc.string(),
        }),
        (payload) => {
          const result = validateEnquiry(payload)
          return (
            result.valid === true &&
            Object.keys(result.errors).length === 0
          )
        }
      ),
      { numRuns: 100 }
    )
  })
})
