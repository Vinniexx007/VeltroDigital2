import Image from 'next/image'

type LogoSize = 'sm' | 'md' | 'lg'

interface LogoProps {
  /** Rendered size of the wordmark. Defaults to `md`. */
  size?: LogoSize
  /** Additional classes merged onto the `<Image>` element. */
  className?: string
  /**
   * Preload the wordmark by inserting a `<link>` in the document head. Set this
   * for above-the-fold instances (e.g. the Header) so the logo starts loading
   * before it is discovered in the body. Defaults to `true` for the `lg` size.
   *
   * Note: `next/image` deprecated the `priority` prop in Next.js 16 in favour of
   * `preload`; this prop maps onto `preload`.
   */
  preload?: boolean
}

/**
 * Dimensions for the wordmark at each size. The Veltro Digital wordmark is
 * roughly 4:1 (width:height), so widths are derived to preserve that ratio and
 * are passed explicitly to `next/image` to reserve layout space and avoid
 * Cumulative Layout Shift.
 */
const LOGO_DIMENSIONS: Record<LogoSize, { width: number; height: number }> = {
  sm: { width: 112, height: 28 },
  md: { width: 160, height: 40 },
  lg: { width: 224, height: 56 },
}

const LOGO_SRC = '/logo/veltro-digital-logo-option3.svg'

/**
 * Renders the Veltro Digital SVG wordmark. Server Component.
 *
 * The source is an SVG served from the `public/` directory. `next/image`
 * serves local `.svg` sources as-is (Image Optimization does not apply to
 * vector formats); `unoptimized` is set explicitly to make that behaviour
 * clear and stable. Explicit `width`/`height` reserve space to prevent layout
 * shift while the asset loads.
 */
export default function Logo({ size = 'md', className, preload }: LogoProps) {
  const { width, height } = LOGO_DIMENSIONS[size]

  const imageClasses = ['h-auto w-auto', className].filter(Boolean).join(' ')

  // Default preload behaviour preserves the original intent (largest size is
  // preloaded) while letting above-the-fold callers opt in explicitly.
  const shouldPreload = preload ?? size === 'lg'

  return (
    <Image
      src={LOGO_SRC}
      alt="Veltro Digital"
      width={width}
      height={height}
      className={imageClasses}
      unoptimized
      preload={shouldPreload}
    />
  )
}
