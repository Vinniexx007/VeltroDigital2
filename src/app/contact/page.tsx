import type { Metadata } from 'next'
import PageHeader from '@/components/sections/PageHeader'
import Section from '@/components/layout/Section'
import { ContactForm } from '@/components/forms/ContactForm'
import AlternativeContact from '@/components/sections/AlternativeContact'
import WhatHappensNext from '@/components/sections/WhatHappensNext'
import NotReadyYet from '@/components/sections/NotReadyYet'
import { PAGE_METADATA } from '@/lib/seo/metadata'

export const metadata: Metadata = {
  title: { absolute: PAGE_METADATA.contact.title },
  description: PAGE_METADATA.contact.description,
  alternates: {
    canonical: '/contact',
  },
  openGraph: {
    title: PAGE_METADATA.contact.title,
    description: PAGE_METADATA.contact.description,
    url: '/contact',
    images: [{ url: '/images/og/contact.png', width: 1200, height: 630 }],
  },
}

export default function ContactPage() {
  return (
    <>
      <PageHeader
        heading="Get in Touch"
        tagline="We Build • We Innovate • We Grow"
        subheadline="Tell us about your business and what you need. Free, no-obligation quote — response within 24 hours."
      />

      <Section background="white">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <ContactForm />
          </div>
          <div>
            <AlternativeContact />
          </div>
        </div>
      </Section>

      <WhatHappensNext />

      <NotReadyYet />
    </>
  )
}
