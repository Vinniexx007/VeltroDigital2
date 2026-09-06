import CTAButton from '@/components/ui/CTAButton'

/**
 * not-found.tsx — custom 404 page.
 *
 * Server Component. Next.js renders this file for unmatched routes across the
 * whole app (root `app/not-found`) as well as for any `notFound()` calls. The
 * root layout already wraps this content in the brand Header and Footer, so
 * this component only provides the centred 404 body against the navy brand
 * background, keeping the UX consistent on unmatched routes.
 */
export default function NotFound() {
  return (
    <section className="bg-navy text-white min-h-[60vh] flex flex-col items-center justify-center text-center px-4 py-20">
      <p className="text-hero font-extrabold text-amber">404</p>
      <h1 className="text-h1-mobile md:text-h1 font-extrabold text-white mt-4">
        Page Not Found
      </h1>
      <p className="text-body-lg text-grey mt-4 max-w-prose">
        The page you&apos;re looking for may have moved, or it might never have
        existed. Let&apos;s get you back on track.
      </p>
      <div className="mt-8">
        <CTAButton label="Go Back Home" href="/" variant="primary" />
      </div>
    </section>
  )
}
