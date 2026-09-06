import type { TestimonialData } from '@/types'

export type TestimonialProps = TestimonialData

/**
 * TestimonialBlock — client testimonial quote card.
 *
 * Server Component (no interactivity). Designed to sit on a navy section, so
 * text is light. Renders a large decorative opening quotation mark in amber,
 * the quote in italic light text, the author name in bold, and the author
 * description in muted grey.
 */
export default function TestimonialBlock({
  quote,
  authorName,
  authorDescription,
}: TestimonialProps) {
  return (
    <figure className="bg-white/5 rounded-card p-6 lg:p-8">
      <span aria-hidden="true" className="block text-amber text-4xl font-bold leading-none">
        &#x201C;
      </span>
      <blockquote className="text-body-lg text-white italic mt-2">{quote}</blockquote>
      <figcaption className="mt-4">
        <span className="block text-white font-bold">{authorName}</span>
        <span className="block text-grey text-sm">{authorDescription}</span>
      </figcaption>
    </figure>
  )
}
