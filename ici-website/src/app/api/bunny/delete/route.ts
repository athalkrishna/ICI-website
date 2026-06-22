import { NextRequest } from 'next/server';
import { z } from 'zod';
import { jsonOk, jsonError, unauthorized, serverError } from '@/lib/api';
import { authorizeBunnyRequest } from '@/lib/bunny-auth';
import { deleteFromBunny } from '@/lib/bunny';

const deleteSchema = z.object({
  path: z.string().min(1),
});

export async function DELETE(req: NextRequest) {
  if (!(await authorizeBunnyRequest(req))) return unauthorized();

  try {
    const body = await req.json();
    const parsed = deleteSchema.safeParse(body);
    if (!parsed.success) {
      return jsonError(parsed.error.issues[0]?.message ?? 'Invalid payload');
    }

    await deleteFromBunny(parsed.data.path);
    return jsonOk({ success: true });
  } catch (err) {
    console.error('[api/bunny/delete DELETE]', err);
    return serverError(err instanceof Error ? err.message : undefined);
  }
}
