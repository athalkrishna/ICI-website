/**
 * Seeds the pillar blog guide draft for "become a certified life coach".
 * Run: npx tsx prisma/seed-pillar-blog.ts
 */
import { prisma } from '../src/lib/prisma';

const PILLAR = {
  slug: 'become-a-certified-life-coach',
  title: 'How to Become a Certified Life Coach',
  excerpt:
    'A practical guide to becoming a certified life coach: what training involves, how ICI Catalyst fits in, and how to choose the right path for you.',
  content: `<h2>Why certification matters</h2>
<p>Clients and employers increasingly expect proof that a coach has been trained rigorously — not just self-styled. A structured certification pathway gives you competencies, supervised practice, and a credential people can trust.</p>
<h2>Start with the right foundation</h2>
<p>At ICI, most coaches begin with <strong>Catalyst</strong> — our Level 1 transformational coaching certification. It is delivered one-to-one and online, blending live coaching hours with guided self-work.</p>
<p><a href="/credentials/catalyst">Explore the Catalyst credential →</a></p>
<h2>Specialise with life coaching training</h2>
<p>If your goal is to work with individuals on purpose, change and fulfilment, our <a href="/programmes/certified-life-coach">Certified Life Coach specialisation</a> builds on the Mastery Pathway with focused online life coach training.</p>
<h2>Next steps</h2>
<ul>
<li><a href="/credentials">Compare ICI credentials</a></li>
<li><a href="/programmes">View all programmes</a></li>
<li><a href="/admissions/assessment">Take the free level assessment</a></li>
</ul>`,
  coverImageUrl: 'https://internationalcoachinginstitute.org/logo-transparent.webp',
  coverImageAlt: 'International Coaching Institute',
  authorName: 'ICI Faculty',
  category: 'COACHING_INSIGHTS' as const,
  focusKeyword: 'become a certified life coach',
  seoKeywords: [
    'online life coach training',
    'life coaching course',
    'transformational coaching certification',
    'online coaching certification',
  ],
  metaTitle: 'How to Become a Certified Life Coach | ICI Guide',
  metaDescription:
    'Learn how to become a certified life coach with ICI: transformational coaching certification, online life coach training, and a clear path from Catalyst to practice.',
};

async function main() {
  const existing = await prisma.blogPost.findUnique({ where: { slug: PILLAR.slug } });

  if (existing) {
    await prisma.blogPost.update({
      where: { slug: PILLAR.slug },
      data: {
        focusKeyword: PILLAR.focusKeyword,
        seoKeywords: PILLAR.seoKeywords,
        metaTitle: existing.metaTitle ?? PILLAR.metaTitle,
        metaDescription: existing.metaDescription ?? PILLAR.metaDescription,
        featured: existing.featured || true,
      },
    });
    console.log(`Updated SEO on existing pillar post: /blog/${PILLAR.slug}`);
    return;
  }

  await prisma.blogPost.create({
    data: {
      ...PILLAR,
      tags: ['life coaching', 'certification', 'Catalyst'],
      featured: true,
      status: 'DRAFT',
    },
  });

  console.log(`Created draft pillar post: /blog/${PILLAR.slug}`);
  console.log('Publish it from Admin → Blog when ready.');
}

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
