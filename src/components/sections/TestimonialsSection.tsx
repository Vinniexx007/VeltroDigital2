import Section from '@/components/layout/Section'
import TestimonialBlock from '@/components/ui/TestimonialBlock'
import { TESTIMONIALS } from '@/lib/content/testimonials'

/**
 * TestimonialsSection — social proof section presenting client testimonials on
 * a navy background. Server Component (no interactivity). Renders a heading and
 * a responsive grid of {@link TestimonialBlock} cards sourced from
 * {@link TESTIMONIALS}.
 */
export default function TestimonialsSection() {
  return (
    <Section background="navy">
      <h2 className="text-h2 font-bold text-white">What Our Clients Say</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        {TESTIMONIALS.map((testimonial) => (
          <TestimonialBlock
            key={testimonial.authorName}
            quote={testimonial.quote}
            authorName={testimonial.authorName}
            authorDescription={testimonial.authorDescription}
          />
        ))}
      </div>
    </Section>
  )
}
