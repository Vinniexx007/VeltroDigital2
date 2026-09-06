interface TrustSignal {
  /** The trust signal text shown alongside the checkmark. */
  label: string
}

/**
 * The four trust signals shown in the bar, in display order.
 * Each is prefixed at render time with an amber checkmark.
 */
const TRUST_SIGNALS: readonly TrustSignal[] = [
  { label: 'Built for small businesses' },
  { label: 'North West based' },
  { label: 'Live in 2 weeks' },
  { label: 'From just £99' },
]

/**
 * TrustBar — a compact band of four trust signals shown directly beneath
 * the hero on the Home page.
 *
 * Server Component (no interactivity). Renders against the Electric Blue
 * brand background with bold white signals. Each signal is prefixed with
 * an amber checkmark that is hidden from assistive technology, since the
 * checkmark is decorative and the signal text carries the meaning.
 *
 * Layout: two rows of two on mobile (`grid-cols-2`) collapsing to a single
 * row of four from the `lg` breakpoint up (`lg:grid-cols-4`).
 */
export default function TrustBar() {
  return (
    <section className="bg-blue text-white">
      <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <ul className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {TRUST_SIGNALS.map((signal) => (
            <li
              key={signal.label}
              className="flex items-center gap-2 justify-center font-semibold text-white"
            >
              <span className="text-amber" aria-hidden="true">
                ✓
              </span>
              {signal.label}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
