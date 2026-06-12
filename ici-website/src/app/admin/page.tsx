import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { query } from '@/lib/db';

export default async function AdminDashboard() {
  const session = await getServerSession(authOptions);
  
  if (!session) {
    redirect('/admin/login');
  }

  // Fetch some stats
  let totalLeads = 0;
  let totalPayments = 0;
  try {
    const leadsRes: any = await query('SELECT COUNT(*) as count FROM leads');
    totalLeads = leadsRes[0]?.count || 0;

    const paymentsRes: any = await query('SELECT COUNT(*) as count FROM payments WHERE status="captured"');
    totalPayments = paymentsRes[0]?.count || 0;
  } catch (err) {
    console.error('Failed to fetch admin stats', err);
  }

  return (
    <div>
      <h2 className="text-h2 font-bold font-display mb-8">Dashboard Overview</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-2xl shadow-md border border-navy-100">
          <h3 className="text-muted font-medium mb-2 font-display">Total Leads</h3>
          <p className="text-4xl font-bold text-brand-navy-900">{totalLeads}</p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-md border border-navy-100">
          <h3 className="text-muted font-medium mb-2 font-display">Captured Payments</h3>
          <p className="text-4xl font-bold text-brand-navy-900">{totalPayments}</p>
        </div>
      </div>

      <div className="bg-navy-50 border border-navy-100 rounded-lg p-6">
        <h3 className="text-h3 font-bold text-navy-900 mb-2 font-display">Writing Guidelines</h3>
        <p className="text-navy-800 text-sm">
          British English (programme, organisation, behaviour). No em dashes (use commas, colons or brackets).
          Warm, clear, intellectually authoritative. No motivational clichés. Short paragraphs. 
          ICI is the institution: do not name individuals as founders or owners.
        </p>
      </div>
    </div>
  );
}
