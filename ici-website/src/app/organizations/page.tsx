import PageHeader from '@/components/shared/PageHeader'

export const metadata = {
  title: 'Organizations - International Coaching Institute',
  description: 'Corporate coaching and organizational development programs.',
}

export default function OrganizationsPage() {
  return (
    <main className="min-h-screen bg-white">
      <PageHeader 
        title="For Organizations"
        subtitle="Transform Your Team"
        image="https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2000&auto=format&fit=crop"
      />
      <div className="max-w-7xl mx-auto px-4 py-20 lg:py-32">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-display text-3xl font-bold text-navy-900 mb-6">Empower Your Workforce</h2>
          <p className="text-lg text-neutral-600 mb-8">
            We partner with organizations to build coaching cultures, develop leadership pipelines, and enhance team performance through customized coaching solutions.
          </p>
          <div className="flex justify-center gap-4">
            <a href="#" className="btn-primary">Partner With Us</a>
          </div>
        </div>
      </div>
    </main>
  )
}
