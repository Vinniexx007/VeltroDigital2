export interface ServiceSummaryCardProps {
  title: string
  description: string
}

/**
 * ServiceSummaryCard — compact service card for the Home page
 * "What We Do" section.
 *
 * Server Component (no interactivity). Renders a title and short description.
 */
export default function ServiceSummaryCard({
  title,
  description,
}: ServiceSummaryCardProps) {
  return (
    <div className="bg-white rounded-card shadow-card hover:shadow-card-hover transition-shadow p-6">
      <h3 className="text-h4 font-bold text-navy">{title}</h3>
      <p className="text-body text-navy/80 mt-3">{description}</p>
    </div>
  )
}
