// Last-updated dates sourced from git history (`git log -1 --format=%ad -- <file>`)
// for each ratgeber article — not invented.
export const guides = {
  'was-tun-im-todesfall': { lastUpdated: '2026-05-26' },
  'bestattungsarten': { lastUpdated: '2026-05-26' },
  'kosten': { lastUpdated: '2026-05-26' },
  'vorsorge': { lastUpdated: '2026-05-26' },
  'bestattung-sarg': { lastUpdated: '2026-05-26' },
  'staedtische-bestattung': { lastUpdated: '2026-06-11' },
};

export function formatGuideDate(isoDate) {
  return new Date(isoDate).toLocaleDateString('de-AT', { day: 'numeric', month: 'long', year: 'numeric' });
}
