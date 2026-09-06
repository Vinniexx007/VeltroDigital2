import Section from '@/components/layout/Section'
import StatBlock from '@/components/ui/StatBlock'

/**
 * ByTheNumbers — About page trust-signals band ("By the Numbers").
 *
 * Server Component (no interactivity). Presents four headline statistics as
 * {@link StatBlock} components. Copy is taken from
 * `veltro-digital-about-copy-v4.md` (Trust Signals Section).
 *
 * Layout note: the section background is navy, but StatBlock renders its label
 * in `text-navy/80`, which would be unreadable on navy. The stats are therefore
 * placed on a white rounded card strip so both the blue value and the navy
 * label stay legible while the surrounding section keeps its navy background.
 */
export default function ByTheNumbers() {
  return (
    <Section background="navy">
      <h2 className="text-h2 font-bold text-white">By the Numbers</h2>

      <div className="bg-white rounded-card p-8 mt-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          <StatBlock
            // TODO: update with real values
            value="[X]"
            label="websites delivered for small businesses across the North West"
          />
          <StatBlock
            // TODO: update with real values
            value="2 weeks"
            label="average turnaround from brief to live"
          />
          <StatBlock
            // TODO: update with real values
            value="£499"
            label="flat rate for a new website — no hidden costs, ever"
          />
          <StatBlock
            // TODO: update with real values
            value="North West"
            label="based and focused — always local"
          />
        </div>
      </div>
    </Section>
  )
}
