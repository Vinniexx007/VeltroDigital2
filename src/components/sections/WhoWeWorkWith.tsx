import Section from '@/components/layout/Section'
import AudienceCard from '@/components/ui/AudienceCard'

/**
 * WhoWeWorkWith — About page "Who We Work With" band.
 *
 * Server Component (no interactivity). Presents the three primary business
 * segments Veltro Digital serves. Copy is taken verbatim from
 * `veltro-digital-about-copy-v4.md` ("Who We Work With" section).
 */
export default function WhoWeWorkWith() {
  return (
    <Section background="grey">
      <h2 className="text-h2 font-bold text-navy">Who We Work With</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        <AudienceCard
          title="Restaurants, Cafés & Takeaways"
          description="Your food deserves to be found. We build websites that showcase your menu, reflect your atmosphere, and make it easy for customers to book, order, or simply find their way to your door."
        />
        <AudienceCard
          title="Print Shops & Creative Businesses"
          description="Your work speaks for itself — your website should too. We build clean, professional sites that show off your portfolio and make it easy for new clients to get in touch."
        />
        <AudienceCard
          title="Local Service Businesses"
          description="Whether you're a retailer, consultant, or specialist of any kind — if you serve the local community, we'll help the local community find you."
        />
      </div>
    </Section>
  )
}
