import type { NewsletterBlock } from './newsletter-blocks';
import { createBlockId } from './newsletter-blocks';

export type SystemTemplateDef = {
  key: string;
  name: string;
  description: string;
  thumbnailKey: string;
  blocks: NewsletterBlock[];
};

const SITE = 'https://internationalcoachinginstitute.org';
const DEFAULT_HEADER_IMAGE = `${SITE}/logo-transparent.webp`;

function rt(html: string): NewsletterBlock {
  return { id: createBlockId(), type: 'rich_text', data: { html } };
}

function btn(label: string, url: string): NewsletterBlock {
  return { id: createBlockId(), type: 'button', data: { label, url } };
}

function div(): NewsletterBlock {
  return { id: createBlockId(), type: 'divider', data: {} };
}

export const SYSTEM_NEWSLETTER_TEMPLATES: SystemTemplateDef[] = [
  {
    key: 'institute-update',
    name: 'Institute Update',
    description: 'Header banner, intro, content sections, CTA, and branded footer.',
    thumbnailKey: 'institute-update',
    blocks: [
      {
        id: createBlockId(),
        type: 'header',
        data: {
          imageUrl: DEFAULT_HEADER_IMAGE,
          headline: 'Institute Update',
        },
      },
      rt('<p>Dear ICI community,</p><p>Here is the latest from the International Coaching Institute — news, insights, and what is coming next on the Mastery Pathway.</p>'),
      rt('<h2>What is new</h2><p>Add your first update here. Keep the tone warm, professional, and evidence-based — the way our coaches show up for clients.</p>'),
      rt('<h2>From the faculty</h2><p>Share a coaching insight, research highlight, or student milestone.</p>'),
      btn('Explore programmes', `${SITE}/programmes`),
    ],
  },
  {
    key: 'event-webinar',
    name: 'Event / Webinar Announcement',
    description: 'Hero image, date/time block, description, and a single prominent CTA.',
    thumbnailKey: 'event-webinar',
    blocks: [
      {
        id: createBlockId(),
        type: 'header',
        data: {
          imageUrl: DEFAULT_HEADER_IMAGE,
          headline: 'You are invited',
        },
      },
      {
        id: createBlockId(),
        type: 'event_details',
        data: {
          eventTitle: 'ICI Masterclass: The Craft of One-to-One Coaching',
          eventDate: 'Thursday, 15 January 2026',
          eventTime: '18:00 GMT · 90 minutes',
          locationOrLink: `${SITE}/events`,
          description:
            'Join ICI faculty for a live session on presence, questioning, and the psychology of change — open to coaches and prospective students.',
        },
      },
      btn('Register your place', `${SITE}/events`),
    ],
  },
  {
    key: 'blog-digest',
    name: 'New Blog Post Digest',
    description: 'Intro text plus a pulled-in blog post with title, excerpt, and Read more link.',
    thumbnailKey: 'blog-digest',
    blocks: [
      rt('<p>Our latest thinking from the institute — practical insights for coaches and the people they lead.</p>'),
      {
        id: createBlockId(),
        type: 'blog_pull',
        data: {
          blogPostId: '',
          title: 'Select a published blog post below',
          excerpt: 'The blog title, excerpt, and image will appear here automatically.',
          coverImageUrl: '',
          slug: '',
        },
      },
      btn('Read more on the blog', `${SITE}/blog`),
    ],
  },
  {
    key: 'cohort-enrolment',
    name: 'Cohort / Enrolment Announcement',
    description: 'Credential level callout, enrolment dates, and Apply Now CTA.',
    thumbnailKey: 'cohort-enrolment',
    blocks: [
      rt('<p>Enrolment is open for the next cohort on the ICI Mastery Pathway. Places are limited because every student is coached one-to-one.</p>'),
      {
        id: createBlockId(),
        type: 'credential_callout',
        data: {
          level: 'Catalyst',
          enrolmentDates: 'Applications open now · Begin within 7 working days of enrolment',
          description:
            'Level 1 of the Mastery Pathway — 36 hours of one-to-one coaching and guided self-work. The foundation credential for a professional coaching career.',
          ctaLabel: 'Apply now',
          ctaUrl: `${SITE}/admissions`,
        },
      },
      div(),
      rt('<p>Questions? <a href="/admissions/contact">Speak to an advisor</a> — no pressure, just a straight conversation.</p>'),
    ],
  },
  {
    key: 'blank',
    name: 'Plain / Blank',
    description: 'Single rich-text area — same as the original newsletter composer.',
    thumbnailKey: 'blank',
    blocks: [
      rt('<p>Write your newsletter content here…</p>'),
    ],
  },
];

export function getSystemTemplateByKey(key: string) {
  return SYSTEM_NEWSLETTER_TEMPLATES.find((t) => t.key === key);
}

export type GalleryTemplate = {
  id: string;
  name: string;
  description: string | null;
  thumbnailKey: string | null;
  blocks: NewsletterBlock[];
  isSystemDefault: boolean;
};

/** Fallback when DB templates are not yet seeded — keeps the gallery usable. */
export function builtInGalleryTemplates(): GalleryTemplate[] {
  return SYSTEM_NEWSLETTER_TEMPLATES.map((tpl) => ({
    id: `system:${tpl.key}`,
    name: tpl.name,
    description: tpl.description,
    thumbnailKey: tpl.thumbnailKey,
    blocks: tpl.blocks,
    isSystemDefault: true,
  }));
}
