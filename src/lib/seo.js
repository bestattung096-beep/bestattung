import { socialLinks } from '../data/socialLinks.js';

const BASE_URL = 'https://bestattungs.at';

export function absoluteUrl(path = '/') {
  return path.startsWith('http') ? path : `${BASE_URL}${path}`;
}

export function organizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${BASE_URL}/#organization`,
    name: 'bestattungs.at',
    url: BASE_URL,
    description: 'Verzeichnis fuer Bestattungsunternehmen in Oesterreich.',
    sameAs: socialLinks.map(profile => profile.href),
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer support',
      url: `${BASE_URL}/impressum`,
      availableLanguage: ['de-AT', 'de'],
    },
  };
}

export function websiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${BASE_URL}/#website`,
    name: 'bestattungs.at',
    url: BASE_URL,
    description: 'Bestattungsunternehmen in Oesterreich finden',
    publisher: { '@id': `${BASE_URL}/#organization` },
    potentialAction: {
      '@type': 'SearchAction',
      target: `${BASE_URL}/suche?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
    inLanguage: 'de-AT',
  };
}

export function breadcrumbSchema(items) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.href),
    })),
  };
}

export function localBusinessSchema(b, { bundeslandName, path, mapsUrl } = {}) {
  const url = absoluteUrl(path);
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    additionalType: 'http://www.productontology.org/id/Funeral_home',
    name: b.name,
    description: b.description,
    telephone: b.phone,
    ...(b.email ? { email: b.email } : {}),
    ...(mapsUrl ? { hasMap: mapsUrl } : {}),
    address: {
      '@type': 'PostalAddress',
      streetAddress: b.street,
      postalCode: b.plz,
      addressLocality: b.city,
      ...(bundeslandName ? { addressRegion: bundeslandName } : {}),
      addressCountry: 'AT',
    },
    ...(b.locations ? { areaServed: b.locations.map(l => l.city) } : {}),
    url: b.website ? (b.website.startsWith('http') ? b.website : `https://${b.website}`) : url,
  };
}

/** Lightweight reference for ItemList entries — name + profile URL only. */
export function localBusinessReference(b) {
  return {
    '@type': 'LocalBusiness',
    name: b.name,
    url: absoluteUrl(`/bestattung/${b.slug}`),
  };
}

export function faqSchema(items) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map(item => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };
}

export function articleSchema({ title, description, path, dateModified = '2026-05-26' }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description,
    mainEntityOfPage: absoluteUrl(path),
    dateModified,
    datePublished: dateModified,
    inLanguage: 'de-AT',
    author: { '@type': 'Organization', name: 'bestattungs.at' },
    publisher: { '@id': `${BASE_URL}/#organization` },
  };
}
