import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import AnimatedSection from '@/components/shared/AnimatedSection'
import Section from '@/components/layout/Section'
import Container from '@/components/layout/Container'
import { getBlogPostBySlug } from '@/lib/data'
import { buildBlogPostMetadata } from '@/lib/blog-metadata'
import { ArrowLeft } from 'lucide-react'

type PageProps = {
  params: Promise<{ slug: string }>
}

export const revalidate = 60

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const post = await getBlogPostBySlug(slug)
  if (!post) return { title: 'Article Not Found' }

  return buildBlogPostMetadata(post, slug)
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params
  const post = await getBlogPostBySlug(slug)
  if (!post) notFound()

  return (
    <div className="bg-cream-50 min-h-screen font-sans selection:bg-brand-gold-500/30">
      <Section spacing="hero" className="bg-brand-navy-800 relative overflow-hidden border-b border-faint">
        <div className="absolute inset-0 bg-hero-pattern opacity-10" aria-hidden />
        <Container className="relative z-20">
          <AnimatedSection className="max-w-4xl">
            <Link href="/blog" className="inline-flex items-center gap-2 text-brand-gold-400 hover:text-brand-gold-300 text-sm mb-8 transition-colors">
              <ArrowLeft size={16} /> Back to blog
            </Link>
            {post.publishedAt && (
              <div className="text-eyebrow text-brand-gold-400 mb-4">
                {new Date(post.publishedAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
              </div>
            )}
            <h1 className="text-h1 text-white mb-6">{post.title}</h1>
            <p className="text-navy-100 text-base max-w-3xl">{post.excerpt}</p>
            <div className="mt-8 text-sm text-navy-200">By {post.authorName}</div>
          </AnimatedSection>
        </Container>
      </Section>

      {post.coverImageUrl && (
        <div className="relative -mt-8 z-10">
          <Container>
            <div className="relative aspect-[21/9] rounded-2xl overflow-hidden shadow-2xl border border-navy-100">
              <Image
                src={post.coverImageUrl}
                alt={post.coverImageAlt || post.title}
                fill
                className="object-cover"
                priority
                sizes="100vw"
              />
            </div>
          </Container>
        </div>
      )}

      <Section spacing="standard" className="relative z-20">
        <Container size="narrow">
          <AnimatedSection>
            <article
              className="prose prose-lg max-w-none prose-p:text-muted-dark prose-headings:text-brand-navy-900 prose-a:text-brand-gold-600"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </AnimatedSection>
        </Container>
      </Section>
    </div>
  )
}
