import PageHeader from '@/components/shared/PageHeader'

export const metadata = {
  title: 'Alumni Network - International Coaching Institute',
  description: 'Connect with the International Coaching Institute global alumni network.',
}

export default function AlumniPage() {
  return (
    <main className="min-h-screen bg-white">
      <PageHeader 
        title="Alumni Network"
        subtitle="Stay Connected"
        image="https://images.unsplash.com/photo-1523580494112-071d45815a75?q=80&w=2000&auto=format&fit=crop"
      />
      <div className="max-w-7xl mx-auto px-4 py-20 lg:py-32">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-display text-3xl font-bold text-navy-900 mb-6">A Global Community</h2>
          <p className="text-lg text-neutral-600 mb-8">
            Our alumni are making a difference in organizations and lives around the world. Stay connected, access continuing education, and participate in exclusive alumni events.
          </p>
          <div className="flex justify-center gap-4">
            <a href="/login" className="btn-primary">Alumni Portal Login</a>
          </div>
        </div>
      </div>
    </main>
  )
}
