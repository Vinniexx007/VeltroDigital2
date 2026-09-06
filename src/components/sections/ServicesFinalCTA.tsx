import Section from '@/components/layout/Section'
import CTAButton from '@/components/ui/CTAButton'

/**
 * ServicesFinalCTA — closing call-to-action band on the Services page.
 *
 * Server Component. Presents a reassuring "not sure where to start?" message
 * with direct contact options (WhatsApp CTA + email) on a navy background.
 * Copy is taken from `veltro-digital-services-copy-v6.md` (Final CTA Section).
 */
export default function ServicesFinalCTA() {
  return (
    <Section background="navy">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-h2 font-bold text-white">Not Sure Where to Start?</h2>
        <p className="text-body-lg text-grey mt-4">
          Get in touch and we’ll give you an honest recommendation — no jargon,
          no pressure.
        </p>

        <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <CTAButton
            label="Message Us on WhatsApp"
            href="https://wa.me/447424158513"
            variant="primary"
            external
          />
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
