export function generateLocalBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'Veltro Digital',
    url: 'https://www.veltrodigital.co.uk',
    telephone: '+447424158513',
    email: 'hello@veltrodigital.co.uk',
    address: {
      '@type': 'PostalAddress',
      addressRegion: 'North West England',
      addressCountry: 'GB',
    },
    areaServed: {
      '@type': 'GeoCircle',
      name: 'North West, United Kingdom',
    },
    description:
      'Professional websites and digital services for small businesses across the North West.',
    priceRange: '££',
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '08:00',
        closes: '19:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Saturday'],
        opens: '09:00',
        closes: '13:00',
      },
    ],
  }
}
