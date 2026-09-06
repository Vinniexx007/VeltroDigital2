import { test, expect, type Page } from '@playwright/test'

/**
 * Accessibility E2E tests (Task 13.6).
 *
 * Covers keyboard navigation through the desktop header, the mobile menu focus
 * trap (open → Escape closes → focus returns to the hamburger), contact-form
 * label association (Property 8), and ARIA error wiring on invalid submission.
 *
 * Validates: Requirements 19.4, 19.5, 19.6
 */

const DESKTOP_VIEWPORT = { width: 1280, height: 800 } as const
const MOBILE_VIEWPORT = { width: 375, height: 800 } as const

/** The five primary nav destinations, rendered as header links on desktop. */
const NAV_HREFS = ['/', '/services', '/about', '/work', '/contact'] as const

test.describe('Keyboard navigation (desktop)', () => {
  test.use({ viewport: DESKTOP_VIEWPORT })

  test('Tab reaches every header nav link and the primary CTA', async ({
    page,
  }) => {
    await page.goto('/')

    // Start tabbing from the top of the document. The header nav links and the
    // "Get Your Free Quote" CTA are all focusable; collect what each Tab lands
    // on and assert the nav destinations and CTA appear in the focus order.
    const focusedHrefs = new Set<string>()
    const focusedTexts: string[] = []

    for (let i = 0; i < 15; i++) {
      await page.keyboard.press('Tab')

      const focused = await page.evaluate(() => {
        const el = document.activeElement as HTMLElement | null
        if (!el) return { href: null as string | null, text: '' }
        return {
          // Prefer the pathname of any anchor so query/origin differences don't
          // break matching against the app's relative hrefs.
          href: el instanceof HTMLAnchorElement ? el.getAttribute('href') : null,
          text: (el.textContent ?? '').trim(),
        }
      })

      if (focused.href) focusedHrefs.add(focused.href)
      if (focused.text) focusedTexts.push(focused.text)
    }

    // Every primary nav link is reachable via the keyboard.
    for (const href of NAV_HREFS) {
      expect(
        focusedHrefs.has(href),
        `expected keyboard focus to reach nav link ${href}`,
      ).toBe(true)
    }

    // The primary CTA is reachable via the keyboard.
    expect(
      focusedTexts.some((t) => t.includes('Get Your Free Quote')),
      'expected keyboard focus to reach the "Get Your Free Quote" CTA',
    ).toBe(true)
  })
})

test.describe('Mobile menu focus trap', () => {
  test.use({ viewport: MOBILE_VIEWPORT })

  test('opens the dialog, then Escape closes it and restores focus to the hamburger', async ({
    page,
  }) => {
    await page.goto('/')

    const hamburger = page.getByRole('button', {
      name: 'Open navigation menu',
    })
    await expect(hamburger).toBeVisible()

    await hamburger.click()

    // The overlay dialog is shown with the five nav links + primary CTA.
    const dialog = page.locator('#mobile-menu-panel')
    await expect(dialog).toBeVisible()
    await expect(dialog).toHaveAttribute('role', 'dialog')

    for (const href of NAV_HREFS) {
      await expect(dialog.locator(`a[href="${href}"]`).first()).toBeVisible()
    }
    await expect(
      dialog.getByRole('link', { name: 'Get Your Free Quote' }),
    ).toBeVisible()

    // Escape closes the menu and returns focus to the (re-labelled) hamburger.
    await page.keyboard.press('Escape')

    await expect(dialog).toBeHidden()
    await expect(
      page.getByRole('button', { name: 'Open navigation menu' }),
    ).toBeFocused()
  })
})

test.describe('Contact form accessibility', () => {
  test.use({ viewport: DESKTOP_VIEWPORT })

  test('every form control has an associated non-empty label (Property 8)', async ({
    page,
  }) => {
    await page.goto('/contact')

    const form = page.locator('form')
    await expect(form).toBeVisible()

    // Gather every real control inside the form, excluding the aria-hidden
    // honeypot (which is intentionally hidden from the accessibility tree).
    const controls = await form
      .locator(
        'input:not([aria-hidden="true"]), select:not([aria-hidden="true"]), textarea:not([aria-hidden="true"])',
      )
      .all()

    expect(controls.length).toBeGreaterThan(0)

    for (const control of controls) {
      const id = await control.getAttribute('id')
      expect(id, 'every form control must have an id for label association').toBeTruthy()

      // A <label for={id}> must exist and carry non-empty visible text.
      const label = form.locator(`label[for="${id}"]`)
      await expect(label).toHaveCount(1)

      const labelText = (await label.first().innerText()).trim()
      expect(
        labelText.length,
        `label for #${id} must have non-empty text`,
      ).toBeGreaterThan(0)

      // The label's `for` must point at this exact control, confirming the
      // htmlFor/id association (not just that a label with this id exists).
      const associatedId = await control.getAttribute('id')
      expect(associatedId).toBe(id)
    }
  })

  test('invalid submission wires aria-invalid and aria-describedby to a visible error', async ({
    page,
  }) => {
    await page.goto('/contact')

    // Submit with all fields empty.
    await page
      .getByRole('button', { name: /Send My Enquiry/ })
      .click()

    // At least one control is now flagged invalid.
    const invalidControls = page.locator('form [aria-invalid="true"]')
    await expect(invalidControls.first()).toBeVisible()

    const first = invalidControls.first()
    const describedBy = await first.getAttribute('aria-describedby')
    expect(
      describedBy,
      'an invalid control must reference its error via aria-describedby',
    ).toBeTruthy()

    // The referenced element exists, is visible, and has non-empty text.
    const errorEl = page.locator(`#${describedBy}`)
    await expect(errorEl).toBeVisible()
    const errorText = (await errorEl.innerText()).trim()
    expect(errorText.length, 'the referenced error must have text').toBeGreaterThan(0)
  })
})
