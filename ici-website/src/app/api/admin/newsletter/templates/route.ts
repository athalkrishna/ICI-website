import { NextRequest } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { requireAdmin } from '@/lib/auth';
import { jsonOk, jsonError, unauthorized, serverError } from '@/lib/api';
import { parseBlocks } from '@/lib/newsletter-blocks';
import { listNewsletterTemplates } from '@/lib/newsletter-templates-db';

const saveTemplateSchema = z.object({
  name: z.string().min(1, 'Template name is required'),
  description: z.string().optional(),
  blocks: z.array(z.unknown()).min(1, 'At least one block is required'),
});

export async function GET() {
  const session = await requireAdmin();
  if (!session) return unauthorized();

  try {
    const templates = await listNewsletterTemplates();
    return jsonOk(templates);
  } catch (err) {
    console.error('[admin/newsletter/templates GET]', err);
    return serverError();
  }
}

export async function POST(req: NextRequest) {
  const session = await requireAdmin();
  if (!session) return unauthorized();

  try {
    const body = await req.json();
    const parsed = saveTemplateSchema.safeParse(body);
    if (!parsed.success) {
      return jsonError(parsed.error.issues[0]?.message ?? 'Invalid payload');
    }

    const blocks = parseBlocks(parsed.data.blocks);
    if (blocks.length === 0) {
      return jsonError('Invalid block structure');
    }

    const template = await prisma.newsletterTemplate.create({
      data: {
        name: parsed.data.name.trim(),
        description: parsed.data.description?.trim() || null,
        blocks,
        isSystemDefault: false,
        createdById: session.user.id,
      },
    });

    return jsonOk(template, 201);
  } catch (err) {
    console.error('[admin/newsletter/templates POST]', err);
    return serverError();
  }
}
