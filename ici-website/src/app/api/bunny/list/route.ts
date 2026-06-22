import { NextRequest } from 'next/server';
import { jsonOk, jsonError, unauthorized, serverError } from '@/lib/api';
import { authorizeBunnyRequest } from '@/lib/bunny-auth';
import { listBunnyStorage } from '@/lib/bunny';

export async function GET(req: NextRequest) {
  if (!(await authorizeBunnyRequest(req))) return unauthorized();

  try {
    const { searchParams } = new URL(req.url);
    const folder = searchParams.get('folder') ?? '';
    const items = await listBunnyStorage(folder);
    return jsonOk({ items, folder });
  } catch (err) {
    console.error('[api/bunny/list GET]', err);
    return serverError(err instanceof Error ? err.message : undefined);
  }
}
