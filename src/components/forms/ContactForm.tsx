'use client'

import { useState } from 'react'
import type { FormEvent } from 'react'

import { submitEnquiry } from '@/app/contact/actions'
import { FormField } from '@/components/forms/FormField'
import { FormSelect } from '@/components/forms/FormSelect'
import { FormTextarea } from '@/components/forms/FormTextarea'
import type {
  BusinessType,
  ContactFormState,
  EnquiryPayload,
  FormStatus,
  ServiceOption,
} from '@/lib/contact/types'
import { validateEnquiry } from '@/lib/contact/validate'

const INITIAL_STATE: ContactFormState = {
  name: '',
  businessName: '',
  businessType: '',
  phone: '',
  email: '',
  website: '',
  service: '',
  message: '',
  honeypot: '',
}

/** Business-type dropdown options (value stored, label shown). */
const BUSINESS_TYPE_OPTIONS: { value: BusinessType; label: string }[] = [
  { value: 'restaurant', label: 'Restaurant / Café' },
  { value: 'print-shop', label: 'Print Shop' },
  { value: 'retail', label: 'Retail' },
  { value: 'other', label: 'Other' },
]

/**
 * The seven "What are you looking for?" options. The stored value and the
 * visible label are intentionally the same string so the enquiry email reads
 * naturally.
 */
const SERVICE_OPTIONS: { value: ServiceOption; label: ServiceOption }[] = (
  [
    'A brand new website',
    'A refresh of my existing website',
    'Google Business Profile setup',
    'The Small Business Bundle (website + Google profile)',
    'Domain & Hosting management',
    'Monthly Care Plan',
    'Not sure yet — just want some advice',
  ] as ServiceOption[]
).map((option) => ({ value: option, label: option }))

/** Build the payload validated by the shared validator from current state. */
function toPayload(state: ContactFormState): EnquiryPayload {
  return {
    name: state.name,
    businessName: state.businessName,
    businessType: state.businessType,
    phone: state.phone,
    email: state.email,
    website: state.website,
    service: state.service,
    message: state.message,
  }
}

/** Build the FormData sent to the Server Action from current state. */
function toFormData(state: ContactFormState): FormData {
  const formData = new FormData()
  formData.set('name', state.name)
  formData.set('businessName', state.businessName)
  formData.set('businessType', state.businessType)
  formData.set('phone', state.phone)
  formData.set('email', state.email)
  formData.set('website', state.website)
  formData.set('service', state.service)
  formData.set('message', state.message)
  formData.set('hp', state.honeypot)
  return formData
}

