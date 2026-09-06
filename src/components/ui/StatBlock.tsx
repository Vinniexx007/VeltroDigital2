export interface StatBlockProps {
  value: string
  label: string
}

/**
 * StatBlock — a single headline statistic with a supporting label.
 *
 * Server Component (no interactivity). Used on the About page "By the Numbers"
 * section. Renders a large Electric Blue value above a smaller navy label,
 * centre-aligned.
 */
export default function StatBlock({ value, label }: StatBlockProps) {
  return (
    <div className="text-center">
      <p className="text-h2 lg:text-h1 font-extrabold text-blue">{value}</p>
      <p className="text-body text-navy/80 mt-2">{label}</p>
    </div>
  )
}
