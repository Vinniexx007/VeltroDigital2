// Feature: veltro-digital-website — Property 7: brand palette colour pairs meet WCAG AA contrast
// Validates: Requirements 19.3
import { describe, test, expect } from 'vitest'
import { hex } from 'wcag-contrast'

/** Brand palette (from tailwind config / globals.css). */
const PALETTE = {
  navy: '#0F1F3D',
  navyDark: '#080F1E',
  navyLight: '#1A3260',
  blue: '#378ADD',
  blueLight: '#5EA3E8',
  blueDark: '#2565AD',
  grey: '#F5F7FA',
  greyDark: '#E2E6ED',
  amber: '#EF9F27',
  amberLight: '#F4B84A',
  amberDark: '#C97D0E',
  white: '#FFFFFF',
} as const

type Usage = 'normal' | 'large'

interface ColourPair {
  name: string
  fg: string
  bg: string
  /** WCAG AA minimum: 4.5 for normal text, 3.0 for large text / non-text accents. */
  min: number
  usage: Usage
}

/**
 * The actual foreground/background combinations the site's components rely on.
 * Normal-text pairs require >= 4.5; large-text / decorative accents require >= 3.0.
 */
const APPROVED_COLOUR_PAIRS: ColourPair[] = [
  { name: 'white text on navy bg', fg: PALETTE.white, bg: PALETTE.navy, min: 4.5, usage: 'normal' },
  { name: 'white text on navy-dark bg', fg: PALETTE.white, bg: PALETTE.navyDark, min: 4.5, usage: 'normal' },
  { name: 'grey text on navy bg', fg: PALETTE.grey, bg: PALETTE.navy, min: 4.5, usage: 'normal' },
  { name: 'navy text on white bg', fg: PALETTE.navy, bg: PALETTE.white, min: 4.5, usage: 'normal' },
  { name: 'navy text on grey bg', fg: PALETTE.navy, bg: PALETTE.grey, min: 4.5, usage: 'normal' },
  { name: 'white text on blue-dark bg', fg: PALETTE.white, bg: PALETTE.blueDark, min: 4.5, usage: 'normal' },
  { name: 'amber accent on navy bg (large/non-text)', fg: PALETTE.amber, bg: PALETTE.navy, min: 3.0, usage: 'large' },
  { name: 'white text on blue bg (large text)', fg: PALETTE.white, bg: PALETTE.blue, min: 3.0, usage: 'large' },
]

describe('Property 7: approved brand palette colour pairs meet WCAG AA contrast', () => {
  test.each(APPROVED_COLOUR_PAIRS)(
    '$name — ratio meets minimum $min ($usage)',
    ({ fg, bg, min }) => {
      const ratio = hex(fg, bg)
      expect(ratio).toBeGreaterThanOrEqual(min)
    },
  )
})
