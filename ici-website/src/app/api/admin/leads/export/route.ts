import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireAdmin } from '@/lib/auth';
import { unauthorized, serverError } from '@/lib/api';

function escapeCsv(value: string | null | undefined): string {
  if (value == null) return '';
  const str = String(value);
  if (str.includes(',') || str.includes('"') || str.includes('\n')) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return str;
}

export async function GET(req: NextRequest) {
  const session = await requireAdmin();
  if (!session) return unauthorized();

  try {
    const { searchParams } = new URL(req.url);
    const status = searchParams.get('status');
    const source = searchParams.get('source');
    const from = searchParams.get('from');
    const to = searchParams.get('to');

    const leads = await prisma.lead.findMany({
      where: {
        ...(status ? { status: status as never } : {}),
        ...(source ? { source: source as never } : {}),
        ...(from || to
          ? {
              createdAt: {
                ...(from ? { gte: new Date(from) } : {}),
                ...(to ? { lte: new Date(to) } : {}),
              },
            }
          : {}),
      },
      orderBy: { createdAt: 'desc' },
    });

    const headers = [
      'ID',
      'Full Name',
      'Email',
      'Phone',
      'Country',
      'Programme Interest',
      'Source',
      'Status',
      'Message',
      'Assigned To',
      'UTM Source',
      'UTM Medium',
      'UTM Campaign',
      'Created At',
    ];

    const rows = leads.map((lead) =>
      [
        lead.id,
        lead.fullName,
        lead.email,
        lead.phone,
        lead.country,
        lead.programmeInterest,
        lead.source,
        lead.status,
        lead.message,
        lead.assignedTo,
        lead.utmSource,
        lead.utmMedium,
        lead.utmCampaign,
        lead.createdAt.toISOString(),
      ]
        .map(escapeCsv)
        .join(',')
    );

    const csv = [headers.join(','), ...rows].join('\n');

    return new NextResponse(csv, {
      status: 200,
      headers: {
        'Content-Type': 'text/csv; charset=utf-8',
        'Content-Disposition': `attachment; filename="leads-${new Date().toISOString().slice(0, 10)}.csv"`,
      },
    });
  } catch (err) {
    console.error('[admin/leads/export GET]', err);
    return serverError();
  }
}
