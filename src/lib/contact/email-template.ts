import type { EnquiryPayload } from './types'

/**
 * HTML-escape a user-supplied string so it is safe to interpolate into an
 * email body. Prevents XSS/HTML injection in email clients.
 *
 * The ampersand MUST be escaped first, otherwise the entities produced by the
 * later replacements (e.g. `&lt;`) would themselves be double-escaped.
 */
function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

/**
 * Render an optional field value, falling back to a neutral placeholder when
 * the value is empty or undefined. The returned string is already HTML-escaped.
 */
function renderOptional(value: string | undefined): string {
  const trimmed = value?.trim()
  if (!trimmed) {
    return '<em style="color:#6b7280;">Not provided</em>'
  }
  return escapeHtml(trimmed)
}

/**
 * Build the plain-text subject line for an enquiry email.
 *
 * Values are used verbatim here (email subject headers are not HTML), so no
 * HTML escaping is applied. Callers rendering this into HTML must escape it.
 */
export function buildEmailSubject(payload: EnquiryPayload): string {
  const name = payload.name?.trim() || 'Unknown'
  const businessName = payload.businessName?.trim() || 'Unknown business'
  return `New enquiry from ${name} — ${businessName}`
}

/**
 * Build the full HTML email body for a contact-form enquiry.
 *
 * All user-supplied values are HTML-escaped before interpolation. Optional
 * fields (`website`, `message`) fall back to a neutral placeholder when empty.
 *
 * This function only ever receives an EnquiryPayload — it never reads
 * environment variables and never includes any API key, token, or secret in
 * its output.
 */
export function buildEmailTemplate(payload: EnquiryPayload): string {
  const rows: Array<{ label: string; value: string }> = [
    { label: 'Name', value: escapeHtml(payload.name ?? '') },
    { label: 'Business Name', value: escapeHtml(payload.businessName ?? '') },
    { label: 'Business Type', value: escapeHtml(payload.businessType ?? '') },
    { label: 'Phone', value: escapeHtml(payload.phone ?? '') },
    { label: 'Email', value: escapeHtml(payload.email ?? '') },
    { label: 'Website', value: renderOptional(payload.website) },
    { label: 'Service', value: escapeHtml(payload.service ?? '') },
    { label: 'Message', value: renderOptional(payload.message) },
  ]

  const tableRows = rows
    .map(
      ({ label, value }) => `
          <tr>
            <th align="left" style="padding:8px 12px;border-bottom:1px solid #e5e7eb;background-color:#f9fafb;color:#0f1f3d;font-weight:600;vertical-align:top;width:160px;">${label}</th>
            <td style="padding:8px 12px;border-bottom:1px solid #e5e7eb;color:#111827;">${value}</td>
          </tr>`,
    )
    .join('')

  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>New enquiry from the Veltro Digital website</title>
  </head>
  <body style="margin:0;padding:0;background-color:#f3f4f6;font-family:Arial,Helvetica,sans-serif;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#f3f4f6;padding:24px 0;">
      <tr>
        <td align="center">
          <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background-color:#ffffff;border-radius:8px;overflow:hidden;">
            <tr>
              <td style="background-color:#0f1f3d;padding:24px;">
                <h1 style="margin:0;color:#ffffff;font-size:20px;line-height:1.3;">New enquiry from the Veltro Digital website</h1>
              </td>
            </tr>
            <tr>
              <td style="padding:24px;">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;font-size:14px;">${tableRows}
                </table>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`
}
