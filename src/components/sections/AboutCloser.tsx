import Section from '@/components/layout/Section'
import CTAButton from '@/components/ui/CTAButton'

/**
 * AboutCloser — Home page "About" closer band (Section 7).
 *
 * Server Component (no interactivity). Reinforces the local, small-business
 * focus and links through to the About page. Copy is taken verbatim from
 * `veltro-digital-homepage-copy-v2.md` Section 7.
 */
export default function AboutCloser() {
  return (
    <Section background="grey">
      <h2 className="text-h2 font-bold text-navy">
        North West Based. Small Business Focused.
      </h2>
      <p className="text-body text-navy/80 mt-4 max-w-prose">
        Veltro Digital is a North West web design service built specifically for
        small businesses who want a professional online presence without the
        agency price tag.
      </p>
      <p className="text-body text-navy/80 mt-4 max-w-prose">
        We handle everything — design, hosting, technical setup — so you can
        focus on running your business.
      </p>
      <div className="mt-6">
        <CTAButton
          label="Find Out More About Us"
          href="/about"
          variant="secondary"
        />
      </div>
    </Section>
  )
}
