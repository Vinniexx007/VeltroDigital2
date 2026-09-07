export interface PageHeaderProps {
  /** Main page heading, rendered as the page's single H1. */
  heading: string
  /** Optional small label rendered above the heading (e.g. brand tagline). */
  tagline?: string
  /** Optional supporting sentence rendered below the heading. */
  subheadline?: string
}

/**
 * PageHeader — shared hero band for the top of interior pages
 * (Services, About, Work, Contact).
 *
 * Server Component (no interactivity). Uses a subtle navy → navy-light
 * gradient with an amber top accent so the band separates visually from the
 * solid navy header directly above it, instead of blending into it. This
 * mirrors the Home page hero for a consistent look across the site. The
 * tagline appears as an amber label above the heading, and the optional
 * subheadline sits below in muted grey. All colours are brand tokens.
 */
export default function PageHeader({
  heading,
  tagline,
  subheadline,
}: PageHeaderProps) {
  return (
    <section className="border-t-4 border-amber bg-gradient-to-b from-navy to-navy-light text-white">
      <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        {tagline ? (
          <p className="text-amber font-semibold tracking-wide">{tagline}</p>
        ) : null}
        <h1 className="text-h1-mobile md:text-h1 font-extrabold text-white">
          {heading}
        </h1>
        {subheadline ? (
          <p className="text-body-lg text-grey mt-4 max-w-prose">
            {subheadline}
          </p>
        ) : null}
      </div>
    </section>
  )
}
