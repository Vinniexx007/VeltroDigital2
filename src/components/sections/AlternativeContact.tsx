/** Social profiles — URLs reused from the site footer. */
const SOCIAL_LINKS: { label: string; href: string; ariaLabel: string }[] = [
  {
    label: 'Facebook',
    href: 'https://facebook.com/veltrodigital',
    ariaLabel: 'Veltro Digital on Facebook',
  },
  {
    label: 'Instagram',
    href: 'https://instagram.com/veltrodigital',
    ariaLabel: 'Veltro Digital on Instagram',
  },
  {
    label: 'X (Twitter)',
    href: 'https://x.com/veltrodigital',
    ariaLabel: 'Veltro Digital on X',
  },
  {
    label: 'WhatsApp',
    href: 'https://wa.me/447424158513',
    ariaLabel: 'Message Veltro Digital on WhatsApp',
  },
]

/** Business opening hours — matches the site footer. */
const BUSINESS_HOURS: string[] = [
  'Monday – Friday: 8am – 7pm',
  'Saturday: 9am – 1pm',
  'Sunday: Closed',
]

/**
 * AlternativeContact — "Prefer to Talk Directly?" panel.
 *
 * Server Component. Deliberately NOT wrapped in its own <Section>: the Contact
 * page places it in the right-hand column of a two-column grid alongside the
 * contact form, so it renders as a plain heading + content block.
 */
export default function AlternativeContact() {
  return (
    <div>
      <h2 className="text-h2 font-bold text-navy">Prefer to Talk Directly?</h2>
      <p className="text-body text-navy-light mt-4 max-w-prose">
        Sometimes it&rsquo;s just easier to pick up the phone or drop a WhatsApp.
        We&rsquo;re happy to chat &mdash; reach out on any of the channels below.
      </p>

      <dl className="mt-8 space-y-6">
        <div>
          <dt className="text-h4 font-semibold text-navy">Phone / WhatsApp</dt>
          <dd className="mt-1 space-y-1">
            <a
              href="tel:+447424158513"
              className="text-blue-dark hover:text-blue focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber"
            >
              +44 7424 158513
            </a>
            <p>
              <a
                href="https://wa.me/447424158513"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-dark hover:text-blue focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber"
              >
                Message us on WhatsApp
              </a>
            </p>
          </dd>
        </div>

        <div>
          <dt className="text-h4 font-semibold text-navy">Email</dt>
          <dd className="mt-1">
            <a
              href="mailto:hello@veltrodigital.co.uk"
              className="text-blue-dark hover:text-blue focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber"
            >
              hello@veltrodigital.co.uk
            </a>
          </dd>
        </div>

        <div>
          <dt className="text-h4 font-semibold text-navy">Follow Us</dt>
          <dd className="mt-2">
            <ul className="flex flex-wrap gap-x-6 gap-y-2">
              {SOCIAL_LINKS.map((social) => (
                <li key={social.label}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.ariaLabel}
                    className="text-blue-dark hover:text-blue focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber"
                  >
                    {social.label}
                  </a>
                </li>
              ))}
            </ul>
          </dd>
        </div>

        <div>
          <dt className="text-h4 font-semibold text-navy">Hours</dt>
          <dd className="mt-1 space-y-1 text-navy-light">
            {BUSINESS_HOURS.map((line) => (
              <p key={line}>{line}</p>
            ))}
            <p className="text-sm text-navy-light/80 italic">
              (We know small business owners keep long hours &mdash; so do we)
            </p>
          </dd>
        </div>
      </dl>
    </div>
  )
}
