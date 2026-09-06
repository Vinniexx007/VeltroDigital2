import Link from 'next/link'
import Logo from '@/components/layout/Logo'

/** Primary navigation links shown in the footer "Explore" column. */
const NAV_LINKS: { label: string; href: string }[] = [
  { label: 'Home', href: '/' },
  { label: 'Services', href: '/services' },
  { label: 'About', href: '/about' },
  { label: 'Portfolio', href: '/work' },
  { label: 'Contact', href: '/contact' },
]

/** Social profiles. Each opens in a new tab with a descriptive accessible name. */
const SOCIAL_LINKS: { label: string; href: string; ariaLabel: string; icon: React.ReactNode }[] = [
  {
    label: 'Facebook',
    href: 'https://facebook.com/veltrodigital',
    ariaLabel: 'Veltro Digital on Facebook',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="h-5 w-5">
        <path d="M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06c0 5 3.66 9.15 8.44 9.94v-7.03H7.9v-2.9h2.54V9.85c0-2.51 1.49-3.9 3.78-3.9 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.78-1.63 1.57v1.88h2.78l-.44 2.9h-2.34V22c4.78-.79 8.44-4.94 8.44-9.94Z" />
      </svg>
    ),
  },
  {
    label: 'Instagram',
    href: 'https://instagram.com/veltrodigital',
    ariaLabel: 'Veltro Digital on Instagram',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="h-5 w-5">
        <path d="M12 2c2.72 0 3.06.01 4.12.06 1.07.05 1.8.22 2.43.47.66.25 1.22.6 1.77 1.15.55.55.9 1.11 1.15 1.77.25.63.42 1.36.47 2.43.05 1.06.06 1.4.06 4.12s-.01 3.06-.06 4.12c-.05 1.07-.22 1.8-.47 2.43a4.9 4.9 0 0 1-1.15 1.77c-.55.55-1.11.9-1.77 1.15-.63.25-1.36.42-2.43.47-1.06.05-1.4.06-4.12.06s-3.06-.01-4.12-.06c-1.07-.05-1.8-.22-2.43-.47a4.9 4.9 0 0 1-1.77-1.15 4.9 4.9 0 0 1-1.15-1.77c-.25-.63-.42-1.36-.47-2.43C2.01 15.06 2 14.72 2 12s.01-3.06.06-4.12c.05-1.07.22-1.8.47-2.43.25-.66.6-1.22 1.15-1.77.55-.55 1.11-.9 1.77-1.15.63-.25 1.36-.42 2.43-.47C8.94 2.01 9.28 2 12 2Zm0 1.8c-2.67 0-2.99.01-4.04.06-.98.04-1.5.21-1.86.35-.47.18-.8.4-1.15.75-.35.35-.57.68-.75 1.15-.14.36-.31.88-.35 1.86-.05 1.05-.06 1.37-.06 4.04s.01 2.99.06 4.04c.04.98.21 1.5.35 1.86.18.47.4.8.75 1.15.35.35.68.57 1.15.75.36.14.88.31 1.86.35 1.05.05 1.37.06 4.04.06s2.99-.01 4.04-.06c.98-.04 1.5-.21 1.86-.35.47-.18.8-.4 1.15-.75.35-.35.57-.68.75-1.15.14-.36.31-.88.35-1.86.05-1.05.06-1.37.06-4.04s-.01-2.99-.06-4.04c-.04-.98-.21-1.5-.35-1.86a3.1 3.1 0 0 0-.75-1.15 3.1 3.1 0 0 0-1.15-.75c-.36-.14-.88-.31-1.86-.35-1.05-.05-1.37-.06-4.04-.06Zm0 3.06a5.14 5.14 0 1 1 0 10.28 5.14 5.14 0 0 1 0-10.28Zm0 1.8a3.34 3.34 0 1 0 0 6.68 3.34 3.34 0 0 0 0-6.68Zm5.34-3.21a1.2 1.2 0 1 1 0 2.4 1.2 1.2 0 0 1 0-2.4Z" />
      </svg>
    ),
  },
  {
    label: 'X',
    href: 'https://x.com/veltrodigital',
    ariaLabel: 'Veltro Digital on X',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="h-5 w-5">
        <path d="M18.24 2.25h3.31l-7.23 8.26 8.5 11.24h-6.66l-5.22-6.82-5.97 6.82H1.66l7.73-8.83L1.25 2.25h6.83l4.71 6.23 5.45-6.23Zm-1.16 17.52h1.83L7.01 4.13H5.05l12.03 15.64Z" />
      </svg>
    ),
  },
  {
    label: 'WhatsApp',
    href: 'https://wa.me/447424158513',
    ariaLabel: 'Message Veltro Digital on WhatsApp',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="h-5 w-5">
        <path d="M12.04 2c-5.46 0-9.9 4.44-9.9 9.9 0 1.75.46 3.45 1.32 4.95L2 22l5.28-1.38a9.86 9.86 0 0 0 4.76 1.21h.01c5.46 0 9.9-4.44 9.9-9.9 0-2.64-1.03-5.13-2.9-7A9.82 9.82 0 0 0 12.04 2Zm0 1.8a8.08 8.08 0 0 1 5.74 2.37 8.06 8.06 0 0 1 2.37 5.73c0 4.48-3.64 8.11-8.12 8.11a8.1 8.1 0 0 1-4.13-1.13l-.3-.18-3.13.82.84-3.05-.2-.31a8.05 8.05 0 0 1-1.24-4.3c0-4.48 3.64-8.11 8.12-8.11Zm-4.66 4.4c-.22 0-.58.08-.88.41-.3.33-1.15 1.13-1.15 2.75s1.18 3.19 1.34 3.41c.16.22 2.32 3.54 5.63 4.96.79.34 1.4.54 1.88.7.79.25 1.51.21 2.08.13.63-.09 1.95-.8 2.23-1.57.27-.77.27-1.43.19-1.57-.08-.13-.3-.21-.63-.38-.33-.16-1.95-.96-2.25-1.07-.3-.11-.52-.16-.74.17-.22.33-.85 1.07-1.04 1.29-.19.22-.38.25-.71.08-.33-.17-1.39-.51-2.65-1.63-.98-.87-1.64-1.95-1.83-2.28-.19-.33-.02-.5.14-.67.15-.15.33-.38.5-.58.16-.19.22-.33.33-.55.11-.22.06-.41-.03-.58-.08-.16-.74-1.79-1.01-2.45-.27-.64-.54-.55-.74-.56h-.63Z" />
      </svg>
    ),
  },
]

