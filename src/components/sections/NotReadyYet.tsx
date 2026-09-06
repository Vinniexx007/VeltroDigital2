import Section from '@/components/layout/Section'
import CTAButton from '@/components/ui/CTAButton'

/**
 * NotReadyYet — "Not Ready Yet? That's Fine Too." reassurance section.
 *
 * Server Component. Invites undecided visitors to browse the Services and Work
 * pages, with two low-pressure CTAs.
 */
export default function NotReadyYet() {
  return (
    <Section background="white">
      <h2 className="text-h2 font-bold text-navy">
        Not Ready Yet? That&rsquo;s Fine Too.
      </h2>
      <p className="text-body-lg text-navy-light mt-4 max-w-prose">
        Have a browse of our services or see what we&rsquo;ve built for other
        businesses. When you&rsquo;re ready, we&rsquo;ll be here.
      </p>
      <div className="mt-8 flex flex-col sm:flex-row gap-4">
        <CTAButton
          label="Explore Our Services"
          href="/services"
          variant="secondary"
        />
        <CTAButton label="See Our Work" href="/work" variant="ghost" />
      </div>
    </Section>
  )
}
