import { bestatter } from '../data/bestatter.js';
import { cities } from '../data/cities.js';

const REQUIRED_FIELDS = ['name', 'street', 'plz', 'city', 'phone'];
const PLACEHOLDER_FIELDS = ['name', 'street', 'city', 'plz', 'phone', 'email', 'website', 'description'];

function isBlank(value) {
  return value === undefined || value === null || String(value).trim() === '';
}

function containsPlaceholder(value) {
  return typeof value === 'string' && /placeholder/i.test(value);
}

function digitsOnly(phone) {
  return String(phone || '').replace(/\D/g, '');
}

function isFakePhone(phone) {
  if (isBlank(phone)) return false; // caught by required-field check separately
  const trimmed = String(phone).trim();
  const digits = digitsOnly(trimmed);
  // 5+ trailing zeros catches genuinely fake placeholders (e.g. the all-zero
  // local number "+43 2742 00000"), while real numbers that merely end in a
  // round extension (e.g. "...5860000", "...9030000") only have 4 trailing
  // zeros and correctly pass — verified against real business listings.
  if (/0{5,}$/.test(digits)) return true;
  if (!/^(\+43|0)/.test(trimmed)) return true;
  if (digits.length < 7 || digits.length > 14) return true;
  return false;
}

function normalize(value) {
  return String(value || '').trim().toLowerCase();
}

/**
 * Returns an array of reason strings; empty array means the record is valid.
 */
export function invalidationReasons(b) {
  const reasons = [];

  for (const field of REQUIRED_FIELDS) {
    if (isBlank(b[field])) reasons.push(`missing-required-field:${field}`);
  }

  for (const field of PLACEHOLDER_FIELDS) {
    if (containsPlaceholder(b[field])) reasons.push(`placeholder-value:${field}`);
  }

  if (!isBlank(b.phone) && isFakePhone(b.phone)) {
    reasons.push('fake-phone');
  }

  if (!isBlank(b.city) && (normalize(b.city) === normalize(b.slug) || normalize(b.city) === normalize(b.name))) {
    reasons.push('city-equals-slug-or-name');
  }

  return reasons;
}

export function isValidBestatter(b) {
  return invalidationReasons(b).length === 0;
}

let cachedValid = null;
export function getValidBestatter() {
  if (!cachedValid) cachedValid = bestatter.filter(isValidBestatter);
  return cachedValid;
}

let cachedInvalid = null;
export function getInvalidBestatter() {
  if (!cachedInvalid) {
    cachedInvalid = bestatter
      .map(b => ({ record: b, reasons: invalidationReasons(b) }))
      .filter(x => x.reasons.length > 0);
  }
  return cachedInvalid;
}

export function getBestatterBySlug(slug) {
  return getValidBestatter().find(b => b.slug === slug);
}

function normKey(value) {
  return normalize(value).normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9]/g, '');
}

let cachedMunicipalIndex = null;
function municipalIndex() {
  if (!cachedMunicipalIndex) {
    const byName = new Map();
    const byPhone = new Map();
    for (const b of getValidBestatter()) {
      byName.set(normKey(b.name), b);
      byPhone.set(digitsOnly(b.phone), b);
    }
    cachedMunicipalIndex = { byName, byPhone };
  }
  return cachedMunicipalIndex;
}

/**
 * Resolve a municipal-funeral-service entry to its published profile record
 * (a valid bestatter). Municipal entities may live under a differently-named
 * slug (e.g. an existing private-style import), so match by name then phone.
 */
export function getProfileForMunicipal(service) {
  const { byName, byPhone } = municipalIndex();
  return byName.get(normKey(service.name)) || byPhone.get(digitsOnly(service.phone)) || null;
}

function matchesCity(b, citySlug) {
  if (b.citySlug === citySlug) return true;
  if (Array.isArray(b.locations)) {
    return b.locations.some(l => normalize(l.city).replace(/[^a-z0-9]+/g, '-') === citySlug);
  }
  return false;
}

export function getValidBestatterForCity(citySlug) {
  return getValidBestatter().filter(b => matchesCity(b, citySlug));
}

export function countValidForCity(citySlug) {
  return getValidBestatterForCity(citySlug).length;
}

export function hasValidListingForCity(citySlug) {
  return countValidForCity(citySlug) > 0;
}

export function getValidBestatterForBundesland(bundeslandSlug) {
  return getValidBestatter().filter(b => b.bundesland === bundeslandSlug);
}

export function getCitiesWithValidListings(bundeslandSlug) {
  return cities.filter(c => c.bundesland === bundeslandSlug && hasValidListingForCity(c.slug));
}

export function getTopCitiesByValidListings(limit = 15) {
  return cities
    .map(c => ({ city: c, count: countValidForCity(c.slug) }))
    .filter(x => x.count > 0)
    .sort((a, b) => b.count - a.count)
    .slice(0, limit);
}

const GENERIC_EMAIL_DOMAINS = new Set([
  'gmail.com', 'gmx.at', 'gmx.de', 'gmx.net', 'aon.at', 'hotmail.com', 'hotmail.de',
  'outlook.com', 'outlook.at', 'yahoo.com', 'yahoo.de', 'a1.net', 'chello.at', 'live.com', 'icloud.com',
]);

export function inferWebsite(b) {
  if (b.website) return b.website;
  if (!b.email || !b.email.includes('@')) return null;
  const domain = b.email.split('@')[1]?.toLowerCase().trim();
  if (!domain || GENERIC_EMAIL_DOMAINS.has(domain)) return null;
  return domain;
}

function servicesList(services) {
  if (!Array.isArray(services) || services.length === 0) return '';
  if (services.length === 1) return services[0];
  return `${services.slice(0, -1).join(', ')} und ${services[services.length - 1]}`;
}

/**
 * Third-person profile description generator (no first-person pronouns).
 * Only interpolates fields that exist on the record.
 */
export function generateAboutParagraph(b, bundeslandName) {
  const secondLocation = Array.isArray(b.locations) && b.locations.length > 1 ? b.locations[1] : null;

  let sentence = `${b.name} ist ein Bestattungsunternehmen in ${b.city}`;
  if (bundeslandName) sentence += ` (${bundeslandName})`;
  if (secondLocation?.city) sentence += `, mit weiterem Standort in ${secondLocation.city}`;
  sentence += '.';

  const services = servicesList(b.services);
  if (services) {
    sentence += ` Das Unternehmen unterstützt Angehörige bei ${services}`;
    if (b.phone) sentence += ` und ist unter ${b.phone} erreichbar.`;
    else sentence += '.';
  } else if (b.phone) {
    sentence += ` Das Unternehmen ist unter ${b.phone} erreichbar.`;
  }

  // Städtische (municipal) undertakers get an extra third-person sentence
  // clarifying their communal status. Kept free of first-person pronouns.
  if (b.type === 'staedtisch') {
    sentence += ` ${b.name} ist die kommunale Bestattung der Stadt ${b.city}.`;
  }

  return sentence;
}
