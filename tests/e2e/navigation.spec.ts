import { test, expect, type Page } from '@playwright/test'

/**
 * Navigation E2E tests (Task 13.1).
 *
 * For each of the five pages, verifies the global header (logo, desktop nav
 * links to all five pages, and the primary CTA) and the global footer (logo,
 * contact details, social links, business hours, and the brand tagline).
 *
 * These run at a desktop viewport because the header's primary nav and CTA are
 * `hidden lg:flex` / `hidden lg:block` — only visible at the `lg` breakpoint
 * and up. Mobile-specific navigation behaviour is covered separately in
 * `mobile.spec.ts`.
 *
 * Validates: Requirements 1.1, 1.2
 */

// Force a desktop viewport so the `lg`-and-up header nav and CTA are visible,
// regardless of which Playwright project (desktop/mobile) runs this file.
test.use({ viewport: { width: 1280, height: 800 } })

const PAGES = ['/', '/services', '/about', '/work', '/contact'] as const

const NAV_HREFS = ['/', '/services', '/about', '/work', '/contact'] as const

const SOCIAL_ARIA_LABELS = [
  'Veltro Digital on Facebook',
  'Veltro Digital on Instagram',
  'Veltro Digital on X',
  'Message Veltro Digital on WhatsApp',
] as const

async function assertHeader(page: Page) {
  const header = page.locator('header')
  await expect(header).toBeVisible()

  // Logo — an <img alt="Veltro Digital"> inside the header. There can be more
  // than one logo instance in the header tree (e.g. the mobile menu), so scope
  // to the header and take the first.
  await expect(
    header.getByRole('img', { name: 'Veltro Digital' }).first(),
  ).toBeVisible()

  // Desktop nav links to all five pages are present and visible.
  for (const href of NAV_HREFS) {
    await expect(
      header.locator(`a[href="${href}"]`).first(),
    ).toBeVisible()
  }

  // Primary CTA present in the header. The header renders it once for desktop
  // (and the mobile menu may render another), so assert at least one visible.
  await expect(
    header.getByRole('link', { name: 'Get Your Free Quote' }).first(),
  ).toBeVisible()
}

async function assertFooter(page: Page) {
  const footer = page.locator('footer')
  await expect(footer).toBeVisible()

  // Logo in the footer.
  await expect(
    footer.getByRole('img', { name: 'Veltro Digital' }).first(),
  ).toBeVisible()

  // Contact details.
  await expect(footer.getByText('+44 7424 158513')).toBeVisible()
  await expect(footer.getByText('hello@veltrodigital.co.uk')).toBeVisible()

  // Social links by accessible name.
  for (const label of SOCIAL_ARIA_LABELS) {
    await expect(footer.getByRole('link', { name: label })).toBeVisible()
  }

  // Business hours — assert a representative fragment is present.
  await expect(footer.getByText(/8am/i).first()).toBeVisible()

  // Brand tagline.
  await expect(
    footer.getByText('We Build • We Innovate • We Grow'),
  ).toBeVisible()
}

for (const path of PAGES) {
  test(`header and footer render on ${path}`, async ({ page }) => {
    await page.goto(path)

    await assertHeader(page)
    await assertFooter(page)
  })
}
