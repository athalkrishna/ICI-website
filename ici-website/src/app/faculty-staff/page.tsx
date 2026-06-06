import PageHeader from '@/components/shared/PageHeader'

export const metadata = {
  title: 'Faculty & Staff - International Coaching Institute',
  description: 'Resources and portal for faculty and staff of the International Coaching Institute.',
}

export default function FacultyStaffPage() {
  return (
    <main className="min-h-screen bg-white">
      <PageHeader 
        title="Faculty & Staff"
        subtitle="Educator Resources"
        image="https://images.unsplash.com/photo-1544717302-de2939b7ef71?q=80&w=2000&auto=format&fit=crop"
      />
      <div className="max-w-7xl mx-auto px-4 py-20 lg:py-32">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-display text-3xl font-bold text-navy-900 mb-6">Staff Portal</h2>
          <p className="text-lg text-neutral-600 mb-8">
            Access teaching materials, administrative tools, and faculty support services. We provide our staff with the resources they need to deliver world-class education.
          </p>
          <div className="flex justify-center gap-4">
            <a href="/login" className="btn-primary">Staff Login</a>
          </div>
        </div>
      </div>
    </main>
  )
}
