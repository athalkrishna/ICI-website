import Link from 'next/link'
import Section from '@/components/layout/Section'
import Container from '@/components/layout/Container'
import { cmsField } from '@/lib/cms-helpers'
import type { ContentMap } from '@/lib/content'
import BlogPostCard from '@/components/blog/BlogPostCard'
import type { BlogPostPreview } from '@/lib/blog-utils'

export type { BlogPostPreview }

interface LatestBlogPostsProps {
  posts: BlogPostPreview[]
  content?: ContentMap
}

export default function LatestBlogPosts({ posts, content = {} }: LatestBlogPostsProps) {
  if (posts.length === 0) return null

  return (
    <Section spacing="standard" className="bg-white">
      <Container>
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div className="text-center md:text-left w-full md:w-auto">
            <p className="text-eyebrow flex items-center gap-3 justify-center md:!justify-start mb-4">
              {cmsField(content, 'news_section_label', 'From the Blog')}
            </p>
            <h2 className="text-h2 text-brand-navy-700">
              {cmsField(content, 'news_section_heading', 'Latest Insights')}
            </h2>
          </div>
          <Link
            href="/blog"
            className="text-brand-gold-700 hover:text-brand-gold-800 font-sans font-semibold text-sm underline underline-offset-4 whitespace-nowrap min-h-[44px] inline-flex items-center"
          >
            {cmsField(content, 'blog_view_all_text', 'View all articles')}
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <BlogPostCard key={post.id} post={post} />
          ))}
        </div>
      </Container>
    </Section>
  )
}
