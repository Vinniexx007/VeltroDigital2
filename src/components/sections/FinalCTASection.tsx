import CTAButton from '@/components/ui/CTAButton'

/**
 * FinalCTASection — Home page closing call-to-action band.
 *
 * Server Component (no interactivity). Sits at the very bottom of the Home page
 * and drives the visitor to the contact page for a free quote. Copy is taken
 * verbatim from `veltro-digital-homepage-copy-v2.md`.
 *
 * Note: this section renders its own <section> wrapper (rather than the shared
 * <Section> component) so the navy background spans full width with centred,
 * text-centred content specific to this band.
 */
export default function FinalCTASection() {
  return (
    <section className="bg-navy text-white">
      <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20 text-center">
        <h2 className="text-h2 font-bold text-white">
          Ready to Get Found Online?
        </h2>
        <p className="text-body-lg text-grey mt-4">
          Free, no-obligation quote. Response within 24 hours.
        </p>
        <div className="mt-8 flex justify-center">
          <CTAButton
            label="Get Your Free Quote Today"
            href="/contact"
            variant="primary"
          />
        </div>
      </div>
    </section>
  )
}
