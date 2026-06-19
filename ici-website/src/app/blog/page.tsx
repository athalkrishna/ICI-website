import { Suspense } from 'react'
import AnimatedSection from '@/components/shared/AnimatedSection'
import { Metadata } from 'next'
import { Mail } from 'lucide-react'
import Section from '@/components/layout/Section'
import Container from '@/components/layout/Container'
import BlogListing from '@/components/blog/BlogListing'
import EmailSignupForm from '@/components/shared/EmailSignupForm'
import { getPublishedPageContent } from '@/lib/content'
import { getPublishedBlogPosts } from '@/lib/data'
import { cmsField, cmsHtml, stripHtml } from '@/lib/cms-helpers'

export const metadata: Metadata = {
  title: 'Coaching Insights & Articles | ICI Blog',
  description: 'Read the latest thinking from ICI on coaching, leadership, psychology and human change. Practical insights for coaches and the people they lead.'
}

export const revalidate = 60

type BlogPageProps = {
  searchParams: Promise<{ category?: string }>
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const { category } = await searchParams
  const [content, posts] = await Promise.all([
    getPublishedPageContent('/blog'),
    getPublishedBlogPosts(),
  ])

  return (
    <div className="bg-cream-50 min-h-screen font-sans selection:bg-brand-gold-500/30">
      <Section spacing="hero" className="bg-brand-navy-800 lg:relative overflow-hidden border-b border-faint">
        <div className="absolute inset-0 bg-hero-pattern opacity-10" aria-hidden />
        <div className="absolute inset-0 z-0 opacity-20 mix-blend-screen pointer-events-none">
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-brand-gold-400 rounded-full blur-[150px] translate-x-1/3 -translate-y-1/3" />
        </div>

        <Container className="relative z-20">
          <AnimatedSection className="max-w-4xl">
            <div className="flex items-center gap-6 mb-8">
              <div className="w-16 h-[1px] gradient-accent-gold" />
              <div className="text-eyebrow text-brand-gold-400">
                {cmsField(content, 'hero_eyebrow', 'Journal')}
              </div>
            </div>
            <h1 className="text-h1 text-white mb-4">
              {cmsField(content, 'hero_heading', 'Insights from the field')}
            </h1>
            <span className="block w-14 h-1 rounded-full bg-brand-gold-500 mb-8" aria-hidden />
            <p className="text-navy-100 text-base md:text-lg max-w-2xl mb-12 leading-relaxed">
              {stripHtml(cmsHtml(content, 'hero_body', 'Coaching changes when practitioners keep questioning it. This is where ICI faculty share their thinking: on leadership, the psychology of high achievers, how change really happens, and the craft of coaching itself. Come back often. The best ideas tend to arrive slowly.'))}
            </p>
          </AnimatedSection>
        </Container>
      </Section>

      {posts.length > 0 ? (
        <Section spacing="standard" className="relative z-20 pb-20">
          <Container>
            <Suspense fallback={<div className="py-16 text-center text-muted">Loading articles…</div>}>
              <BlogListing posts={posts} initialCategory={category} />
            </Suspense>
          </Container>
        </Section>
      ) : (
        <Section spacing="standard" className="relative z-20">
          <Container>
            <AnimatedSection>
              <div className="max-w-2xl mx-auto text-center py-16">
                <div className="w-16 h-16 bg-white border border-navy-100 shadow-sm rounded-full flex items-center justify-center text-brand-gold-600 mx-auto mb-8">
                  <Mail size={24} />
                </div>

                <h2 className="text-h3 text-brand-navy-900 mb-6">
                  {cmsField(content, 'empty_heading', 'The first articles are on their way')}
                </h2>
                <p className="text-muted mb-12 text-body">
                  {cmsField(content, 'empty_body', 'We are currently writing and editing our first collection of insights. Subscribe below to be notified when they arrive.')}
                </p>

                <EmailSignupForm
                  context="Blog journal subscription"
                  placeholder={cmsField(content, 'subscribe_placeholder', 'Enter your email address')}
                  buttonText={cmsField(content, 'subscribe_button_text', 'Notify me')}
                />
              </div>
            </AnimatedSection>
          </Container>
        </Section>
      )}
    </div>
  )
}
