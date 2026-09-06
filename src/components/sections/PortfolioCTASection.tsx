import Section from '@/components/layout/Section'
import CTAButton from '@/components/ui/CTAButton'

/**
 * PortfolioCTASection — closing call-to-action band on the Work page.
 *
 * Server Component. Invites visitors who've browsed the portfolio to request a
 * free quote, on a navy background for visual contrast (Requirement 13.4).
 */
export default function PortfolioCTASection() {
  return (
    <Section background="navy">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-h2 font-bold text-white">Like What You See?</h2>
        <p className="text-body-lg text-grey mt-4">
          Let&apos;s build something just as good for your business. Tell us
          what you need and we&apos;ll send over a clear, no-pressure quote.
        </p>

        <div className="mt-8 flex justify-center">
          <CTAButton
            label="Get Your Free Quote"
            href="/contact"
            variant="primary"
          />
        </div>
      </div>
    </Section>
  )
}
