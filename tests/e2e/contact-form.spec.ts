import { test, expect } from '@playwright/test'

/**
 * Contact form E2E tests (Task 13.2).
 *
 * Covers the three contact-form journeys on `/contact`:
 *   1. Happy path    — a fully-valid submission shows the success panel.
 *   2. Validation    — an empty submission surfaces inline errors, no navigation.
 *   3. Error/fallback — the direct-contact affordances (WhatsApp + email) are
 *                        always present so users have a route when things break.
 *
 * On the built E2E server (`npm run build && npm run start`) `RESEND_API_KEY`
 * is unset, so the `submitEnquiry` server action runs in TEST MODE: it validates
 * the payload and returns `{ success: true }` WITHOUT sending a real email. That
 * lets the happy path exercise the full submit flow with no external calls.
 *
 * A genuine Resend 500 / failure path can't be forced against the built server
 * (test mode always returns success), so it is covered by unit tests that mock
 * the Resend client (see the honeypot/action unit tests). Here we instead assert
 * the fallback contact affordances the failure UI directs users toward always
 * exist on the page.
 *
 * Validates: Requirements 15.3, 15.4, 15.5, 15.6
 */

test.describe('Contact form', () => {
  test('happy path: a valid submission shows the success message', async ({
    page,
  }) => {
    await page.goto('/contact')

    // Fill every required field with valid data via its visible label.
    await page.getByLabel('Your Name').fill('Jane Smith')
    await page.getByLabel('Your Business Name').fill("Smith's Cafe")
    await page.getByLabel('Your Phone Number').fill('07700900000')
    await page.getByLabel('Your Email Address').fill('jane@example.com')

    // Selects: businessType by option value, service by its full label string.
    await page.getByLabel('Your Business Type').selectOption('restaurant')
    await page
      .getByLabel('What are you looking for?')
      .selectOption('A brand new website')

    await page.getByRole('button', { name: /Send My Enquiry/i }).click()

    // Success renders a role="status" panel confirming receipt.
    const status = page.getByRole('status')
    await expect(status).toBeVisible()
    await expect(page.getByText(/in touch within 24 hours/i)).toBeVisible()
  })

  test('validation path: an empty submission shows inline errors without navigating', async ({
    page,
  }) => {
    await page.goto('/contact')

    await page.getByRole('button', { name: /Send My Enquiry/i }).click()

    // Client-side validation blocks the submit: at least one control inside the
    // form is flagged invalid and a field-level message is shown.
    await expect(page.locator('form [aria-invalid="true"]').first()).toBeVisible()
    await expect(page.getByText(/Please enter your name/i)).toBeVisible()

    // Still on /contact — the form did not reload or navigate.
    await expect(page).toHaveURL(/\/contact$/)
  })

  test('error/fallback path: direct-contact affordances are always available', async ({
    page,
  }) => {
    // NOTE: A true Resend 500 can't be triggered against the built E2E server,
    // which runs in test mode (RESEND_API_KEY unset) and always returns success.
    // The 500 handling in submitEnquiry — along with the honeypot silent-reject
    // path — is covered by unit tests that mock the Resend client. Here we assert
    // the fallback routes the error UI points to (WhatsApp + email) are present
    // on the page, so users always have a way through even if a submit failed.
    await page.goto('/contact')

    // WhatsApp link in the AlternativeContact section.
    await expect(
      page.locator('a[href*="wa.me/447424158513"]').first(),
    ).toBeVisible()

    // Email mailto link in the AlternativeContact section.
    await expect(
      page.locator('a[href="mailto:hello@veltrodigital.co.uk"]').first(),
    ).toBeVisible()
  })
})
