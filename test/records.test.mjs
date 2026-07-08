import { test } from 'node:test';
import assert from 'node:assert/strict';
import { generateAboutParagraph, getValidBestatter, invalidationReasons, getProfileForMunicipal } from '../src/lib/records.js';
import { municipalFuneralServices } from '../src/data/municipal-funeral-services.js';

const FIRST_PERSON = /\b(wir|uns|unser\w*)\b/i;

test('generateAboutParagraph never uses first-person pronouns', () => {
  const valid = getValidBestatter();
  assert.ok(valid.length > 0, 'expected at least one valid record to test against');
  for (const b of valid) {
    const paragraph = generateAboutParagraph(b, 'Testbundesland');
    assert.equal(
      FIRST_PERSON.test(paragraph),
      false,
      `first-person pronoun found in generated paragraph for "${b.id}": ${paragraph}`
    );
  }
});

test('generateAboutParagraph appends the kommunale sentence for type staedtisch (third person)', () => {
  const rec = { name: 'Städtische Bestattung Test', city: 'Teststadt', slug: 'test', services: [], type: 'staedtisch' };
  const paragraph = generateAboutParagraph(rec, 'Testbundesland');
  assert.match(paragraph, /Städtische Bestattung Test ist die kommunale Bestattung der Stadt Teststadt\.$/);
  assert.equal(FIRST_PERSON.test(paragraph), false, `first-person pronoun leaked: ${paragraph}`);
});

test('generateAboutParagraph does not append the kommunale sentence for non-staedtisch records', () => {
  const rec = { name: 'Bestattung Privat', city: 'Teststadt', slug: 'privat', services: [] };
  const paragraph = generateAboutParagraph(rec, 'Testbundesland');
  assert.equal(/kommunale Bestattung der Stadt/.test(paragraph), false);
});

test('every municipal service resolves to a published profile page', () => {
  for (const s of municipalFuneralServices) {
    const profile = getProfileForMunicipal(s);
    assert.ok(profile && profile.slug, `no profile resolved for municipal service "${s.id}" (${s.name})`);
  }
});

test('generateAboutParagraph only interpolates fields present on the record', () => {
  const minimal = { name: 'Bestattung Test', city: 'Teststadt', slug: 'test', services: [] };
  const paragraph = generateAboutParagraph(minimal, null);
  assert.match(paragraph, /^Bestattung Test ist ein Bestattungsunternehmen in Teststadt\.$/);
});

test('invalidationReasons flags a record with a placeholder street', () => {
  const bad = { name: 'Bestattung X', city: 'Y', slug: 'y', plz: '1010', phone: '+43 1 2345678', street: 'Placeholder' };
  assert.ok(invalidationReasons(bad).includes('placeholder-value:street'));
});

test('invalidationReasons flags the city-equals-slug bug', () => {
  const bad = { name: 'Bestattung Kessler', city: 'Kessler', slug: 'kessler', plz: '3663', phone: '+43 2769 8343', street: 'Hauptstraße 1' };
  assert.ok(invalidationReasons(bad).includes('city-equals-slug-or-name'));
});

// Regression tests for the fake-phone heuristic, added after researching real
// business listings for previously-suppressed records (furtner, phoenix).
test('fake-phone heuristic: all-zero local numbers still fail (confirmed placeholder pattern)', () => {
  const stigler = { name: 'X', city: 'Steyr', slug: 'x', plz: '4400', street: 'S', phone: '+43 2742 00000' };
  const taucher = { name: 'X', city: 'Wien', slug: 'x', plz: '1100', street: 'S', phone: '+43 1 00000' };
  assert.ok(invalidationReasons(stigler).includes('fake-phone'));
  assert.ok(invalidationReasons(taucher).includes('fake-phone'));
});

test('fake-phone heuristic: real numbers ending in a round extension now pass (verified against live listings)', () => {
  const furtner = { name: 'X', city: 'Wien', slug: 'x', plz: '1210', street: 'S', phone: '+43 1 5860000' };
  const phoenix = { name: 'X', city: 'Wien', slug: 'x', plz: '1030', street: 'S', phone: '+43 660 9030000' };
  assert.equal(invalidationReasons(furtner).includes('fake-phone'), false);
  assert.equal(invalidationReasons(phoenix).includes('fake-phone'), false);
});

test('fake-phone heuristic: 14-digit real number passes (klosterwald, verified via live site)', () => {
  const klosterwald = { name: 'X', city: 'Wien', slug: 'x', plz: '1050', street: 'S', phone: '+43 2243 23660660' };
  assert.equal(invalidationReasons(klosterwald).includes('fake-phone'), false);
});
