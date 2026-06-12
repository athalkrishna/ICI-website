import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { query } from '@/lib/db'

export default async function AdminLeadsPage() {
  const session = await getServerSession(authOptions)
  if (!session) redirect('/admin/login')

  const leads: any = await query(`SELECT * FROM leads ORDER BY created_at DESC`)

  return (
    <div>
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-h1 font-bold text-navy-900 mb-1 font-display">Leads & Applications</h1>
          <p className="text-sm text-muted">View and manage form submissions from the public website.</p>
        </div>
        <div className="text-sm text-muted font-medium bg-white px-4 py-2 rounded-2xl shadow-md border border-navy-100">
          Total: {leads.length} leads
        </div>
      </div>

      <div className="bg-white overflow-hidden rounded-2xl shadow-md border border-navy-100">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-cream-50 border-b border-navy-200 text-muted">
              <tr>
                <th className="px-6 py-4 font-medium">Date</th>
                <th className="px-6 py-4 font-medium">Name</th>
                <th className="px-6 py-4 font-medium">Contact</th>
                <th className="px-6 py-4 font-medium">Country</th>
                <th className="px-6 py-4 font-medium">Interest</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-navy-700">
              {leads.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-navy-400">No leads found yet.</td>
                </tr>
              ) : (
                leads.map((lead: any) => (
                  <tr key={lead.id} className="hover:bg-cream-50 transition-colors">
                    <td className="px-6 py-4">
                      {new Date(lead.created_at).toLocaleDateString('en-GB', {
                        day: '2-digit', month: 'short', year: 'numeric'
                      })}
                    </td>
                    <td className="px-6 py-4 font-medium text-navy-900">{lead.name}</td>
                    <td className="px-6 py-4">
                      <a href={`mailto:${lead.email}`} className="text-navy-600 hover:underline block">{lead.email}</a>
                      <span className="text-xs text-muted">{lead.phone}</span>
                    </td>
                    <td className="px-6 py-4">{lead.country}</td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-navy-50 text-navy-700 border border-navy-100">
                        {lead.programme_interest}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
