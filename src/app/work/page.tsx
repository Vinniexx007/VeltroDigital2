import type { Metadata } from 'next'
import PageHeader from '@/components/sections/PageHeader'
import PortfolioGrid from '@/components/sections/PortfolioGrid'
import PortfolioCTASection from '@/components/sections/PortfolioCTASection'
import { PAGE_METADATA } from '@/lib/seo/metadata'

export const metadata: Metadata = {
  title: { absolute: PAGE_METADATA.work.title },
  description: PAGE_METADATA.work.description,
  alternates: {
    canonical: '/work',
  },
  openGraph: {
    title: PAGE_METADATA.work.title,
    description: PAGE_METADATA.work.description,
    url: '/work',
    images: [
      {
        url: '/images/og/work.png',
        width: 1200,
        height: 630,
      },
    ],
  },
}

export default function WorkPage() {
  return (
    <>
      <PageHeader
        heading="Our Work"
        tagline="We Build • We Innovate • We Grow"
        subheadline="A look at the websites we've built for small businesses across the North West."
      />
      <PortfolioGrid />
      <PortfolioCTASection />
    </>
  )
}
