import Section from '@/components/layout/Section'

/**
 * StraightTalkingPromise — About page reassurance band.
 *
 * Server Component (no interactivity). Copy is taken verbatim from
 * `veltro-digital-about-copy-v4.md` (Personal Touch Section — "A
 * Straight-Talking Promise").
 */
export default function StraightTalkingPromise() {
  return (
    <Section background="grey">
      <h2 className="text-h2 font-bold text-navy">A Straight-Talking Promise</h2>

      <p className="text-body text-navy/80 mt-4 max-w-prose">
        We know small business owners have been burned before — by agencies that
        overpromise, disappear after payment, or deliver something that looks
        nothing like what was discussed.
      </p>
      <p className="text-body text-navy/80 mt-4 max-w-prose">
        We do things differently.
      </p>
      <p className="text-body text-navy/80 mt-4 max-w-prose">
        Before any money changes hands, you get a clear quote, a clear scope of
        what&apos;s included, and a clear timeline. During the build we keep you
        updated. After launch we&apos;re still here.
      </p>
      <p className="text-body text-navy/80 mt-4 max-w-prose">
        If something isn&apos;t right, we fix it. Simple as that.
      </p>
    </Section>
  )
}
