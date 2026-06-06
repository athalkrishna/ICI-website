import PageHeader from '@/components/shared/PageHeader'
import AnimatedSection from '@/components/shared/AnimatedSection'
import { navItems } from '@/data/navigation'
import { notFound } from 'next/navigation'

interface PageProps {
  params: Promise<{
    slug: string[]
  }>
}

// Find matching nav item recursively
function findNavItem(href: string) {
  for (const item of navItems) {
    if (item.href === href) return { title: item.label, subtitle: 'Overview', desc: '' }
    if (item.children) {
      for (const group of item.children) {
        for (const link of group.links) {
          if (link.href === href) {
            return { title: link.label, subtitle: group.heading, desc: link.desc || '' }
          }
        }
      }
    }
  }
  return null
}

export default async function DynamicPage({ params }: PageProps) {
  const resolvedParams = await params
  const href = `/${resolvedParams.slug.join('/')}`
  const pageData = findNavItem(href)

  if (!pageData) {
    notFound()
  }

  // Assign a reliable Unsplash image based on the length of the title
  const images = [
    'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=1920&q=80',
    'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=1920&q=80',
    'https://images.unsplash.com/photo-1513258496099-48168024aec0?w=1920&q=80',
    'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=1920&q=80',
    'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1920&q=80',
    'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=1920&q=80',
    'https://images.unsplash.com/photo-1456324504439-367cee3b3c32?w=1920&q=80',
    'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=1920&q=80'
  ]
  const imageIndex = pageData.title.length % images.length
  const heroImage = images[imageIndex]

  return (
    <div className="flex flex-col min-h-screen">
      <PageHeader 
        title={pageData.title} 
        subtitle={pageData.subtitle} 
        image={heroImage} 
      />
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <AnimatedSection>
            <h2 className="font-display text-4xl font-bold text-navy-700 mb-6">
              {pageData.title}
            </h2>
            <p className="font-body text-gray-600 leading-relaxed text-lg mb-12">
              {pageData.desc ? pageData.desc : `Welcome to the ${pageData.title} page. This section provides detailed information regarding ${pageData.subtitle.toLowerCase()} at the International Coaching Institute.`}
            </p>
            <div className="p-16 border border-dashed border-gray-200 rounded-3xl bg-cream-50">
              <span className="text-gray-400 font-display italic text-xl">Detailed content for this section is currently being updated.</span>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  )
}
