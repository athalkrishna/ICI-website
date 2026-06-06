import PageHeader from '@/components/shared/PageHeader'

export const metadata = {
  title: 'My Account - International Coaching Institute',
  description: 'Manage your International Coaching Institute account settings and progress.',
}

export default function AccountPage() {
  return (
    <main className="min-h-screen bg-white">
      <PageHeader 
        title="My Account"
        subtitle="Dashboard & Settings"
        image="https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=2000&auto=format&fit=crop"
      />
      <div className="max-w-7xl mx-auto px-4 py-20 lg:py-32">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-display text-3xl font-bold text-navy-900 mb-6">Welcome to Your Dashboard</h2>
          <p className="text-lg text-neutral-600 mb-8">
            This area will contain your course progression, certificates, billing information, and community access details. Check back soon as we finalize these features!
          </p>
        </div>
      </div>
    </main>
  )
}
