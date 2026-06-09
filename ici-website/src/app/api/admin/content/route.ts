import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { query } from '@/lib/db';
import { z } from 'zod';
import { revalidatePath } from 'next/cache';

// Zod schema for content validation
const updateContentSchema = z.object({
  page_slug: z.string().min(1),
  updates: z.array(z.object({
    section_key: z.string().min(1),
    content_value: z.string().nullable(),
    content_type: z.enum(['text', 'richtext', 'image', 'url', 'boolean']),
  })),
});

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const parsed = updateContentSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: 'Invalid payload', details: parsed.error.format() }, { status: 400 });
    }

    const { page_slug, updates } = parsed.data;

    // We process sequentially to capture previous value correctly before updating
    for (const update of updates) {
      // Fetch current value to store as previous_value
      const currentRows: any = await query(
        `SELECT content_value, required FROM site_content WHERE page_slug = ? AND section_key = ? LIMIT 1`,
        [page_slug, update.section_key]
      );

      const current = currentRows[0];

      // Validate required fields
      if (current?.required && (!update.content_value || update.content_value.trim() === '')) {
        return NextResponse.json({ error: `Field ${update.section_key} is required and cannot be empty.` }, { status: 400 });
      }

      const previous_value = current?.content_value || null;

      // Update with history
      await query(
        `UPDATE site_content SET previous_value = ?, content_value = ? WHERE page_slug = ? AND section_key = ?`,
        [previous_value, update.content_value, page_slug, update.section_key]
      );
    }

    // Revalidate the Next.js cache for this page
    const pagePath = page_slug === 'home' ? '/' : `/${page_slug.replace('-', '/')}`;
    revalidatePath(pagePath);
    // Also revalidate global layout if global was updated
    if (page_slug === 'global') {
      revalidatePath('/', 'layout');
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('CMS Update Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const pageSlug = searchParams.get('page');

    if (!pageSlug) {
      return NextResponse.json({ error: 'Page slug is required' }, { status: 400 });
    }

    const rows = await query(
      `SELECT section_key, content_value, previous_value, content_type, label, required 
       FROM site_content 
       WHERE page_slug = ? 
       ORDER BY sort_order ASC, section_key ASC`,
      [pageSlug]
    );

    return NextResponse.json({ rows });
  } catch (error) {
    console.error('CMS Fetch Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
