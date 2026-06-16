'use client'

import AnimatedSection from '@/components/shared/AnimatedSection'
import Link from 'next/link'
import Image from 'next/image'
import Section from '@/components/layout/Section'
import Container from '@/components/layout/Container'
import { ArrowRight } from 'lucide-react'
import { cmsField } from '@/lib/cms-helpers'
import { formatEnumLabel } from '@/lib/admin-utils'
import type { ContentMap } from '@/lib/content'

export type BlogPostPreview = {
  id: string
  title: string
  slug: string
  excerpt: string
  coverImageUrl: string
  coverImageAlt: string | null
  category: string
  publishedAt: Date | string | null
  authorName: string
}

interface LatestBlogPostsProps {
  posts: BlogPostPreview[]
  content?: ContentMap
}

function formatPostDate(date: Date | string | null) {
  if (!date) return ''
  return new Date(date).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

export default function LatestBlogPosts({ posts, content = {} }: LatestBlogPostsProps) {
  if (posts.length === 0) return null

  return (
    <Section spacing="standard" className="bg-white">
      <Container>
        <AnimatedSection className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div className="text-center md:text-left w-full md:w-auto">
            <div className="text-eyebrow flex items-center gap-3 justify-center md:!justify-start mb-4">
              {cmsField(content, 'news_section_label', 'From the Blog')}
            </div>
            <h2 className="text-h2 text-brand-navy-700">
              {cmsField(content, 'news_section_heading', 'Latest Insights')}
            </h2>
          </div>
          <Link
            href="/blog"
            className="text-brand-gold-600 hover:text-brand-gold-700 font-sans font-semibold text-sm underline underline-offset-4 whitespace-nowrap"
          >
            {cmsField(content, 'blog_view_all_text', 'View all articles')}
          </Link>
        </AnimatedSection>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post, i) => (
            <AnimatedSection key={post.id} delay={i * 0.1}>
              <Link href={`/blog/${post.slug}`} className="ici-card flex flex-col h-full bg-cream-50 group border border-navy-100">
                <div className="h-52 relative overflow-hidden border-b border-navy-100 bg-brand-navy-100">
                  {post.coverImageUrl ? (
                    <Image
                      src={post.coverImageUrl}
                      alt={post.coverImageAlt || post.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, 33vw"
                      unoptimized
                    />
                  ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-brand-navy-700 to-brand-navy-900" aria-hidden />
                  )}
                  <div className="absolute inset-0 bg-brand-navy-900/10 group-hover:bg-transparent transition-colors duration-500" />
                  <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-sans font-bold uppercase tracking-wider text-brand-navy-700 shadow-sm">
                    {formatEnumLabel(post.category)}
                  </div>
                </div>
                <div className="p-8 flex-1 flex flex-col">
                  {post.publishedAt && (
                    <time
                      dateTime={new Date(post.publishedAt).toISOString()}
                      className="text-xs font-sans text-navy-400 mb-3"
                    >
                      {formatPostDate(post.publishedAt)}
                    </time>
                  )}
                  <h3 className="text-h3 text-brand-navy-700 mb-3 group-hover:text-brand-gold-600 transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-muted mb-6 flex-1 text-body line-clamp-3">{post.excerpt}</p>
                  <span className="inline-flex items-center gap-2 text-brand-gold-600 font-sans font-semibold text-sm group-hover:gap-3 transition-all">
                    Read article
                    <ArrowRight size={16} />
                  </span>
                </div>
              </Link>
            </AnimatedSection>
          ))}
        </div>
      </Container>
    </Section>
  )
}
