import type { EnquiryPayload } from './types'

/**
 * Reasonable email format check. Requires a local part, an @, a domain with at
 * least one dot, and a TLD of two or more characters. Intentionally permissive
 * (not RFC 5322 exhaustive) while rejecting the obvious invalid cases.
 */
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

/** The six fields that must be present and non-blank on every enquiry. */
const REQUIRED_MESSAGES: Record<string, string> = {
  name: 'Please enter your name.',
  businessName: 'Please enter your business name.',
  businessType: 'Please select your business type.',
  phone: 'Please enter your phone number.',
  email: 'Please enter your email address.',
  service: 'Please tell us what you are looking for.',
}

const REQUIRED_FIELDS = Object.keys(REQUIRED_MESSAGES) as Array<
  keyof EnquiryPayload
>

/** True when a value is missing, an empty string, or whitespace only. */
function isBlank(value: unknown): boolean {
  return typeof value !== 'string' || value.trim().length === 0
}

/**
 * Validate a contact enquiry payload.
 *
 * Pure and deterministic: no I/O, no external dependencies, no reliance on
 * ambient state. Given the same input it always returns the same result.
 *
 * @param payload - Partial enquiry data (typically parsed from a form).
 * @returns `valid` is true only when there are no errors; `errors` maps each
 *          failing field name to a human-readable message.
 */
export function validateEnquiry(payload: Partial<EnquiryPayload>): {
  valid: boolean
  errors: Record<string, string>
} {
  const errors: Record<string, string> = {}

  for (const field of REQUIRED_FIELDS) {
    if (isBlank(payload[field])) {
      errors[field] = REQUIRED_MESSAGES[field]
    }
  }

  // Email format: only checked when a value was actually provided. If email is
  // blank the required-field message above already applies.
  const email = payload.email
  if (typeof email === 'string' && email.trim().length > 0) {
    if (!EMAIL_REGEX.test(email.trim())) {
      errors.email = 'Please enter a valid email address.'
    }
  }

  // `website` and `message` are optional and intentionally never validated here.

  return { valid: Object.keys(errors).length === 0, errors }
}
