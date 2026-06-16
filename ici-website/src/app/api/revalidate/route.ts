import { NextRequest } from 'next/server';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { jsonOk, jsonError, unauthorized, serverError } from '@/lib/api';

const revalidateSchema = z.object({
  paths: z.array(z.string()).optional(),
  tags: z.array(z.string()).optional(),
});

export async function POST(req: NextRequest) {
  try {
    const secret = req.headers.get('x-revalidate-secret');
    const expectedSecret = process.env.REVALIDATE_SECRET;

    if (!expectedSecret || secret !== expectedSecret) {
      return unauthorized('Invalid revalidation secret');
    }

    const body = await req.json();
    const parsed = revalidateSchema.safeParse(body);
    if (!parsed.success) {
      return jsonError(parsed.error.issues[0]?.message ?? 'Invalid payload');
    }

    const revalidated: string[] = [];

    if (parsed.data.paths) {
      for (const path of parsed.data.paths) {
        revalidatePath(path);
        revalidated.push(path);
      }
    }

    if (parsed.data.tags) {
      const { revalidateTag } = await import('next/cache');
      for (const tag of parsed.data.tags) {
        revalidateTag(tag, 'max');
        revalidated.push(`tag:${tag}`);
      }
    }

    if (revalidated.length === 0) {
      return jsonError('Provide paths or tags to revalidate');
    }

    return jsonOk({ revalidated, now: Date.now() });
  } catch (err) {
    console.error('[revalidate POST]', err);
    return serverError();
  }
}
