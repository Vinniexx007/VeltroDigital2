import Section from '@/components/layout/Section'
import ProcessStep from '@/components/ui/ProcessStep'

/**
 * HowItWorksSection — Home page "How It Works" band (Section 4).
 *
 * Server Component (no interactivity). Presents the four-step journey from
 * first contact to a live website as numbered {@link ProcessStep} cards.
 * Copy is taken verbatim from `veltro-digital-homepage-copy-v2.md` Section 4.
 *
 * Note: distinct from the six-step `<ProcessSection>` used on the Services page.
 */
export default function HowItWorksSection() {
  return (
    <Section background="grey">
      <h2 className="text-h2 font-bold text-navy">
        Getting Online Has Never Been Simpler
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
        <ProcessStep
          stepNumber={1}
          title="Chat"
          description="Tell us about your business and what you want. No tech knowledge needed — just a quick, friendly conversation."
        />
        <ProcessStep
          stepNumber={2}
          title="We Sort the Tech"
          description="We handle domain registration, hosting, and all the technical setup. You don't need to lift a finger."
        />
        <ProcessStep
          stepNumber={3}
          title="We Build"
          description="We design and build your website — handling everything from layout to copy to photos."
        />
        <ProcessStep
          stepNumber={4}
          title="Go Live & Get Found"
          description="Your new website goes live and starts working for you immediately. We walk you through everything before we hand over."
        />
      </div>
    </Section>
  )
}
