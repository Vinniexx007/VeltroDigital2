// Feature: veltro-digital-website — unit + property tests for JSON-LD structured data
import { describe, it, expect } from 'vitest'
import * as fc from 'fast-check'
import { generateLocalBusinessSchema } from '@/lib/seo/structured-data'

describe('Property 6: JSON-LD LocalBusiness output is always valid and complete', () => {
  it('produces a stable, valid, complete LocalBusiness schema across repeated invocations', () => {
    fc.assert(
      // The function is nullary and deterministic; a dummy arbitrary simply
      // drives repeated invocations to assert output stability + completeness.
      fc.property(fc.integer(), () => {
        const schema = generateLocalBusinessSchema()

        // Round-trips through JSON serialization as valid JSON.
        const json = JSON.stringify(schema)
        const parsed = JSON.parse(json)
        expect(parsed).toEqual(schema)

        // Core identity fields.
        expect(schema['@type']).toBe('LocalBusiness')
        expect(schema['@context']).toBe('https://schema.org')

        // Required non-empty string fields.
        for (const value of [
          schema.name,
          schema.url,
          schema.telephone,
          schema.email,
        ]) {
          expect(typeof value).toBe('string')
          expect(value.length).toBeGreaterThan(0)
        }

        // Address with region + country present and non-empty.
        expect(schema.address).toBeDefined()
        expect(typeof schema.address.addressRegion).toBe('string')
        expect(schema.address.addressRegion.length).toBeGreaterThan(0)
        expect(typeof schema.address.addressCountry).toBe('string')
        expect(schema.address.addressCountry.length).toBeGreaterThan(0)

        // Opening hours is a non-empty array.
        expect(Array.isArray(schema.openingHoursSpecification)).toBe(true)
        expect(schema.openingHoursSpecification.length).toBeGreaterThan(0)
      }),
      { numRuns: 100 }
    )
  })
})

describe('generateLocalBusinessSchema — exact field values', () => {
  it('uses the correct business name and contact email', () => {
    const schema = generateLocalBusinessSchema()
    expect(schema.name).toBe('Veltro Digital')
    expect(schema.email).toBe('hello@veltrodigital.co.uk')
  })
})
