import type { NextRequest } from 'next/server';
import { requireAdmin } from '@/lib/auth';

/** Admin session or Bearer BUNNY_API_SECRET (for Sanity Studio server-side calls). */
export async function authorizeBunnyRequest(req: NextRequest) {
  const session = await requireAdmin();
  if (session) return true;

  const secret = process.env.BUNNY_API_SECRET;
  if (!secret) return false;

  const auth = req.headers.get('authorization');
  if (auth === `Bearer ${secret}`) return true;

  const header = req.headers.get('x-bunny-api-secret');
  return header === secret;
}
