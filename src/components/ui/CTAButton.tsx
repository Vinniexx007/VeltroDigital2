import Link from 'next/link'

export interface CTAButtonProps {
  label: string
  href: string
  variant: 'primary' | 'secondary' | 'ghost'
  fullWidth?: boolean
  external?: boolean
  className?: string
}

const BASE_CLASSES =
  'inline-flex items-center justify-center min-h-[44px] py-3 px-6 rounded-btn font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber focus-visible:ring-offset-2'

const VARIANT_CLASSES: Record<CTAButtonProps['variant'], string> = {
  primary: 'bg-blue text-white hover:bg-blue-dark',
  secondary: 'bg-navy text-white hover:bg-navy-light',
  ghost: 'border-2 border-blue text-blue hover:bg-blue hover:text-white',
}

/**
 * CTAButton — brand call-to-action button.
 *
 * Renders a `next/link` <Link> for internal navigation, or a plain <a> with
 * safe external attributes when `external` is true. Guarantees a 44x44px
 * minimum tap target (Requirement 16.3) and carries a `data-cta` attribute
 * for Playwright tap-target queries.
 */
export default function CTAButton({
  label,
  href,
  variant,
  fullWidth = false,
  external = false,
  className,
}: CTAButtonProps) {
  // fullWidth forces w-full; otherwise the button stays inline (sized to content).
  const widthClass = fullWidth ? 'w-full' : ''

  const classes = [BASE_CLASSES, VARIANT_CLASSES[variant], widthClass, className]
    .filter(Boolean)
    .join(' ')

  if (external) {
    return (
      <a
        href={href}
        data-cta
        target="_blank"
        rel="noopener noreferrer"
        className={classes}
      >
        {label}
      </a>
    )
  }

  return (
    <Link href={href} data-cta className={classes}>
      {label}
    </Link>
  )
}
