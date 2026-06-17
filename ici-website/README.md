# International Coaching Institute — Website & Backend

Next.js 14+ application with a full CMS admin dashboard, student portal, lead management, blog, events, and email system. Content is stored in MySQL via Prisma and files in Bunny.net CDN.

## Stack

- **Framework:** Next.js 16 (App Router) + TypeScript
- **Database:** MySQL (XAMPP locally, Cloudways in production)
- **ORM:** Prisma 7 with MariaDB adapter
- **Auth:** NextAuth.js v4 (credentials)
- **Storage:** Bunny.net Storage + Pull Zone CDN
- **Email:** Nodemailer (SMTP)
- **UI:** Tailwind CSS, TipTap, Monaco Editor

## Local setup (XAMPP)

### 1. Prerequisites

- Node.js 20+
- XAMPP with MySQL running
- Create database: `ici_website` (or update `DATABASE_URL`)

### 2. Install & configure

```bash
cd ici-website
npm install
cp .env.example .env.local
```

Edit `.env.local`:

- `DATABASE_URL` — e.g. `mysql://root:@localhost:3306/ici_website`
- `NEXTAUTH_SECRET` — generate with `openssl rand -base64 32`
- Bunny.net and SMTP credentials (optional for local dev; required for uploads/email)

### 3. Database

```bash
npm run db:generate   # Generate Prisma client
npm run db:push       # Apply schema to MySQL
npm run db:seed       # Seed pages, admin users, testimonials
```

### 4. Run

```bash
npm run dev
```

- **Website:** http://localhost:3000
- **Admin login:** http://localhost:3000/admin/login
- **Student login:** http://localhost:3000/login

### Default admin credentials (after seed)

| Role | Email | Password |
|------|-------|----------|
| Super Admin | admin@internationalcoachinginstitute.org | Admin@ICI2026 |
| Admin | team@internationalcoachinginstitute.org | Admin@ICI2026 |

## Production deployment (Cloudways)

Hosting, database, and the Node.js app all run on **Cloudways**. Uploaded files (images, PDFs, course materials) are stored on **Bunny.net** CDN — not on the Cloudways server disk.

### 1. Create the Cloudways application

1. Log in to [Cloudways](https://platform.cloudways.com).
2. **Add application** → choose your server → **Custom PHP App** or **Node.js** (if available) on a server with **Node 20+**.
3. Note the application URL (e.g. `https://xxxxx.cloudwaysapps.com`).

### 2. Connect GitHub & deploy settings

1. **Deployment via Git** → connect `International-coaching-Institute` repo.
2. Set **Deployment path** to `ici-website` (if the repo root is the monorepo) or `/` if only the `ici-website` folder is deployed.
3. **Build command:** `npm install && npm run build`
4. **Start command / Application start:** `npm start`
5. **Node version:** 20.x

### 3. Environment variables (Cloudways → Application → Environment Variables)

Copy every variable from `.env.example`. Minimum for production:

| Variable | Example / notes |
|----------|-----------------|
| `DATABASE_URL` | `mysql://USER:PASS@HOST:3306/DB_NAME` from Cloudways **Database** tab |
| `NEXTAUTH_URL` | `https://internationalcoachinginstitute.org` (your live domain) |
| `NEXTAUTH_SECRET` | Random 32+ char string (`openssl rand -base64 32`) |
| `NEXT_PUBLIC_APP_URL` | Same as `NEXTAUTH_URL` |
| `BUNNY_STORAGE_ZONE_NAME` | Bunny storage zone name |
| `BUNNY_STORAGE_API_KEY` | Bunny storage API password |
| `BUNNY_CDN_URL` | `https://your-zone.b-cdn.net` |
| `BUNNY_TOKEN_AUTH_KEY` | Bunny pull zone token auth key (for private materials) |
| `SMTP_*` | Gmail / Google Workspace SMTP (see `.env.example`) |
| `ADMIN_NOTIFICATION_EMAIL` | `info@internationalcoachinginstitute.org` |
| `REVALIDATE_SECRET` | Random secret for on-demand cache revalidation |

MySQL is on the **same Cloudways server** — use the internal DB host from the Cloudways panel (no remote IP whitelist needed).

### 4. First-time database setup (SSH)

SSH into the application and run:

```bash
cd applications/<app-folder>/public_html   # or your deploy path
npm run db:push
npm run db:seed
```

### 5. Domain & SSL

1. **Domain management** → add `internationalcoachinginstitute.org` (+ `www`).
2. Enable **Let's Encrypt SSL**.
3. Update `NEXTAUTH_URL` and `NEXT_PUBLIC_APP_URL` to the live HTTPS domain.
4. Restart the application.

### 6. Remove Vercel

1. In [Vercel](https://vercel.com) → your project → **Settings** → delete the project (or disconnect Git).
2. Point your domain DNS to **Cloudways** (A record or CNAME from Cloudways domain tab).
3. Remove any old Vercel DNS records.

### 7. Verify after deploy

- Homepage loads over HTTPS
- `/admin/login` works with seeded admin user
- Form submission creates a lead + sends email
- Admin **Media** upload saves to Bunny (check URL is `*.b-cdn.net`)

## Bunny.net configuration

1. Create a **Storage Zone** and note the zone name and API key.
2. Create a **Pull Zone** linked to the storage zone for CDN delivery.
3. For private course materials, enable **Token Authentication** on the pull zone and set `BUNNY_TOKEN_AUTH_KEY`.
4. Set in `.env`:
   - `BUNNY_STORAGE_ZONE_NAME`
   - `BUNNY_STORAGE_API_KEY`
   - `BUNNY_CDN_URL`
   - `BUNNY_TOKEN_AUTH_KEY` (for signed URLs)

All uploads (CMS images, media library, course materials) go to Bunny.net. Only CDN URLs are stored in MySQL.

## Admin dashboard

| Section | Route |
|---------|-------|
| Dashboard | `/admin` |
| Pages (CMS) | `/admin/pages` |
| Blog | `/admin/blog` |
| Events | `/admin/events` |
| Leads | `/admin/leads` |
| Students | `/admin/students` |
| Course Materials | `/admin/materials` |
| Testimonials | `/admin/testimonials` |
| Media Library | `/admin/media` |
| Email Logs | `/admin/email-logs` |
| Site Settings | `/admin/settings` |
| Users (super admin) | `/admin/users` |

## Student portal

| Section | Route |
|---------|-------|
| Dashboard | `/dashboard` |
| Materials | `/dashboard/materials` |
| Profile | `/dashboard/profile` |
| Credential | `/dashboard/credential` |

## CMS content

Public pages read from the `pages` and `content_fields` tables via `getPageContent(slug)`. Home page slug is `/`. Global header/footer content is slug `global`.

Publishing a page triggers ISR revalidation (`revalidate: 60` + on-demand via `/api/revalidate`).

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Development server |
| `npm run build` | Production build |
| `npm run start` | Production server |
| `npm run db:generate` | Generate Prisma client |
| `npm run db:push` | Push schema to database |
| `npm run db:migrate` | Create/run migrations |
| `npm run db:seed` | Seed initial data |

## Security notes

- Admin routes require `ADMIN` or `SUPER_ADMIN` role.
- Student routes require `STUDENT` role.
- Login rate limit: 5 attempts per IP per 15 minutes.
- Passwords hashed with bcrypt (12 rounds).
- Course material access uses Bunny.net signed URLs (15-minute expiry).
