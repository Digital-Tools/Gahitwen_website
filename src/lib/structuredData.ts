const SITE_URL = 'https://gahitwen.com';

export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'The Gahitwen LLC',
  url: SITE_URL,
  logo: `${SITE_URL}/favicon.svg`,
  description:
    'The Gahitwen LLC delivers innovative tech solutions, from custom software and cloud engineering to cybersecurity services.',
  email: 'info@gahitwen.com',
  telephone: '+1-302-607-5297',
  sameAs: ['https://www.linkedin.com/in/gahitwen/'],
  address: {
    '@type': 'PostalAddress',
    streetAddress: '131 Continental Dr Ste 305',
    addressLocality: 'Newark',
    addressRegion: 'DE',
    postalCode: '19713',
    addressCountry: 'US',
  },
};

type ServiceInput = {
  title: string;
  description: string;
};

export const buildServicesSchema = (services: ServiceInput[]) => ({
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  itemListElement: services.map((service, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    item: {
      '@type': 'Service',
      name: service.title,
      description: service.description,
      provider: {
        '@type': 'Organization',
        name: 'The Gahitwen LLC',
        url: SITE_URL,
      },
    },
  })),
});
