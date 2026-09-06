import { test, expect } from '@playwright/test'

/**
 * Mobile responsive E2E tests (Task 13.3).
 *
 * Covers:
 *  - Property 4: No horizontal scroll at any mobile viewport width, across all
 *    five pages (the key property).
 *  - TrustBar renders as a 2×2 grid on mobile (Requirement 3.2).
 *  - Hero primary CTA spans (near) full width on mobile (Requirement 2.5).
 *  - Mobile menu: hamburger is visible and opens the nav panel with all five
 *    links plus the CTA (Requirements 1.3, 1.4).
 *
 * These run against an explicit set of mobile viewport widths regardless of the
 * Playwright project, so behaviour is asserted deterministically at each width.
 *
 * Validates: Requirements 16.1, 3.2, 2.5, 1.3, 1.4
 */

const PAGES = ['/', '/services', '/about', '/work', '/contact'] as const

const MOBILE_WIDTHS = [320, 375, 390, 428] as const

// A tall viewport height so content lays out naturally without vertical
// clipping affecting horizontal measurements.
const VIEWPORT_HEIGHT = 900

// -----------------------------------------------------------------------------
// Property 4 — No horizontal scroll at any mobile viewport width
// -----------------------------------------------------------------------------
for (const width of MOBILE_WIDTHS) {
  test.describe(`no horizontal scroll at ${width}px`, () => {
    test.use({ viewport: { width, height: VIEWPORT_HEIGHT } })

    for (const path of PAGES) {
      test(`${path} does not scroll horizontally`, async ({ page }) => {
        await page.goto(path)

        const { scrollWidth, innerWidth } = await page.evaluate(() => ({
          scrollWidth: document.body.scrollWidth,
          innerWidth: window.innerWidth,
        }))

        // Allow 1px tolerance for sub-pixel rounding.
        expect(scrollWidth).toBeLessThanOrEqual(innerWidth + 1)
      })
    }
  })
}

// -----------------------------------------------------------------------------
// TrustBar renders as a 2×2 grid on mobile (Requirement 3.2)
// -----------------------------------------------------------------------------
test.describe('TrustBar layout on mobile', () => {
  test.use({ viewport: { width: 375, height: VIEWPORT_HEIGHT } })

  test('renders the four trust signals in two rows (2 columns)', async ({
    page,
  }) => {
    await page.goto('/')

    const firstItem = page.getByText('Built for small businesses')
    const thirdItem = page.getByText('Live in 2 weeks')

    await expect(firstItem).toBeVisible()
    await expect(thirdItem).toBeVisible()

    const firstBox = await firstItem.boundingBox()
    const thirdBox = await thirdItem.boundingBox()

    expect(firstBox).not.toBeNull()
    expect(thirdBox).not.toBeNull()

    // With `grid-cols-2`, items 1 and 2 share the first row and items 3 and 4
    // wrap to a second row. So item 3 must sit visually below item 1. If the
    // grid were `grid-cols-4` (single row), their y positions would match.
    expect(thirdBox!.y).toBeGreaterThan(firstBox!.y)
  })
})

// -----------------------------------------------------------------------------
// Hero primary CTA spans (near) full width on mobile (Requirement 2.5)
// -----------------------------------------------------------------------------
test.describe('Hero primary CTA on mobile', () => {
  test.use({ viewport: { width: 375, height: VIEWPORT_HEIGHT } })

  test('primary "Get Your Free Quote" CTA spans full content width', async ({
    page,
  }) => {
    await page.goto('/')

    // The hero primary CTA is the first "Get Your Free Quote" link on the page.
    const cta = page.getByRole('link', { name: 'Get Your Free Quote' }).first()
    await expect(cta).toBeVisible()

    const ctaBox = await cta.boundingBox()
    expect(ctaBox).not.toBeNull()

    // Available content width = viewport minus the section's horizontal padding
    // (`px-4` = 16px each side). The full-width CTA should occupy at least ~85%
    // of that, accounting for any incidental margins/rounding.
    const viewportWidth = 375
    const horizontalPadding = 16 * 2
    const availableWidth = viewportWidth - horizontalPadding

    expect(ctaBox!.width).toBeGreaterThanOrEqual(availableWidth * 0.85)
  })
})

// -----------------------------------------------------------------------------
// Mobile menu (Requirements 1.3, 1.4)
// -----------------------------------------------------------------------------
test.describe('Mobile menu', () => {
  test.use({ viewport: { width: 375, height: VIEWPORT_HEIGHT } })

  const MENU_NAV_LABELS = [
    'Home',
    'Services',
    'About',
    'Portfolio',
    'Contact',
  ] as const

  test('hamburger opens the nav panel with all five links and the CTA', async ({
    page,
  }) => {
    await page.goto('/')

    const hamburger = page.getByRole('button', {
      name: 'Open navigation menu',
    })
    await expect(hamburger).toBeVisible()

    await hamburger.click()

    const panel = page.locator('#mobile-menu-panel')
    await expect(panel).toBeVisible()

    // All five nav links are present within the panel.
    for (const label of MENU_NAV_LABELS) {
      await expect(
        panel.getByRole('link', { name: label, exact: true }),
      ).toBeVisible()
    }

    // The primary CTA is present within the panel.
    await expect(
      panel.getByRole('link', { name: 'Get Your Free Quote' }),
    ).toBeVisible()
  })
})
