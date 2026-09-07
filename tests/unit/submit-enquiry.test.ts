// Feature: veltro-digital-website — regression tests for submitEnquiry delivery.
//
// Guards the fix for the "confirms sent but nothing received" bug:
//  - a Resend API-level error (returned, not thrown) must NOT report success
//  - a missing RESEND_API_KEY must NOT report success
//  - a genuine accepted send (data.id present) reports success
//  - the honeypot still short-circuits to success without sending

import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

const { sendMock } = vi.hoisted(() => ({ sendMock: vi.fn() }))

vi.mock('resend', () => ({
  Resend: vi.fn(function () {
    return { emails: { send: sendMock } }
  }),
}))

import { submitEnquiry } from '@/app/contact/actions'

function validFormData(): FormData {
  const fd = new FormData()
  fd.set('name', 'Jane Smith')
  fd.set('businessName', "Smith's Cafe")
  fd.set('businessType', 'restaurant')
  fd.set('phone', '07700900000')
  fd.set('email', 'jane@example.com')
  fd.set('website', '')
  fd.set('service', 'A brand new website')
  fd.set('message', 'Hello')
  fd.set('hp', '')
  return fd
}

describe('submitEnquiry — delivery result handling', () => {
  const originalKey = process.env.RESEND_API_KEY

  beforeEach(() => {
    sendMock.mockClear()
    // Safe default: an accepted send. Individual tests override as needed.
    sendMock.mockResolvedValue({ data: { id: 'email_default' }, error: null })
    process.env.RESEND_API_KEY = 'real-looking-key-not-test'
  })

  afterEach(() => {
    if (originalKey === undefined) delete process.env.RESEND_API_KEY
    else process.env.RESEND_API_KEY = originalKey
  })

  it('returns failure when Resend responds with an error (no false success)', async () => {
    // Resend reports API-level failures via the returned object, not by throwing.
    sendMock.mockResolvedValue({
      data: null,
      error: { name: 'validation_error', message: 'The domain is not verified.' },
    })

    const result = await submitEnquiry(validFormData())

    expect(sendMock).toHaveBeenCalledTimes(1)
    expect(result.success).toBe(false)
    expect(result.error).toBeTruthy()
  })

  it('returns failure when the response carries no email id', async () => {
    sendMock.mockResolvedValue({ data: {}, error: null })

    const result = await submitEnquiry(validFormData())

    expect(result.success).toBe(false)
  })

  it('returns success when Resend accepts the message', async () => {
    sendMock.mockResolvedValue({ data: { id: 'email_123' }, error: null })

    const result = await submitEnquiry(validFormData())

    expect(sendMock).toHaveBeenCalledTimes(1)
    expect(result).toEqual({ success: true })
  })

  it('sends from the verified-domain hello@ address', async () => {
    sendMock.mockResolvedValue({ data: { id: 'email_123' }, error: null })

    await submitEnquiry(validFormData())

    const sendArgs = sendMock.mock.calls[0][0]
    expect(sendArgs.from).toContain('hello@veltrodigital.co.uk')
    expect(sendArgs.to).toBe('hello@veltrodigital.co.uk')
    expect(sendArgs.replyTo).toBe('jane@example.com')
  })

  it('returns failure (not success) when RESEND_API_KEY is missing', async () => {
    delete process.env.RESEND_API_KEY

    const result = await submitEnquiry(validFormData())

    expect(sendMock).not.toHaveBeenCalled()
    expect(result.success).toBe(false)
  })

  it('short-circuits to success on a filled honeypot without sending', async () => {
    const fd = validFormData()
    fd.set('hp', 'i-am-a-bot')

    const result = await submitEnquiry(fd)

    expect(sendMock).not.toHaveBeenCalled()
    expect(result).toEqual({ success: true })
  })
})
