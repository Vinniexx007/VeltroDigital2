import type { Metadata } from 'next'

import HeroSection from '@/components/sections/HeroSection'
import TrustBar from '@/components/sections/TrustBar'
import ProblemSection from '@/components/sections/ProblemSection'
import WhoWeHelpSection from '@/components/sections/WhoWeHelpSection'
import WhatWeDoSection from '@/components/sections/WhatWeDoSection'
import HowItWorksSection from '@/components/sections/HowItWorksSection'
import TestimonialsSection from '@/components/sections/TestimonialsSection'
import PricingSnapshot from '@/components/sections/PricingSnapshot'
import AboutCloser from '@/components/sections/AboutCloser'
import FinalCTASection from '@/components/sections/FinalCTASection'
import { PAGE_METADATA } from '@/lib/seo/metadata'
import { generateLocalBusinessSchema } from '@/lib/seo/structured-data'

export const metadata: Metadata = {
  title: PAGE_METADATA.home.title,
  description: PAGE_METADATA.home.description,
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: PAGE_METADATA.home.title,
    description: PAGE_METADATA.home.description,
    url: '/',
    images: [
      {
        url: '/images/og/home.png',
        width: 1200,
        height: 630,
      },
    ],
  },
}

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateLocalBusinessSchema()),
        }}
      />
      <HeroSection />
      <TrustBar />
      <ProblemSection />
      <WhoWeHelpSection />
      <WhatWeDoSection />
      <HowItWorksSection />
      <TestimonialsSection />
      <PricingSnapshot />
      <AboutCloser />
      <FinalCTASection />
    </>
  )
}
