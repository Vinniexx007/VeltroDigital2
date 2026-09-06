// Feature: veltro-digital-website — unit tests for SEO page metadata
import { describe, it, expect } from 'vitest'
import { PAGE_METADATA } from '@/lib/seo/metadata'

const PAGES = ['home', 'services', 'about', 'work', 'contact'] as const

describe('PAGE_METADATA — per-page title and description', () => {
  it.each(PAGES)('page "%s" has a non-empty title containing "Veltro Digital"', (page) => {
    const { title } = PAGE_METADATA[page]
    expect(typeof title).toBe('string')
    expect(title.trim().length).toBeGreaterThan(0)
    expect(title).toContain('Veltro Digital')
  })

  it.each(PAGES)('page "%s" has a non-empty description', (page) => {
    const { description } = PAGE_METADATA[page]
    expect(typeof description).toBe('string')
    expect(description.trim().length).toBeGreaterThan(0)
  })

  it.each(PAGES)('page "%s" description length is SEO-appropriate (50–320 chars)', (page) => {
    const { description } = PAGE_METADATA[page]
    expect(description.length).toBeGreaterThanOrEqual(50)
    expect(description.length).toBeLessThanOrEqual(320)
  })
})

describe('PAGE_METADATA — uniqueness across pages', () => {
  it('every page has a unique title', () => {
    const titles = PAGES.map((page) => PAGE_METADATA[page].title)
    expect(new Set(titles).size).toBe(titles.length)
  })

  it('every page has a unique description', () => {
    const descriptions = PAGES.map((page) => PAGE_METADATA[page].description)
    expect(new Set(descriptions).size).toBe(descriptions.length)
  })
})

describe('PAGE_METADATA — exact required strings (Requirement 18.1)', () => {
  it('home title matches the exact required string', () => {
    expect(PAGE_METADATA.home.title).toBe(
      'Veltro Digital | Websites for Small Businesses in the North West'
    )
  })
})
