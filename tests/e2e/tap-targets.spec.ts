import { test, expect } from '@playwright/test'

/**
 * Tap target E2E tests (Task 13.4).
 *
 * Property 5: All CTA buttons meet the minimum tap target size on mobile.
 *
 * At a 375px-wide mobile viewport, every visible element carrying the
 * `data-cta` attribute (rendered by `<CTAButton>` with `min-h-[44px] py-3 px-6`)
 * must present a tap target of at least 44x44px, per WCAG 2.5.5 / Requirement
 * 16.3.
 *
 * Only *visible* CTAs are measured: some CTAs live inside the mobile menu
 * overlay, which is closed (not rendered / display:none) by default, so those
 * have no meaningful box and are skipped.
 *
 * Validates: Requirements 16.3
 */

// A common small-phone viewport (iPhone X/11/12 logical width).
test.use({ viewport: { width: 375, height: 812 } })

const PAGES = ['/', '/services', '/about', '/work', '/contact'] as const

// Minimum tap target dimension in CSS pixels. A small sub-pixel tolerance
// accounts for browsers reporting fractional bounding boxes (e.g. 43.99px)
// even when the applied CSS is exactly 44px.
const MIN_TAP_TARGET = 44
const TOLERANCE = 0.5

for (const path of PAGES) {
  test(`all visible CTAs meet the 44x44px tap target on ${path}`, async ({
    page,
  }) => {
    await page.goto(path)

    const ctas = page.locator('[data-cta]')

    // Every page should render at least one CTA somewhere in its markup.
    const count = await ctas.count()
    expect(count, `expected at least one [data-cta] element on ${path}`).toBeGreaterThan(0)

    let measured = 0

    for (let i = 0; i < count; i++) {
      const cta = ctas.nth(i)

      // Skip CTAs that are not visible (e.g. those inside the closed mobile
      // menu overlay). Only on-screen tap targets are relevant here.
      if (!(await cta.isVisible())) continue

      const box = await cta.boundingBox()
      // A visible element can still report a null box in rare layout states;
      // there is nothing to measure in that case, so skip it.
      if (box === null) continue

      measured++

      expect(
        box.width,
        `CTA #${i} on ${path} is too narrow (${box.width}px < ${MIN_TAP_TARGET}px)`,
      ).toBeGreaterThanOrEqual(MIN_TAP_TARGET - TOLERANCE)

      expect(
        box.height,
        `CTA #${i} on ${path} is too short (${box.height}px < ${MIN_TAP_TARGET}px)`,
      ).toBeGreaterThanOrEqual(MIN_TAP_TARGET - TOLERANCE)
    }

    // Guard against a false pass where every CTA was skipped: at the mobile
    // viewport each page still surfaces at least one visible CTA.
    expect(
      measured,
      `expected at least one visible CTA to measure on ${path}`,
    ).toBeGreaterThan(0)
  })
}
