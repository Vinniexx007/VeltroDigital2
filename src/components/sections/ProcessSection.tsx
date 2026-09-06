import Section from '@/components/layout/Section'
import ProcessStep from '@/components/ui/ProcessStep'

/**
 * ProcessSection — Services page "How It Works" band (six-step variant).
 *
 * Server Component (no interactivity). Presents the full six-step journey from
 * a free quote through to getting customers as numbered {@link ProcessStep}
 * cards. Copy is taken verbatim from `veltro-digital-services-copy-v6.md`
 * Process Section.
 *
 * Note: distinct from the four-step `<HowItWorksSection>` used on the Home page.
 */
export default function ProcessSection() {
  return (
    <Section background="grey">
      <h2 className="text-h2 font-bold text-navy">How It Works</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        <ProcessStep
          stepNumber={1}
          title="Free Quote"
          description="A quick, no-obligation call to understand your business and what you need. No jargon, no hard sell."
        />
        <ProcessStep
          stepNumber={2}
          title="Domain & Hosting Sorted"
          description="We register your domain in your name and set up hosting — fully managed by us from day one."
        />
        <ProcessStep
          stepNumber={3}
          title="We Get to Work"
          description="We handle all the design, content, and technical build. You just send some photos and answer a few simple questions."
        />
        <ProcessStep
          stepNumber={4}
          title="You Review It"
          description="Before anything goes live, you see the finished result and request any changes. We want you to love it."
        />
        <ProcessStep
          stepNumber={5}
          title="Go Live"
          description="Your site launches. We walk you through everything and answer any questions."
        />
        <ProcessStep
          stepNumber={6}
          title="Start Getting Customers"
          description="Your digital presence is now working for you around the clock."
        />
      </div>
    </Section>
  )
}
