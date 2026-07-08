# SEO Audit Fixes — Changelog

Consolidated changelog for the 5-phase SEO audit remediation. See `scripts/reports/invalid-records.json` and `scripts/reports/duplicates.json` for the underlying data-quality findings.

## Phase 7 — Municipal (städtische) undertakers promoted to full profile pages

Turned the 43 structured entries behind `/staedtische-bestattung` into first-class `/bestattung/{slug}` profiles, integrated into the main dataset and all existing accessors.

**Files touched:** `src/data/bestatter.js` (40 new records + 3 tagged), `src/lib/records.js` (about-paragraph extension + `getProfileForMunicipal`), `src/app/staedtische-bestattung/page.js` (category page), `src/app/staedtische-bestattung/page.module.css`, `test/records.test.mjs` (3 new tests), `scripts/reports/municipal-incomplete.json` (new).

**Counts (out of 43 municipal services):**
- **40 created** as new `type: "staedtisch"` records in `bestatter.js`, slug = the service `id`.
- **3 skipped — already had a profile** (matched by identical name *and* phone to an existing record; not re-created, but tagged `type: "staedtisch"` so they render the kommunale copy): `BESTATTUNG WIEN GmbH` → existing `bestattung-wien`, `Bestattung der Stadt Wels GmbH` → `bestattung-wels`, `Bestattung Graz GmbH` → `bestattung-graz`.
- **0 incomplete** — every service had both street and phone, so `scripts/reports/municipal-incomplete.json` is an empty array. (The pipeline that writes it is in place for future incomplete records.)
- **0 slug collisions** with existing private undertakers — the service `id`s are all descriptively prefixed (`stadtwerke-…`, `stadtgemeinde-…`, `linz-ag-bestattung`, …) and none matched an existing slug, so the `{slug}-staedtisch` fallback was never triggered. (Logic is implemented and tested regardless.)

**Data model & accessors:**
- New records carry the full profile shape (`slug`, `citySlug`, `services`, `description`, `type: "staedtisch"`). `citySlug` maps to the `cities.js` slug where the city exists, else a slugified fallback. Default `services` = `["Erdbestattung","Feuerbestattung","Überführungen","Trauerfeier"]` (full-service municipal undertakers). All 40 pass `isValidBestatter` (verified before insert), so none are silently suppressed.
- **No accessor needed changing.** The new profiles flow automatically into `getValidBestatter` (profile pages + sitemap), `getValidBestatterForBundesland` (state pages), and `getValidBestatterForCity`/`hasValidListingForCity` (city pages + sitemap city list). 5 cities already in `cities.js` that previously had **zero** valid listings became indexable purely because a municipal record now matches them.
- `generateAboutParagraph` extended: for `type: "staedtisch"` it appends `"{Name} ist die kommunale Bestattung der Stadt {Stadt}."` — third person, and the existing no-`wir`/`uns`/`unser` test still passes.
- New `getProfileForMunicipal(service)` in `records.js` resolves a municipal service to its published profile by normalized-name then phone match — used by the category page so all 43 entries (both new and pre-existing) link to the correct slug without a hardcoded map.

**Category page (`/staedtische-bestattung`):** URL, title, intro copy and the existing `BreadcrumbList` schema are unchanged. Each of the 43 entries now links to its profile (linked name + a "Zum Profil →" link), and an `ItemList` of the 43 profile URLs was added to the page's JSON-LD.

