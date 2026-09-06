import Section from '@/components/layout/Section'
import ServiceSummaryCard from '@/components/ui/ServiceSummaryCard'

/**
 * WhatWeDoSection — Home page "What We Do" band (Section 3).
 *
 * Server Component (no interactivity). Summarises the three core services
 * clients receive. Copy is taken verbatim from
 * `veltro-digital-homepage-copy-v2.md` Section 3.
 */
export default function WhatWeDoSection() {
  return (
    <Section background="grey">
      <h2 className="text-h2 font-bold text-navy">
        What You Get With Veltro Digital
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        <ServiceSummaryCard
          title="A Website That Gets You Found"
          description="Clean, fast, mobile-friendly websites optimised for local Google searches — so customers in your area find you when they need you most."
        />
        <ServiceSummaryCard
          title="Google Business Profile Setup"
          description="Get your business showing up on Google Maps and local search results quickly — one of the highest-impact things any small business can do online."
        />
        <ServiceSummaryCard
          title="Hosting & Domain — All Managed For You"
          description="We handle your domain registration and hosting so you don't have to. One less thing to worry about, fully managed by us."
        />
      </div>
    </Section>
  )
}
