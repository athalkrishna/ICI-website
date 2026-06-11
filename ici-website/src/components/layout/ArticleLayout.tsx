import AnimatedSection from '@/components/shared/AnimatedSection'
import PageHeader from '@/components/shared/PageHeader'
import { ReactNode } from 'react'

interface ArticleLayoutProps {
  title: string
  subtitle: string
  image: string
  lastUpdated: Date
  children: ReactNode
}

export default function ArticleLayout({
  title,
  subtitle,
  image,
  lastUpdated,
  children
}: ArticleLayoutProps) {
  const formattedDate = lastUpdated.toLocaleDateString('en-GB', {
    month: 'long',
    year: 'numeric'
  })

  return (
    <div className="flex flex-col min-h-screen">
      <PageHeader 
        title={title} 
        subtitle={subtitle} 
        image={image} 
      />
      
      <section className="bg-white py-24 font-sans text-brand-navy-800 selection:bg-brand-gold-500/30 selection:text-brand-navy-900">
        <div className="max-w-[1024px] mx-auto px-4 lg:px-8 relative z-20">
          <AnimatedSection>
            <p className="font-body text-sm text-brand-gold-600 uppercase tracking-wider font-bold mb-16">
              Last updated: {formattedDate}
            </p>

            <div className="prose prose-lg max-w-none prose-p:text-gray-600 prose-li:text-gray-600 prose-headings:text-brand-navy-900 prose-headings:font-display prose-headings:font-bold prose-a:text-brand-gold-600 hover:prose-a:text-gold-700 prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6 prose-ul:list-disc prose-ul:pl-6 prose-ul:space-y-3">
              {children}
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  )
}
