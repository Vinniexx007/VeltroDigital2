export interface AudienceCardProps {
  title: string
  description: string
}

/**
 * AudienceCard — describes a business segment Veltro Digital serves.
 *
 * Server Component (no interactivity). Used on the Home page "Who We Help"
 * section and the About page "Who We Work With" section.
 */
export default function AudienceCard({ title, description }: AudienceCardProps) {
  return (
    <div className="bg-white rounded-card shadow-card hover:shadow-card-hover transition-shadow p-6">
      <h3 className="text-h4 font-bold text-navy">{title}</h3>
      <p className="text-body text-navy/80 mt-3">{description}</p>
    </div>
  )
}
