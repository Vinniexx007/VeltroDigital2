export type ServiceOption =
  | 'A brand new website'
  | 'A refresh of my existing website'
  | 'Google Business Profile setup'
  | 'The Small Business Bundle (website + Google profile)'
  | 'Domain & Hosting management'
  | 'Monthly Care Plan'
  | 'Not sure yet — just want some advice'

export type BusinessType = 'restaurant' | 'print-shop' | 'retail' | 'other'

export interface EnquiryPayload {
  name: string
  businessName: string
  businessType: string
  phone: string
  email: string
  website?: string
  service: string
  message?: string
}

export interface EnquiryResult {
  success: boolean
  error?: string
}

export interface ContactFormState {
  name: string
  businessName: string
  businessType: BusinessType | ''
  phone: string
  email: string
  website: string
  service: ServiceOption | ''
  message: string
  honeypot: string
}

export type FormStatus = 'idle' | 'submitting' | 'success' | 'error'
