export interface ValueCardProps {
  title: string
  description: string
}

/**
 * ValueCard — a single brand value with an explanatory paragraph.
 *
 * Server Component (no interactivity). Used on the About page brand values
 * ("What We Believe") section.
 */
export default function ValueCard({ title, description }: ValueCardProps) {
  return (
    <div className="bg-white rounded-card shadow-card p-6">
      <h3 className="text-h4 font-bold text-navy">{title}</h3>
      <p className="text-body text-navy/80 mt-3">{description}</p>
    </div>
  )
}
