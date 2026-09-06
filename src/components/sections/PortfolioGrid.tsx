import Section from '@/components/layout/Section'
import ProjectCard from '@/components/ui/ProjectCard'
import { PORTFOLIO_PROJECTS } from '@/lib/content/portfolio'

/**
 * PortfolioGrid — Work page project grid (Section 13).
 *
 * Server Component (no interactivity). Renders every project from
 * `PORTFOLIO_PROJECTS` as a `<ProjectCard>`. When every project is still a
 * placeholder, a friendly "coming soon" intro is shown above the grid so the
 * page is never empty (Requirement 13.3).
 */
export default function PortfolioGrid() {
  const allPlaceholders = PORTFOLIO_PROJECTS.every(
    (project) => project.placeholder === true,
  )

  return (
    <Section background="white">
      {allPlaceholders && (
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-h3 font-bold text-navy">
            Our portfolio is coming soon
          </h2>
          <p className="text-body text-navy/80 mt-2">
            We&apos;re building this space to showcase real projects for real
            North West businesses. Check back soon — or get in touch to be one
            of the first.
          </p>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        {PORTFOLIO_PROJECTS.map((project, index) => (
          <ProjectCard key={`${project.clientName}-${index}`} {...project} />
        ))}
      </div>
    </Section>
  )
}
