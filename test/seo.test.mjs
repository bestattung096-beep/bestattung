import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  organizationSchema,
  websiteSchema,
  breadcrumbSchema,
  faqSchema,
  articleSchema,
  localBusinessSchema,
  localBusinessReference,
} from '../src/lib/seo.js';
import { getValidBestatter } from '../src/lib/records.js';

function assertValidJsonLd(schema, label) {
  const json = JSON.stringify(schema);
  assert.ok(json, `${label} should serialize to a non-empty string`);
  const parsed = JSON.parse(json);
  assert.equal(parsed['@context'] ?? schema['@context'] ?? 'https://schema.org', 'https://schema.org');
}

test('organizationSchema and websiteSchema round-trip through JSON', () => {
  assertValidJsonLd(organizationSchema(), 'organizationSchema');
  assertValidJsonLd(websiteSchema(), 'websiteSchema');
});

test('breadcrumbSchema produces valid BreadcrumbList JSON-LD', () => {
  const schema = breadcrumbSchema([
    { name: 'Startseite', href: '/' },
    { name: 'Bundesländer', href: '/bundesland' },
  ]);
  assertValidJsonLd(schema, 'breadcrumbSchema');
  assert.equal(schema['@type'], 'BreadcrumbList');
  assert.equal(schema.itemListElement.length, 2);
  assert.equal(schema.itemListElement[0].position, 1);
});

test('faqSchema produces valid FAQPage JSON-LD', () => {
  const schema = faqSchema([{ question: 'Q?', answer: 'A.' }]);
  assertValidJsonLd(schema, 'faqSchema');
  assert.equal(schema['@type'], 'FAQPage');
  assert.equal(schema.mainEntity[0].acceptedAnswer.text, 'A.');
});

test('articleSchema produces valid Article JSON-LD', () => {
  const schema = articleSchema({ title: 'T', description: 'D', path: '/ratgeber/kosten' });
  assertValidJsonLd(schema, 'articleSchema');
  assert.equal(schema['@type'], 'Article');
});

test('localBusinessSchema uses LocalBusiness (schema.org has no FuneralHome type), not FuneralHome', () => {
  const [sample] = getValidBestatter();
  const schema = localBusinessSchema(sample, { bundeslandName: 'Niederösterreich', path: `/bestattung/${sample.slug}` });
  assertValidJsonLd(schema, 'localBusinessSchema');
  assert.equal(schema['@type'], 'LocalBusiness');
  assert.equal(schema.additionalType, 'http://www.productontology.org/id/Funeral_home');
  assert.equal(schema.address['@type'], 'PostalAddress');
  assert.equal(schema.address.addressCountry, 'AT');
});

test('localBusinessSchema url prefers the company website over the profile url when present', () => {
  const withWebsite = { name: 'X', description: '', phone: '+43 1 2345678', street: 'S', plz: '1010', city: 'Wien', website: 'www.example.at' };
  const schema = localBusinessSchema(withWebsite, { path: '/bestattung/x' });
  assert.equal(schema.url, 'https://www.example.at');
});

test('localBusinessReference is a lightweight name+url pointer', () => {
  const ref = localBusinessReference({ name: 'Bestattung Test', slug: 'test' });
  assertValidJsonLd(ref, 'localBusinessReference');
  assert.deepEqual(Object.keys(ref).sort(), ['@type', 'name', 'url']);
  assert.equal(ref.url, 'https://bestattungs.at/bestattung/test');
});