**Verified:** lint clean; 17/17 tests pass (added: staedtisch about-paragraph appends the kommunale sentence & stays first-person-free; non-staedtisch records don't get it; all 43 municipal services resolve to a profile). Production build generates **376 profile pages** (336 → 376, +40). Curled all three requested municipal profiles from the built HTML — `linz-ag-bestattung` (new), `bestattung-graz`, `bestattung-wels`:
- Title format matches `… – {Stadt}, {Bundesland} | Adresse, Kontakt & Leistungen | bestattungs.at` (the `| bestattungs.at` suffix comes from the root layout's title template).
- Third-person copy present including the `… ist die kommunale Bestattung der Stadt {Stadt}.` sentence (the only `uns` on the page is the `id="ueber-uns"` anchor, not the generated text).
- `LocalBusiness` JSON-LD present.
- All three appear on their state page (`LINZ AG Bestattung` + `Bestattung der Stadt Wels GmbH` on `/bundesland/oberoesterreich`, `Bestattung Graz GmbH` on `/bundesland/steiermark`).
- Category page JSON-LD carries `ItemList` with `numberOfItems: 43`.

**New sitemap total: 427 URLs** (was 382): 376 profiles + 27 city pages (was 22, +5 newly-indexable) + 9 state pages + 15 static.

## Phase 6 — Suppressed-record corrections (post-audit follow-up)

Researched all 15 records suppressed in Phase 1 against their real websites/Google Business listings and applied verified corrections.

**Files touched:** `src/lib/records.js` (fake-phone heuristic), `test/records.test.mjs` (regression tests), `src/data/bestatter.js`, `next.config.mjs`, `scripts/records-report.mjs`.

- **Fake-phone heuristic fixed** (`src/lib/records.js`): the trailing-zeros check was `/0{4,}$/` with a 13-digit cap, which flagged real numbers like `+43 1 5860000` (Vienna landlines routinely end "-0000") as fake. Tightened to `/0{5,}$/` (the genuinely-fake numbers, e.g. `+43 2742 00000`, have the *entire* local number as zeros — 5+ — while real numbers only have a 4-zero extension tail) and raised the digit cap 13→14 (confirmed via `klosterwald`'s real, verified 14-digit number). Added 3 regression tests confirming the original all-zeros pattern still fails while the real numbers now pass.
- **9 records recovered** (real data confirmed via live site/Google Business research, sources in the corrections below): `furtner`, `phoenix`, `klosterwald` (heuristic false positives — data was already correct), `hanser` (phone had the postal code erroneously concatenated onto it), `pillinger` (real phone corrected), and **4 records that were recorded in an entirely wrong city/bundesland, not just missing a street**: `stigler` (was "St. Pölten/NÖ" → actually Steyr/OÖ), `priesching` (was "Innsbruck/Tirol" → actually Prinzersdorf/NÖ), `kessler` (city "Kessler" bug → actually Türnitz/NÖ, and the original PLZ was also wrong), `pax` (was "Linz/OÖ" → actually Wien-only business, no Linz location exists).
- **`reiterer`**: partially corrected (city/bundesland fixed to Pölfing-Brunn/Steiermark, confirmed via phone area code and business listings) but stays suppressed — no street address found anywhere online, and street is a required field.
- **`hoefler`**: removed from the dataset entirely. Genuinely a German (Heitersheim) business with a real, correctly-formatted `+49` number — not fake data, just out of scope for an Austria-only directory, and its `bundesland: "deutschland"` value didn't match any real state (would have broken breadcrumbs/routing if ever unsuppressed).
- **`eckl`, `taucher`, `herzog`**: left untouched, still suppressed. No reliable matching business found for any of the three (confirmed via herold.at that no "Bestattung Eckl" exists in Bregenz/Vorarlberg at all).
- **`woegenstein`**: verified correct as-is — "Bestattung Allentsteig" is the business's real public trade name (Wögenstein is the owner's surname, per the municipality's own site). No data change; removed from `scripts/records-report.mjs`'s manual-review flags.
- **`grossschaedl` / `grossschaedl-missing` merge**: confirmed via bestattung.grossschaedl.at and herold.at that the real business is "Bestattung Großschädl GmbH" at Stuhlsdorfer Straße 18 (the `grossschaedl-missing` record's data — `grossschaedl`'s own street field was a corrupted service-area description, not a real address). Kept canonical under the shorter slug `grossschaedl` (preserving its unique 5-branch `locations[]` array), deleted `grossschaedl-missing`, added a 301 (`statusCode: 301`) from its old slug `/bestattung/grossschaedl-gmbh` → `/bestattung/grossschaedl` in `next.config.mjs`, matching the `schoenbiechler` precedent.

**Before → after:** 344 total records (git baseline) → 341 (−1 `schoenbiechler` from Phase 1, −1 `hoefler` removed, −1 `grossschaedl-missing` merged). Suppressed: 15 → 5 (`eckl`, `herzog`, `luger`, `reiterer`, `taucher`). Manual-review flags: 2 → 0. Valid profile pages: 328 → 336. Sitemap: 373 → 382 URLs (also gained 1 newly-indexable city, Steyr, which had zero valid listings before `stigler` moved there).

**Verified:** lint clean; 14/14 unit tests pass (4 new regression tests for the phone heuristic); production build generates exactly 336 profile pages; live server checks confirm `furtner` (false-positive recovery, real phone renders, valid `LocalBusiness`/`BreadcrumbList`/`FAQPage` JSON-LD) and `stigler` (fully corrected data — Steyr/Oberösterreich address, phone, email — renders with valid schema); the new `grossschaedl-gmbh` → `grossschaedl` redirect is a literal single-hop 301 (confirmed alongside the original 3, all still working); `hoefler` 404s; sitemap serves exactly 382 URLs, matching an independent recomputation (15 static + 9 states + 22 valid cities + 336 valid profiles).

**Environment note:** mid-verification the host machine's C: drive hit 0 bytes free, which crashed the Next.js dev server (Turbopack cache write failures, unrelated to this code). I cleared the regenerable `.next` build cache (678MB) to free ~134MB and unblock verification — the disk is still essentially full machine-wide and worth your attention independently of this task.

## Phase 1 — Data integrity

**Files touched:** `src/lib/records.js` (new), `src/lib/package.json` (new), `src/data/package.json` (new), `scripts/records-report.mjs` (new), `scripts/find-duplicates.mjs` (new), `scripts/reports/invalid-records.json` (new), `scripts/reports/duplicates.json` (new), `src/data/bestatter.js`, `src/app/bestattung/[slug]/page.js`, `src/app/bundesland/[state]/[city]/page.js`, `src/app/bundesland/[state]/page.js`, `src/app/bestattung/page.js`, `src/app/bundesland/page.js`, `src/app/page.js`, `src/app/sitemap.js`.

- New `src/lib/records.js` validates every record (required fields, `placeholder` substring, fake-phone patterns, city-equals-slug/name bug) and exposes filtered accessors; every template/sitemap/index page now reads through it instead of the raw `bestatter` array.
- 15 records suppressed from rendering/sitemap (raw source data untouched): `stigler`, `taucher`, `eckl`, `pax`, `priesching`, `reiterer`, `pillinger` (placeholder/fake-phone), `herzog`, `luger` (missing street; `luger` also has the city-equals-slug bug like `kessler`), `kessler`, plus `furtner`, `hanser`, `hoefler`, `klosterwald`, `phoenix` (fake-phone rule triggered — `furtner` and `phoenix` in particular have otherwise-complete real-looking data, worth a manual look in `invalid-records.json`).
- `woegenstein` (name/id mismatch) and `kessler` (PLZ→city not derivable from anything in this repo) logged as manual-review flags rather than guessed.
- Duplicate `schoenbiechler` record removed, `schoenbichler` kept as canonical (301 redirect added in Phase 4). Ran the dedup script against the full dataset: 4 more candidates surfaced (`ahimmel`/`himmelblau`, `c-mueller`/`mueller-innsbruck`, `grossschaedl`/`grossschaedl-missing`, `h-muellner`/`muellner`) — presented to the user, none confirmed for merging, left untouched.
- Thin city pages (0 valid listings, e.g. Neunkirchen) now render the required German empty-state copy linking to the state page and emit `noindex, follow`.

**Verified:** lint/build clean, 328 profile pages generated (344 − 15 invalid − 1 merged duplicate); dev-server curl confirmed St. Pölten no longer contains "Placeholder"/"00000"/"stigler", and Neunkirchen emits correct `noindex, follow` + empty-state copy.

## Phase 2 — Template copy & metadata

**Files touched:** `src/app/bestattung/[slug]/page.js`, `src/app/layout.js`, `src/app/ratgeber/page.js` + all 6 article pages, `src/app/staedtische-bestattung/page.js`, `src/components/Header.js`, `src/components/Header.module.css`, `src/data/bundeslaender.js`, `src/app/bundesland/[state]/page.js`, `src/lib/records.js` (`generateAboutParagraph`), `test/records.test.mjs` (new), `package.json`.

- Profile `<title>` now reads "… | Adresse, Kontakt & Leistungen | bestattungs.at"; meta description no longer promises Sterbeanzeigen.
- Root layout description and `keywords` meta tag: Parten/Sterbeanzeigen claim and the whole `<meta name="keywords">` tag removed.
- Profile page's "Aktuelle Sterbeanzeigen & Parten" section and its FAQ entry replaced with a single conditional line ("Parten und Sterbeanzeigen finden Sie direkt auf der Website von {Name}") that only renders when `b.website` exists.
- New `generateAboutParagraph()` in `src/lib/records.js` replaces the hardcoded "…begleiten wir Trauerfamilien…" first-person sentence; unit-tested against every valid record to assert no `wir`/`uns`/`unser`.
- `/ratgeber`, all 6 article pages, and `/staedtische-bestattung` now set explicit `openGraph: {title, description, url}` so they stop inheriting the homepage's OG tags.
- `Header.js`/`Header.module.css`: consolidated the two duplicate `<nav>` elements (desktop + mobile) into one, using a CSS override (`details:not([open]) .nav { display:flex !important }`) to keep it visible on desktop instead of rendering a second copy.
- `src/data/bundeslaender.js`: replaced stale population figures with official Statistik Austria preliminary figures as of 1 January 2026 (fetched live from statistik.at), added `populationStand` per state, rendered as "(Stand 1. Jänner 2026)" on the state page. "X Städte" badge switched to valid-listing cities.

**Verified:** lint/test(4)/build clean; dev-server curl confirmed `og:url` self-references on `/ratgeber/staedtische-bestattung`, zero `name="keywords"` matches, zero "begleiten wir" matches on profile pages, Parten line renders conditionally on `b.website`, and exactly one `<nav aria-label="Hauptnavigation">` in the homepage HTML.

## Phase 3 — Structured data

**Files touched:** `src/components/JsonLd.js` (new), `src/lib/seo.js` (added `localBusinessSchema`, `localBusinessReference`; fixed `@/` import to relative path), `src/app/layout.js`, `src/app/bestattung/[slug]/page.js`, `src/app/bundesland/[state]/page.js`, `src/app/bundesland/[state]/[city]/page.js`, `src/app/staedtische-bestattung/page.js`, `src/app/ratgeber/page.js` + all 6 article pages, `src/app/bundesland/page.js`, `src/app/bestattung/page.js`, `src/app/suche/page.js`, `test/seo.test.mjs` (new).

- New shared `<JsonLd data={...}>` component; every route's ad-hoc inline `<script>` now goes through it. Layout's hand-duplicated `WebSite` object replaced with the existing `websiteSchema()` helper.
- Profile schema: `'@type': 'FuneralHome'` (not a real schema.org type) → `'LocalBusiness'` + `additionalType: '.../Funeral_home'`; `url` now prefers the company's own website over the profile URL when present; only emitted for Phase-1-valid records.
- Profile breadcrumb now includes the missing "Bundesländer" middle crumb (`Startseite › Bundesländer › {Bundesland} › {Name}`); also fixed a "Bundeslaender" (missing umlaut) typo in the city/state breadcrumb schema.
- City/state `ItemList` entries simplified from a fully embedded address object to a lightweight `{name, url}` reference.
- Added `BreadcrumbList` to every page that already shows a visible breadcrumb but lacked schema: `/bestattung`, `/bundesland` (indexes), `/ratgeber` + all 6 articles, `/suche`. Also flipped `/suche` to `noindex, follow` (Phase 4 item, done here for convenience). Left the 4 legal pages alone — no visible breadcrumb there to mirror.

**Verified:** lint/build clean; 11/11 unit tests (schema builders round-trip through JSON, required fields present); live fetch + `JSON.parse` on one URL per template confirmed valid, correctly-typed JSON-LD (`/` → Organization, WebSite; `/bestattung/aumann` → LocalBusiness, BreadcrumbList, FAQPage; city/state → ItemList, BreadcrumbList; guide → Article, BreadcrumbList). These 5 URLs are recommended for a manual Google Rich Results Test pass.

## Phase 4 — Redirects, robots, sitemap

**Files touched:** `next.config.mjs`, `src/app/haftungsausschluss/page.js` (new), `src/app/privacy-policy/` and `src/app/disclaimer/` (deleted), `src/components/Footer.js`, `src/app/robots.js`, `src/app/sitemap.js`.

- Added the 3 required redirects using `statusCode: 301` (not `permanent: true`, which this Next.js version always maps to 308 — confirmed via `node_modules/next/dist/docs`).
- `/haftungsausschluss` didn't exist yet (only the English `/disclaimer` did) — created it with the same German content, then deleted `src/app/disclaimer/` and `src/app/privacy-policy/` entirely (`/datenschutz` already existed).
- Footer now links only `/datenschutz`, `/impressum`, `/agb`, `/haftungsausschluss`.
- `robots.js`: added `/suche` to `disallow`. `sitemap.js`: dropped `/suche`, `/privacy-policy`, `/disclaimer`; added `/haftungsausschluss`.

**Verified:** lint/build clean (387 routes); all 3 redirects confirmed literal `301 Moved Permanently` with correct single-hop destinations (200 directly, no chaining); sitemap serves exactly 373 URLs, independently recomputed as 15 static + 9 states + 21 valid-listing cities + 328 valid profiles — exact match; footer HTML confirmed to contain only the 4 required legal links.

## Phase 5 — Template enrichment

**Files touched:** `src/app/bestattung/[slug]/page.js`, `src/app/bundesland/[state]/[city]/page.js` + its `page.module.css`, `src/app/page.js`, `src/data/guides.js` (new), all 6 `ratgeber/*` article pages, `src/app/staedtische-bestattung/page.js`, `src/components/Footer.js`, `src/components/Header.js`, `src/app/ratgeber/page.js`.

- **Profile**: lazy-loaded Google Maps iframe, a website link in the sidebar (explicit field, or inferred from a non-generic email domain when absent), and an "Alle Bestatter in {Stadt} ansehen →" link to the city page.
- **City**: `<h1>` now links to the state page; added the 3 required FAQ questions (counts + `c.standesamt`, no invented facts) with matching `FAQPage` JSON-LD.
- **Homepage**: new "Bestatter in Ihrer Stadt" section, top 15 cities by valid-listing count.
- **Guides**: "Zuletzt aktualisiert: {Datum}" under every `<h1>`, sourced from real `git log` commit dates via new `src/data/guides.js`, also fed into each `articleSchema`'s `dateModified`.
- **Städtische disambiguation**: `/ratgeber/staedtische-bestattung` retitled to "Städtische oder private Bestattung? Unterschiede & freie Bestatterwahl"; every anchor to `/staedtische-bestattung` now reads "Städtische Bestatter im Überblick"; every anchor to `/ratgeber/staedtische-bestattung` now reads "Städtisch vs. privat im Vergleich".

**Verified:** lint/test(11)/build clean (387 routes); dev-server checks confirmed the maps iframe and city-link render on profiles, the sidebar website link renders only when present, city H1 anchor + FAQ block render with valid `FAQPage` JSON-LD, homepage cities section renders, all 6 guide dates render correctly, all disambiguated anchor texts + new page `<title>` render exactly as specified.

## Final acceptance checklist

| Check | Result |
|---|---|
| Zero "Placeholder" / all-zero phone numbers in built HTML | ✅ 0/383 files |
| Zero first-person pronouns in profile descriptions | ✅ unit test passes; 0/328 in visible text |
| Zero Parten/Sterbeanzeigen **claims** | ✅ remaining matches are the intentional conditional website-link line and legitimate cost/step content |
| og:url self-referencing on every route type | ✅ checked home/profile/state/city/guide/städtische |
| Valid JSON-LD on every template | ✅ 11/11 unit tests + live fetch/parse per template |
| robots.ts + sitemap.ts present, excludes suppressed/duplicate/noindexed | ✅ sitemap = 373 URLs, independently recomputed and matched exactly |
| Three 301s live, single-hop, English-slug pages removed from footer | ✅ literal 301s, destinations resolve 200 directly |
| Lighthouse SEO ≥ 95 spot check | ⚠️ not run — no browser/Lighthouse tooling available in this environment |
| `invalid-records.json` / `duplicates.json` generated | ✅ both present in `scripts/reports/` |

### Open items for manual follow-up
- `invalid-records.json` flags `furtner` and `phoenix` as possible false positives of the fake-phone heuristic (both otherwise look like complete, real businesses with valid street/email/website).
- `woegenstein` (name/id mismatch) and `kessler` (city bug, PLZ not resolvable from any data in this repo) are flagged for manual correction, not auto-fixed.
- Lighthouse SEO score should be run locally or via PageSpeed Insights against the 5 template URLs used for the Rich Results spot-check.
