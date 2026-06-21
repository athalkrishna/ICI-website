import { NextRequest } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { requireAdmin } from '@/lib/auth';
import { jsonOk, jsonError, unauthorized, serverError } from '@/lib/api';

const addSchema = z.object({
  email: z.string().email(),
  name: z.string().optional().nullable(),
  notes: z.string().optional().nullable(),
});

function parseCsvEmails(text: string): { email: string; name?: string }[] {
  const lines = text.split(/\r?\n/).map((l) => l.trim()).filter(Boolean);
  const rows: { email: string; name?: string }[] = [];

  for (const line of lines) {
    if (/^email/i.test(line)) continue;
    const parts = line.split(',').map((p) => p.trim().replace(/^"|"$/g, ''));
    const email = parts[0]?.toLowerCase();
    if (!email || !email.includes('@')) continue;
    rows.push({ email, name: parts[1] || undefined });
  }
  return rows;
}

export async function GET(req: NextRequest) {
  const session = await requireAdmin();
  if (!session) return unauthorized();

  try {
    const { searchParams } = new URL(req.url);
    const search = searchParams.get('search')?.trim();
    const page = Math.max(1, parseInt(searchParams.get('page') ?? '1', 10));
    const limit = Math.min(100, Math.max(10, parseInt(searchParams.get('limit') ?? '50', 10)));
    const skip = (page - 1) * limit;

    const where = {
      unsubscribedAt: null,
      ...(search
        ? {
            OR: [
              { email: { contains: search } },
              { name: { contains: search } },
            ],
          }
        : {}),
    };

    const [contacts, total] = await Promise.all([
      prisma.alumniNewsletterContact.findMany({
        where,
        orderBy: { subscribedAt: 'desc' },
        skip,
        take: limit,
      }),
      prisma.alumniNewsletterContact.count({ where }),
    ]);

    return jsonOk({ contacts, total, page, limit });
  } catch (err) {
    console.error('[admin/newsletter/alumni GET]', err);
    return serverError();
  }
}

export async function POST(req: NextRequest) {
  const session = await requireAdmin();
  if (!session) return unauthorized();

  try {
    const contentType = req.headers.get('content-type') ?? '';
    let imported = 0;
    let skipped = 0;

    if (contentType.includes('text/csv') || contentType.includes('text/plain')) {
      const text = await req.text();
      const rows = parseCsvEmails(text);

      for (const row of rows) {
        const existingUser = await prisma.user.findUnique({ where: { email: row.email } });
        if (existingUser) {
          skipped += 1;
          continue;
        }
        await prisma.alumniNewsletterContact.upsert({
          where: { email: row.email },
          create: {
            email: row.email,
            name: row.name,
            source: 'import',
          },
          update: {
            name: row.name ?? undefined,
            unsubscribedAt: null,
            source: 'import',
          },
        });
        imported += 1;
      }

      return jsonOk({ imported, skipped, total: rows.length });
    }

    const body = await req.json();

    if (body.csv && typeof body.csv === 'string') {
      const rows = parseCsvEmails(body.csv);
      for (const row of rows) {
        const existingUser = await prisma.user.findUnique({ where: { email: row.email } });
        if (existingUser) {
          skipped += 1;
          continue;
        }
        await prisma.alumniNewsletterContact.upsert({
          where: { email: row.email },
          create: { email: row.email, name: row.name, source: 'import' },
          update: { name: row.name ?? undefined, unsubscribedAt: null },
        });
        imported += 1;
      }
      return jsonOk({ imported, skipped, total: rows.length });
    }

    const parsed = addSchema.safeParse(body);
    if (!parsed.success) {
      return jsonError(parsed.error.issues[0]?.message ?? 'Invalid payload');
    }

    const email = parsed.data.email.toLowerCase().trim();
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return jsonError('This email belongs to a dashboard student. Alumni list is newsletter-only.', 409);
    }

    const contact = await prisma.alumniNewsletterContact.upsert({
      where: { email },
      create: {
        email,
        name: parsed.data.name,
        notes: parsed.data.notes,
        source: 'manual',
      },
      update: {
        name: parsed.data.name ?? undefined,
        notes: parsed.data.notes ?? undefined,
        unsubscribedAt: null,
      },
    });

    return jsonOk(contact, 201);
  } catch (err) {
    console.error('[admin/newsletter/alumni POST]', err);
    return serverError();
  }
}

export async function DELETE(req: NextRequest) {
  const session = await requireAdmin();
  if (!session) return unauthorized();

  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    if (!id) return jsonError('Missing id');

    await prisma.alumniNewsletterContact.delete({ where: { id } });
    return jsonOk({ success: true });
  } catch (err) {
    console.error('[admin/newsletter/alumni DELETE]', err);
    return serverError();
  }
}
