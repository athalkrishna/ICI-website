import PageHeader from '@/components/shared/PageHeader'

export const metadata = {
  title: 'Future Students - International Coaching Institute',
  description: 'Information and resources for future students of the International Coaching Institute.',
}

export default function FutureStudentsPage() {
  return (
    <main className="min-h-screen bg-white">
      <PageHeader 
        title="Future Students"
        subtitle="Begin Your Journey"
        image="https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=2000&auto=format&fit=crop"
      />
      <div className="max-w-7xl mx-auto px-4 py-20 lg:py-32">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-display text-3xl font-bold text-navy-900 mb-6">Start Your Coaching Career</h2>
          <p className="text-lg text-neutral-600 mb-8">
            Discover our world-class programs and join a global community of coaching professionals. We provide the tools, knowledge, and network you need to succeed.
          </p>
          <div className="flex justify-center gap-4">
            <a href="#" className="btn-primary">Explore Programs</a>
            <a href="#" className="btn-secondary">Request Info</a>
          </div>
        </div>
      </div>
    </main>
  )
}
