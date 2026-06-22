# ICI Content & Media Architecture

## Important: what actually powers the live site

**internationalcoachinginstitute.org** is built with:

| Layer | Technology | Where editors work |
|-------|------------|-------------------|
| Pages, programmes, credentials | **Prisma CMS** | `/admin/pages` |
| Blog | **Prisma CMS** | `/admin/blog` |
| Events | **Prisma CMS** | `/admin/events` |
| Media library | **Bunny.net CDN** | `/admin/media` |
| SEO (pages, blog, events) | **Prisma fields** | Same admin editors |

**Sanity** is included as **optional schema definitions** in this folder.  
`NEXT_PUBLIC_SANITY_PROJECT_ID` is empty in production — Sanity Studio is **not** connected to the live site today.

If you need the workflow described in external specs (“Sanity Studio → paste Bunny URL → Publish”), you must either:

1. **Deploy Sanity Studio** using the schemas below and migrate page fetching to Sanity, **or**
2. **Use the existing Admin Portal** (recommended) — same Bunny URLs, same SEO outcomes.

---

## Bunny.net (already integrated)

### Live admin workflow (use this today)

1. Go to **Admin → Media Library** (`/admin/media`)
2. Upload image → stored in Bunny Storage, CDN URL saved
3. Copy CDN URL (e.g. `https://ici-website.b-cdn.net/media/…`)
4. Paste into any **IMAGE** field in **Pages Content** (`/admin/pages`)

### API routes (for Sanity Studio or scripts)

All routes require **admin login** or `Authorization: Bearer {BUNNY_API_SECRET}`.

| Route | Method | Purpose |
|-------|--------|---------|
| `/api/bunny/upload` | POST | `multipart/form-data`: `file`, optional `folder` |
| `/api/bunny/list` | GET | `?folder=programmes` — list storage files |
| `/api/bunny/delete` | DELETE | JSON `{ "path": "media/file.webp" }` |

Env vars: see `.env.local.example`

---

## Sanity schemas (optional Studio)

Import `sanity/schemaTypes/index.ts` into a Sanity v3 Studio project.

### Included types

- `bunnyImage` — CDN URL + alt + dimensions
- `seoFields` — full meta, OG, Twitter, robots, JSON-LD
- `programme` — course document with hero/card images + SEO
- `module` — course module block
- Plus: `announcement`, `event`, `insight`, `testimonial`, `faculty`

### Studio custom components

Copy from `sanity/studio/` into your Studio project:

- `components/BunnyImageInput.tsx` — paste URL or upload
- `tools/BunnyMediaLibrary.tsx` — sidebar media browser

Register in `sanity.config.ts`:

```ts
import BunnyImageInput from './components/BunnyImageInput'
import BunnyMediaLibrary from './tools/BunnyMediaLibrary'

export default defineConfig({
  // ...
  form: {
    components: {
      input: { bunnyImageInput: BunnyImageInput },
    },
  },
  plugins: [
    {
      name: 'bunny-media-library',
      tools: [{
        name: 'bunny-media',
        title: 'Media Library',
        component: BunnyMediaLibrary,
      }],
    },
  ],
})
```

### Next.js metadata helper (when using Sanity documents)

```ts
import { metadataFromSanitySeo } from '@/lib/sanity-seo-metadata'

export async function generateMetadata({ params }) {
  const programme = await getSanityProgramme(params.slug)
  return metadataFromSanitySeo(programme, '/programmes')
}
```

---

## Site images to migrate to Bunny `/site/` folder

Upload these from `/public` to Bunny Storage, then update CMS IMAGE fields:

| Public path | Suggested Bunny path |
|-------------|---------------------|
| `/logo-transparent.webp` | `site/logo-transparent.webp` |
| `/logo-white.webp` | `site/logo-white.webp` |
| `/logo-transparent.webp` | `site/logo-transparent.webp` |
| `/aspiring-coaches.webp` | `site/aspiring-coaches.webp` |
| `/experienced-practitioners.webp` | `site/experienced-practitioners.webp` |
| `/organisations-leaders.webp` | `site/organisations-leaders.webp` |
| `/ici-difference-coaching.webp` | `site/ici-difference-coaching.webp` |
| `/certified-life-coach.webp` | `programmes/certified-life-coach.webp` |
| `/executive-coaching.webp` | `programmes/executive-coaching.webp` |
| `/health-wellness-coaching.webp` | `programmes/health-wellness-coaching.webp` |
| `/images/global-network-bg.webp` | `site/global-network-bg.webp` |

---

## How to add a new course (Admin Portal — current)

1. **Media Library** → upload hero/card images → copy Bunny CDN URLs  
2. **Pages Content** → open programme page (e.g. `/programmes/certified-life-coach`)  
3. Update content fields + IMAGE fields with CDN URLs + alt text  
4. Fill **SEO** fields (meta title, meta description) in the page editor  
5. Publish page  

For a **new** programme slug, add a CMS page in seed/admin and a Next.js route under `src/app/programmes/`.

---

## How to add a new course (Sanity — after Studio deploy)

1. **Media Library** tool in Studio → upload → copy CDN URL  
2. **Programmes → Create** → paste hero/card URLs → fill SEO tab  
3. Publish → ensure Next.js fetches from Sanity (requires migration)  
