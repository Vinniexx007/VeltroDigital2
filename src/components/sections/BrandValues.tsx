import Section from '@/components/layout/Section'
import ValueCard from '@/components/ui/ValueCard'

/**
 * BrandValues — About page "What We Believe" band.
 *
 * Server Component (no interactivity). Presents the six brand values. Copy is
 * taken verbatim from `veltro-digital-about-copy-v4.md` ("What We Believe"
 * section).
 */
export default function BrandValues() {
  return (
    <Section background="white">
      <h2 className="text-h2 font-bold text-navy">What We Believe</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        <ValueCard
          title="We Build"
          description="Every website we create is built from the ground up around your business — your services, your customers, your goals. Nothing generic, nothing templated."
        />
        <ValueCard
          title="We Innovate"
          description="We use the latest tools and techniques to make sure your website performs — fast loading, mobile optimised, built for local search. We stay ahead so you don't have to."
        />
        <ValueCard
          title="We Grow"
          description="Our job isn't done at launch. From Google Business Profiles to monthly care plans, we're here to help your digital presence grow alongside your business."
        />
        <ValueCard
          title="Honesty always"
          description="We'll tell you what you actually need — not what earns us the most money. If a Google Business Profile is all you need right now, we'll tell you that."
        />
        <ValueCard
          title="You own everything"
          description="Your domain is registered in your name. Your website is yours outright once built and paid for. We manage the technical side — but control always stays with you."
        />
        <ValueCard
          title="Local is important"
          description="We're based in the North West and we care about the businesses here. We're not an overseas agency or a faceless platform — we're local people who want to see local businesses succeed."
        />
      </div>
    </Section>
  )
}
