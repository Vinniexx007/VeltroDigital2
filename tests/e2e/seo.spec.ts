import { test, expect } from '@playwright/test'

/**
 * SEO E2E tests.
 *
 * Validates:
 * - Requirement 18.1: page <title> and non-empty <meta name="description">
 * - Requirement 18.2: Open Graph tags present and non-empty
 * - Requirement 18.3: home page JSON-LD LocalBusiness structured data
 * - Requirement 18.4: canonical link present
 * - Requirement 18.5: /sitemap.xml returns 200 and lists all five pages
 * - Requirement 18.6: /robots.txt returns 200, allows crawlers, references sitemap
 *
 * Expected titles mirror PAGE_METADATA (src/lib/seo/metadata.ts). The root
 * layout uses a title template `%s | Veltro Digital` with title.default for the
 * home page; per-page titles already resolve to the full strings asserted below
 * (/work uses title.absolute).
 */

type PageMeta = {
  path: string
  title: string
}

const PAGES: PageMeta[] = [
  {
    path: '/',
    title: 'Veltro Digital | Websites for Small Businesses in the North West',
  },
  {
    path: '/services',
    title:
      'Web Design & Digital Services for Small Businesses | Veltro Digital | North West',
  },
  {
    path: '/about',
    title:
      'About Veltro Digital | Web Design for Small Businesses in the North West',
  },
  {
    path: '/work',
    title: 'Our Work | Web Design Portfolio | Veltro Digital | North West',
  },
  {
    path: '/contact',
    title: 'Contact Veltro Digital | Free Web Design Quote | North West',
  },
]

for (const { path, title } of PAGES) {
  test.describe(`SEO metadata for ${path}`, () => {
    test.beforeEach(async ({ page }) => {
      await page.goto(path)
    })

    test('page title matches expected string (Req 18.1)', async ({ page }) => {
      await expect(page).toHaveTitle(title)
      expect(await page.title()).toBe(title)
    })

    test('meta description is present and non-empty (Req 18.1)', async ({
      page,
    }) => {
      const description = await page
        .locator('meta[name="description"]')
        .getAttribute('content')
      expect(description).toBeTruthy()
      expect((description ?? '').trim().length).toBeGreaterThan(0)
    })

    test('Open Graph tags are present and non-empty (Req 18.2)', async ({
      page,
    }) => {
      const ogProperties = [
        'og:title',
        'og:description',
        'og:url',
        'og:image',
      ]

      for (const property of ogProperties) {
        const content = await page
          .locator(`meta[property="${property}"]`)
          .getAttribute('content')
        expect(content, `${property} should be present`).toBeTruthy()
        expect(
          (content ?? '').trim().length,
          `${property} should be non-empty`,
        ).toBeGreaterThan(0)
      }
    })

    test('canonical link is present (Req 18.4)', async ({ page }) => {
      const canonical = page.locator('link[rel="canonical"]')
      await expect(canonical).toHaveCount(1)
      const href = await canonical.getAttribute('href')
      expect(href).toBeTruthy()
      expect((href ?? '').trim().length).toBeGreaterThan(0)
    })
  })
}

test.describe('SEO infrastructure routes', () => {
  test('/sitemap.xml returns 200 and lists all five pages (Req 18.5)', async ({
    page,
  }) => {
    const res = await page.goto('/sitemap.xml')
    expect(res?.status()).toBe(200)

    const body = await page.content()

    const expectedUrls = [
      'veltrodigital.co.uk',
      '/services',
      '/about',
      '/work',
      '/contact',
    ]

    for (const url of expectedUrls) {
      expect(body, `sitemap should contain ${url}`).toContain(url)
    }
  })

  test('/robots.txt returns 200, allows crawlers, references sitemap (Req 18.6)', async ({
    page,
  }) => {
    const res = await page.goto('/robots.txt')
    expect(res?.status()).toBe(200)

    const body = (await page.content()).toLowerCase()

    // Allows all crawlers — accept the standard directives (case-insensitive).
    expect(body.includes('user-agent: *') || body.includes('allow: /')).toBe(
      true,
    )
    // References the sitemap.
    expect(body).toContain('sitemap:')
  })
})

test.describe('Structured data', () => {
  test('home page exposes LocalBusiness JSON-LD (Req 18.3)', async ({
    page,
  }) => {
    await page.goto('/')

    const jsonLd = page.locator('script[type="application/ld+json"]')
    await expect(jsonLd.first()).toHaveCount(1)

    const content = (await jsonLd.first().textContent()) ?? ''
    expect(content.length).toBeGreaterThan(0)

    // JSON may be serialized with or without spaces depending on the generator;
    // check both the compact form and a looser substring.
    const compact = content.replace(/\s+/g, '')
    expect(compact).toContain('"@type":"LocalBusiness"')
    expect(content).toContain('LocalBusiness')
  })
})
