import { bundeslaender } from '@/data/bundeslaender';
import { bestatter } from '@/data/bestatter';
import { cities } from '@/data/cities';

const BASE_URL = 'https://bestattungs.at';
const LAST_MODIFIED = '2026-05-26';

export default function sitemap() {
  const staticPages = [
    { url: BASE_URL, lastModified: LAST_MODIFIED, changeFrequency: 'weekly', priority: 1.0 },
    { url: `${BASE_URL}/bundesland`, lastModified: LAST_MODIFIED, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${BASE_URL}/bestattung`, lastModified: LAST_MODIFIED, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${BASE_URL}/suche`, lastModified: LAST_MODIFIED, changeFrequency: 'weekly', priority: 0.7 },
    { url: `${BASE_URL}/ratgeber`, lastModified: LAST_MODIFIED, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/ratgeber/was-tun-im-todesfall`, lastModified: LAST_MODIFIED, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE_URL}/ratgeber/bestattungsarten`, lastModified: LAST_MODIFIED, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE_URL}/ratgeber/kosten`, lastModified: LAST_MODIFIED, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE_URL}/ratgeber/vorsorge`, lastModified: LAST_MODIFIED, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE_URL}/ratgeber/bestattung-sarg`, lastModified: LAST_MODIFIED, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE_URL}/ratgeber/staedtische-bestattung`, lastModified: LAST_MODIFIED, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE_URL}/staedtische-bestattung`, lastModified: LAST_MODIFIED, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${BASE_URL}/impressum`, lastModified: LAST_MODIFIED, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${BASE_URL}/datenschutz`, lastModified: LAST_MODIFIED, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${BASE_URL}/privacy-policy`, lastModified: LAST_MODIFIED, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${BASE_URL}/disclaimer`, lastModified: LAST_MODIFIED, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${BASE_URL}/agb`, lastModified: LAST_MODIFIED, changeFrequency: 'yearly', priority: 0.3 },
  ];

  const bundeslandPages = bundeslaender.map(bl => ({
    url: `${BASE_URL}/bundesland/${bl.slug}`,
    lastModified: LAST_MODIFIED,
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  const cityPages = cities.map(c => ({
    url: `${BASE_URL}/bundesland/${c.bundesland}/${c.slug}`,
    lastModified: LAST_MODIFIED,
    changeFrequency: 'weekly',
    priority: 0.7,
  }));

  const bestatterPages = bestatter.map(b => ({
    url: `${BASE_URL}/bestattung/${b.slug}`,
    lastModified: LAST_MODIFIED,
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  return [...staticPages, ...bundeslandPages, ...cityPages, ...bestatterPages];
}
