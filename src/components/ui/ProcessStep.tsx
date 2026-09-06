export interface ProcessStepProps {
  stepNumber: number
  title: string
  description: string
}

/**
 * ProcessStep — a single numbered step in a "How It Works" / process flow.
 *
 * Server Component (no interactivity). Displays the step number prominently
 * in Electric Blue inside a circular badge, followed by title and description.
 */
export default function ProcessStep({
  stepNumber,
  title,
  description,
}: ProcessStepProps) {
  return (
    <div className="flex flex-col items-start">
      <span className="inline-flex h-16 w-16 items-center justify-center rounded-full border-2 border-blue text-h2 font-extrabold text-blue">
        {stepNumber}
      </span>
      <h3 className="text-h4 font-bold text-navy mt-4">{title}</h3>
      <p className="text-body text-navy/80 mt-3">{description}</p>
    </div>
  )
}
