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

1. Create a Node.js application on Cloudways (Node 20+).
2. Create a MySQL database and set `DATABASE_URL` in Cloudways environment variables.
3. Set all variables from `.env.example` in the Cloudways panel (never commit secrets).
4. Deploy the repo; build and start commands:
   - **Build:** `npm run build`
   - **Start:** `npm start`
5. After first deploy, run migrations/seed via SSH:
   ```bash
   npm run db:push
   npm run db:seed
   ```

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
