import { NextRequest } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { requireAdmin } from '@/lib/auth';
import { jsonOk, jsonError, unauthorized, serverError } from '@/lib/api';
import { listPages } from '@/lib/cms';
import { logActivity } from '@/lib/activity';

const contentFieldType = z.enum([
  'TEXT',
  'TEXTAREA',
  'RICHTEXT',
  'IMAGE',
  'URL',
  'EMAIL',
  'PHONE',
  'NUMBER',
  'BOOLEAN',
  'CODE',
]);

const createPageSchema = z.object({
  title: z.string().min(1),
  slug: z.string().min(1).regex(/^[a-z0-9/-]+$/),
  description: z.string().optional(),
  fields: z
    .array(
      z.object({
        key: z.string().min(1),
        label: z.string().min(1),
        helperText: z.string().optional(),
        type: contentFieldType,
        value: z.string().nullable().optional(),
        order: z.number().int().optional(),
        section: z.string().optional(),
      })
    )
    .optional(),
});

export async function GET() {
  const session = await requireAdmin();
  if (!session) return unauthorized();

  try {
    const pages = await listPages();
    return jsonOk(pages);
  } catch (err) {
    console.error('[admin/pages GET]', err);
    return serverError();
  }
}

export async function POST(req: NextRequest) {
  const session = await requireAdmin();
  if (!session) return unauthorized();

  try {
    const body = await req.json();
    const parsed = createPageSchema.safeParse(body);
    if (!parsed.success) {
      return jsonError(parsed.error.issues[0]?.message ?? 'Invalid payload');
    }

    const { title, slug, description, fields } = parsed.data;

    const existing = await prisma.page.findUnique({ where: { slug } });
    if (existing) return jsonError('A page with this slug already exists', 409);

    const page = await prisma.page.create({
      data: {
        title,
        slug,
        description,
        isSystem: false,
        status: 'DRAFT',
        fields: fields
          ? {
              create: fields.map((f, i) => ({
                key: f.key,
                label: f.label,
                helperText: f.helperText,
                type: f.type,
                value: f.value ?? null,
                order: f.order ?? i,
                section: f.section ?? 'General',
              })),
            }
          : undefined,
      },
      include: { fields: true },
    });

    await logActivity({
      action: 'PAGE_CREATED',
      entity: 'Page',
      entityId: page.id,
      details: slug,
      userId: session.user.id,
      userName: session.user.name,
    });

    return jsonOk(page, 201);
  } catch (err) {
    console.error('[admin/pages POST]', err);
    return serverError();
  }
}
