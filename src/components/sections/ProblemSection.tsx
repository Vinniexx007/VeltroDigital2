import Section from '@/components/layout/Section'

/**
 * ProblemSection — Home page "The Problem" band (Section 1).
 *
 * Server Component (no interactivity). Frames the core problem the business
 * solves: customers search online first, and businesses without a professional
 * presence lose them to competitors. Copy is taken verbatim from
 * `veltro-digital-homepage-copy-v2.md` Section 1.
 */
export default function ProblemSection() {
  return (
    <Section background="grey">
      <h2 className="text-h2 font-bold text-navy">
        Your Customers Are Searching Online — Can They Find You?
      </h2>
      <p className="text-body text-navy/80 mt-4 max-w-prose">
        Whether someone is looking for a place to eat, a print job done fast, or
        a local service they can trust — the first thing they do is Google it.
      </p>
      <p className="text-body text-navy/80 mt-4 max-w-prose">
        If your business doesn&rsquo;t have a professional online presence, that
        customer is going straight to your competitor.
      </p>
      <p className="text-body text-navy/80 mt-4 max-w-prose">
        A great website and a strong Google profile mean you&rsquo;re open for
        business 24 hours a day — even when you&rsquo;re not.
      </p>
    </Section>
  )
}
