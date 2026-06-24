# Production deploy, SEO, and homepage lock

## Which branch ships to production

**Branch:** `main` on GitHub (`ashutosh123se/International-coaching-Institute`)

**Server path:** `~/applications/tkfxsgmxuc/public_html/ici-website`

Cloudways deploy = `git pull origin main` → `bash scripts/deploy-cloudways.sh` → restart app → purge cache.

Never deploy from a feature branch or uncommitted server edits.

---

## Root cause: why approved homepage copy reverted on deploy

Three separate mechanisms were overwriting approved metadata:

### 1. CMS database held stale SEO values

Homepage `<title>` and meta description are read from the CMS (`meta_title`, `meta_description` on page slug `/`). If the production database contained old template copy (e.g. generic “Start Your Coaching Career” / “World-Class Coaching Education”), every deploy that rebuilt the app would **still serve those DB values** — because deploy re-builds code but does not automatically fix CMS content.

### 2. SEO seed scripts could overwrite CMS on `--force`

`npm run db:seed-page-seo -- --force` rewrites `meta_title` and `meta_description` from code defaults. Running that on production after manual CMS edits would revert approved copy.

`npm run db:seed` does **not** overwrite existing field values on re-run (metadata only), but it **does** call `enforceHomeLockedFields()` which resets locked hero + homepage SEO to approved code constants.

### 3. Code fallbacks were not locked for homepage metadata

Home hero copy was already locked in code (`HOME_HERO_DEFAULTS` — CMS edits ignored on the public site). Homepage **SEO title/description were not locked** the same way, so bad DB values still appeared in `<head>` even when hero body was correct.

### Fix applied

- **`src/lib/home-seo-defaults.ts`** — approved homepage title + description, same pattern as hero lock.
- **`pageMetadata('/')`** — always emits locked SEO values; ignores CMS/DB for homepage title and description.
- **`cms.ts` / admin save / publish / seed** — skip and re-enforce locked homepage SEO fields.
- **Admin homepage editor** — shows locked SEO as read-only.
- **`<meta name="keywords">` removed** sitewide (Google ignores it; it exposed target terms).
- **`deploy-cloudways.sh`** — warns not to run destructive seed commands on production.

After deploy, run once if needed:

```bash
npm run db:repair-home-hero
```

---

## Approved homepage metadata (locked in code)

| Field | Value |
|-------|--------|
| **Title** | International Coaching Institute \| Become a Certified Coach |
| **Description** | Train and certify as a coach with the International Coaching Institute. One-to-one, online programmes blending coaching craft with psychology and neuroscience. |

---

## Structured data (already in code)

| Schema | Where |
|--------|--------|
| **Organization** | `src/app/layout.tsx` → `buildOrganizationSchema()` |
| **Course** | `/credentials/catalyst`, `/architect`, `/sage`, `/luminary` |
| **FAQPage** | `/pricing`, `/admissions` |

**Validate after deploy:**

- [Google Rich Results Test](https://search.google.com/test/rich-results)
- Test URLs:
  - `https://internationalcoachinginstitute.org/`
  - `https://internationalcoachinginstitute.org/credentials/catalyst`
  - `https://internationalcoachinginstitute.org/pricing`
  - `https://internationalcoachinginstitute.org/admissions`

---

## Sitemap, robots, redirects (in code)

| Item | Location |
|------|----------|
| Sitemap | `/sitemap.xml` — `src/app/sitemap.ts` |
| Robots | `/robots.txt` — `src/app/robots.ts` (allows `/`, blocks `/admin/`, `/dashboard/`, `/api/`) |
| 301 redirects | `src/middleware.ts` — `www`, `*.vercel.app`, `*.cloudwaysapps.com` → `internationalcoachinginstitute.org` |

---

## Google Search Console (client action)

1. Go to [Google Search Console](https://search.google.com/search-console).
2. **Add property** → **Domain** → `internationalcoachinginstitute.org`.
3. Verify via **DNS TXT record** at Cloudflare/Cloudways (Google shows the exact record).
4. After verification: **Sitemaps** → submit `https://internationalcoachinginstitute.org/sitemap.xml`.
5. **URL Inspection** → test homepage → **Request indexing**.

## Bing Webmaster Tools (client action)

1. Go to [Bing Webmaster Tools](https://www.bing.com/webmasters).
2. Add site `https://internationalcoachinginstitute.org`.
3. Verify (DNS or import from Google Search Console).
4. Submit sitemap: `https://internationalcoachinginstitute.org/sitemap.xml`.

---

## Production `.env` (required for correct canonicals/OG)

```env
NEXTAUTH_URL=https://internationalcoachinginstitute.org
NEXT_PUBLIC_APP_URL=https://internationalcoachinginstitute.org
CANONICAL_SITE_URL=https://internationalcoachinginstitute.org
```

Then deploy, restart, purge cache.
