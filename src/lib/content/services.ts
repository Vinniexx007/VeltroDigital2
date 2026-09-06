import type { ServiceCardData, PricingSummaryRow } from '@/types'

export const SERVICES: ServiceCardData[] = [
  {
    name: 'New Website',
    price: '£499 one-off',
    description: 'Professional, mobile-first website for your small business.',
    includes: [
      'Professional responsive design',
      'Mobile-first layout',
      'Clear calls-to-action',
      'SEO-ready headings & metadata',
      'Contact route and trust content',
      'Delivered in approximately 2 weeks',
      '30 days free aftercare',
    ],
    ctaLabel: 'Get Your Free Quote',
    ctaHref: '/contact?service=new-website',
  },
  {
    name: 'Website Refresh',
    price: 'From £250 one-off',
    description: 'Improve what you already have.',
    includes: [
      'Full review of your existing site',
      'Design and content improvements',
      'Mobile usability fixes',
      'Clearer customer journeys and CTAs',
      'SEO foundations refreshed',
    ],
    ctaLabel: 'Discuss a Refresh',
    ctaHref: '/contact?service=refresh',
  },
  {
    name: 'Google Business Profile Setup',
    price: '£99 one-off',
    description: 'Get found in Google Search and Maps.',
    includes: [
      'Full profile setup and optimisation',
      'Core business details organised clearly',
      'Search and Maps visibility foundations',
      'Practical handover guidance',
    ],
    ctaLabel: 'Set Up My Profile',
    ctaHref: '/contact?service=google',
  },
  {
    name: 'Domain & Hosting',
    price: '£25/month fully managed',
    description: 'Your domain and hosting — all handled for you.',
    includes: [
      'Domain name registered in your name',
      'Reliable business hosting',
      'Full DNS setup',
      'Annual renewals managed',
      'Security monitoring',
      'Technical support',
    ],
    ctaLabel: 'Manage the Tech for Me',
    ctaHref: '/contact?service=hosting',
  },
  {
    name: 'Website Care Plan',
    price: '£29/month',
    description: 'Keep your website in good shape.',
    includes: [
      'Ongoing website care',
      'Routine content updates',
      'Maintenance and support',
      'Dedicated point of contact',
    ],
    ctaLabel: 'Ask About Care',
    ctaHref: '/contact?service=care',
  },
  {
    name: 'Small Business Bundle',
    price: '£548 one-off (saving £50)',
    description: 'Website + Google profile — everything to get found online.',
    includes: [
      'Everything in the New Website package',
      'Google Business Profile setup',
      'Joined-up online presence',
      'One simple project from setup to launch',
    ],
    ctaLabel: 'Choose the Bundle',
    ctaHref: '/contact?service=bundle',
  },
]

export const PRICING_SUMMARY: PricingSummaryRow[] = [
  { service: 'New Website', price: '£499', payment: 'One-off' },
  { service: 'Website Refresh', price: 'From £250', payment: 'One-off' },
  { service: 'Google Business Profile Setup', price: '£99', payment: 'One-off' },
  { service: 'Small Business Bundle', price: '£548 — save £50', payment: 'One-off' },
  { service: 'Domain & Hosting', price: '£25/month', payment: 'Monthly' },
  { service: 'Website Care Plan', price: '£29/month', payment: 'Monthly' },
  { service: 'Ad-hoc updates', price: '£40/hour', payment: 'As needed' },
]
