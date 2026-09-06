'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface NavLink {
  label: string
  href: string
}

/**
 * The five primary navigation destinations for the desktop header. Note that
 * "Portfolio" routes to `/work` to match the app's route structure — kept in
 * sync with the same list in `MobileMenu`.
 */
const NAV_LINKS: readonly NavLink[] = [
  { label: 'Home', href: '/' },
  { label: 'Services', href: '/services' },
  { label: 'About', href: '/about' },
  { label: 'Portfolio', href: '/work' },
  { label: 'Contact', href: '/contact' },
]

const focusRing =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber focus-visible:ring-offset-2 focus-visible:ring-offset-navy'

/**
 * DesktopNav — the horizontal primary nav for the `lg`-and-up header.
 *
 * This is a Client Component solely so it can read the current route via
 * `usePathname()` and mark the active link with `aria-current="page"`.
 * `usePathname` requires a Client Component, so the active-link concern is
 * isolated here, keeping the parent `Header` a Server Component.
 *
 * Hidden below the `lg` breakpoint (the `MobileMenu` handles small screens).
 */
export default function DesktopNav() {
  const pathname = usePathname()

  return (
    <nav aria-label="Primary" className="hidden lg:flex lg:items-center lg:gap-8">
      {NAV_LINKS.map(({ label, href }) => {
        const isActive = pathname === href
        return (
          <Link
            key={href}
            href={href}
            aria-current={isActive ? 'page' : undefined}
            className={`rounded-btn font-semibold transition-colors hover:text-amber ${
              isActive ? 'text-amber' : 'text-white'
            } ${focusRing}`}
          >
            {label}
          </Link>
        )
      })}
    </nav>
  )
}