/** Business opening hours displayed in the "Get in Touch" column. */
const BUSINESS_HOURS: string[] = [
  'Mon–Fri: 8am–7pm',
  'Sat: 9am–1pm',
  'Sun: Closed',
]

/**
 * Site footer. Server Component.
 *
 * Renders four responsive columns (brand, navigation, contact, social) over a
 * navy background, plus a bottom bar with the current-year copyright notice.
 */
export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-navy text-white">
      <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Column 1 — Brand */}
          <div>
            <Logo size="md" />
            <p className="mt-4 text-grey">We Build • We Innovate • We Grow</p>
          </div>

          {/* Column 2 — Navigation */}
          <nav aria-label="Footer">
            <h2 className="text-white font-semibold">Explore</h2>
            <ul className="mt-4 space-y-2">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-grey hover:text-amber focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Column 3 — Contact */}
          <div>
            <h2 className="text-white font-semibold">Get in Touch</h2>
            <ul className="mt-4 space-y-2">
              <li>
                <a
                  href="tel:+447424158513"
                  className="text-grey hover:text-amber focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber"
                >
                  +44 7424 158513
                </a>
              </li>
              <li>
                <a
                  href="mailto:hello@veltrodigital.co.uk"
                  className="text-grey hover:text-amber focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber"
                >
                  hello@veltrodigital.co.uk
                </a>
              </li>
            </ul>
            <div className="mt-4 space-y-1 text-grey">
              {BUSINESS_HOURS.map((line) => (
                <p key={line}>{line}</p>
              ))}
            </div>
          </div>

          {/* Column 4 — Social */}
          <div>
            <h2 className="text-white font-semibold">Follow Us</h2>
            <ul className="mt-4 flex gap-4">
              {SOCIAL_LINKS.map((social) => (
                <li key={social.label}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.ariaLabel}
                    className="inline-flex text-grey hover:text-amber focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber"
                  >
                    {social.icon}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 mt-8 pt-6">
          <p className="text-grey">
            © {currentYear} Veltro Digital. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
