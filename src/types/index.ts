export interface ServiceCardData {
  name: string
  price: string
  description: string
  includes: string[]
  ctaLabel: string
  ctaHref: string
}

export interface TestimonialData {
  quote: string
  authorName: string
  authorDescription: string
}

export interface ProjectCardData {
  clientName: string
  businessType: string
  description: string
  imageUrl: string
  imageAlt: string
  placeholder?: boolean
}

export interface ProcessStepData {
  stepNumber: number
  title: string
  description: string
}

export interface FAQItemData {
  question: string
  answer: string
}

export interface AudienceSegmentData {
  title: string
  description: string
}

export interface ValueCardData {
  title: string
  description: string
}

export interface StatBlockData {
  value: string
  label: string
}

export interface PricingSummaryRow {
  service: string
  price: string
  payment: string
}
