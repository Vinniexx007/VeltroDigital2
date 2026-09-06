import type { ReactNode } from 'react'

type SectionBackground = 'white' | 'grey' | 'navy'

interface SectionProps {
  /** Background colour drawn from the brand palette. Defaults to `white`. */
  background?: SectionBackground
  /** Section content rendered inside the centred container. */
  children: ReactNode
  /** Optional DOM id, useful for in-page anchor navigation. */
  id?: string
  /** Additional classes merged onto the `<section>` element. */
  className?: string
}

const BACKGROUND_CLASSES: Record<SectionBackground, string> = {
  white: 'bg-white',
  grey: 'bg-grey',
  navy: 'bg-navy text-white',
}

/**
 * Shared section wrapper providing consistent vertical rhythm, a centred
 * max-width container, and brand background colours. Server Component.
 */
export default function Section({
  background = 'white',
  children,
  id,
  className,
}: SectionProps) {
  const sectionClasses = [
    'py-section-sm lg:py-section',
    BACKGROUND_CLASSES[background],
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <section id={id} className={sectionClasses}>
      <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
        {children}
      </div>
    </section>
  )
}
