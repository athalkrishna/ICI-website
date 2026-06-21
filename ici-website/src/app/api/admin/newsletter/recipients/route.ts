import { requireAdmin } from '@/lib/auth';
import { jsonOk, unauthorized, serverError } from '@/lib/api';
import { getRecipientCounts } from '@/lib/newsletter';

export async function GET() {
  const session = await requireAdmin();
  if (!session) return unauthorized();

  try {
    const counts = await getRecipientCounts();
    return jsonOk({
      total: counts.total,
      dashboardStudents: counts.dashboardStudents,
      alumni: counts.alumni,
      externalSubscribers: counts.externalSubscribers,
      students: counts.dashboardStudents,
      recipients: counts.recipients,
    });
  } catch (err) {
    console.error('[admin/newsletter/recipients GET]', err);
    return serverError();
  }
}
