/**
 * Client-approved keyword spec — single source of truth for audits.
 * Run: npm run verify:seo-keywords
 */
import { HOME_SEO_KEYWORD_LIST } from '../src/lib/home-seo-defaults';
import { PAGE_KEYWORD_TARGETS, approvedKeywordsForPage } from '../src/lib/page-seo-defaults';

type Spec = Record<string, string[]>;

/** Exact keyword lists from ICI client SEO sheet. */
export const CLIENT_KEYWORD_SPEC: Spec = {
  '/': [
    'international coaching institute',
    'online coaching certification',
    'coaching certification institute',
    'become a coach',
    'life coach certification',
    'executive coach certification',
  ],
  '/credentials': [
    'professional coaching certification',
    'online coaching certification',
    'international coaching certification',
  ],
  '/pricing': [
    'coaching certification cost',
    'coaching certification fees',
    'coach certification program',
  ],
  '/programmes': ['coach training program', 'coaching certification courses'],
  '/programmes/certified-life-coach': [
    'transformational coaching certification',
    'life coaching course',
    'become a certified life coach',
  ],
  '/programmes/executive-coaching': [
    'executive coach training',
    'executive coaching certification',
    'leadership coaching certification',
  ],
  '/programmes/business-coach': ['business coach certification', 'business coaching course'],
  '/programmes/health-wellness': [
    'health and wellness coach training',
    'wellness coach certification',
    'wellness coaching course',
  ],
  '/programmes/team-coaching': ['leadership coach training', 'corporate coach training'],
  '/about': ['global coaching institute', 'coach education institute'],
  '/credentials/catalyst': [
    'coaching certification for beginners',
    'foundation coaching certification',
  ],
  '/credentials/architect': ['advanced coaching certification'],
  '/credentials/sage': ['master coaching certification'],
  '/credentials/luminary': ['master coach certification'],
  'blog:become-a-certified-life-coach': ['become a certified life coach', 'online life coach training'],
};

function normalize(list: string[]): string[] {
  return list.map((k) => k.trim().toLowerCase()).sort();
}

function assertMatch(label: string, expected: string[], actual: string[]): void {
  const exp = normalize(expected);
  const got = normalize(actual);
  if (exp.length !== got.length || exp.some((k, i) => k !== got[i])) {
    console.error(`FAIL ${label}`);
    console.error('  expected:', expected);
    console.error('  actual:  ', actual);
    process.exitCode = 1;
    return;
  }
  console.log(`OK   ${label} (${expected.length} keywords)`);
}

function main() {
  console.log('Verifying client SEO keyword map...\n');

  assertMatch('Homepage', CLIENT_KEYWORD_SPEC['/'], [...HOME_SEO_KEYWORD_LIST]);

  for (const [slug, expected] of Object.entries(CLIENT_KEYWORD_SPEC)) {
    if (slug === '/' || slug.startsWith('blog:')) continue;
    const actual = approvedKeywordsForPage(slug);
    if (!actual) {
      console.error(`FAIL ${slug} — missing PAGE_KEYWORD_TARGETS entry`);
      process.exitCode = 1;
      continue;
    }
    assertMatch(slug, expected, actual);
  }

  for (const slug of Object.keys(PAGE_KEYWORD_TARGETS)) {
    if (!CLIENT_KEYWORD_SPEC[slug]) {
      console.error(`FAIL extra slug in PAGE_KEYWORD_TARGETS not in client spec: ${slug}`);
      process.exitCode = 1;
    }
  }

  if (process.exitCode) {
    console.error('\nSEO keyword verification FAILED.');
    process.exit(1);
  }

  console.log('\nAll client SEO keywords verified.');
}

main();
