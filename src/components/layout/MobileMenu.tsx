'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import CTAButton from '@/components/ui/CTAButton'
import Logo from '@/components/layout/Logo'

interface NavLink {
  label: string
  href: string
}

/**
 * The five primary navigation destinations. Note that "Portfolio" routes to
 * `/work` to match the app's route structure.
 */
const NAV_LINKS: readonly NavLink[] = [
  { label: 'Home', href: '/' },
  { label: 'Services', href: '/services' },
  { label: 'About', href: '/about' },
  { label: 'Portfolio', href: '/work' },
  { label: 'Contact', href: '/contact' },
]

const PANEL_ID = 'mobile-menu-panel'

/** Body class toggled while the menu is open to prevent background scroll. */
const NO_SCROLL_CLASS = 'overflow-hidden'

/**
 * Selector matching the interactive elements the focus trap cycles through.
 * Kept broad (links + buttons) so both nav links and the CTA are included.
 */
const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'

/**
 * MobileMenu — the below-`lg` navigation for the site header. Client Component.
 *
 * Renders a hamburger toggle and, when open, a full-screen `bg-navy` overlay
 * containing all primary nav links plus the primary CTA. Implements a keyboard
 * focus trap (Tab / Shift+Tab cycle within the panel), Escape-to-close (which
 * restores focus to the hamburger button), and a body-scroll lock while open.
 * The active route is marked with `aria-current="page"` via `usePathname()`.
 */
export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  const buttonRef = useRef<HTMLButtonElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)

  const closeMenu = useCallback(() => {
    setIsOpen(false)
    // Return focus to the trigger for keyboard/screen-reader continuity.
    buttonRef.current?.focus()
  }, [])

  const openMenu = useCallback(() => setIsOpen(true), [])

  // Close the menu on any route change. This covers the CTA button (which
  // navigates without an onClick) as well as any other navigation, ensuring
  // the overlay never lingers over a newly-loaded page. Focus is not forced
  // back to the trigger here since the destination page owns focus after nav.
  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  // Lock body scroll while the menu is open; always clean up on close/unmount.
  useEffect(() => {
    if (!isOpen) return

    const { body } = document
    body.classList.add(NO_SCROLL_CLASS)

    return () => {
      body.classList.remove(NO_SCROLL_CLASS)
    }
  }, [isOpen])

  // On open, move focus into the panel (first focusable element).
  useEffect(() => {
    if (!isOpen) return

    const panel = panelRef.current
    if (!panel) return

    const focusable = panel.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)
    focusable[0]?.focus()
  }, [isOpen])

  // Keyboard handling for the open panel: Escape closes, Tab is trapped.
  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        closeMenu()
        return
      }

      if (event.key !== 'Tab') return

      const panel = panelRef.current
      if (!panel) return

      const focusable = Array.from(
        panel.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR),
      ).filter((el) => el.offsetParent !== null || el === document.activeElement)

      if (focusable.length === 0) return

      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      const active = document.activeElement

      if (event.shiftKey) {
        // Shift+Tab off the first element wraps to the last.
        if (active === first || !panel.contains(active)) {
          event.preventDefault()
          last.focus()
        }
      } else {
        // Tab off the last element wraps to the first.
        if (active === last || !panel.contains(active)) {
          event.preventDefault()
          first.focus()
        }
      }
    },
    [closeMenu],
  )

  const focusRing =
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber focus-visible:ring-offset-2'

  return (
    <div className="lg:hidden">
      <button
        ref={buttonRef}
        type="button"
        onClick={isOpen ? closeMenu : openMenu}
        aria-expanded={isOpen}
        aria-controls={PANEL_ID}
        aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
        className={`inline-flex h-11 w-11 items-center justify-center rounded-btn text-white ${focusRing}`}
      >
        {isOpen ? (
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        ) : (
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        )}
      </button>

      {isOpen && (
        <div
          ref={panelRef}
          id={PANEL_ID}
          role="dialog"
          aria-modal="true"
          aria-label="Site navigation"
          onKeyDown={handleKeyDown}
          className="fixed inset-0 z-50 flex flex-col bg-navy px-6 py-4 text-white"
        >
          <div className="flex items-center justify-between">
            <Logo size="sm" />
            <button
              type="button"
              onClick={closeMenu}
              aria-label="Close navigation menu"
              className={`inline-flex h-11 w-11 items-center justify-center rounded-btn text-white ${focusRing}`}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>

          <nav
            aria-label="Primary"
            className="mt-8 flex flex-1 flex-col gap-2"
          >
            {NAV_LINKS.map(({ label, href }) => {
              const isActive = pathname === href
              return (
                <Link
                  key={href}
                  href={href}
                  onClick={closeMenu}
                  aria-current={isActive ? 'page' : undefined}
                  className={`rounded-btn px-2 py-3 text-h3 font-semibold transition-colors hover:text-amber ${
                    isActive ? 'text-amber' : 'text-white'
                  } ${focusRing}`}
                >
                  {label}
                </Link>
              )
            })}

            <div className="mt-6">
              <CTAButton
                label="Get Your Free Quote"
                href="/contact"
                variant="primary"
                fullWidth
              />
            </div>
          </nav>
        </div>
      )}
    </div>
  )
}
