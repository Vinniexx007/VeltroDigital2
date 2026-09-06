import type { Metadata } from 'next'

import PageHeader from '@/components/sections/PageHeader'
import ProcessSection from '@/components/sections/ProcessSection'
import FAQSection from '@/components/sections/FAQSection'
import ServicesFinalCTA from '@/components/sections/ServicesFinalCTA'
import Section from '@/components/layout/Section'
import ServiceCard from '@/components/ui/ServiceCard'
import PricingTable from '@/components/ui/PricingTable'
import { SERVICES } from '@/lib/content/services'
import { PAGE_METADATA } from '@/lib/seo/metadata'

export const metadata: Metadata = {
  title: { absolute: PAGE_METADATA.services.title },
  description: PAGE_METADATA.services.description,
  alternates: {
    canonical: '/services',
  },
  openGraph: {
    title: PAGE_METADATA.services.title,
    description: PAGE_METADATA.services.description,
    url: '/services',
    images: [
      {
        url: '/images/og/services.png',
        width: 1200,
        height: 630,
      },
    ],
  },
}

/**
 * Services page — full detail of every Veltro Digital service offering.
 *
 * Server Component (static). Composes the shared page header, the six full
 * service cards, the pricing summary table, the six-step process band, the
 * FAQ accordion, and the closing call-to-action. Service content is sourced
 * from `@/lib/content/services`; the process, FAQ, and final CTA bands render
 * their own <Section> wrappers.
 */
export default function ServicesPage() {
  return (
    <>
      <PageHeader
        heading="Our Services"
        tagline="We Build • We Innovate • We Grow"
        subheadline="Professional websites, Google Business Profile setup and fully managed hosting — everything a North West small business needs to get found online."
      />

      <Section background="white">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {SERVICES.map((service) => (
            <ServiceCard key={service.name} {...service} />
          ))}
        </div>
      </Section>

      <Section background="grey">
        <h2 className="text-h2 font-bold text-navy">Simple, Honest Pricing</h2>
        <div className="mt-8">
          <PricingTable highlightBundle />
        </div>
      </Section>

      <ProcessSection />

      <FAQSection />

      <ServicesFinalCTA />
    </>
  )
}
