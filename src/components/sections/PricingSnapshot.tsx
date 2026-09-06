import Section from '@/components/layout/Section'
import PricingTable from '@/components/ui/PricingTable'
import CTAButton from '@/components/ui/CTAButton'

/**
 * PricingSnapshot — Home page pricing band (Section 6).
 *
 * Server Component (no interactivity). Presents a condensed pricing summary via
 * the shared <PricingTable> with the bundle row highlighted, a reassurance
 * line, and a CTA through to the full services/pricing page. Copy is taken
 * verbatim from `veltro-digital-homepage-copy-v2.md` Section 6.
 */
export default function PricingSnapshot() {
  return (
    <Section background="white">
      <h2 className="text-h2 font-bold text-navy">Simple, Honest Pricing</h2>
      <div className="mt-8">
        <PricingTable highlightBundle />
      </div>
      <p className="text-body text-navy/80 mt-4">
        No hidden fees. No nasty surprises. Just clear, upfront pricing.
      </p>
      <div className="mt-6">
        <CTAButton
          label="See Full Pricing & Services"
          href="/services"
          variant="primary"
        />
      </div>
    </Section>
  )
}
