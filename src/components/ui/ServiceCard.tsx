import CTAButton from '@/components/ui/CTAButton'
import type { ServiceCardData } from '@/types'

export type ServiceCardProps = ServiceCardData

/**
 * ServiceCard — full-detail service card for the Services page.
 *
 * Server Component (no interactivity). Renders the service name, price,
 * description, an "includes" checklist, and a primary CTA pinned to the
 * bottom of the card so cards in a row align regardless of content length.
 */
export default function ServiceCard({
  name,
  price,
  description,
  includes,
  ctaLabel,
  ctaHref,
}: ServiceCardProps) {
  return (
    <div className="bg-white rounded-card shadow-card hover:shadow-card-hover transition-shadow p-6 lg:p-8 flex flex-col h-full">
      <h3 className="text-h3 font-bold text-navy">{name}</h3>
      <p className="text-h4 font-semibold text-blue mt-2">{price}</p>
      <p className="text-body text-navy/80 mt-4">{description}</p>

      <ul className="mt-6 space-y-2">
        {includes.map((item) => (
          <li key={item} className="flex items-start gap-2 text-body text-navy/80">
            <span aria-hidden="true" className="text-amber font-bold shrink-0">
              ✓
            </span>
            <span>{item}</span>
          </li>
        ))}
      </ul>

      <div className="mt-auto pt-6">
        <CTAButton label={ctaLabel} href={ctaHref} variant="primary" fullWidth />
      </div>
    </div>
  )
}
