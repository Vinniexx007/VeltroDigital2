import CTAButton from '@/components/ui/CTAButton'

/**
 * HeroSection — Home page above-the-fold hero (Requirement 2).
 *
 * Server Component (no interactivity). Renders the primary H1, subheadline,
 * and the two CTAs. Layout is a clean centred-left column that stacks on
 * mobile: below `sm` (640px) the CTAs stack vertically and the primary CTA
 * spans full width; from `sm` up they sit inline sized to their content
 * (Requirement 2.5).
 *
 * The band uses a subtle navy → navy-light gradient with an amber top accent
 * so it reads as its own surface and separates visually from the solid navy
 * header directly above it (rather than blending into it). All colours are
 * brand tokens (navy, navy-light, amber).
 *
 * Copy is taken verbatim from `veltro-digital-homepage-copy-v2.md`.
 */
export default function HeroSection() {
  return (
    <section className="border-t-4 border-amber bg-gradient-to-b from-navy to-navy-light">
      <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
        <h1 className="text-h1-mobile md:text-h1 lg:text-hero font-extrabold text-white">
          Websites That Work as Hard as You Do
        </h1>

        <p className="text-body-lg text-grey mt-6 max-w-prose">
          Professional, affordable websites for small businesses across the
          North West. Built fast. Built to get found on Google. No jargon, no
          faff.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row gap-4">
          {/*
            Primary CTA: full width on mobile via `fullWidth`. Wrapping each
            button in a div lets the primary shrink to its content on `sm+`
            while remaining full width in the stacked mobile layout.
          */}
          <div className="sm:w-auto">
            <CTAButton
              label="Get Your Free Quote"
              href="/contact"
              variant="primary"
              fullWidth
            />
          </div>
          <div className="sm:w-auto">
            <CTAButton
              label="See Our Work ↓"
              href="/work"
              variant="ghost"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
