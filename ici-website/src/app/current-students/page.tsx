import PageHeader from '@/components/shared/PageHeader'

export const metadata = {
  title: 'Current Students - International Coaching Institute',
  description: 'Resources and portals for current students of the International Coaching Institute.',
}

export default function CurrentStudentsPage() {
  return (
    <main className="min-h-screen bg-white">
      <PageHeader 
        title="Current Students"
        subtitle="Your Learning Hub"
        image="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=2000&auto=format&fit=crop"
      />
      <div className="max-w-7xl mx-auto px-4 py-20 lg:py-32">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-display text-3xl font-bold text-navy-900 mb-6">Welcome Back</h2>
          <p className="text-lg text-neutral-600 mb-8">
            Access your courses, library resources, and student support services. Connect with your peers and stay updated with the latest campus news.
          </p>
          <div className="flex justify-center gap-4">
            <a href="/login" className="btn-primary">Go to Dashboard</a>
            <a href="#" className="btn-secondary">Student Support</a>
          </div>
        </div>
      </div>
    </main>
  )
}
