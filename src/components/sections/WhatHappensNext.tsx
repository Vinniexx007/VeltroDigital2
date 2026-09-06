import Section from '@/components/layout/Section'

/** The four steps that follow an enquiry, from the contact copy document. */
const STEPS: { title: string; description: string }[] = [
  {
    title: 'We get back to you within 24 hours',
    description:
      'Usually much sooner. We\u2019ll confirm receipt and suggest a time for a quick call if useful.',
  },
  {
    title: 'A free 15-minute chat',
    description:
      'We\u2019ll ask a few simple questions about your business, what you do, and what you\u2019re hoping to achieve. No jargon, no pressure.',
  },
  {
    title: 'You get a clear quote',
    description:
      'A straightforward quote with exactly what\u2019s included, what it costs, and how long it\u2019ll take \u2014 all confirmed before anything is agreed.',
  },
  {
    title: 'You decide',
    description:
      'No chasing, no pressure. If you\u2019re happy, we get started. If you need more time, that\u2019s absolutely fine.',
  },
]

/**
 * WhatHappensNext — "What Happens After You Get in Touch?" section.
 *
 * Server Component. Renders the four post-enquiry steps as numbered step cards
 * over the light grey section background.
 */
export default function WhatHappensNext() {
  return (
    <Section background="grey">
      <h2 className="text-h2 font-bold text-navy">
        What Happens After You Get in Touch?
      </h2>
      <ol className="mt-8 grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {STEPS.map((step, index) => (
          <li
            key={step.title}
            className="bg-white rounded-card shadow-card p-6"
          >
            <span
              className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-blue text-white text-h4 font-bold"
              aria-hidden="true"
            >
              {index + 1}
            </span>
            <h3 className="text-h4 font-semibold text-navy mt-4">
              {step.title}
            </h3>
            <p className="text-body text-navy-light mt-2">{step.description}</p>
          </li>
        ))}
      </ol>
    </Section>
  )
}
