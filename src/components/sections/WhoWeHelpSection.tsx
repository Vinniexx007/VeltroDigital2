import Section from '@/components/layout/Section'
import AudienceCard from '@/components/ui/AudienceCard'

/**
 * WhoWeHelpSection — Home page "Who We Help" band (Section 2).
 *
 * Server Component (no interactivity). Presents the three primary business
 * segments Veltro Digital serves. Copy is taken verbatim from
 * `veltro-digital-homepage-copy-v2.md` Section 2.
 */
export default function WhoWeHelpSection() {
  return (
    <Section background="white">
      <h2 className="text-h2 font-bold text-navy">
        Built for the Businesses That Keep the North West Running
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        <AudienceCard
          title="Restaurants, Cafés & Takeaways"
          description="Showcase your menu, take bookings, and make a great first impression before customers even walk through the door."
        />
        <AudienceCard
          title="Print Shops & Creative Businesses"
          description="Show off your work, make it easy for clients to get in touch, and build the kind of professional presence your quality deserves."
        />
        <AudienceCard
          title="Local Service Businesses"
          description="Whether you're a retailer, consultant, or specialist — a professional website builds trust and turns browsers into buyers."
        />
      </div>
    </Section>
  )
}
