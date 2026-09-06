import Section from '@/components/layout/Section'
import CTAButton from '@/components/ui/CTAButton'

/**
 * AboutCTASection — closing call-to-action band on the About page.
 *
 * Server Component (no interactivity). Presents a friendly "Fancy a Chat?"
 * invitation with a primary CTA to the Contact page and direct contact
 * options (WhatsApp + email) on a navy background. Copy is taken from
 * `veltro-digital-about-copy-v4.md` (CTA Section).
 */
export default function AboutCTASection() {
  return (
    <Section background="navy">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-h2 font-bold text-white">Fancy a Chat?</h2>
        <p className="text-body-lg text-grey mt-4">
          Find out what Veltro Digital could do for your business. Free,
          no-obligation — just an honest conversation.
        </p>

        <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <CTAButton label="Get in Touch" href="/contact" variant="primary" />
          <a
            href="https://wa.me/447424158513"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white font-semibold hover:text-amber focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber rounded-btn px-2 py-1"
          >
            WhatsApp: +44 7424 158513
          </a>
          <a
            href="mailto:hello@veltrodigital.co.uk"
            className="text-white font-semibold hover:text-amber focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber rounded-btn px-2 py-1"
          >
            hello@veltrodigital.co.uk
          </a>
        </div>

        <p className="text-grey mt-4">
          Free consultation. Response within 24 hours. North West based.
        </p>
      </div>
    </Section>
  )
}