export function ContactForm() {
  const [state, setState] = useState<ContactFormState>(INITIAL_STATE)
  const [status, setStatus] = useState<FormStatus>('idle')
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [submitError, setSubmitError] = useState<string>('')

  /** Update a single controlled field and clear any error already shown for it. */
  function updateField<K extends keyof ContactFormState>(
    field: K,
    value: ContactFormState[K],
  ) {
    setState((prev) => ({ ...prev, [field]: value }))
    setErrors((prev) => {
      if (!prev[field as string]) return prev
      const next = { ...prev }
      delete next[field as string]
      return next
    })
  }

  /**
   * Validate a single field on blur by running the shared validator over the
   * full payload and picking out just this field's message (if any). This keeps
   * client-side rules identical to the server without duplicating logic.
   */
  function validateField(field: keyof EnquiryPayload) {
    const { errors: allErrors } = validateEnquiry(toPayload(state))
    setErrors((prev) => {
      const next = { ...prev }
      if (allErrors[field]) {
        next[field] = allErrors[field]
      } else {
        delete next[field]
      }
      return next
    })
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const { valid, errors: validationErrors } = validateEnquiry(toPayload(state))
    if (!valid) {
      setErrors(validationErrors)
      setStatus('error')
      setSubmitError('')
      return
    }

    setErrors({})
    setSubmitError('')
    setStatus('submitting')

    try {
      const result = await submitEnquiry(toFormData(state))
      if (result.success) {
        setStatus('success')
      } else {
        setStatus('error')
        setSubmitError(
          result.error ??
            "We couldn't send your message. Please contact us directly via WhatsApp or email.",
        )
      }
    } catch {
      setStatus('error')
      setSubmitError(
        "We couldn't send your message. Please contact us directly via WhatsApp or email.",
      )
    }
  }

  if (status === 'success') {
    return (
      <div
        role="status"
        className="rounded-card border border-green-600 bg-green-50 p-6 text-green-800"
      >
        <h3 className="text-xl font-bold">Thank you — message received</h3>
        <p className="mt-2">
          Your enquiry has been received. We&apos;ll be in touch within 24 hours.
        </p>
      </div>
    )
  }

  const isSubmitting = status === 'submitting'

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      <FormField
        id="name"
        name="name"
        label="Your Name"
        value={state.name}
        onChange={(value) => updateField('name', value)}
        onBlur={() => validateField('name')}
        required
        error={errors.name}
        autoComplete="name"
      />

      <FormField
        id="businessName"
        name="businessName"
        label="Your Business Name"
        value={state.businessName}
        onChange={(value) => updateField('businessName', value)}
        onBlur={() => validateField('businessName')}
        required
        error={errors.businessName}
        autoComplete="organization"
      />

      <FormSelect
        id="businessType"
        name="businessType"
        label="Your Business Type"
        value={state.businessType}
        onChange={(value) =>
          updateField('businessType', value as ContactFormState['businessType'])
        }
        onBlur={() => validateField('businessType')}
        required
        error={errors.businessType}
        options={BUSINESS_TYPE_OPTIONS}
      />

      <FormField
        id="phone"
        name="phone"
        label="Your Phone Number"
        type="tel"
        value={state.phone}
        onChange={(value) => updateField('phone', value)}
        onBlur={() => validateField('phone')}
        required
        error={errors.phone}
        autoComplete="tel"
      />

      <FormField
        id="email"
        name="email"
        label="Your Email Address"
        type="email"
        value={state.email}
        onChange={(value) => updateField('email', value)}
        onBlur={() => validateField('email')}
        required
        error={errors.email}
        autoComplete="email"
      />

      <FormField
        id="website"
        name="website"
        label="Your Website"
        type="url"
        value={state.website}
        onChange={(value) => updateField('website', value)}
        error={errors.website}
        placeholder="https://…"
      />

      <FormSelect
        id="service"
        name="service"
        label="What are you looking for?"
        value={state.service}
        onChange={(value) =>
          updateField('service', value as ContactFormState['service'])
        }
        onBlur={() => validateField('service')}
        required
        error={errors.service}
        options={SERVICE_OPTIONS}
      />

      <FormTextarea
        id="message"
        name="message"
        label="Anything else?"
        value={state.message}
        onChange={(value) => updateField('message', value)}
        error={errors.message}
        placeholder="Tell us a bit about your business and what you're hoping to achieve online — the more detail the better."
      />

      {/* Honeypot: hidden from real users, tempting to bots. Kept visually and
          from the accessibility tree; a non-empty value triggers silent
          rejection server-side. */}
      <input
        type="text"
        name="hp"
        tabIndex={-1}
        aria-hidden="true"
        autoComplete="off"
        className="sr-only"
        value={state.honeypot}
        onChange={(event) => updateField('honeypot', event.target.value)}
      />

      {status === 'error' && submitError && (
        <div
          role="alert"
          className="rounded-card border border-red-600 bg-red-50 p-4 text-red-800"
        >
          <p className="font-semibold">{submitError}</p>
          <p className="mt-2 text-sm">
            You can also reach us directly on{' '}
            <a
              href="https://wa.me/447424158513"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold underline"
            >
              WhatsApp
            </a>{' '}
            or by email at{' '}
            <a
              href="mailto:hello@veltrodigital.co.uk"
              className="font-semibold underline"
            >
              hello@veltrodigital.co.uk
            </a>
            .
          </p>
        </div>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="min-h-[44px] rounded-btn bg-blue px-6 py-3 font-semibold text-white disabled:opacity-60"
      >
        {isSubmitting ? 'Sending…' : 'Send My Enquiry →'}
      </button>

      <p className="text-sm text-navy/70">
        ✓ Free consultation &nbsp;&nbsp; ✓ No obligation &nbsp;&nbsp; ✓ Response
        within 24 hours
      </p>
    </form>
  )
}
