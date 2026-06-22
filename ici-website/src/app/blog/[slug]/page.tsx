import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import AnimatedSection from '@/components/shared/AnimatedSection'
import Section from '@/components/layout/Section'
import Container from '@/components/layout/Container'
import BlogPostMetaBar from '@/components/blog/BlogPostMetaBar'
import BlogPostCategories from '@/components/blog/BlogPostCategories'
import BlogCategoryBadge from '@/components/blog/BlogCategoryBadge'
import BlogProseContent from '@/components/blog/BlogProseContent'
import BlogTableOfContents from '@/components/blog/BlogTableOfContents'
import BlogRelatedPosts from '@/components/blog/BlogRelatedPosts'
import { getBlogPostBySlug, getRelatedBlogPosts } from '@/lib/data'
import { buildBlogPostMetadata } from '@/lib/blog-metadata'
import { SITE_URL } from '@/lib/site-url'
import {
  addHeadingIds,
  estimateReadTime,
  resolveBlogLead,
} from '@/lib/blog-utils'
import { ArrowLeft } from 'lucide-react'

type PageProps = {
  params: Promise<{ slug: string }>
}

export const revalidate = 60

const ARTICLE_SHELL = 'max-w-6xl mx-auto w-full'

function buildArticleJsonLd(
  post: NonNullable<Awaited<ReturnType<typeof getBlogPostBySlug>>>,
  slug: string,
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.metaTitle?.trim() || post.title,
    description: post.metaDescription?.trim() || post.excerpt,
    image: post.coverImageUrl ? [post.coverImageUrl] : undefined,
    datePublished: post.publishedAt?.toISOString(),
    dateModified: post.updatedAt.toISOString(),
    author: {
      '@type': 'Person',
      name: post.authorName,
    },
    publisher: {
      '@type': 'Organization',
      name: 'International Coaching Institute',
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/og-image.webp`,
      },
    },
    mainEntityOfPage: `${SITE_URL}/blog/${slug}`,
  };
}

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

  const { html: contentWithIds, headings } = addHeadingIds(post.content)
  const { lead, html: bodyHtml } = resolveBlogLead(post.excerpt, contentWithIds)
  const readTime = estimateReadTime(post.content)
  const relatedPosts = await getRelatedBlogPosts(slug, post.category)
  const showToc = headings.length >= 1

  return (
    <div className="bg-cream-50 min-h-screen font-sans selection:bg-brand-gold-500/30">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildArticleJsonLd(post, slug)) }}
      />
      <Section spacing="hero" className="bg-brand-navy-800 relative overflow-hidden border-b border-faint pb-8">
        <div className="absolute inset-0 bg-hero-pattern opacity-10" aria-hidden />
        <Container className="relative z-20">
          <div className={ARTICLE_SHELL}>
            <AnimatedSection>
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 text-brand-gold-400 hover:text-brand-gold-300 text-sm mb-8 transition-colors"
              >
                <ArrowLeft size={16} aria-hidden />
                Back to blog
              </Link>

              <div className="mb-4">
                <BlogCategoryBadge category={post.category} variant="hero" />
              </div>

              <h1 className="text-h1 text-white mb-6 max-w-4xl">{post.title}</h1>

              <BlogPostMetaBar
                authorName={post.authorName}
                authorAvatarUrl={post.authorAvatarUrl}
                publishedAt={post.publishedAt}
                readTime={readTime}
                title={post.title}
                slug={slug}
                category={post.category}
              />
            </AnimatedSection>
          </div>
        </Container>
      </Section>

      <div className="relative z-10">
        <Container>
          <div className={ARTICLE_SHELL}>
            {post.coverImageUrl && (
              <AnimatedSection className="-mt-6 mb-10 lg:-mt-8 lg:mb-12">
                <div className="relative aspect-[21/9] max-h-[480px] rounded-2xl overflow-hidden shadow-2xl border border-navy-100">
                  <Image
                    src={post.coverImageUrl}
                    alt={post.coverImageAlt || post.title}
                    fill
                    className="object-cover"
                    priority
                    sizes="(max-width: 1152px) 100vw, 1152px"
                  />
                </div>
              </AnimatedSection>
            )}

            <div
              className={
                showToc
                  ? `lg:grid lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-x-14 lg:items-start ${post.coverImageUrl ? '' : 'pt-16 lg:pt-20'}`
                  : `${post.coverImageUrl ? '' : 'pt-16 lg:pt-20'}`
              }
            >
              {showToc && (
                <aside className="hidden lg:block pt-1">
                  <BlogTableOfContents headings={headings} />
                </aside>
              )}

              <div className={showToc ? 'min-w-0' : 'max-w-3xl mx-auto w-full'}>
                {showToc && (
                  <details className="lg:hidden mb-8 bg-white border border-navy-100 rounded-xl p-4">
                    <summary className="text-sm font-semibold text-brand-navy-800 cursor-pointer">
                      Table of Contents
                    </summary>
                    <BlogTableOfContents headings={headings} variant="embedded" />
                  </details>
                )}

                <BlogProseContent html={bodyHtml} lead={lead} />

                <BlogPostCategories category={post.category} tags={post.tags} />
              </div>
            </div>

            <div className={showToc ? 'lg:grid lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-x-14' : ''}>
              {showToc && <div className="hidden lg:block" aria-hidden />}
              <BlogRelatedPosts posts={relatedPosts} />
            </div>
          </div>
        </Container>
      </div>

      <div className="pb-24" aria-hidden />
    </div>
  )
}
