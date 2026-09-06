import Link from 'next/link'
import Logo from '@/components/layout/Logo'
import DesktopNav from '@/components/layout/DesktopNav'
import MobileMenu from '@/components/layout/MobileMenu'
import CTAButton from '@/components/ui/CTAButton'

/**
 * Header — the global site header. Server Component.
 *
 * Composes the brand logo (linking home), the desktop primary nav, the desktop
 * primary CTA, and the mobile menu. The active-link concern is delegated to
 * `DesktopNav` (a Client Component using `usePathname()`), which keeps this
 * component a Server Component. The `MobileMenu` and `DesktopNav` each own
 * their own responsive visibility (`lg:hidden` / `hidden lg:flex`), so no
 * breakpoint logic is duplicated here beyond the desktop-only CTA.
 */
export default function Header() {
  return (
    <header className="sticky top-0 z-40 bg-navy">
      <div className="mx-auto flex max-w-content items-center justify-between gap-8 px-4 py-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          aria-label="Veltro Digital home"
          className="inline-flex items-center rounded-btn focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber focus-visible:ring-offset-2 focus-visible:ring-offset-navy"
        >
          <Logo size="md" preload />
        </Link>

        <DesktopNav />

        <div className="hidden lg:block">
          <CTAButton
            label="Get Your Free Quote"
            href="/contact"
            variant="primary"
          />
        </div>

        <MobileMenu />
      </div>
    </header>
  )
}
