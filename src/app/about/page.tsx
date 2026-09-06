import type { Metadata } from 'next'

import PageHeader from '@/components/sections/PageHeader'
import StorySection from '@/components/sections/StorySection'
import WhoWeWorkWith from '@/components/sections/WhoWeWorkWith'
import BrandValues from '@/components/sections/BrandValues'
import ByTheNumbers from '@/components/sections/ByTheNumbers'
import StraightTalkingPromise from '@/components/sections/StraightTalkingPromise'
import AboutCTASection from '@/components/sections/AboutCTASection'
import { PAGE_METADATA } from '@/lib/seo/metadata'

export const metadata: Metadata = {
  title: { absolute: PAGE_METADATA.about.title },
  description: PAGE_METADATA.about.description,
  alternates: {
    canonical: '/about',
  },
  openGraph: {
    title: PAGE_METADATA.about.title,
    description: PAGE_METADATA.about.description,
    url: '/about',
    images: [
      {
        url: '/images/og/about.png',
        width: 1200,
        height: 630,
      },
    ],
  },
}

export default function AboutPage() {
  return (
    <>
      <PageHeader
        heading="About Veltro Digital"
        tagline="We Build • We Innovate • We Grow"
        subheadline="A North West digital service built for the small businesses that make our communities worth living in."
      />
      <StorySection />
      <WhoWeWorkWith />
      <BrandValues />
      <ByTheNumbers />
      <StraightTalkingPromise />
      <AboutCTASection />
    </>
  )
}
