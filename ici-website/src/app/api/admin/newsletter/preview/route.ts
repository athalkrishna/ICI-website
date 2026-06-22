import { NextRequest } from 'next/server';
import { z } from 'zod';
import { requireAdmin } from '@/lib/auth';
import { jsonOk, jsonError, unauthorized, serverError } from '@/lib/api';
import { parseBlocks } from '@/lib/newsletter-blocks';
import { getNewsletterBranding } from '@/lib/newsletter-branding';
import { renderNewsletterHtml } from '@/lib/newsletter-render';

const previewSchema = z.object({
  title: z.string().min(1),
  blocks: z.array(z.unknown()),
});

export async function POST(req: NextRequest) {
  const session = await requireAdmin();
  if (!session) return unauthorized();

  try {
    const body = await req.json();
    const parsed = previewSchema.safeParse(body);
    if (!parsed.success) {
      return jsonError(parsed.error.issues[0]?.message ?? 'Invalid payload');
    }

    const blocks = parseBlocks(parsed.data.blocks);
    const branding = await getNewsletterBranding();
    const html = await renderNewsletterHtml({
      title: parsed.data.title,
      blocks,
      branding,
    });

    return jsonOk({ html });
  } catch (err) {
    console.error('[admin/newsletter/preview POST]', err);
    return serverError();
  }
}
